"""
ARES-EMD-OPAP: Real AES-256-GCM Authenticated Encryption & Cryptographic Payload Framing.

Uses `cryptography.hazmat.primitives.ciphers.aead.AESGCM` with PBKDF2-HMAC-SHA256.
Frame layout:
  MAGIC(4B) | VERSION(1B) | SALT(16B) | NONCE(12B) | CT_LEN(4B) | CIPHERTEXT+TAG
"""

import os
import struct
from cryptography.exceptions import InvalidTag
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

from .kdf import derive_key

MAGIC = b"ARES"
VERSION = 5
SALT_LEN = 16
NONCE_LEN = 12
HEADER_LEN = 4 + 1 + SALT_LEN + NONCE_LEN + 4  # 37 bytes
TAG_LEN = 16  # 128-bit GCM authentication tag
AAD = b"ARES-EMD-OPAP-v5"


class AuthenticationError(ValueError):
    """Raised when AES-256-GCM authentication or frame integrity verification fails."""


def encrypt_payload(plaintext: str, passphrase: str) -> bytes:
    """
    Encrypts plaintext with PBKDF2-HMAC-SHA256 + AES-256-GCM and serializes frame:
    MAGIC(4) | VERSION(1) | SALT(16) | NONCE(12) | CT_LEN(4) | CIPHERTEXT+TAG
    """
    if not plaintext:
        raise ValueError("Secret payload cannot be empty")
    if not passphrase:
        raise ValueError("Passphrase is required")

    salt = os.urandom(SALT_LEN)
    nonce = os.urandom(NONCE_LEN)
    key = derive_key(passphrase, salt)
    plain_bytes = plaintext.encode("utf-8")

    aesgcm = AESGCM(key)
    ct_with_tag = aesgcm.encrypt(nonce, plain_bytes, AAD)

    ct_len = len(ct_with_tag)
    header = MAGIC + bytes([VERSION]) + salt + nonce + struct.pack(">I", ct_len)
    return header + ct_with_tag


def decrypt_payload(frame: bytes, passphrase: str) -> str:
    """
    Verifies header and authenticates/decrypts an AES-256-GCM payload frame.
    Raises AuthenticationError (subclass of ValueError) on wrong passphrase or tampering.
    """
    if not passphrase:
        raise AuthenticationError("Authentication Failure: Passphrase cannot be empty")
    if not isinstance(frame, (bytes, bytearray)) or len(frame) < HEADER_LEN + TAG_LEN:
        raise AuthenticationError("Authentication Failure: Frame too short")
    if bytes(frame[:4]) != MAGIC:
        raise AuthenticationError("Authentication Failure: Magic header mismatch")

    version = frame[4]
    if version != VERSION:
        raise AuthenticationError(f"Authentication Failure: Unsupported frame version {version}")

    salt = bytes(frame[5:21])
    nonce = bytes(frame[21:33])
    ct_len = struct.unpack(">I", frame[33:37])[0]

    if ct_len < TAG_LEN or len(frame) < HEADER_LEN + ct_len:
        raise AuthenticationError("Authentication Failure: Ciphertext truncated or invalid length")

    ct_with_tag = bytes(frame[37 : 37 + ct_len])
    key = derive_key(passphrase, salt)

    try:
        aesgcm = AESGCM(key)
        decrypted = aesgcm.decrypt(nonce, ct_with_tag, AAD)
    except InvalidTag as exc:
        raise AuthenticationError(
            "Authentication Failure: AES-256-GCM tag verification failed (wrong password or tampered stego)"
        ) from exc
    except Exception as exc:
        raise AuthenticationError(f"Authentication Failure: {exc}") from exc

    try:
        return decrypted.decode("utf-8")
    except UnicodeDecodeError as exc:
        raise AuthenticationError("Authentication Failure: Decrypted bytes are not valid UTF-8") from exc

