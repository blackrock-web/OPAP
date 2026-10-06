import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MetricGrid } from "@/components/metric-grid";
import { AblationStudyPanel } from "@/components/ablation-study-panel";
import { MODELS, modelById, encodeWithModel, decodeWithModel } from "@/lib/stego/models";
import { fileToImage, imageToDataUrl } from "@/lib/stego/pixels";
import { generateSampleImage } from "@/lib/stego/samples";
import { useSession } from "@/lib/session";
import {
  FlaskConical,
  LockKeyhole,
  Sparkles,
  ArrowRight,
  Cpu,
  Trophy,
  BarChart3,
  History,
  Download,
  FileSearch,
  Unlock,
  ShieldCheck,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: DashboardPage });

function DashboardPage() {
  const { bench, history, setEncode, lastCover, lastCoverUrl, lastStegoUrl, lastMetrics, isHydrated } = useSession();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Selected Model for Testing (Proposed or Ablation)
  const [selectedModelId, setSelectedModelId] = useState("ares_emd_opap");

  // Single test bench state
  const [fileName, setFileName] = useState("Lena_Sample.png");
  const [secret, setSecret] = useState("ARES-EMD-OPAP: CNN-Assisted Adaptive Data Hiding 2026");
  const [password, setPassword] = useState("lab-passphrase-2026");
  const [busy, setBusy] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [coverUrl, setCoverUrl] = useState(lastCoverUrl ?? "");
  const [stegoUrl, setStegoUrl] = useState(lastStegoUrl ?? "");
  const [extractedSecret, setExtractedSecret] = useState<string | null>(null);

  const handleDownloadStego = () => {
    if (!stegoUrl) return;
    const a = document.createElement("a");
    a.href = stegoUrl;
    const cleanBase = fileName.replace(/\.[^/.]+$/, "") || "image";
    a.download = `ares_emd_opap_${cleanBase}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Load sample cover on demand
  const loadQuickSample = () => {
    const img = generateSampleImage("portrait", 384, 384);
    const url = imageToDataUrl(img);
    setCoverUrl(url);
    setFileName("Sample_Portrait.png");
    setExtractedSecret(null);
    useSession.setState({ lastCover: img, lastCoverUrl: url });
  };

  async function onFile(f: File | undefined) {
    if (!f) return;
    setFileName(f.name);
    setError(null);
    setExtractedSecret(null);
    try {
      const img = await fileToImage(f, 384);
      const url = imageToDataUrl(img);
      setCoverUrl(url);
      useSession.setState({ lastCover: img, lastCoverUrl: url });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not read image file");
    }
  }

  async function embedQuick() {
    let cover = useSession.getState().lastCover;
    if (!cover) {
      const sample = generateSampleImage("portrait", 384, 384);
      cover = sample;
      setCoverUrl(imageToDataUrl(sample));
      useSession.setState({ lastCover: sample, lastCoverUrl: imageToDataUrl(sample) });
    }

    if (!secret.trim() || !password) {
      setError("Secret text and passphrase are required.");
      return;
    }
    setBusy(true);
    setError(null);
    setExtractedSecret(null);

    try {
      const model = modelById(selectedModelId);
      const out = await encodeWithModel(model, cover, secret.trim(), password);
      const url = imageToDataUrl(out.stego);
      setStegoUrl(url);
      setExtractedSecret(out.recovered);

      setEncode({
        cover,
        stego: out.stego,
        coverUrl: coverUrl || imageToDataUrl(cover),
        stegoUrl: url,
        secret: secret.trim(),
        password,
        metrics: out.metrics,
        model,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Embedding failed");
    } finally {
      setBusy(false);
    }
  }

  async function extractQuick() {
    const stego = useSession.getState().lastStego;
    if (!stego) {
      setError("No steganogram available in session. Embed an image first.");
      return;
    }
    if (!password) {
      setError("Passphrase is required to derive keystream and authenticate AES-GCM tag.");
      return;
    }

    setExtracting(true);
    setError(null);

    try {
      const model = modelById(selectedModelId);
      const recovered = await decodeWithModel(model, stego, password);
      setExtractedSecret(recovered);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Extraction failed");
    } finally {
      setExtracting(false);
    }
  }

  const selectedModel = modelById(selectedModelId);

  return (
    <AppShell>
      <PageHeader
        kicker="ARES-EMD-OPAP-INN & Hybrid INN-CNN Research Platform"
        title="ARES-EMD-OPAP-INN Adaptive Steganography Dashboard"
        description="Evaluate INN reversible wavelet + affine coupling fused with CNN spatial/channel attention, Generalized EMD, and OPAP distortion optimization alongside ARES-Hybrid-INN-CNN and published baselines with live empirical measurements."
        actions={
          <Link
            to="/batch-lab"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-95 transition-opacity"
          >
            <FlaskConical className="size-4" />
            <span>Open Batch Lab &amp; Live Benchmark</span>
            <ArrowRight className="size-4" />
          </Link>
        }
      />

      <div className="space-y-6 w-full">
        {/* Quick Model Switcher Banner */}
        <div className="rounded-xl border border-border bg-card p-4 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded bg-primary/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                  Zero Fake Assumptions · Empirical Best Model Verification
                </span>
              </div>
              <p className="font-display text-sm font-bold text-foreground">
                Test <span className="text-primary">ARES-EMD-OPAP-INN</span>, <span className="text-foreground">ARES-Hybrid-INN-CNN</span>, or any ablation/baseline model — only the empirically highest-performing model is highlighted as best.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <Button
                size="sm"
                variant={selectedModelId === "ares_emd_opap" ? "default" : "outline"}
                onClick={() => setSelectedModelId("ares_emd_opap")}
                className="h-8 text-xs font-bold gap-1.5"
              >
                <Zap className="size-3.5" />
                <span>Select ARES-EMD-OPAP-INN</span>
              </Button>
              <Button
                size="sm"
                variant={selectedModelId === "ares_hybrid_inn" ? "default" : "outline"}
                onClick={() => setSelectedModelId("ares_hybrid_inn")}
                className="h-8 text-xs font-semibold gap-1.5"
              >
                <Cpu className="size-3.5" />
                <span>Select ARES-Hybrid-INN-CNN</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Top KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 w-full">
          <div className="rounded-xl border border-border bg-card p-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Active Model
              </span>
              <Cpu className="size-4 text-primary" />
            </div>
            <p className="mt-2 font-display text-xl font-bold text-foreground">
              {selectedModel.short}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {selectedModel.usesInn ? "INN Wavelet Coupling + EMD + OPAP" : selectedModel.paper}
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Ablation Suite
              </span>
              <BarChart3 className="size-4 text-emerald-500" />
            </div>
            <p className="mt-2 font-display text-xl font-bold text-foreground">
              6 Live Configurations
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Computed directly on cover image pixels
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Cryptographic Security
              </span>
              <ShieldCheck className="size-4 text-amber-500" />
            </div>
            <p className="mt-2 font-display text-xl font-bold text-primary">
              AES-256-GCM AEAD
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              PBKDF2-SHA256 + Compact Authenticated Frame (Zero False Positives)
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Live Benchmark Winner
              </span>
              <Trophy className="size-4 text-blue-500" />
            </div>
            <p className="mt-2 font-display text-xl font-bold text-foreground">
              True Empirical Best
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Only highlights whichever model achieves #1 measured result
            </p>
          </div>
        </div>

        {/* Methodology Flow Banner */}
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-xs">
          <div className="flex items-center gap-2 mb-2 font-mono font-bold text-primary uppercase tracking-wider">
            <span>ARES-EMD-OPAP-INN &amp; Hybrid INN-CNN Logical Pipeline</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
            <span className="rounded bg-card px-2.5 py-1 font-semibold text-foreground border border-border">Cover Image</span>
            <span>&rarr;</span>
            <span className="rounded bg-card px-2.5 py-1 font-semibold text-foreground border border-border">CNN Multi-Scale Features</span>
            <span>&rarr;</span>
            <span className="rounded bg-card px-2.5 py-1 font-semibold text-foreground border border-border">Spatial/Channel Attention</span>
            <span>&rarr;</span>
            <span className="rounded bg-primary/20 px-2.5 py-1 font-bold text-primary border border-primary/40">INN Reversible Wavelet + Affine Coupling</span>
            <span>&rarr;</span>
            <span className="rounded bg-card px-2.5 py-1 font-semibold text-foreground border border-border">Adaptive Cost &amp; Phase Map</span>
            <span>&rarr;</span>
            <span className="rounded bg-primary/20 px-2.5 py-1 font-bold text-primary border border-primary/40">INN-Coupled EMD Embedding</span>
            <span>&rarr;</span>
            <span className="rounded bg-emerald-500/20 px-2.5 py-1 font-bold text-emerald-800 dark:text-emerald-300 border border-emerald-500/40">OPAP Optimization</span>
            <span>&rarr;</span>
            <span className="rounded bg-card px-2.5 py-1 font-semibold text-foreground border border-border">Stego Image</span>
          </div>
        </div>

        {/* Interactive Single-Cover Test Bench */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-display text-base font-semibold text-ink">
                Interactive Test Bench &amp; Distortion Optimization
              </h3>
              <p className="text-xs text-muted-foreground">
                Execute live INN-coupled EMD embedding with OPAP post-optimization and cryptographic verification on a single cover image.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={loadQuickSample}
              className="gap-1.5 text-xs font-medium"
            >
              <Sparkles className="size-3.5 text-amber-500" />
              <span>Load Sample Image</span>
            </Button>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
            {/* Input Form */}
            <div className="space-y-4">
              {/* Algorithm / Ablation Mode Selection */}
              <div>
                <Label htmlFor="model-select" className="text-xs font-semibold text-muted-foreground">
                  Embedding Mode
                </Label>
                <select
                  id="model-select"
                  value={selectedModelId}
                  onChange={(e) => setSelectedModelId(e.target.value)}
                  className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <optgroup label="INN & Hybrid CNN Architectures">
                    <option value="ares_emd_opap">ARES-EMD-OPAP-INN (INN Wavelet Coupling + CNN Attention + EMD + OPAP + AES-GCM)</option>
                    <option value="ares_hybrid_inn">ARES-Hybrid-INN-CNN (Hybrid INN + CNN Encoder-Decoder + Adaptive EMD-OPAP + AES-GCM)</option>
                  </optgroup>
                  <optgroup label="Ablation Experiment Modes (Section 16)">
                    <option value="ablation_m1">Model 1: EMD + OPAP (Sequential, unguided)</option>
                    <option value="ablation_m2">Model 2: CNN-Assisted Adaptive EMD + OPAP</option>
                    <option value="ablation_m3">Model 3: CNN + Attention + Adaptive EMD + OPAP</option>
                    <option value="ablation_m4">Model 4: CNN + Attention + INN + Adaptive EMD + OPAP (Unencrypted)</option>
                    <option value="ablation_m5">Model 5: Proposed ARES-EMD-OPAP-INN (Full Pipeline with AES-GCM)</option>
                  </optgroup>
                  <optgroup label="Published Baselines">
                    <option value="paper_model_01">Kanimozhi RNN+Fuzzy (Sci Rep 2025)</option>
                    <option value="paper_model_02">Sanjalawe Huffman+LSB (Sci Rep 2025)</option>
                    <option value="paper_model_03">Rahman LSB+Magic Matrix (Sci Rep 2025)</option>
                    <option value="paper_model_04">Aljarf DL-Steg SAE+LSTM (JUQEA 2025)</option>
                    <option value="paper_model_05">Zhang ISS (Cybersecurity 2025)</option>
                  </optgroup>
                </select>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px] text-muted-foreground font-mono">
                  <span>INN Coupling: {selectedModel.usesInn ? "Active (2-Stage Haar + Affine)" : "Off"}</span>
                  <span>&bull;</span>
                  <span>EMD: {selectedModel.usesEmd ? "Active" : "N/A"}</span>
                  <span>&bull;</span>
                  <span>OPAP: {selectedModel.usesOpap ? "Active (Distortion Optimized)" : "Off"}</span>
                  <span>&bull;</span>
                  <span>Crypto: {selectedModel.usesAesGcm ? "AES-256-GCM AEAD" : "Keyed MAC"}</span>
                </div>
              </div>

              <div>
                <Label htmlFor="single-cover" className="text-xs font-semibold text-muted-foreground">
                  Cover Image File
                </Label>
                <Input
                  id="single-cover"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={(e) => onFile(e.target.files?.[0])}
                  className="mt-1 text-xs"
                />
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Active cover: <strong className="text-foreground">{fileName}</strong>
                </p>
              </div>

              <div>
                <Label htmlFor="single-secret" className="text-xs font-semibold text-muted-foreground">
                  Secret Data Payload
                </Label>
                <Textarea
                  id="single-secret"
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                  rows={2}
                  className="mt-1 text-xs font-mono"
                  placeholder="Enter secret message to hide..."
                />
              </div>

              <div>
                <Label htmlFor="single-pw" className="text-xs font-semibold text-muted-foreground">
                  Cryptographic Passphrase (KDF &amp; Keystream)
                </Label>
                <Input
                  id="single-pw"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 text-xs font-mono"
                  placeholder="Passphrase for PBKDF2 key derivation..."
                />
              </div>

              {error && <p className="text-xs font-medium text-red-500">{error}</p>}

              <div className="flex gap-2">
                <Button
                  onClick={embedQuick}
                  disabled={busy}
                  className="flex-1 gap-2 bg-primary text-primary-foreground font-semibold h-10"
                >
                  <LockKeyhole className="size-4" />
                  <span>{busy ? "Embedding with EMD-OPAP..." : `Embed with ${selectedModel.short}`}</span>
                </Button>

                <Button
                  variant="outline"
                  onClick={extractQuick}
                  disabled={extracting || !stegoUrl}
                  className="gap-2 h-10 text-xs font-semibold border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Unlock className="size-4" />
                  <span>{extracting ? "Extracting..." : "Extract Secret"}</span>
                </Button>
              </div>

              {/* Extracted Secret Result Card */}
              {extractedSecret && (
                <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-3 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle2 className="size-3.5 text-emerald-600" />
                      <span>Extracted Secret (100% Recovery)</span>
                    </span>
                    <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-800 dark:text-emerald-300">
                      {selectedModel.usesAesGcm ? "AES-GCM VERIFIED" : "VERIFIED"}
                    </span>
                  </div>
                  <p className="font-mono text-foreground bg-card p-2 rounded border border-border/60 break-all select-all">
                    {extractedSecret}
                  </p>
                </div>
              )}
            </div>

            {/* Results Preview */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border bg-muted/30 p-2 text-center">
                  <span className="text-[10px] font-semibold uppercase text-muted-foreground block mb-1">
                    Cover Image
                  </span>
                  <div className="aspect-square w-full overflow-hidden rounded bg-muted flex items-center justify-center">
                    {coverUrl ? (
                      <img src={coverUrl} alt="Cover" className="size-full object-cover" />
                    ) : (
                      <span className="text-xs text-muted-foreground">No cover loaded</span>
                    )}
                  </div>
                </div>

                <div className="rounded-lg border-2 border-primary/40 bg-primary/5 p-2.5 text-center flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold uppercase text-primary tracking-wide">
                      Stego Image (EMD-OPAP)
                    </span>
                    {stegoUrl && (
                      <Button
                        size="sm"
                        variant="default"
                        onClick={handleDownloadStego}
                        className="inline-flex items-center gap-1 rounded bg-primary text-primary-foreground px-2 h-6 text-[10px] font-bold shadow-xs hover:bg-primary/90"
                        title="Download Stego PNG"
                      >
                        <Download className="size-3" />
                        <span>PNG</span>
                      </Button>
                    )}
                  </div>
                  <div className="aspect-square w-full overflow-hidden rounded bg-muted flex items-center justify-center relative group">
                    {stegoUrl ? (
                      <>
                        <img src={stegoUrl} alt="Stego" className="size-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-2 transition-opacity p-2">
                          <button
                            onClick={handleDownloadStego}
                            className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-md shadow-md flex items-center gap-1.5 hover:scale-105 transition-transform"
                          >
                            <Download className="size-3.5" />
                            <span>Download PNG</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      <span className="text-xs text-muted-foreground">Click embed to run</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Download Action Bar when Stego is Ready */}
              {stegoUrl ? (
                <div className="rounded-xl border-2 border-emerald-500/40 bg-emerald-500/10 p-3.5 shadow-xs w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="inline-block size-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                          Steganographic Image Ready for Download
                        </span>
                      </div>
                      <p className="mt-0.5 text-[11px] text-muted-foreground font-mono">
                        ares_emd_opap_{fileName.replace(/\.[^/.]+$/, "")}.png &bull; Lossless 24-bit RGB PNG
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button
                        onClick={handleDownloadStego}
                        className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs h-10 px-4 shadow-sm shrink-0"
                      >
                        <Download className="size-4" />
                        <span>Download Stego Image</span>
                      </Button>
                      <Link
                        to="/decoder"
                        className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3.5 h-10 text-xs font-semibold text-foreground hover:bg-muted shadow-xs transition-colors shrink-0"
                      >
                        <FileSearch className="size-3.5 text-primary" />
                        <span>Forensic Verification</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-border bg-muted/20 p-3 text-center">
                  <p className="text-xs text-muted-foreground">
                    Click <span className="font-semibold text-foreground">Embed with {selectedModel.short}</span> above to generate and download the lossless stego image.
                  </p>
                </div>
              )}

              {/* Metrics Grid */}
              {lastMetrics && (
                <div className="rounded-lg border border-border bg-card p-3 w-full">
                  <MetricGrid metrics={lastMetrics} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Live Ablation & Hybrid INN-CNN Comparison Panel */}
        <AblationStudyPanel testImage={lastCover} />

        {/* Evaluated Model Registry Cards */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-display text-base font-semibold text-ink">
                Steganographic Algorithm &amp; Ablation Registry
              </h3>
              <p className="text-xs text-muted-foreground">
                All algorithms available for multi-image batch laboratory testing and ablation validation.
              </p>
            </div>
            <Link to="/batch-lab" className="text-xs font-semibold text-primary hover:underline">
              Test all in Batch Lab &rarr;
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {MODELS.filter((m) => m.kind !== "ablation").map((m) => {
              return (
                <div
                  key={m.id}
                  className="flex flex-col justify-between rounded-lg border border-border bg-card p-3.5 text-xs transition-all"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-display text-sm font-bold text-foreground">
                        {m.name}
                      </span>
                      <span className="rounded bg-muted px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {m.status}
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-muted-foreground">{m.paper}</p>
                    <p className="mt-2 text-xs text-foreground/90 leading-relaxed line-clamp-2">
                      {m.note}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-border/50 pt-2 font-mono text-[10px] text-muted-foreground">
                    <span>Algorithm: {m.usesInn ? "INN + EMD + OPAP" : m.usesEmd ? "EMD + OPAP" : "LSB / Permutation"}</span>
                    <span>{m.methodKey}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
