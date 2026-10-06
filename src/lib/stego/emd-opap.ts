/**
 * ARES-EMD-OPAP: Exploiting Modification Direction (EMD) and
 * Optimal Pixel Adjustment Process (OPAP) Engine.
 *
 * Reference:
 * 1. Zhang, X., & Wang, S. (2006). "Efficient steganographic embedding by
 *    exploiting modification direction." IEEE Communications Letters, 10(11), 781-783.
 * 2. Chan, C. K., & Chen, L. M. (2004). "Hiding data in images by simple LSB
 *    substitution and optimal pixel adjustment process." IEEE Trans. Image Process.
 */

export type EMDGroupStats = {
  totalGroups: number;
  groupsUsed: number;
  modifiedPixels: number;
  modifiedPixelPct: number;
  averageAbsError: number;
  maxPixelError: number;
  mse: number;
  opapOptimizedCount: number;
  distortionReducedByOpap: number;
};

/**
 * Extraction function f for a pair of pixels (n=2, base=5):
 * f(g1, g2) = (1 * g1 + 2 * g2) mod 5
 */
export function emdExtract(g1: number, g2: number): number {
  return ((g1 + 2 * g2) % 5 + 5) % 5;
}

/**
 * Standard Zhang & Wang (2006) EMD embedding for n=2 pixels:
 * Modifies at most ONE pixel by +/- 1 to represent secret digit in {0, 1, 2, 3, 4}.
 * Boundary wrap-around is handled safely within [0, 255].
 */
export function emdEmbedGroup(c1: number, c2: number, digit: number): [number, number] {
  const cur = emdExtract(c1, c2);
  const s = ((digit - cur) % 5 + 5) % 5;

  let g1 = c1;
  let g2 = c2;

  if (s === 0) {
    // Digit already matched, no modification
    return [g1, g2];
  }

  // Weight vector w = (1, 2). Modulo 5 mapping:
  // s = 1: add +1 to g1 (1 * +1 = +1 mod 5)
  // s = 2: add +1 to g2 (2 * +1 = +2 mod 5)
  // s = 3: subtract -1 from g2 (2 * -1 = -2 = +3 mod 5)
  // s = 4: subtract -1 from g1 (1 * -1 = -1 = +4 mod 5)
  if (s === 1) {
    g1 = c1 + 1 <= 255 ? c1 + 1 : c1 - 4;
  } else if (s === 2) {
    g2 = c2 + 1 <= 255 ? c2 + 1 : c2 - 4;
  } else if (s === 3) {
    g2 = c2 - 1 >= 0 ? c2 - 1 : c2 + 4;
  } else if (s === 4) {
    g1 = c1 - 1 >= 0 ? c1 - 1 : c1 + 4;
  }

  return [
    Math.max(0, Math.min(255, g1)),
    Math.max(0, Math.min(255, g2)),
  ];
}

/**
 * Optimal Pixel Adjustment Process (OPAP):
 * Searches the candidate set V(digit) = { (y1, y2) in [0, 255]^2 | f(y1, y2) == digit }
 * to find the exact pair (y1*, y2*) minimizing squared Euclidean distance (y1 - c1)^2 + (y2 - c2)^2.
 * This guarantees the lowest possible pixel distortion while preserving the exact EMD digit.
 */
export function opapOptimizeGroup(
  c1: number,
  c2: number,
  emd1: number,
  emd2: number,
  digit: number,
): [number, number] {
  let best1 = emd1;
  let best2 = emd2;
  let minCost = (emd1 - c1) ** 2 + (emd2 - c2) ** 2;

  // Search neighborhood [-5, +5] around cover pixels
  for (let d1 = -5; d1 <= 5; d1++) {
    const cand1 = c1 + d1;
    if (cand1 < 0 || cand1 > 255) continue;

    for (let d2 = -5; d2 <= 5; d2++) {
      const cand2 = c2 + d2;
      if (cand2 < 0 || cand2 > 255) continue;

      if (emdExtract(cand1, cand2) === digit) {
        const cost = (cand1 - c1) ** 2 + (cand2 - c2) ** 2;
        if (cost < minCost) {
          minCost = cost;
          best1 = cand1;
          best2 = cand2;
        }
      }
    }
  }

  return [best1, best2];
}

/**
 * Converts a byte array into a stream of base-5 digits (radix 5).
 * Each byte (0-255) is decomposed into 4 base-5 digits (5^4 = 625 >= 256).
 * This ensures exact 1:1 reversible conversion.
 */
