"""
ARES-EMD-OPAP: CNN & INN Guided Adaptive EMD-OPAP Steganography with
AES-256-GCM Authenticated Encryption.
"""

from .adaptive.cost_map import build_adaptive_cost_map, get_adaptive_pixel_pairs
from .crypto.aes_gcm import AuthenticationError, decrypt_payload, encrypt_payload
from .crypto.kdf import derive_key
from .evaluation.experiments import run_ablation_study
from .evaluation.metrics import mse, psnr, ssim_global
from .guidance.cnn import CNNSpatialGuidanceNet, load_cnn_guidance_model
from .guidance.inn import AffineCouplingBlock, INNGuidanceNet, load_inn_guidance_model
from .steganography.embed import embed, extract
from .steganography.emd import base5_to_bytes, bytes_to_base5, emd_embed_group, emd_extract
from .steganography.opap import opap_optimize_group

__version__ = "2.1.0"
__title__ = "ARES-EMD-OPAP"

__all__ = [
    "embed",
    "extract",
    "emd_embed_group",
    "emd_extract",
    "bytes_to_base5",
    "base5_to_bytes",
    "opap_optimize_group",
    "encrypt_payload",
    "decrypt_payload",
    "AuthenticationError",
    "derive_key",
    "build_adaptive_cost_map",
    "get_adaptive_pixel_pairs",
    "CNNSpatialGuidanceNet",
    "load_cnn_guidance_model",
    "INNGuidanceNet",
    "AffineCouplingBlock",
    "load_inn_guidance_model",
    "run_ablation_study",
    "psnr",
    "ssim_global",
    "mse",
]

