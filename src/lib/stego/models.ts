import {
  adaptivePositions,
  cloneForEmbed,
  hamming74Embed,
  hamming74Extract,
  keyedPositions,
  minLsbEmbed,
  minLsbExtract,
  type EmbedStats,
} from "./embed";
import {
  bitErrorRate,
  meanAbsDelta,
  maxAbsDelta,
  countModifiedPixels,
  mseOf,
  psnrOf,
  ssimOf,
  type QualityMetrics,
} from "./metrics";
import { bitsFromBytes, bytesFromBits, packPayload, unpackPayload } from "./pack";
import { type Coord, type RgbImage } from "./pixels";
import {
  bytesToBase5,
  base5ToBytes,
  embedDigitsEmdOpap,
  extractDigitsEmd,
} from "./emd-opap";
import {
  getAdaptiveEmdPairs,
  DEFAULT_ADAPTIVE_CONFIG,
  type AdaptiveMaskConfig,
} from "./adaptive-cost";
import {
  encryptPayloadAesGcm,
  decryptPayloadAesGcm,
} from "./crypto";

export type ModelKind = "proposed" | "paper" | "ablation" | "baseline";

export type ModelDef = {
  id: string;
  name: string;
  short: string;
  paper: string;
  kind: ModelKind;
  status: "TRAINED" | "REPRODUCED" | "ACTIVE";
  note: string;
  methodKey: string;
  algorithmType: "emd_opap" | "emd_only" | "lsb" | "hamming" | "hybrid";
  usesEmd: boolean;
  usesOpap: boolean;
  usesAdaptiveCost: boolean;
  usesAesGcm: boolean;
  usesHamming?: boolean;
  usesAdaptive?: boolean;
  usesCompensate?: boolean;
  ablationLevel?: 1 | 2 | 3 | 4 | 5;
};

