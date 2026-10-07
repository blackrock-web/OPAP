import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as HardDrive, O as FileCode, R as Check, l as SlidersVertical, m as RotateCcw, o as Trash2, u as Shield } from "../_libs/lucide-react.mjs";
import { C as cn, S as PageHeader, _ as Textarea, b as AppShell, n as METRIC_OPTIONS, v as Label, w as useSession, x as Button, y as Input } from "./router-BL6NwKuj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-ChakeDNu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: "Configuration",
		title: "Settings & Defaults",
		description: "Configure research parameters, statistical significance confidence intervals, default cryptographic keys, and academic export formatting.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				size: "sm",
				onClick: handleReset,
				className: "gap-1.5 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Reset Defaults" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				onClick: saveAll,
				className: "gap-1.5 text-xs bg-primary text-primary-foreground font-semibold",
				children: [savedNotice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersVertical, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: savedNotice ? "Saved!" : "Save Changes" })]
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border bg-card p-5 shadow-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-base font-semibold text-ink",
						children: "Benchmark Defaults"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "default-payload",
							className: "text-xs font-semibold text-muted-foreground",
							children: "Default Secret Payload"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "default-payload",
							value: payload,
							onChange: (e) => setPayload(e.target.value),
							rows: 3,
							className: "mt-1.5 text-xs font-mono"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-[11px] text-muted-foreground",
							children: "This exact text payload is populated when opening new Batch Lab benchmark runs."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "default-pw",
							className: "text-xs font-semibold text-muted-foreground",
							children: "Default Passphrase / Key"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "default-pw",
							type: "password",
							value: passphrase,
							onChange: (e) => setPassphrase(e.target.value),
							className: "mt-1.5 text-xs font-mono"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs font-semibold text-muted-foreground",
							children: "Default Image Resolution Cap"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1.5 grid grid-cols-2 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setResolutionCap(384),
								className: cn("rounded-md border p-2 text-center text-xs font-medium transition-all", resolutionCap === 384 ? "border-primary bg-primary/10 text-primary font-semibold" : "border-border bg-card text-muted-foreground hover:bg-muted"),
								children: "384 px (Standard)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setResolutionCap(512),
								className: cn("rounded-md border p-2 text-center text-xs font-medium transition-all", resolutionCap === 512 ? "border-primary bg-primary/10 text-primary font-semibold" : "border-border bg-card text-muted-foreground hover:bg-muted"),
								children: "512 px (Full Detail)"
							})]
						})] })]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border bg-card p-5 shadow-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersVertical, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-base font-semibold text-ink",
						children: "Statistical Significance Parameters"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs font-semibold text-muted-foreground",
							children: "Default Confidence Level (α)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1.5 grid grid-cols-2 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setAlpha(.05),
								className: cn("rounded-md border p-2 text-center text-xs font-medium transition-all", alpha === .05 ? "border-primary bg-primary/10 text-primary font-semibold" : "border-border bg-card text-muted-foreground hover:bg-muted"),
								children: "α = 0.05 (95% Confidence)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setAlpha(.01),
								className: cn("rounded-md border p-2 text-center text-xs font-medium transition-all", alpha === .01 ? "border-primary bg-primary/10 text-primary font-semibold" : "border-border bg-card text-muted-foreground hover:bg-muted"),
								children: "α = 0.01 (99% Confidence)"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-[11px] text-muted-foreground",
							children: "Sets the significance threshold for Friedman and Nemenyi post-hoc Critical Difference tests."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs font-semibold text-muted-foreground",
							children: "Primary Ranking Metric"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: metric,
							onChange: (e) => setMetric(e.target.value),
							className: "mt-1.5 flex h-9 w-full rounded-md border border-border bg-card px-3 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
							children: METRIC_OPTIONS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: m.id,
								children: [
									m.name,
									" (",
									m.unit,
									")"
								]
							}, m.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-[11px] text-muted-foreground",
							children: "Determines the default metric sorted and evaluated in the post-hoc CD diagram."
						})
					] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border bg-card p-5 shadow-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCode, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-base font-semibold text-ink",
						children: "LaTeX Export Formatting"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "latex-cap",
						className: "text-xs font-semibold text-muted-foreground",
						children: "Table Caption"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "latex-cap",
						value: latexCaption,
						onChange: (e) => setLatexCaption(e.target.value),
						className: "mt-1.5 text-xs"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "latex-lbl",
						className: "text-xs font-semibold text-muted-foreground",
						children: "Table Label"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "latex-lbl",
						value: latexLabel,
						onChange: (e) => setLatexLabel(e.target.value),
						className: "mt-1.5 text-xs font-mono"
					})] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border bg-card p-5 shadow-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HardDrive, { className: "size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-base font-semibold text-ink",
						children: "Storage & Cache"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-medium text-foreground",
						children: ["Historical Benchmark Sessions: ", hasMounted ? `${history.length} runs stored locally` : "0 runs stored locally"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-muted-foreground",
						children: "Saved in browser localStorage for offline durability."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						onClick: clearHistory,
						disabled: !hasMounted || history.length === 0,
						className: "gap-1.5 text-xs text-muted-foreground hover:text-red-500",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Clear Stored History" })]
					})]
				})]
			})
		]
	})] });
}
//#endregion
export { SettingsPage as component };
