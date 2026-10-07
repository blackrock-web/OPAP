"""
ARES-EMD-OPAP: Automated Validation Test Suite (15 Test Cases).

Validates:
  - Real EMD (n=2) and OPAP residue-preserving optimization
  - Real PyTorch Residual CNN (`CNNSpatialGuidanceNet`) forward & checkpoint roundtrip
  - Real PyTorch Invertible Neural Network (`INNGuidanceNet`) forward/inverse consistency (`||x - inv(fwd(x))|| < 1e-5`)
  - Real `cryptography` AES-256-GCM + PBKDF2-HMAC-SHA256 encryption, wrong-password failure, and tamper failure
  - Full embed/extract exact secret recovery on clean synthetic RGB images
  - Runtime ablation study execution (no hardcoded "best PSNR" assertions)
"""

import tempfile
from pathlib import Path

import torch
import torch.nn as nn

from ares_emd_opap.adaptive.cost_map import (
    build_adaptive_cost_map,
    compute_gradient_map,
    compute_laplacian_map,
    compute_variance_map,
)
from ares_emd_opap.crypto.aes_gcm import AuthenticationError, decrypt_payload, encrypt_payload
from ares_emd_opap.evaluation.experiments import run_ablation_study
from ares_emd_opap.evaluation.metrics import mse, psnr, ssim_global
from ares_emd_opap.guidance.cnn import (
    CNNSpatialGuidanceNet,
    load_cnn_guidance_model,
    save_cnn_checkpoint,
)
from ares_emd_opap.guidance.inn import (
    INNGuidanceNet,
    load_inn_guidance_model,
    save_inn_checkpoint,
)
from ares_emd_opap.steganography.embed import embed, extract
from ares_emd_opap.steganography.emd import emd_embed_group, emd_extract
from ares_emd_opap.steganography.opap import opap_optimize_group


def generate_synthetic_image(width=64, height=64, texture="smooth"):
    img = []
    for y in range(height):
        row = []
        for x in range(width):
            if texture == "smooth":
                r = (x * 2 + y * 2) % 256
                g = (x * 2 + y * 2 + 10) % 256
                b = 128
            elif texture == "textured":
                r = (x * 17 + y * 23) % 256
                g = (x * 31 + y * 13) % 256
                b = (x * 19 + y * 29) % 256
            else:  # edge
                r = 240 if x < width // 2 else 20
                g = 240 if y < height // 2 else 20
                b = (r + g) // 2
            row.append([r, g, b])
        img.append(row)
    return img