export const MODELS: ModelDef[] = [
  // PROPOSED ARCHITECTURE
  {
    id: "ares_emd_opap",
    name: "ARES-EMD-OPAP (Proposed)",
    short: "ARES-EMD-OPAP",
    paper: "CNN-Assisted Adaptive EMD-OPAP Steganography with Distortion Optimization for Secure Image Data Hiding",
    kind: "proposed",
    status: "TRAINED",
    note: "Proposed research system: CNN feature representation, spatial/channel attention, multi-feature variance/gradient/Laplacian analysis, and INN-derived guidance form the adaptive distortion cost map. Payload is encrypted with PBKDF2 + AES-256-GCM, embedded via Zhang-Wang EMD, and post-optimized with Chan-Chen OPAP.",
    methodKey: "ares-emd-opap",
    algorithmType: "emd_opap",
    usesEmd: true,
    usesOpap: true,
    usesAdaptiveCost: true,
    usesAesGcm: true,
    ablationLevel: 5,
  },
  // Backward compatibility alias for existing bookmarks & session state
  {
    id: "ares_hybrid_inn",
    name: "ARES-EMD-OPAP [ARES-Hybrid-INN]",
    short: "ARES-EMD-OPAP",
    paper: "ARES-EMD-OPAP: CNN + Attention + INN + Adaptive EMD + OPAP",
    kind: "proposed",
    status: "TRAINED",
    note: "Upgraded pipeline alias: Reuses trained CNN and INN feature weights to guide adaptive EMD embedding and OPAP pixel adjustment.",
    methodKey: "ares-emd-opap",
    algorithmType: "emd_opap",
    usesEmd: true,
    usesOpap: true,
    usesAdaptiveCost: true,
    usesAesGcm: true,
    ablationLevel: 5,
  },
  // ABLATION MODELS (Section 16)
  {
    id: "ablation_m1",
    name: "Model 1: EMD + OPAP",
    short: "M1: EMD+OPAP",
    paper: "Ablation Study 1 — Pure EMD with OPAP (sequential, unguided)",
    kind: "ablation",
    status: "ACTIVE",
    note: "Baseline EMD (n=2, radix-5) followed by OPAP distortion reduction without adaptive CNN or texture guidance.",
    methodKey: "ablation-m1",
    algorithmType: "emd_opap",
    usesEmd: true,
    usesOpap: true,
    usesAdaptiveCost: false,
    usesAesGcm: false,
    ablationLevel: 1,
  },
  {
    id: "ablation_m2",
    name: "Model 2: CNN-Assisted Adaptive EMD + OPAP",
    short: "M2: CNN+EMD+OPAP",
    paper: "Ablation Study 2 — CNN & Local Statistics Adaptive EMD + OPAP",
    kind: "ablation",
    status: "ACTIVE",
    note: "Integrates CNN convolutional feature extraction, local variance, and Sobel gradient to guide eligible EMD pairs.",
    methodKey: "ablation-m2",
    algorithmType: "emd_opap",
    usesEmd: true,
    usesOpap: true,
    usesAdaptiveCost: true,
    usesAesGcm: false,
    ablationLevel: 2,
  },
  {
    id: "ablation_m3",
    name: "Model 3: CNN + Attention + Adaptive EMD + OPAP",
    short: "M3: Attention+EMD",
    paper: "Ablation Study 3 — Multi-scale Spatial & Channel Attention Guidance",
    kind: "ablation",
    status: "ACTIVE",
    note: "Adds spatial and channel attention weights to prioritize high-entropy regions before EMD embedding and OPAP.",
    methodKey: "ablation-m3",
    algorithmType: "emd_opap",
    usesEmd: true,
    usesOpap: true,
    usesAdaptiveCost: true,
    usesAesGcm: false,
    ablationLevel: 3,
  },
  {
    id: "ablation_m4",
    name: "Model 4: CNN + Attention + INN + Adaptive EMD + OPAP",
    short: "M4: INN+EMD+OPAP",
    paper: "Ablation Study 4 — Full Learned INN Feature Guidance (Unencrypted)",
    kind: "ablation",
    status: "ACTIVE",
    note: "Combines CNN, attention, and INN reversible frequency components for maximum imperceptibility without AES-GCM.",
    methodKey: "ablation-m4",
    algorithmType: "emd_opap",
    usesEmd: true,
    usesOpap: true,
    usesAdaptiveCost: true,
    usesAesGcm: false,
    ablationLevel: 4,
  },
  {
    id: "ablation_m5",
    name: "Model 5: Proposed ARES-EMD-OPAP (Full Pipeline)",
    short: "M5: Full ARES",
    paper: "Ablation Study 5 — CNN + Attention + INN + Adaptive EMD + OPAP + AES-GCM",
    kind: "ablation",
    status: "ACTIVE",
    note: "Complete proposed research pipeline: full learned guidance, PBKDF2 key derivation, AES-256-GCM AEAD, EMD, and OPAP.",
    methodKey: "ares-emd-opap",
    algorithmType: "emd_opap",
    usesEmd: true,
    usesOpap: true,
    usesAdaptiveCost: true,
    usesAesGcm: true,
    ablationLevel: 5,
  },
  // PUBLISHED SCIENTIFIC BASELINES
  {
    id: "paper_model_01",
    name: "Kanimozhi RNN+Fuzzy",
    short: "Kanimozhi",
    paper: "Sci Rep 2025 — RNN + fuzzy logic",
    kind: "paper",
    status: "REPRODUCED",
    note: "Original RNN/fuzzy weights were not released. Reproduction: password-keyed adaptive LSB on the blue channel, matching the ARES benchmark wrapper.",
    methodKey: "kanimozhi",
    algorithmType: "lsb",
    usesEmd: false,
    usesOpap: false,
    usesAdaptiveCost: false,
    usesAesGcm: false,
  },
  {
    id: "paper_model_02",
    name: "Sanjalawe Huffman+LSB",
    short: "Sanjalawe",
    paper: "Sci Rep 2025 — Huffman + LSB + DL",
    kind: "paper",
    status: "REPRODUCED",
    note: "DL encoder-decoder weights not public. Reproduction: keyed LSB (Huffman/zlib path omitted in-browser; payload packed identically).",
    methodKey: "sanjalawe",
    algorithmType: "lsb",
    usesEmd: false,
    usesOpap: false,
    usesAdaptiveCost: false,
    usesAesGcm: false,
  },
  {
    id: "paper_model_03",
    name: "Rahman LSB+Magic Matrix",
    short: "Rahman",
    paper: "Sci Rep 2025 — LSB + Magic Matrix + MLEA",
    kind: "paper",
    status: "REPRODUCED",
    note: "Magic-matrix permutation reproduced as password-derived position shuffle (rahman-magic).",
    methodKey: "rahman-magic",
    algorithmType: "lsb",
    usesEmd: false,
    usesOpap: false,
    usesAdaptiveCost: false,
    usesAesGcm: false,
  },
  {
    id: "paper_model_04",
    name: "Aljarf DL-Steg SAE+LSTM",
    short: "DL-Steg",
    paper: "JUQEA 2025 — SAE + LSTM + ECC",
    kind: "paper",
    status: "REPRODUCED",
    note: "SAE+LSTM weights not public. Reproduction: ECC-tagged keyed LSB (dlsteg-ecc).",
    methodKey: "dlsteg-ecc",
    algorithmType: "lsb",
    usesEmd: false,
    usesOpap: false,
    usesAdaptiveCost: false,
    usesAesGcm: false,
  },
  {
    id: "paper_model_05",
    name: "Zhang ISS",
    short: "ISS",
    paper: "Cybersecurity 2025 — multi-image stitching",
    kind: "paper",
    status: "REPRODUCED",
    note: "Multi-image GA stitching reduced to a single-cover path for fair per-image protocol (iss-single).",
    methodKey: "iss-single",
    algorithmType: "lsb",
    usesEmd: false,
    usesOpap: false,
    usesAdaptiveCost: false,
    usesAesGcm: false,
  },
];

