# ARES-EMD-OPAP Package Documentation

See the root `README.md` for full documentation.

## Quick Commands

- **Install dependencies**:
  ```bash
  pip install -r ares_emd_opap/requirements.txt
  ```
- **Train & export CNN and INN guidance checkpoints**:
  ```bash
  python -m ares_emd_opap.main train-guidance --epochs 25
  ```
- **Run 15-point validation test suite**:
  ```bash
  python -m ares_emd_opap.main test
  ```
- **Run 5-model runtime ablation study**:
  ```bash
  python -m ares_emd_opap.main ablation --size 128
  ```

## Summary of Responsibilities
- **CNN (`ares_emd_opap/guidance/cnn.py`) & INN (`ares_emd_opap/guidance/inn.py`)**: Compute spatial suitability maps on invariant `R+G` luma to guide pixel-pair selection only. Neither embeds payload bits nor claims cover-image reversibility.
- **EMD + OPAP (`ares_emd_opap/steganography/emd.py`, `opap.py`)**: Embeds base-5 payload digits into Blue-channel horizontal pixel pairs ($n=2$) with residue-preserving distortion optimization.
- **AES-256-GCM + PBKDF2 (`ares_emd_opap/crypto/aes_gcm.py`, `kdf.py`)**: Protects and authenticates the secret payload using `cryptography`'s `AESGCM` and `PBKDF2-HMAC-SHA256` (100,000 iterations, 16-byte salt, 12-byte nonce).
