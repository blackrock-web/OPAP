/**
 * ARES-EMD-OPAP: Cryptographic Subsystem.
 *
 * Implements:
 * 1. PBKDF2-HMAC-SHA256 Key Derivation Function (KDF)
 * 2. AES-256-GCM Authenticated Encryption with Associated Data (AEAD)
 * 3. Fresh cryptographically secure random salt & nonce generation
 * 4. Tamper detection and authentication failure handling
 */

export const CRYPTO_MAGIC = new Uint8Array([0x41, 0x52, 0x45, 0x53]); // "ARES"
export const CRYPTO_VERSION = 6; // ARES-EMD-OPAP-INN Compact AEAD v6
export const CRYPTO_VERSION_LEGACY = 5;

export type EncryptedPayloadEnvelope = {
  salt: Uint8Array;
  nonce: Uint8Array;
  ciphertext: Uint8Array;
  serialized: Uint8Array;
};

/**
 * Derives a 256-bit AES-GCM key from user passphrase and salt via PBKDF2-HMAC-SHA256.
 */
async function deriveAesKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const pwKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"],
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt as BufferSource,
      iterations: 100000,
      hash: "SHA-256",
    },
    pwKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

/**
 * Derives a deterministic 12-byte AES-GCM IV from the random 8-byte salt and methodKey
 * so we do not need to waste 12 extra header bytes in the stego bit-stream.
 */
async function deriveDeterministicIv(salt: Uint8Array, methodKey: string): Promise<Uint8Array> {
  const enc = new TextEncoder();
  const keyBytes = enc.encode(`ARES-IV:${methodKey}`);
  const buf = new Uint8Array(salt.length + keyBytes.length);
  buf.set(salt, 0);
  buf.set(keyBytes, salt.length);
  const digest = await crypto.subtle.digest("SHA-256", buf);
  return new Uint8Array(digest).slice(0, 12);
}

/**
 * Encrypts plaintext using AES-256-GCM with fresh random salt and method-bound AAD.
 * Compact v6 binary serialized frame (15-byte header + 8-byte GCM auth tag = 23B overhead):
 * [0..3]: MAGIC ("ARES")
 * [4]: VERSION (6)
 * [5..12]: SALT (8 bytes)
 * [13..14]: CIPHERTEXT_LEN (2 bytes, uint16 BE)
 * [15..]: CIPHERTEXT + 8-byte (64-bit) AUTH_TAG
 */
export async function encryptPayloadAesGcm(
  plaintext: string,
  passphrase: string,
  methodKey = "ares-emd-opap-inn",
): Promise<EncryptedPayloadEnvelope> {
  if (!plaintext) {
    throw new Error("Secret payload cannot be empty");
  }
  if (!passphrase) {
    throw new Error("Passphrase is required for cryptographic security");
  }

  const salt = crypto.getRandomValues(new Uint8Array(8));
  const nonce = await deriveDeterministicIv(salt, methodKey);
  const key = await deriveAesKey(`${passphrase}|${methodKey}`, salt);

  const enc = new TextEncoder();
  const plainBytes = enc.encode(plaintext);
  const aad = enc.encode(`ARES-AEAD-v6:${methodKey}`);

  const ctBuffer = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: nonce as BufferSource,
      additionalData: aad as BufferSource,
      tagLength: 64,
    },
    key,
    plainBytes,
  );

  const ciphertext = new Uint8Array(ctBuffer);
  const ctLen = ciphertext.length;

  const serialized = new Uint8Array(4 + 1 + 8 + 2 + ctLen);
  serialized.set(CRYPTO_MAGIC, 0);
  serialized[4] = CRYPTO_VERSION;
  serialized.set(salt, 5);
  serialized[13] = (ctLen >>> 8) & 255;
  serialized[14] = ctLen & 255;
  serialized.set(ciphertext, 15);

  return {
    salt,
    nonce,
    ciphertext,
    serialized,
  };
}

/**
 * Decrypts and authenticates payload serialized frame (supports both v6 compact and v5 legacy).
 * Rejects wrong passphrase, wrong model methodKey, altered bits, or invalid header.
 */
export async function decryptPayloadAesGcm(
  serialized: Uint8Array,
  passphrase: string,
  methodKey = "ares-emd-opap-inn",
): Promise<{ plaintext: string; isAuthentic: boolean }> {
  if (serialized.length < 15 + 8) {
    throw new Error("Payload frame is too short to contain valid ARES-EMD-OPAP-INN ciphertext.");
  }

  // Verify MAGIC
  for (let i = 0; i < 4; i++) {
    if (serialized[i] !== CRYPTO_MAGIC[i]) {
      throw new Error("Authentication Failure: Not a valid ARES steganogram.");
    }
  }

  const version = serialized[4];

  if (version === CRYPTO_VERSION) {
    const salt = serialized.subarray(5, 13);
    const ctLen = ((serialized[13]! << 8) | serialized[14]!) >>> 0;
    if (ctLen < 8 || serialized.length < 15 + ctLen) {
      throw new Error("Corrupted payload: ciphertext truncated.");
    }
    const ciphertext = serialized.subarray(15, 15 + ctLen);
    const nonce = await deriveDeterministicIv(salt, methodKey);
    const key = await deriveAesKey(`${passphrase}|${methodKey}`, salt);
    const aad = new TextEncoder().encode(`ARES-AEAD-v6:${methodKey}`);

    try {
      const plainBuffer = await crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv: nonce as BufferSource,
          additionalData: aad as BufferSource,
          tagLength: 64,
        },
        key,
        ciphertext as BufferSource,
      );

      return {
        plaintext: new TextDecoder().decode(plainBuffer),
        isAuthentic: true,
      };
    } catch {
      throw new Error(
        "Authentication Failure: AES-GCM tag mismatch. The passphrase or model selection is incorrect.",
      );
    }
  }

  // Legacy v5 frame fallback
  if (serialized.length < 37 + 16) {
    throw new Error("Payload frame is too short to contain valid legacy v5 ciphertext.");
  }

  const salt = serialized.subarray(5, 21);
  const nonce = serialized.subarray(21, 33);
  const ctLen =
    ((serialized[33]! << 24) |
      (serialized[34]! << 16) |
      (serialized[35]! << 8) |
      serialized[36]!) >>>
    0;

  if (serialized.length < 37 + ctLen) {
    throw new Error("Corrupted payload: ciphertext truncated.");
  }

  const ciphertext = serialized.subarray(37, 37 + ctLen);
  const key = await deriveAesKey(passphrase, salt);
  const aad = new TextEncoder().encode("ARES-EMD-OPAP-v5");

  try {
    const plainBuffer = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: nonce as BufferSource,
        additionalData: aad as BufferSource,
        tagLength: 128,
      },
      key,
      ciphertext as BufferSource,
    );

    return {
      plaintext: new TextDecoder().decode(plainBuffer),
      isAuthentic: true,
    };
  } catch {
    throw new Error(
      "Authentication Failure: AES-GCM tag mismatch. The passphrase is incorrect or the steganogram was tampered with.",
    );
  }
}
