"""
ARES-EMD-OPAP: Real Invertible Neural Network (INN) Guidance Module (`ares_emd_opap/guidance/inn.py`).

Implements a genuine RealNVP-style Invertible Neural Network with affine coupling
layers (`AffineCouplingBlock`) and invertible channel permutations.
Acts on a multi-channel 2x2 pixel-unshuffled (squeeze) representation of the single-channel
R+G luma tensor (with automatic padding for odd dimensions) so that:
  1. `forward(x)` maps `(B, C, H, W) -> (z, log_det)`
  2. `inverse(z)` recovers `x` up to floating-point precision: `||x - inverse(forward(x))|| ~ 1e-6`
  3. `guidance_map(luma_tensor)` computes normalized latent spatial energy in `[0, 1]` of
     exact shape `(H, W)` to guide adaptive EMD-OPAP pixel-pair selection.

IMPORTANT:
- This INN is strictly for spatial GUIDANCE on R+G luma.
- It does NOT embed or extract the secret payload, and does NOT claim cover-image reversibility.
"""

from __future__ import annotations

from pathlib import Path
from typing import List, Optional, Tuple, Union

import numpy as np
import torch
import torch.nn as nn
import torch.nn.functional as F

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
DEFAULT_INN_CHECKPOINT_PATH = Path(__file__).resolve().parent / "checkpoints" / "inn_guidance.pt"
HYBRID_REF_CHECKPOINT_PATH = (
    Path(__file__).resolve().parents[2] / "models" / "hybrid" / "ares_hybrid_inn.pt"
)


def _clamp_log_scale(s: torch.Tensor, clamp: float = 1.5) -> torch.Tensor:
    return clamp * torch.tanh(s / clamp)


class CouplingSubnet(nn.Module):
    """Residual convolutional subnet inside an affine coupling block predicting scale & shift."""

    def __init__(self, in_ch: int, hidden_ch: int = 24):
        super().__init__()
        self.net = nn.Sequential(
            nn.Conv2d(in_ch, hidden_ch, kernel_size=3, padding=1),
            nn.ReLU(inplace=True),
            nn.Conv2d(hidden_ch, hidden_ch, kernel_size=3, padding=1),
            nn.ReLU(inplace=True),
            nn.Conv2d(hidden_ch, in_ch * 2, kernel_size=3, padding=1),
        )
        # Initialize last layer with small weights so coupling starts stable and non-trivial
        nn.init.normal_(self.net[-1].weight, mean=0.0, std=0.02)
        nn.init.zeros_(self.net[-1].bias)

    def forward(self, x: torch.Tensor) -> Tuple[torch.Tensor, torch.Tensor]:
        out = self.net(x)
        s, t = out.chunk(2, dim=1)
        return s, t


class InvertibleChannelPermute(nn.Module):
    """Deterministic bijective channel permutation with exact inverse."""

    def __init__(self, channels: int, step: int = 0):
        super().__init__()
        idx = torch.arange(channels, dtype=torch.long)
        perm = torch.roll(idx, shifts=(step + 1) % max(1, channels))
        if step % 2 == 1:
            perm = torch.flip(perm, dims=[0])
        inv = torch.argsort(perm)
        self.register_buffer("perm", perm)
        self.register_buffer("inv", inv)

    def forward(self, x: torch.Tensor, reverse: bool = False) -> torch.Tensor:
        if reverse:
            return x[:, self.inv]
        return x[:, self.perm]


class AffineCouplingBlock(nn.Module):
    """
    RealNVP-style invertible affine coupling block:
      Forward:
        x1, x2 = split(permute(x))
        s, t = Subnet(x1)
        y1 = x1
        y2 = x2 * exp(clamp(s)) + t
      Inverse:
        y1, y2 = split(y)
        s, t = Subnet(y1)
        x1 = y1
        x2 = (y2 - t) * exp(-clamp(s))
        x = inv_permute(cat(x1, x2))
    """

    def __init__(self, channels: int = 4, hidden_ch: int = 24, clamp: float = 1.5, step: int = 0):
        super().__init__()
        if channels % 2 != 0:
            raise ValueError("AffineCouplingBlock requires an even number of channels")
        self.channels = channels
        self.half = channels // 2
        self.clamp = clamp
        self.permute = InvertibleChannelPermute(channels, step=step)
        self.subnet = CouplingSubnet(self.half, hidden_ch=hidden_ch)

    def forward(self, x: torch.Tensor, reverse: bool = False) -> Tuple[torch.Tensor, torch.Tensor]:
        if not reverse:
            xp = self.permute(x, reverse=False)
            x1, x2 = xp[:, : self.half], xp[:, self.half :]
            s, t = self.subnet(x1)
            s = _clamp_log_scale(s, self.clamp)
            y1 = x1
            y2 = x2 * torch.exp(s) + t
            y = torch.cat([y1, y2], dim=1)
            log_det = s.flatten(1).sum(dim=1)
            return y, log_det
        else:
            y1, y2 = x[:, : self.half], x[:, self.half :]
            s, t = self.subnet(y1)
            s = _clamp_log_scale(s, self.clamp)
            x1 = y1
            x2 = (y2 - t) * torch.exp(-s)
            xp = torch.cat([x1, x2], dim=1)
            x_rec = self.permute(xp, reverse=True)
            log_det = -s.flatten(1).sum(dim=1)
            return x_rec, log_det


