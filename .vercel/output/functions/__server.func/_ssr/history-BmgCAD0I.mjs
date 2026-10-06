import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Download, P as Clock, T as FileSpreadsheet, a as Trash2, m as Play, r as Trophy, v as Layers, x as History, z as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { S as PageHeader, b as AppShell, i as MODELS, w as useSession, x as Button } from "./router-Cp-zr37S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/history-BmgCAD0I.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/history.tsx?tsr-split=component";
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
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, {
		kicker: "Audit & Archive",
		title: "Benchmark History",
		description: "Records of historical multi-image benchmark runs, empirical metrics, and statistical significance results. Restore past sessions directly into the Batch Lab for re-inspection.",
		actions: hasMounted && history.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
			variant: "outline",
			size: "sm",
			onClick: clearHistory,
			className: "gap-1.5 text-xs text-muted-foreground hover:text-red-500",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-3.5" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 56,
				columnNumber: 15
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
				"Clear History (",
				history.length,
				")"
			] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 57,
				columnNumber: 15
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 55,
			columnNumber: 304
		}, this) : null
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 55,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "w-full",
		children: !hasMounted || history.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex min-h-[360px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card p-12 text-center w-full",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-3",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(History, { className: "size-6" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 63,
						columnNumber: 15
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 62,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
					className: "font-display text-base font-semibold text-ink",
					children: "No Past Benchmark Records"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 65,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-1 text-xs text-muted-foreground max-w-md",
					children: "Executed multi-image batch runs will automatically be recorded here with complete per-image tables and statistical summaries."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 68,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					onClick: () => navigate({ to: "/batch-lab" }),
					className: "mt-5 gap-2 bg-primary text-primary-foreground font-medium text-xs shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Play, { className: "size-3.5 fill-current" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 75,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Launch Batch Lab" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 76,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 72,
					columnNumber: 13
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 61,
			columnNumber: 48
		}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "space-y-4 w-full",
			children: history.map((record) => {
				const bestModel = MODELS.find((m) => m.id === record.bestModelId);
				return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-col justify-between gap-4 rounded-xl border border-border bg-card p-5 shadow-xs transition-all hover:border-primary/40 md:flex-row md:items-center w-full",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-start gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layers, { className: "size-5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 84,
								columnNumber: 21
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 83,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "font-display text-base font-semibold text-ink",
								children: record.name
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 88,
								columnNumber: 23
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "flex items-center gap-1 text-[11px] font-mono text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Clock, { className: "size-3" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 92,
									columnNumber: 25
								}, this), record.dateStr]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 91,
								columnNumber: 23
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 87,
							columnNumber: 21
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-2 flex flex-wrap items-center gap-3 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "rounded bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground",
									children: [
										record.imageCount,
										" Images · ",
										record.modelCount,
										" Models · ",
										record.rows.length,
										" Total Runs"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 98,
									columnNumber: 23
								}, this),
								bestModel && /* @__PURE__ */ (void 0)("span", {
									className: "inline-flex items-center gap-1 text-emerald-600 font-semibold font-mono text-[11px]",
									children: [
										/* @__PURE__ */ (void 0)(Trophy, { className: "size-3.5 text-amber-500" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 103,
											columnNumber: 27
										}, this),
										"Top Model: ",
										bestModel.name
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 102,
									columnNumber: 37
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-mono text-[11px] text-muted-foreground",
									children: ["Mean PSNR: ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
										className: "text-foreground",
										children: [record.avgPsnr, " dB"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 108,
										columnNumber: 36
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 107,
									columnNumber: 23
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-mono text-[11px] text-muted-foreground",
									children: ["Mean SSIM: ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
										className: "text-foreground",
										children: record.avgSsim
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 111,
										columnNumber: 36
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 110,
									columnNumber: 23
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 97,
							columnNumber: 21
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 86,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 82,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex shrink-0 items-center gap-2 pt-2 md:pt-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								size: "sm",
								onClick: () => loadRunIntoLab(record),
								className: "gap-1.5 text-xs bg-primary text-primary-foreground font-medium",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Load in Batch Lab" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 120,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowUpRight, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 121,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 119,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => downloadRunCsv(record),
								className: "gap-1.5 text-xs",
								title: "Export CSV",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileSpreadsheet, { className: "size-3.5 text-emerald-600" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 125,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "CSV" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 126,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 124,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => downloadRunJson(record),
								className: "gap-1.5 text-xs",
								title: "Export JSON",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, { className: "size-3.5 text-blue-500" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 130,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "JSON" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 131,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 129,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => removeBatchRun(record.id),
								className: "text-muted-foreground hover:text-red-500 p-2",
								title: "Delete record",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 135,
									columnNumber: 21
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 134,
								columnNumber: 19
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 118,
						columnNumber: 17
					}, this)]
				}, record.id, true, {
					fileName: _jsxFileName,
					lineNumber: 81,
					columnNumber: 18
				}, this);
			})
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 78,
			columnNumber: 20
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 60,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 54,
		columnNumber: 10
	}, this);
}
//#endregion
export { HistoryPage as component };
