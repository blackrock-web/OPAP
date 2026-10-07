"""
ARES-EMD-OPAP: Ablation Study & Comparative Experiments Runner.

Computes all metrics (PSNR, SSIM, MSE, modification rate, recovery accuracy)
purely at runtime on the given cover image and secret payload — no hardcoded
winner tables.
"""

import time
from typing import Any, Dict, List

from ..steganography.embed import embed, extract
from .metrics import mse, psnr, ssim_global


def run_ablation_study(
    cover_rgb: List[List[List[int]]],
    secret_payload: str,
    passphrase: str,
) -> List[Dict[str, Any]]:
    """
    Executes the 5 ablation configurations:
      1) EMD + OPAP only (unguided sequential)
      2) + classical adaptive (variance + Sobel gradient + Laplacian)
      3) + CNN guidance (CNNSpatialGuidanceNet)
      4) + CNN + INN guidance (CNNSpatialGuidanceNet + INNGuidanceNet)
      5) Full pipeline + AES-256-GCM authenticated encryption
    """
    ablation_configs = [
        {
            "id": "model_1",
            "name": "Model 1: EMD + OPAP Only",
            "use_adaptive": False,
            "use_opap": True,
            "use_crypto": False,
            "use_cnn": False,
            "use_inn": False,
            "weights": {"var": 0.0, "grad": 0.0, "lap": 0.0, "cnn": 0.0, "inn": 0.0},
            "desc": "Pure EMD (n=2) + OPAP without adaptive cost map or neural guidance",
        },
        {
            "id": "model_2",
            "name": "Model 2: + Classical Adaptive (Var+Grad+Lap)",
            "use_adaptive": True,
            "use_opap": True,
            "use_crypto": False,
            "use_cnn": False,
            "use_inn": False,
            "weights": {"var": 0.45, "grad": 0.35, "lap": 0.20, "cnn": 0.0, "inn": 0.0},
            "desc": "Classical local variance, Sobel gradient, and Laplacian cost map",
        },
        {
            "id": "model_3",
            "name": "Model 3: + Real CNN Spatial Guidance",
            "use_adaptive": True,
            "use_opap": True,
            "use_crypto": False,
            "use_cnn": True,
            "use_inn": False,
            "weights": {"var": 0.30, "grad": 0.25, "lap": 0.15, "cnn": 0.30, "inn": 0.0},
            "desc": "Adds PyTorch Residual CNN with Channel & Spatial Attention on R+G luma",
        },
        {
            "id": "model_4",
            "name": "Model 4: + Real CNN + INN Affine Coupling Guidance",
            "use_adaptive": True,
            "use_opap": True,
            "use_crypto": False,
            "use_cnn": True,
            "use_inn": True,
            "weights": {"var": 0.25, "grad": 0.20, "lap": 0.15, "cnn": 0.25, "inn": 0.15},
            "desc": "Fuses classical + PyTorch CNN + Invertible Neural Network latent energy guidance",
        },
        {
            "id": "model_5",
            "name": "Model 5: Full ARES-EMD-OPAP (+ AES-256-GCM)",
            "use_adaptive": True,
            "use_opap": True,
            "use_crypto": True,
            "use_cnn": True,
            "use_inn": True,
            "weights": {"var": 0.25, "grad": 0.20, "lap": 0.15, "cnn": 0.25, "inn": 0.15},
            "desc": "Full proposed pipeline with CNN+INN guidance and PBKDF2 + AES-256-GCM AEAD",
        },
    ]

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
            use_cnn=cfg["use_cnn"],
            use_inn=cfg["use_inn"],
            weights=cfg["weights"],
        )
        encode_time = (time.perf_counter() - t0) * 1000

        t1 = time.perf_counter()
        recovered = extract(
            stego,
            passphrase,
            use_adaptive=cfg["use_adaptive"],
            use_crypto=cfg["use_crypto"],
            use_cnn=cfg["use_cnn"],
            use_inn=cfg["use_inn"],
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
            "groups_used": meta["groups_used"],
            "modified_pixels": meta["modified_pixels"],
            "modified_pixel_pct": round(meta["modified_pixel_pct"], 2),
            "image_modification_rate_pct": round(meta["image_modification_rate_pct"], 4),
            "average_error": round(meta["average_abs_error"], 4),
            "max_error": meta["max_pixel_error"],
            "opap_optimized_count": meta["opap_optimized_count"],
            "extraction_accuracy": rec_acc,
            "auth_status": meta["auth_status"],
            "guidance_mode": meta["guidance_mode"],
            "runtime_ms": round(encode_time + decode_time, 2),
        })

    return results