def run_all_tests():
    print("=" * 72)
    print("RUNNING ARES-EMD-OPAP 15-POINT VALIDATION TEST SUITE (REAL PYTORCH + AESGCM)")
    print("=" * 72)

    passed = 0
    total = 15

    # Test 1: EMD embedding/extraction round trip
    try:
        for c1 in range(0, 256, 32):
            for c2 in range(0, 256, 32):
                for d in range(5):
                    e1, e2 = emd_embed_group(c1, c2, d)
                    assert emd_extract(e1, e2) == d, f"EMD extraction failed for ({c1}, {c2}) digit {d}"
        print("✓ Test 01: EMD (n=2, mod 5) embedding and extraction round trip PASSED")
        passed += 1
    except Exception as e:
        print(f"✗ Test 01 FAILED: {e}")

    # Test 2: OPAP preservation of EMD extraction
    try:
        for c1 in range(0, 256, 40):
            for c2 in range(0, 256, 40):
                for d in range(5):
                    e1, e2 = emd_embed_group(c1, c2, d)
                    o1, o2 = opap_optimize_group(c1, c2, e1, e2, d)
                    assert emd_extract(o1, o2) == d, "OPAP altered extraction value!"
                    assert (o1 - c1) ** 2 + (o2 - c2) ** 2 <= (e1 - c1) ** 2 + (e2 - c2) ** 2
        print("✓ Test 02: OPAP preservation of EMD extraction & distortion minimization PASSED")
        passed += 1
    except Exception as e:
        print(f"✗ Test 02 FAILED: {e}")

    # Test 3: Real PyTorch CNN forward pass & checkpoint save/load
    try:
        cnn_model = load_cnn_guidance_model()
        assert isinstance(cnn_model, nn.Module) and isinstance(cnn_model, CNNSpatialGuidanceNet)
        sample_luma = torch.rand(1, 1, 32, 32) * 255.0
        with torch.no_grad():
            att_map = cnn_model(sample_luma)
        assert tuple(att_map.shape) == (1, 1, 32, 32), f"Unexpected CNN shape {tuple(att_map.shape)}"
        assert float(att_map.min()) >= 0.0 and float(att_map.max()) <= 1.0, "CNN output out of [0, 1]"

        with tempfile.TemporaryDirectory() as tmpdir:
            ckpt_file = Path(tmpdir) / "test_cnn.pt"
            save_cnn_checkpoint(cnn_model, ckpt_file)
            reloaded = load_cnn_guidance_model(ckpt_file, auto_train_if_missing=False)
            with torch.no_grad():
                att_map_2 = reloaded(sample_luma)
            assert torch.allclose(att_map, att_map_2, atol=1e-6)
        print("✓ Test 03: Real PyTorch Residual CNN forward (HxW in [0,1]) & checkpoint I/O PASSED")
        passed += 1
    except Exception as e:
        print(f"✗ Test 03 FAILED: {e}")

    # Test 4: Fused adaptive cost map (Var + Grad + Lap + CNN + INN)
    try:
        img = generate_synthetic_image(32, 32, "textured")
        luma = [[(img[y][x][0] + img[y][x][1]) // 2 for x in range(32)] for y in range(32)]
        v_map = compute_variance_map(luma, 32, 32)
        g_map = compute_gradient_map(luma, 32, 32)
        l_map = compute_laplacian_map(luma, 32, 32)
        cmap = build_adaptive_cost_map(luma, 32, 32, use_cnn=True, use_inn=True)
        assert len(v_map) == 32 * 32 and len(g_map) == 32 * 32 and len(l_map) == 32 * 32
        assert len(cmap) == 32 * 32
        assert all(0.0 <= v <= 1.0 for v in cmap)
        print("✓ Test 04: Multi-feature adaptive cost map fusion (Var+Grad+Lap+CNN+INN) PASSED")
        passed += 1
    except Exception as e:
        print(f"✗ Test 04 FAILED: {e}")

    # Test 5: Real PyTorch INN forward/inverse consistency (||x - inverse(forward(x))|| small)
    try:
        inn_model = load_inn_guidance_model()
        assert isinstance(inn_model, nn.Module) and isinstance(inn_model, INNGuidanceNet)
        x_tensor = torch.randn(2, 4, 16, 16)
        with torch.no_grad():
            z_tensor, ld_fwd = inn_model(x_tensor, reverse=False)
            x_rec, ld_inv = inn_model.inverse(z_tensor)
            err = float(torch.max(torch.abs(x_tensor - x_rec)).item())
            ld_err = float(torch.max(torch.abs(ld_fwd + ld_inv)).item())
            gmap = inn_model.guidance_map(torch.rand(1, 1, 32, 32))
        assert err < 1e-5, f"INN inversion error too large: {err}"
        assert ld_err < 1e-4, f"INN log-determinant mismatch: {ld_err}"
        assert tuple(gmap.shape) == (1, 1, 32, 32)
        assert float(gmap.min()) >= 0.0 and float(gmap.max()) <= 1.0

        with tempfile.TemporaryDirectory() as tmpdir:
            ckpt_file = Path(tmpdir) / "test_inn.pt"
            save_inn_checkpoint(inn_model, ckpt_file)
            reloaded_inn = load_inn_guidance_model(ckpt_file, auto_train_if_missing=False)
            with torch.no_grad():
                z2, _ = reloaded_inn(x_tensor, reverse=False)
            assert torch.allclose(z_tensor, z2, atol=1e-6)
        print(f"✓ Test 05: Real PyTorch INN affine coupling invertibility (max err={err:.2e}) PASSED")
        passed += 1
    except Exception as e:
        print(f"✗ Test 05 FAILED: {e}")

    # Test 6: Real AES-256-GCM encryption/decryption
    try:
        secret = "Classified Payload 2026!"
        pw = "StrongSecret123"
        enc = encrypt_payload(secret, pw)
        assert enc[:4] == b"ARES" and enc[4] == 5
        dec = decrypt_payload(enc, pw)
        assert dec == secret, f"AES-GCM decrypted text mismatch: {dec}"
        print("✓ Test 06: Real AES-256-GCM + PBKDF2-HMAC-SHA256 encryption & decryption PASSED")
        passed += 1
    except Exception as e:
        print(f"✗ Test 06 FAILED: {e}")

    # Test 7: Wrong-passphrase rejection
    try:
        rejected = False
        try:
            decrypt_payload(enc, "WrongPassword!")
        except (AuthenticationError, ValueError):
            rejected = True
        assert rejected, "Wrong passphrase was not rejected!"
        print("✓ Test 07: Wrong-passphrase AES-256-GCM authentication rejection PASSED")
        passed += 1
    except Exception as e:
        print(f"✗ Test 07 FAILED: {e}")

    # Test 8: Modified-stego / tampering rejection
    try:
        tampered = bytearray(enc)
        tampered[-5] ^= 0x55  # Tamper with ciphertext/tag
        tamper_rejected = False
        try:
            decrypt_payload(bytes(tampered), pw)
        except (AuthenticationError, ValueError):
            tamper_rejected = True
        assert tamper_rejected, "Tampered ciphertext was not rejected!"
        print("✓ Test 08: Modified stego / ciphertext tampering rejection PASSED")
        passed += 1
    except Exception as e:
        print(f"✗ Test 08 FAILED: {e}")

    # Test 9: Payload capacity overflow
    try:
        tiny_img = generate_synthetic_image(16, 16, "smooth")
        huge_secret = "A" * 500  # Needs more pairs than 16*8
        overflow_caught = False
        try:
            embed(tiny_img, huge_secret, pw)
        except ValueError as err:
            if "capacity" in str(err).lower():
                overflow_caught = True
        assert overflow_caught, "Capacity overflow was not caught!"
        print("✓ Test 09: Payload capacity overflow safe rejection PASSED")
        passed += 1
    except Exception as e:
        print(f"✗ Test 09 FAILED: {e}")

    # Test 10: Pixel-range validity [0, 255] & R+G channel invariance
    try:
        img = generate_synthetic_image(48, 48, "textured")
        stego, meta = embed(img, "Range Test Payload", pw)
        for y, row in enumerate(stego):
            for x, p in enumerate(row):
                for val in p:
                    assert 0 <= val <= 255, f"Pixel value {val} outside [0, 255]!"
                # Verify R and G channels are unmodified so extraction ranking stays 100% stable
                assert p[0] == img[y][x][0] and p[1] == img[y][x][1], "R or G channel was modified!"
        print("✓ Test 10: Pixel-range validity ([0, 255]) & R+G channel invariance PASSED")
        passed += 1
    except Exception as e:
        print(f"✗ Test 10 FAILED: {e}")

    # Test 11: Grayscale-equivalent image
    try:
        gray_img = [[[v * 7 % 256, v * 7 % 256, v * 7 % 256] for v in range(32)] for _ in range(32)]
        stego, _ = embed(gray_img, "Gray Secret", pw)
        rec = extract(stego, pw)
        assert rec == "Gray Secret"
        print("✓ Test 11: Grayscale image embedding/extraction PASSED")
        passed += 1
    except Exception as e:
        print(f"✗ Test 11 FAILED: {e}")

    # Test 12: Full RGB color image
    try:
        rgb_img = generate_synthetic_image(64, 64, "textured")
        stego, meta = embed(rgb_img, "RGB Color Image Secret", pw)
        rec = extract(stego, pw)
        assert rec == "RGB Color Image Secret"
        assert meta["modified_pixels"] > 0
        assert meta["guidance_mode"] == "classical+cnn+inn"
        print("✓ Test 12: RGB 24-bit color image exact secret recovery PASSED")
        passed += 1
    except Exception as e:
        print(f"✗ Test 12 FAILED: {e}")

    # Test 13: Small payload
    try:
        stego, _ = embed(rgb_img, "X", pw)
        rec = extract(stego, pw)
        assert rec == "X"
        print("✓ Test 13: Small payload (1 char) embedding/extraction PASSED")
        passed += 1
    except Exception as e:
        print(f"✗ Test 13 FAILED: {e}")

    # Test 14: Large payload
    try:
        large_secret = "Research grade steganography benchmark payload with substantial length. " * 3
        stego, meta = embed(rgb_img, large_secret, pw)
        rec = extract(stego, pw)
        assert rec == large_secret
        print("✓ Test 14: Large payload embedding/extraction PASSED")
        passed += 1
    except Exception as e:
        print(f"✗ Test 14 FAILED: {e}")

    # Test 15: Multi-texture recovery & runtime ablation toggle verification
    try:
        for tex in ["smooth", "textured", "edge"]:
            t_img = generate_synthetic_image(64, 64, tex)
            s_img, m = embed(t_img, "Texture Diversity Payload", pw)
            r = extract(s_img, pw)
            assert r == "Texture Diversity Payload"
            p_val = psnr(t_img, s_img)
            s_val = ssim_global(t_img, s_img)
            m_val = mse(t_img, s_img)
            assert p_val > 0.0 and 0.0 < s_val <= 1.0 and m_val >= 0.0

        ablation_rows = run_ablation_study(
            generate_synthetic_image(64, 64, "textured"),
            "Ablation Verification Secret",
            pw,
        )
        assert len(ablation_rows) == 5
        assert all(row["extraction_accuracy"] == 100.0 for row in ablation_rows)
        print("✓ Test 15: Multi-texture recovery & 5-stage runtime ablation study PASSED")
        passed += 1
    except Exception as e:
        print(f"✗ Test 15 FAILED: {e}")

    print("=" * 72)
    print(f"TEST RESULTS: {passed} / {total} TESTS PASSED")
    print("=" * 72)
    return passed == total


if __name__ == "__main__":
    run_all_tests()

