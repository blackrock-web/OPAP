"""
ARES-EMD-OPAP CLI: Command-Line Interface and Research Verification.
"""

import sys
import argparse
import json
from .evaluation.experiments import run_ablation_study
from .test_suite import run_all_tests, generate_synthetic_image

def main():
    parser = argparse.ArgumentParser(
        description="ARES-EMD-OPAP: CNN-Assisted Adaptive EMD-OPAP Steganography with Distortion Optimization"
    )
    sub = parser.add_subparsers(dest="cmd", help="Subcommand to run")

    sub.add_parser("test", help="Run 15-point automated validation test suite")
    ab_parser = sub.add_parser("ablation", help="Run 5-model ablation study")
    ab_parser.add_argument("--size", type=int, default=128, help="Synthetic cover image dimension (e.g. 128)")
    ab_parser.add_argument("--secret", type=str, default="ARES-EMD-OPAP 2026 Research Benchmark Payload", help="Secret text payload")
    ab_parser.add_argument("--password", type=str, default="ResearchKey2026!", help="Passphrase")

    args = parser.parse_args()

    if args.cmd == "test":
        success = run_all_tests()
        sys.exit(0 if success else 1)
    elif args.cmd == "ablation":
        print(f"Generating synthetic cover image ({args.size}x{args.size})...")
        img = generate_synthetic_image(args.size, args.size, "textured")
        print(f"Running 5-Model Ablation Study with payload: '{args.secret}'...")
        results = run_ablation_study(img, args.secret, args.password)

        print("\n" + "=" * 90)
        print("ARES-EMD-OPAP ABLATION STUDY RESULTS")
        print("=" * 90)
        header = f"{'Model':<40s} | {'PSNR (dB)':<9s} | {'SSIM':<6s} | {'MSE':<6s} | {'Mod Pix':<7s} | {'Acc (%)':<7s} | {'Runtime'}"
        print(header)
        print("-" * 90)
        for r in results:
            print(f"{r['name']:<40s} | {r['psnr']:<9.2f} | {r['ssim']:<6.4f} | {r['mse']:<6.4f} | {r['modified_pixels']:<7d} | {r['extraction_accuracy']:<7.1f} | {r['runtime_ms']:.1f}ms")
        print("=" * 90)
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
