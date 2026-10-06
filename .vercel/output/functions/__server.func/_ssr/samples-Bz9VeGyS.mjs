//#region node_modules/.nitro/vite/services/ssr/assets/samples-Bz9VeGyS.js
function makeCanvas(width = 384, height = 384) {
	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext("2d", { willReadFrequently: true });
	if (!ctx) throw new Error("Canvas 2D unavailable");
	return {
		canvas,
		ctx
	};
}
function canvasToRgbImage(canvas, ctx) {
	const id = ctx.getImageData(0, 0, canvas.width, canvas.height);
	return {
		width: canvas.width,
		height: canvas.height,
		data: id.data
	};
}
function generatePortraitSample(width = 384, height = 384) {
	const { canvas, ctx } = makeCanvas(width, height);
	const bgGrad = ctx.createLinearGradient(0, 0, width, height);
	bgGrad.addColorStop(0, "#4a2840");
	bgGrad.addColorStop(.5, "#8d5462");
	bgGrad.addColorStop(1, "#c9897e");
	ctx.fillStyle = bgGrad;
	ctx.fillRect(0, 0, width, height);
	const cx = width * .5;
	const cy = height * .52;
	const faceGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, width * .35);
	faceGrad.addColorStop(0, "#f7cfbe");
	faceGrad.addColorStop(.7, "#e4a993");
	faceGrad.addColorStop(1, "#c27d68");
	ctx.fillStyle = faceGrad;
	ctx.beginPath();
	ctx.ellipse(cx, cy, width * .28, height * .36, 0, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillStyle = "#863456";
	ctx.beginPath();
	ctx.ellipse(cx, cy - height * .28, width * .42, height * .16, -.15, 0, Math.PI * 2);
	ctx.fill();
	ctx.strokeStyle = "#dd9bb5";
	ctx.lineWidth = 1.5;
	for (let i = 0; i < 40; i++) {
		const angle = -.5 + i / 40 * 1.2;
		ctx.beginPath();
		ctx.moveTo(cx + Math.cos(angle) * 80, cy - 120 + Math.sin(angle) * 50);
		ctx.quadraticCurveTo(cx + Math.cos(angle) * 160 + i % 3 * 10, cy - 150 - i * 2, cx + Math.cos(angle) * 190, cy - 130 + Math.sin(angle) * 60);
		ctx.stroke();
	}
	ctx.fillStyle = "#3e1c14";
	ctx.beginPath();
	ctx.ellipse(cx - 38, cy - 15, 12, 7, -.1, 0, Math.PI * 2);
	ctx.ellipse(cx + 38, cy - 15, 12, 7, .1, 0, Math.PI * 2);
	ctx.fill();
	ctx.strokeStyle = "#8e3c3c";
	ctx.lineWidth = 2.5;
	ctx.beginPath();
	ctx.moveTo(cx, cy - 5);
	ctx.lineTo(cx - 4, cy + 25);
	ctx.lineTo(cx + 10, cy + 28);
	ctx.stroke();
	ctx.fillStyle = "#b83b48";
	ctx.beginPath();
	ctx.ellipse(cx, cy + 55, 24, 9, 0, 0, Math.PI * 2);
	ctx.fill();
	return canvasToRgbImage(canvas, ctx);
}
function generateTextureSample(width = 384, height = 384) {
	const { canvas, ctx } = makeCanvas(width, height);
	const imgData = ctx.createImageData(width, height);
	const d = imgData.data;
	for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
		const idx = (y * width + x) * 4;
		const nx = x / width;
		const ny = y / height;
		const f1 = Math.sin(nx * 35 + ny * 20);
		const f2 = Math.cos(nx * 70 - ny * 50);
		const f3 = Math.sin(Math.sqrt((x - width / 2) ** 2 + (y - height / 2) ** 2) * .2);
		const f4 = Math.sin(nx * 120) * Math.cos(ny * 120);
		const val = 128 + 55 * f1 + 35 * f2 + 25 * f3 + 15 * f4;
		const r = Math.max(0, Math.min(255, val + 20 * Math.sin(nx * 10)));
		const g = Math.max(0, Math.min(255, val * .85 + 30 * Math.cos(ny * 15)));
		const b = Math.max(0, Math.min(255, val * .7 + 40 * f2));
		d[idx] = r;
		d[idx + 1] = g;
		d[idx + 2] = b;
		d[idx + 3] = 255;
	}
	ctx.putImageData(imgData, 0, 0);
	ctx.strokeStyle = "rgba(240, 230, 210, 0.4)";
	ctx.lineWidth = 1;
	for (let i = 0; i < 60; i++) {
		const y0 = height * .3 + i * 3;
		ctx.beginPath();
		ctx.moveTo(width * .2, y0);
		ctx.quadraticCurveTo(width * .5, y0 + i % 7 * 4 - 10, width * .85, y0 + i % 5 * 6);
		ctx.stroke();
	}
	return canvasToRgbImage(canvas, ctx);
}
function generatePeppersSample(width = 384, height = 384) {
	const { canvas, ctx } = makeCanvas(width, height);
	ctx.fillStyle = "#1b211d";
	ctx.fillRect(0, 0, width, height);
	const p1 = ctx.createRadialGradient(width * .35, height * .45, 10, width * .4, height * .5, 140);
	p1.addColorStop(0, "#8cf05b");
	p1.addColorStop(.3, "#3fa328");
	p1.addColorStop(.8, "#1a5e12");
	p1.addColorStop(1, "#0d310a");
	ctx.fillStyle = p1;
	ctx.beginPath();
	ctx.ellipse(width * .4, height * .5, 110, 130, -.2, 0, Math.PI * 2);
	ctx.fill();
	const p2 = ctx.createRadialGradient(width * .65, height * .4, 15, width * .65, height * .45, 130);
	p2.addColorStop(0, "#ff7568");
	p2.addColorStop(.35, "#db1a1a");
	p2.addColorStop(.85, "#800808");
	p2.addColorStop(1, "#360202");
	ctx.fillStyle = p2;
	ctx.beginPath();
	ctx.ellipse(width * .65, height * .45, 105, 125, .25, 0, Math.PI * 2);
	ctx.fill();
	const p3 = ctx.createRadialGradient(width * .5, height * .65, 10, width * .5, height * .7, 100);
	p3.addColorStop(0, "#fff06b");
	p3.addColorStop(.4, "#f5a216");
	p3.addColorStop(.85, "#ba5a07");
	p3.addColorStop(1, "#4d1d00");
	ctx.fillStyle = p3;
	ctx.beginPath();
	ctx.ellipse(width * .5, height * .7, 95, 80, 0, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
	ctx.beginPath();
	ctx.ellipse(width * .35, height * .38, 28, 9, -.6, 0, Math.PI * 2);
	ctx.fill();
	ctx.beginPath();
	ctx.ellipse(width * .68, height * .34, 24, 7, .4, 0, Math.PI * 2);
	ctx.fill();
	return canvasToRgbImage(canvas, ctx);
}
function generateGeometricSample(width = 384, height = 384) {
	const { canvas, ctx } = makeCanvas(width, height);
	const grad = ctx.createLinearGradient(0, 0, width, height);
	grad.addColorStop(0, "#0f172a");
	grad.addColorStop(1, "#334155");
	ctx.fillStyle = grad;
	ctx.fillRect(0, 0, width, height);
	const cx = width / 2;
	const cy = height / 2;
	for (let r = 10; r < width * .65; r += 8) {
		ctx.strokeStyle = `hsl(${r * 3 % 360}, 65%, 60%)`;
		ctx.lineWidth = 1 + r % 3;
		ctx.beginPath();
		ctx.arc(cx, cy, r, 0, Math.PI * 2);
		ctx.stroke();
	}
	ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(cx, 0);
	ctx.lineTo(cx, height);
	ctx.moveTo(0, cy);
	ctx.lineTo(width, cy);
	ctx.stroke();
	return canvasToRgbImage(canvas, ctx);
}
function generateAirplaneSample(width = 384, height = 384) {
	const { canvas, ctx } = makeCanvas(width, height);
	const grad = ctx.createLinearGradient(0, 0, 0, height);
	grad.addColorStop(0, "#38bdf8");
	grad.addColorStop(.65, "#bae6fd");
	grad.addColorStop(1, "#f0f9ff");
	ctx.fillStyle = grad;
	ctx.fillRect(0, 0, width, height);
	ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
	ctx.beginPath();
	ctx.ellipse(width * .25, height * .7, 90, 35, 0, 0, Math.PI * 2);
	ctx.ellipse(width * .75, height * .75, 110, 40, 0, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillStyle = "#e2e8f0";
	ctx.strokeStyle = "#475569";
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.ellipse(width * .5, height * .45, 130, 26, -.2, 0, Math.PI * 2);
	ctx.fill();
	ctx.stroke();
	ctx.fillStyle = "#cbd5e1";
	ctx.beginPath();
	ctx.moveTo(width * .42, height * .43);
	ctx.lineTo(width * .25, height * .18);
	ctx.lineTo(width * .38, height * .41);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(width * .65, height * .41);
	ctx.lineTo(width * .74, height * .28);
	ctx.lineTo(width * .76, height * .39);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	return canvasToRgbImage(canvas, ctx);
}
function generateBarbaraSample(width = 384, height = 384) {
	const { canvas, ctx } = makeCanvas(width, height);
	ctx.fillStyle = "#78350f";
	ctx.fillRect(0, 0, width, height);
	ctx.strokeStyle = "#fef3c7";
	ctx.lineWidth = 2;
	for (let x = -width; x < width * 2; x += 10) {
		ctx.beginPath();
		ctx.moveTo(x, 0);
		ctx.lineTo(x + width * .7, height);
		ctx.stroke();
	}
	ctx.fillStyle = "#451a03";
	ctx.beginPath();
	ctx.ellipse(width * .5, height * .6, 110, 80, 0, 0, Math.PI * 2);
	ctx.fill();
	ctx.strokeStyle = "#38bdf8";
	ctx.lineWidth = 1.5;
	for (let i = 0; i < 30; i++) {
		const sx = width * .38 + i * 3;
		ctx.beginPath();
		ctx.moveTo(sx, height * .4);
		ctx.lineTo(sx, height * .75);
		ctx.stroke();
	}
	return canvasToRgbImage(canvas, ctx);
}
function generateLakeSample(width = 384, height = 384) {
	const { canvas, ctx } = makeCanvas(width, height);
	const skyGrad = ctx.createLinearGradient(0, 0, 0, height * .5);
	skyGrad.addColorStop(0, "#f97316");
	skyGrad.addColorStop(.5, "#fdba74");
	skyGrad.addColorStop(1, "#fef08a");
	ctx.fillStyle = skyGrad;
	ctx.fillRect(0, 0, width, height * .5);
	ctx.fillStyle = "#1e293b";
	ctx.beginPath();
	ctx.moveTo(0, height * .5);
	ctx.lineTo(width * .25, height * .32);
	ctx.lineTo(width * .5, height * .42);
	ctx.lineTo(width * .75, height * .28);
	ctx.lineTo(width, height * .5);
	ctx.closePath();
	ctx.fill();
	const waterGrad = ctx.createLinearGradient(0, height * .5, 0, height);
	waterGrad.addColorStop(0, "#0369a1");
	waterGrad.addColorStop(1, "#082f49");
	ctx.fillStyle = waterGrad;
	ctx.fillRect(0, height * .5, width, height * .5);
	ctx.strokeStyle = "rgba(254, 240, 138, 0.4)";
	ctx.lineWidth = 1.2;
	for (let y = height * .52; y < height; y += 7) {
		ctx.beginPath();
		ctx.moveTo(width * .3, y);
		ctx.lineTo(width * .7 + Math.sin(y * 10) * 20, y);
		ctx.stroke();
	}
	return canvasToRgbImage(canvas, ctx);
}
var SAMPLE_COVERS = [
	{
		id: "portrait",
		name: "Lena (Classic Portrait)",
		category: "Balanced Frequency",
		description: "Standard benchmark image with smooth skin tones, edge boundaries, and fine textures.",
		generate: () => generatePortraitSample(384, 384)
	},
	{
		id: "texture",
		name: "Baboon (High Texture)",
		category: "High Spatial Frequency",
		description: "Rich harmonic texture and high entropy, challenging for steganalysis algorithms.",
		generate: () => generateTextureSample(384, 384)
	},
	{
		id: "peppers",
		name: "Peppers (Color Gradients)",
		category: "Specular Highlights",
		description: "Vibrant multi-channel color gradients and smooth lighting transitions.",
		generate: () => generatePeppersSample(384, 384)
	},
	{
		id: "geometric",
		name: "Calibration Grid",
		category: "Geometric Pattern",
		description: "Synthetic frequency patterns for measuring spatial distortion and PSNR uniformity.",
		generate: () => generateGeometricSample(384, 384)
	},
	{
		id: "airplane",
		name: "Airplane (Sky & Gradients)",
		category: "Low Frequency / Sky",
		description: "Smooth sky gradients and sharp metallic contours, testing edge-localized artifacts.",
		generate: () => generateAirplaneSample(384, 384)
	},
	{
		id: "barbara",
		name: "Barbara (Striated Textures)",
		category: "Periodic Textures",
		description: "High-frequency fabric patterns prone to moiré and distortion artifacts.",
		generate: () => generateBarbaraSample(384, 384)
	},
	{
		id: "lake",
		name: "Lake (Water & Edges)",
		category: "Natural Reflection",
		description: "Horizon contrast and water surface reflections with variable channel entropy.",
		generate: () => generateLakeSample(384, 384)
	}
];
function generateSampleImage(type, width = 384, height = 384) {
	switch (type) {
		case "portrait": return generatePortraitSample(width, height);
		case "texture": return generateTextureSample(width, height);
		case "peppers": return generatePeppersSample(width, height);
		case "geometric": return generateGeometricSample(width, height);
		case "airplane": return generateAirplaneSample(width, height);
		case "barbara": return generateBarbaraSample(width, height);
		case "lake": return generateLakeSample(width, height);
		default: return generatePortraitSample(width, height);
	}
}
//#endregion
export { generateSampleImage as n, SAMPLE_COVERS as t };
