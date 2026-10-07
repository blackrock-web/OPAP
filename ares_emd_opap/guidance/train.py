"""
CLI helper to train and export the CNN and INN guidance checkpoints for ARES-EMD-OPAP.

Usage:
  python -m ares_emd_opap.guidance.train --epochs 25
"""

from __future__ import annotations

import argparse
from pathlib import Path

from .cnn import DEFAULT_CHECKPOINT_PATH, train_cnn_guidance
from .inn import DEFAULT_INN_CHECKPOINT_PATH, train_inn_guidance


def train_all_guidance_models(
    epochs: int = 25,
    cnn_out: Path = DEFAULT_CHECKPOINT_PATH,
    inn_out: Path = DEFAULT_INN_CHECKPOINT_PATH,
) -> dict:
    cnn_model, cnn_losses = train_cnn_guidance(epochs=epochs, save_path=cnn_out)
    inn_model, inn_losses = train_inn_guidance(epochs=epochs, save_path=inn_out)
    return {
        "cnn_checkpoint": str(cnn_out),
        "cnn_final_loss": cnn_losses[-1] if cnn_losses else 0.0,
        "inn_checkpoint": str(inn_out),
        "inn_final_loss": inn_losses[-1] if inn_losses else 0.0,
    }


def main():
    parser = argparse.ArgumentParser(
        description="Train and save CNN and INN spatial guidance checkpoints for ARES-EMD-OPAP"
    )
    parser.add_argument("--epochs", type=int, default=25, help="Training epochs")
    parser.add_argument(
        "--cnn-out",
        type=str,
        default=str(DEFAULT_CHECKPOINT_PATH),
        help="Output path for CNN checkpoint",
    )
    parser.add_argument(
        "--inn-out",
        type=str,
        default=str(DEFAULT_INN_CHECKPOINT_PATH),
        help="Output path for INN checkpoint",
    )
    args = parser.parse_args()
    summary = train_all_guidance_models(
        epochs=args.epochs,
        cnn_out=Path(args.cnn_out),
        inn_out=Path(args.inn_out),
    )
    print("Guidance training complete:")
    for k, v in summary.items():
        print(f"  {k}: {v}")


if __name__ == "__main__":
    main()
