import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as FileSearch, L as CircleCheck, M as Cpu, N as Copy, R as Check, V as ArrowRight, _ as LockKeyhole, a as TrendingUp, c as Sparkles, d as ShieldCheck, g as LockOpen, h as Play, j as Download, r as Trophy, t as Zap, w as FlaskConical, z as ChartColumn } from "../_libs/lucide-react.mjs";
import { C as cn, S as PageHeader, _ as Textarea, a as decodeWithModel, b as AppShell, g as imageToDataUrl, i as MODELS, m as fileToImage, o as encodeWithModel, r as generateSampleImage, s as modelById, v as Label, w as useSession, x as Button, y as Input } from "./router-BL6NwKuj.mjs";
import { t as MetricGrid } from "./metric-grid-IGFoT9gk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Bw9t94Mh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ABLATION_MODEL_IDS = [
	"ablation_m1",
	"ablation_m2",
	"ablation_m3",
	"ablation_m4",
	"ares_hybrid_inn",
	"ablation_m5"
];
var BASELINE_EVAL_MODEL_IDS = [
	"paper_model_02",
	"paper_model_01",
	"paper_model_04",
	"ablation_m1",
	"ares_hybrid_inn",
	"ablation_m5"
];
function AblationStudyPanel({ testImage }) {
	const [rows, setRows] = (0, import_react.useState)([]);
	const [baselineRows, setBaselineRows] = (0, import_react.useState)([]);
	const [running, setRunning] = (0, import_react.useState)(false);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const runLiveAblation = (0, import_react.useCallback)(async () => {
		setRunning(true);
		const img = testImage ?? generateSampleImage("portrait", 256, 256);
		const secret = "ARES-EMD-OPAP-INN Research Benchmark Payload 2026";
		const password = "ResearchGradePassword!";
		const updatedRows = [];
		for (const mid of ABLATION_MODEL_IDS) {
			const model = modelById(mid);
			const t0 = performance.now();
			const out = await encodeWithModel(model, img, secret, password);
			const runtime = performance.now() - t0;
			updatedRows.push({
				id: model.id,
				name: model.name,
				short: model.short,
				description: model.note,
				psnr: Number(out.metrics.psnr.toFixed(2)),
				ssim: Number(out.metrics.ssim.toFixed(4)),
				mse: Number(out.metrics.mse.toFixed(4)),
				capacityBits: out.availableCapacityBits,
				payloadBits: out.payloadBits,
				modifiedPixels: out.modifiedPixels,
				modifiedPixelPct: Number((out.metrics.modifiedPixelPct ?? 0).toFixed(2)),
				averageAbsError: Number((out.metrics.averageAbsError ?? 0).toFixed(4)),
				maxPixelError: out.maxPixelError,
				extractionAccuracy: out.metrics.recovery ? 100 : 0,
				opapOptimizedCount: out.metrics.opapOptimizedCount ?? 0,
				runtimeMs: Number(runtime.toFixed(1)),
				authStatus: out.metrics.authStatus ?? "NONE"
			});
		}
		const updatedBaselines = [];
		for (const mid of BASELINE_EVAL_MODEL_IDS) {
			const model = modelById(mid);
			const out = await encodeWithModel(model, img, secret, password);
			updatedBaselines.push({
				id: model.id,
				algorithm: model.name,
				type: model.usesInn ? "INN + Adaptive EMD-OPAP" : model.usesEmd ? "EMD + OPAP" : model.usesHamming ? "Hamming(7,3) Adaptive LSB" : model.usesPm1 ? "Adaptive ±1 LSB" : "Keyed LSB Substitution",
				bpp: Number(out.metrics.bpp.toFixed(4)),
				psnr: Number(out.metrics.psnr.toFixed(2)),
				ssim: Number(out.metrics.ssim.toFixed(4)),
				mse: Number(out.metrics.mse.toFixed(4)),
				maxErr: out.maxPixelError,
				modPct: Number((out.metrics.modifiedPixelPct ?? 0).toFixed(2)),
				recovery: out.metrics.recovery,
				crypto: model.usesAesGcm ? "AES-256-GCM" : "Keyed MAC"
			});
		}
		setRows(updatedRows);
		setBaselineRows(updatedBaselines);
		setRunning(false);
	}, [testImage]);
	(0, import_react.useEffect)(() => {
		runLiveAblation();
	}, [runLiveAblation]);
	const validRows = rows.filter((r) => r.extractionAccuracy === 100);
	const bestRow = validRows.length > 0 ? validRows.reduce((best, cur) => {
		if (cur.psnr !== best.psnr) return cur.psnr > best.psnr ? cur : best;
		return cur.mse < best.mse ? cur : best;
	}, validRows[0]) : null;
	const validBaselineRows = baselineRows.filter((b) => b.recovery);
	const bestBaselineRow = validBaselineRows.length > 0 ? validBaselineRows.reduce((best, cur) => {
		if (cur.psnr !== best.psnr) return cur.psnr > best.psnr ? cur : best;
		return cur.mse < best.mse ? cur : best;
	}, validBaselineRows[0]) : null;
	function copyLatexTable() {
		let latex = `% ARES-EMD-OPAP Ablation Study Table\n`;
		latex += `\\begin{table}[htbp]\n`;
		latex += `\\centering\n`;
		latex += `\\caption{Ablation Study of Proposed ARES-EMD-OPAP Framework}\n`;
		latex += `\\begin{tabular}{lcccccc}\n`;
		latex += `\\hline\n`;
		latex += `\\textbf{Model} & \\textbf{PSNR (dB)} & \\textbf{SSIM} & \\textbf{MSE} & \\textbf{Mod Pix (\\%)} & \\textbf{Recovery} & \\textbf{Time (ms)} \\\\\n`;
		latex += `\\hline\n`;
		for (const r of rows) latex += `${r.short} & ${r.psnr} & ${r.ssim} & ${r.mse} & ${r.modifiedPixelPct}\\% & ${r.extractionAccuracy}\\% & ${r.runtimeMs} \\\\\n`;
		latex += `\\hline\n`;
		latex += `\\end{tabular}\n`;
		latex += `\\end{table}\n`;
		navigator.clipboard.writeText(latex);
		setCopied(true);
		setTimeout(() => setCopied(false), 2e3);
	}
	function downloadCsv() {
		let csv = "Model,Short,Description,PSNR_dB,SSIM,MSE,Capacity_Bits,Payload_Bits,Modified_Pixels,Mod_Pct,Avg_Abs_Error,Max_Pixel_Error,Accuracy_Pct,OPAP_Optimized,Runtime_ms,Auth_Status\n";
		for (const r of rows) csv += `"${r.name}","${r.short}","${r.description}",${r.psnr},${r.ssim},${r.mse},${r.capacityBits},${r.payloadBits},${r.modifiedPixels},${r.modifiedPixelPct},${r.averageAbsError},${r.maxPixelError},${r.extractionAccuracy},${r.opapOptimizedCount},${r.runtimeMs},"${r.authStatus}"\n`;
		const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "ares_emd_opap_ablation_results.csv";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-border bg-card p-5 shadow-xs",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/70 pb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary font-mono",
							children: "Section 16 Specification"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-base font-bold text-ink",
							children: "INN & Hybrid CNN Ablation Study + Baseline Comparison"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "Evaluates the progressive contribution of EMD, OPAP, CNN features, attention maps, INN reversible wavelet coupling, Hybrid INN-CNN, and ARES-EMD-OPAP-INN."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								onClick: copyLatexTable,
								className: "gap-1.5 h-8 px-2.5 text-xs font-medium",
								title: "Copy LaTeX table for research publication",
								children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5 text-emerald-600" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: copied ? "Copied LaTeX" : "Copy LaTeX" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								onClick: downloadCsv,
								className: "gap-1.5 h-8 px-2.5 text-xs font-medium",
								title: "Download CSV results",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Export CSV" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								onClick: runLiveAblation,
								disabled: running,
								className: "gap-1.5 h-8 px-3 text-xs font-semibold bg-primary text-primary-foreground shadow-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: running ? "Running Live Ablation..." : "Run Live Ablation" })]
							})
						]
					})]
				}),
				bestRow && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "size-4 text-emerald-600 shrink-0" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-emerald-900 dark:text-emerald-300",
								children: "Best Model Result (100% Recovery, Zero False Positives):"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display font-bold text-foreground",
								children: bestRow.name
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 font-mono text-[11px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-bold text-emerald-700 dark:text-emerald-400",
								children: [
									"PSNR: ",
									bestRow.psnr.toFixed(2),
									" dB"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["SSIM: ", bestRow.ssim.toFixed(4)] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["MSE: ", bestRow.mse.toFixed(4)] })
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-muted/40 font-mono text-[11px] text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2.5",
									children: "Ablation / Hybrid Model"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2.5",
									children: "Distortion Guidance"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2.5",
									children: "PSNR (dB)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2.5",
									children: "SSIM"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2.5",
									children: "MSE"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2.5",
									children: "Mod. Pixels"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2.5",
									children: "Max Err"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2.5",
									children: "Recovery"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2.5",
									children: "Runtime"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2.5",
									children: "Security"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border/50 font-sans",
							children: rows.map((r, idx) => {
								const isBest = bestRow?.id === r.id;
								const isHybrid = r.id === "ares_hybrid_inn";
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: cn("hover:bg-muted/20 transition-colors", isBest ? "bg-emerald-500/10 font-semibold" : ""),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-3 py-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap items-center gap-1.5",
												children: [
													isBest && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-3.5 text-amber-500 shrink-0" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-bold text-foreground",
														children: r.name
													}),
													isBest && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "rounded bg-emerald-600 text-white px-1.5 py-0.2 text-[9px] font-bold",
														children: "BEST MODEL"
													})
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] text-muted-foreground line-clamp-1",
												children: r.description
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-3 font-mono text-[11px] text-muted-foreground",
											children: idx === 0 ? "None (Unguided)" : idx === 1 ? "CNN + Texture" : idx === 2 ? "CNN + Attention" : isHybrid ? "Hybrid INN-CNN Coupling" : "CNN + Attention + INN Wavelet"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-3 py-3 font-mono text-emerald-700 dark:text-emerald-400 font-bold",
											children: [r.psnr.toFixed(2), " dB"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-3 font-mono text-foreground",
											children: r.ssim.toFixed(4)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-3 font-mono text-muted-foreground",
											children: r.mse.toFixed(4)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-3 py-3 font-mono text-muted-foreground",
											children: [
												r.modifiedPixels,
												" (",
												r.modifiedPixelPct,
												"%)"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-3 py-3 font-mono text-foreground",
											children: ["±", r.maxPixelError]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-3 py-3 font-mono text-emerald-600 font-bold",
											children: [r.extractionAccuracy.toFixed(1), "%"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-3 py-3 font-mono text-muted-foreground",
											children: [r.runtimeMs, "ms"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: cn("rounded px-2 py-0.5 text-[10px] font-mono font-bold", r.authStatus === "AUTHENTICATED" ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300" : "bg-muted text-muted-foreground"),
												children: r.authStatus
											})
										})
									]
								}, r.id);
							})
						})]
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-border bg-card p-5 shadow-xs",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary font-mono",
						children: "Section 17 Specification"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-base font-bold text-ink",
						children: "Live Baseline Methodology Comparison"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: "Direct live experimental comparison computed on the active cover image across classical LSB, adaptive LSB, Hamming(7,3), unguided EMD+OPAP, Hybrid INN-CNN, and ARES-EMD-OPAP-INN."
				})] }), bestBaselineRow && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-4 text-amber-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-semibold text-foreground",
						children: [
							"Best Baseline Method: ",
							bestBaselineRow.algorithm,
							" (",
							bestBaselineRow.psnr.toFixed(2),
							" dB)"
						]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-left text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-muted/40 font-mono text-[11px] text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2.5",
								children: "Method"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2.5",
								children: "Type"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2.5",
								children: "Payload Rate (bpp)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2.5",
								children: "PSNR (dB)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2.5",
								children: "SSIM"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2.5",
								children: "MSE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2.5",
								children: "Mod. Pixels"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2.5",
								children: "Max Error"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2.5",
								children: "Security"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-border/50 font-sans",
						children: baselineRows.map((b) => {
							const isBestBaseline = bestBaselineRow?.id === b.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: cn("hover:bg-muted/20 transition-colors", isBestBaseline ? "bg-emerald-500/10 font-semibold" : ""),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-3 py-3 font-semibold text-foreground flex items-center gap-1.5",
										children: [
											isBestBaseline && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-3.5 text-amber-500 shrink-0" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: b.algorithm }),
											isBestBaseline && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded bg-emerald-600 text-white px-1.5 py-0.2 text-[9px] font-bold",
												children: "BEST MODEL"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-3 text-muted-foreground",
										children: b.type
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-3 py-3 font-mono",
										children: [b.bpp.toFixed(4), " bpp"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-3 py-3 font-mono text-emerald-700 dark:text-emerald-400 font-bold",
										children: [b.psnr.toFixed(2), " dB"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-3 font-mono",
										children: b.ssim.toFixed(4)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-3 font-mono text-muted-foreground",
										children: b.mse.toFixed(4)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-3 py-3 font-mono",
										children: [b.modPct.toFixed(2), "%"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-3 py-3 font-mono",
										children: ["±", b.maxErr]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-3 font-mono text-xs",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("rounded px-2 py-0.5 text-[10px] font-bold", b.crypto === "AES-256-GCM" ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300" : "bg-muted text-muted-foreground"),
											children: b.crypto
										})
									})
								]
							}, b.id);
						})
					})]
				})
			})]
		})]
	});
}
function DashboardPage() {
	const { setEncode, lastCover, lastCoverUrl, lastStegoUrl, lastMetrics } = useSession();
	const [selectedModelId, setSelectedModelId] = (0, import_react.useState)("ares_emd_opap");
	const [fileName, setFileName] = (0, import_react.useState)("Lena_Sample.png");
	const [secret, setSecret] = (0, import_react.useState)("ARES-EMD-OPAP: CNN-Assisted Adaptive Data Hiding 2026");
	const [password, setPassword] = (0, import_react.useState)("lab-passphrase-2026");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [extracting, setExtracting] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [coverUrl, setCoverUrl] = (0, import_react.useState)(lastCoverUrl ?? "");
	const [stegoUrl, setStegoUrl] = (0, import_react.useState)(lastStegoUrl ?? "");
	const [extractedSecret, setExtractedSecret] = (0, import_react.useState)(null);
	const handleDownloadStego = () => {
		if (!stegoUrl) return;
		const a = document.createElement("a");
		a.href = stegoUrl;
		a.download = `ares_emd_opap_${fileName.replace(/\.[^/.]+$/, "") || "image"}.png`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	};
	const loadQuickSample = () => {
		const img = generateSampleImage("portrait", 384, 384);
		const url = imageToDataUrl(img);
		setCoverUrl(url);
		setFileName("Sample_Portrait.png");
		setExtractedSecret(null);
		useSession.setState({
			lastCover: img,
			lastCoverUrl: url
		});
	};
	async function onFile(f) {
		if (!f) return;
		setFileName(f.name);
		setError(null);
		setExtractedSecret(null);
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
				model
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: "ARES-EMD-OPAP-INN & Hybrid INN-CNN Research Platform",
		title: "ARES-EMD-OPAP-INN Adaptive Steganography Dashboard",
		description: "Evaluate INN reversible wavelet + affine coupling fused with CNN spatial/channel attention, Generalized EMD, and OPAP distortion optimization alongside ARES-Hybrid-INN-CNN and published baselines with live empirical measurements.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/batch-lab",
			className: "inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-95 transition-opacity",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlaskConical, { className: "size-4" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Open Batch Lab & Live Benchmark" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border border-border bg-card p-4 shadow-xs",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded bg-primary/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary",
								children: "Zero Fake Assumptions · Empirical Best Model Verification"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-sm font-bold text-foreground",
							children: [
								"Test ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary",
									children: "ARES-EMD-OPAP-INN"
								}),
								", ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground",
									children: "ARES-Hybrid-INN-CNN"
								}),
								", or any ablation/baseline model — only the empirically highest-performing model is highlighted as best."
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: selectedModelId === "ares_emd_opap" ? "default" : "outline",
							onClick: () => setSelectedModelId("ares_emd_opap"),
							className: "h-8 text-xs font-bold gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Select ARES-EMD-OPAP-INN" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: selectedModelId === "ares_hybrid_inn" ? "default" : "outline",
							onClick: () => setSelectedModelId("ares_hybrid_inn"),
							className: "h-8 text-xs font-semibold gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Select ARES-Hybrid-INN-CNN" })]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4 w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: "Active Model"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "size-4 text-primary" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-display text-xl font-bold text-foreground",
								children: selectedModel.short
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: selectedModel.usesInn ? "INN Wavelet Coupling + EMD + OPAP" : selectedModel.paper
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: "Ablation Suite"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "size-4 text-emerald-500" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-display text-xl font-bold text-foreground",
								children: "6 Live Configurations"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: "Computed directly on cover image pixels"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: "Cryptographic Security"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 text-amber-500" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-display text-xl font-bold text-primary",
								children: "AES-256-GCM AEAD"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: "PBKDF2-SHA256 + Compact Authenticated Frame (Zero False Positives)"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: "Live Benchmark Winner"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-4 text-blue-500" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-display text-xl font-bold text-foreground",
								children: "True Empirical Best"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: "Only highlights whichever model achieves #1 measured result"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-primary/30 bg-primary/5 p-4 text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2 mb-2 font-mono font-bold text-primary uppercase tracking-wider",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ARES-EMD-OPAP-INN & Hybrid INN-CNN Logical Pipeline" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2 text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded bg-card px-2.5 py-1 font-semibold text-foreground border border-border",
							children: "Cover Image"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded bg-card px-2.5 py-1 font-semibold text-foreground border border-border",
							children: "CNN Multi-Scale Features"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded bg-card px-2.5 py-1 font-semibold text-foreground border border-border",
							children: "Spatial/Channel Attention"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded bg-primary/20 px-2.5 py-1 font-bold text-primary border border-primary/40",
							children: "INN Reversible Wavelet + Affine Coupling"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded bg-card px-2.5 py-1 font-semibold text-foreground border border-border",
							children: "Adaptive Cost & Phase Map"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded bg-primary/20 px-2.5 py-1 font-bold text-primary border border-primary/40",
							children: "INN-Coupled EMD Embedding"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded bg-emerald-500/20 px-2.5 py-1 font-bold text-emerald-800 dark:text-emerald-300 border border-emerald-500/40",
							children: "OPAP Optimization"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded bg-card px-2.5 py-1 font-semibold text-foreground border border-border",
							children: "Stego Image"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-5 shadow-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-base font-semibold text-ink",
						children: "Interactive Test Bench & Distortion Optimization"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Execute live INN-coupled EMD embedding with OPAP post-optimization and cryptographic verification on a single cover image."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						onClick: loadQuickSample,
						className: "gap-1.5 text-xs font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5 text-amber-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Load Sample Image" })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-6 lg:grid-cols-[1fr_1.1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "model-select",
									className: "text-xs font-semibold text-muted-foreground",
									children: "Embedding Mode"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									id: "model-select",
									value: selectedModelId,
									onChange: (e) => setSelectedModelId(e.target.value),
									className: "mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("optgroup", {
											label: "INN & Hybrid CNN Architectures",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "ares_emd_opap",
												children: "ARES-EMD-OPAP-INN (INN Wavelet Coupling + CNN Attention + EMD + OPAP + AES-GCM)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "ares_hybrid_inn",
												children: "ARES-Hybrid-INN-CNN (Hybrid INN + CNN Encoder-Decoder + Adaptive EMD-OPAP + AES-GCM)"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("optgroup", {
											label: "Ablation Experiment Modes (Section 16)",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "ablation_m1",
													children: "Model 1: EMD + OPAP (Sequential, unguided)"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "ablation_m2",
													children: "Model 2: CNN-Assisted Adaptive EMD + OPAP"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "ablation_m3",
													children: "Model 3: CNN + Attention + Adaptive EMD + OPAP"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "ablation_m4",
													children: "Model 4: CNN + Attention + INN + Adaptive EMD + OPAP (Unencrypted)"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "ablation_m5",
													children: "Model 5: Proposed ARES-EMD-OPAP-INN (Full Pipeline with AES-GCM)"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("optgroup", {
											label: "Published Baselines",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "paper_model_01",
													children: "Kanimozhi RNN+Fuzzy (Sci Rep 2025)"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "paper_model_02",
													children: "Sanjalawe Huffman+LSB (Sci Rep 2025)"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "paper_model_03",
													children: "Rahman LSB+Magic Matrix (Sci Rep 2025)"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "paper_model_04",
													children: "Aljarf DL-Steg SAE+LSTM (JUQEA 2025)"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "paper_model_05",
													children: "Zhang ISS (Cybersecurity 2025)"
												})
											]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 flex flex-wrap items-center gap-2 text-[10px] text-muted-foreground font-mono",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["INN Coupling: ", selectedModel.usesInn ? "Active (2-Stage Haar + Affine)" : "Off"] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "•" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["EMD: ", selectedModel.usesEmd ? "Active" : "N/A"] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "•" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["OPAP: ", selectedModel.usesOpap ? "Active (Distortion Optimized)" : "Off"] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "•" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Crypto: ", selectedModel.usesAesGcm ? "AES-256-GCM AEAD" : "Keyed MAC"] })
									]
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "single-cover",
									className: "text-xs font-semibold text-muted-foreground",
									children: "Cover Image File"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "single-cover",
									type: "file",
									accept: "image/png,image/jpeg,image/webp",
									onChange: (e) => onFile(e.target.files?.[0]),
									className: "mt-1 text-xs"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-[11px] text-muted-foreground",
									children: ["Active cover: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground",
										children: fileName
									})]
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "single-secret",
								className: "text-xs font-semibold text-muted-foreground",
								children: "Secret Data Payload"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "single-secret",
								value: secret,
								onChange: (e) => setSecret(e.target.value),
								rows: 2,
								className: "mt-1 text-xs font-mono",
								placeholder: "Enter secret message to hide..."
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "single-pw",
								className: "text-xs font-semibold text-muted-foreground",
								children: "Cryptographic Passphrase (KDF & Keystream)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "single-pw",
								type: "password",
								value: password,
								onChange: (e) => setPassword(e.target.value),
								className: "mt-1 text-xs font-mono",
								placeholder: "Passphrase for PBKDF2 key derivation..."
							})] }),
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium text-red-500",
								children: error
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									onClick: embedQuick,
									disabled: busy,
									className: "flex-1 gap-2 bg-primary text-primary-foreground font-semibold h-10",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: busy ? "Embedding with EMD-OPAP..." : `Embed with ${selectedModel.short}` })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									onClick: extractQuick,
									disabled: extracting || !stegoUrl,
									className: "gap-2 h-10 text-xs font-semibold border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockOpen, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: extracting ? "Extracting..." : "Extract Secret" })]
								})]
							}),
							extractedSecret && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-3 text-xs space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5 text-emerald-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Extracted Secret (100% Recovery)" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-800 dark:text-emerald-300",
										children: selectedModel.usesAesGcm ? "AES-GCM VERIFIED" : "VERIFIED"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-foreground bg-card p-2 rounded border border-border/60 break-all select-all",
									children: extractedSecret
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border border-border bg-muted/30 p-2 text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-semibold uppercase text-muted-foreground block mb-1",
										children: "Cover Image"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "aspect-square w-full overflow-hidden rounded bg-muted flex items-center justify-center",
										children: coverUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: coverUrl,
											alt: "Cover",
											className: "size-full object-cover"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground",
											children: "No cover loaded"
										})
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border-2 border-primary/40 bg-primary/5 p-2.5 text-center flex flex-col justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between mb-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] font-bold uppercase text-primary tracking-wide",
											children: "Stego Image (EMD-OPAP)"
										}), stegoUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											size: "sm",
											variant: "default",
											onClick: handleDownloadStego,
											className: "inline-flex items-center gap-1 rounded bg-primary text-primary-foreground px-2 h-6 text-[10px] font-bold shadow-xs hover:bg-primary/90",
											title: "Download Stego PNG",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PNG" })]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "aspect-square w-full overflow-hidden rounded bg-muted flex items-center justify-center relative group",
										children: stegoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: stegoUrl,
											alt: "Stego",
											className: "size-full object-cover"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-2 transition-opacity p-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: handleDownloadStego,
												className: "bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-md shadow-md flex items-center gap-1.5 hover:scale-105 transition-transform",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Download PNG" })]
											})
										})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground",
											children: "Click embed to run"
										})
									})]
								})]
							}),
							stegoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-xl border-2 border-emerald-500/40 bg-emerald-500/10 p-3.5 shadow-xs w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block size-2 rounded-full bg-emerald-500 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-bold text-emerald-800 dark:text-emerald-300",
											children: "Steganographic Image Ready for Download"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-0.5 text-[11px] text-muted-foreground font-mono",
										children: [
											"ares_emd_opap_",
											fileName.replace(/\.[^/.]+$/, ""),
											".png • Lossless 24-bit RGB PNG"
										]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											onClick: handleDownloadStego,
											className: "gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs h-10 px-4 shadow-sm shrink-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Download Stego Image" })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/decoder",
											className: "inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3.5 h-10 text-xs font-semibold text-foreground hover:bg-muted shadow-xs transition-colors shrink-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSearch, { className: "size-3.5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Forensic Verification" })]
										})]
									})]
								})
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-lg border border-dashed border-border bg-muted/20 p-3 text-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [
										"Click ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-semibold text-foreground",
											children: ["Embed with ", selectedModel.short]
										}),
										" above to generate and download the lossless stego image."
									]
								})
							}),
							lastMetrics && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-lg border border-border bg-card p-3 w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricGrid, { metrics: lastMetrics })
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AblationStudyPanel, { testImage: lastCover }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-5 shadow-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-base font-semibold text-ink",
						children: "Steganographic Algorithm & Ablation Registry"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "All algorithms available for multi-image batch laboratory testing and ablation validation."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/batch-lab",
						className: "text-xs font-semibold text-primary hover:underline",
						children: "Test all in Batch Lab →"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
					children: MODELS.filter((m) => m.kind !== "ablation").map((m) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col justify-between rounded-lg border border-border bg-card p-3.5 text-xs transition-all",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-sm font-bold text-foreground",
										children: m.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded bg-muted px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground",
										children: m.status
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-[11px] text-muted-foreground",
									children: m.paper
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs text-foreground/90 leading-relaxed line-clamp-2",
									children: m.note
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex items-center justify-between border-t border-border/50 pt-2 font-mono text-[10px] text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Algorithm: ", m.usesInn ? "INN + EMD + OPAP" : m.usesEmd ? "EMD + OPAP" : "LSB / Permutation"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: m.methodKey })]
							})]
						}, m.id);
					})
				})]
			})
		]
	})] });
}
//#endregion
export { DashboardPage as component };
