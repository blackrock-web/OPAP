import type { RgbImage } from "./pixels";

export type QualityMetrics = {
  psnr: number;
  ssim: number;
  mse: number;
  ber: number;
  recovery: boolean;
  payloadBits: number;
  payloadBytes?: number;
  bpp: number;
  lsbChangePct: number;
  encodeMs: number;
  decodeMs: number;
  distortion: number;
  // ARES-EMD-OPAP Enhanced Metrics
  capacityBits?: number;
  modifiedPixels?: number;
  modifiedPixelPct?: number;
  averageAbsError?: number;
  maxPixelError?: number;
  opapOptimizedCount?: number;
  authStatus?: "AUTHENTICATED" | "FAILED" | "NONE";
  algorithmName?: string;
};

export const METRIC_KEYS: { key: keyof QualityMetrics; label: string }[] = [
  { key: "psnr", label: "PSNR (dB)" },
  { key: "ssim", label: "SSIM" },
  { key: "mse", label: "MSE" },
  { key: "bpp", label: "Embedding Rate (bpp)" },
  { key: "payloadBits", label: "Payload Bits" },
  { key: "modifiedPixels", label: "Modified Pixels" },
  { key: "averageAbsError", label: "Avg Abs Error" },
  { key: "maxPixelError", label: "Max Pixel Error" },
  { key: "opapOptimizedCount", label: "OPAP Optimized" },
  { key: "encodeMs", label: "Encode (ms)" },
];

export function mseOf(a: RgbImage, b: RgbImage): number {
  const n = a.width * a.height * 3;
  let s = 0;
  for (let i = 0; i < a.data.length; i += 4) {
    const dr = a.data[i]! - b.data[i]!;
    const dg = a.data[i + 1]! - b.data[i + 1]!;
    const db = a.data[i + 2]! - b.data[i + 2]!;
    s += dr * dr + dg * dg + db * db;
  }
  return s / n;
}

export function psnrOf(a: RgbImage, b: RgbImage): number {
  const m = mseOf(a, b);
  if (m <= 1e-12) return 99;
  return 10 * Math.log10((255 * 255) / m);
}

export function ssimOf(a: RgbImage, b: RgbImage): number {
  const n = a.width * a.height * 3;
  let sx = 0,
    sy = 0,
    sxx = 0,
    syy = 0,
    sxy = 0;
  for (let i = 0; i < a.data.length; i += 4) {
    for (let c = 0; c < 3; c++) {
      const x = a.data[i + c]!;
      const y = b.data[i + c]!;
      sx += x;
      sy += y;
      sxx += x * x;
      syy += y * y;
      sxy += x * y;
    }
  }
  const muX = sx / n;
  const muY = sy / n;
  const vx = sxx / n - muX * muX;
  const vy = syy / n - muY * muY;
  const cov = sxy / n - muX * muY;
  const c1 = (0.01 * 255) ** 2;
  const c2 = (0.03 * 255) ** 2;
  const den = (muX * muX + muY * muY + c1) * (vx + vy + c2);
  if (den === 0) return 1;
  return ((2 * muX * muY + c1) * (2 * cov + c2)) / den;
}

export function meanAbsDelta(a: RgbImage, b: RgbImage): number {
  const n = a.width * a.height * 3;
  let s = 0;
  for (let i = 0; i < a.data.length; i += 4) {
    s += Math.abs(a.data[i]! - b.data[i]!);
    s += Math.abs(a.data[i + 1]! - b.data[i + 1]!);
    s += Math.abs(a.data[i + 2]! - b.data[i + 2]!);
  }
  return s / n;
}

export function maxAbsDelta(a: RgbImage, b: RgbImage): number {
  let max = 0;
  for (let i = 0; i < a.data.length; i += 4) {
    const dr = Math.abs(a.data[i]! - b.data[i]!);
    const dg = Math.abs(a.data[i + 1]! - b.data[i + 1]!);
    const db = Math.abs(a.data[i + 2]! - b.data[i + 2]!);
    if (dr > max) max = dr;
    if (dg > max) max = dg;
    if (db > max) max = db;
  }
  return max;
}

export function countModifiedPixels(a: RgbImage, b: RgbImage): { count: number; pct: number } {
  let count = 0;
  const total = a.width * a.height;
  for (let i = 0; i < a.data.length; i += 4) {
    if (
      a.data[i] !== b.data[i] ||
      a.data[i + 1] !== b.data[i + 1] ||
      a.data[i + 2] !== b.data[i + 2]
    ) {
      count++;
    }
  }
  return { count, pct: (100 * count) / Math.max(1, total) };
}

export function blueLsbFlips(a: RgbImage, b: RgbImage): { flips: number; pct: number } {
  const pix = a.width * a.height;
  let flips = 0;
  for (let i = 2; i < a.data.length; i += 4) {
    if ((a.data[i]! & 1) !== (b.data[i]! & 1)) flips += 1;
  }
  return { flips, pct: (100 * flips) / pix };
}

export function bitErrorRate(a: string, b: string): number {
  if (a === b) return 0;
  const enc = new TextEncoder();
  const aa = enc.encode(a);
  const bb = enc.encode(b);
  const n = Math.max(aa.length, bb.length) * 8;
  if (n === 0) return 1;
  let err = Math.abs(aa.length - bb.length) * 8;
  const m = Math.min(aa.length, bb.length);
  for (let i = 0; i < m; i++) {
    let x = aa[i]! ^ bb[i]!;
    while (x) {
      err += x & 1;
      x >>= 1;
    }
  }
  return Math.min(1, err / n);
}