export function modelById(id: string): ModelDef {
  const m = MODELS.find((x) => x.id === id);
  if (!m) {
    if (id === "ares_hybrid_inn") return MODELS[0]!;
    throw new Error(`Unknown model ${id}`);
  }
  return m;
}

export type EncodeOutcome = {
  stego: RgbImage;
  metrics: QualityMetrics;
  recovered: string;
  stats: EmbedStats;
  model: ModelDef;
  availableCapacityBits: number;
  payloadBits: number;
  modifiedPixels: number;
  averageAbsError: number;
  maxPixelError: number;
};

/**
 * Configure adaptive cost map based on ablation level
 */
function getAdaptiveConfigForModel(model: ModelDef): AdaptiveMaskConfig {
  if (!model.usesAdaptiveCost) {
    return {
      useVariance: false,
      useGradient: false,
      useLaplacian: false,
      useCnnAttention: false,
      useInnGuidance: false,
    };
  }

  const level = model.ablationLevel ?? 5;
  if (level === 2) {
    return {
      useVariance: true,
      useGradient: true,
      useLaplacian: false,
      useCnnAttention: false,
      useInnGuidance: false,
      wVariance: 0.6,
      wGradient: 0.4,
    };
  } else if (level === 3) {
    return {
      useVariance: true,
      useGradient: true,
      useLaplacian: true,
      useCnnAttention: true,
      useInnGuidance: false,
      wVariance: 0.3,
      wGradient: 0.25,
      wLaplacian: 0.15,
      wAttention: 0.3,
    };
  } else {
    // Level 4 & 5: Full fusion with INN
    return DEFAULT_ADAPTIVE_CONFIG;
  }
}

/**
 * High-Level Embedding Engine
 */
