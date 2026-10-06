import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { useSession, type BatchRunRecord } from "@/lib/session";
import { MODELS } from "@/lib/stego/models";
import {
  History,
  Trash2,
  Download,
  Play,
  Trophy,
  ArrowUpRight,
  Clock,
  Layers,
  FileSpreadsheet,
} from "lucide-react";

export const Route = createFileRoute("/history")({
  component: HistoryPage,
});

function HistoryPage() {
  const { history, removeBatchRun, clearHistory, setBench } = useSession();
  const [hasMounted, setHasMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const loadRunIntoLab = (record: BatchRunRecord) => {
    setBench(record.rows);
    navigate({ to: "/batch-lab" });
  };

  const downloadRunJson = (record: BatchRunRecord) => {
    const blob = new Blob([JSON.stringify(record, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ares_batch_run_${record.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadRunCsv = (record: BatchRunRecord) => {
    const headers = [
      "Image Name",
      "Model ID",
      "Model Name",
      "PSNR (dB)",
      "SSIM",
      "MSE",
      "BER (%)",
      "Capacity (bpp)",
      "Distortion (MAD)",
      "Encode Time (ms)",
      "Decode Time (ms)",
      "Recovery Success",
    ];
    const lines = [headers.join(",")];
    for (const row of record.rows) {
      const mDef = MODELS.find((m) => m.id === row.modelId);
      lines.push(
        [
          `"${row.imageName}"`,
          `"${row.modelId}"`,
          `"${mDef?.name ?? row.modelId}"`,
          row.metrics.psnr.toFixed(2),
          row.metrics.ssim.toFixed(4),
          row.metrics.mse.toFixed(2),
          row.metrics.ber.toFixed(4),
          row.metrics.bpp.toFixed(4),
          row.metrics.distortion.toFixed(2),
          row.metrics.encodeMs,
          row.metrics.decodeMs,
          row.metrics.recovery ? "PASS" : "FAIL",
        ].join(","),
      );
    }
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ares_batch_run_${record.id}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AppShell>
      <PageHeader
        kicker="Audit & Archive"
        title="Benchmark History"
        description="Records of historical multi-image benchmark runs, empirical metrics, and statistical significance results. Restore past sessions directly into the Batch Lab for re-inspection."
        actions={
          hasMounted && history.length > 0 ? (
            <Button
              variant="outline"
              size="sm"
              onClick={clearHistory}
              className="gap-1.5 text-xs text-muted-foreground hover:text-red-500"
            >
              <Trash2 className="size-3.5" />
              <span>Clear History ({history.length})</span>
            </Button>
          ) : null
        }
      />

      <div className="w-full">
        {!hasMounted || history.length === 0 ? (
          <div className="flex min-h-[360px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card p-12 text-center w-full">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
              <History className="size-6" />
            </div>
            <h3 className="font-display text-base font-semibold text-ink">
              No Past Benchmark Records
            </h3>
            <p className="mt-1 text-xs text-muted-foreground max-w-md">
              Executed multi-image batch runs will automatically be recorded here with complete
              per-image tables and statistical summaries.
            </p>
            <Button
              onClick={() => navigate({ to: "/batch-lab" })}
              className="mt-5 gap-2 bg-primary text-primary-foreground font-medium text-xs shadow-sm"
            >
              <Play className="size-3.5 fill-current" />
              <span>Launch Batch Lab</span>
            </Button>
          </div>
        ) : (
          <div className="space-y-4 w-full">
            {history.map((record) => {
              const bestModel = MODELS.find((m) => m.id === record.bestModelId);
              return (
                <div
                  key={record.id}
                  className="flex flex-col justify-between gap-4 rounded-xl border border-border bg-card p-5 shadow-xs transition-all hover:border-primary/40 md:flex-row md:items-center w-full"
                >
                <div className="flex items-start gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Layers className="size-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-base font-semibold text-ink">
                        {record.name}
                      </h3>
                      <span className="flex items-center gap-1 text-[11px] font-mono text-muted-foreground">
                        <Clock className="size-3" />
                        {record.dateStr}
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
                      <span className="rounded bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                        {record.imageCount} Images · {record.modelCount} Models · {record.rows.length} Total Runs
                      </span>

                      {bestModel && (
                        <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold font-mono text-[11px]">
                          <Trophy className="size-3.5 text-amber-500" />
                          Top Model: {bestModel.name}
                        </span>
                      )}

                      <span className="font-mono text-[11px] text-muted-foreground">
                        Mean PSNR: <strong className="text-foreground">{record.avgPsnr} dB</strong>
                      </span>
                      <span className="font-mono text-[11px] text-muted-foreground">
                        Mean SSIM: <strong className="text-foreground">{record.avgSsim}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 items-center gap-2 pt-2 md:pt-0">
                  <Button
                    size="sm"
                    onClick={() => loadRunIntoLab(record)}
                    className="gap-1.5 text-xs bg-primary text-primary-foreground font-medium"
                  >
                    <span>Load in Batch Lab</span>
                    <ArrowUpRight className="size-3.5" />
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => downloadRunCsv(record)}
                    className="gap-1.5 text-xs"
                    title="Export CSV"
                  >
                    <FileSpreadsheet className="size-3.5 text-emerald-600" />
                    <span>CSV</span>
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => downloadRunJson(record)}
                    className="gap-1.5 text-xs"
                    title="Export JSON"
                  >
                    <Download className="size-3.5 text-blue-500" />
                    <span>JSON</span>
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeBatchRun(record.id)}
                    className="text-muted-foreground hover:text-red-500 p-2"
                    title="Delete record"
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      </div>
    </AppShell>
  );
}
