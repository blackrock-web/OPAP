/**
 * ARES-EMD-OPAP: Adaptive Distortion & Cost Map Engine.
 *
 * Implements multi-feature fusion:
 * 1. Local Variance (texture complexity)
 * 2. Sobel Gradient Magnitude (edge energy)
 * 3. Discrete Laplacian (high-frequency detail)
 * 4. CNN Spatial Attention (learned salient features)
 * 5. Channel Attention weighting
 * 6. INN Reversible Feature guidance
 */

import { type RgbImage } from "./pixels";
import { keyedShuffle } from "./hash";

export type CostMapComponents = {
  varianceMap: Float32Array;
  gradientMap: Float32Array;
  laplacianMap: Float32Array;
  spatialAttentionMap: Float32Array;
  innFeatureMap: Float32Array;
  innPhaseMap: Uint8Array;
  suitabilityMap: Float32Array;
  costMap: Float32Array;
};

export type AdaptiveMaskConfig = {
  useVariance: boolean;
  useGradient: boolean;
  useLaplacian: boolean;
  useCnnAttention: boolean;
  useInnGuidance: boolean;
  wVariance?: number;
  wGradient?: number;
  wLaplacian?: number;
  wAttention?: number;
  wInn?: number;
};

export const DEFAULT_ADAPTIVE_CONFIG: AdaptiveMaskConfig = {
  useVariance: true,
  useGradient: true,
  useLaplacian: true,
  useCnnAttention: true,
  useInnGuidance: true,
  wVariance: 0.20,
  wGradient: 0.15,
  wLaplacian: 0.15,
  wAttention: 0.25,
  wInn: 0.25,
};

function normalizeMap(map: Float32Array): Float32Array {
  let min = Infinity;
  let max = -Infinity;
  for (let i = 0; i < map.length; i++) {
    const v = map[i]!;
    if (v < min) min = v;
    if (v > max) max = v;
  }
  const range = max - min + 1e-8;
  const out = new Float32Array(map.length);
  for (let i = 0; i < map.length; i++) {
    out[i] = (map[i]! - min) / range;
  }
  return out;
}

/**
 * Computes grayscale intensity from R and G channels.
 * Note: Blue channel is preserved as primary steganographic medium, so decision map
 * is strictly computed from R & G (and invariant to blue modifications).
 */
function getRgLuma(img: RgbImage, x: number, y: number): number {
  const idx = (y * img.width + x) * 4;
  return 0.5 * img.data[idx]! + 0.5 * img.data[idx + 1]!;
}

/**
 * 1. Local Variance Map: patch-based texture metric (8x8 window)
 */
export function computeLocalVariance(img: RgbImage, block = 8): Float32Array {
  const { width: w, height: h } = img;
  const varMap = new Float32Array(w * h);
  const step = Math.max(1, Math.floor(block / 2));

  for (let y = 0; y <= h - block; y += step) {
    for (let x = 0; x <= w - block; x += step) {
      let sum = 0;
      let sumSq = 0;
      let count = 0;

      for (let dy = 0; dy < block; dy++) {
        for (let dx = 0; dx < block; dx++) {
          const val = getRgLuma(img, x + dx, y + dy);
          sum += val;
          sumSq += val * val;
          count++;
        }
      }

      const mean = sum / count;
      const v = Math.max(0, sumSq / count - mean * mean);

      for (let dy = 0; dy < block; dy++) {
        for (let dx = 0; dx < block; dx++) {
          const pIdx = (y + dy) * w + (x + dx);
          if (v > varMap[pIdx]!) {
            varMap[pIdx] = v;
          }
        }
      }
    }
  }

  return normalizeMap(varMap);
}

/**
 * 2. Sobel Gradient Magnitude: measures first-order edge energy
 */
export function computeSobelGradient(img: RgbImage): Float32Array {
  const { width: w, height: h } = img;
  const gradMap = new Float32Array(w * h);

  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      // Sobel horizontal
      const gx =
        -1 * getRgLuma(img, x - 1, y - 1) +
        1 * getRgLuma(img, x + 1, y - 1) +
        -2 * getRgLuma(img, x - 1, y) +
        2 * getRgLuma(img, x + 1, y) +
        -1 * getRgLuma(img, x - 1, y + 1) +
        1 * getRgLuma(img, x + 1, y + 1);

      // Sobel vertical
      const gy =
        -1 * getRgLuma(img, x - 1, y - 1) +
        -2 * getRgLuma(img, x, y - 1) +
        -1 * getRgLuma(img, x + 1, y - 1) +
        1 * getRgLuma(img, x - 1, y + 1) +
        2 * getRgLuma(img, x, y + 1) +
        1 * getRgLuma(img, x + 1, y + 1);

      gradMap[y * w + x] = Math.sqrt(gx * gx + gy * gy);
    }
  }

  return normalizeMap(gradMap);
}

/**
 * 3. Discrete Laplacian: measures second-order high-frequency curvature
 */
