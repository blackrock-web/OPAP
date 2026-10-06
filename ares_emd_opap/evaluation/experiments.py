"""
ARES-EMD-OPAP: Ablation Study & Comparative Experiments Runner.
Covers Section 16 & Section 17.
"""

from typing import List, Dict, Any
from ..steganography.embed import embed, extract
from .metrics import psnr, ssim_global, mse

def run_ablation_study(
    cover_rgb: List[List[List[int]]],
    secret_payload: str,
    passphrase: str,
) -> List[Dict[str, Any]]:
    """
    Executes the 5 required ablation configurations:
    MODEL 1: EMD + OPAP (pure sequential)
    MODEL 2: CNN-assisted adaptive EMD + OPAP
    MODEL 3: CNN + attention + adaptive EMD + OPAP
    MODEL 4: CNN + attention + INN + adaptive EMD + OPAP
    MODEL 5: Proposed ARES-EMD-OPAP (Full with AES-GCM)
    """
    ablation_configs = [
        {
            "id": "model_1",
            "name": "Model 1: EMD + OPAP",
            "use_adaptive": False,
            "use_opap": True,
            "use_crypto": False,
            "weights": {"var": 0},
            "desc": "Sequential EMD followed by OPAP without adaptive guidance",
        },
        {
            "id": "model_2",
            "name": "Model 2: CNN-Assisted Adaptive EMD + OPAP",
            "use_adaptive": True,
            "use_opap": True,
            "use_crypto": False,
            "weights": {"var": 0.6, "grad": 0.4, "lap": 0, "att": 0, "inn": 0},
            "desc": "CNN convolutional feature extractor and local texture statistics",
        },
        {
            "id": "model_3",
            "name": "Model 3: CNN + Attention + Adaptive EMD + OPAP",
            "use_adaptive": True,
            "use_opap": True,
            "use_crypto": False,
            "weights": {"var": 0.3, "grad": 0.25, "lap": 0.15, "att": 0.3, "inn": 0},
            "desc": "Adds multi-scale spatial and channel attention mechanisms",
        },
        {
            "id": "model_4",
            "name": "Model 4: CNN + Attention + INN + Adaptive EMD + OPAP",
            "use_adaptive": True,
            "use_opap": True,
            "use_crypto": False,
            "weights": {"var": 0.25, "grad": 0.20, "lap": 0.15, "att": 0.25, "inn": 0.15},
            "desc": "Full learned feature representation including INN frequency guidance",
        },
        {
            "id": "model_5",
            "name": "Model 5: Proposed ARES-EMD-OPAP (Full Pipeline)",
            "use_adaptive": True,
            "use_opap": True,
            "use_crypto": True,
            "weights": {"var": 0.25, "grad": 0.20, "lap": 0.15, "att": 0.25, "inn": 0.15},
            "desc": "Full proposed framework with PBKDF2 KDF + AES-GCM authenticated encryption",
        },
    ]

    import time
    results = []

    for cfg in ablation_configs:
        t0 = time.perf_counter()
        stego, meta = embed(
            cover_rgb,
            secret_payload,
            passphrase,
            use_adaptive=cfg["use_adaptive"],
            use_opap=cfg["use_opap"],
            use_crypto=cfg["use_crypto"],
            weights=cfg["weights"],
        )
        encode_time = (time.perf_counter() - t0) * 1000

        t1 = time.perf_counter()
        recovered = extract(
            stego,
            passphrase,
            use_adaptive=cfg["use_adaptive"],
            use_crypto=cfg["use_crypto"],
            weights=cfg["weights"],
        )
        decode_time = (time.perf_counter() - t1) * 1000

        p = psnr(cover_rgb, stego)
        s = ssim_global(cover_rgb, stego)
        m = mse(cover_rgb, stego)
        rec_acc = 100.0 if recovered == secret_payload else 0.0

        results.append({
            "id": cfg["id"],
            "name": cfg["name"],
            "description": cfg["desc"],
            "psnr": round(p, 2),
            "ssim": round(s, 4),
            "mse": round(m, 4),
            "capacity_bits": meta["available_capacity_bits"],
            "payload_bits": meta["payload_bits"],
            "modified_pixels": meta["modified_pixels"],
            "modified_pixel_pct": round(meta["modified_pixel_pct"], 2),
            "average_error": round(meta["average_abs_error"], 4),
            "max_error": meta["max_pixel_error"],
            "opap_optimized_count": meta["opap_optimized_count"],
            "extraction_accuracy": rec_acc,
            "auth_status": meta["auth_status"],
            "runtime_ms": round(encode_time + decode_time, 2),
        })

    return results
