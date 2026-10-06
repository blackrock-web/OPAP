import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "@/lib/session";
import { METRIC_OPTIONS, type MetricType } from "@/lib/stats/sample-data";
import {
  Check,
  RotateCcw,
  Trash2,
  Sliders,
  Shield,
  FileCode,
  HardDrive,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { settings, updateSettings, resetSettings, clearHistory, history } = useSession();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const [savedNotice, setSavedNotice] = useState(false);

  const [payload, setPayload] = useState(settings.defaultPayload);
  const [passphrase, setPassphrase] = useState(settings.defaultPassphrase);
  const [resolutionCap, setResolutionCap] = useState(settings.resolutionCap);
  const [alpha, setAlpha] = useState<0.05 | 0.01>(settings.defaultAlpha);
  const [metric, setMetric] = useState<MetricType>(settings.defaultMetric);
  const [latexCaption, setLatexCaption] = useState(settings.latexCaption);
  const [latexLabel, setLatexLabel] = useState(settings.latexLabel);

  useEffect(() => {
    setPayload(settings.defaultPayload);
    setPassphrase(settings.defaultPassphrase);
    setResolutionCap(settings.resolutionCap);
    setAlpha(settings.defaultAlpha);
    setMetric(settings.defaultMetric);
    setLatexCaption(settings.latexCaption);
    setLatexLabel(settings.latexLabel);
  }, [settings]);

  const saveAll = () => {
    updateSettings({
      defaultPayload: payload,
      defaultPassphrase: passphrase,
      resolutionCap,
      defaultAlpha: alpha,
      defaultMetric: metric,
      latexCaption,
      latexLabel,
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleReset = () => {
    resetSettings();
    setPayload("ARES research secret payload - verified cryptographic integrity");
    setPassphrase("lab-passphrase-2025");
    setResolutionCap(384);
    setAlpha(0.05);
    setMetric("psnr");
    setLatexCaption("Comparative performance metrics across steganography models");
    setLatexLabel("tab:stego_comparison");
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <AppShell>
      <PageHeader
        kicker="Configuration"
        title="Settings & Defaults"
        description="Configure research parameters, statistical significance confidence intervals, default cryptographic keys, and academic export formatting."
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="gap-1.5 text-xs text-muted-foreground"
            >
              <RotateCcw className="size-3.5" />
              <span>Reset Defaults</span>
            </Button>
            <Button
              size="sm"
              onClick={saveAll}
              className="gap-1.5 text-xs bg-primary text-primary-foreground font-semibold"
            >
              {savedNotice ? <Check className="size-3.5" /> : <Sliders className="size-3.5" />}
              <span>{savedNotice ? "Saved!" : "Save Changes"}</span>
            </Button>
          </div>
        }
      />

      <div className="space-y-6 w-full">
        {/* 1. Benchmark Execution Defaults */}
        <section className="rounded-xl border border-border bg-card p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="size-4 text-primary" />
            <h3 className="font-display text-base font-semibold text-ink">
              Benchmark Defaults
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="default-payload" className="text-xs font-semibold text-muted-foreground">
                Default Secret Payload
              </Label>
              <Textarea
                id="default-payload"
                value={payload}
                onChange={(e) => setPayload(e.target.value)}
                rows={3}
                className="mt-1.5 text-xs font-mono"
              />
              <p className="mt-1 text-[11px] text-muted-foreground">
                This exact text payload is populated when opening new Batch Lab benchmark runs.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="default-pw" className="text-xs font-semibold text-muted-foreground">
                  Default Passphrase / Key
                </Label>
                <Input
                  id="default-pw"
                  type="password"
                  value={passphrase}
                  onChange={(e) => setPassphrase(e.target.value)}
                  className="mt-1.5 text-xs font-mono"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold text-muted-foreground">
                  Default Image Resolution Cap
                </Label>
                <div className="mt-1.5 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setResolutionCap(384)}
                    className={cn(
                      "rounded-md border p-2 text-center text-xs font-medium transition-all",
                      resolutionCap === 384
                        ? "border-primary bg-primary/10 text-primary font-semibold"
                        : "border-border bg-card text-muted-foreground hover:bg-muted",
                    )}
                  >
                    384 px (Standard)
                  </button>
                  <button
                    type="button"
                    onClick={() => setResolutionCap(512)}
                    className={cn(
                      "rounded-md border p-2 text-center text-xs font-medium transition-all",
                      resolutionCap === 512
                        ? "border-primary bg-primary/10 text-primary font-semibold"
                        : "border-border bg-card text-muted-foreground hover:bg-muted",
                    )}
                  >
                    512 px (Full Detail)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Statistical Analysis Defaults */}
        <section className="rounded-xl border border-border bg-card p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <Sliders className="size-4 text-primary" />
            <h3 className="font-display text-base font-semibold text-ink">
              Statistical Significance Parameters
            </h3>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label className="text-xs font-semibold text-muted-foreground">
                Default Confidence Level (α)
              </Label>
              <div className="mt-1.5 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setAlpha(0.05)}
                  className={cn(
                    "rounded-md border p-2 text-center text-xs font-medium transition-all",
                    alpha === 0.05
                      ? "border-primary bg-primary/10 text-primary font-semibold"
                      : "border-border bg-card text-muted-foreground hover:bg-muted",
                  )}
                >
                  α = 0.05 (95% Confidence)
                </button>
                <button
                  type="button"
                  onClick={() => setAlpha(0.01)}
                  className={cn(
                    "rounded-md border p-2 text-center text-xs font-medium transition-all",
                    alpha === 0.01
                      ? "border-primary bg-primary/10 text-primary font-semibold"
                      : "border-border bg-card text-muted-foreground hover:bg-muted",
                  )}
                >
                  α = 0.01 (99% Confidence)
                </button>
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Sets the significance threshold for Friedman and Nemenyi post-hoc Critical Difference tests.
              </p>
            </div>

            <div>
              <Label className="text-xs font-semibold text-muted-foreground">
                Primary Ranking Metric
              </Label>
              <select
                value={metric}
                onChange={(e) => setMetric(e.target.value as MetricType)}
                className="mt-1.5 flex h-9 w-full rounded-md border border-border bg-card px-3 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {METRIC_OPTIONS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.unit})
                  </option>
                ))}
              </select>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Determines the default metric sorted and evaluated in the post-hoc CD diagram.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Academic LaTeX & Publication Format */}
        <section className="rounded-xl border border-border bg-card p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <FileCode className="size-4 text-primary" />
            <h3 className="font-display text-base font-semibold text-ink">
              LaTeX Export Formatting
            </h3>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="latex-cap" className="text-xs font-semibold text-muted-foreground">
                Table Caption
              </Label>
              <Input
                id="latex-cap"
                value={latexCaption}
                onChange={(e) => setLatexCaption(e.target.value)}
                className="mt-1.5 text-xs"
              />
            </div>

            <div>
              <Label htmlFor="latex-lbl" className="text-xs font-semibold text-muted-foreground">
                Table Label
              </Label>
              <Input
                id="latex-lbl"
                value={latexLabel}
                onChange={(e) => setLatexLabel(e.target.value)}
                className="mt-1.5 text-xs font-mono"
              />
            </div>
          </div>
        </section>

        {/* 4. Local Storage & Cache Management */}
        <section className="rounded-xl border border-border bg-card p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <HardDrive className="size-4 text-muted-foreground" />
            <h3 className="font-display text-base font-semibold text-ink">
              Storage & Cache
            </h3>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
            <div>
              <p className="font-medium text-foreground">
                Historical Benchmark Sessions: {hasMounted ? `${history.length} runs stored locally` : "0 runs stored locally"}
              </p>
              <p className="text-[11px] text-muted-foreground">
                Saved in browser localStorage for offline durability.
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={clearHistory}
              disabled={!hasMounted || history.length === 0}
              className="gap-1.5 text-xs text-muted-foreground hover:text-red-500"
            >
              <Trash2 className="size-3.5" />
              <span>Clear Stored History</span>
            </Button>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