export function bytesToBase5(data: Uint8Array): number[] {
  const digits: number[] = [];
  for (let i = 0; i < data.length; i++) {
    let val = data[i]!;
    for (let k = 0; k < 4; k++) {
      digits.push(val % 5);
      val = Math.floor(val / 5);
    }
  }
  return digits;
}

/**
 * Converts a stream of base-5 digits back into original byte array.
 */
export function base5ToBytes(digits: number[], numBytes?: number): Uint8Array {
  const targetBytes = numBytes ?? Math.floor(digits.length / 4);
  const out = new Uint8Array(targetBytes);

  for (let i = 0; i < targetBytes; i++) {
    const d0 = digits[i * 4 + 0] ?? 0;
    const d1 = digits[i * 4 + 1] ?? 0;
    const d2 = digits[i * 4 + 2] ?? 0;
    const d3 = digits[i * 4 + 3] ?? 0;
    const val = d0 + d1 * 5 + d2 * 25 + d3 * 125;
    out[i] = Math.min(255, Math.max(0, val));
  }

  return out;
}

/**
 * Embeds a secret base-5 digit stream into pixel pairs using EMD + OPAP.
 */
export function embedDigitsEmdOpap(
  coverPixels: Uint8ClampedArray,
  pairIndices: [number, number][],
  digits: number[],
  useOpap = true,
): { stegoPixels: Uint8ClampedArray; stats: EMDGroupStats } {
  const stegoPixels = new Uint8ClampedArray(coverPixels);
  const groupsToUse = digits.length;

  if (pairIndices.length < groupsToUse) {
    throw new Error(
      `Payload exceeds available adaptive EMD capacity. Required ${groupsToUse} groups, but only ${pairIndices.length} groups available.`,
    );
  }

  let modifiedPixels = 0;
  let totalSquaredError = 0;
  let totalAbsError = 0;
  let maxError = 0;
  let opapOptimizedCount = 0;
  let distortionReduced = 0;

  for (let i = 0; i < groupsToUse; i++) {
    const [idx1, idx2] = pairIndices[i]!;
    const c1 = coverPixels[idx1]!;
    const c2 = coverPixels[idx2]!;
    const digit = digits[i]!;

    // 1. Genuine EMD embedding
    const [emd1, emd2] = emdEmbedGroup(c1, c2, digit);
    const emdCost = (emd1 - c1) ** 2 + (emd2 - c2) ** 2;

    // 2. Genuine OPAP optimization (if enabled)
    let s1 = emd1;
    let s2 = emd2;
    if (useOpap) {
      const [op1, op2] = opapOptimizeGroup(c1, c2, emd1, emd2, digit);
      const opapCost = (op1 - c1) ** 2 + (op2 - c2) ** 2;
      if (opapCost < emdCost) {
        opapOptimizedCount++;
        distortionReduced += (emdCost - opapCost);
      }
      s1 = op1;
      s2 = op2;
    }

    stegoPixels[idx1] = s1;
    stegoPixels[idx2] = s2;

    const err1 = Math.abs(s1 - c1);
    const err2 = Math.abs(s2 - c2);
    if (s1 !== c1) modifiedPixels++;
    if (s2 !== c2) modifiedPixels++;

    totalAbsError += err1 + err2;
    totalSquaredError += (s1 - c1) ** 2 + (s2 - c2) ** 2;
    maxError = Math.max(maxError, err1, err2);
  }

  const totalEvaluatedPixels = groupsToUse * 2;
  const stats: EMDGroupStats = {
    totalGroups: pairIndices.length,
    groupsUsed: groupsToUse,
    modifiedPixels,
    modifiedPixelPct: (100 * modifiedPixels) / Math.max(1, totalEvaluatedPixels),
    averageAbsError: totalAbsError / Math.max(1, totalEvaluatedPixels),
    maxPixelError: maxError,
    mse: totalSquaredError / Math.max(1, totalEvaluatedPixels),
    opapOptimizedCount,
    distortionReducedByOpap: distortionReduced,
  };

  return { stegoPixels, stats };
}

/**
 * Extracts a secret base-5 digit stream from stego pixel pairs using EMD extraction function.
 */
export function extractDigitsEmd(
  stegoPixels: Uint8ClampedArray,
  pairIndices: [number, number][],
  numDigits: number,
): number[] {
  const digits: number[] = [];
  const limit = Math.min(numDigits, pairIndices.length);

  for (let i = 0; i < limit; i++) {
    const [idx1, idx2] = pairIndices[i]!;
    const g1 = stegoPixels[idx1]!;
    const g2 = stegoPixels[idx2]!;
    digits.push(emdExtract(g1, g2));
  }

  return digits;
}
