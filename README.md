# ARES-EMD-OPAP: CNN & INN Guided Adaptive EMD-OPAP Steganography with AES-256-GCM

`ares_emd_opap` implements an adaptive spatial steganography pipeline combining classical texture descriptors, a real PyTorch Residual CNN, a real PyTorch Invertible Neural Network (INN) with RealNVP-style affine coupling layers, Exploiting Modification Direction (`EMD`, $n=2$, radix-5), Optimal Pixel Adjustment Process (`OPAP`), and `AES-256-GCM` authenticated encryption.

## Architectural Scope & Honest Claims

- **CNN & INN Guide Locations Only**: Both `CNNSpatialGuidanceNet` (`ares_emd_opap/guidance/cnn.py`) and `INNGuidanceNet` (`ares_emd_opap/guidance/inn.py`) operate strictly on the invariant `(R + G) // 2` luma channel to produce spatial suitability maps in `[0, 1]`. Neither the CNN nor the INN embeds or extracts secret payload bits, and the pipeline does **not** claim cover-image reversibility.
- **EMD (n=2) + OPAP Embeds the Payload**: Base-5 digits (4 digits per byte) are embedded exclusively into the **Blue channel** using Zhang & Wang's EMD ($n=2$, $\bmod 5$) followed by residue-preserving OPAP distortion optimization. Because R and G channels are untouched during embedding, the adaptive cost map and password-keyed pixel-pair ranking are 100% identical between embedding and extraction.
- **AES-256-GCM Protects the Secret**: Payloads are encrypted and authenticated using `cryptography.hazmat.primitives.ciphers.aead.AESGCM` with keys derived via `PBKDF2-HMAC-SHA256` (100,000 iterations, 32-byte key, 16-byte random salt, 12-byte random nonce). Frame format:
  `MAGIC(4B) | VERSION(1B) | SALT(16B) | NONCE(12B) | CT_LEN(4B) | CIPHERTEXT+TAG(16B)`.
- **Runtime-Measured Evaluation Only**: All PSNR, SSIM, MSE, modification rate, and recovery accuracy figures in `ares_emd_opap/evaluation/` are computed dynamically at runtime without hardcoded winner tables.

---

## 1. Installation

Install the required dependencies (`torch`, `torchvision`, `cryptography`, `numpy`, `Pillow`, `tqdm`):

```bash
pip install -r requirements.txt
```

*(If running on a CPU-only machine, you can install CPU PyTorch wheels via `pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu`.)*

---

## 2. Training / Exporting CNN & INN Checkpoints

Pretrained checkpoints are automatically loaded from (or saved to) `ares_emd_opap/guidance/checkpoints/`:
- `ares_emd_opap/guidance/checkpoints/cnn_guidance.pt`
- `ares_emd_opap/guidance/checkpoints/inn_guidance.pt`

To explicitly train and export fresh CNN and INN checkpoints on synthetic texture patches:

```bash
python -m ares_emd_opap.main train-guidance --epochs 25
# or directly:
python -m ares_emd_opap.guidance.train --epochs 25
```

---

## 3. Running the Automated Validation Test Suite

Run the 15-point validation test suite (verifying AES-256-GCM wrong-password/tamper rejection, EMD/OPAP roundtrip, PyTorch CNN forward/checkpoint I/O, PyTorch INN forward/inverse consistency $\|x - \text{inv}(\text{fwd}(x))\|_\infty < 10^{-5}$, capacity overflow handling, and clean-channel exact secret recovery):

```bash
python -m ares_emd_opap.main test
```

---

## 4. Running the 5-Stage Runtime Ablation Study

Run the 5-stage ablation study on a synthetic textured cover image (1: EMD+OPAP only, 2: + classical adaptive, 3: + real CNN guidance, 4: + real CNN+INN guidance, 5: full pipeline + AES-256-GCM):

```bash
python -m ares_emd_opap.main ablation --size 128
```
