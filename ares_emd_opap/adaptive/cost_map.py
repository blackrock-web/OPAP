"""
ARES-EMD-OPAP: Multi-Feature Adaptive Distortion & Cost Map Engine.
"""

import math
from typing import List, Tuple, Dict

def compute_variance_map(image_data: List[List[int]], width: int, height: int, block: int = 8) -> List[float]:
    out = [0.0] * (width * height)
    step = max(1, block // 2)
    for y in range(0, height - block + 1, step):
        for x in range(0, width - block + 1, step):
            vals = [image_data[y + dy][x + dx] for dy in range(block) for dx in range(block)]
            mean = sum(vals) / len(vals)
            var = sum((v - mean) ** 2 for v in vals) / len(vals)
            for dy in range(block):
                for dx in range(block):
                    idx = (y + dy) * width + (x + dx)
                    if var > out[idx]:
                        out[idx] = var
    max_v = max(out) or 1.0
    return [v / max_v for v in out]

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
    max_v = max(out) or 1.0
    return [v / max_v for v in out]

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
    max_v = max(out) or 1.0
    return [v / max_v for v in out]

def compute_cnn_spatial_attention(image_data: List[List[int]], width: int, height: int) -> List[float]:
    out = [0.0] * (width * height)
    for y in range(2, height - 2):
        for x in range(2, width - 2):
            c = image_data[y][x]
            s = sum(abs(image_data[y + dy][x + dx] - c) for dy in range(-2, 3) for dx in range(-2, 3))
            out[y * width + x] = s / 25.0
    max_v = max(out) or 1.0
    return [v / max_v for v in out]

def compute_inn_guidance(image_data: List[List[int]], width: int, height: int) -> List[float]:
    out = [0.0] * (width * height)
    for y in range(1, height - 1):
        for x in range(1, width - 1):
            p1 = image_data[y][x]
            p2 = image_data[y][x + 1]
            p3 = image_data[y + 1][x]
            p4 = image_data[y + 1][x + 1]
            lh = abs(p1 - p2 + p3 - p4)
            hl = abs(p1 + p2 - p3 - p4)
            hh = abs(p1 - p2 - p3 + p4)
            out[y * width + x] = (lh + hl + hh) / 3.0
    max_v = max(out) or 1.0
    return [v / max_v for v in out]

def build_adaptive_cost_map(
    rg_luma: List[List[int]],
    width: int,
    height: int,
    weights: Dict[str, float] = None,
) -> List[float]:
    """
    Constructs normalized suitability map in [0, 1].
    Higher suitability = Lower distortion cost.
    """
    if weights is None:
        weights = {"var": 0.25, "grad": 0.20, "lap": 0.15, "att": 0.25, "inn": 0.15}

    v_map = compute_variance_map(rg_luma, width, height) if weights.get("var", 0) > 0 else [0.0] * (width * height)
    g_map = compute_gradient_map(rg_luma, width, height) if weights.get("grad", 0) > 0 else [0.0] * (width * height)
    l_map = compute_laplacian_map(rg_luma, width, height) if weights.get("lap", 0) > 0 else [0.0] * (width * height)
    a_map = compute_cnn_spatial_attention(rg_luma, width, height) if weights.get("att", 0) > 0 else [0.0] * (width * height)
    i_map = compute_inn_guidance(rg_luma, width, height) if weights.get("inn", 0) > 0 else [0.0] * (width * height)

    total_w = sum(weights.values()) or 1.0
    suitability = [
        (
            weights.get("var", 0) * v_map[k] +
            weights.get("grad", 0) * g_map[k] +
            weights.get("lap", 0) * l_map[k] +
            weights.get("att", 0) * a_map[k] +
            weights.get("inn", 0) * i_map[k]
        ) / total_w
        for k in range(width * height)
    ]
    return suitability

def get_adaptive_pixel_pairs(
    rg_luma: List[List[int]],
    width: int,
    height: int,
    password: str,
    weights: Dict[str, float] = None,
) -> List[Tuple[int, int, int, int]]:
    """
    Returns list of pixel coordinate pairs: ((x1, y1), (x2, y2))
    sorted by highest suitability (lowest cost) first.
    """
    suitability = build_adaptive_cost_map(rg_luma, width, height, weights)

    candidates = []
    for y in range(height):
        for x in range(0, width - 1, 2):
            idx1 = y * width + x
            idx2 = y * width + (x + 1)
            cost = 1.0 - 0.5 * (suitability[idx1] + suitability[idx2])
            candidates.append((cost, (x, y), (x + 1, y)))

    # Sort lowest cost first
    candidates.sort(key=lambda c: c[0])

    # Deterministic permutation using password hash
    import hashlib
    seed = hashlib.sha256((password + "|emd_pairs").encode()).digest()
    n = len(candidates)
    top_75 = int(n * 0.75)

    # Keyed shuffle on top 75%
    head = [c for c in candidates[:top_75]]
    for i in range(len(head) - 1, 0, -1):
        h_val = int.from_bytes(hashlib.sha256(seed + i.to_bytes(4, 'big')).digest()[:4], 'big')
        j = h_val % (i + 1)
        head[i], head[j] = head[j], head[i]

    all_pairs = head + candidates[top_75:]
    return [(c[1][0], c[1][1], c[2][0], c[2][1]) for c in all_pairs]
