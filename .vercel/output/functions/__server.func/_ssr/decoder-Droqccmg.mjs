import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { F as CircleX, I as CircleCheck, L as Check, M as Copy, O as Eye, d as ShieldAlert, h as LockOpen, i as TriangleAlert, k as EyeOff, s as Sparkles, t as Zap, u as ShieldCheck, y as KeyRound } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { C as cn, S as PageHeader, a as decodeWithModel, b as AppShell, d as mseOf, f as psnrOf, g as imageToDataUrl, h as fileToStegoImage, i as MODELS, l as bitErrorRate, m as fileToImage, p as ssimOf, s as modelById, u as meanAbsDelta, v as Label, w as useSession, x as Button, y as Input } from "./router-Cp-zr37S.mjs";
import { t as MetricGrid } from "./metric-grid-BxO-TSYV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/decoder-Droqccmg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/decoder.tsx?tsr-split=component";
function DecoderPage() {
	const session = useSession();
	const [selectedModelId, setSelectedModelId] = (0, import_react.useState)("ares_hybrid_inn");
	const [password, setPassword] = (0, import_react.useState)("");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [stego, setStego] = (0, import_react.useState)(void 0);
	const [stegoUrl, setStegoUrl] = (0, import_react.useState)("");
	const [stegoFileName, setStegoFileName] = (0, import_react.useState)("");
	const [cover, setCover] = (0, import_react.useState)(void 0);
	const [coverUrl, setCoverUrl] = (0, import_react.useState)("");
	const [expectedSecret, setExpectedSecret] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [recoveredSecret, setRecoveredSecret] = (0, import_react.useState)(null);
	const [extractedMetrics, setExtractedMetrics] = (0, import_react.useState)(null);
	const [extractionTimeMs, setExtractionTimeMs] = (0, import_react.useState)(0);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [probeResults, setProbeResults] = (0, import_react.useState)(null);
	const [probing, setProbing] = (0, import_react.useState)(false);
	const fileInputRef = (0, import_react.useRef)(null);
	async function handleStegoUpload(f) {
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
	async function handleCoverUpload(f) {
		if (!f) return;
		try {
			const img = await fileToImage(f, 512);
			setCover(img);
			setCoverUrl(imageToDataUrl(img));
		} catch (e) {
			setError(e instanceof Error ? e.message : "Failed to load cover image");
		}
	}
	function loadFromCurrentSession() {
		if (session.lastStego && session.lastStegoUrl) {
			setStego(session.lastStego);
			setStegoUrl(session.lastStegoUrl);
			setStegoFileName("Session_ARES_Stego.png");
		}
		if (session.lastPassword) setPassword(session.lastPassword);
		if (session.lastCover && session.lastCoverUrl) {
			setCover(session.lastCover);
			setCoverUrl(session.lastCoverUrl);
		}
		if (session.lastSecret) setExpectedSecret(session.lastSecret);
		if (session.lastModel) setSelectedModelId(session.lastModel.id);
		setError(null);
		setRecoveredSecret(null);
	}
	function clearAll() {
		setPassword("");
		setStego(void 0);
		setStegoUrl("");
		setStegoFileName("");
		setCover(void 0);
		setCoverUrl("");
		setExpectedSecret("");
		setRecoveredSecret(null);
		setExtractedMetrics(null);
		setError(null);
		setProbeResults(null);
		if (fileInputRef.current) fileInputRef.current.value = "";
	}
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
			const decodedText = await decodeWithModel(model, stego, password);
			const elapsed = performance.now() - t0;
			setExtractionTimeMs(elapsed);
			setRecoveredSecret(decodedText);
			if (cover) {
				const rawBytes = new TextEncoder().encode(decodedText);
				setExtractedMetrics({
					psnr: psnrOf(cover, stego),
					ssim: ssimOf(cover, stego),
					mse: mseOf(cover, stego),
					ber: expectedSecret ? bitErrorRate(expectedSecret, decodedText) : 0,
					recovery: expectedSecret ? expectedSecret === decodedText : true,
					payloadBits: rawBytes.length * 8,
					bpp: rawBytes.length * 8 / (stego.width * stego.height),
					lsbChangePct: NaN,
					encodeMs: NaN,
					decodeMs: elapsed,
					distortion: meanAbsDelta(cover, stego)
				});
			}
		} catch (e) {
			const msg = e instanceof Error ? e.message : "Decoding failed";
			setError(msg.includes("Bad password") ? "Authentication Failure: HMAC/Magic header mismatch. Either the passphrase is incorrect or the image was encoded with a different algorithm." : `Extraction error with ${model.name}: ${msg}`);
			setRecoveredSecret(null);
		} finally {
			setBusy(false);
		}
	}
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
		const results = [];
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
					durationMs: dur
				});
			} catch (e) {
				const dur = performance.now() - t0;
				results.push({
					modelId: m.id,
					modelName: m.name,
					success: false,
					error: e instanceof Error ? e.message : "Failed",
					durationMs: dur
				});
			}
		}
		setProbeResults(results);
		setProbing(false);
		const successful = results.find((r) => r.success);
		if (successful && successful.secret) {
			setSelectedModelId(successful.modelId);
			setRecoveredSecret(successful.secret);
			setExtractionTimeMs(successful.durationMs);
		} else setError("None of the 6 models successfully extracted a valid payload with this passphrase. Please verify your passphrase.");
	}
	const handleCopy = () => {
		if (!recoveredSecret) return;
		navigator.clipboard.writeText(recoveredSecret);
		setCopied(true);
		setTimeout(() => setCopied(false), 2e3);
	};
	const selectedModel = MODELS.find((m) => m.id === selectedModelId) ?? MODELS[0];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, {
		kicker: "Cryptographic Extraction",
		title: "Steganogram Decoder & Forensic Verification",
		description: "Extract and verify embedded secret messages directly from pixel bits using the designated steganographic model and cryptographic passphrase. Zero simulated data — extraction runs live against raw image matrices.",
		actions: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				variant: "outline",
				size: "sm",
				onClick: loadFromCurrentSession,
				disabled: !session.lastStego,
				className: "gap-1.5 text-xs text-muted-foreground hover:text-foreground",
				title: "Fill fields using stego image from the current browser session",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3.5 text-amber-500" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 227,
					columnNumber: 15
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Load from Active Session" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 228,
					columnNumber: 15
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 226,
				columnNumber: 13
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				variant: "outline",
				size: "sm",
				onClick: clearAll,
				className: "text-xs text-muted-foreground hover:text-red-500",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Clear Inputs" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 231,
					columnNumber: 15
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 230,
				columnNumber: 13
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 225,
			columnNumber: 340
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 225,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6 w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "rounded-xl border border-border bg-card p-5 shadow-xs w-full",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-xs font-semibold uppercase tracking-wider text-primary font-mono",
						children: "Step 01"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 240,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "font-display text-base font-bold text-ink",
						children: "Select Steganographic Decoding Model"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 243,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 239,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-xs text-muted-foreground",
						children: "Must match the algorithm used during embedding"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 247,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 238,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 w-full",
					children: MODELS.map((m) => {
						const isSelected = selectedModelId === m.id;
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => setSelectedModelId(m.id),
							className: cn("flex flex-col justify-between rounded-lg border p-3 text-left transition-all", isSelected ? "border-primary bg-primary/5 shadow-xs ring-1 ring-primary" : "border-border bg-card hover:bg-muted/40"),
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-display text-sm font-bold text-foreground",
										children: m.name
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 257,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: cn("rounded px-1.5 py-0.2 text-[9px] font-semibold uppercase tracking-wider", m.id === "ares_hybrid_inn" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"),
										children: m.short
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 260,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 256,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-1 text-[11px] text-muted-foreground line-clamp-2",
									children: m.paper
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 264,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-2.5 flex items-center justify-between border-t border-border/40 pt-1.5 font-mono text-[10px] text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: ["Key: ", m.methodKey] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 268,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: m.usesHamming ? "Hamming(7,3)" : "LSB Keyed" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 269,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 267,
									columnNumber: 19
								}, this)
							]
						}, m.id, true, {
							fileName: _jsxFileName,
							lineNumber: 255,
							columnNumber: 20
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 252,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 237,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-6 lg:grid-cols-2 w-full",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
					className: "rounded-xl border border-border bg-card p-5 shadow-xs space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-xs font-semibold uppercase tracking-wider text-primary font-mono",
							children: "Step 02"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 281,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "font-display text-base font-bold text-ink",
							children: "Steganogram & Passphrase"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 284,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 280,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								htmlFor: "stego-input",
								className: "text-xs font-semibold text-foreground",
								children: "Stego Image File (Lossless PNG / WEBP)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 291,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								ref: fileInputRef,
								id: "stego-input",
								type: "file",
								accept: "image/png,image/webp,image/jpeg",
								onChange: (e) => handleStegoUpload(e.target.files?.[0]),
								className: "mt-1 text-xs"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 294,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 text-[11px] text-muted-foreground",
								children: stegoFileName ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
									"Loaded: ",
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-mono text-foreground font-semibold",
										children: stegoFileName
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 297,
										columnNumber: 29
									}, this),
									" (",
									stego?.width,
									"×",
									stego?.height,
									" px)"
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 296,
									columnNumber: 34
								}, this) : "Upload the image file that contains the embedded secret payload."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 295,
								columnNumber: 15
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 290,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									htmlFor: "decoder-pw",
									className: "text-xs font-semibold text-foreground flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(KeyRound, { className: "size-3.5 text-primary" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 306,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Decryption Passphrase" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 307,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 305,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => setShowPassword(!showPassword),
									className: "text-[11px] text-muted-foreground hover:text-foreground flex items-center gap-1",
									children: [showPassword ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EyeOff, { className: "size-3" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 310,
										columnNumber: 35
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Eye, { className: "size-3" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 310,
										columnNumber: 67
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: showPassword ? "Hide" : "Show" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 311,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 309,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 304,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								id: "decoder-pw",
								type: showPassword ? "text" : "password",
								value: password,
								onChange: (e) => setPassword(e.target.value),
								placeholder: "Enter the secret passphrase...",
								className: "mt-1 text-xs font-mono"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 314,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 text-[11px] text-muted-foreground",
								children: "The keystream is derived using SHA-256 HKDF. An incorrect passphrase fails extraction."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 315,
								columnNumber: 15
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 303,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
							htmlFor: "cover-input",
							className: "text-xs font-semibold text-muted-foreground",
							children: "Reference Cover Image (Optional, for PSNR/SSIM/MSE)"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 322,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
							id: "cover-input",
							type: "file",
							accept: "image/png,image/webp,image/jpeg",
							onChange: (e) => handleCoverUpload(e.target.files?.[0]),
							className: "mt-1 text-xs"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 325,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 321,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
							htmlFor: "expected-sec",
							className: "text-xs font-semibold text-muted-foreground",
							children: "Expected Plaintext for Bit-Error Verification (Optional)"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 330,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
							id: "expected-sec",
							value: expectedSecret,
							onChange: (e) => setExpectedSecret(e.target.value),
							placeholder: "Paste expected secret to check exact bit match...",
							className: "mt-1 text-xs font-mono"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 333,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 329,
							columnNumber: 13
						}, this),
						error && /* @__PURE__ */ (void 0)("div", {
							className: "rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-600 dark:text-red-400 flex items-start gap-2",
							children: [/* @__PURE__ */ (void 0)(TriangleAlert, { className: "size-4 shrink-0 mt-0.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 338,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "leading-relaxed",
								children: error
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 339,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 337,
							columnNumber: 23
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-col sm:flex-row items-center gap-2 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								onClick: executeDecode,
								disabled: busy || !stego || !password,
								className: "flex-1 w-full gap-2 bg-primary text-primary-foreground font-semibold h-11 text-sm shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LockOpen, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 345,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: busy ? "Decoding from Pixels..." : `Decode with ${selectedModel.short}` }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 346,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 344,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "outline",
								onClick: probeAllModels,
								disabled: probing || !stego || !password,
								className: "w-full sm:w-auto gap-2 h-11 text-xs font-semibold border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground",
								title: "Probe all 6 models with this passphrase to auto-detect which one unlocks the image",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Zap, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 350,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: probing ? "Probing..." : "Auto-Detect Model" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 351,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 349,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 343,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 279,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
					className: "rounded-xl border border-border bg-card p-5 shadow-xs space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-xs font-semibold uppercase tracking-wider text-primary font-mono",
							children: "Inspection"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 359,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "font-display text-base font-bold text-ink",
							children: "Stego Image Matrix & Preview"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 362,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 358,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "rounded-lg border border-border bg-muted/30 p-2.5 text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-[10px] font-semibold uppercase text-muted-foreground block mb-1",
										children: "Uploaded Stegogram"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 370,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "aspect-square w-full overflow-hidden rounded bg-muted flex items-center justify-center",
										children: stegoUrl ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
											src: stegoUrl,
											alt: "Stego",
											className: "size-full object-contain"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 374,
											columnNumber: 31
										}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-xs text-muted-foreground p-3 text-center",
											children: "Upload stego image to view"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 374,
											columnNumber: 105
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 373,
										columnNumber: 17
									}, this),
									stego && /* @__PURE__ */ (void 0)("span", {
										className: "mt-1 font-mono text-[10px] text-muted-foreground block",
										children: [
											stego.width,
											"×",
											stego.height,
											" px · 24-bit"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 378,
										columnNumber: 27
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 369,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "rounded-lg border border-border bg-muted/30 p-2.5 text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-[10px] font-semibold uppercase text-muted-foreground block mb-1",
										children: "Reference Cover (Optional)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 384,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "aspect-square w-full overflow-hidden rounded bg-muted flex items-center justify-center",
										children: coverUrl ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
											src: coverUrl,
											alt: "Cover",
											className: "size-full object-contain"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 388,
											columnNumber: 31
										}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-xs text-muted-foreground p-3 text-center",
											children: "None loaded"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 388,
											columnNumber: 105
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 387,
										columnNumber: 17
									}, this),
									cover && /* @__PURE__ */ (void 0)("span", {
										className: "mt-1 font-mono text-[10px] text-muted-foreground block",
										children: [
											cover.width,
											"×",
											cover.height,
											" px"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 392,
										columnNumber: 27
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 383,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 368,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-lg border border-border bg-muted/20 p-3 text-xs space-y-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between font-mono text-[11px]",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-muted-foreground",
										children: "Carrier Channel:"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 401,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-semibold text-foreground",
										children: "Blue (Channel Index 2)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 402,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 400,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between font-mono text-[11px]",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-muted-foreground",
										children: "Positional Mapping:"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 405,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-semibold text-foreground",
										children: selectedModel.usesAdaptive ? "Adaptive Saliency + Keyed HKDF Mask" : "Password-Keyed Fisher-Yates Permutation"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 406,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 404,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between font-mono text-[11px]",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-muted-foreground",
										children: "Coding Scheme:"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 411,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-semibold text-foreground",
										children: selectedModel.usesHamming ? "Hamming (7,3) ±1 Matching" : "Standard Keyed LSB"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 412,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 410,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between font-mono text-[11px]",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-muted-foreground",
										children: "Cryptographic Verification:"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 417,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-semibold text-foreground",
										children: "Magic Checksum (STG1) + HKDF Keystream"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 418,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 416,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 399,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 357,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 277,
				columnNumber: 9
			}, this),
			recoveredSecret !== null && /* @__PURE__ */ (void 0)("section", {
				className: "rounded-xl border-2 border-emerald-500/40 bg-emerald-500/5 p-6 shadow-xs w-full space-y-4",
				children: [
					/* @__PURE__ */ (void 0)("div", {
						className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-emerald-500/20 pb-3",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "flex size-9 items-center justify-center rounded-lg bg-emerald-500 text-white shadow-xs",
								children: /* @__PURE__ */ (void 0)(CircleCheck, { className: "size-5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 429,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 428,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h3", {
								className: "font-display text-lg font-bold text-foreground",
								children: "Payload Successfully Decoded"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 432,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									"Decoded using ",
									/* @__PURE__ */ (void 0)("span", {
										className: "font-semibold text-foreground",
										children: selectedModel.name
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 436,
										columnNumber: 35
									}, this),
									" in",
									" ",
									/* @__PURE__ */ (void 0)("span", {
										className: "font-mono font-semibold text-emerald-600",
										children: [extractionTimeMs.toFixed(1), " ms"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 437,
										columnNumber: 21
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 435,
								columnNumber: 19
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 431,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 427,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-2",
							children: /* @__PURE__ */ (void 0)(Button, {
								size: "sm",
								variant: "outline",
								onClick: handleCopy,
								className: "gap-1.5 text-xs bg-card font-semibold",
								children: [copied ? /* @__PURE__ */ (void 0)(Check, { className: "size-3.5 text-emerald-600" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 444,
									columnNumber: 29
								}, this) : /* @__PURE__ */ (void 0)(Copy, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 444,
									columnNumber: 79
								}, this), /* @__PURE__ */ (void 0)("span", { children: copied ? "Copied!" : "Copy Secret" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 445,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 443,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 442,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 426,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "rounded-xl border border-emerald-500/30 bg-card p-4",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center justify-between text-[11px] text-muted-foreground mb-2",
							children: [/* @__PURE__ */ (void 0)("span", {
								className: "font-semibold uppercase tracking-wider",
								children: "Decoded Plaintext:"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 453,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("span", {
								className: "font-mono",
								children: [
									recoveredSecret.length,
									" chars · ",
									new TextEncoder().encode(recoveredSecret).length,
									" bytes"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 454,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 452,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("pre", {
							className: "whitespace-pre-wrap font-mono text-sm leading-relaxed text-foreground bg-muted/30 p-3.5 rounded-lg border border-border/50 max-h-60 overflow-y-auto",
							children: recoveredSecret
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 458,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 451,
						columnNumber: 13
					}, this),
					expectedSecret && /* @__PURE__ */ (void 0)("div", {
						className: cn("rounded-lg p-3 text-xs flex items-center justify-between", expectedSecret === recoveredSecret ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300" : "bg-red-500/10 border border-red-500/30 text-red-600"),
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-2",
							children: [expectedSecret === recoveredSecret ? /* @__PURE__ */ (void 0)(ShieldCheck, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 466,
								columnNumber: 57
							}, this) : /* @__PURE__ */ (void 0)(ShieldAlert, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 466,
								columnNumber: 94
							}, this), /* @__PURE__ */ (void 0)("span", {
								className: "font-semibold",
								children: expectedSecret === recoveredSecret ? "Bit-Exact Identity Verified (100% Match, BER = 0.00%)" : "Bit Difference Detected with Expected Plaintext"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 467,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 465,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("span", {
							className: "font-mono text-[11px]",
							children: [
								"BER: ",
								bitErrorRate(expectedSecret, recoveredSecret).toFixed(4),
								"%"
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 471,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 464,
						columnNumber: 32
					}, this),
					extractedMetrics && /* @__PURE__ */ (void 0)("div", {
						className: "rounded-lg border border-border bg-card p-4",
						children: [/* @__PURE__ */ (void 0)("h4", {
							className: "font-display text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3",
							children: "Stego Image Empirical Quality Metrics (vs Original Cover)"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 478,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)(MetricGrid, { metrics: extractedMetrics }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 481,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 477,
						columnNumber: 34
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 425,
				columnNumber: 38
			}, this),
			probeResults && /* @__PURE__ */ (void 0)("section", {
				className: "rounded-xl border border-border bg-card p-5 shadow-xs w-full",
				children: [
					/* @__PURE__ */ (void 0)("h3", {
						className: "font-display text-base font-bold text-ink mb-1",
						children: "Multi-Model Algorithm Probe Results"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 487,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("p", {
						className: "text-xs text-muted-foreground mb-4",
						children: "Tested each of the 6 baseline reproduction pipelines against the uploaded image with your passphrase."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 490,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
						children: probeResults.map((res) => /* @__PURE__ */ (void 0)("div", {
							className: cn("rounded-lg border p-3.5 text-xs transition-all", res.success ? "border-emerald-500/40 bg-emerald-500/5 shadow-xs" : "border-border bg-muted/20 opacity-70"),
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "font-semibold text-foreground",
									children: res.modelName
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 497,
									columnNumber: 21
								}, this), res.success ? /* @__PURE__ */ (void 0)("span", {
									className: "inline-flex items-center gap-1 rounded bg-emerald-500/20 px-2 py-0.5 font-bold text-[10px] text-emerald-600",
									children: [/* @__PURE__ */ (void 0)(CircleCheck, { className: "size-3" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 499,
										columnNumber: 25
									}, this), "SUCCESS"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 498,
									columnNumber: 36
								}, this) : /* @__PURE__ */ (void 0)("span", {
									className: "inline-flex items-center gap-1 rounded bg-red-500/10 px-2 py-0.5 font-semibold text-[10px] text-red-500",
									children: [/* @__PURE__ */ (void 0)(CircleX, { className: "size-3" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 502,
										columnNumber: 25
									}, this), "REJECTED"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 501,
									columnNumber: 33
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 496,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "mt-2 text-[11px] text-muted-foreground font-mono",
								children: res.success ? /* @__PURE__ */ (void 0)("span", {
									className: "text-emerald-700 dark:text-emerald-300",
									children: [
										"Extracted ",
										res.secret?.length,
										" chars in ",
										res.durationMs.toFixed(1),
										" ms"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 507,
									columnNumber: 36
								}, this) : /* @__PURE__ */ (void 0)("span", { children: "HMAC / Magic mismatch" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 509,
									columnNumber: 33
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 506,
								columnNumber: 19
							}, this)]
						}, res.modelId, true, {
							fileName: _jsxFileName,
							lineNumber: 495,
							columnNumber: 40
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 494,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 486,
				columnNumber: 26
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "rounded-xl border border-border bg-card p-5 shadow-xs w-full",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2 mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "size-4 text-primary" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 518,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "font-display text-base font-semibold text-ink",
						children: "Algorithm Integrity Verification Proof"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 519,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 517,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-4 sm:grid-cols-3 text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-lg border border-border/60 bg-muted/20 p-3.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-mono text-[11px] font-bold text-primary block mb-1",
								children: "01. PIXEL EMBEDDING"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 525,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-muted-foreground leading-relaxed text-[11px]",
								children: "Payload bytes are converted to bit streams and encoded into the blue channel LSBs using Hamming (7,3) coset syndrome matching or keyed Fisher-Yates permutations."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 528,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 524,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-lg border border-border/60 bg-muted/20 p-3.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-mono text-[11px] font-bold text-primary block mb-1",
								children: "02. ZERO STORED STATE"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 534,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-muted-foreground leading-relaxed text-[11px]",
								children: "Decoding does not copy or read previous session memory. The secret is extracted exclusively from the RGB pixel values of the uploaded image file."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 537,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 533,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-lg border border-border/60 bg-muted/20 p-3.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-mono text-[11px] font-bold text-primary block mb-1",
								children: "03. AUTHENTICATION SENSITIVITY"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 543,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-muted-foreground leading-relaxed text-[11px]",
								children: "Modifying even a single character of the passphrase alters the SHA-256 HKDF keystream, causing immediate checksum rejection."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 546,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 542,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 523,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 516,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 235,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 224,
		columnNumber: 10
	}, this);
}
//#endregion
export { DecoderPage as component };
