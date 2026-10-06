"""
ARES-EMD-OPAP: Optimal Pixel Adjustment Process (OPAP) Implementation.
Reference: Chan, C. K., & Chen, L. M. (2004). "Hiding data in images by simple LSB
substitution and optimal pixel adjustment process." IEEE Trans. Image Process.
"""

from typing import Tuple
from .emd import emd_extract

def opap_optimize_group(c1: int, c2: int, emd1: int, emd2: int, digit: int) -> Tuple[int, int]:
    """
    Finds the exact pixel pair (y1*, y2*) in [0, 255]^2 that:
    1. Satisfies emd_extract(y1*, y2*) == digit
    2. Minimizes squared Euclidean distortion: (y1* - c1)^2 + (y2* - c2)^2
    """
    best1, best2 = emd1, emd2
    min_cost = (emd1 - c1) ** 2 + (emd2 - c2) ** 2

    # Explore neighborhood [-5, +5] for equivalent modulo states
    for d1 in range(-5, 6):
        cand1 = c1 + d1
        if not (0 <= cand1 <= 255):
            continue
        for d2 in range(-5, 6):
            cand2 = c2 + d2
            if not (0 <= cand2 <= 255):
                continue
            if emd_extract(cand1, cand2) == digit:
                cost = (cand1 - c1) ** 2 + (cand2 - c2) ** 2
                if cost < min_cost:
                    min_cost = cost
                    best1, best2 = cand1, cand2

    return best1, best2
