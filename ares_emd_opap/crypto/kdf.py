"""
ARES-EMD-OPAP: Cryptographic Key Derivation Function (PBKDF2-HMAC-SHA256).
"""

import hashlib

DEFAULT_ITERATIONS = 100_000
DEFAULT_KEY_LENGTH = 32
MIN_SALT_BYTES = 16


def derive_key(
    password: str,
    salt: bytes,
    iterations: int = DEFAULT_ITERATIONS,
    length: int = DEFAULT_KEY_LENGTH,
) -> bytes:
    """
    Derives a 256-bit AES key from user passphrase and salt via PBKDF2-HMAC-SHA256.
    """
    if not password:
        raise ValueError("Passphrase cannot be empty")
    if not isinstance(salt, (bytes, bytearray)) or len(salt) < MIN_SALT_BYTES:
        raise ValueError(f"Salt must be at least {MIN_SALT_BYTES} bytes")
    if iterations < 10_000:
        raise ValueError("PBKDF2 iterations must be at least 10,000")
    return hashlib.pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        bytes(salt),
        iterations,
        length,
    )

