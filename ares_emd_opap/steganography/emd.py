"""
ARES-EMD-OPAP: Exploiting Modification Direction (EMD) Implementation.
Reference: Zhang, X., & Wang, S. (2006). "Efficient steganographic embedding by
exploiting modification direction." IEEE Communications Letters, 10(11), 781-783.
"""

from typing import List, Tuple

def emd_extract(g1: int, g2: int) -> int:
    """
    EMD extraction function for a pair of pixels (n=2, radix=5):
    f(g1, g2) = (1 * g1 + 2 * g2) mod 5
    """
    return (g1 + 2 * g2) % 5

def emd_embed_group(c1: int, c2: int, digit: int) -> Tuple[int, int]:
    """
    Zhang & Wang (2006) EMD embedding for n=2 pixels:
    Modifies at most ONE pixel by +/- 1 to represent digit in {0, 1, 2, 3, 4}.
    Boundary handling guarantees pixel values remain in [0, 255].
    """
    cur = emd_extract(c1, c2)
    s = (digit - cur) % 5

    g1, g2 = c1, c2
    if s == 0:
        return g1, g2
    elif s == 1:
        g1 = c1 + 1 if c1 + 1 <= 255 else c1 - 4
    elif s == 2:
        g2 = c2 + 1 if c2 + 1 <= 255 else c2 - 4
    elif s == 3:
        g2 = c2 - 1 if c2 - 1 >= 0 else c2 + 4
    elif s == 4:
        g1 = c1 - 1 if c1 - 1 >= 0 else c1 + 4

    return max(0, min(255, g1)), max(0, min(255, g2))

def bytes_to_base5(data: bytes) -> List[int]:
    """
    Converts binary bytes into a stream of base-5 digits (4 digits per byte).
    5^4 = 625 >= 256. Exact reversible mapping.
    """
    digits = []
    for b in data:
        val = b
        for _ in range(4):
            digits.append(val % 5)
            val //= 5
    return digits

def base5_to_bytes(digits: List[int], target_len: int = None) -> bytes:
    """
    Converts stream of base-5 digits back into binary bytes.
    """
    num_bytes = target_len if target_len is not None else len(digits) // 4
    out = bytearray(num_bytes)
    for i in range(num_bytes):
        d0 = digits[i * 4 + 0] if i * 4 + 0 < len(digits) else 0
        d1 = digits[i * 4 + 1] if i * 4 + 1 < len(digits) else 0
        d2 = digits[i * 4 + 2] if i * 4 + 2 < len(digits) else 0
        d3 = digits[i * 4 + 3] if i * 4 + 3 < len(digits) else 0
        val = d0 + d1 * 5 + d2 * 25 + d3 * 125
        out[i] = max(0, min(255, val))
    return bytes(out)