class INNGuidanceNet(nn.Module):
    """
    Multi-block Invertible Neural Network for spatial guidance on R+G luma.

    Supports:
      - `forward(x)` / `inverse(z)` on squeezed 4-channel tensors `(B, 4, H/2, W/2)`
        OR directly on 2D/3D/4D single-channel luma tensors via `encode_luma` / `decode_luma`.
      - `guidance_map(luma_tensor)` returning latent spatial energy normalized to `[0, 1]`
        with exact `(H, W)` spatial resolution.
    """

    def __init__(self, channels: int = 4, n_blocks: int = 4, hidden_ch: int = 24, clamp: float = 1.5):
        super().__init__()
        self.channels = channels
        self.n_blocks = n_blocks
        self.hidden_ch = hidden_ch
        self.clamp = clamp
        self.blocks = nn.ModuleList(
            [
                AffineCouplingBlock(
                    channels=channels,
                    hidden_ch=hidden_ch,
                    clamp=clamp,
                    step=i,
                )
                for i in range(n_blocks)
            ]
        )

    @staticmethod
    def squeeze_2x2(x: torch.Tensor) -> Tuple[torch.Tensor, Tuple[int, int]]:
        """Bijective 2x2 pixel-unshuffle from (B, 1, H, W) to (B, 4, H/2, W/2)."""
        h, w = x.shape[-2], x.shape[-1]
        pad_h = h % 2
        pad_w = w % 2
        if pad_h or pad_w:
            x = F.pad(x, (0, pad_w, 0, pad_h), mode="replicate")
        return F.pixel_unshuffle(x, 2), (h, w)

    @staticmethod
    def unsqueeze_2x2(z: torch.Tensor, orig_hw: Optional[Tuple[int, int]] = None) -> torch.Tensor:
        """Exact inverse of `squeeze_2x2` via pixel_shuffle."""
        x = F.pixel_shuffle(z, 2)
        if orig_hw is not None:
            h, w = orig_hw
            x = x[..., :h, :w]
        return x

    def forward(
        self, x: torch.Tensor, reverse: bool = False
    ) -> Tuple[torch.Tensor, torch.Tensor]:
        """
        Invertible forward/reverse pass.
        If `x` has `C == self.channels` (e.g., `(B, 4, Hc, Wc)`), runs coupling blocks directly.
        If `x` is single-channel `(B, 1, H, W)` or `(H, W)`, squeezes 2x2 -> coupling -> unsqueezes 2x2
        so `inverse(forward(x)[0])[0]` has the exact same shape and values as `x`.
        """
        orig_ndim = x.ndim
        if orig_ndim == 2:
            x_in = x.unsqueeze(0).unsqueeze(0)
        elif orig_ndim == 3:
            x_in = x.unsqueeze(0)
        elif orig_ndim == 4:
            x_in = x
        else:
            raise ValueError(f"Unsupported tensor shape {tuple(x.shape)}")

        x_in = x_in.float()
        auto_squeezed = False
        orig_hw: Optional[Tuple[int, int]] = None

        if x_in.shape[1] == 1 and self.channels == 4:
            if x_in.shape[-2] % 2 != 0 or x_in.shape[-1] % 2 != 0:
                raise ValueError(
                    "For exact 1-channel squeeze invertibility, H and W must be even; "
                    "use guidance_map() for arbitrary HxW."
                )
            x_in, orig_hw = self.squeeze_2x2(x_in)
            auto_squeezed = True

        log_det = x_in.new_zeros(x_in.shape[0])
        z = x_in
        if not reverse:
            for blk in self.blocks:
                z, ld = blk(z, reverse=False)
                log_det = log_det + ld
        else:
            for blk in reversed(self.blocks):
                z, ld = blk(z, reverse=True)
                log_det = log_det + ld

        if auto_squeezed:
            z = self.unsqueeze_2x2(z, orig_hw)

        if orig_ndim == 2:
            return z.squeeze(0).squeeze(0), log_det
        if orig_ndim == 3:
            return z.squeeze(0), log_det
        return z, log_det

    def inverse(self, z: torch.Tensor) -> Tuple[torch.Tensor, torch.Tensor]:
        """Exact inverse mapping `z -> x`."""
        return self.forward(z, reverse=True)

    def guidance_map(self, luma_tensor: torch.Tensor) -> torch.Tensor:
        """
        Computes normalized spatial guidance map in `[0, 1]` of shape `(H, W)` (or `(B, 1, H, W)`)
        from the latent high-frequency coupling energy `mean(|z - mean(z)|)`.
        """
        orig_ndim = luma_tensor.ndim
        if orig_ndim == 2:
            x = luma_tensor.unsqueeze(0).unsqueeze(0)
        elif orig_ndim == 3:
            x = luma_tensor.unsqueeze(0)
        elif orig_ndim == 4:
            x = luma_tensor
        else:
            raise ValueError(f"Expected 2D, 3D, or 4D luma tensor, got {tuple(luma_tensor.shape)}")

        x = x.float()
        if x.max() > 1.5:
            x = x / 255.0

        # Remove local DC mean so latent energy reflects high-frequency structural complexity
        local_mean = F.avg_pool2d(x, kernel_size=3, stride=1, padding=1)
        hp = x - local_mean

        z_sq, (h, w) = self.squeeze_2x2(hp)
        z_lat, _ = self.forward(z_sq, reverse=False)

        # Latent spatial energy across channels, upsampled to (H, W)
        energy_low = torch.mean(torch.abs(z_lat), dim=1, keepdim=True)
        energy = F.interpolate(energy_low, size=(h, w), mode="bilinear", align_corners=False)

        # Normalize per batch item to [0, 1]
        b = energy.shape[0]
        flat = energy.view(b, -1)
        lo = flat.min(dim=1)[0].view(b, 1, 1, 1)
        hi = flat.max(dim=1)[0].view(b, 1, 1, 1)
        denom = torch.where((hi - lo) > 1e-8, hi - lo, torch.ones_like(hi))
        norm = torch.clamp((energy - lo) / denom, 0.0, 1.0)

        if orig_ndim == 2:
            return norm.squeeze(0).squeeze(0)
        if orig_ndim == 3:
            return norm.squeeze(0)
        return norm


