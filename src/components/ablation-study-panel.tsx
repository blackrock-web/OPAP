import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { modelById, encodeWithModel } from "@/lib/stego/models";
import { generateSampleImage } from "@/lib/stego/samples";
import { type RgbImage } from "@/lib/stego/pixels";
import {
  Play,
  Download,
  Copy,
  Check,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type AblationRow = {
  id: string;
  name: string;
  short: string;
  description: string;
  psnr: number;
  ssim: number;
  mse: number;
  capacityBits: number;
  payloadBits: number;
  modifiedPixels: number;
  modifiedPixelPct: number;
  averageAbsError: number;
  maxPixelError: number;
  extractionAccuracy: number;
  opapOptimizedCount: number;
  runtimeMs: number;
  authStatus: string;
};

export type BaselineEvalRow = {
  id: string;
  algorithm: string;
  type: string;
  bpp: number;
  psnr: number;
  ssim: number;
  mse: number;
  maxErr: number;
  modPct: number;
  recovery: boolean;
  crypto: string;
};

const ABLATION_MODEL_IDS = [
  "ablation_m1",
  "ablation_m2",
  "ablation_m3",
  "ablation_m4",
  "ares_hybrid_inn",
  "ablation_m5",
];

const BASELINE_EVAL_MODEL_IDS = [
  "paper_model_02",
  "paper_model_01",
  "paper_model_04",
  "ablation_m1",
  "ares_hybrid_inn",
  "ablation_m5",
];

export function AblationStudyPanel({ testImage }: { testImage?: RgbImage }) {
  const [rows, setRows] = useState<AblationRow[]>([]);
  const [baselineRows, setBaselineRows] = useState<BaselineEvalRow[]>([]);
  const [running, setRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const runLiveAblation = useCallback(async () => {
    setRunning(true);
    const img = testImage ?? generateSampleImage("portrait", 256, 256);
    const secret = "ARES-EMD-OPAP-INN Research Benchmark Payload 2026";
    const password = "ResearchGradePassword!";

    const updatedRows: AblationRow[] = [];

    for (const mid of ABLATION_MODEL_IDS) {
      const model = modelById(mid);
      const t0 = performance.now();
      const out = await encodeWithModel(model, img, secret, password);
      const runtime = performance.now() - t0;

      updatedRows.push({
        id: model.id,
        name: model.name,
        short: model.short,
        description: model.note,
        psnr: Number(out.metrics.psnr.toFixed(2)),
        ssim: Number(out.metrics.ssim.toFixed(4)),
        mse: Number(out.metrics.mse.toFixed(4)),
        capacityBits: out.availableCapacityBits,
        payloadBits: out.payloadBits,
        modifiedPixels: out.modifiedPixels,
        modifiedPixelPct: Number((out.metrics.modifiedPixelPct ?? 0).toFixed(2)),
        averageAbsError: Number((out.metrics.averageAbsError ?? 0).toFixed(4)),
        maxPixelError: out.maxPixelError,
        extractionAccuracy: out.metrics.recovery ? 100.0 : 0.0,
        opapOptimizedCount: out.metrics.opapOptimizedCount ?? 0,
        runtimeMs: Number(runtime.toFixed(1)),
        authStatus: out.metrics.authStatus ?? "NONE",
      });
    }

    const updatedBaselines: BaselineEvalRow[] = [];
    for (const mid of BASELINE_EVAL_MODEL_IDS) {
      const model = modelById(mid);
      const out = await encodeWithModel(model, img, secret, password);
      updatedBaselines.push({
        id: model.id,
        algorithm: model.name,
        type: model.usesInn
          ? "INN + Adaptive EMD-OPAP"
          : model.usesEmd
          ? "EMD + OPAP"
          : model.usesHamming
          ? "Hamming(7,3) Adaptive LSB"
          : model.usesPm1
          ? "Adaptive ±1 LSB"
          : "Keyed LSB Substitution",
        bpp: Number(out.metrics.bpp.toFixed(4)),
        psnr: Number(out.metrics.psnr.toFixed(2)),
        ssim: Number(out.metrics.ssim.toFixed(4)),
        mse: Number(out.metrics.mse.toFixed(4)),
        maxErr: out.maxPixelError,
        modPct: Number((out.metrics.modifiedPixelPct ?? 0).toFixed(2)),
        recovery: out.metrics.recovery,
        crypto: model.usesAesGcm ? "AES-256-GCM" : "Keyed MAC",
      });
    }

    setRows(updatedRows);
    setBaselineRows(updatedBaselines);
    setRunning(false);
  }, [testImage]);

  useEffect(() => {
    void runLiveAblation();
  }, [runLiveAblation]);

  // Strictly empirical best model determination: requires 100% recovery, highest measured PSNR (ties broken by lowest MSE)
  const validRows = rows.filter((r) => r.extractionAccuracy === 100.0);
  const bestRow =
    validRows.length > 0
      ? validRows.reduce((best, cur) => {
          if (cur.psnr !== best.psnr) return cur.psnr > best.psnr ? cur : best;
          return cur.mse < best.mse ? cur : best;
        }, validRows[0]!)
      : null;

  const validBaselineRows = baselineRows.filter((b) => b.recovery);
  const bestBaselineRow =
    validBaselineRows.length > 0
      ? validBaselineRows.reduce((best, cur) => {
          if (cur.psnr !== best.psnr) return cur.psnr > best.psnr ? cur : best;
          return cur.mse < best.mse ? cur : best;
        }, validBaselineRows[0]!)
      : null;

  function copyLatexTable() {
    let latex = `% ARES-EMD-OPAP Ablation Study Table\n`;
    latex += `\\begin{table}[htbp]\n`;
    latex += `\\centering\n`;
    latex += `\\caption{Ablation Study of Proposed ARES-EMD-OPAP Framework}\n`;
    latex += `\\begin{tabular}{lcccccc}\n`;
    latex += `\\hline\n`;
    latex += `\\textbf{Model} & \\textbf{PSNR (dB)} & \\textbf{SSIM} & \\textbf{MSE} & \\textbf{Mod Pix (\\%)} & \\textbf{Recovery} & \\textbf{Time (ms)} \\\\\n`;
    latex += `\\hline\n`;
    for (const r of rows) {
      latex += `${r.short} & ${r.psnr} & ${r.ssim} & ${r.mse} & ${r.modifiedPixelPct}\\% & ${r.extractionAccuracy}\\% & ${r.runtimeMs} \\\\\n`;
    }
    latex += `\\hline\n`;
    latex += `\\end{tabular}\n`;
    latex += `\\end{table}\n`;

    navigator.clipboard.writeText(latex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function downloadCsv() {
    let csv = "Model,Short,Description,PSNR_dB,SSIM,MSE,Capacity_Bits,Payload_Bits,Modified_Pixels,Mod_Pct,Avg_Abs_Error,Max_Pixel_Error,Accuracy_Pct,OPAP_Optimized,Runtime_ms,Auth_Status\n";
    for (const r of rows) {
      csv += `"${r.name}","${r.short}","${r.description}",${r.psnr},${r.ssim},${r.mse},${r.capacityBits},${r.payloadBits},${r.modifiedPixels},${r.modifiedPixelPct},${r.averageAbsError},${r.maxPixelError},${r.extractionAccuracy},${r.opapOptimizedCount},${r.runtimeMs},"${r.authStatus}"\n`;
    }
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ares_emd_opap_ablation_results.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <div className="space-y-6 w-full">
      {/* Ablation Header */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/70 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary font-mono">
                Section 16 Specification
              </span>
              <h3 className="font-display text-base font-bold text-ink">
                INN &amp; Hybrid CNN Ablation Study + Baseline Comparison
              </h3>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Evaluates the progressive contribution of EMD, OPAP, CNN features, attention maps, INN reversible wavelet coupling, Hybrid INN-CNN, and ARES-EMD-OPAP-INN.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={copyLatexTable}
              className="gap-1.5 h-8 px-2.5 text-xs font-medium"
              title="Copy LaTeX table for research publication"
            >
              {copied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
              <span>{copied ? "Copied LaTeX" : "Copy LaTeX"}</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={downloadCsv}
              className="gap-1.5 h-8 px-2.5 text-xs font-medium"
              title="Download CSV results"
            >
              <Download className="size-3.5" />
              <span>Export CSV</span>
            </Button>
            <Button
              size="sm"
              onClick={runLiveAblation}
              disabled={running}
              className="gap-1.5 h-8 px-3 text-xs font-semibold bg-primary text-primary-foreground shadow-xs"
            >
              <Play className="size-3.5" />
              <span>{running ? "Running Live Ablation..." : "Run Live Ablation"}</span>
            </Button>
          </div>
        </div>

        {/* Dynamic Best Model Over Ablation Banner */}
        {bestRow && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-xs">
            <div className="flex items-center gap-2">
              <TrendingUp className="size-4 text-emerald-600 shrink-0" />
              <span className="font-bold text-emerald-900 dark:text-emerald-300">
                Best Model Result (100% Recovery, Zero False Positives):
              </span>
              <span className="font-display font-bold text-foreground">
                {bestRow.name}
              </span>
            </div>
            <div className="flex items-center gap-3 font-mono text-[11px]">
              <span className="font-bold text-emerald-700 dark:text-emerald-400">
                PSNR: {bestRow.psnr.toFixed(2)} dB
              </span>
              <span>SSIM: {bestRow.ssim.toFixed(4)}</span>
              <span>MSE: {bestRow.mse.toFixed(4)}</span>
            </div>
          </div>
        )}

        {/* Ablation Study Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/40 font-mono text-[11px] text-muted-foreground">
              <tr>
                <th className="px-3 py-2.5">Ablation / Hybrid Model</th>
                <th className="px-3 py-2.5">Distortion Guidance</th>
                <th className="px-3 py-2.5">PSNR (dB)</th>
                <th className="px-3 py-2.5">SSIM</th>
                <th className="px-3 py-2.5">MSE</th>
                <th className="px-3 py-2.5">Mod. Pixels</th>
                <th className="px-3 py-2.5">Max Err</th>
                <th className="px-3 py-2.5">Recovery</th>
                <th className="px-3 py-2.5">Runtime</th>
                <th className="px-3 py-2.5">Security</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 font-sans">
              {rows.map((r, idx) => {
                const isBest = bestRow?.id === r.id;
                const isHybrid = r.id === "ares_hybrid_inn";
                return (
                  <tr
                    key={r.id}
                    className={cn(
                      "hover:bg-muted/20 transition-colors",
                      isBest ? "bg-emerald-500/10 font-semibold" : "",
                    )}
                  >
                    <td className="px-3 py-3">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {isBest && <Trophy className="size-3.5 text-amber-500 shrink-0" />}
                        <span className="font-bold text-foreground">{r.name}</span>
                        {isBest && (
                          <span className="rounded bg-emerald-600 text-white px-1.5 py-0.2 text-[9px] font-bold">
                            BEST MODEL
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-muted-foreground line-clamp-1">{r.description}</p>
                    </td>
                    <td className="px-3 py-3 font-mono text-[11px] text-muted-foreground">
                      {idx === 0
                        ? "None (Unguided)"
                        : idx === 1
                        ? "CNN + Texture"
                        : idx === 2
                        ? "CNN + Attention"
                        : isHybrid
                        ? "Hybrid INN-CNN Coupling"
                        : "CNN + Attention + INN Wavelet"}
                    </td>
                    <td className="px-3 py-3 font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                      {r.psnr.toFixed(2)} dB
                    </td>
                    <td className="px-3 py-3 font-mono text-foreground">{r.ssim.toFixed(4)}</td>
                    <td className="px-3 py-3 font-mono text-muted-foreground">{r.mse.toFixed(4)}</td>
                    <td className="px-3 py-3 font-mono text-muted-foreground">
                      {r.modifiedPixels} ({r.modifiedPixelPct}%)
                    </td>
                    <td className="px-3 py-3 font-mono text-foreground">&plusmn;{r.maxPixelError}</td>
                    <td className="px-3 py-3 font-mono text-emerald-600 font-bold">
                      {r.extractionAccuracy.toFixed(1)}%
                    </td>
                    <td className="px-3 py-3 font-mono text-muted-foreground">{r.runtimeMs}ms</td>
                    <td className="px-3 py-3">
                      <span
                        className={cn(
                          "rounded px-2 py-0.5 text-[10px] font-mono font-bold",
                          r.authStatus === "AUTHENTICATED"
                            ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        {r.authStatus}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Baseline Comparison Table (Section 17) */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary font-mono">
                Section 17 Specification
              </span>
              <h3 className="font-display text-base font-bold text-ink">
                Live Baseline Methodology Comparison
              </h3>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Direct live experimental comparison computed on the active cover image across classical LSB, adaptive LSB, Hamming(7,3), unguided EMD+OPAP, Hybrid INN-CNN, and ARES-EMD-OPAP-INN.
            </p>
          </div>
          {bestBaselineRow && (
            <div className="flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs">
              <Trophy className="size-4 text-amber-500 shrink-0" />
              <span className="font-semibold text-foreground">
                Best Baseline Method: {bestBaselineRow.algorithm} ({bestBaselineRow.psnr.toFixed(2)} dB)
              </span>
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/40 font-mono text-[11px] text-muted-foreground">
              <tr>
                <th className="px-3 py-2.5">Method</th>
                <th className="px-3 py-2.5">Type</th>
                <th className="px-3 py-2.5">Payload Rate (bpp)</th>
                <th className="px-3 py-2.5">PSNR (dB)</th>
                <th className="px-3 py-2.5">SSIM</th>
                <th className="px-3 py-2.5">MSE</th>
                <th className="px-3 py-2.5">Mod. Pixels</th>
                <th className="px-3 py-2.5">Max Error</th>
                <th className="px-3 py-2.5">Security</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 font-sans">
              {baselineRows.map((b) => {
                const isBestBaseline = bestBaselineRow?.id === b.id;
                return (
                  <tr
                    key={b.id}
                    className={cn(
                      "hover:bg-muted/20 transition-colors",
                      isBestBaseline ? "bg-emerald-500/10 font-semibold" : "",
                    )}
                  >
                    <td className="px-3 py-3 font-semibold text-foreground flex items-center gap-1.5">
                      {isBestBaseline && <Trophy className="size-3.5 text-amber-500 shrink-0" />}
                      <span>{b.algorithm}</span>
                      {isBestBaseline && (
                        <span className="rounded bg-emerald-600 text-white px-1.5 py-0.2 text-[9px] font-bold">
                          BEST MODEL
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-3 text-muted-foreground">{b.type}</td>
                    <td className="px-3 py-3 font-mono">{b.bpp.toFixed(4)} bpp</td>
                    <td className="px-3 py-3 font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                      {b.psnr.toFixed(2)} dB
                    </td>
                    <td className="px-3 py-3 font-mono">{b.ssim.toFixed(4)}</td>
                    <td className="px-3 py-3 font-mono text-muted-foreground">{b.mse.toFixed(4)}</td>
                    <td className="px-3 py-3 font-mono">{b.modPct.toFixed(2)}%</td>
                    <td className="px-3 py-3 font-mono">&plusmn;{b.maxErr}</td>
                    <td className="px-3 py-3 font-mono text-xs">
                      <span
                        className={cn(
                          "rounded px-2 py-0.5 text-[10px] font-bold",
                          b.crypto === "AES-256-GCM"
                            ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        {b.crypto}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
