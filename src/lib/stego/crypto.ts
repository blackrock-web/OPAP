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
export const CRYPTO_VERSION = 5; // ARES-EMD-OPAP v5

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
 * Encrypts plaintext using AES-256-GCM with fresh random salt and nonce.
 * Returns binary serialized frame:
 * [0..3]: MAGIC ("ARES")
 * [4]: VERSION (5)
 * [5..20]: SALT (16 bytes)
 * [21..32]: NONCE (12 bytes)
 * [33..36]: CIPHERTEXT_LEN (4 bytes, uint32 BE)
 * [37..]: CIPHERTEXT + 16-byte AUTH_TAG
 */
export async function encryptPayloadAesGcm(
  plaintext: string,
  passphrase: string,
): Promise<EncryptedPayloadEnvelope> {
  if (!plaintext) {
    throw new Error("Secret payload cannot be empty");
  }
  if (!passphrase) {
    throw new Error("Passphrase is required for cryptographic security");
  }

  const salt = crypto.getRandomValues(new Uint8Array(16));
  const nonce = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveAesKey(passphrase, salt);

  const enc = new TextEncoder();
  const plainBytes = enc.encode(plaintext);
  const aad = enc.encode("ARES-EMD-OPAP-v5");

  const ctBuffer = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: nonce as BufferSource,
      additionalData: aad as BufferSource,
      tagLength: 128,
    },
    key,
    plainBytes,
  );

  const ciphertext = new Uint8Array(ctBuffer);
  const ctLen = ciphertext.length;

  const serialized = new Uint8Array(4 + 1 + 16 + 12 + 4 + ctLen);
  serialized.set(CRYPTO_MAGIC, 0);
  serialized[4] = CRYPTO_VERSION;
  serialized.set(salt, 5);
  serialized.set(nonce, 21);

  // Write ctLen big-endian
  serialized[33] = (ctLen >>> 24) & 255;
  serialized[34] = (ctLen >>> 16) & 255;
  serialized[35] = (ctLen >>> 8) & 255;
  serialized[36] = ctLen & 255;

  serialized.set(ciphertext, 37);

  return {
    salt,
    nonce,
    ciphertext,
    serialized,
  };
}

/**
 * Decrypts and authenticates payload serialized frame.
 * Rejects wrong passphrase, altered bits, or invalid header.
 */
export async function decryptPayloadAesGcm(
  serialized: Uint8Array,
  passphrase: string,
): Promise<{ plaintext: string; isAuthentic: boolean }> {
  if (serialized.length < 37 + 16) {
    throw new Error("Payload frame is too short to contain valid ARES-EMD-OPAP ciphertext.");
  }

  // Verify MAGIC
  for (let i = 0; i < 4; i++) {
    if (serialized[i] !== CRYPTO_MAGIC[i]) {
      throw new Error("Authentication Failure: Not a valid ARES-EMD-OPAP steganogram.");
    }
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
  } catch (_e) {
    throw new Error(
      "Authentication Failure: AES-GCM tag mismatch. The passphrase is incorrect or the steganogram was tampered with.",
    );
  }
}
