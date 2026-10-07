"""
ARES-EMD-OPAP CLI: Command-Line Interface and Research Verification.

Usage:
  python -m ares_emd_opap.main test
  python -m ares_emd_opap.main ablation --size 128
  python -m ares_emd_opap.main train-guidance --epochs 25
"""

import argparse
import sys

from .evaluation.experiments import run_ablation_study
from .guidance.train import train_all_guidance_models
from .test_suite import generate_synthetic_image, run_all_tests


def main():
    parser = argparse.ArgumentParser(
        description="ARES-EMD-OPAP: CNN & INN Guided Adaptive EMD-OPAP Steganography with AES-256-GCM"
    )
    sub = parser.add_subparsers(dest="cmd", help="Subcommand to run")

    sub.add_parser("test", help="Run 15-point automated validation test suite")

    ab_parser = sub.add_parser("ablation", help="Run 5-model runtime ablation study")
    ab_parser.add_argument(
        "--size", type=int, default=128, help="Synthetic cover image dimension (e.g. 128)"
    )
    ab_parser.add_argument(
        "--secret",
        type=str,
        default="ARES-EMD-OPAP 2026 Research Benchmark Payload",
        help="Secret text payload",
    )
    ab_parser.add_argument(
        "--password", type=str, default="ResearchKey2026!", help="Passphrase"
    )

    tr_parser = sub.add_parser(
        "train-guidance", help="Train and export CNN and INN guidance checkpoints"
    )
    tr_parser.add_argument("--epochs", type=int, default=25, help="Training epochs")

    args = parser.parse_args()

    if args.cmd == "test":
        success = run_all_tests()
        sys.exit(0 if success else 1)
    elif args.cmd == "ablation":
        print(f"Generating synthetic cover image ({args.size}x{args.size})...")
        img = generate_synthetic_image(args.size, args.size, "textured")
        print(f"Running 5-Model Ablation Study with payload: '{args.secret}'...")
        results = run_ablation_study(img, args.secret, args.password)

        print("\n" + "=" * 112)
        print("ARES-EMD-OPAP RUNTIME-MEASURED ABLATION STUDY RESULTS")
        print("=" * 112)
        header = (
            f"{'Model':<46s} | {'PSNR (dB)':<9s} | {'SSIM':<6s} | {'MSE':<6s} | "
            f"{'Mod Pix':<7s} | {'ModRate%':<8s} | {'Acc (%)':<7s} | {'Runtime'}"
        )
        print(header)
        print("-" * 112)
        for r in results:
            print(
                f"{r['name']:<46s} | {r['psnr']:<9.2f} | {r['ssim']:<6.4f} | "
                f"{r['mse']:<6.4f} | {r['modified_pixels']:<7d} | "
                f"{r['modified_pixel_pct']:<8.2f} | {r['extraction_accuracy']:<7.1f} | "
                f"{r['runtime_ms']:.1f}ms"
            )
        print("=" * 112)
    elif args.cmd == "train-guidance":
        summary = train_all_guidance_models(epochs=args.epochs)
        print("Trained and exported CNN and INN guidance checkpoints:")
        for k, v in summary.items():
            print(f"  {k}: {v}")
    else:
        parser.print_help()


if __name__ == "__main__":
    main()

