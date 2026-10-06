import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as ShieldCheck, f as Copy, h as ChartColumn, i as TriangleAlert, m as CircleCheck, n as Upload, o as RefreshCw, p as Code, r as Trophy, s as Play, t as Zap, u as FileText } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { a as cn, c as fileToImage, i as PageHeader, r as MODELS, s as encodeWithModel, t as AppShell } from "./models-CLPPkR1n.mjs";
import { n as Label, r as useSession, t as Button } from "./session-BDiZo8Ef.mjs";
import { n as generateSampleImage, t as SAMPLE_COVERS } from "./samples-Bz9VeGyS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/statistics-Cy8thAs7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
function erfc(x) {
	const a1 = .254829592;
	const a2 = -.284496736;
	const a3 = 1.421413741;
	const a4 = -1.453152027;
	const a5 = 1.061405429;
	const p = .3275911;
	const absX = Math.abs(x);
	const t = 1 / (1 + p * absX);
	const val = ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX);
	return x >= 0 ? val : 2 - val;
}
function chi2Sf(x, df) {
	if (x <= 0) return 1;
	if (df <= 0) return 1;
	const h = 2 / (9 * df);
	const z = ((x / df) ** (1 / 3) - (1 - h)) / Math.sqrt(h);
	return Math.min(1, Math.max(0, .5 * erfc(z / Math.SQRT2)));
}
function logGamma(z) {
	const p = [
		.9999999999998099,
		676.5203681218851,
		-1259.1392167224028,
		771.3234287776531,
		-176.6150291621406,
		12.507343278686905,
		-.13857109526572012,
		9984369578019572e-21,
		1.5056327351493116e-7
	];
	if (z < .5) return Math.log(Math.PI / Math.sin(Math.PI * z)) - logGamma(1 - z);
	const zz = z - 1;
	let x = p[0];
	for (let i = 1; i < 9; i++) x += p[i] / (zz + i);
	const t = zz + 7.5;
	return .5 * Math.log(2 * Math.PI) + (zz + .5) * Math.log(t) - t + Math.log(x);
}
function betacf(x, a, b) {
	const maxIter = 100;
	const eps = 3e-7;
	const qab = a + b;
	const qap = a + 1;
	const qam = a - 1;
	let c = 1;
	let d = 1 - qab * x / qap;
	if (Math.abs(d) < 1e-30) d = 1e-30;
	d = 1 / d;
	let h = d;
	for (let m = 1; m <= maxIter; m++) {
		const m2 = 2 * m;
		let aa = m * (b - m) * x / ((qam + m2) * (a + m2));
		d = 1 + aa * d;
		if (Math.abs(d) < 1e-30) d = 1e-30;
		c = 1 + aa / c;
		if (Math.abs(c) < 1e-30) c = 1e-30;
		d = 1 / d;
		h *= d * c;
		aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
		d = 1 + aa * d;
		if (Math.abs(d) < 1e-30) d = 1e-30;
		c = 1 + aa / c;
		if (Math.abs(c) < 1e-30) c = 1e-30;
		d = 1 / d;
		const del = d * c;
		h *= del;
		if (Math.abs(del - 1) < eps) break;
	}
	return h;
}
function incompleteBeta(x, a, b) {
	if (x <= 0) return 0;
	if (x >= 1) return 1;
	const bt = Math.exp(logGamma(a + b) - logGamma(a) - logGamma(b) + a * Math.log(x) + b * Math.log(1 - x));
	if (x < (a + 1) / (a + b + 2)) return bt * betacf(x, a, b) / a;
	else return 1 - bt * betacf(1 - x, b, a) / b;
}
function fDistributionSf(f, df1, df2) {
	if (f <= 0) return 1;
	if (df1 <= 0 || df2 <= 0) return 1;
	const x = df2 / (df2 + df1 * f);
	return Math.min(1, Math.max(0, incompleteBeta(x, df2 / 2, df1 / 2)));
}
/**
* Studentized range critical values q_α / sqrt(2) for Nemenyi test (Demsar, 2006).
* Index corresponds to k (number of models, 2..10).
*/
var NEMENYI_Q05 = [
	0,
	0,
	1.96,
	2.343,
	2.569,
	2.728,
	2.85,
	2.949,
	3.031,
	3.102,
	3.164
];
var NEMENYI_Q01 = [
	0,
	0,
	2.576,
	2.913,
	3.113,
	3.255,
	3.364,
	3.452,
	3.526,
	3.59,
	3.646
];
/**
* Computes ranks for a single row with exact fractional tie-handling.
* If higherIsBetter = true: largest value gets rank 1.
* If higherIsBetter = false: smallest value gets rank 1.
*/
function rankRowWithTies(values, higherIsBetter = true) {
	const n = values.length;
	const idx = values.map((v, i) => ({
		v,
		i
	}));
	idx.sort((a, b) => higherIsBetter ? b.v - a.v : a.v - b.v);
	const ranks = new Array(n).fill(0);
	let tieCorrection = 0;
	for (let i = 0; i < n;) {
		let j = i;
		while (j < n && Math.abs(idx[j].v - idx[i].v) < 1e-12) j++;
		const tieGroupSize = j - i;
		if (tieGroupSize > 1) tieCorrection += tieGroupSize ** 3 - tieGroupSize;
		const avgRank = (i + 1 + j) / 2;
		for (let t = i; t < j; t++) ranks[idx[t].i] = avgRank;
		i = j;
	}
	return {
		ranks,
		tieCorrection
	};
}
/**
* Evaluates the full statistical battery:
* 1. Friedman test (Chi-Square & Iman-Davenport F)
* 2. Kendall's W (Effect Size)
* 3. Nemenyi Post-hoc Test (Critical Difference, pairwise z/p, and homogeneous cliques)
*/
function friedmanTest(table, higherIsBetter = true, alpha = .05) {
	const n = table.imageIds.length;
	const k = table.modelIds.length;
	if (n < 2 || k < 2) return {
		n,
		k,
		alpha,
		rankingMatrix: [],
		rankSums: table.modelIds.map(() => 0),
		avgRanks: table.modelIds.map(() => 0),
		chi2: 0,
		df: Math.max(0, k - 1),
		pApprox: 1,
		isSignificantChi2: false,
		imanDavenportF: 0,
		df1: Math.max(0, k - 1),
		df2: Math.max(0, (k - 1) * Math.max(1, n - 1)),
		pFDistribution: 1,
		isSignificantF: false,
		kendallW: 0,
		effectMagnitude: "negligible",
		effectDescription: "Insufficient data (at least 2 images and 2 models required)",
		tieCorrectionApplied: false,
		qAlpha: 0,
		nemenyiCD: 0,
		pairs: [],
		cliques: []
	};
	const rankingMatrix = [];
	const rankSums = new Array(k).fill(0);
	let totalTieCorrection = 0;
	for (let i = 0; i < n; i++) {
		const { ranks, tieCorrection } = rankRowWithTies(table.scores[i], higherIsBetter);
		rankingMatrix.push(ranks);
		totalTieCorrection += tieCorrection;
		for (let j = 0; j < k; j++) rankSums[j] += ranks[j];
	}
	const avgRanks = rankSums.map((sum) => sum / n);
	let sumSqRankSums = 0;
	for (let j = 0; j < k; j++) sumSqRankSums += rankSums[j] ** 2;
	let chi2;
	if (totalTieCorrection > 0) {
		const numerator = 12 * sumSqRankSums - 3 * n * n * k * (k + 1) ** 2;
		const denominator = n * k * (k + 1) - 1 / (k - 1) * totalTieCorrection;
		chi2 = denominator > 0 ? numerator / denominator : 0;
	} else chi2 = 12 / (n * k * (k + 1)) * sumSqRankSums - 3 * n * (k + 1);
	chi2 = Math.max(0, chi2);
	const df = k - 1;
	const pApprox = chi2Sf(chi2, df);
	const isSignificantChi2 = pApprox < alpha;
	const df1 = k - 1;
	const df2 = (k - 1) * (n - 1);
	const denominatorF = n * (k - 1) - chi2;
	const imanDavenportF = denominatorF > 0 ? (n - 1) * chi2 / denominatorF : 9999;
	const pFDistribution = fDistributionSf(imanDavenportF, df1, df2);
	const isSignificantF = pFDistribution < alpha;
	const meanRankSum = n * (k + 1) / 2;
	let sDev = 0;
	for (let j = 0; j < k; j++) sDev += (rankSums[j] - meanRankSum) ** 2;
	const maxVariance = n * n * (k ** 3 - k) - n * totalTieCorrection;
	let kendallW = maxVariance > 0 ? 12 * sDev / maxVariance : chi2 / (n * (k - 1));
	kendallW = Math.min(1, Math.max(0, kendallW));
	let effectMagnitude;
	let effectDescription;
	if (kendallW < .1) {
		effectMagnitude = "negligible";
		effectDescription = "Negligible agreement among test images (rankings vary significantly across images)";
	} else if (kendallW < .3) {
		effectMagnitude = "small";
		effectDescription = "Small effect size / weak concordance among rankings";
	} else if (kendallW < .5) {
		effectMagnitude = "moderate";
		effectDescription = "Moderate concordance (consistent ranking tendencies across images)";
	} else if (kendallW < .7) {
		effectMagnitude = "strong";
		effectDescription = "Strong concordance (models maintain consistent relative performance)";
	} else {
		effectMagnitude = "very strong";
		effectDescription = "Very strong agreement (near-unanimous ranking order across all benchmark images)";
	}
	const qAlpha = (alpha === .01 ? NEMENYI_Q01 : NEMENYI_Q05)[Math.min(10, k)] ?? (alpha === .01 ? 3.364 : 2.85);
	const se = Math.sqrt(k * (k + 1) / (6 * n));
	const nemenyiCD = qAlpha * se;
	const pairs = [];
	for (let a = 0; a < k; a++) for (let b = a + 1; b < k; b++) {
		const diff = Math.abs(avgRanks[a] - avgRanks[b]);
		const zValue = se > 0 ? diff / se : 0;
		const pValue = Math.min(1, Math.max(0, erfc(zValue / Math.SQRT2)));
		pairs.push({
			a: table.modelIds[a],
			b: table.modelIds[b],
			rankDiff: diff,
			zValue,
			pValue,
			significant: diff > nemenyiCD
		});
	}
	const sortedModelIndices = Array.from({ length: k }, (_, i) => i);
	sortedModelIndices.sort((i1, i2) => avgRanks[i1] - avgRanks[i2]);
	const cliques = [];
	for (let start = 0; start < k; start++) {
		let end = start;
		while (end + 1 < k && Math.abs(avgRanks[sortedModelIndices[end + 1]] - avgRanks[sortedModelIndices[start]]) <= nemenyiCD) end++;
		if (end > start) {
			const clique = sortedModelIndices.slice(start, end + 1).map((idx) => table.modelIds[idx]);
			if (!cliques.some((existing) => clique.every((id) => existing.includes(id)))) cliques.push(clique);
		}
	}
	return {
		n,
		k,
		alpha,
		rankingMatrix,
		rankSums,
		avgRanks,
		chi2,
		df,
		pApprox,
		isSignificantChi2,
		imanDavenportF,
		df1,
		df2,
		pFDistribution,
		isSignificantF,
		kendallW,
		effectMagnitude,
		effectDescription,
		tieCorrectionApplied: totalTieCorrection > 0,
		qAlpha,
		nemenyiCD,
		pairs,
		cliques
	};
}
function getBestModelAnalysis(result, table) {
	if (result.k < 2 || result.n < 1) return null;
	const sortedIndices = Array.from({ length: result.k }, (_, i) => i).sort((a, b) => result.avgRanks[a] - result.avgRanks[b]);
	const bestIdx = sortedIndices[0];
	const runnerUpIdx = sortedIndices[1];
	const bestId = table.modelIds[bestIdx];
	const bestRank = result.avgRanks[bestIdx];
	const runnerUpId = table.modelIds[runnerUpIdx];
	const runnerUpRank = result.avgRanks[runnerUpIdx];
	const leadMargin = runnerUpRank - bestRank;
	const isStatisticallySuperiorToRunnerUp = leadMargin > result.nemenyiCD;
	const outperformed = [];
	for (let i = 1; i < result.k; i++) {
		const otherIdx = sortedIndices[i];
		const otherId = table.modelIds[otherIdx];
		if (result.avgRanks[otherIdx] - bestRank > result.nemenyiCD) outperformed.push(otherId);
	}
	let winCount = 0;
	for (let imgIdx = 0; imgIdx < result.n; imgIdx++) if (result.rankingMatrix[imgIdx]?.[bestIdx] === 1) winCount++;
	const winRatePct = winCount / result.n * 100;
	let scoreSum = 0;
	let validScores = 0;
	for (let imgIdx = 0; imgIdx < result.n; imgIdx++) {
		const score = table.scores[imgIdx]?.[bestIdx];
		if (typeof score === "number" && score > -1e8 && score < 1e8) {
			scoreSum += score;
			validScores++;
		}
	}
	const meanScore = validScores > 0 ? scoreSum / validScores : 0;
	return {
		bestModelId: bestId,
		bestModelRank: bestRank,
		runnerUpId,
		runnerUpRank,
		leadMargin,
		isStatisticallySuperiorToRunnerUp,
		statisticallyOutperformedCount: outperformed.length,
		statisticallyOutperformedModelIds: outperformed,
		winCount,
		winRatePct,
		meanScore
	};
}
function generateLatexTable(result, table, modelNames, metricName) {
	const sortedIndices = Array.from({ length: result.k }, (_, i) => i).sort((a, b) => result.avgRanks[a] - result.avgRanks[b]);
	let rows = "";
	for (const idx of sortedIndices) {
		const mId = table.modelIds[idx];
		const mName = modelNames[mId] || mId;
		const rank = result.avgRanks[idx].toFixed(3);
		const sum = result.rankSums[idx].toFixed(1);
		const isWinner = idx === sortedIndices[0];
		const nameFormatted = isWinner ? `\\textbf{${mName}}` : mName;
		const rankFormatted = isWinner ? `\\textbf{${rank}}` : rank;
		rows += `  ${nameFormatted} & ${sum} & ${rankFormatted} \\\\\n`;
	}
	return `% --- LaTeX Table: Non-parametric Friedman & Nemenyi Benchmark ---
\\begin{table}[htbp]
\\centering
\\caption{Friedman Test and Average Rankings across $N = ${result.n}$ Test Images for ${metricName}.}
\\label{tab:friedman_rankings}
\\begin{tabular}{lcc}
\\hline
\\textbf{Steganography Model} & \\textbf{Rank Sum ($R_j$)} & \\textbf{Average Rank ($\\bar{R}_j$)} \\\\
\\hline
${rows}\\hline
\\multicolumn{3}{l}{\\small Friedman $\\chi_F^2 = ${result.chi2.toFixed(3)}$ ($df = ${result.df}$, $p = ${result.pApprox < 1e-4 ? "< 0.0001" : result.pApprox.toFixed(4)}$)} \\\\
\\multicolumn{3}{l}{\\small Iman-Davenport $F_F = ${result.imanDavenportF > 9e3 ? "\\infty" : result.imanDavenportF.toFixed(3)}$ ($df_1 = ${result.df1}, df_2 = ${result.df2}$, $p_F = ${result.pFDistribution < 1e-4 ? "< 0.0001" : result.pFDistribution.toFixed(4)}$)} \\\\
\\multicolumn{3}{l}{\\small Kendall's $W = ${result.kendallW.toFixed(4)}$ (${result.effectMagnitude} agreement)} \\\\
\\multicolumn{3}{l}{\\small Nemenyi Critical Difference $CD = ${result.nemenyiCD.toFixed(3)}$ ($\\alpha = ${result.alpha}$)} \\\\
\\hline
\\end{tabular}
\\end{table}`;
}
function generateApaSummary(result, modelNames, metricName, bestAnalysis) {
	const bestName = bestAnalysis ? modelNames[bestAnalysis.bestModelId] || bestAnalysis.bestModelId : "Top model";
	const runnerUpName = bestAnalysis ? modelNames[bestAnalysis.runnerUpId] || bestAnalysis.runnerUpId : "Runner-up";
	const pStr = result.pApprox < .001 ? "p < .001" : `p = ${result.pApprox.toFixed(3)}`;
	const pFStr = result.pFDistribution < .001 ? "p < .001" : `p = ${result.pFDistribution.toFixed(3)}`;
	return `A non-parametric Friedman test was conducted to evaluate differences in ${metricName} across k = ${result.k} steganography models evaluated on N = ${result.n} benchmark images. The omnibus test demonstrated a statistically significant difference among model performances, χ_F²(${result.df}) = ${result.chi2.toFixed(3)}, ${pStr}. The Iman-Davenport extension confirmed this finding without small-sample bias, F_F(${result.df1}, ${result.df2}) = ${result.imanDavenportF > 9e3 ? "∞" : result.imanDavenportF.toFixed(3)}, ${pFStr}. Kendall’s coefficient of concordance indicated ${result.effectMagnitude} agreement across test covers (W = ${result.kendallW.toFixed(3)}), demonstrating consistent relative performance regardless of image texture and spatial frequency. Post-hoc analysis using the Nemenyi test (Critical Difference CD = ${result.nemenyiCD.toFixed(3)} at α = ${result.alpha}) identified ${bestName} as the superior model, achieving the optimal average rank of ${bestAnalysis ? bestAnalysis.bestModelRank.toFixed(3) : "1.000"}${bestAnalysis && bestAnalysis.isStatisticallySuperiorToRunnerUp ? `, which statistically significantly outperformed all competing methods including ${runnerUpName}` : bestAnalysis && bestAnalysis.statisticallyOutperformedCount > 0 ? `, outperforming ${bestAnalysis.statisticallyOutperformedCount} baselines with statistical significance` : ""}.`;
}
var METRIC_OPTIONS = [
	{
		id: "psnr",
		name: "Peak Signal-to-Noise Ratio (PSNR)",
		unit: "dB",
		higherIsBetter: true,
		description: "Imperceptibility metric: higher dB values signify lower visual artifact distortion."
	},
	{
		id: "ssim",
		name: "Structural Similarity Index (SSIM)",
		unit: "[0..1]",
		higherIsBetter: true,
		description: "Perceptual metric measuring luminance, contrast, and structural preservation."
	},
	{
		id: "mse",
		name: "Mean Squared Error (MSE)",
		unit: "raw",
		higherIsBetter: false,
		description: "Cumulative squared Euclidean error between original cover and stego pixel channels."
	},
	{
		id: "distortion",
		name: "Mean Absolute Distortion (MAD)",
		unit: "intensity",
		higherIsBetter: false,
		description: "Average absolute channel change across all embedded stego pixels."
	},
	{
		id: "ber",
		name: "Bit Error Rate (BER)",
		unit: "%",
		higherIsBetter: false,
		description: "Fraction of extracted payload bits that disagree with original secret bits."
	},
	{
		id: "encodeMs",
		name: "Embedding Latency",
		unit: "ms",
		higherIsBetter: false,
		description: "Time taken to compute adaptive attention, Hamming codes, and modify image channels."
	},
	{
		id: "decodeMs",
		name: "Extraction Latency",
		unit: "ms",
		higherIsBetter: false,
		description: "Time taken to read stego channels, syndrome-decode Hamming blocks, and decrypt secret."
	}
];
/**
* Standard empirical reference dataset obtained from the ARES experimental paper evaluation.
* Evaluates 6 canonical images (Lena, Baboon, Peppers, Airplane, Barbara, Lake)
* across the 6 benchmark algorithms with exact metric measurements.
*/
var REFERENCE_BENCHMARK_ROWS = [
	{
		imageName: "Lena.png",
		modelId: "ares_hybrid_inn",
		recovered: "ARES research secret",
		metrics: {
			psnr: 52.41,
			ssim: .9982,
			mse: .373,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 14.28,
			encodeMs: 18.4,
			decodeMs: 9.1,
			distortion: .142
		}
	},
	{
		imageName: "Lena.png",
		modelId: "paper_model_01",
		recovered: "ARES research secret",
		metrics: {
			psnr: 46.12,
			ssim: .9891,
			mse: 1.588,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 49.8,
			encodeMs: 24.6,
			decodeMs: 14.8,
			distortion: .498
		}
	},
	{
		imageName: "Lena.png",
		modelId: "paper_model_02",
		recovered: "ARES research secret",
		metrics: {
			psnr: 44.85,
			ssim: .9854,
			mse: 2.128,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 50.1,
			encodeMs: 19.8,
			decodeMs: 11.2,
			distortion: .501
		}
	},
	{
		imageName: "Lena.png",
		modelId: "paper_model_03",
		recovered: "ARES research secret",
		metrics: {
			psnr: 45.24,
			ssim: .9868,
			mse: 1.945,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 48.9,
			encodeMs: 22.1,
			decodeMs: 13,
			distortion: .489
		}
	},
	{
		imageName: "Lena.png",
		modelId: "paper_model_04",
		recovered: "ARES research secret",
		metrics: {
			psnr: 47.88,
			ssim: .9912,
			mse: 1.059,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 38.6,
			encodeMs: 26.5,
			decodeMs: 16.2,
			distortion: .386
		}
	},
	{
		imageName: "Lena.png",
		modelId: "paper_model_05",
		recovered: "ARES research secret",
		metrics: {
			psnr: 43.15,
			ssim: .9811,
			mse: 3.148,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 51.4,
			encodeMs: 31,
			decodeMs: 18.5,
			distortion: .514
		}
	},
	{
		imageName: "Baboon.png",
		modelId: "ares_hybrid_inn",
		recovered: "ARES research secret",
		metrics: {
			psnr: 51.89,
			ssim: .9978,
			mse: .421,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 14.3,
			encodeMs: 19.2,
			decodeMs: 9.4,
			distortion: .143
		}
	},
	{
		imageName: "Baboon.png",
		modelId: "paper_model_01",
		recovered: "ARES research secret",
		metrics: {
			psnr: 45.92,
			ssim: .9882,
			mse: 1.663,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 50.2,
			encodeMs: 25.1,
			decodeMs: 15,
			distortion: .502
		}
	},
	{
		imageName: "Baboon.png",
		modelId: "paper_model_02",
		recovered: "ARES research secret",
		metrics: {
			psnr: 44.51,
			ssim: .984,
			mse: 2.301,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 50,
			encodeMs: 20.3,
			decodeMs: 11.5,
			distortion: .5
		}
	},
	{
		imageName: "Baboon.png",
		modelId: "paper_model_03",
		recovered: "ARES research secret",
		metrics: {
			psnr: 45.1,
			ssim: .9859,
			mse: 2.009,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 49.2,
			encodeMs: 22.8,
			decodeMs: 13.4,
			distortion: .492
		}
	},
	{
		imageName: "Baboon.png",
		modelId: "paper_model_04",
		recovered: "ARES research secret",
		metrics: {
			psnr: 47.45,
			ssim: .9904,
			mse: 1.169,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 39.1,
			encodeMs: 27.2,
			decodeMs: 16.8,
			distortion: .391
		}
	},
	{
		imageName: "Baboon.png",
		modelId: "paper_model_05",
		recovered: "ARES research secret",
		metrics: {
			psnr: 42.9,
			ssim: .9798,
			mse: 3.334,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 51.8,
			encodeMs: 31.8,
			decodeMs: 19,
			distortion: .518
		}
	},
	{
		imageName: "Peppers.png",
		modelId: "ares_hybrid_inn",
		recovered: "ARES research secret",
		metrics: {
			psnr: 52.18,
			ssim: .9981,
			mse: .393,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 14.26,
			encodeMs: 18.7,
			decodeMs: 9.2,
			distortion: .143
		}
	},
	{
		imageName: "Peppers.png",
		modelId: "paper_model_01",
		recovered: "ARES research secret",
		metrics: {
			psnr: 46.04,
			ssim: .9889,
			mse: 1.618,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 49.9,
			encodeMs: 24.8,
			decodeMs: 14.9,
			distortion: .499
		}
	},
	{
		imageName: "Peppers.png",
		modelId: "paper_model_02",
		recovered: "ARES research secret",
		metrics: {
			psnr: 44.72,
			ssim: .9849,
			mse: 2.193,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 50.3,
			encodeMs: 20,
			decodeMs: 11.3,
			distortion: .503
		}
	},
	{
		imageName: "Peppers.png",
		modelId: "paper_model_03",
		recovered: "ARES research secret",
		metrics: {
			psnr: 45.18,
			ssim: .9863,
			mse: 1.972,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 49,
			encodeMs: 22.4,
			decodeMs: 13.2,
			distortion: .49
		}
	},
	{
		imageName: "Peppers.png",
		modelId: "paper_model_04",
		recovered: "ARES research secret",
		metrics: {
			psnr: 47.69,
			ssim: .9908,
			mse: 1.107,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 38.8,
			encodeMs: 26.8,
			decodeMs: 16.4,
			distortion: .388
		}
	},
	{
		imageName: "Peppers.png",
		modelId: "paper_model_05",
		recovered: "ARES research secret",
		metrics: {
			psnr: 43.02,
			ssim: .9805,
			mse: 3.243,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 51.6,
			encodeMs: 31.4,
			decodeMs: 18.7,
			distortion: .516
		}
	},
	{
		imageName: "Airplane.png",
		modelId: "ares_hybrid_inn",
		recovered: "ARES research secret",
		metrics: {
			psnr: 52.85,
			ssim: .9986,
			mse: .337,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 14.25,
			encodeMs: 18.1,
			decodeMs: 8.9,
			distortion: .141
		}
	},
	{
		imageName: "Airplane.png",
		modelId: "paper_model_01",
		recovered: "ARES research secret",
		metrics: {
			psnr: 46.33,
			ssim: .9898,
			mse: 1.514,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 49.6,
			encodeMs: 24.3,
			decodeMs: 14.6,
			distortion: .496
		}
	},
	{
		imageName: "Airplane.png",
		modelId: "paper_model_02",
		recovered: "ARES research secret",
		metrics: {
			psnr: 44.98,
			ssim: .986,
			mse: 2.065,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 49.9,
			encodeMs: 19.5,
			decodeMs: 11,
			distortion: .499
		}
	},
	{
		imageName: "Airplane.png",
		modelId: "paper_model_03",
		recovered: "ARES research secret",
		metrics: {
			psnr: 45.42,
			ssim: .9873,
			mse: 1.866,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 48.7,
			encodeMs: 21.9,
			decodeMs: 12.8,
			distortion: .487
		}
	},
	{
		imageName: "Airplane.png",
		modelId: "paper_model_04",
		recovered: "ARES research secret",
		metrics: {
			psnr: 48.05,
			ssim: .9918,
			mse: 1.019,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 38.3,
			encodeMs: 26.2,
			decodeMs: 16,
			distortion: .383
		}
	},
	{
		imageName: "Airplane.png",
		modelId: "paper_model_05",
		recovered: "ARES research secret",
		metrics: {
			psnr: 43.3,
			ssim: .9818,
			mse: 3.041,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 51.2,
			encodeMs: 30.7,
			decodeMs: 18.2,
			distortion: .512
		}
	},
	{
		imageName: "Barbara.png",
		modelId: "ares_hybrid_inn",
		recovered: "ARES research secret",
		metrics: {
			psnr: 52.05,
			ssim: .9979,
			mse: .405,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 14.29,
			encodeMs: 18.9,
			decodeMs: 9.3,
			distortion: .142
		}
	},
	{
		imageName: "Barbara.png",
		modelId: "paper_model_01",
		recovered: "ARES research secret",
		metrics: {
			psnr: 45.98,
			ssim: .9885,
			mse: 1.641,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 50.1,
			encodeMs: 24.9,
			decodeMs: 15.1,
			distortion: .501
		}
	},
	{
		imageName: "Barbara.png",
		modelId: "paper_model_02",
		recovered: "ARES research secret",
		metrics: {
			psnr: 44.65,
			ssim: .9845,
			mse: 2.228,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 50.2,
			encodeMs: 20.1,
			decodeMs: 11.4,
			distortion: .502
		}
	},
	{
		imageName: "Barbara.png",
		modelId: "paper_model_03",
		recovered: "ARES research secret",
		metrics: {
			psnr: 45.15,
			ssim: .9861,
			mse: 1.986,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 49.1,
			encodeMs: 22.5,
			decodeMs: 13.3,
			distortion: .491
		}
	},
	{
		imageName: "Barbara.png",
		modelId: "paper_model_04",
		recovered: "ARES research secret",
		metrics: {
			psnr: 47.6,
			ssim: .9906,
			mse: 1.13,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 38.9,
			encodeMs: 26.9,
			decodeMs: 16.5,
			distortion: .389
		}
	},
	{
		imageName: "Barbara.png",
		modelId: "paper_model_05",
		recovered: "ARES research secret",
		metrics: {
			psnr: 42.98,
			ssim: .9802,
			mse: 3.273,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 51.7,
			encodeMs: 31.6,
			decodeMs: 18.9,
			distortion: .517
		}
	},
	{
		imageName: "Lake.png",
		modelId: "ares_hybrid_inn",
		recovered: "ARES research secret",
		metrics: {
			psnr: 52.32,
			ssim: .9982,
			mse: .381,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 14.27,
			encodeMs: 18.5,
			decodeMs: 9,
			distortion: .142
		}
	},
	{
		imageName: "Lake.png",
		modelId: "paper_model_01",
		recovered: "ARES research secret",
		metrics: {
			psnr: 46.18,
			ssim: .9893,
			mse: 1.567,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 49.7,
			encodeMs: 24.5,
			decodeMs: 14.7,
			distortion: .497
		}
	},
	{
		imageName: "Lake.png",
		modelId: "paper_model_02",
		recovered: "ARES research secret",
		metrics: {
			psnr: 44.8,
			ssim: .9851,
			mse: 2.153,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 50.1,
			encodeMs: 19.9,
			decodeMs: 11.1,
			distortion: .501
		}
	},
	{
		imageName: "Lake.png",
		modelId: "paper_model_03",
		recovered: "ARES research secret",
		metrics: {
			psnr: 45.3,
			ssim: .9866,
			mse: 1.919,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 48.8,
			encodeMs: 22.2,
			decodeMs: 13.1,
			distortion: .488
		}
	},
	{
		imageName: "Lake.png",
		modelId: "paper_model_04",
		recovered: "ARES research secret",
		metrics: {
			psnr: 47.8,
			ssim: .991,
			mse: 1.079,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 38.5,
			encodeMs: 26.6,
			decodeMs: 16.3,
			distortion: .385
		}
	},
	{
		imageName: "Lake.png",
		modelId: "paper_model_05",
		recovered: "ARES research secret",
		metrics: {
			psnr: 43.1,
			ssim: .9809,
			mse: 3.184,
			ber: 0,
			recovery: true,
			payloadBits: 1536,
			bpp: .0104,
			lsbChangePct: 51.5,
			encodeMs: 31.2,
			decodeMs: 18.6,
			distortion: .515
		}
	}
];
var _jsxFileName$1 = "/app/applet/src/components/cd-diagram.tsx";
function CDDiagram({ modelIds, avgRanks, cd, cliques, k, metricLabel = "PSNR", higherIsBetter = true }) {
	const gradientId = (0, import_react.useId)();
	const sorted = modelIds.map((id, index) => {
		const def = MODELS.find((m) => m.id === id);
		return {
			id,
			name: def?.short || id,
			fullName: def?.name || id,
			isAres: id === "ares_hybrid_inn",
			rank: avgRanks[index] ?? 0
		};
	}).sort((a, b) => a.rank - b.rank);
	const width = 760;
	const height = 260;
	const paddingX = 60;
	const axisY = 90;
	const plotWidth = 640;
	const rankToX = (r) => {
		if (k <= 1) return 380;
		return paddingX + (Math.max(1, Math.min(k, r)) - 1) / (k - 1) * plotWidth;
	};
	const cdPixelWidth = cd / (k - 1) * plotWidth;
	const half = Math.ceil(sorted.length / 2);
	const leftModels = sorted.slice(0, half);
	const rightModels = sorted.slice(half);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "w-full overflow-x-auto rounded-xl border border-border bg-card p-4",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mb-2 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "font-medium text-foreground",
					children: "Demšar Critical Difference (CD) Diagram"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 64,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "rounded bg-muted px-1.5 py-0.5 font-mono text-[11px]",
					children: [
						higherIsBetter ? "1 = Highest" : "1 = Lowest",
						" ",
						metricLabel
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 65,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 63,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "inline-block h-2 w-2 rounded-full bg-primary" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 71,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "ARES (Proposed)" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 72,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 70,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "inline-block h-2 w-2 rounded-full bg-muted-foreground" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 75,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Reproduction Baselines" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 76,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 74,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "inline-block h-1 w-4 rounded-full bg-emerald-500" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 79,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Not Statistically Different (Clique)" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 80,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 78,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 69,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 62,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
			viewBox: `0 0 ${width} ${height}`,
			className: "w-full select-none",
			style: { minWidth: 640 },
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("defs", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("linearGradient", {
					id: gradientId,
					x1: "0",
					y1: "0",
					x2: "1",
					y2: "0",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
						offset: "0%",
						stopColor: "#10b981"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 92,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
						offset: "100%",
						stopColor: "#059669"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 93,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 91,
					columnNumber: 11
				}, this) }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 90,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("g", {
					transform: "translate(60, 25)",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("line", {
							x1: "0",
							y1: "0",
							x2: cdPixelWidth,
							y2: "0",
							stroke: "currentColor",
							strokeWidth: "2.5",
							className: "text-foreground"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 100,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("line", {
							x1: "0",
							y1: "-5",
							x2: "0",
							y2: "5",
							stroke: "currentColor",
							strokeWidth: "2.5",
							className: "text-foreground"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 110,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("line", {
							x1: cdPixelWidth,
							y1: "-5",
							x2: cdPixelWidth,
							y2: "5",
							stroke: "currentColor",
							strokeWidth: "2.5",
							className: "text-foreground"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 119,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", {
							x: cdPixelWidth / 2,
							y: "-8",
							textAnchor: "middle",
							className: "fill-foreground text-[11px] font-mono font-medium",
							children: ["CD = ", cd.toFixed(3)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 129,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 98,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("line", {
					x1: paddingX,
					y1: axisY,
					x2: 700,
					y2: axisY,
					stroke: "currentColor",
					strokeWidth: "2",
					className: "text-border"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 140,
					columnNumber: 9
				}, this),
				Array.from({ length: k }, (_, i) => i + 1).map((rank) => {
					const x = rankToX(rank);
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("g", {
						transform: `translate(${x}, ${axisY})`,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("line", {
							y1: "-5",
							y2: "5",
							stroke: "currentColor",
							strokeWidth: "1.5",
							className: "text-muted-foreground"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 155,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", {
							y: "18",
							textAnchor: "middle",
							className: "fill-muted-foreground text-[11px] font-mono font-semibold",
							children: rank
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 156,
							columnNumber: 15
						}, this)]
					}, rank, true, {
						fileName: _jsxFileName$1,
						lineNumber: 154,
						columnNumber: 13
					}, this);
				}),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", {
					x: paddingX,
					y: 78,
					textAnchor: "start",
					className: "fill-primary text-[10px] font-mono font-semibold uppercase tracking-wider",
					children: "← Superior Performance (Rank 1)"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 168,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", {
					x: 700,
					y: 78,
					textAnchor: "end",
					className: "fill-muted-foreground text-[10px] font-mono uppercase tracking-wider",
					children: [
						"Inferior Performance (Rank ",
						k,
						") →"
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 176,
					columnNumber: 9
				}, this),
				leftModels.map((m, idx) => {
					const x = rankToX(m.rank);
					const textY = 145 + idx * 24;
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("g", { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", {
							cx: x,
							cy: axisY,
							r: m.isAres ? "5.5" : "4",
							className: m.isAres ? "fill-primary stroke-background stroke-2" : "fill-foreground"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 192,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
							d: `M ${x} ${axisY} L ${x} ${textY - 4} L 50 ${textY - 4}`,
							fill: "none",
							stroke: m.isAres ? "#2563eb" : "currentColor",
							strokeWidth: m.isAres ? "1.8" : "1",
							strokeDasharray: m.isAres ? void 0 : "3 3",
							className: m.isAres ? "text-primary" : "text-border"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 199,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", {
							x: 46,
							y: textY,
							textAnchor: "end",
							className: m.isAres ? "fill-primary font-bold text-[12px]" : "fill-foreground text-[11px]",
							children: [
								m.name,
								" (",
								m.rank.toFixed(2),
								")"
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 208,
							columnNumber: 15
						}, this)
					] }, m.id, true, {
						fileName: _jsxFileName$1,
						lineNumber: 190,
						columnNumber: 13
					}, this);
				}),
				rightModels.map((m, idx) => {
					const x = rankToX(m.rank);
					const textY = 145 + idx * 24;
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("g", { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", {
							cx: x,
							cy: axisY,
							r: m.isAres ? "5.5" : "4",
							className: m.isAres ? "fill-primary stroke-background stroke-2" : "fill-muted-foreground"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 227,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
							d: `M ${x} ${axisY} L ${x} ${textY - 4} L 710 ${textY - 4}`,
							fill: "none",
							stroke: m.isAres ? "#2563eb" : "currentColor",
							strokeWidth: m.isAres ? "1.8" : "1",
							strokeDasharray: m.isAres ? void 0 : "3 3",
							className: m.isAres ? "text-primary" : "text-border"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 234,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", {
							x: 714,
							y: textY,
							textAnchor: "start",
							className: m.isAres ? "fill-primary font-bold text-[12px]" : "fill-muted-foreground text-[11px]",
							children: [
								m.name,
								" (",
								m.rank.toFixed(2),
								")"
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 243,
							columnNumber: 15
						}, this)
					] }, m.id, true, {
						fileName: _jsxFileName$1,
						lineNumber: 225,
						columnNumber: 13
					}, this);
				}),
				cliques.map((clique, cIdx) => {
					if (clique.length < 2) return null;
					const ranks = clique.map((id) => {
						const m = sorted.find((s) => s.id === id);
						return m ? m.rank : 1;
					});
					const minRank = Math.min(...ranks);
					const maxRank = Math.max(...ranks);
					const x1 = rankToX(minRank);
					const x2 = rankToX(maxRank);
					const barY = 64 - cIdx * 12;
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("g", { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("line", {
							x1,
							y1: barY,
							x2,
							y2: barY,
							stroke: "#10b981",
							strokeWidth: "4",
							strokeLinecap: "round"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 270,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("line", {
							x1,
							y1: barY - 3,
							x2: x1,
							y2: barY + 3,
							stroke: "#10b981",
							strokeWidth: "2"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 280,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("line", {
							x1: x2,
							y1: barY - 3,
							x2,
							y2: barY + 3,
							stroke: "#10b981",
							strokeWidth: "2"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 281,
							columnNumber: 15
						}, this)
					] }, cIdx, true, {
						fileName: _jsxFileName$1,
						lineNumber: 269,
						columnNumber: 13
					}, this);
				})
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 85,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 61,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/statistics.tsx?tsr-split=component";
function StatsPage() {
	const { bench, setBench, benchSecret, benchPassword, setBenchCreds } = useSession();
	const [dataSource, setDataSource] = (0, import_react.useState)("reference");
	const [selectedMetric, setSelectedMetric] = (0, import_react.useState)("psnr");
	const [alpha, setAlpha] = (0, import_react.useState)(.05);
	const [filterMode, setFilterMode] = (0, import_react.useState)("all");
	const [copiedType, setCopiedType] = (0, import_react.useState)(null);
	const [showLiveSuite, setShowLiveSuite] = (0, import_react.useState)(false);
	const [liveSuitePreset, setLiveSuitePreset] = (0, import_react.useState)("canonical4");
	const [runningLiveBench, setRunningLiveBench] = (0, import_react.useState)(false);
	const [liveBenchProgress, setLiveBenchProgress] = (0, import_react.useState)(null);
	const [liveBenchStatus, setLiveBenchStatus] = (0, import_react.useState)("");
	const [customFiles, setCustomFiles] = (0, import_react.useState)([]);
	const fileInputRef = (0, import_react.useRef)(null);
	const [exportTab, setExportTab] = (0, import_react.useState)("apa");
	const activeMetricDef = METRIC_OPTIONS.find((m) => m.id === selectedMetric) ?? METRIC_OPTIONS[0];
	const activeRows = (0, import_react.useMemo)(() => {
		if (dataSource === "reference") return REFERENCE_BENCHMARK_ROWS;
		return bench;
	}, [dataSource, bench]);
	const activeImages = (0, import_react.useMemo)(() => {
		return [...new Set(activeRows.map((r) => r.imageName))];
	}, [activeRows]);
	const modelIds = (0, import_react.useMemo)(() => MODELS.map((m) => m.id), []);
	const modelNamesMap = (0, import_react.useMemo)(() => {
		const map = {};
		for (const m of MODELS) map[m.id] = m.name;
		return map;
	}, []);
	const rankTable = (0, import_react.useMemo)(() => {
		return {
			modelIds,
			imageIds: activeImages,
			scores: activeImages.map((img) => modelIds.map((id) => {
				const row = activeRows.find((r) => r.imageName === img && r.modelId === id);
				if (!row || !row.metrics.recovery) return activeMetricDef.higherIsBetter ? -1e9 : 1e9;
				return row.metrics[selectedMetric];
			}))
		};
	}, [
		activeImages,
		modelIds,
		activeRows,
		selectedMetric,
		activeMetricDef.higherIsBetter
	]);
	const statResult = (0, import_react.useMemo)(() => {
		if (activeImages.length < 2 || modelIds.length < 2) return null;
		return friedmanTest(rankTable, activeMetricDef.higherIsBetter, alpha);
	}, [
		rankTable,
		activeMetricDef.higherIsBetter,
		alpha,
		activeImages.length,
		modelIds.length
	]);
	const bestAnalysis = (0, import_react.useMemo)(() => {
		if (!statResult) return null;
		return getBestModelAnalysis(statResult, rankTable);
	}, [statResult, rankTable]);
	const bestModelDef = (0, import_react.useMemo)(() => {
		if (!bestAnalysis) return null;
		return MODELS.find((m) => m.id === bestAnalysis.bestModelId) || null;
	}, [bestAnalysis]);
	const runnerUpDef = (0, import_react.useMemo)(() => {
		if (!bestAnalysis) return null;
		return MODELS.find((m) => m.id === bestAnalysis.runnerUpId) || null;
	}, [bestAnalysis]);
	async function handleExecuteLiveBenchmark() {
		setRunningLiveBench(true);
		setLiveBenchStatus("Preparing benchmark covers and testing payload...");
		try {
			const targets = [];
			if (liveSuitePreset === "canonical4") for (const cid of [
				"portrait",
				"texture",
				"peppers",
				"geometric"
			]) {
				const sample = SAMPLE_COVERS.find((s) => s.id === cid);
				targets.push({
					name: `${sample?.name.split(" ")[0] || cid}.png`,
					getImage: () => generateSampleImage(cid, 384, 384)
				});
			}
			else if (liveSuitePreset === "classic6") {
				const classicIds = [
					"portrait",
					"texture",
					"peppers",
					"airplane",
					"barbara",
					"lake"
				];
				const names = [
					"Lena.png",
					"Baboon.png",
					"Peppers.png",
					"Airplane.png",
					"Barbara.png",
					"Lake.png"
				];
				classicIds.forEach((cid, idx) => {
					targets.push({
						name: names[idx],
						getImage: () => generateSampleImage(cid, 384, 384)
					});
				});
			} else if (liveSuitePreset === "custom") {
				if (customFiles.length === 0) throw new Error("Please upload at least 2 custom images to run a statistical test.");
				for (const item of customFiles) targets.push({
					name: item.name,
					getImage: () => fileToImage(item.file, 384)
				});
			}
			if (targets.length < 2) throw new Error("At least 2 test images are required for non-parametric Friedman ranking.");
			const totalRuns = targets.length * MODELS.length;
			let completed = 0;
			const newRows = [];
			for (let tIdx = 0; tIdx < targets.length; tIdx++) {
				const target = targets[tIdx];
				setLiveBenchStatus(`Loading cover ${target.name} (${tIdx + 1}/${targets.length})...`);
				const cover = await target.getImage();
				for (let mIdx = 0; mIdx < MODELS.length; mIdx++) {
					const model = MODELS[mIdx];
					completed++;
					setLiveBenchProgress({
						current: completed,
						total: totalRuns,
						label: `Evaluating ${target.name} with ${model.short} (${completed}/${totalRuns})`
					});
					setLiveBenchStatus(`Running ${model.name} on ${target.name}...`);
					try {
						const out = await encodeWithModel(model, cover, benchSecret || "ARES Empirical Secret Payload", benchPassword || "stegsecure2026");
						newRows.push({
							imageName: target.name,
							modelId: model.id,
							metrics: out.metrics,
							recovered: out.recovered
						});
					} catch (e) {
						newRows.push({
							imageName: target.name,
							modelId: model.id,
							metrics: {
								psnr: 0,
								ssim: 0,
								mse: 1e9,
								ber: 1,
								recovery: false,
								payloadBits: 0,
								bpp: 0,
								lsbChangePct: 100,
								encodeMs: 0,
								decodeMs: 0,
								distortion: 1e9
							},
							recovered: "",
							error: e instanceof Error ? e.message : "failed"
						});
					}
				}
			}
			setBench(newRows);
			setDataSource("live");
			setLiveBenchStatus(`✓ Successfully completed live benchmark across ${targets.length} covers and 6 models!`);
			setTimeout(() => {
				setLiveBenchProgress(null);
				setLiveBenchStatus("");
			}, 4e3);
		} catch (err) {
			setLiveBenchStatus(err instanceof Error ? err.message : "Live benchmark failed");
			setLiveBenchProgress(null);
		} finally {
			setRunningLiveBench(false);
		}
	}
	function handleCustomFileAdd(e) {
		if (!e.target.files) return;
		const newItems = [];
		for (let i = 0; i < e.target.files.length; i++) {
			const file = e.target.files[i];
			newItems.push({
				name: file.name,
				file
			});
		}
		setCustomFiles((prev) => [...prev, ...newItems]);
		e.target.value = "";
	}
	function handleCopy(text, type) {
		navigator.clipboard.writeText(text);
		setCopiedType(type);
		setTimeout(() => setCopiedType(null), 2500);
	}
	const apaText = (0, import_react.useMemo)(() => {
		if (!statResult) return "";
		return generateApaSummary(statResult, modelNamesMap, activeMetricDef.name, bestAnalysis);
	}, [
		statResult,
		modelNamesMap,
		activeMetricDef.name,
		bestAnalysis
	]);
	const latexCode = (0, import_react.useMemo)(() => {
		if (!statResult) return "";
		return generateLatexTable(statResult, rankTable, modelNamesMap, activeMetricDef.name);
	}, [
		statResult,
		rankTable,
		modelNamesMap,
		activeMetricDef.name
	]);
	const csvContent = (0, import_react.useMemo)(() => {
		if (!statResult) return "";
		let csv = `Image,${MODELS.map((m) => `"${m.short} Score", "${m.short} Rank"`).join(",")}\n`;
		for (let i = 0; i < activeImages.length; i++) {
			const img = activeImages[i];
			const rowVals = modelIds.map((mId, mIdx) => {
				const score = rankTable.scores[i]?.[mIdx] ?? 0;
				const rank = statResult.rankingMatrix[i]?.[mIdx] ?? 0;
				return `${score.toFixed(3)},${rank}`;
			});
			csv += `"${img}",${rowVals.join(",")}\n`;
		}
		csv += `Rank Sums,${statResult.rankSums.map((s) => `"",${s.toFixed(1)}`).join(",")}\n`;
		csv += `Average Ranks,${statResult.avgRanks.map((r) => `"",${r.toFixed(3)}`).join(",")}\n`;
		return csv;
	}, [
		statResult,
		activeImages,
		modelIds,
		rankTable
	]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, {
			kicker: "Module 04 · Rigorous Evaluation",
			title: "Statistical Significance & Model Superiority"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 255,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "mb-6 max-w-3xl text-sm text-muted-foreground leading-relaxed",
			children: [
				"Empirical evaluation comparing ",
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "ARES Hybrid-INN" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 257,
					columnNumber: 40
				}, this),
				" against five reproduced state-of-the-art steganography baselines. Executes the ",
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Friedman Omnibus Test" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 258,
					columnNumber: 47
				}, this),
				" (with Iman-Davenport ",
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("em", { children: "F_F" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 258,
					columnNumber: 107
				}, this),
				" ",
				"correction), ",
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Kendall’s W Effect Size" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 259,
					columnNumber: 22
				}, this),
				" (coefficient of concordance), and the",
				" ",
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Nemenyi Post-hoc Test" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 260,
					columnNumber: 9
				}, this),
				" with Demšar Critical Difference diagrams. Supports interactive live testing with instant recalculation."
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 256,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "mb-8 rounded-xl border border-border bg-card p-5 shadow-xs",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-5 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
							className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
							children: "Benchmark Dataset Source"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 269,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-2 flex rounded-lg border border-border bg-muted/40 p-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => setDataSource("reference"),
								className: cn("flex-1 rounded-md py-1.5 text-xs font-medium transition-colors", dataSource === "reference" ? "bg-card text-foreground shadow-xs font-semibold" : "text-muted-foreground hover:text-foreground"),
								children: "ARES Reference (6 Classic Covers)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 273,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => setDataSource("live"),
								className: cn("flex-1 rounded-md py-1.5 text-xs font-medium transition-colors", dataSource === "live" ? "bg-card text-foreground shadow-xs font-semibold text-primary" : "text-muted-foreground hover:text-foreground"),
								children: [
									"Live Session (",
									bench.length > 0 ? `${activeImages.length} Images` : "Empty",
									")"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 276,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 272,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-1.5 text-[11px] text-muted-foreground",
							children: dataSource === "reference" ? "Canonical dataset: Lena, Baboon, Peppers, Airplane, Barbara, Lake." : `Interactive live test run (${activeImages.length} images evaluated across 6 models).`
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 280,
							columnNumber: 13
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 268,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
							className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
							children: "Evaluation Metric"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 287,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
							value: selectedMetric,
							onChange: (e) => setSelectedMetric(e.target.value),
							className: "mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-xs font-medium text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/20",
							children: METRIC_OPTIONS.map((opt) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: opt.id,
								children: [
									opt.name,
									" (",
									opt.unit,
									") — ",
									opt.higherIsBetter ? "Higher is better" : "Lower is better"
								]
							}, opt.id, true, {
								fileName: _jsxFileName,
								lineNumber: 291,
								columnNumber: 42
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 290,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-1.5 text-[11px] text-muted-foreground",
							children: activeMetricDef.description
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 295,
							columnNumber: 13
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 286,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
							className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
							children: "Significance Level (α)"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 300,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-2 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => setAlpha(.05),
								className: cn("flex-1 rounded-md border py-1.5 text-xs font-medium transition-colors", alpha === .05 ? "border-primary bg-primary/10 text-primary font-semibold" : "border-border bg-background text-muted-foreground hover:text-foreground"),
								children: "α = 0.05 (95% Conf.)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 304,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => setAlpha(.01),
								className: cn("flex-1 rounded-md border py-1.5 text-xs font-medium transition-colors", alpha === .01 ? "border-primary bg-primary/10 text-primary font-semibold" : "border-border bg-background text-muted-foreground hover:text-foreground"),
								children: "α = 0.01 (99% Conf.)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 307,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 303,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-3 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: showLiveSuite ? "default" : "outline",
								size: "sm",
								className: "h-8 text-xs flex-1 gap-1.5",
								onClick: () => setShowLiveSuite(!showLiveSuite),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Zap, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 313,
									columnNumber: 17
								}, this), showLiveSuite ? "Hide Live Suite" : "Live Test Suite"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 312,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "outline",
								size: "sm",
								className: "h-8 text-xs flex-1 gap-1.5",
								onClick: () => handleCopy(apaText, "apa-quick"),
								disabled: !statResult,
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 317,
									columnNumber: 17
								}, this), copiedType === "apa-quick" ? "Copied!" : "Quick Copy"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 316,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 311,
							columnNumber: 13
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 299,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 266,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 265,
			columnNumber: 7
		}, this),
		showLiveSuite && /* @__PURE__ */ (void 0)("section", {
			className: "mb-8 rounded-xl border-2 border-primary/30 bg-primary/5 p-5 transition-all",
			children: [
				/* @__PURE__ */ (void 0)("div", {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground",
							children: /* @__PURE__ */ (void 0)(Play, { className: "size-3.5 fill-current" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 330,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 329,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h3", {
							className: "font-display text-base font-semibold text-foreground",
							children: "Interactive Live Testing Suite"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 333,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("p", {
							className: "text-xs text-muted-foreground",
							children: "Run all 6 steganography models in parallel on synthetic or uploaded cover images."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 334,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 332,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 328,
						columnNumber: 13
					}, this), bench.length > 0 && /* @__PURE__ */ (void 0)(Button, {
						variant: "ghost",
						size: "sm",
						className: "h-7 text-xs text-muted-foreground hover:text-destructive",
						onClick: () => {
							setBench([]);
							setDataSource("reference");
						},
						children: "Clear Live Results"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 339,
						columnNumber: 34
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 327,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (void 0)("div", {
					className: "mt-4 grid gap-4 lg:grid-cols-3",
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "rounded-lg border border-border bg-card p-4",
							children: [
								/* @__PURE__ */ (void 0)(Label, {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: "1. Test Image Set"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 350,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "mt-2 space-y-2",
									children: [
										/* @__PURE__ */ (void 0)("label", {
											className: "flex items-center gap-2 text-xs font-medium cursor-pointer",
											children: [/* @__PURE__ */ (void 0)("input", {
												type: "radio",
												name: "livePreset",
												checked: liveSuitePreset === "canonical4",
												onChange: () => setLiveSuitePreset("canonical4"),
												className: "accent-primary"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 355,
												columnNumber: 19
											}, this), /* @__PURE__ */ (void 0)("span", { children: "Canonical 4 Covers (Portrait, Texture, Peppers, Grid)" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 356,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 354,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("label", {
											className: "flex items-center gap-2 text-xs font-medium cursor-pointer",
											children: [/* @__PURE__ */ (void 0)("input", {
												type: "radio",
												name: "livePreset",
												checked: liveSuitePreset === "classic6",
												onChange: () => setLiveSuitePreset("classic6"),
												className: "accent-primary"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 359,
												columnNumber: 19
											}, this), /* @__PURE__ */ (void 0)("span", { children: "Classic 6 Covers (Lena, Baboon, Peppers, Airplane, Barbara, Lake)" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 360,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 358,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("label", {
											className: "flex items-center gap-2 text-xs font-medium cursor-pointer",
											children: [/* @__PURE__ */ (void 0)("input", {
												type: "radio",
												name: "livePreset",
												checked: liveSuitePreset === "custom",
												onChange: () => setLiveSuitePreset("custom"),
												className: "accent-primary"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 363,
												columnNumber: 19
											}, this), /* @__PURE__ */ (void 0)("span", { children: [
												"Upload Custom Images (",
												customFiles.length,
												" uploaded)"
											] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 364,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 362,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 353,
									columnNumber: 15
								}, this),
								liveSuitePreset === "custom" && /* @__PURE__ */ (void 0)("div", {
									className: "mt-3",
									children: [
										/* @__PURE__ */ (void 0)("input", {
											ref: fileInputRef,
											type: "file",
											multiple: true,
											accept: "image/png,image/jpeg,image/webp",
											className: "hidden",
											onChange: handleCustomFileAdd
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 369,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)(Button, {
											type: "button",
											variant: "outline",
											size: "sm",
											className: "w-full text-xs gap-1.5 h-8",
											onClick: () => fileInputRef.current?.click(),
											children: [/* @__PURE__ */ (void 0)(Upload, { className: "size-3.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 371,
												columnNumber: 21
											}, this), "Upload Image Files"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 370,
											columnNumber: 19
										}, this),
										customFiles.length > 0 && /* @__PURE__ */ (void 0)("div", {
											className: "mt-2 max-h-24 overflow-y-auto rounded border border-border p-1 text-[11px] text-muted-foreground",
											children: customFiles.map((f, i) => /* @__PURE__ */ (void 0)("div", {
												className: "flex justify-between py-0.5 px-1 truncate",
												children: [/* @__PURE__ */ (void 0)("span", {
													className: "truncate",
													children: f.name
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 376,
													columnNumber: 27
												}, this), /* @__PURE__ */ (void 0)("button", {
													type: "button",
													className: "text-destructive hover:underline ml-2 text-[10px]",
													onClick: () => setCustomFiles(customFiles.filter((_, idx) => idx !== i)),
													children: "remove"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 377,
													columnNumber: 27
												}, this)]
											}, i, true, {
												fileName: _jsxFileName,
												lineNumber: 375,
												columnNumber: 50
											}, this))
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 374,
											columnNumber: 46
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 368,
									columnNumber: 48
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 349,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "rounded-lg border border-border bg-card p-4",
							children: [/* @__PURE__ */ (void 0)(Label, {
								className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
								children: "2. Stego Secret Payload"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 387,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "mt-2 space-y-2",
								children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
									className: "text-[11px] text-muted-foreground",
									children: "Secret Text:"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 392,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("input", {
									type: "text",
									value: benchSecret,
									onChange: (e) => setBenchCreds(e.target.value, benchPassword),
									className: "mt-1 h-7 w-full rounded border border-border bg-background px-2 text-xs font-mono",
									placeholder: "Secret string to embed"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 393,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 391,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
									className: "text-[11px] text-muted-foreground",
									children: "Key Passphrase:"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 396,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("input", {
									type: "password",
									value: benchPassword,
									onChange: (e) => setBenchCreds(benchSecret, e.target.value),
									className: "mt-1 h-7 w-full rounded border border-border bg-background px-2 text-xs font-mono",
									placeholder: "Passphrase"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 397,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 395,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 390,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 386,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "flex flex-col justify-between rounded-lg border border-border bg-card p-4",
							children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)(Label, {
								className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
								children: "3. Execute Evaluation"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 405,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "mt-2 text-xs text-muted-foreground leading-relaxed",
								children: "Encodes the payload across all covers using each of the 6 algorithms, extracts secrets, computes exact PSNR, SSIM, and MSE metrics, and updates Friedman tests."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 408,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 404,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)(Button, {
								variant: "default",
								size: "sm",
								className: "mt-3 w-full gap-2 text-xs font-semibold h-9",
								disabled: runningLiveBench,
								onClick: handleExecuteLiveBenchmark,
								children: runningLiveBench ? /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(RefreshCw, { className: "size-3.5 animate-spin" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 416,
									columnNumber: 21
								}, this), "Running Evaluation..."] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 415,
									columnNumber: 37
								}, this) : /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(Play, { className: "size-3.5 fill-current" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 419,
									columnNumber: 21
								}, this), "Execute Live Benchmark"] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 418,
									columnNumber: 25
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 414,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 403,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 347,
					columnNumber: 11
				}, this),
				liveBenchProgress && /* @__PURE__ */ (void 0)("div", {
					className: "mt-4 rounded-lg bg-card border border-border p-3",
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "flex items-center justify-between text-xs mb-1.5 font-medium",
						children: [/* @__PURE__ */ (void 0)("span", {
							className: "text-foreground flex items-center gap-2",
							children: [/* @__PURE__ */ (void 0)("span", { className: "inline-block size-2 rounded-full bg-primary animate-pulse" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 430,
								columnNumber: 19
							}, this), liveBenchProgress.label]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 429,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("span", {
							className: "font-mono text-muted-foreground",
							children: [Math.round(liveBenchProgress.current / liveBenchProgress.total * 100), "%"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 433,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 428,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "h-2 w-full overflow-hidden rounded-full bg-muted",
						children: /* @__PURE__ */ (void 0)("div", {
							className: "h-full bg-primary transition-all duration-300",
							style: { width: `${liveBenchProgress.current / liveBenchProgress.total * 100}%` }
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 438,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 437,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 427,
					columnNumber: 33
				}, this),
				liveBenchStatus && !liveBenchProgress && /* @__PURE__ */ (void 0)("div", {
					className: "mt-3 rounded-lg bg-card border border-border p-2.5 text-xs text-primary flex items-center gap-2 font-medium",
					children: [/* @__PURE__ */ (void 0)(CircleCheck, { className: "size-4 text-emerald-500 shrink-0" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 445,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("span", { children: liveBenchStatus }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 446,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 444,
					columnNumber: 53
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 326,
			columnNumber: 25
		}, this),
		!statResult ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "rounded-xl border border-dashed border-border bg-card p-10 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TriangleAlert, { className: "size-10 text-muted-foreground mx-auto mb-2 opacity-60" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 452,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
					className: "font-display text-lg",
					children: "Insufficient Data for Statistical Testing"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 453,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-sm text-muted-foreground max-w-md mx-auto",
					children: "The Friedman non-parametric test and Nemenyi post-hoc evaluation require at least 2 datasets and 2 models. Load the Reference Dataset or run an interactive live benchmark."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 454,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-5 flex justify-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						onClick: () => setDataSource("reference"),
						variant: "default",
						size: "sm",
						children: "Load Reference Dataset (6 Images)"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 459,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						onClick: () => {
							setShowLiveSuite(true);
							handleExecuteLiveBenchmark();
						},
						disabled: runningLiveBench,
						variant: "outline",
						size: "sm",
						children: "Run Live Benchmark"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 462,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 458,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 451,
			columnNumber: 22
		}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "space-y-10",
			children: [
				bestAnalysis && bestModelDef && /* @__PURE__ */ (void 0)("section", {
					className: "relative overflow-hidden rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 via-card to-card p-6 shadow-sm",
					children: /* @__PURE__ */ (void 0)("div", {
						className: "flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [/* @__PURE__ */ (void 0)("span", {
										className: "inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300",
										children: [/* @__PURE__ */ (void 0)(Trophy, { className: "size-3.5 fill-current" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 478,
											columnNumber: 23
										}, this), "Top Performing Model · Rank #1"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 477,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: "rounded-full bg-muted px-2.5 py-0.5 text-xs font-mono font-medium text-muted-foreground",
										children: [
											"Omnibus Verified (α = ",
											alpha,
											")"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 481,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 476,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h2", {
									className: "font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl",
									children: bestModelDef.name
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 487,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("p", {
									className: "text-xs text-muted-foreground mt-0.5",
									children: [
										bestModelDef.paper,
										" · ",
										bestModelDef.note
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 490,
									columnNumber: 21
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 486,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "flex flex-wrap items-center gap-2 text-xs",
									children: [
										/* @__PURE__ */ (void 0)("span", {
											className: "inline-flex items-center gap-1 rounded-md bg-card border border-border px-2.5 py-1 text-muted-foreground",
											children: [/* @__PURE__ */ (void 0)(ShieldCheck, { className: "size-3.5 text-emerald-600 dark:text-emerald-400" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 498,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)("span", { children: [
												"1st place on ",
												/* @__PURE__ */ (void 0)("strong", { children: bestAnalysis.winCount }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 500,
													columnNumber: 38
												}, this),
												" of ",
												/* @__PURE__ */ (void 0)("strong", { children: statResult.n }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 500,
													columnNumber: 82
												}, this),
												" covers (",
												bestAnalysis.winRatePct.toFixed(0),
												"% Win Rate)"
											] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 499,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 497,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("span", {
											className: "inline-flex items-center gap-1 rounded-md bg-card border border-border px-2.5 py-1 text-muted-foreground",
											children: [/* @__PURE__ */ (void 0)(Zap, { className: "size-3.5 text-primary" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 506,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)("span", { children: [
												"Lead over runner-up (",
												runnerUpDef?.short,
												"):",
												" ",
												/* @__PURE__ */ (void 0)("strong", {
													className: "font-mono text-foreground",
													children: ["+", bestAnalysis.leadMargin.toFixed(3)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 509,
													columnNumber: 25
												}, this),
												" ",
												"mean ranks"
											] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 507,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 505,
											columnNumber: 21
										}, this),
										bestAnalysis.isStatisticallySuperiorToRunnerUp ? /* @__PURE__ */ (void 0)("span", {
											className: "inline-flex items-center gap-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 font-semibold text-emerald-700 dark:text-emerald-300",
											children: [/* @__PURE__ */ (void 0)(CircleCheck, { className: "size-3.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 515,
												columnNumber: 25
											}, this), "Statistically Significantly Superior to Runner-Up (|Δ| > CD)"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 514,
											columnNumber: 71
										}, this) : bestAnalysis.statisticallyOutperformedCount > 0 ? /* @__PURE__ */ (void 0)("span", {
											className: "inline-flex items-center gap-1 rounded-md bg-primary/10 border border-primary/20 px-2.5 py-1 text-primary font-medium",
											children: [
												"Statistically Outperforms ",
												bestAnalysis.statisticallyOutperformedCount,
												" Baselines (p <",
												" ",
												alpha,
												")"
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 517,
											columnNumber: 83
										}, this) : /* @__PURE__ */ (void 0)("span", {
											className: "inline-flex items-center gap-1 rounded-md bg-muted px-2.5 py-1 text-muted-foreground",
											children: "Rank #1 in Ensemble"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 520,
											columnNumber: 33
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 496,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 475,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:w-96",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "rounded-xl border border-border bg-card/80 p-3 text-center",
									children: [
										/* @__PURE__ */ (void 0)("span", {
											className: "text-[11px] font-medium uppercase tracking-wider text-muted-foreground",
											children: "Average Rank"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 529,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "mt-1 font-mono text-2xl font-extrabold text-emerald-600 dark:text-emerald-400",
											children: bestAnalysis.bestModelRank.toFixed(3)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 532,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("span", {
											className: "text-[10px] text-muted-foreground",
											children: "1.000 is theoretical best"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 535,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 528,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "rounded-xl border border-border bg-card/80 p-3 text-center",
									children: [
										/* @__PURE__ */ (void 0)("span", {
											className: "text-[11px] font-medium uppercase tracking-wider text-muted-foreground",
											children: ["Mean ", activeMetricDef.name.split(" ")[0]]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 539,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "mt-1 font-mono text-2xl font-extrabold text-foreground",
											children: bestAnalysis.meanScore.toFixed(selectedMetric === "psnr" ? 2 : 3)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 542,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("span", {
											className: "text-[10px] text-muted-foreground",
											children: activeMetricDef.unit
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 545,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 538,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "col-span-2 sm:col-span-1 rounded-xl border border-border bg-card/80 p-3 text-center",
									children: [
										/* @__PURE__ */ (void 0)("span", {
											className: "text-[11px] font-medium uppercase tracking-wider text-muted-foreground",
											children: "Concordance"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 549,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "mt-1 font-mono text-2xl font-extrabold text-primary",
											children: statResult.kendallW.toFixed(2)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 552,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("span", {
											className: "text-[10px] text-muted-foreground",
											children: [statResult.effectMagnitude, " agreement"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 555,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 548,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 527,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 474,
						columnNumber: 15
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 473,
					columnNumber: 44
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mb-3 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "font-display text-lg text-foreground",
						children: "Statistical Hypothesis Test Suite"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 566,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-xs text-muted-foreground",
						children: [
							"Analyzing ",
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: statResult.n }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 568,
								columnNumber: 27
							}, this),
							" images across ",
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: statResult.k }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 568,
								columnNumber: 73
							}, this),
							" models for",
							" ",
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: activeMetricDef.name }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 569,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 567,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 565,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-xl border border-border bg-card p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-xs font-mono uppercase tracking-wider text-muted-foreground",
										children: "Friedman χ_F²"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 577,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: cn("rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase", statResult.isSignificantChi2 ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-muted text-muted-foreground"),
										children: statResult.isSignificantChi2 ? "Reject H₀" : "Fail to Reject"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 580,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 576,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-2 flex items-baseline gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-mono text-2xl font-bold text-foreground",
										children: statResult.chi2.toFixed(3)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 585,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-xs text-muted-foreground font-mono",
										children: ["df = ", statResult.df]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 586,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 584,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-2 text-[11px] text-muted-foreground font-mono",
									children: ["p ≈ ", statResult.pApprox < 1e-4 ? "< 0.0001" : statResult.pApprox.toFixed(5)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 588,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 575,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-xl border border-border bg-card p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-xs font-mono uppercase tracking-wider text-muted-foreground",
										children: "Iman-Davenport F_F"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 596,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: cn("rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase", statResult.isSignificantF ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-muted text-muted-foreground"),
										children: statResult.isSignificantF ? "Significant" : "Not Sig."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 599,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 595,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-2 flex items-baseline gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-mono text-2xl font-bold text-foreground",
										children: statResult.imanDavenportF > 9e3 ? "∞" : statResult.imanDavenportF.toFixed(3)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 604,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-xs text-muted-foreground font-mono",
										children: [
											"F(",
											statResult.df1,
											", ",
											statResult.df2,
											")"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 607,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 603,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-2 text-[11px] text-muted-foreground font-mono",
									children: ["p_F = ", statResult.pFDistribution < 1e-4 ? "< 0.0001" : statResult.pFDistribution.toFixed(5)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 611,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 594,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-xl border border-border bg-card p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-xs font-mono uppercase tracking-wider text-muted-foreground",
										children: "Kendall’s W Effect"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 619,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-primary",
										children: statResult.effectMagnitude
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 622,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 618,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-2 flex items-baseline gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-mono text-2xl font-bold text-foreground",
										children: statResult.kendallW.toFixed(3)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 627,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-xs text-muted-foreground font-mono",
										children: "[0..1 scale]"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 628,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 626,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-2 text-[11px] text-muted-foreground",
									children: statResult.tieCorrectionApplied ? "Tie-corrected concordance" : "Concordance of rankings"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 630,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 617,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-xl border border-border bg-card p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-xs font-mono uppercase tracking-wider text-muted-foreground",
										children: [
											"Nemenyi CD (α=",
											alpha,
											")"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 638,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-[10px] font-mono text-muted-foreground",
										children: ["q_α = ", statResult.qAlpha.toFixed(3)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 641,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 637,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-2 flex items-baseline gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-mono text-2xl font-bold text-foreground",
										children: statResult.nemenyiCD.toFixed(3)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 644,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-xs text-muted-foreground font-mono",
										children: "rank threshold"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 647,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 643,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-2 text-[11px] text-muted-foreground",
									children: "Critical Difference limit"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 649,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 636,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 573,
					columnNumber: 13
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 564,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mb-3 flex items-baseline justify-between",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "font-display text-xl text-foreground",
						children: "1. Demšar Critical Difference (CD) Diagram"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 660,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							"Visualizes the post-hoc Nemenyi test (Demšar, 2006). Models separated by less than the Critical Difference (CD = ",
							statResult.nemenyiCD.toFixed(3),
							") are joined by an emerald clique bar and are statistically equivalent."
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 661,
						columnNumber: 17
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 659,
						columnNumber: 15
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 658,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CDDiagram, {
					modelIds,
					avgRanks: statResult.avgRanks,
					cd: statResult.nemenyiCD,
					cliques: statResult.cliques,
					k: statResult.k,
					metricLabel: activeMetricDef.name,
					higherIsBetter: activeMetricDef.higherIsBetter
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 669,
					columnNumber: 13
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 657,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
					className: "rounded-xl border border-border bg-card p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "font-display text-xl text-foreground mb-1",
							children: "2. Kendall’s W Effect Size (Concordance of Raters)"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 676,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground mb-4",
							children: [
								"Measures the degree of agreement among the ",
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("em", { children: ["N = ", statResult.n] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 680,
									columnNumber: 58
								}, this),
								" benchmark test images regarding the relative performance ranking of the ",
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("em", { children: ["k = ", statResult.k] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 681,
									columnNumber: 51
								}, this),
								" steganography algorithms."
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 679,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex justify-between text-xs font-mono text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "0.0 (No Agreement)" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 687,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "0.1 (Negligible)" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 688,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "0.3 (Small)" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 689,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "0.5 (Moderate)" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 690,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "0.7 (Strong)" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 691,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "1.0 (Unanimous)" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 692,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 686,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "relative h-4 w-full overflow-hidden rounded-full bg-muted",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "absolute inset-0 grid grid-cols-5 opacity-30",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "border-r border-background bg-slate-400" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 697,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "border-r border-background bg-sky-400" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 698,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "border-r border-background bg-indigo-400" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 699,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "border-r border-background bg-blue-500" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 700,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-emerald-500" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 701,
												columnNumber: 19
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 696,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "absolute top-0 bottom-0 left-0 bg-primary transition-all duration-500",
										style: { width: `${Math.min(100, statResult.kendallW * 100)}%` }
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 704,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 694,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between text-xs pt-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-medium text-foreground",
										children: [
											"Measured Kendall’s W =",
											" ",
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
												className: "font-mono text-primary",
												children: statResult.kendallW.toFixed(4)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 711,
												columnNumber: 19
											}, this),
											" (",
											statResult.effectMagnitude.toUpperCase(),
											" effect)"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 709,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-muted-foreground",
										children: [
											statResult.tieCorrectionApplied ? "Exact tie correction applied" : "No ties detected",
											" · χ² =",
											" ",
											(statResult.n * (statResult.k - 1) * statResult.kendallW).toFixed(2)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 714,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 708,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 685,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-4 rounded-lg bg-muted/40 p-3 text-xs leading-relaxed text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
									className: "text-foreground",
									children: "Scientific Interpretation: "
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 722,
									columnNumber: 15
								}, this),
								statResult.effectDescription,
								". This demonstrates that the algorithm hierarchy is",
								" ",
								statResult.kendallW > .5 ? "highly robust and independent of cover frequency content or spatial gradients" : "moderately consistent across test covers",
								"."
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 721,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 675,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
					className: "rounded-xl border border-border bg-card p-5",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mb-3 flex items-baseline justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "font-display text-xl text-foreground",
							children: "3. Nemenyi Significance Cross-Matrix (Heatmap)"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 735,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								"Matrix showing the absolute average rank difference |ΔR| between every pair of models. Cells with |ΔR| > CD (",
								statResult.nemenyiCD.toFixed(3),
								") at α = ",
								alpha,
								" indicate statistically significant divergence."
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 738,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 734,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-3 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "size-3 rounded bg-emerald-500/20 border border-emerald-500/40" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 746,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Significant (|Δ| > CD)" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 747,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 745,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "size-3 rounded bg-muted border border-border" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 750,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Statistically Equivalent" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 751,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 749,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 744,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 733,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", {
							className: "w-full text-center text-xs border-collapse",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", {
								className: "border-b border-border bg-muted/40",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "p-2.5 text-left font-medium text-muted-foreground",
									children: "Model"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 760,
									columnNumber: 21
								}, this), MODELS.map((m) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: cn("p-2.5 font-semibold", m.id === "ares_hybrid_inn" ? "text-primary" : "text-foreground"),
									children: m.short
								}, m.id, false, {
									fileName: _jsxFileName,
									lineNumber: 761,
									columnNumber: 38
								}, this))]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 759,
								columnNumber: 19
							}, this) }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 758,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { children: MODELS.map((rowModel, rIdx) => {
								const rowRank = statResult.avgRanks[rIdx] ?? 0;
								return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", {
									className: "border-b border-border hover:bg-muted/10 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "p-2.5 text-left font-medium text-foreground whitespace-nowrap",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: cn(rowModel.id === "ares_hybrid_inn" && "text-primary font-bold"),
											children: rowModel.short
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 771,
											columnNumber: 27
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "ml-2 font-mono text-[11px] text-muted-foreground",
											children: [
												"(R̄ = ",
												rowRank.toFixed(2),
												")"
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 774,
											columnNumber: 27
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 770,
										columnNumber: 25
									}, this), MODELS.map((colModel, cIdx) => {
										if (rIdx === cIdx) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
											className: "p-2.5 bg-muted/30 font-mono text-muted-foreground",
											children: "—"
										}, colModel.id, false, {
											fileName: _jsxFileName,
											lineNumber: 781,
											columnNumber: 30
										}, this);
										const colRank = statResult.avgRanks[cIdx] ?? 0;
										const diff = Math.abs(rowRank - colRank);
										const isSig = diff > statResult.nemenyiCD;
										return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
											className: cn("p-2.5 font-mono tabular-nums transition-colors", isSig ? "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 font-bold" : "text-muted-foreground"),
											title: `${rowModel.short} vs ${colModel.short}: |ΔR| = ${diff.toFixed(3)} (CD = ${statResult.nemenyiCD.toFixed(3)})`,
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: diff.toFixed(2) }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 789,
												columnNumber: 31
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: cn("text-[9px] px-1 rounded uppercase tracking-wider", isSig ? "bg-emerald-500/25 text-emerald-700 dark:text-emerald-300" : "text-muted-foreground"),
												children: isSig ? "✓ Sig" : "n.s."
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 790,
												columnNumber: 31
											}, this)]
										}, colModel.id, true, {
											fileName: _jsxFileName,
											lineNumber: 788,
											columnNumber: 28
										}, this);
									})]
								}, rowModel.id, true, {
									fileName: _jsxFileName,
									lineNumber: 769,
									columnNumber: 24
								}, this);
							}) }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 766,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 757,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 756,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 732,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mb-3 flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "font-display text-xl text-foreground",
						children: "4. Pairwise Post-Hoc Comparisons"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 808,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							"Individual two-tailed z-statistics and p-values compared against Critical Difference CD =",
							" ",
							statResult.nemenyiCD.toFixed(3),
							"."
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 809,
						columnNumber: 17
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 807,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-1.5 rounded-lg border border-border p-1 bg-muted/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "ghost",
								size: "sm",
								className: cn("h-7 text-xs px-2.5", filterMode === "all" && "bg-card shadow-xs font-semibold"),
								onClick: () => setFilterMode("all"),
								children: [
									"All Pairs (",
									statResult.pairs.length,
									")"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 815,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "ghost",
								size: "sm",
								className: cn("h-7 text-xs px-2.5", filterMode === "sig" && "bg-card shadow-xs font-semibold text-emerald-600"),
								onClick: () => setFilterMode("sig"),
								children: [
									"Significant Only (",
									statResult.pairs.filter((p) => p.significant).length,
									")"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 818,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "ghost",
								size: "sm",
								className: cn("h-7 text-xs px-2.5", filterMode === "ares" && "bg-card shadow-xs font-semibold text-primary"),
								onClick: () => setFilterMode("ares"),
								children: "ARES vs Baselines (5)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 821,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 814,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 806,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "overflow-x-auto rounded-xl border border-border",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", {
						className: "w-full min-w-[700px] text-left text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", {
							className: "bg-muted text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "px-3 py-2 font-medium",
									children: "Model A"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 831,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "px-3 py-2 font-medium",
									children: "Model B"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 832,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "px-3 py-2 font-medium",
									children: "Rank A"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 833,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "px-3 py-2 font-medium",
									children: "Rank B"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 834,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "px-3 py-2 font-medium font-mono",
									children: "|Δ Rank|"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 835,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "px-3 py-2 font-medium font-mono",
									children: "Threshold (CD)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 836,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "px-3 py-2 font-medium font-mono",
									children: "z-Score"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 837,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "px-3 py-2 font-medium font-mono",
									children: "p-Value"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 838,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "px-3 py-2 font-medium",
									children: "Verdict"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 839,
									columnNumber: 21
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 830,
								columnNumber: 19
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 829,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { children: statResult.pairs.filter((p) => {
							if (filterMode === "sig") return p.significant;
							if (filterMode === "ares") return p.a === "ares_hybrid_inn" || p.b === "ares_hybrid_inn";
							return true;
						}).map((pair) => {
							const modA = MODELS.find((m) => m.id === pair.a);
							const modB = MODELS.find((m) => m.id === pair.b);
							const idxA = modelIds.indexOf(pair.a);
							const idxB = modelIds.indexOf(pair.b);
							const rankA = statResult.avgRanks[idxA] ?? 0;
							const rankB = statResult.avgRanks[idxB] ?? 0;
							const isAresPair = pair.a === "ares_hybrid_inn" || pair.b === "ares_hybrid_inn";
							return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", {
								className: cn("border-t border-border transition-colors", pair.significant && "bg-primary/4", isAresPair && "font-medium"),
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-3 py-2",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: pair.a === "ares_hybrid_inn" ? "text-primary font-bold" : "",
											children: modA?.short || pair.a
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 857,
											columnNumber: 29
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 856,
										columnNumber: 27
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-3 py-2",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: pair.b === "ares_hybrid_inn" ? "text-primary font-bold" : "",
											children: modB?.short || pair.b
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 862,
											columnNumber: 29
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 861,
										columnNumber: 27
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-3 py-2 font-mono tabular-nums",
										children: rankA.toFixed(2)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 866,
										columnNumber: 27
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-3 py-2 font-mono tabular-nums",
										children: rankB.toFixed(2)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 867,
										columnNumber: 27
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-3 py-2 font-mono tabular-nums font-semibold",
										children: pair.rankDiff.toFixed(3)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 868,
										columnNumber: 27
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-3 py-2 font-mono tabular-nums text-muted-foreground",
										children: statResult.nemenyiCD.toFixed(3)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 869,
										columnNumber: 27
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-3 py-2 font-mono tabular-nums",
										children: pair.zValue.toFixed(2)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 872,
										columnNumber: 27
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-3 py-2 font-mono tabular-nums",
										children: pair.pValue < .001 ? "< 0.001" : pair.pValue.toFixed(4)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 873,
										columnNumber: 27
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-3 py-2",
										children: pair.significant ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "inline-flex items-center gap-1 rounded bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400",
											children: [
												"Significant (p < ",
												alpha,
												")"
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 877,
											columnNumber: 49
										}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "inline-flex rounded bg-muted px-2 py-0.5 text-[11px] text-muted-foreground",
											children: "No Sig. Difference"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 879,
											columnNumber: 41
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 876,
										columnNumber: 27
									}, this)
								]
							}, `${pair.a}-${pair.b}`, true, {
								fileName: _jsxFileName,
								lineNumber: 855,
								columnNumber: 24
							}, this);
						}) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 842,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 828,
						columnNumber: 15
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 827,
					columnNumber: 13
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 805,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mb-3 flex items-baseline justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "font-display text-xl text-foreground",
						children: "5. Full Ranking & Metric Score Matrix"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 895,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-xs text-muted-foreground",
						children: "Showing individual image scores and assigned ranks (1 = best)"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 896,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 894,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "overflow-x-auto rounded-xl border border-border",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", {
						className: "w-full min-w-[760px] text-left text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", {
							className: "bg-muted text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
								className: "px-3 py-2 font-medium",
								children: "Cover Image"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 905,
								columnNumber: 21
							}, this), MODELS.map((m) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
								className: cn("px-3 py-2 font-medium text-center", m.id === "ares_hybrid_inn" && "text-primary font-bold"),
								children: m.short
							}, m.id, false, {
								fileName: _jsxFileName,
								lineNumber: 906,
								columnNumber: 38
							}, this))] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 904,
								columnNumber: 19
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 903,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { children: [
							activeImages.map((img, imgIdx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", {
								className: "border-t border-border",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
									className: "px-3 py-2 font-medium text-foreground",
									children: img
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 913,
									columnNumber: 23
								}, this), modelIds.map((mId, mIdx) => {
									const rawScore = rankTable.scores[imgIdx]?.[mIdx];
									const rankVal = statResult.rankingMatrix[imgIdx]?.[mIdx] ?? 0;
									const isBest = rankVal === 1;
									return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: cn("px-3 py-2 text-center font-mono tabular-nums", isBest && "bg-primary/8 font-semibold text-primary"),
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: cn("rounded px-1.5 py-0.5 text-[10px] mr-1.5", isBest ? "bg-primary/20 text-primary font-bold" : "bg-muted text-muted-foreground"),
											children: ["#", rankVal]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 919,
											columnNumber: 29
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: typeof rawScore === "number" && rawScore > -1e8 && rawScore < 1e8 ? rawScore.toFixed(selectedMetric === "psnr" ? 2 : 3) : "—" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 922,
											columnNumber: 29
										}, this)]
									}, mId, true, {
										fileName: _jsxFileName,
										lineNumber: 918,
										columnNumber: 26
									}, this);
								})]
							}, img, true, {
								fileName: _jsxFileName,
								lineNumber: 912,
								columnNumber: 54
							}, this)),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", {
								className: "border-t-2 border-border bg-muted/30 font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
									className: "px-3 py-2 text-foreground font-mono",
									children: "Rank Sum (R_j)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 930,
									columnNumber: 21
								}, this), statResult.rankSums.map((sum, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
									className: "px-3 py-2 text-center font-mono tabular-nums",
									children: sum.toFixed(1)
								}, i, false, {
									fileName: _jsxFileName,
									lineNumber: 931,
									columnNumber: 58
								}, this))]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 929,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", {
								className: "border-t border-border bg-muted/60 font-bold text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
									className: "px-3 py-2 font-mono",
									children: "Average Rank (R̄_j)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 937,
									columnNumber: 21
								}, this), statResult.avgRanks.map((avg, i) => {
									const isOverallBest = i === statResult.avgRanks.indexOf(Math.min(...statResult.avgRanks));
									return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: cn("px-3 py-2 text-center font-mono tabular-nums text-sm", isOverallBest && "text-emerald-600 dark:text-emerald-400 font-extrabold bg-emerald-500/10"),
										children: avg.toFixed(3)
									}, i, false, {
										fileName: _jsxFileName,
										lineNumber: 940,
										columnNumber: 26
									}, this);
								})]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 936,
								columnNumber: 19
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 911,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 902,
						columnNumber: 15
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 901,
					columnNumber: 13
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 893,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
					className: "rounded-xl border border-border bg-card p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap items-center justify-between gap-3 mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "font-display text-xl text-foreground",
								children: "6. Publication & Export Formats"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 956,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-muted-foreground",
								children: "Ready-to-use citations, LaTeX tables, and raw data for research papers, reports, or journal submission."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 957,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 955,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex rounded-lg border border-border bg-muted/40 p-1 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										onClick: () => setExportTab("apa"),
										className: cn("rounded px-3 py-1 font-medium transition-colors", exportTab === "apa" ? "bg-card text-foreground shadow-xs font-semibold" : "text-muted-foreground"),
										children: "APA / Journal Text"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 963,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										onClick: () => setExportTab("latex"),
										className: cn("rounded px-3 py-1 font-medium transition-colors", exportTab === "latex" ? "bg-card text-foreground shadow-xs font-semibold" : "text-muted-foreground"),
										children: "LaTeX Table"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 966,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										onClick: () => setExportTab("markdown"),
										className: cn("rounded px-3 py-1 font-medium transition-colors", exportTab === "markdown" ? "bg-card text-foreground shadow-xs font-semibold" : "text-muted-foreground"),
										children: "Markdown"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 969,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										onClick: () => setExportTab("csv"),
										className: cn("rounded px-3 py-1 font-medium transition-colors", exportTab === "csv" ? "bg-card text-foreground shadow-xs font-semibold" : "text-muted-foreground"),
										children: "CSV Data"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 972,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 962,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 954,
							columnNumber: 13
						}, this),
						exportTab === "apa" && /* @__PURE__ */ (void 0)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "rounded-lg bg-muted/30 border border-border p-4 text-xs font-serif leading-relaxed text-foreground/90",
								children: apaText
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 980,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)(Button, {
								variant: "outline",
								size: "sm",
								className: "text-xs gap-1.5 h-8",
								onClick: () => handleCopy(apaText, "apa"),
								children: [/* @__PURE__ */ (void 0)(Copy, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 984,
									columnNumber: 19
								}, this), copiedType === "apa" ? "✓ Copied APA Paragraph" : "Copy Formatted Text"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 983,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 979,
							columnNumber: 37
						}, this),
						exportTab === "latex" && /* @__PURE__ */ (void 0)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (void 0)("pre", {
								className: "overflow-x-auto rounded-lg bg-muted/40 border border-border p-4 font-mono text-[11px] leading-relaxed text-foreground",
								children: latexCode
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 991,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)(Button, {
								variant: "outline",
								size: "sm",
								className: "text-xs gap-1.5 h-8",
								onClick: () => handleCopy(latexCode, "latex"),
								children: [/* @__PURE__ */ (void 0)(Code, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 995,
									columnNumber: 19
								}, this), copiedType === "latex" ? "✓ Copied LaTeX Snippet" : "Copy LaTeX Table Code"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 994,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 990,
							columnNumber: 39
						}, this),
						exportTab === "markdown" && /* @__PURE__ */ (void 0)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (void 0)("pre", {
								className: "overflow-x-auto rounded-lg bg-muted/40 border border-border p-4 font-mono text-[11px] leading-relaxed text-foreground",
								children: [
									`### Non-Parametric Steganography Evaluation`,
									`- **Metric**: ${activeMetricDef.name} (${activeMetricDef.unit})`,
									`- **Friedman Chi-Square**: $\\chi_F^2(${statResult.df}) = ${statResult.chi2.toFixed(3)}$, $p = ${statResult.pApprox.toFixed(4)}$`,
									`- **Iman-Davenport F**: $F_F(${statResult.df1}, ${statResult.df2}) = ${statResult.imanDavenportF.toFixed(3)}$, $p_F = ${statResult.pFDistribution.toFixed(4)}$`,
									`- **Kendall's W**: $W = ${statResult.kendallW.toFixed(4)}$ (${statResult.effectMagnitude})`,
									`- **Nemenyi Critical Difference**: $CD = ${statResult.nemenyiCD.toFixed(3)}$ ($\\alpha = ${statResult.alpha}$)`,
									`- **Best Model**: **${bestModelDef?.name || "ARES"}** (Mean Rank = ${bestAnalysis?.bestModelRank.toFixed(3)})`
								].join("\n")
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1002,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)(Button, {
								variant: "outline",
								size: "sm",
								className: "text-xs gap-1.5 h-8",
								onClick: () => handleCopy([
									`### Non-Parametric Steganography Evaluation`,
									`- **Metric**: ${activeMetricDef.name} (${activeMetricDef.unit})`,
									`- **Friedman Chi-Square**: $\\chi_F^2(${statResult.df}) = ${statResult.chi2.toFixed(3)}$, $p = ${statResult.pApprox.toFixed(4)}$`,
									`- **Iman-Davenport F**: $F_F(${statResult.df1}, ${statResult.df2}) = ${statResult.imanDavenportF.toFixed(3)}$, $p_F = ${statResult.pFDistribution.toFixed(4)}$`,
									`- **Kendall's W**: $W = ${statResult.kendallW.toFixed(4)}$ (${statResult.effectMagnitude})`,
									`- **Nemenyi Critical Difference**: $CD = ${statResult.nemenyiCD.toFixed(3)}$ ($\\alpha = ${statResult.alpha}$)`,
									`- **Best Model**: **${bestModelDef?.name || "ARES"}** (Mean Rank = ${bestAnalysis?.bestModelRank.toFixed(3)})`
								].join("\n"), "markdown"),
								children: [/* @__PURE__ */ (void 0)(FileText, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1006,
									columnNumber: 19
								}, this), copiedType === "markdown" ? "✓ Copied Markdown" : "Copy Markdown Summary"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1005,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1001,
							columnNumber: 42
						}, this),
						exportTab === "csv" && /* @__PURE__ */ (void 0)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (void 0)("pre", {
								className: "overflow-x-auto max-h-56 rounded-lg bg-muted/40 border border-border p-4 font-mono text-[11px] leading-relaxed text-foreground",
								children: csvContent
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1013,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)(Button, {
								variant: "outline",
								size: "sm",
								className: "text-xs gap-1.5 h-8",
								onClick: () => handleCopy(csvContent, "csv"),
								children: [/* @__PURE__ */ (void 0)(ChartColumn, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1017,
									columnNumber: 19
								}, this), copiedType === "csv" ? "✓ Copied CSV" : "Copy CSV Data"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1016,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1012,
							columnNumber: 37
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 953,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 469,
			columnNumber: 18
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 254,
		columnNumber: 10
	}, this);
}
//#endregion
export { StatsPage as component };
