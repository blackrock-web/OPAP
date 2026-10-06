import { create } from "zustand";
import type { QualityMetrics } from "@/lib/stego/metrics";
import type { ModelDef } from "@/lib/stego/models";
import type { RgbImage } from "@/lib/stego/pixels";
import type { MetricType } from "@/lib/stats/sample-data";

export type BenchRow = {
  imageName: string;
  modelId: string;
  metrics: QualityMetrics;
  recovered: string;
  error?: string;
  stegoUrl?: string;
  diffUrl?: string;
  durationMs?: number;
};

export type BatchRunRecord = {
  id: string;
  timestamp: number;
  dateStr: string;
  name: string;
  imageCount: number;
  modelCount: number;
  payload: string;
  passphrase: string;
  modelIds: string[];
  imageNames: string[];
  rows: BenchRow[];
  bestModelId: string;
  avgPsnr: number;
  avgSsim: number;
};

export type BatchSettings = {
  defaultPayload: string;
  defaultPassphrase: string;
  resolutionCap: number;
  defaultAlpha: 0.05 | 0.01;
  defaultMetric: MetricType;
  latexCaption: string;
  latexLabel: string;
};

const DEFAULT_SETTINGS: BatchSettings = {
  defaultPayload: "ARES research secret payload - verified cryptographic integrity",
  defaultPassphrase: "lab-passphrase-2025",
  resolutionCap: 384,
  defaultAlpha: 0.05,
  defaultMetric: "psnr",
  latexCaption: "Comparative performance metrics across steganography models",
  latexLabel: "tab:stego_comparison",
};

const STORAGE_KEY_HISTORY = "ares_batch_runs_history";
const STORAGE_KEY_SETTINGS = "ares_batch_lab_settings";

function loadSavedHistory(): BatchRunRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_HISTORY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function loadSavedSettings(): BatchSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SETTINGS);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export type SessionState = {
  lastCover?: RgbImage;
  lastStego?: RgbImage;
  lastStegoUrl?: string;
  lastCoverUrl?: string;
  lastSecret?: string;
  lastPassword?: string;
  lastMetrics?: QualityMetrics;
  lastModel?: ModelDef;
  bench: BenchRow[];
  benchSecret: string;
  benchPassword: string;
  history: BatchRunRecord[];
  settings: BatchSettings;
  isHydrated: boolean;
  initFromStorage: () => void;
  setEncode: (p: {
    cover: RgbImage;
    stego: RgbImage;
    coverUrl: string;
    stegoUrl: string;
    secret: string;
    password: string;
    metrics: QualityMetrics;
    model: ModelDef;
  }) => void;
  setBench: (rows: BenchRow[]) => void;
  setBenchCreds: (secret: string, password: string) => void;
  addBatchRun: (record: BatchRunRecord) => void;
  removeBatchRun: (id: string) => void;
  clearHistory: () => void;
  updateSettings: (s: Partial<BatchSettings>) => void;
  resetSettings: () => void;
};

export const useSession = create<SessionState>((set) => ({
  bench: [],
  benchSecret: "ARES research secret payload - verified cryptographic integrity",
  benchPassword: "lab-passphrase-2025",
  history: [],
  settings: DEFAULT_SETTINGS,
  isHydrated: false,
  initFromStorage: () => {
    if (typeof window === "undefined") return;
    set({
      history: loadSavedHistory(),
      settings: loadSavedSettings(),
      isHydrated: true,
    });
  },
  setEncode: (p) =>
    set({
      lastCover: p.cover,
      lastStego: p.stego,
      lastCoverUrl: p.coverUrl,
      lastStegoUrl: p.stegoUrl,
      lastSecret: p.secret,
      lastPassword: p.password,
      lastMetrics: p.metrics,
      lastModel: p.model,
    }),
  setBench: (rows) => set({ bench: rows }),
  setBenchCreds: (secret, password) => set({ benchSecret: secret, benchPassword: password }),
  addBatchRun: (record) =>
    set((state) => {
      const next = [record, ...state.history.filter((r) => r.id !== record.id)];
      try {
        localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(next));
      } catch {
        // quota exceeded fallback
      }
      return { history: next };
    }),
  removeBatchRun: (id) =>
    set((state) => {
      const next = state.history.filter((r) => r.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(next));
      } catch (e) {
        void e;
      }
      return { history: next };
    }),
  clearHistory: () => {
    try {
      localStorage.removeItem(STORAGE_KEY_HISTORY);
    } catch (e) {
      void e;
    }
    set({ history: [] });
  },
  updateSettings: (partial) =>
    set((state) => {
      const next = { ...state.settings, ...partial };
      try {
        localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(next));
      } catch (e) {
        void e;
      }
      return { settings: next };
    }),
  resetSettings: () => {
    try {
      localStorage.removeItem(STORAGE_KEY_SETTINGS);
    } catch (e) {
      void e;
    }
    set({ settings: DEFAULT_SETTINGS });
  },
}));
