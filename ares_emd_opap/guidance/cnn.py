"""
ARES-EMD-OPAP: Real Residual CNN Guidance Module (`ares_emd_opap/guidance/cnn.py`).

Provides a trainable and checkpoint-loadable PyTorch Residual CNN with Channel and
Spatial Attention that takes a single-channel R+G luma tensor of shape (B, 1, H, W)
(or (H, W) / 2D list) and outputs a spatial suitability/attention map of identical
resolution (H, W) with values strictly in [0, 1].

Note: This CNN guides adaptive pixel-pair selection only; secret payload bits are
embedded in the blue channel via EMD (n=2) + OPAP.
"""

from __future__ import annotations

from pathlib import Path
from typing import List, Optional, Tuple, Union

import numpy as np
import torch
import torch.nn as nn
import torch.nn.functional as F

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
DEFAULT_CHECKPOINT_PATH = Path(__file__).resolve().parent / "checkpoints" / "cnn_guidance.pt"
HYBRID_REF_CHECKPOINT_PATH = (
    Path(__file__).resolve().parents[2] / "models" / "hybrid" / "ares_hybrid_inn.pt"
)
UPGRADED_REF_CHECKPOINT_PATH = (
    Path(__file__).resolve().parents[2] / "models" / "upgraded" / "ares_upgraded.pt"
)


class ResidualBlock(nn.Module):
    """Two-layer 3x3 residual block with BatchNorm and ReLU."""

    def __init__(self, ch: int):
        super().__init__()
        self.c1 = nn.Conv2d(ch, ch, kernel_size=3, padding=1)
        self.b1 = nn.BatchNorm2d(ch)
        self.c2 = nn.Conv2d(ch, ch, kernel_size=3, padding=1)
        self.b2 = nn.BatchNorm2d(ch)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        r = F.relu(self.b1(self.c1(x)))
        return F.relu(x + self.b2(self.c2(r)))


