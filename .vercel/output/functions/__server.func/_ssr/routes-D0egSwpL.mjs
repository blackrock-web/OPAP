import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as ArrowRight, _ as FlaskConical, f as LockKeyhole, h as History, j as ChartColumn, n as Trophy, o as Sparkles, w as Cpu } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { _ as cn, d as Textarea, f as Label, g as PageHeader, h as Button, i as MODELS, l as fileToImage, m as AppShell, o as encodeWithModel, p as Input, r as generateSampleImage, s as modelById, u as imageToDataUrl, v as useSession } from "./router-HdO4Vl3b.mjs";
import { t as MetricGrid } from "./metric-grid-C3ilPPKO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D0egSwpL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/index.tsx?tsr-split=component";
function DashboardPage() {
	const { bench, history, setEncode, lastCoverUrl, lastStegoUrl, lastMetrics } = useSession();
	const [fileName, setFileName] = (0, import_react.useState)("Lena_Sample.png");
	const [secret, setSecret] = (0, import_react.useState)("ARES research cryptographic payload");
	const [password, setPassword] = (0, import_react.useState)("lab-passphrase-2025");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [coverUrl, setCoverUrl] = (0, import_react.useState)(lastCoverUrl ?? "");
	const [stegoUrl, setStegoUrl] = (0, import_react.useState)(lastStegoUrl ?? "");
	const loadQuickSample = () => {
		const img = generateSampleImage("portrait", 384, 384);
		const url = imageToDataUrl(img);
		setCoverUrl(url);
		setFileName("Sample_Portrait.png");
		useSession.setState({
			lastCover: img,
			lastCoverUrl: url
		});
	};
	async function onFile(f) {
		if (!f) return;
		setFileName(f.name);
		setError(null);
		try {
			const img = await fileToImage(f, 384);
			const url = imageToDataUrl(img);
			setCoverUrl(url);
			useSession.setState({
				lastCover: img,
				lastCoverUrl: url
			});
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
			useSession.setState({
				lastCover: sample,
				lastCoverUrl: imageToDataUrl(sample)
			});
		}
		if (!secret.trim() || !password) {
			setError("Secret text and password are required.");
			return;
		}
		setBusy(true);
		setError(null);
		try {
			const model = modelById("ares_hybrid_inn");
			const out = await encodeWithModel(model, cover, secret.trim(), password);
			const url = imageToDataUrl(out.stego);
			setStegoUrl(url);
			setEncode({
				cover,
				stego: out.stego,
				coverUrl: coverUrl || imageToDataUrl(cover),
				stegoUrl: url,
				secret: secret.trim(),
				password,
				metrics: out.metrics,
				model
			});
		} catch (e) {
			setError(e instanceof Error ? e.message : "Embedding failed");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, {
		kicker: "Executive Laboratory",
		title: "Steganography Research & Verification Dashboard",
		description: "Next-generation image steganography laboratory uniting ARES-Hybrid-INN with standard baseline reproductions, multi-image batch laboratory benchmarking, and rigorous non-parametric statistical significance testing.",
		actions: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
			to: "/batch-lab",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				className: "gap-2 bg-primary text-primary-foreground font-semibold shadow-sm hover:opacity-95",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FlaskConical, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 103,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Open Batch Lab" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 104,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 105,
						columnNumber: 15
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 102,
				columnNumber: 13
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 101,
			columnNumber: 342
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 101,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: "Evaluated Models"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 114,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Cpu, { className: "size-4 text-primary" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 117,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 113,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-2 font-display text-2xl font-bold text-foreground",
								children: "6 Algorithms"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 119,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: "1 Proposed (ARES-Hybrid-INN) + 5 Sci Rep/JUQEA reproductions"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 122,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 112,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: "Statistical Suite"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 129,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChartColumn, { className: "size-4 text-emerald-500" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 132,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 128,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-2 font-display text-2xl font-bold text-foreground",
								children: "Friedman & W"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 134,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: "Friedman ANOVA · Kendall’s W · Nemenyi Post-hoc CD"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 137,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 127,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: "Empirical Winner"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 144,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trophy, { className: "size-4 text-amber-500" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 147,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 143,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-2 font-display text-2xl font-bold text-primary",
								children: "ARES-Hybrid-INN"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 149,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: "Mean Rank 1.00 · >48 dB PSNR with Hamming(7,3)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 152,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 142,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: "Benchmark Runs"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 159,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(History, { className: "size-4 text-blue-500" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 162,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 158,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-2 font-display text-2xl font-bold text-foreground",
								children: history.length > 0 ? `${history.length} Sessions` : "Lab Ready"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 164,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: bench.length > 0 ? `${bench.length} active row metrics collected` : "Standard 6-image reference suite loaded"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 167,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 157,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 111,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "relative overflow-hidden rounded-xl border-2 border-primary/30 bg-gradient-to-r from-primary/10 via-card to-primary/5 p-6 shadow-xs",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "max-w-2xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "rounded-full bg-primary/20 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-primary",
									children: "New Integrated Architecture"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 178,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs text-muted-foreground",
									children: "Complete Research Laboratory"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 181,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 177,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "mt-2 font-display text-xl font-bold text-ink sm:text-2xl",
								children: "Batch Lab Benchmarking & Statistical Significance Testing"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 185,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm",
								children: "Upload multiple images simultaneously. Each uploaded image is executed as an independent test case across all 6 models with identical payload and passphrase. Collect comparative tables, observe live execution, and compute Friedman tests, Kendall’s W concordance, and Nemenyi critical difference diagrams."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 188,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 176,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex shrink-0 flex-wrap items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/batch-lab",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								className: "gap-2 bg-primary text-primary-foreground font-semibold h-11 px-5 shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FlaskConical, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 199,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Launch Batch Lab" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 200,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 198,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 197,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/history",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "outline",
								className: "gap-2 h-11 px-4 text-xs font-medium",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(History, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 205,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "View Run History" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 206,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 204,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 203,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 196,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 175,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 174,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-xl border border-border bg-card p-5 shadow-xs",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
					className: "font-display text-base font-semibold text-ink mb-4",
					children: "Experimental Benchmark Protocol"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 215,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-lg border border-border/60 bg-muted/20 p-3.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-mono text-xs font-bold text-primary",
									children: "01. INGESTION"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 220,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
									className: "mt-1 text-xs font-semibold text-foreground",
									children: "Multi-Cover Ingestion"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 221,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-1 text-[11px] text-muted-foreground leading-relaxed",
									children: "Accepts batches of PNG, JPG, or WEBP images, normalized to consistent dimensions."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 222,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 219,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-lg border border-border/60 bg-muted/20 p-3.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-mono text-xs font-bold text-primary",
									children: "02. UNIFORMITY"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 228,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
									className: "mt-1 text-xs font-semibold text-foreground",
									children: "Identical Payload"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 229,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-1 text-[11px] text-muted-foreground leading-relaxed",
									children: "The exact same secret message and password are dispatched independently to all models."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 230,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 227,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-lg border border-border/60 bg-muted/20 p-3.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-mono text-xs font-bold text-primary",
									children: "03. EXECUTION"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 236,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
									className: "mt-1 text-xs font-semibold text-foreground",
									children: "6-Way Embedding"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 237,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-1 text-[11px] text-muted-foreground leading-relaxed",
									children: "ARES-Hybrid-INN + 5 published reproductions run independently without cross-leakage."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 238,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 235,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-lg border border-border/60 bg-muted/20 p-3.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-mono text-xs font-bold text-primary",
									children: "04. EXTRACTION"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 244,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
									className: "mt-1 text-xs font-semibold text-foreground",
									children: "Metric Extraction"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 245,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-1 text-[11px] text-muted-foreground leading-relaxed",
									children: "Computes pixel-exact PSNR, SSIM, MSE, BER, and bit recovery for every image-model pair."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 246,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 243,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-lg border border-border/60 bg-muted/20 p-3.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-mono text-xs font-bold text-primary",
									children: "05. VALIDATION"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 252,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
									className: "mt-1 text-xs font-semibold text-foreground",
									children: "Non-Parametric Stats"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 253,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-1 text-[11px] text-muted-foreground leading-relaxed",
									children: "Friedman Chi-Square, Kendall’s W, Nemenyi CD, and APA/LaTeX research publication exports."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 254,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 251,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 218,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 214,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-xl border border-border bg-card p-5 shadow-xs",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mb-4 flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "font-display text-base font-semibold text-ink",
						children: "Quick Interactive Test Bench (ARES-Hybrid-INN)"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 265,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground",
						children: "Verify imperceptibility and bit recovery on a single cover image before running large batches."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 268,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 264,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "outline",
						size: "sm",
						onClick: loadQuickSample,
						className: "gap-1.5 text-xs font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3.5 text-amber-500" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 273,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Load Sample Image" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 274,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 272,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 263,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-6 lg:grid-cols-[1fr_1.1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									htmlFor: "single-cover",
									className: "text-xs font-semibold text-muted-foreground",
									children: "Cover Image"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 282,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									id: "single-cover",
									type: "file",
									accept: "image/png,image/jpeg,image/webp",
									onChange: (e) => onFile(e.target.files?.[0]),
									className: "mt-1 text-xs"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 285,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-1 text-[11px] text-muted-foreground",
									children: ["Active cover: ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
										className: "text-foreground",
										children: fileName
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 287,
										columnNumber: 33
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 286,
									columnNumber: 17
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 281,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								htmlFor: "single-secret",
								className: "text-xs font-semibold text-muted-foreground",
								children: "Secret Payload"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 292,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
								id: "single-secret",
								value: secret,
								onChange: (e) => setSecret(e.target.value),
								rows: 2,
								className: "mt-1 text-xs font-mono"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 295,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 291,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								htmlFor: "single-pw",
								className: "text-xs font-semibold text-muted-foreground",
								children: "Passphrase"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 299,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								id: "single-pw",
								type: "password",
								value: password,
								onChange: (e) => setPassword(e.target.value),
								className: "mt-1 text-xs font-mono"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 302,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 298,
								columnNumber: 15
							}, this),
							error && /* @__PURE__ */ (void 0)("p", {
								className: "text-xs font-medium text-red-500",
								children: error
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 305,
								columnNumber: 25
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								onClick: embedQuick,
								disabled: busy,
								className: "w-full gap-2 bg-primary text-primary-foreground font-semibold h-10",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LockKeyhole, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 308,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: busy ? "Embedding..." : "Embed with ARES-Hybrid-INN" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 309,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 307,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 280,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "rounded-lg border border-border bg-muted/30 p-2 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[10px] font-semibold uppercase text-muted-foreground block mb-1",
									children: "Cover Image"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 317,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "aspect-square w-full overflow-hidden rounded bg-muted flex items-center justify-center",
									children: coverUrl ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
										src: coverUrl,
										alt: "Cover",
										className: "size-full object-cover"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 321,
										columnNumber: 33
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-xs text-muted-foreground",
										children: "No cover loaded"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 321,
										columnNumber: 105
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 320,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 316,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "rounded-lg border border-border bg-muted/30 p-2 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[10px] font-semibold uppercase text-primary block mb-1",
									children: "Stego Image (ARES)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 326,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "aspect-square w-full overflow-hidden rounded bg-muted flex items-center justify-center",
									children: stegoUrl ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
										src: stegoUrl,
										alt: "Stego",
										className: "size-full object-cover"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 330,
										columnNumber: 33
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-xs text-muted-foreground",
										children: "Click embed to run"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 330,
										columnNumber: 105
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 329,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 325,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 315,
							columnNumber: 15
						}, this), lastMetrics && /* @__PURE__ */ (void 0)("div", {
							className: "rounded-lg border border-border bg-card p-3",
							children: /* @__PURE__ */ (void 0)(MetricGrid, { m: lastMetrics }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 337,
								columnNumber: 19
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 336,
							columnNumber: 31
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 314,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 278,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 262,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-xl border border-border bg-card p-5 shadow-xs",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mb-4 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "font-display text-base font-semibold text-ink",
						children: "Steganographic Algorithm Registry"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 347,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground",
						children: "All algorithms available for multi-image batch laboratory testing."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 350,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 346,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/batch-lab",
						className: "text-xs font-semibold text-primary hover:underline",
						children: "Test all in Batch Lab →"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 354,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 345,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
					children: MODELS.map((m) => {
						const isAres = m.id === "ares_hybrid_inn";
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: cn("flex flex-col justify-between rounded-lg border p-3.5 text-xs transition-all", isAres ? "border-primary/50 bg-primary/5 shadow-xs" : "border-border bg-card"),
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-display text-sm font-bold text-foreground",
										children: m.name
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 365,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: cn("rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider", isAres ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"),
										children: m.status
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 368,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 364,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-1 text-[11px] text-muted-foreground",
									children: m.paper
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 372,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-2 text-xs text-foreground/90 leading-relaxed line-clamp-2",
									children: m.note
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 373,
									columnNumber: 21
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 363,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-3 flex items-center justify-between border-t border-border/50 pt-2 font-mono text-[10px] text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: ["key: ", m.methodKey] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 378,
									columnNumber: 21
								}, this), m.usesHamming && /* @__PURE__ */ (void 0)("span", {
									className: "text-primary font-bold",
									children: "Hamming(7,3)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 379,
									columnNumber: 39
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 377,
								columnNumber: 19
							}, this)]
						}, m.id, true, {
							fileName: _jsxFileName,
							lineNumber: 362,
							columnNumber: 20
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 359,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 344,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 109,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 100,
		columnNumber: 10
	}, this);
}
//#endregion
export { DashboardPage as component };
