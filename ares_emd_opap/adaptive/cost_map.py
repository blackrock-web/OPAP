"""
ARES-EMD-OPAP: Multi-Feature Adaptive Distortion & Cost Map Engine.

Fuses classical spatial features (variance, Sobel gradient, Laplacian) with
real PyTorch neural guidance maps (`CNNSpatialGuidanceNet` and `INNGuidanceNet`)
strictly computed on R+G luma so extraction ranking remains 100% invariant to
blue-channel EMD-OPAP modifications.
"""

import hashlib
import math
from typing import Dict, List, Optional, Tuple

from ..guidance.cnn import compute_cnn_guidance_map
from ..guidance.inn import compute_inn_guidance_map

DEFAULT_COST_WEIGHTS: Dict[str, float] = {
    "var": 0.25,
    "grad": 0.20,
    "lap": 0.15,
    "cnn": 0.25,
    "inn": 0.15,
}


def _normalize_list(values: List[float]) -> List[float]:
    if not values:
        return []
    lo = min(values)
    hi = max(values)
    span = hi - lo
    if span <= 1e-8:
        return [0.0 for _ in values]
    return [max(0.0, min(1.0, (v - lo) / span)) for v in values]


def compute_variance_map(image_data: List[List[int]], width: int, height: int, block: int = 8) -> List[float]:
    out = [0.0] * (width * height)
    eff_block = min(block, width, height)
    step = max(1, eff_block // 2)
    for y in range(0, height - eff_block + 1, step):
        for x in range(0, width - eff_block + 1, step):
            vals = [image_data[y + dy][x + dx] for dy in range(eff_block) for dx in range(eff_block)]
            mean = sum(vals) / len(vals)
            var = sum((v - mean) ** 2 for v in vals) / len(vals)
            for dy in range(eff_block):
                for dx in range(eff_block):
                    idx = (y + dy) * width + (x + dx)
                    if var > out[idx]:
                        out[idx] = var
    return _normalize_list(out)


def compute_gradient_map(image_data: List[List[int]], width: int, height: int) -> List[float]:
    out = [0.0] * (width * height)
    for y in range(1, height - 1):
        for x in range(1, width - 1):
            gx = (
                -1 * image_data[y - 1][x - 1] + 1 * image_data[y - 1][x + 1] +
                -2 * image_data[y][x - 1]     + 2 * image_data[y][x + 1] +
                -1 * image_data[y + 1][x - 1] + 1 * image_data[y + 1][x + 1]
            )
            gy = (
                -1 * image_data[y - 1][x - 1] + -2 * image_data[y - 1][x] + -1 * image_data[y - 1][x + 1] +
                 1 * image_data[y + 1][x - 1] +  2 * image_data[y + 1][x] +  1 * image_data[y + 1][x + 1]
            )
            out[y * width + x] = math.sqrt(gx * gx + gy * gy)
    return _normalize_list(out)


def compute_laplacian_map(image_data: List[List[int]], width: int, height: int) -> List[float]:
    out = [0.0] * (width * height)
    for y in range(1, height - 1):
        for x in range(1, width - 1):
            center = image_data[y][x]
            top = image_data[y - 1][x]
            bottom = image_data[y + 1][x]
            left = image_data[y][x - 1]
            right = image_data[y][x + 1]
            lap = abs(top + bottom + left + right - 4 * center)
            out[y * width + x] = float(lap)
    return _normalize_list(out)


def compute_cnn_spatial_attention(image_data: List[List[int]], width: int, height: int) -> List[float]:
    """
    Computes spatial suitability map in [0, 1] using the real PyTorch Residual CNN
    (`CNNSpatialGuidanceNet`) on the R+G luma tensor.
    """
    return compute_cnn_guidance_map(image_data, width=width, height=height)


def compute_inn_guidance(image_data: List[List[int]], width: int, height: int) -> List[float]:
    """
    Computes spatial suitability map in [0, 1] using the real PyTorch Invertible Neural Network
    (`INNGuidanceNet` with RealNVP-style affine coupling layers) on the R+G luma tensor.
    """
    return compute_inn_guidance_map(image_data, width=width, height=height)


def build_adaptive_cost_map(
    rg_luma: List[List[int]],
    width: int,
    height: int,
    weights: Optional[Dict[str, float]] = None,
    use_cnn: bool = True,
    use_inn: bool = True,
) -> List[float]:
    """
    Constructs normalized suitability map in [0, 1]:
      score = w_var*var + w_grad*grad + w_lap*lap + w_cnn*cnn_map + w_inn*inn_map
    Higher suitability = Lower embedding distortion cost.
    """
    if weights is None:
        w = dict(DEFAULT_COST_WEIGHTS)
    else:
        w = dict(weights)

    w_var = float(w.get("var", 0.0))
    w_grad = float(w.get("grad", 0.0))
    w_lap = float(w.get("lap", 0.0))
    # Support both "cnn" and legacy "att" key
    w_cnn = float(w.get("cnn", w.get("att", 0.0))) if use_cnn else 0.0
    w_inn = float(w.get("inn", 0.0)) if use_inn else 0.0

    n = width * height
    v_map = compute_variance_map(rg_luma, width, height) if w_var > 0 else [0.0] * n
    g_map = compute_gradient_map(rg_luma, width, height) if w_grad > 0 else [0.0] * n
    l_map = compute_laplacian_map(rg_luma, width, height) if w_lap > 0 else [0.0] * n
    c_map = compute_cnn_spatial_attention(rg_luma, width, height) if w_cnn > 0 else [0.0] * n
    i_map = compute_inn_guidance(rg_luma, width, height) if w_inn > 0 else [0.0] * n

    total_w = w_var + w_grad + w_lap + w_cnn + w_inn
    if total_w <= 1e-12:
        return [0.0] * n

    suitability = []
    for k in range(n):
        raw_score = (
            w_var * v_map[k]
            + w_grad * g_map[k]
            + w_lap * l_map[k]
            + w_cnn * c_map[k]
            + w_inn * i_map[k]
        ) / total_w
        suitability.append(max(0.0, min(1.0, float(raw_score))))
    return suitability


def get_adaptive_pixel_pairs(
    rg_luma: List[List[int]],
    width: int,
    height: int,
    password: str,
    weights: Optional[Dict[str, float]] = None,
    use_cnn: bool = True,
    use_inn: bool = True,
) -> List[Tuple[int, int, int, int]]:
    """
    Returns list of horizontal pixel coordinate pairs (x1, y1, x2, y2) for n=2 EMD.
    Ranked by lowest distortion cost (highest fused suitability) first, with a
    password-keyed deterministic shuffle on the top 75% lowest-cost pairs.
    """
    suitability = build_adaptive_cost_map(
        rg_luma,
        width,
        height,
        weights=weights,
        use_cnn=use_cnn,
        use_inn=use_inn,
    )

    candidates = []
    for y in range(height):
        for x in range(0, width - 1, 2):
            idx1 = y * width + x
            idx2 = y * width + (x + 1)
            cost = 1.0 - 0.5 * (suitability[idx1] + suitability[idx2])
            candidates.append((cost, (x, y), (x + 1, y)))

    # Sort lowest cost first (ties broken deterministically by y, x order)
    candidates.sort(key=lambda c: c[0])

    # Deterministic permutation using password hash on top 75%
    seed = hashlib.sha256((password + "|emd_pairs").encode("utf-8")).digest()
    n = len(candidates)
    top_75 = int(n * 0.75)

    head = list(candidates[:top_75])
    for i in range(len(head) - 1, 0, -1):
        h_val = int.from_bytes(
            hashlib.sha256(seed + i.to_bytes(4, "big")).digest()[:4],
            "big",
        )
        j = h_val % (i + 1)
        head[i], head[j] = head[j], head[i]

    all_pairs = head + candidates[top_75:]
    return [(c[1][0], c[1][1], c[2][0], c[2][1]) for c in all_pairs]

