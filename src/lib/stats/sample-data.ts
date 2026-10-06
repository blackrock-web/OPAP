export type MetricType = "psnr" | "ssim" | "mse" | "ber" | "distortion" | "encodeMs" | "decodeMs";

export const METRIC_OPTIONS: { id: MetricType; name: string; unit: string; higherIsBetter: boolean; description: string }[] = [
  {
    id: "psnr",
    name: "Peak Signal-to-Noise Ratio (PSNR)",
    unit: "dB",
    higherIsBetter: true,
    description: "Imperceptibility metric: higher dB values signify lower visual artifact distortion.",
  },
  {
    id: "ssim",
    name: "Structural Similarity Index (SSIM)",
    unit: "[0..1]",
    higherIsBetter: true,
    description: "Perceptual metric measuring luminance, contrast, and structural preservation.",
  },
  {
    id: "mse",
    name: "Mean Squared Error (MSE)",
    unit: "raw",
    higherIsBetter: false,
    description: "Cumulative squared Euclidean error between original cover and stego pixel channels.",
  },
  {
    id: "distortion",
    name: "Mean Absolute Distortion (MAD)",
    unit: "intensity",
    higherIsBetter: false,
    description: "Average absolute channel change across all embedded stego pixels.",
  },
  {
    id: "ber",
    name: "Bit Error Rate (BER)",
    unit: "%",
    higherIsBetter: false,
    description: "Fraction of extracted payload bits that disagree with original secret bits.",
  },
  {
    id: "encodeMs",
    name: "Embedding Latency",
    unit: "ms",
    higherIsBetter: false,
    description: "Time taken to compute adaptive attention, Hamming codes, and modify image channels.",
  },
  {
    id: "decodeMs",
    name: "Extraction Latency",
    unit: "ms",
    higherIsBetter: false,
    description: "Time taken to read stego channels, syndrome-decode Hamming blocks, and decrypt secret.",
  },
];

