import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as ArrowUpRight, E as FileSpreadsheet, F as Clock, S as History, h as Play, j as Download, o as Trash2, r as Trophy, y as Layers } from "../_libs/lucide-react.mjs";
import { S as PageHeader, b as AppShell, i as MODELS, w as useSession, x as Button } from "./router-BL6NwKuj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/history-CyOzYwYk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HistoryPage() {
	const { history, removeBatchRun, clearHistory, setBench } = useSession();
	const [hasMounted, setHasMounted] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		setHasMounted(true);
	}, []);
	const loadRunIntoLab = (record) => {
		setBench(record.rows);
		navigate({ to: "/batch-lab" });
	};
	const downloadRunJson = (record) => {
		const blob = new Blob([JSON.stringify(record, null, 2)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `ares_batch_run_${record.id}.json`;
		a.click();
		URL.revokeObjectURL(url);
	};
	const downloadRunCsv = (record) => {
		const lines = [[
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
			"Recovery Success"
		].join(",")];
		for (const row of record.rows) {
			const mDef = MODELS.find((m) => m.id === row.modelId);
			lines.push([
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
				row.metrics.recovery ? "PASS" : "FAIL"
			].join(","));
		}
		const blob = new Blob([lines.join("\n")], { type: "text/csv" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `ares_batch_run_${record.id}.csv`;
		a.click();
		URL.revokeObjectURL(url);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: "Audit & Archive",
		title: "Benchmark History",
		description: "Records of historical multi-image benchmark runs, empirical metrics, and statistical significance results. Restore past sessions directly into the Batch Lab for re-inspection.",
		actions: hasMounted && history.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "outline",
			size: "sm",
			onClick: clearHistory,
			className: "gap-1.5 text-xs text-muted-foreground hover:text-red-500",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
				"Clear History (",
				history.length,
				")"
			] })]
		}) : null
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "w-full",
		children: !hasMounted || history.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-[360px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card p-12 text-center w-full",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "size-6" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-base font-semibold text-ink",
					children: "No Past Benchmark Records"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted-foreground max-w-md",
					children: "Executed multi-image batch runs will automatically be recorded here with complete per-image tables and statistical summaries."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => navigate({ to: "/batch-lab" }),
					className: "mt-5 gap-2 bg-primary text-primary-foreground font-medium text-xs shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5 fill-current" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Launch Batch Lab" })]
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-4 w-full",
			children: history.map((record) => {
				const bestModel = MODELS.find((m) => m.id === record.bestModelId);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col justify-between gap-4 rounded-xl border border-border bg-card p-5 shadow-xs transition-all hover:border-primary/40 md:flex-row md:items-center w-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-base font-semibold text-ink",
								children: record.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1 text-[11px] font-mono text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3" }), record.dateStr]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex flex-wrap items-center gap-3 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "rounded bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground",
									children: [
										record.imageCount,
										" Images · ",
										record.modelCount,
										" Models · ",
										record.rows.length,
										" Total Runs"
									]
								}),
								bestModel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1 text-emerald-600 font-semibold font-mono text-[11px]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-3.5 text-amber-500" }),
										"Top Model: ",
										bestModel.name
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-[11px] text-muted-foreground",
									children: ["Mean PSNR: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
										className: "text-foreground",
										children: [record.avgPsnr, " dB"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-[11px] text-muted-foreground",
									children: ["Mean SSIM: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground",
										children: record.avgSsim
									})]
								})
							]
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex shrink-0 items-center gap-2 pt-2 md:pt-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								onClick: () => loadRunIntoLab(record),
								className: "gap-1.5 text-xs bg-primary text-primary-foreground font-medium",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Load in Batch Lab" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => downloadRunCsv(record),
								className: "gap-1.5 text-xs",
								title: "Export CSV",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "size-3.5 text-emerald-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CSV" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => downloadRunJson(record),
								className: "gap-1.5 text-xs",
								title: "Export JSON",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5 text-blue-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "JSON" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => removeBatchRun(record.id),
								className: "text-muted-foreground hover:text-red-500 p-2",
								title: "Delete record",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
							})
						]
					})]
				}, record.id);
			})
		})
	})] });
}
//#endregion
export { HistoryPage as component };
