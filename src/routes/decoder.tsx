import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MetricGrid } from "@/components/metric-grid";
import { MODELS, modelById, decodeWithModel } from "@/lib/stego/models";
import { fileToStegoImage, fileToImage, imageToDataUrl, type RgbImage } from "@/lib/stego/pixels";
import { psnrOf, ssimOf, mseOf, bitErrorRate, meanAbsDelta, type QualityMetrics } from "@/lib/stego/metrics";
import { useSession } from "@/lib/session";
import {
  Unlock,
  CheckCircle2,
  XCircle,
  Sparkles,
  KeyRound,
  ShieldCheck,
  ShieldAlert,
  Copy,
  Check,
  Eye,
  EyeOff,
  Zap,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/decoder")({ component: DecoderPage });

type ModelProbeResult = {
  modelId: string;
  modelName: string;
  success: boolean;
  secret?: string;
  error?: string;
  durationMs: number;
};

function DecoderPage() {
  const session = useSession();

  // Model selection (default to recommended ARES-EMD-OPAP-INN)
  const [selectedModelId, setSelectedModelId] = useState<string>("ares_emd_opap");

  // User inputs (clean, no automatic copy-pasting)
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [stego, setStego] = useState<RgbImage | undefined>(undefined);
  const [stegoUrl, setStegoUrl] = useState<string>("");
  const [stegoFileName, setStegoFileName] = useState<string>("");
  const [cover, setCover] = useState<RgbImage | undefined>(undefined);
  const [coverUrl, setCoverUrl] = useState<string>("");
  const [expectedSecret, setExpectedSecret] = useState<string>("");

  // Execution state
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recoveredSecret, setRecoveredSecret] = useState<string | null>(null);
  const [extractedMetrics, setExtractedMetrics] = useState<QualityMetrics | null>(null);
  const [extractionTimeMs, setExtractionTimeMs] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  // Auto-detect multi-model probe results
  const [probeResults, setProbeResults] = useState<ModelProbeResult[] | null>(null);
  const [probing, setProbing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Stego image file selection (1:1 bit-exact pixel preservation)
  async function handleStegoUpload(f: File | undefined) {
    if (!f) return;
    setError(null);
    setRecoveredSecret(null);
    setExtractedMetrics(null);
    setProbeResults(null);
    setStegoFileName(f.name);
    try {
      const img = await fileToStegoImage(f);
      setStego(img);
      setStegoUrl(imageToDataUrl(img));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load stego image file");
    }
  }

  // Optional cover upload for comparative metrics
  async function handleCoverUpload(f: File | undefined) {
    if (!f) return;
    try {
      const img = await fileToImage(f, 512);
      setCover(img);
      setCoverUrl(imageToDataUrl(img));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load cover image");
    }
  }

  // Load from active session on user demand
  function loadFromCurrentSession() {
    if (session.lastStego && session.lastStegoUrl) {
      setStego(session.lastStego);
      setStegoUrl(session.lastStegoUrl);
      setStegoFileName("Session_ARES_Stego.png");
    }
    if (session.lastPassword) {
      setPassword(session.lastPassword);
    }
    if (session.lastCover && session.lastCoverUrl) {
      setCover(session.lastCover);
      setCoverUrl(session.lastCoverUrl);
    }
    if (session.lastSecret) {
      setExpectedSecret(session.lastSecret);
    }
    if (session.lastModel) {
      setSelectedModelId(session.lastModel.id);
    }
    setError(null);
    setRecoveredSecret(null);
  }

  // Clear inputs
  function clearAll() {
    setPassword("");
    setStego(undefined);
    setStegoUrl("");
    setStegoFileName("");
    setCover(undefined);
    setCoverUrl("");
    setExpectedSecret("");
    setRecoveredSecret(null);
    setExtractedMetrics(null);
    setError(null);
    setProbeResults(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  // Execute True Model Decoding
  async function executeDecode() {
    if (!stego) {
      setError("Please upload a steganogram image (PNG) to decode.");
      return;
    }
    if (!password) {
      setError("Passphrase is required to derive cryptographic keystream and extraction positions.");
      return;
    }

    setBusy(true);
    setError(null);
    setRecoveredSecret(null);
    setProbeResults(null);

    const model = modelById(selectedModelId);
    const t0 = performance.now();

    try {
      // Decode strictly from image pixel data and password
      const decodedText = await decodeWithModel(model, stego, password);
      const elapsed = performance.now() - t0;
      setExtractionTimeMs(elapsed);
      setRecoveredSecret(decodedText);

      // Compute quality metrics if original cover is provided
      if (cover) {
        const rawBytes = new TextEncoder().encode(decodedText);
        setExtractedMetrics({
          psnr: psnrOf(cover, stego),
          ssim: ssimOf(cover, stego),
          mse: mseOf(cover, stego),
          ber: expectedSecret ? bitErrorRate(expectedSecret, decodedText) : 0,
          recovery: expectedSecret ? expectedSecret === decodedText : true,
          payloadBits: rawBytes.length * 8,
          bpp: (rawBytes.length * 8) / (stego.width * stego.height),
          lsbChangePct: NaN,
          encodeMs: NaN,
          decodeMs: elapsed,
          distortion: meanAbsDelta(cover, stego),
        });
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Decoding failed";
      setError(
        msg.includes("Bad password")
          ? "Authentication Failure: HMAC/Magic header mismatch. Either the passphrase is incorrect or the image was encoded with a different algorithm."
          : `Extraction error with ${model.name}: ${msg}`,
      );
      setRecoveredSecret(null);
    } finally {
      setBusy(false);
    }
  }

  // Probe all 6 models with entered passphrase
  async function probeAllModels() {
    if (!stego) {
      setError("Please upload a stego image before probing models.");
      return;
    }
    if (!password) {
      setError("Enter the passphrase to probe which model unlocks this image.");
      return;
    }

    setProbing(true);
    setError(null);
    const results: ModelProbeResult[] = [];

    for (const m of MODELS) {
      const t0 = performance.now();
      try {
        const text = await decodeWithModel(m, stego, password);
        const dur = performance.now() - t0;
        results.push({
          modelId: m.id,
          modelName: m.name,
          success: true,
          secret: text,
          durationMs: dur,
        });
      } catch (e) {
        const dur = performance.now() - t0;
        results.push({
          modelId: m.id,
          modelName: m.name,
          success: false,
          error: e instanceof Error ? e.message : "Failed",
          durationMs: dur,
        });
      }
    }

    setProbeResults(results);
    setProbing(false);

    // If one succeeded, select it and show the secret
    const successful = results.find((r) => r.success);
    if (successful && successful.secret) {
      setSelectedModelId(successful.modelId);
      setRecoveredSecret(successful.secret);
      setExtractionTimeMs(successful.durationMs);
    } else {
      setError("None of the 6 models successfully extracted a valid payload with this passphrase. Please verify your passphrase.");
    }
  }

  const handleCopy = () => {
    if (!recoveredSecret) return;
    navigator.clipboard.writeText(recoveredSecret);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectedModel = MODELS.find((m) => m.id === selectedModelId) ?? MODELS[0]!;

  return (
    <AppShell>
      <PageHeader
        kicker="Cryptographic Extraction"
        title="Steganogram Decoder & Forensic Verification"
        description="Extract and verify embedded secret messages directly from pixel bits using the designated steganographic model and cryptographic passphrase. Zero simulated data — extraction runs live against raw image matrices."
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={loadFromCurrentSession}
              disabled={!session.lastStego}
              className="gap-1.5 text-xs text-muted-foreground hover:text-foreground"
              title="Fill fields using stego image from the current browser session"
            >
              <Sparkles className="size-3.5 text-amber-500" />
              <span>Load from Active Session</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={clearAll}
              className="text-xs text-muted-foreground hover:text-red-500"
            >
              <span>Clear Inputs</span>
            </Button>
          </div>
        }
      />

      <div className="space-y-6 w-full">
        {/* Step 1: Model Selection */}
        <section className="rounded-xl border border-border bg-card p-5 shadow-xs w-full">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary font-mono">
                Step 01
              </span>
              <h2 className="font-display text-base font-bold text-ink">
                Select Steganographic Decoding Model
              </h2>
            </div>
            <span className="text-xs text-muted-foreground">
              Must match the algorithm used during embedding
            </span>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 w-full">
            {MODELS.map((m) => {
              const isSelected = selectedModelId === m.id;
              const isPrimaryAres = m.id === "ares_emd_opap";
              const isHybridAres = m.id === "ares_hybrid_inn";
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSelectedModelId(m.id)}
                  className={cn(
                    "flex flex-col justify-between rounded-lg border p-3 text-left transition-all",
                    isSelected
                      ? "border-primary bg-primary/5 shadow-xs ring-1 ring-primary"
                      : "border-border bg-card hover:bg-muted/40",
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-display text-sm font-bold text-foreground">
                      {m.name}
                    </span>
                    <span
                      className={cn(
                        "rounded px-1.5 py-0.2 text-[9px] font-semibold uppercase tracking-wider shrink-0",
                        isPrimaryAres
                          ? "bg-primary text-primary-foreground"
                          : isHybridAres
                          ? "bg-blue-500/20 text-blue-700 dark:text-blue-300"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {isPrimaryAres ? "RECOMMENDED" : isHybridAres ? "HYBRID INN-CNN" : m.short}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground line-clamp-2">
                    {m.paper}
                  </p>
                  <div className="mt-2.5 flex items-center justify-between border-t border-border/40 pt-1.5 font-mono text-[10px] text-muted-foreground">
                    <span>Key: {m.methodKey}</span>
                    <span>
                      {m.usesInn
                        ? "INN + EMD + OPAP"
                        : m.usesEmd
                        ? "EMD + OPAP"
                        : m.usesHamming
                        ? "Hamming(7,3)"
                        : "LSB Keyed"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Step 2: Input & Image Upload Matrix */}
        <div className="grid gap-6 lg:grid-cols-2 w-full">
          {/* Left Column: Upload & Passphrase Inputs */}
          <section className="rounded-xl border border-border bg-card p-5 shadow-xs space-y-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary font-mono">
                Step 02
              </span>
              <h2 className="font-display text-base font-bold text-ink">
                Steganogram &amp; Passphrase
              </h2>
            </div>

            {/* Stego File Input */}
            <div>
              <Label htmlFor="stego-input" className="text-xs font-semibold text-foreground">
                Stego Image File (Lossless PNG / WEBP)
              </Label>
              <Input
                ref={fileInputRef}
                id="stego-input"
                type="file"
                accept="image/png,image/webp,image/jpeg"
                onChange={(e) => handleStegoUpload(e.target.files?.[0])}
                className="mt-1 text-xs"
              />
              <p className="mt-1 text-[11px] text-muted-foreground">
                {stegoFileName ? (
                  <span>
                    Loaded: <span className="font-mono text-foreground font-semibold">{stegoFileName}</span> ({stego?.width}×{stego?.height} px)
                  </span>
                ) : (
                  "Upload the image file that contains the embedded secret payload."
                )}
              </p>
            </div>

            {/* Passphrase Input (Mandatory, NOT copy-pasted) */}
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="decoder-pw" className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <KeyRound className="size-3.5 text-primary" />
                  <span>Decryption Passphrase</span>
                </Label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[11px] text-muted-foreground hover:text-foreground flex items-center gap-1"
                >
                  {showPassword ? <EyeOff className="size-3" /> : <Eye className="size-3" />}
                  <span>{showPassword ? "Hide" : "Show"}</span>
                </button>
              </div>
              <Input
                id="decoder-pw"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter the secret passphrase..."
                className="mt-1 text-xs font-mono"
              />
              <p className="mt-1 text-[11px] text-muted-foreground">
                The keystream is derived using SHA-256 HKDF. An incorrect passphrase fails extraction.
              </p>
            </div>

            {/* Optional Verification: Reference Cover */}
            <div>
              <Label htmlFor="cover-input" className="text-xs font-semibold text-muted-foreground">
                Reference Cover Image (Optional, for PSNR/SSIM/MSE)
              </Label>
              <Input
                id="cover-input"
                type="file"
                accept="image/png,image/webp,image/jpeg"
                onChange={(e) => handleCoverUpload(e.target.files?.[0])}
                className="mt-1 text-xs"
              />
            </div>

            {/* Optional Verification: Expected Secret */}
            <div>
              <Label htmlFor="expected-sec" className="text-xs font-semibold text-muted-foreground">
                Expected Plaintext for Bit-Error Verification (Optional)
              </Label>
              <Input
                id="expected-sec"
                value={expectedSecret}
                onChange={(e) => setExpectedSecret(e.target.value)}
                placeholder="Paste expected secret to check exact bit match..."
                className="mt-1 text-xs font-mono"
              />
            </div>

            {/* Error Message Callout */}
            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-600 dark:text-red-400 flex items-start gap-2">
                <AlertTriangle className="size-4 shrink-0 mt-0.5" />
                <p className="leading-relaxed">{error}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
              <Button
                onClick={executeDecode}
                disabled={busy || !stego || !password}
                className="flex-1 w-full gap-2 bg-primary text-primary-foreground font-semibold h-11 text-sm shadow-sm"
              >
                <Unlock className="size-4" />
                <span>{busy ? "Decoding from Pixels..." : `Decode with ${selectedModel.short}`}</span>
              </Button>

              <Button
                variant="outline"
                onClick={probeAllModels}
                disabled={probing || !stego || !password}
                className="w-full sm:w-auto gap-2 h-11 text-xs font-semibold border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"
                title="Probe all 6 models with this passphrase to auto-detect which one unlocks the image"
              >
                <Zap className="size-4" />
                <span>{probing ? "Probing..." : "Auto-Detect Model"}</span>
              </Button>
            </div>
          </section>

          {/* Right Column: Image Preview & Forensic Extraction Diagnostics */}
          <section className="rounded-xl border border-border bg-card p-5 shadow-xs space-y-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary font-mono">
                Inspection
              </span>
              <h2 className="font-display text-base font-bold text-ink">
                Stego Image Matrix &amp; Preview
              </h2>
            </div>

            {/* Side-by-Side Image Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-border bg-muted/30 p-2.5 text-center">
                <span className="text-[10px] font-semibold uppercase text-muted-foreground block mb-1">
                  Uploaded Stegogram
                </span>
                <div className="aspect-square w-full overflow-hidden rounded bg-muted flex items-center justify-center">
                  {stegoUrl ? (
                    <img src={stegoUrl} alt="Stego" className="size-full object-contain" />
                  ) : (
                    <span className="text-xs text-muted-foreground p-3 text-center">
                      Upload stego image to view
                    </span>
                  )}
                </div>
                {stego && (
                  <span className="mt-1 font-mono text-[10px] text-muted-foreground block">
                    {stego.width}×{stego.height} px · 24-bit
                  </span>
                )}
              </div>

              <div className="rounded-lg border border-border bg-muted/30 p-2.5 text-center">
                <span className="text-[10px] font-semibold uppercase text-muted-foreground block mb-1">
                  Reference Cover (Optional)
                </span>
                <div className="aspect-square w-full overflow-hidden rounded bg-muted flex items-center justify-center">
                  {coverUrl ? (
                    <img src={coverUrl} alt="Cover" className="size-full object-contain" />
                  ) : (
                    <span className="text-xs text-muted-foreground p-3 text-center">
                      None loaded
                    </span>
                  )}
                </div>
                {cover && (
                  <span className="mt-1 font-mono text-[10px] text-muted-foreground block">
                    {cover.width}×{cover.height} px
                  </span>
                )}
              </div>
            </div>

            {/* Forensic Inspection Metadata */}
            <div className="rounded-lg border border-border bg-muted/20 p-3 text-xs space-y-1.5">
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="text-muted-foreground">Carrier Channel:</span>
                <span className="font-semibold text-foreground">Blue (Channel Index 2, Invariant R &amp; G)</span>
              </div>
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="text-muted-foreground">Positional Mapping:</span>
                <span className="font-semibold text-foreground">
                  {selectedModel.usesInn
                    ? "INN Reversible Wavelet + CNN Attention Cost Map"
                    : selectedModel.usesAdaptiveCost || selectedModel.usesAdaptive
                    ? "CNN Adaptive Saliency + Keyed Permutation"
                    : "Password-Keyed Fisher-Yates Permutation"}
                </span>
              </div>
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="text-muted-foreground">Coding Scheme:</span>
                <span className="font-semibold text-foreground">
                  {selectedModel.usesInn
                    ? `INN-Coupled EMD + OPAP (${selectedModel.radixScheme ?? "bits6"})`
                    : selectedModel.usesEmd
                    ? "Generalized EMD + OPAP"
                    : selectedModel.usesHamming
                    ? "Hamming (7,3) ±1 Matching"
                    : "Standard Keyed LSB"}
                </span>
              </div>
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="text-muted-foreground">Cryptographic Verification:</span>
                <span className="font-semibold text-foreground">
                  {selectedModel.usesAesGcm
                    ? "PBKDF2 + AES-256-GCM AEAD (Zero False Positives)"
                    : "Magic Header + SHA-256 Keyed MAC"}
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* Step 3: Extracted Plaintext & Authenticity Proof */}
        {recoveredSecret !== null && (
          <section className="rounded-xl border-2 border-emerald-500/40 bg-emerald-500/5 p-6 shadow-xs w-full space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-emerald-500/20 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-500 text-white shadow-xs">
                  <CheckCircle2 className="size-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">
                    Payload Successfully Decoded
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Decoded using <span className="font-semibold text-foreground">{selectedModel.name}</span> in{" "}
                    <span className="font-mono font-semibold text-emerald-600">{extractionTimeMs.toFixed(1)} ms</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopy}
                  className="gap-1.5 text-xs bg-card font-semibold"
                >
                  {copied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
                  <span>{copied ? "Copied!" : "Copy Secret"}</span>
                </Button>
              </div>
            </div>

            {/* Recovered Secret Box */}
            <div className="rounded-xl border border-emerald-500/30 bg-card p-4">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-2">
                <span className="font-semibold uppercase tracking-wider">Decoded Plaintext:</span>
                <span className="font-mono">
                  {recoveredSecret.length} chars · {new TextEncoder().encode(recoveredSecret).length} bytes
                </span>
              </div>
              <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-foreground bg-muted/30 p-3.5 rounded-lg border border-border/50 max-h-60 overflow-y-auto">
                {recoveredSecret}
              </pre>
            </div>

            {/* Bit-Exact Verification Banner if expected secret was provided */}
            {expectedSecret && (
              <div
                className={cn(
                  "rounded-lg p-3 text-xs flex items-center justify-between",
                  expectedSecret === recoveredSecret
                    ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
                    : "bg-red-500/10 border border-red-500/30 text-red-600",
                )}
              >
                <div className="flex items-center gap-2">
                  {expectedSecret === recoveredSecret ? (
                    <ShieldCheck className="size-4" />
                  ) : (
                    <ShieldAlert className="size-4" />
                  )}
                  <span className="font-semibold">
                    {expectedSecret === recoveredSecret
                      ? "Bit-Exact Identity Verified (100% Match, BER = 0.00%)"
                      : "Bit Difference Detected with Expected Plaintext"}
                  </span>
                </div>
                <span className="font-mono text-[11px]">
                  BER: {bitErrorRate(expectedSecret, recoveredSecret).toFixed(4)}%
                </span>
              </div>
            )}

            {/* Full Quality Metrics Grid if cover was provided */}
            {extractedMetrics && (
              <div className="rounded-lg border border-border bg-card p-4">
                <h4 className="font-display text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                  Stego Image Empirical Quality Metrics (vs Original Cover)
                </h4>
                <MetricGrid metrics={extractedMetrics} />
              </div>
            )}
          </section>
        )}

        {/* Multi-Model Probe Results Matrix */}
        {probeResults && (
          <section className="rounded-xl border border-border bg-card p-5 shadow-xs w-full">
            <h3 className="font-display text-base font-bold text-ink mb-1">
              Multi-Model Algorithm Probe Results
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              Tested each of the 6 baseline reproduction pipelines against the uploaded image with your passphrase.
            </p>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {probeResults.map((res) => (
                <div
                  key={res.modelId}
                  className={cn(
                    "rounded-lg border p-3.5 text-xs transition-all",
                    res.success
                      ? "border-emerald-500/40 bg-emerald-500/5 shadow-xs"
                      : "border-border bg-muted/20 opacity-70",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">{res.modelName}</span>
                    {res.success ? (
                      <span className="inline-flex items-center gap-1 rounded bg-emerald-500/20 px-2 py-0.5 font-bold text-[10px] text-emerald-600">
                        <CheckCircle2 className="size-3" />
                        SUCCESS
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded bg-red-500/10 px-2 py-0.5 font-semibold text-[10px] text-red-500">
                        <XCircle className="size-3" />
                        REJECTED
                      </span>
                    )}
                  </div>
                  <div className="mt-2 text-[11px] text-muted-foreground font-mono">
                    {res.success ? (
                      <span className="text-emerald-700 dark:text-emerald-300">
                        Extracted {res.secret?.length} chars in {res.durationMs.toFixed(1)} ms
                      </span>
                    ) : (
                      <span>HMAC / Magic mismatch</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Live Proof & Cryptographic Integrity Education Panel */}
        <section className="rounded-xl border border-border bg-card p-5 shadow-xs w-full">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="size-4 text-primary" />
            <h3 className="font-display text-base font-semibold text-ink">
              Algorithm Integrity Verification Proof
            </h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 text-xs">
            <div className="rounded-lg border border-border/60 bg-muted/20 p-3.5">
              <span className="font-mono text-[11px] font-bold text-primary block mb-1">
                01. PIXEL EMBEDDING
              </span>
              <p className="text-muted-foreground leading-relaxed text-[11px]">
                Payload bytes are converted to bit streams and encoded into the blue channel LSBs using Hamming (7,3) coset syndrome matching or keyed Fisher-Yates permutations.
              </p>
            </div>

            <div className="rounded-lg border border-border/60 bg-muted/20 p-3.5">
              <span className="font-mono text-[11px] font-bold text-primary block mb-1">
                02. ZERO STORED STATE
              </span>
              <p className="text-muted-foreground leading-relaxed text-[11px]">
                Decoding does not copy or read previous session memory. The secret is extracted exclusively from the RGB pixel values of the uploaded image file.
              </p>
            </div>

            <div className="rounded-lg border border-border/60 bg-muted/20 p-3.5">
              <span className="font-mono text-[11px] font-bold text-primary block mb-1">
                03. AUTHENTICATION SENSITIVITY
              </span>
              <p className="text-muted-foreground leading-relaxed text-[11px]">
                Modifying even a single character of the passphrase alters the SHA-256 HKDF keystream, causing immediate checksum rejection.
              </p>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
