"""
ARES-EMD-OPAP: Neural Guidance Subsystem (Residual CNN + Invertible Neural Network).

IMPORTANT:
- Both the CNN and INN modules act strictly as GUIDANCE mechanisms on the R+G luma
  channels to score spatial suitability for adaptive EMD-OPAP pixel-pair selection.
- Neither the CNN nor the INN embeds or extracts secret payload bits, nor does the
  INN claim cover-image reversibility.
"""

from .cnn import (
    CNNSpatialGuidanceNet,
    load_cnn_guidance_model,
    save_cnn_checkpoint,
    compute_cnn_guidance_map,
    train_cnn_guidance,
)
from .inn import (
    AffineCouplingBlock,
    INNGuidanceNet,
    load_inn_guidance_model,
    save_inn_checkpoint,
    compute_inn_guidance_map,
    train_inn_guidance,
)

__all__ = [
    "CNNSpatialGuidanceNet",
    "load_cnn_guidance_model",
    "save_cnn_checkpoint",
    "compute_cnn_guidance_map",
    "train_cnn_guidance",
    "AffineCouplingBlock",
    "INNGuidanceNet",
    "load_inn_guidance_model",
    "save_inn_checkpoint",
    "compute_inn_guidance_map",
    "train_inn_guidance",
]
