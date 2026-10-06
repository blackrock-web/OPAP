"""
ARES-EMD-OPAP: High-Level Embedding and Extraction Pipelines.
"""

from typing import Dict, Any, Tuple, List
from .emd import emd_extract, emd_embed_group, bytes_to_base5, base5_to_bytes
from .opap import opap_optimize_group
from ..adaptive.cost_map import get_adaptive_pixel_pairs
from ..crypto.aes_gcm import encrypt_payload, decrypt_payload

def embed(
    cover_rgb: List[List[List[int]]],
    secret_data: str,
    passphrase: str,
    use_adaptive: bool = True,
    use_opap: bool = True,
    use_crypto: bool = True,
    weights: Dict[str, float] = None,
) -> Tuple[List[List[List[int]]], Dict[str, Any]]:
    """
    Complete ARES-EMD-OPAP embedding pipeline.
    cover_rgb: 3D list [height][width][3] with R, G, B channels in [0, 255].
    """
    height = len(cover_rgb)
    width = len(cover_rgb[0])

    # 1. Payload preparation
    if use_crypto:
        payload_bytes = encrypt_payload(secret_data, passphrase)
    else:
        raw = secret_data.encode("utf-8")
        payload_bytes = b"ABL1" + len(raw).to_bytes(4, "big") + raw

    digits = bytes_to_base5(payload_bytes)
    required_groups = len(digits)

    # 2. Extract R+G luma for adaptive decisions
    rg_luma = [
        [(cover_rgb[y][x][0] + cover_rgb[y][x][1]) // 2 for x in range(width)]
        for y in range(height)
    ]

    # 3. Generate eligible pixel pairs
    pair_coords = get_adaptive_pixel_pairs(rg_luma, width, height, passphrase, weights if use_adaptive else {"var": 0})
    available_groups = len(pair_coords)
    capacity_bits = int(available_groups * 2.3219) # log2(5) ~= 2.3219

    if available_groups < required_groups:
        raise ValueError(
            f"Payload exceeds available adaptive EMD capacity. Required {required_groups} groups, available {available_groups}."
        )

    # 4. Deep clone cover image for stego output
    stego_rgb = [
        [[cover_rgb[y][x][c] for c in range(3)] for x in range(width)]
        for y in range(height)
    ]

    modified_pixels = 0
    total_squared_err = 0
    total_abs_err = 0
    max_err = 0
    opap_optimized = 0

    # 5. Embed on blue channel (channel index 2)
    for i in range(required_groups):
        x1, y1, x2, y2 = pair_coords[i]
        c1 = cover_rgb[y1][x1][2]
        c2 = cover_rgb[y2][x2][2]
        d = digits[i]

        e1, e2 = emd_embed_group(c1, c2, d)
        cost_emd = (e1 - c1) ** 2 + (e2 - c2) ** 2

        if use_opap:
            o1, o2 = opap_optimize_group(c1, c2, e1, e2, d)
            cost_opap = (o1 - c1) ** 2 + (o2 - c2) ** 2
            if cost_opap < cost_emd:
                opap_optimized += 1
            s1, s2 = o1, o2
        else:
            s1, s2 = e1, e2

        stego_rgb[y1][x1][2] = s1
        stego_rgb[y2][x2][2] = s2

        err1 = abs(s1 - c1)
        err2 = abs(s2 - c2)
        if s1 != c1: modified_pixels += 1
        if s2 != c2: modified_pixels += 1

        total_abs_err += err1 + err2
        total_squared_err += (s1 - c1) ** 2 + (s2 - c2) ** 2
        max_err = max(max_err, err1, err2)

    total_eval_pixels = required_groups * 2
    metadata = {
        "payload_bytes": len(payload_bytes),
        "payload_bits": len(payload_bytes) * 8,
        "required_groups": required_groups,
        "available_capacity_bits": capacity_bits,
        "modified_pixels": modified_pixels,
        "modified_pixel_pct": (100.0 * modified_pixels) / max(1, total_eval_pixels),
        "average_abs_error": total_abs_err / max(1, total_eval_pixels),
        "max_pixel_error": max_err,
        "mse_blue": total_squared_err / max(1, total_eval_pixels),
        "opap_optimized_count": opap_optimized,
        "auth_status": "AUTHENTICATED" if use_crypto else "NONE",
    }

    return stego_rgb, metadata

def extract(
    stego_rgb: List[List[List[int]]],
    passphrase: str,
    use_adaptive: bool = True,
    use_crypto: bool = True,
    weights: Dict[str, float] = None,
) -> str:
    """
    Complete ARES-EMD-OPAP extraction pipeline.
    """
    height = len(stego_rgb)
    width = len(stego_rgb[0])

    # Regenerate embedding locations from invariant R+G luma
    rg_luma = [
        [(stego_rgb[y][x][0] + stego_rgb[y][x][1]) // 2 for x in range(width)]
        for y in range(height)
    ]

    pair_coords = get_adaptive_pixel_pairs(rg_luma, width, height, passphrase, weights if use_adaptive else {"var": 0})

    if use_crypto:
        # Header is 37 bytes -> 148 base-5 digits
        header_digits = []
        for i in range(148):
            x1, y1, x2, y2 = pair_coords[i]
            header_digits.append(emd_extract(stego_rgb[y1][x1][2], stego_rgb[y2][x2][2]))

        header_bytes = base5_to_bytes(header_digits, 37)
        if header_bytes[:4] != b"ARES":
            raise ValueError("Authentication Failure: Magic header mismatch")

        import struct
        ct_len = struct.unpack(">I", header_bytes[33:37])[0]
        total_bytes = 37 + ct_len
        total_digits = total_bytes * 4

        all_digits = []
        for i in range(total_digits):
            x1, y1, x2, y2 = pair_coords[i]
            all_digits.append(emd_extract(stego_rgb[y1][x1][2], stego_rgb[y2][x2][2]))

        full_serialized = base5_to_bytes(all_digits, total_bytes)
        return decrypt_payload(full_serialized, passphrase)
    else:
        # Unencrypted framed extraction
        header_digits = []
        for i in range(32):
            x1, y1, x2, y2 = pair_coords[i]
            header_digits.append(emd_extract(stego_rgb[y1][x1][2], stego_rgb[y2][x2][2]))

        header_bytes = base5_to_bytes(header_digits, 8)
        if header_bytes[:4] != b"ABL1":
            raise ValueError("Invalid ablation frame")

        import struct
        raw_len = struct.unpack(">I", header_bytes[4:8])[0]
        total_bytes = 8 + raw_len
        total_digits = total_bytes * 4

        all_digits = []
        for i in range(total_digits):
            x1, y1, x2, y2 = pair_coords[i]
            all_digits.append(emd_extract(stego_rgb[y1][x1][2], stego_rgb[y2][x2][2]))

        full_bytes = base5_to_bytes(all_digits, total_bytes)
        return full_bytes[8:8 + raw_len].decode("utf-8")