export async function encodeWithModel(
  model: ModelDef,
  cover: RgbImage,
  secret: string,
  password: string,
): Promise<EncodeOutcome> {
  const t0 = performance.now();

  // 1. Check if model runs EMD + OPAP pipeline
  if (model.usesEmd) {
    // A. Payload Preparation (AES-GCM or Framed)
    let payloadBytes: Uint8Array;
    let authStatus: "AUTHENTICATED" | "NONE" = "NONE";

    if (model.usesAesGcm) {
      const encrypted = await encryptPayloadAesGcm(secret, password);
      payloadBytes = encrypted.serialized;
      authStatus = "AUTHENTICATED";
    } else {
      // Unencrypted framed payload for ablation models
      const rawSecret = new TextEncoder().encode(secret);
      const framed = new Uint8Array(4 + 4 + rawSecret.length);
      framed.set([0x41, 0x42, 0x4c, 0x31], 0); // "ABL1"
      framed[4] = (rawSecret.length >>> 24) & 255;
      framed[5] = (rawSecret.length >>> 16) & 255;
      framed[6] = (rawSecret.length >>> 8) & 255;
      framed[7] = rawSecret.length & 255;
      framed.set(rawSecret, 8);
      payloadBytes = framed;
    }

    // B. Convert payload to base-5 digits (each byte -> 4 digits)
    const digits = bytesToBase5(payloadBytes);
    const requiredGroups = digits.length;

    // C. Generate eligible pixel pairs using CNN + Attention + INN adaptive cost map
    const adaptConfig = getAdaptiveConfigForModel(model);
    const { pairs, totalCapacityGroups } = await getAdaptiveEmdPairs(
      cover,
      password,
      adaptConfig,
      2, // Blue channel
    );

    const availableCapacityBits = Math.floor(totalCapacityGroups * Math.log2(5));
    const payloadBits = payloadBytes.length * 8;

    if (pairs.length < requiredGroups) {
      throw new Error(
        `Payload exceeds available adaptive EMD capacity. Required ${requiredGroups} pixel groups (${payloadBits} bits), but image capacity is ${pairs.length} groups (${availableCapacityBits} bits). Use a larger image or shorter secret.`,
      );
    }

    // D. Execute EMD Embedding & OPAP Optimization
    const { stegoPixels, stats } = embedDigitsEmdOpap(
      cover.data,
      pairs,
      digits,
      model.usesOpap,
    );

    const stego: RgbImage = {
      width: cover.width,
      height: cover.height,
      data: stegoPixels,
    };

    const encodeMs = performance.now() - t0;

    // E. Verify Extraction
    const t1 = performance.now();
    const recovered = await decodeWithModel(model, stego, password);
    const decodeMs = performance.now() - t1;

    const modified = countModifiedPixels(cover, stego);
    const maxErr = maxAbsDelta(cover, stego);

    const metrics: QualityMetrics = {
      psnr: psnrOf(cover, stego),
      ssim: ssimOf(cover, stego),
      mse: mseOf(cover, stego),
      ber: bitErrorRate(secret, recovered),
      recovery: recovered === secret,
      payloadBits,
      payloadBytes: payloadBytes.length,
      bpp: payloadBits / (cover.width * cover.height),
      lsbChangePct: stats.modifiedPixelPct,
      encodeMs,
      decodeMs,
      distortion: meanAbsDelta(cover, stego),
      capacityBits: availableCapacityBits,
      modifiedPixels: modified.count,
      modifiedPixelPct: modified.pct,
      averageAbsError: stats.averageAbsError,
      maxPixelError: maxErr,
      opapOptimizedCount: stats.opapOptimizedCount,
      authStatus,
      algorithmName: model.name,
    };

    return {
      stego,
      metrics,
      recovered,
      stats: {
        changedLsb: modified.count,
        lsbChangePct: modified.pct,
        method: model.usesOpap ? "emd_opap_adaptive" : "emd_pure",
      },
      model,
      availableCapacityBits,
      payloadBits,
      modifiedPixels: modified.count,
      averageAbsError: stats.averageAbsError,
      maxPixelError: maxErr,
    };
  }

  // 2. Classical baseline models (Kanimozhi, Sanjalawe, Rahman, DL-Steg, ISS)
  const packed = await packPayload(secret, password, model.methodKey);
  const bits = bitsFromBytes(packed);
  const capacity = cover.width * cover.height;
  if (bits.length > capacity) {
    throw new Error(
      `Payload ${bits.length} bits exceeds capacity ${capacity}. Use a larger image or shorter secret.`,
    );
  }

  const pos = await positionsFor(model, cover, password);
  const stego = cloneForEmbed(cover);
  let stats: EmbedStats;
  if (model.usesHamming) {
    stats = hamming74Embed(stego, pos, bits);
  } else {
    stats = minLsbEmbed(stego, pos, bits, 2, false);
  }

  const encodeMs = performance.now() - t0;
  const t1 = performance.now();
  const recovered = await decodeWithModel(model, stego, password);
  const decodeMs = performance.now() - t1;

  const modified = countModifiedPixels(cover, stego);
  const maxErr = maxAbsDelta(cover, stego);

  const metrics: QualityMetrics = {
    psnr: psnrOf(cover, stego),
    ssim: ssimOf(cover, stego),
    mse: mseOf(cover, stego),
    ber: bitErrorRate(secret, recovered),
    recovery: recovered === secret,
    payloadBits: bits.length,
    payloadBytes: packed.length,
    bpp: bits.length / (cover.width * cover.height),
    lsbChangePct: stats.lsbChangePct,
    encodeMs,
    decodeMs,
    distortion: meanAbsDelta(cover, stego),
    capacityBits: capacity,
    modifiedPixels: modified.count,
    modifiedPixelPct: modified.pct,
    averageAbsError: meanAbsDelta(cover, stego),
    maxPixelError: maxErr,
    authStatus: "NONE",
    algorithmName: model.name,
  };

  return {
    stego,
    metrics,
    recovered,
    stats,
    model,
    availableCapacityBits: capacity,
    payloadBits: bits.length,
    modifiedPixels: modified.count,
    averageAbsError: meanAbsDelta(cover, stego),
    maxPixelError: maxErr,
  };
}

/**
 * High-Level Extraction Engine
 */
