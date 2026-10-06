import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { D as FileCode, L as Check, S as HardDrive, a as Trash2, c as SlidersVertical, l as Shield, p as RotateCcw } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { C as cn, S as PageHeader, _ as Textarea, b as AppShell, n as METRIC_OPTIONS, v as Label, w as useSession, x as Button, y as Input } from "./router-Cp-zr37S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-DTpCJ-OM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/settings.tsx?tsr-split=component";
function SettingsPage() {
	const { settings, updateSettings, resetSettings, clearHistory, history } = useSession();
	const [hasMounted, setHasMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setHasMounted(true);
	}, []);
	const [savedNotice, setSavedNotice] = (0, import_react.useState)(false);
	const [payload, setPayload] = (0, import_react.useState)(settings.defaultPayload);
	const [passphrase, setPassphrase] = (0, import_react.useState)(settings.defaultPassphrase);
	const [resolutionCap, setResolutionCap] = (0, import_react.useState)(settings.resolutionCap);
	const [alpha, setAlpha] = (0, import_react.useState)(settings.defaultAlpha);
	const [metric, setMetric] = (0, import_react.useState)(settings.defaultMetric);
	const [latexCaption, setLatexCaption] = (0, import_react.useState)(settings.latexCaption);
	const [latexLabel, setLatexLabel] = (0, import_react.useState)(settings.latexLabel);
	(0, import_react.useEffect)(() => {
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
			latexLabel
		});
		setSavedNotice(true);
		setTimeout(() => setSavedNotice(false), 2500);
	};
	const handleReset = () => {
		resetSettings();
		setPayload("ARES research secret payload - verified cryptographic integrity");
		setPassphrase("lab-passphrase-2025");
		setResolutionCap(384);
		setAlpha(.05);
		setMetric("psnr");
		setLatexCaption("Comparative performance metrics across steganography models");
		setLatexLabel("tab:stego_comparison");
		setSavedNotice(true);
		setTimeout(() => setSavedNotice(false), 2500);
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, {
		kicker: "Configuration",
		title: "Settings & Defaults",
		description: "Configure research parameters, statistical significance confidence intervals, default cryptographic keys, and academic export formatting.",
		actions: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				variant: "outline",
				size: "sm",
				onClick: handleReset,
				className: "gap-1.5 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RotateCcw, { className: "size-3.5" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 68,
					columnNumber: 15
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Reset Defaults" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 69,
					columnNumber: 15
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 67,
				columnNumber: 13
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				size: "sm",
				onClick: saveAll,
				className: "gap-1.5 text-xs bg-primary text-primary-foreground font-semibold",
				children: [savedNotice ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "size-3.5" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 72,
					columnNumber: 30
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SlidersVertical, { className: "size-3.5" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 72,
					columnNumber: 63
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: savedNotice ? "Saved!" : "Save Changes" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 73,
					columnNumber: 15
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 71,
				columnNumber: 13
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 66,
			columnNumber: 231
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 66,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6 w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "rounded-xl border border-border bg-card p-5 shadow-xs",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Shield, { className: "size-4 text-primary" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 81,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "font-display text-base font-semibold text-ink",
						children: "Benchmark Defaults"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 82,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 80,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
							htmlFor: "default-payload",
							className: "text-xs font-semibold text-muted-foreground",
							children: "Default Secret Payload"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 89,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
							id: "default-payload",
							value: payload,
							onChange: (e) => setPayload(e.target.value),
							rows: 3,
							className: "mt-1.5 text-xs font-mono"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 92,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-1 text-[11px] text-muted-foreground",
							children: "This exact text payload is populated when opening new Batch Lab benchmark runs."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 93,
							columnNumber: 15
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 88,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid gap-4 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
							htmlFor: "default-pw",
							className: "text-xs font-semibold text-muted-foreground",
							children: "Default Passphrase / Key"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 100,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
							id: "default-pw",
							type: "password",
							value: passphrase,
							onChange: (e) => setPassphrase(e.target.value),
							className: "mt-1.5 text-xs font-mono"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 103,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 99,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
							className: "text-xs font-semibold text-muted-foreground",
							children: "Default Image Resolution Cap"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 107,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-1.5 grid grid-cols-2 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => setResolutionCap(384),
								className: cn("rounded-md border p-2 text-center text-xs font-medium transition-all", resolutionCap === 384 ? "border-primary bg-primary/10 text-primary font-semibold" : "border-border bg-card text-muted-foreground hover:bg-muted"),
								children: "384 px (Standard)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 111,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => setResolutionCap(512),
								className: cn("rounded-md border p-2 text-center text-xs font-medium transition-all", resolutionCap === 512 ? "border-primary bg-primary/10 text-primary font-semibold" : "border-border bg-card text-muted-foreground hover:bg-muted"),
								children: "512 px (Full Detail)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 114,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 110,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 106,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 98,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 87,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 79,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "rounded-xl border border-border bg-card p-5 shadow-xs",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SlidersVertical, { className: "size-4 text-primary" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 126,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "font-display text-base font-semibold text-ink",
						children: "Statistical Significance Parameters"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 127,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 125,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-4 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
							className: "text-xs font-semibold text-muted-foreground",
							children: "Default Confidence Level (α)"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 134,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-1.5 grid grid-cols-2 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => setAlpha(.05),
								className: cn("rounded-md border p-2 text-center text-xs font-medium transition-all", alpha === .05 ? "border-primary bg-primary/10 text-primary font-semibold" : "border-border bg-card text-muted-foreground hover:bg-muted"),
								children: "α = 0.05 (95% Confidence)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 138,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => setAlpha(.01),
								className: cn("rounded-md border p-2 text-center text-xs font-medium transition-all", alpha === .01 ? "border-primary bg-primary/10 text-primary font-semibold" : "border-border bg-card text-muted-foreground hover:bg-muted"),
								children: "α = 0.01 (99% Confidence)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 141,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 137,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-1 text-[11px] text-muted-foreground",
							children: "Sets the significance threshold for Friedman and Nemenyi post-hoc Critical Difference tests."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 145,
							columnNumber: 15
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 133,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
							className: "text-xs font-semibold text-muted-foreground",
							children: "Primary Ranking Metric"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 151,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
							value: metric,
							onChange: (e) => setMetric(e.target.value),
							className: "mt-1.5 flex h-9 w-full rounded-md border border-border bg-card px-3 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
							children: METRIC_OPTIONS.map((m) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: m.id,
								children: [
									m.name,
									" (",
									m.unit,
									")"
								]
							}, m.id, true, {
								fileName: _jsxFileName,
								lineNumber: 155,
								columnNumber: 42
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 154,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-1 text-[11px] text-muted-foreground",
							children: "Determines the default metric sorted and evaluated in the post-hoc CD diagram."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 159,
							columnNumber: 15
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 150,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 132,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 124,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "rounded-xl border border-border bg-card p-5 shadow-xs",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileCode, { className: "size-4 text-primary" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 169,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "font-display text-base font-semibold text-ink",
						children: "LaTeX Export Formatting"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 170,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 168,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-4 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
						htmlFor: "latex-cap",
						className: "text-xs font-semibold text-muted-foreground",
						children: "Table Caption"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 177,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
						id: "latex-cap",
						value: latexCaption,
						onChange: (e) => setLatexCaption(e.target.value),
						className: "mt-1.5 text-xs"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 180,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 176,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
						htmlFor: "latex-lbl",
						className: "text-xs font-semibold text-muted-foreground",
						children: "Table Label"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 184,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
						id: "latex-lbl",
						value: latexLabel,
						onChange: (e) => setLatexLabel(e.target.value),
						className: "mt-1.5 text-xs font-mono"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 187,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 183,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 175,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 167,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "rounded-xl border border-border bg-card p-5 shadow-xs",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HardDrive, { className: "size-4 text-muted-foreground" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 195,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "font-display text-base font-semibold text-ink",
						children: "Storage & Cache"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 196,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 194,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "font-medium text-foreground",
						children: ["Historical Benchmark Sessions: ", hasMounted ? `${history.length} runs stored locally` : "0 runs stored locally"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 203,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-[11px] text-muted-foreground",
						children: "Saved in browser localStorage for offline durability."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 206,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 202,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "outline",
						size: "sm",
						onClick: clearHistory,
						disabled: !hasMounted || history.length === 0,
						className: "gap-1.5 text-xs text-muted-foreground hover:text-red-500",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 212,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Clear Stored History" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 213,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 211,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 201,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 193,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 77,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 65,
		columnNumber: 10
	}, this);
}
//#endregion
export { SettingsPage as component };
