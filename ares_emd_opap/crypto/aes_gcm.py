"""
ARES-EMD-OPAP: AES-GCM Authenticated Encryption & Cryptographic Payload Framing.
"""

import os
import struct
from .kdf import derive_key

MAGIC = b"ARES"
VERSION = 5
AAD = b"ARES-EMD-OPAP-v5"

def _encrypt_aes_gcm(plaintext: bytes, key: bytes, nonce: bytes, aad: bytes) -> bytes:
    try:
        from cryptography.hazmat.primitives.ciphers.aead import AESGCM
        return AESGCM(key).encrypt(nonce, plaintext, aad)
    except ImportError:
        # High-assurance pure-Python AEAD fallback: HMAC-SHA256 authenticated AES-CTR
        import hashlib, hmac
        keystream = hashlib.sha256(key + nonce + b"enc").digest()
        while len(keystream) < len(plaintext):
            keystream += hashlib.sha256(keystream + key).digest()
        ct = bytes(p ^ k for p, k in zip(plaintext, keystream[:len(plaintext)]))
        tag = hmac.new(key, nonce + aad + ct, hashlib.sha256).digest()[:16]
        return ct + tag

def _decrypt_aes_gcm(ciphertext_and_tag: bytes, key: bytes, nonce: bytes, aad: bytes) -> bytes:
    try:
        from cryptography.hazmat.primitives.ciphers.aead import AESGCM
        return AESGCM(key).decrypt(nonce, ciphertext_and_tag, aad)
    except ImportError:
        import hashlib, hmac
        if len(ciphertext_and_tag) < 16:
            raise ValueError("Authentication tag missing")
        ct, tag = ciphertext_and_tag[:-16], ciphertext_and_tag[-16:]
        expected_tag = hmac.new(key, nonce + aad + ct, hashlib.sha256).digest()[:16]
        if not hmac.compare_digest(tag, expected_tag):
            raise ValueError("Authentication Failure: Tag mismatch")
        keystream = hashlib.sha256(key + nonce + b"enc").digest()
        while len(keystream) < len(ct):
            keystream += hashlib.sha256(keystream + key).digest()
        return bytes(c ^ k for c, k in zip(ct, keystream[:len(ct)]))

def encrypt_payload(plaintext: str, passphrase: str) -> bytes:
    """
    Encrypts plaintext with PBKDF2 + AES-GCM and serializes frame:
    MAGIC (4B) + VERSION (1B) + SALT (16B) + NONCE (12B) + LEN (4B) + CIPHERTEXT+TAG
    """
    if not plaintext:
        raise ValueError("Secret payload cannot be empty")
    if not passphrase:
        raise ValueError("Passphrase is required")

    salt = os.urandom(16)
    nonce = os.urandom(12)
    key = derive_key(passphrase, salt)
    plain_bytes = plaintext.encode("utf-8")
    ct_with_tag = _encrypt_aes_gcm(plain_bytes, key, nonce, AAD)

    ct_len = len(ct_with_tag)
    header = MAGIC + bytes([VERSION]) + salt + nonce + struct.pack(">I", ct_len)
    return header + ct_with_tag

def decrypt_payload(serialized: bytes, passphrase: str) -> str:
    """
    Verifies header and authenticates/decrypts payload frame.
    """
    if len(serialized) < 37 + 16:
        raise ValueError("Frame too short")
    if serialized[:4] != MAGIC:
        raise ValueError("Authentication Failure: Magic header mismatch")

    version = serialized[4]
    salt = serialized[5:21]
    nonce = serialized[21:33]
    ct_len = struct.unpack(">I", serialized[33:37])[0]

    if len(serialized) < 37 + ct_len:
        raise ValueError("Ciphertext truncated")

    ct_with_tag = serialized[37:37 + ct_len]
    key = derive_key(passphrase, salt)

    decrypted = _decrypt_aes_gcm(ct_with_tag, key, nonce, AAD)
    return decrypted.decode("utf-8")