export async function decodeWithModel(
  model: ModelDef,
  stego: RgbImage,
  password: string,
): Promise<string> {
  // 1. EMD + OPAP Extraction
  if (model.usesEmd) {
    const adaptConfig = getAdaptiveConfigForModel(model);
    const { pairs } = await getAdaptiveEmdPairs(
      stego,
      password,
      adaptConfig,
      2, // Blue channel
    );

    if (model.usesAesGcm) {
      // Header is 37 bytes = 37 * 4 = 148 base-5 digits
      const headerDigits = extractDigitsEmd(stego.data, pairs, 148);
      const headerBytes = base5ToBytes(headerDigits, 37);

      // Verify ARES Magic
      if (
        headerBytes[0] !== 0x41 ||
        headerBytes[1] !== 0x52 ||
        headerBytes[2] !== 0x45 ||
        headerBytes[3] !== 0x53
      ) {
        throw new Error(
          "Authentication Failure: Magic header mismatch. The image was either encoded with a different algorithm or password.",
        );
      }

      // Read ciphertext length
      const ctLen =
        ((headerBytes[33]! << 24) |
          (headerBytes[34]! << 16) |
          (headerBytes[35]! << 8) |
          headerBytes[36]!) >>>
        0;

      const totalBytes = 37 + ctLen;
      const totalDigits = totalBytes * 4;

      if (pairs.length < totalDigits) {
        throw new Error("Payload corrupted: exceeds available image groups.");
      }

      const allDigits = extractDigitsEmd(stego.data, pairs, totalDigits);
      const fullSerialized = base5ToBytes(allDigits, totalBytes);

      const decrypted = await decryptPayloadAesGcm(fullSerialized, password);
      return decrypted.plaintext;
    } else {
      // Ablation models without AES-GCM (raw framed)
      const headerDigits = extractDigitsEmd(stego.data, pairs, 32); // 8 bytes * 4
      const headerBytes = base5ToBytes(headerDigits, 8);

      if (
        headerBytes[0] !== 0x41 ||
        headerBytes[1] !== 0x42 ||
        headerBytes[2] !== 0x4c ||
        headerBytes[3] !== 0x31
      ) {
        throw new Error("Invalid ablation frame: header mismatch.");
      }

      const rawLen =
        ((headerBytes[4]! << 24) |
          (headerBytes[5]! << 16) |
          (headerBytes[6]! << 8) |
          headerBytes[7]!) >>>
        0;

      const totalBytes = 8 + rawLen;
      const totalDigits = totalBytes * 4;
      const allDigits = extractDigitsEmd(stego.data, pairs, totalDigits);
      const fullBytes = base5ToBytes(allDigits, totalBytes);

      return new TextDecoder().decode(fullBytes.subarray(8, 8 + rawLen));
    }
  }

  // 2. Classical baseline models
  const pos = await positionsFor(model, stego, password);
  const headerBits = 16 * 8 + 4096 * 8;
  const nBits = Math.min(stego.width * stego.height, headerBits);
  const bits = model.usesHamming
    ? hamming74Extract(stego, pos, nBits)
    : minLsbExtract(stego, pos, nBits);
  const blob = bytesFromBits(bits);
  return unpackPayload(blob, password, model.methodKey);
}

async function positionsFor(model: ModelDef, cover: RgbImage, password: string): Promise<Coord[]> {
  if (model.usesAdaptive) return adaptivePositions(cover, password);
  return keyedPositions(cover.height, cover.width, password + model.methodKey);
}

/**
 * Standard API required by Section 14
 */
export async function embed(
  coverImage: RgbImage,
  secretData: string,
  passphrase: string,
  modelConfig: { modelId?: string } = {},
): Promise<{ stegoImage: RgbImage; metadata: Record<string, unknown>; metrics: QualityMetrics }> {
  const model = modelById(modelConfig.modelId || "ares_emd_opap");
  const outcome = await encodeWithModel(model, coverImage, secretData, passphrase);
  return {
    stegoImage: outcome.stego,
    metadata: {
      modelId: model.id,
      modelName: model.name,
      payloadBits: outcome.payloadBits,
      availableCapacityBits: outcome.availableCapacityBits,
      modifiedPixels: outcome.modifiedPixels,
      averageAbsError: outcome.averageAbsError,
      maxPixelError: outcome.maxPixelError,
      authStatus: outcome.metrics.authStatus,
    },
    metrics: outcome.metrics,
  };
}

export async function extract(
  stegoImage: RgbImage,
  passphrase: string,
  modelConfig: { modelId?: string } = {},
): Promise<string> {
  const model = modelById(modelConfig.modelId || "ares_emd_opap");
  return decodeWithModel(model, stegoImage, passphrase);
}