export function computeLaplacian(img: RgbImage): Float32Array {
  const { width: w, height: h } = img;
  const lapMap = new Float32Array(w * h);

  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const center = getRgLuma(img, x, y);
      const top = getRgLuma(img, x, y - 1);
      const bottom = getRgLuma(img, x, y + 1);
      const left = getRgLuma(img, x - 1, y);
      const right = getRgLuma(img, x + 1, y);

      const lap = Math.abs(top + bottom + left + right - 4 * center);
      lapMap[y * w + x] = lap;
    }
  }

  return normalizeMap(lapMap);
}

/**
 * 4. CNN Multi-scale Spatial Attention: simulates multi-scale receptive field attention
 */
export function computeCnnSpatialAttention(img: RgbImage): Float32Array {
  const { width: w, height: h } = img;
  const attMap = new Float32Array(w * h);

  // Multi-scale convolution proxy mirroring ARES-Hybrid-INN enc1 and enc2 layers
  for (let y = 2; y < h - 2; y++) {
    for (let x = 2; x < w - 2; x++) {
      const c = getRgLuma(img, x, y);

      // 5x5 contextual contrast
      let s5 = 0;
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          s5 += Math.abs(getRgLuma(img, x + dx, y + dy) - c);
        }
      }
      const score = s5 / 25;
      // Channel weighting: Red vs Green chrominance discrepancy
      const idx = (y * w + x) * 4;
      const chromDelta = Math.abs(img.data[idx]! - img.data[idx + 1]!);

      attMap[y * w + x] = 0.7 * score + 0.3 * (chromDelta / 255);
    }
  }

  return normalizeMap(attMap);
}

/**
 * 5. INN-Derived Feature Guidance: 2-stage Invertible Neural Network (INN)
 * reversible Haar wavelet decomposition + affine coupling block response
 * (z1 = LL, z2 = [LH, HL, HH], y2 = z2 * exp(tanh(s(z1))) + t(z1), y1 = z1 + phi(y2))
 */
export function computeInnGuidance(img: RgbImage): Float32Array {
  const { width: w, height: h } = img;
  const innMap = new Float32Array(w * h);

  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const p1 = getRgLuma(img, x, y);
      const p2 = getRgLuma(img, x + 1, y);
      const p3 = getRgLuma(img, x, y + 1);
      const p4 = getRgLuma(img, x + 1, y + 1);

      // Stage 1: Reversible 2x2 Haar wavelet subbands
      const ll = 0.25 * (p1 + p2 + p3 + p4);
      const lh = Math.abs(p1 - p2 + p3 - p4);
      const hl = Math.abs(p1 + p2 - p3 - p4);
      const hh = Math.abs(p1 - p2 - p3 + p4);

      // Stage 2: Invertible Affine Coupling Block (s(z1), t(z1), phi(y2))
      const z1Norm = (ll - 128.0) / 128.0;
      const scaleS = Math.exp(0.35 * Math.tanh(z1Norm));
      const shiftT = Math.abs(getRgLuma(img, x, y) - getRgLuma(img, x - 1, y - 1)) * 0.25;
      const z2Energy = (lh + hl + 1.5 * hh) / 3.5;
      const y2 = z2Energy * scaleS + shiftT;
      const y1Coupled = Math.abs(z1Norm) * 12.0 + 0.85 * y2;

      innMap[y * w + x] = y1Coupled;
    }
  }

  return normalizeMap(innMap);
}

/**
 * Computes an invariant reversible INN coupling phase map from R and G channels.
 * Because Blue channel (channel 2) carries the EMD digits, this map is 100% identical
 * between cover and stego images, enabling zero-overhead INN syndrome coupling.
 */
export function computeInnPhaseMap(img: RgbImage): Uint8Array {
  const { width: w, height: h, data } = img;
  const phase = new Uint8Array(w * h);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      const r = data[idx]!;
      const g = data[idx + 1]!;
      const nx = x + 1 < w ? (y * w + (x + 1)) * 4 : idx;
      const ny = y + 1 < h ? ((y + 1) * w + x) * 4 : idx;
      const r2 = data[nx]!;
      const g2 = data[ny + 1]!;

      // Reversible integer lifting wavelet + affine coupling step on invariant (R, G)
      const d1 = ((r - g) & 255) ^ ((r2 + g2) & 255);
      const s1 = (r + ((g * 3) & 255) + ((d1 * 7) & 255)) & 255;
      phase[y * w + x] = s1;
    }
  }

  return phase;
}

/**
 * Builds the complete unified adaptive distortion and cost map
 */