_CACHED_INN_MODEL: Optional[INNGuidanceNet] = None
_CACHED_INN_PATH: Optional[str] = None


def _try_warmstart_inn_from_hybrid(model: INNGuidanceNet) -> None:
    """Optionally warm-starts parameters if a compatible checkpoint exists under models/hybrid."""
    if HYBRID_REF_CHECKPOINT_PATH.exists():
        try:
            ckpt = torch.load(HYBRID_REF_CHECKPOINT_PATH, map_location="cpu", weights_only=False)
            state = ckpt.get("model", ckpt.get("hybrid", ckpt))
            if isinstance(state, dict):
                model.load_state_dict(state, strict=False)
        except Exception:
            pass


def train_inn_guidance(
    epochs: int = 25,
    batch_size: int = 8,
    patch_size: int = 48,
    lr: float = 3e-3,
    save_path: Optional[Union[str, Path]] = DEFAULT_INN_CHECKPOINT_PATH,
    seed: int = 2026,
) -> Tuple[INNGuidanceNet, List[float]]:
    """
    Trains INNGuidanceNet on synthetic texture/edge patches so its latent spatial energy
    correlates with local texture complexity while preserving exact invertibility.
    """
    torch.manual_seed(seed)
    np.random.seed(seed)

    model = INNGuidanceNet(channels=4, n_blocks=4, hidden_ch=24).to(DEVICE)
    _try_warmstart_inn_from_hybrid(model)
    model.train()

    optimizer = torch.optim.Adam(model.parameters(), lr=lr)
    losses: List[float] = []

    yy, xx = torch.meshgrid(
        torch.linspace(0, 1, patch_size, device=DEVICE),
        torch.linspace(0, 1, patch_size, device=DEVICE),
        indexing="ij",
    )

    for _ in range(epochs):
        patches = []
        for _b in range(batch_size):
            f1 = float(np.random.uniform(4.0, 20.0))
            f2 = float(np.random.uniform(4.0, 20.0))
            checker = 0.5 + 0.5 * torch.sin(xx * f1 * 3.14159) * torch.sin(yy * f2 * 3.14159)
            noise = torch.rand((patch_size, patch_size), device=DEVICE)
            region = (yy > float(np.random.uniform(0.25, 0.75))).float()
            smooth = 0.4 * xx + 0.6 * yy
            patch = region * (0.5 * checker + 0.5 * noise) + (1.0 - region) * smooth
            patches.append(patch.unsqueeze(0))

        inp = torch.stack(patches, dim=0)  # (B, 1, H, W)
        with torch.no_grad():
            mean = F.avg_pool2d(inp, kernel_size=5, stride=1, padding=2)
            var = torch.clamp(
                F.avg_pool2d(inp * inp, kernel_size=5, stride=1, padding=2) - mean * mean,
                min=0.0,
            )
            std = torch.sqrt(var + 1e-8)
            b = inp.shape[0]
            target = std / (std.view(b, -1).max(dim=1)[0].view(b, 1, 1, 1) + 1e-6)

        gmap = model.guidance_map(inp)
        loss = F.mse_loss(gmap, target)
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
        losses.append(float(loss.item()))

    model.eval()
    if save_path is not None:
        save_inn_checkpoint(model, save_path, extra={"loss_history": losses})
    return model, losses