class ChannelAttention(nn.Module):
    """Squeeze-and-Excitation style channel attention."""

    def __init__(self, ch: int, reduction: int = 4):
        super().__init__()
        hidden = max(ch // reduction, 4)
        self.fc = nn.Sequential(
            nn.AdaptiveAvgPool2d(1),
            nn.Flatten(),
            nn.Linear(ch, hidden),
            nn.ReLU(inplace=True),
            nn.Linear(hidden, ch),
            nn.Sigmoid(),
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        w = self.fc(x).unsqueeze(-1).unsqueeze(-1)
        return x * w


class SpatialAttention(nn.Module):
    """7x7 spatial attention gate."""

    def __init__(self, ch: int):
        super().__init__()
        self.conv = nn.Conv2d(ch, 1, kernel_size=7, padding=3)

    def forward(self, x: torch.Tensor) -> Tuple[torch.Tensor, torch.Tensor]:
        att = torch.sigmoid(self.conv(x))
        return x * att, att


class CNNSpatialGuidanceNet(nn.Module):
    """
    Lightweight CPU-friendly Residual CNN for R+G luma spatial suitability guidance.

    Input:
      luma_tensor: (B, 1, H, W) or (1, H, W) or (H, W) float tensor in [0, 1] (or [0, 255])
    Output:
      attention_map: (B, 1, H, W) tensor with values strictly in [0, 1] and same HxW.
    """

    def __init__(self, base: int = 16):
        super().__init__()
        self.base = base
        self.stem = nn.Sequential(
            nn.Conv2d(1, base, kernel_size=3, padding=1),
            nn.ReLU(inplace=True),
            ResidualBlock(base),
        )
        self.down = nn.Sequential(
            nn.Conv2d(base, base * 2, kernel_size=3, stride=2, padding=1),
            nn.ReLU(inplace=True),
            ResidualBlock(base * 2),
        )
        self.bottleneck = ResidualBlock(base * 2)
        self.ca = ChannelAttention(base * 2)
        self.sa = SpatialAttention(base * 2)
        self.up_conv = nn.Sequential(
            nn.Conv2d(base * 2 + base, base, kernel_size=3, padding=1),
            nn.ReLU(inplace=True),
            ResidualBlock(base),
            nn.Conv2d(base, 1, kernel_size=3, padding=1),
            nn.Sigmoid(),
        )

    def forward(self, luma_tensor: torch.Tensor) -> torch.Tensor:
        orig_ndim = luma_tensor.ndim
        if orig_ndim == 2:
            x = luma_tensor.unsqueeze(0).unsqueeze(0)
        elif orig_ndim == 3:
            x = luma_tensor.unsqueeze(0)
        elif orig_ndim == 4:
            x = luma_tensor
        else:
            raise ValueError(f"Expected 2D, 3D, or 4D tensor, got shape {tuple(luma_tensor.shape)}")

        x = x.float()
        if x.max() > 1.5:
            x = x / 255.0

        h, w = x.shape[-2], x.shape[-1]
        f1 = self.stem(x)
        f2 = self.down(f1)
        b = self.bottleneck(f2)
        b = self.ca(b)
        b, _ = self.sa(b)
        b_up = F.interpolate(b, size=(h, w), mode="bilinear", align_corners=False)
        fused = torch.cat([b_up, f1], dim=1)
        out = self.up_conv(fused)
        out = torch.clamp(out, 0.0, 1.0)

        if orig_ndim == 2:
            return out.squeeze(0).squeeze(0)
        if orig_ndim == 3:
            return out.squeeze(0)
        return out


_CACHED_CNN_MODEL: Optional[CNNSpatialGuidanceNet] = None
_CACHED_CNN_PATH: Optional[str] = None


def _proxy_texture_target(luma_batch: torch.Tensor) -> torch.Tensor:
    """
    Self-supervised proxy target from local variance + Sobel edge energy on R+G luma.
    Used to train the CNN so its learned weights highlight textured, high-entropy regions.
    """
    # luma_batch: (B, 1, H, W) in [0, 1]
    mean = F.avg_pool2d(luma_batch, kernel_size=5, stride=1, padding=2)
    sq_mean = F.avg_pool2d(luma_batch * luma_batch, kernel_size=5, stride=1, padding=2)
    var = torch.clamp(sq_mean - mean * mean, min=0.0)
    std = torch.sqrt(var + 1e-8)

    kx = torch.tensor(
        [[-1.0, 0.0, 1.0], [-2.0, 0.0, 2.0], [-1.0, 0.0, 1.0]],
        device=luma_batch.device,
        dtype=luma_batch.dtype,
    ).view(1, 1, 3, 3)
    ky = torch.tensor(
        [[-1.0, -2.0, -1.0], [0.0, 0.0, 0.0], [1.0, 2.0, 1.0]],
        device=luma_batch.device,
        dtype=luma_batch.dtype,
    ).view(1, 1, 3, 3)
    gx = F.conv2d(luma_batch, kx, padding=1)
    gy = F.conv2d(luma_batch, ky, padding=1)
    grad = torch.sqrt(gx * gx + gy * gy + 1e-8)

    # Normalize per sample in batch
    b = luma_batch.shape[0]
    std_norm = std / (std.view(b, -1).max(dim=1)[0].view(b, 1, 1, 1) + 1e-6)
    grad_norm = grad / (grad.view(b, -1).max(dim=1)[0].view(b, 1, 1, 1) + 1e-6)
    target = torch.clamp(0.6 * std_norm + 0.4 * grad_norm, 0.0, 1.0)
    return target


def _try_warmstart_from_ares_reference(model: CNNSpatialGuidanceNet) -> None:
    """
    Optionally warm-starts matching bottleneck/attention statistics from
    extracted_ares / models/hybrid checkpoint if present before fine-tuning.
    """
    for ref_path in (HYBRID_REF_CHECKPOINT_PATH, UPGRADED_REF_CHECKPOINT_PATH):
        if ref_path.exists():
            try:
                ckpt = torch.load(ref_path, map_location="cpu", weights_only=False)
                state = ckpt.get("model", ckpt.get("encoder", ckpt))
                if isinstance(state, dict):
                    model.load_state_dict(state, strict=False)
                break
            except Exception:
                continue


def train_cnn_guidance(
    epochs: int = 25,
    batch_size: int = 8,
    patch_size: int = 48,
    lr: float = 3e-3,
    save_path: Optional[Union[str, Path]] = DEFAULT_CHECKPOINT_PATH,
    seed: int = 2026,
) -> Tuple[CNNSpatialGuidanceNet, List[float]]:
    """
    Trains CNNSpatialGuidanceNet on synthetic multi-frequency texture/edge/smooth patches
    to predict normalized spatial suitability in [0, 1], and saves the checkpoint.
    """
    torch.manual_seed(seed)
    np.random.seed(seed)

    model = CNNSpatialGuidanceNet(base=16).to(DEVICE)
    _try_warmstart_from_ares_reference(model)
    model.train()

    optimizer = torch.optim.Adam(model.parameters(), lr=lr)
    losses: List[float] = []

    yy, xx = torch.meshgrid(
        torch.linspace(0, 1, patch_size, device=DEVICE),
        torch.linspace(0, 1, patch_size, device=DEVICE),
        indexing="ij",
    )

    for _ in range(epochs):
        batch_patches = []
        for b in range(batch_size):
            freq1 = float(np.random.uniform(3.0, 18.0))
            freq2 = float(np.random.uniform(5.0, 24.0))
            sin_tex = 0.5 + 0.5 * torch.sin(xx * freq1 * 3.14159) * torch.cos(yy * freq2 * 3.14159)
            noise = torch.rand((patch_size, patch_size), device=DEVICE)
            mask = (xx > float(np.random.uniform(0.25, 0.75))).float()
            smooth = 0.5 * xx + 0.5 * yy
            patch = mask * (0.55 * sin_tex + 0.45 * noise) + (1.0 - mask) * smooth
            batch_patches.append(patch.unsqueeze(0))

        inp = torch.stack(batch_patches, dim=0)  # (B, 1, H, W)
        with torch.no_grad():
            target = _proxy_texture_target(inp)

        pred = model(inp)
        loss = F.mse_loss(pred, target) + 0.15 * F.l1_loss(pred, target)
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
        losses.append(float(loss.item()))

    model.eval()
    if save_path is not None:
        save_cnn_checkpoint(model, save_path, extra={"loss_history": losses})
    return model, losses


def save_cnn_checkpoint(
    model: CNNSpatialGuidanceNet,
    path: Union[str, Path] = DEFAULT_CHECKPOINT_PATH,
    extra: Optional[dict] = None,
) -> Path:
    out_path = Path(path)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "arch": "CNNSpatialGuidanceNet",
        "base": model.base,
        "state_dict": model.state_dict(),
    }
    if extra:
        payload.update(extra)
    torch.save(payload, out_path)
    return out_path


def load_cnn_guidance_model(
    checkpoint_path: Optional[Union[str, Path]] = None,
    auto_train_if_missing: bool = True,
) -> CNNSpatialGuidanceNet:
    """
    Loads a trained CNNSpatialGuidanceNet from disk, or trains & saves a default
    checkpoint if none exists yet.
    """
    global _CACHED_CNN_MODEL, _CACHED_CNN_PATH
    resolved = Path(checkpoint_path) if checkpoint_path else DEFAULT_CHECKPOINT_PATH
    key = str(resolved.resolve())

    if _CACHED_CNN_MODEL is not None and _CACHED_CNN_PATH == key and resolved.exists():
        return _CACHED_CNN_MODEL

    if resolved.exists():
        ckpt = torch.load(resolved, map_location=DEVICE, weights_only=False)
        base = int(ckpt.get("base", 16)) if isinstance(ckpt, dict) else 16
        model = CNNSpatialGuidanceNet(base=base).to(DEVICE)
        state = ckpt.get("state_dict", ckpt) if isinstance(ckpt, dict) else ckpt
        model.load_state_dict(state, strict=True)
        model.eval()
    elif auto_train_if_missing:
        model, _ = train_cnn_guidance(epochs=20, save_path=resolved)
        model.eval()
    else:
        model = CNNSpatialGuidanceNet(base=16).to(DEVICE)
        model.eval()

    _CACHED_CNN_MODEL = model
    _CACHED_CNN_PATH = key
    return model


def compute_cnn_guidance_map(
    rg_luma: Union[List[List[int]], np.ndarray, torch.Tensor],
    width: Optional[int] = None,
    height: Optional[int] = None,
    checkpoint_path: Optional[Union[str, Path]] = None,
    model: Optional[CNNSpatialGuidanceNet] = None,
) -> List[float]:
    """
    Runs the real PyTorch CNNSpatialGuidanceNet on the R+G luma image and returns
    a normalized 1D suitability list of length `width * height` in [0, 1].
    """
    net = model if model is not None else load_cnn_guidance_model(checkpoint_path)
    net.eval()

    if isinstance(rg_luma, torch.Tensor):
        t = rg_luma.to(DEVICE).float()
        if t.ndim == 2:
            h, w = t.shape
        else:
            h, w = t.shape[-2], t.shape[-1]
    else:
        arr = np.asarray(rg_luma, dtype=np.float32)
        h, w = arr.shape[:2]
        t = torch.from_numpy(arr).to(DEVICE)

    if width is not None and height is not None:
        assert w == width and h == height, f"Luma shape {(h, w)} != {(height, width)}"

    with torch.no_grad():
        att = net(t)  # (H, W) in [0, 1]
        att_np = att.detach().cpu().numpy().astype(np.float64).reshape(-1)

    lo = float(att_np.min())
    hi = float(att_np.max())
    if hi - lo > 1e-8:
        att_np = (att_np - lo) / (hi - lo)
    att_np = np.clip(att_np, 0.0, 1.0)
    return [float(v) for v in att_np]
