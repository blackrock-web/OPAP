"""
ARES-EMD-OPAP: Evaluation Metrics.
"""

import math
from typing import List, Dict, Any

def mse(cover_rgb: List[List[List[int]]], stego_rgb: List[List[List[int]]]) -> float:
    height = len(cover_rgb)
    width = len(cover_rgb[0])
    total_diff_sq = 0
    total_samples = height * width * 3

    for y in range(height):
        for x in range(width):
            for c in range(3):
                diff = cover_rgb[y][x][c] - stego_rgb[y][x][c]
                total_diff_sq += diff * diff

    return total_diff_sq / max(1, total_samples)

def psnr(cover_rgb: List[List[List[int]]], stego_rgb: List[List[List[int]]]) -> float:
    m = mse(cover_rgb, stego_rgb)
    if m <= 1e-12:
        return 99.0
    return 10.0 * math.log10((255.0 ** 2) / m)

def ssim_global(cover_rgb: List[List[List[int]]], stego_rgb: List[List[List[int]]]) -> float:
    height = len(cover_rgb)
    width = len(cover_rgb[0])
    n = height * width * 3

    sx, sy, sxx, syy, sxy = 0.0, 0.0, 0.0, 0.0, 0.0
    for y in range(height):
        for x in range(width):
            for c in range(3):
                x_val = cover_rgb[y][x][c]
                y_val = stego_rgb[y][x][c]
                sx += x_val
                sy += y_val
                sxx += x_val * x_val
                syy += y_val * y_val
                sxy += x_val * y_val

    mu_x = sx / n
    mu_y = sy / n
    var_x = (sxx / n) - (mu_x * mu_x)
    var_y = (syy / n) - (mu_y * mu_y)
    cov_xy = (sxy / n) - (mu_x * mu_y)

    c1 = (0.01 * 255) ** 2
    c2 = (0.03 * 255) ** 2
    den = (mu_x * mu_x + mu_y * mu_y + c1) * (var_x + var_y + c2)
    if den == 0:
        return 1.0
    return ((2 * mu_x * mu_y + c1) * (2 * cov_xy + c2)) / den
