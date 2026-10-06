"""
ARES-EMD-OPAP: Cryptographic Key Derivation Function (PBKDF2).
"""

import hashlib

def derive_key(password: str, salt: bytes, iterations: int = 100_000, length: int = 32) -> bytes:
    """
    Derives a 256-bit AES key from user passphrase and salt via PBKDF2-HMAC-SHA256.
    """
    if not password:
        raise ValueError("Passphrase cannot be empty")
    if len(salt) < 16:
        raise ValueError("Salt must be at least 16 bytes")
    return hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, iterations, length)