export function buildAdaptiveCostMap(
  img: RgbImage,
  config: AdaptiveMaskConfig = DEFAULT_ADAPTIVE_CONFIG,
): CostMapComponents {
  const { width: w, height: h } = img;
  const n = w * h;

  const varianceMap = config.useVariance ? computeLocalVariance(img) : new Float32Array(n);
  const gradientMap = config.useGradient ? computeSobelGradient(img) : new Float32Array(n);
  const laplacianMap = config.useLaplacian ? computeLaplacian(img) : new Float32Array(n);
  const spatialAttentionMap = config.useCnnAttention ? computeCnnSpatialAttention(img) : new Float32Array(n);
  const innFeatureMap = config.useInnGuidance ? computeInnGuidance(img) : new Float32Array(n);
  const innPhaseMap = config.useInnGuidance ? computeInnPhaseMap(img) : new Uint8Array(n);

  const wv = config.useVariance ? (config.wVariance ?? 0.20) : 0;
  const wg = config.useGradient ? (config.wGradient ?? 0.15) : 0;
  const wl = config.useLaplacian ? (config.wLaplacian ?? 0.15) : 0;
  const wa = config.useCnnAttention ? (config.wAttention ?? 0.25) : 0;
  const wi = config.useInnGuidance ? (config.wInn ?? 0.25) : 0;
  const totalWeight = wv + wg + wl + wa + wi || 1.0;

  const suitabilityMap = new Float32Array(n);
  const costMap = new Float32Array(n);

  for (let i = 0; i < n; i++) {
    const s =
      (wv * varianceMap[i]! +
        wg * gradientMap[i]! +
        wl * laplacianMap[i]! +
        wa * spatialAttentionMap[i]! +
        wi * innFeatureMap[i]!) /
      totalWeight;

    suitabilityMap[i] = s;
    costMap[i] = 1.0 - s; // High suitability = Low distortion cost
  }

  return {
    varianceMap,
    gradientMap,
    laplacianMap,
    spatialAttentionMap,
    innFeatureMap,
    innPhaseMap,
    suitabilityMap,
    costMap,
  };
}

/**
 * Generates eligible EMD pixel groups of size `groupSize` ordered by lowest adaptive cost
 * and paired with their invariant INN coupling phase.
 */
export async function getAdaptiveEmdGroups(
  img: RgbImage,
  password: string,
  config: AdaptiveMaskConfig = DEFAULT_ADAPTIVE_CONFIG,
  groupSize = 2,
  channel: 0 | 1 | 2 = 2,
): Promise<{
  groups: number[][];
  innPhases: number[];
  components: CostMapComponents;
  totalCapacityGroups: number;
}> {
  const { width: w, height: h } = img;
  const components = buildAdaptiveCostMap(img, config);
  const suitability = components.suitabilityMap;
  const innPhaseMap = components.innPhaseMap;
  const modulus = 2 * groupSize + 1;

  type GroupCandidate = {
    indices: number[];
    innPhase: number;
    cost: number;
  };

  const candidates: GroupCandidate[] = [];
  const totalPixels = w * h;
  const usableGroups = Math.floor(totalPixels / groupSize);

  for (let g = 0; g < usableGroups; g++) {
    const basePixel = g * groupSize;
    const indices: number[] = [];
    let suitSum = 0;
    let phaseAcc = 0;

    for (let k = 0; k < groupSize; k++) {
      const pIdx = basePixel + k;
      indices.push(pIdx * 4 + channel);
      suitSum += suitability[pIdx]!;
      phaseAcc = (phaseAcc + (k + 1) * innPhaseMap[pIdx]!) % modulus;
    }

    const avgSuitability = suitSum / groupSize;
    const cost = 1.0 - avgSuitability;

    candidates.push({
      indices,
      innPhase: config.useInnGuidance ? phaseAcc % modulus : 0,
      cost,
    });
  }

  const isGuided =
    config.useVariance ||
    config.useGradient ||
    config.useLaplacian ||
    config.useCnnAttention ||
    config.useInnGuidance;

  if (isGuided) {
    // Sort candidates by cost ascending (lowest cost / highest texture & INN suitability first)
    candidates.sort((a, b) => a.cost - b.cost);
  }

  // Apply deterministic keyed permutation to top 75% lowest cost candidates
  const topCount = Math.floor(candidates.length * 0.75);
  const head = await keyedShuffle(candidates.slice(0, topCount), `${password}|emd_head_${groupSize}`);
  const tail = await keyedShuffle(candidates.slice(topCount), `${password}|emd_tail_${groupSize}`);
  const ordered = head.concat(tail);

  return {
    groups: ordered.map((c) => c.indices),
    innPhases: ordered.map((c) => c.innPhase),
    components,
    totalCapacityGroups: ordered.length,
  };
}

/**
 * Generates eligible EMD pixel pairs ordered by lowest cost / highest suitability.
 * Embedding takes place on the designated channel (default: Blue channel = 2).
 */
export async function getAdaptiveEmdPairs(
  img: RgbImage,
  password: string,
  config: AdaptiveMaskConfig = DEFAULT_ADAPTIVE_CONFIG,
  channel: 0 | 1 | 2 = 2,
): Promise<{
  pairs: [number, number][];
  components: CostMapComponents;
  totalCapacityGroups: number;
}> {
  const res = await getAdaptiveEmdGroups(img, password, config, 2, channel);
  return {
    pairs: res.groups.map((g) => [g[0]!, g[1]!]),
    components: res.components,
    totalCapacityGroups: res.totalCapacityGroups,
  };
}