def save_inn_checkpoint(
    model: INNGuidanceNet,
    path: Union[str, Path] = DEFAULT_INN_CHECKPOINT_PATH,
    extra: Optional[dict] = None,
) -> Path:
    out_path = Path(path)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "arch": "INNGuidanceNet",
        "channels": model.channels,
        "n_blocks": model.n_blocks,
        "hidden_ch": model.hidden_ch,
        "clamp": model.clamp,
        "state_dict": model.state_dict(),
    }
    if extra:
        payload.update(extra)
    torch.save(payload, out_path)
    return out_path


def load_inn_guidance_model(
    checkpoint_path: Optional[Union[str, Path]] = None,
    auto_train_if_missing: bool = True,
) -> INNGuidanceNet:
    """
    Loads a trained INNGuidanceNet checkpoint from disk, or trains & saves a default
    checkpoint if none exists yet.
    """
    global _CACHED_INN_MODEL, _CACHED_INN_PATH
    resolved = Path(checkpoint_path) if checkpoint_path else DEFAULT_INN_CHECKPOINT_PATH
    key = str(resolved.resolve())

    if _CACHED_INN_MODEL is not None and _CACHED_INN_PATH == key and resolved.exists():
        return _CACHED_INN_MODEL

    if resolved.exists():
        ckpt = torch.load(resolved, map_location=DEVICE, weights_only=False)
        if isinstance(ckpt, dict) and "state_dict" in ckpt:
            model = INNGuidanceNet(
                channels=int(ckpt.get("channels", 4)),
                n_blocks=int(ckpt.get("n_blocks", 4)),
                hidden_ch=int(ckpt.get("hidden_ch", 24)),
                clamp=float(ckpt.get("clamp", 1.5)),
            ).to(DEVICE)
            model.load_state_dict(ckpt["state_dict"], strict=True)
        else:
            model = INNGuidanceNet().to(DEVICE)
            model.load_state_dict(ckpt, strict=False)
        model.eval()
    elif auto_train_if_missing:
        model, _ = train_inn_guidance(epochs=20, save_path=resolved)
        model.eval()
    else:
        model = INNGuidanceNet().to(DEVICE)
        model.eval()

    _CACHED_INN_MODEL = model
    _CACHED_INN_PATH = key
    return model


def compute_inn_guidance_map(
    rg_luma: Union[List[List[int]], np.ndarray, torch.Tensor],
    width: Optional[int] = None,
    height: Optional[int] = None,
    checkpoint_path: Optional[Union[str, Path]] = None,
    model: Optional[INNGuidanceNet] = None,
) -> List[float]:
    """
    Runs the real PyTorch INNGuidanceNet on the R+G luma image and returns
    a normalized 1D suitability list of length `width * height` in `[0, 1]`.
    """
    net = model if model is not None else load_inn_guidance_model(checkpoint_path)
    net.eval()

    if isinstance(rg_luma, torch.Tensor):
        t = rg_luma.to(DEVICE).float()
        h, w = t.shape[-2], t.shape[-1]
    else:
        arr = np.asarray(rg_luma, dtype=np.float32)
        h, w = arr.shape[:2]
        t = torch.from_numpy(arr).to(DEVICE)

    if width is not None and height is not None:
        assert w == width and h == height, f"Luma shape {(h, w)} != {(height, width)}"

    with torch.no_grad():
        gmap = net.guidance_map(t)
        g_np = gmap.detach().cpu().numpy().astype(np.float64).reshape(-1)

    g_np = np.clip(g_np, 0.0, 1.0)
    return [float(v) for v in g_np]
