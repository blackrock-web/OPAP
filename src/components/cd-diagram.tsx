import { useId, useState, useRef } from "react";
import { MODELS } from "@/lib/stego/models";
import { Button } from "@/components/ui/button";
import {
  Download,
  Copy,
  Check,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type CDDiagramProps = {
  modelIds: string[];
  avgRanks: number[];
  cd: number;
  cliques: string[][];
  k: number;
  metricLabel?: string;
  higherIsBetter?: boolean;
};

export function CDDiagram({
  modelIds,
  avgRanks,
  cd,
  cliques,
  k,
  metricLabel = "PSNR",
  higherIsBetter = true,
}: CDDiagramProps) {
  const gradientId = useId();
  const shadowId = useId();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [hoveredModelId, setHoveredModelId] = useState<string | null>(null);

  // If insufficient models
  if (!modelIds || modelIds.length < 2 || k < 2) {
    return (
      <div className="w-full rounded-xl border border-dashed border-border bg-card p-8 text-center text-xs text-muted-foreground">
        <Info className="size-6 text-muted-foreground mx-auto mb-2" />
        <p className="font-semibold text-foreground">Critical Difference Diagram Requires ≥ 2 Models</p>
        <p className="mt-1">Evaluate multiple steganography algorithms in the batch lab to plot rank distributions.</p>
      </div>
    );
  }

  // Sort models by average rank ascending (1 = best)
  const rawSorted = modelIds
    .map((id, index) => {
      const def = MODELS.find((m) => m.id === id);
      return {
        id,
        short: def?.short || id,
        name: def?.name || id,
        paper: def?.paper || "",
        rank: avgRanks[index] ?? (index + 1),
      };
    })
    .sort((a, b) => a.rank - b.rank);

  const sorted = rawSorted.map((item, idx) => ({
    ...item,
    isAres: idx === 0,
  }));

  // SVG Canvas dimensions
  const width = 960;
  const rightMargin = 230; // 730..960 reserved for right labels
  const plotLeft = 240;
  const plotRight = width - rightMargin; // 730
  const plotWidth = plotRight - plotLeft; // 490

  // Vertical placement zones
  const cdBarY = 28;
  const cliqueStartY = 56;
  const cliqueRowHeight = 22;
  const maxCliquesToShow = Math.max(1, Math.min(cliques.length, 4));
  // Place axis line below cliques with comfortable breathing room
  const axisY = cliqueStartY + maxCliquesToShow * cliqueRowHeight + 24;
  const labelStartY = axisY + 28;
  const labelRowHeight = 28;

  // Split models into left (best ranks) and right (worst ranks)
  const half = Math.ceil(sorted.length / 2);
  const leftModels = sorted.slice(0, half);
  const rightModels = sorted.slice(half);

  const numRows = Math.max(leftModels.length, rightModels.length);
  const height = labelStartY + numRows * labelRowHeight + 24;

  // Coordinate mapper from rank (1..k) to X pixel
  const rankToX = (r: number) => {
    if (k <= 1) return plotLeft + plotWidth / 2;
    const clamped = Math.max(1, Math.min(k, r));
    return plotLeft + ((clamped - 1) / (k - 1)) * plotWidth;
  };

  // Pixel width of CD ruler
  const cdPixelWidth = Math.min(plotWidth, (cd / Math.max(1, k - 1)) * plotWidth);

  // Download SVG
  const downloadSvg = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `demsar_cd_diagram_${metricLabel.toLowerCase()}_k${k}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Copy SVG to clipboard
  const copySvg = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    navigator.clipboard.writeText(svgData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Best model info
  const bestModel = sorted[0];

  return (
    <div className="w-full rounded-xl border border-border bg-card p-5 shadow-xs">
      {/* Header bar with title, legend & export actions */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border/70 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary font-mono">
              Demšar (2006) Protocol
            </span>
            <span className="text-xs font-semibold text-foreground">
              Critical Difference (CD) Diagram
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Rank ordering on {metricLabel} ({higherIsBetter ? "Rank 1 = Highest" : "Rank 1 = Lowest"}). Models connected by a clique bar are statistically indistinguishable (Nemenyi p &gt; 0.05).
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={copySvg}
            className="gap-1.5 h-8 px-2.5 text-xs font-medium"
            title="Copy vector SVG to clipboard for LaTeX / Overleaf publication"
          >
            {copied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
            <span>{copied ? "Copied SVG" : "Copy SVG"}</span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={downloadSvg}
            className="gap-1.5 h-8 px-2.5 text-xs font-medium"
            title="Download vector SVG file"
          >
            <Download className="size-3.5" />
            <span>Download SVG</span>
          </Button>
        </div>
      </div>

      {/* SVG Canvas with Horizontal Scroll on Mobile */}
      <div className="w-full overflow-x-auto">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          className="w-full select-none"
          style={{ minWidth: 780 }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <filter id={shadowId} x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Background Canvas */}
          <rect width={width} height={height} fill="transparent" />

          {/* ================================================================= */}
          {/* Zone 1: CD Ruler Bar at Top (Left aligned with axis start)       */}
          {/* ================================================================= */}
          <g transform={`translate(${plotLeft}, ${cdBarY})`}>
            {/* CD Horizontal Line */}
            <line
              x1="0"
              y1="0"
              x2={cdPixelWidth}
              y2="0"
              stroke="currentColor"
              strokeWidth="2.5"
              className="text-foreground"
            />
            {/* Left Endcap */}
            <line
              x1="0"
              y1="-5"
              x2="0"
              y2="5"
              stroke="currentColor"
              strokeWidth="2.5"
              className="text-foreground"
            />
            {/* Right Endcap */}
            <line
              x1={cdPixelWidth}
              y1="-5"
              x2={cdPixelWidth}
              y2="5"
              stroke="currentColor"
              strokeWidth="2.5"
              className="text-foreground"
            />
            {/* CD Label */}
            <text
              x={cdPixelWidth / 2}
              y="-8"
              textAnchor="middle"
              className="fill-foreground text-[11px] font-mono font-bold"
            >
              CD = {cd.toFixed(3)}
            </text>
          </g>

          {/* CD Description on Top Right */}
          <text
            x={plotRight}
            y={cdBarY}
            textAnchor="end"
            className="fill-muted-foreground text-[10px] font-mono"
          >
            Nemenyi Critical Difference (α = 0.05, k = {k})
          </text>

          {/* ================================================================= */}
          {/* Zone 2: Non-Significant Clique Bars with Model Drop Connectors     */}
          {/* ================================================================= */}
          {cliques.length === 0 ? (
            <text
              x={plotLeft + plotWidth / 2}
              y={cliqueStartY + 14}
              textAnchor="middle"
              className="fill-muted-foreground text-[11px] font-mono italic"
            >
              No non-significant cliques: all evaluated models are statistically distinguishable (ΔRank &gt; CD)
            </text>
          ) : (
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
              const barY = cliqueStartY + cIdx * cliqueRowHeight;
              const isCliqueActive =
                hoveredModelId !== null && clique.includes(hoveredModelId);

              return (
                <g
                  key={cIdx}
                  className={cn(
                    "transition-all duration-150",
                    hoveredModelId && !isCliqueActive && "opacity-35",
                  )}
                >
                  {/* Vertical drop lines from clique bar to the axis for each member model */}
                  {clique.map((id) => {
                    const m = sorted.find((s) => s.id === id);
                    if (!m) return null;
                    const mx = rankToX(m.rank);
                    return (
                      <g key={id}>
                        <line
                          x1={mx}
                          y1={barY}
                          x2={mx}
                          y2={axisY - 8}
                          stroke={isCliqueActive ? "#059669" : "#10b981"}
                          strokeWidth="1.5"
                          strokeDasharray="2 2"
                          opacity={isCliqueActive ? 0.9 : 0.5}
                        />
                        {/* Pin marker on the clique bar */}
                        <circle
                          cx={mx}
                          cy={barY}
                          r="2.5"
                          fill={isCliqueActive ? "#059669" : "#10b981"}
                        />
                      </g>
                    );
                  })}

                  {/* Clique Horizontal Bar */}
                  <line
                    x1={x1}
                    y1={barY}
                    x2={x2}
                    y2={barY}
                    stroke={isCliqueActive ? "#059669" : "#10b981"}
                    strokeWidth={isCliqueActive ? "5" : "4"}
                    strokeLinecap="round"
                  />
                  {/* Left tick */}
                  <line
                    x1={x1}
                    y1={barY - 4}
                    x2={x1}
                    y2={barY + 4}
                    stroke="#047857"
                    strokeWidth="2"
                  />
                  {/* Right tick */}
                  <line
                    x1={x2}
                    y1={barY - 4}
                    x2={x2}
                    y2={barY + 4}
                    stroke="#047857"
                    strokeWidth="2"
                  />
                  {/* Label for Clique */}
                  <text
                    x={x1 - 10}
                    y={barY + 3.5}
                    textAnchor="end"
                    className={cn(
                      "font-mono text-[10px] font-semibold transition-all",
                      isCliqueActive
                        ? "fill-emerald-800 dark:fill-emerald-300 font-bold"
                        : "fill-emerald-700 dark:fill-emerald-400",
                    )}
                  >
                    Clique {cIdx + 1}
                  </text>
                </g>
              );
            })
          )}

          {/* ================================================================= */}
          {/* Zone 3: Main Ranking Axis Line, Ticks and Direction Indicators    */}
          {/* ================================================================= */}
          {/* Direction Arrows placed above the axis line */}
          <text
            x={plotLeft}
            y={axisY - 14}
            textAnchor="start"
            className="fill-primary text-[10px] font-mono font-bold uppercase tracking-wider"
          >
            ← Superior Performance (Rank 1)
          </text>
          <text
            x={plotRight}
            y={axisY - 14}
            textAnchor="end"
            className="fill-muted-foreground text-[10px] font-mono uppercase tracking-wider"
          >
            Inferior Performance (Rank {k}) →
          </text>

          {/* Main Axis Line */}
          <line
            x1={plotLeft}
            y1={axisY}
            x2={plotRight}
            y2={axisY}
            stroke="currentColor"
            strokeWidth="2"
            className="text-border"
          />

          {/* Integer Rank Ticks (1..k) - Numbers placed ABOVE the tick mark so stems don't slice them */}
          {Array.from({ length: k }, (_, i) => i + 1).map((rank) => {
            const x = rankToX(rank);
            return (
              <g key={rank} transform={`translate(${x}, ${axisY})`}>
                <line
                  y1="-5"
                  y2="5"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-muted-foreground/80"
                />
                {/* Number placed right at axisY - 8 */}
                <text
                  y="-8"
                  textAnchor="middle"
                  className="fill-muted-foreground text-[10px] font-mono font-bold"
                >
                  {rank}
                </text>
              </g>
            );
          })}

          {/* ================================================================= */}
          {/* Zone 4: Non-Overlapping Connector Stems & Model Labels            */}
          {/* ================================================================= */}

          {/* LEFT MODELS: Drop down and turn left to left margin               */}
          {/* Ordered by ascending rank (smallest rank has lowest drop)         */}
          {leftModels.map((m, idx) => {
            const x = rankToX(m.rank);
            const yLevel = labelStartY + idx * labelRowHeight;
            const labelX = plotLeft - 18;
            const isHovered = hoveredModelId === m.id;
            const isAnyHovered = hoveredModelId !== null;

            return (
              <g
                key={m.id}
                onMouseEnter={() => setHoveredModelId(m.id)}
                onMouseLeave={() => setHoveredModelId(null)}
                className={cn(
                  "cursor-pointer transition-all duration-150",
                  isAnyHovered && !isHovered && "opacity-45",
                )}
              >
                {/* Axis Point Marker */}
                <circle
                  cx={x}
                  cy={axisY}
                  r={m.isAres ? 6.5 : 4.5}
                  className={cn(
                    m.isAres
                      ? "fill-primary stroke-background stroke-2"
                      : "fill-foreground stroke-background stroke-1.5",
                    isHovered && "scale-125 stroke-primary",
                  )}
                />

                {/* Proposed Halo Ring for ARES */}
                {m.isAres && (
                  <circle
                    cx={x}
                    cy={axisY}
                    r="9.5"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                  />
                )}

                {/* Non-overlapping Elbow Connector: Down then Left */}
                <path
                  d={`M ${x} ${axisY} L ${x} ${yLevel} L ${labelX} ${yLevel}`}
                  fill="none"
                  stroke={m.isAres ? "var(--color-primary, #1f4e46)" : "#78716c"}
                  strokeWidth={m.isAres ? "2.2" : "1.2"}
                  strokeDasharray={m.isAres ? undefined : "3 2"}
                  className={cn(
                    "transition-all",
                    isHovered && "stroke-primary stroke-[2.5]",
                  )}
                />

                {/* Model Text Label (Right-aligned to left margin) */}
                <text
                  x={labelX - 8}
                  y={yLevel + 4}
                  textAnchor="end"
                  className={cn(
                    "transition-all font-sans",
                    m.isAres
                      ? "fill-primary font-bold text-[13px]"
                      : "fill-foreground text-[12px] font-medium",
                    isHovered && "fill-primary font-bold",
                  )}
                >
                  {m.isAres && (
                    <tspan className="fill-amber-500 font-bold text-[10px] mr-1">
                      ★{" "}
                    </tspan>
                  )}
                  {m.name}{" "}
                  <tspan className="font-mono text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    ({m.rank.toFixed(2)})
                  </tspan>
                </text>
              </g>
            );
          })}

          {/* RIGHT MODELS: Drop down and turn right to right margin            */}
          {/* Ordered in reverse so largest rank has lowest drop, clean nesting */}
          {rightModels
            .slice()
            .reverse()
            .map((m, revIdx) => {
              const x = rankToX(m.rank);
              const yLevel = labelStartY + revIdx * labelRowHeight;
              const labelX = plotRight + 18;
              const isHovered = hoveredModelId === m.id;
              const isAnyHovered = hoveredModelId !== null;

              return (
                <g
                  key={m.id}
                  onMouseEnter={() => setHoveredModelId(m.id)}
                  onMouseLeave={() => setHoveredModelId(null)}
                  className={cn(
                    "cursor-pointer transition-all duration-150",
                    isAnyHovered && !isHovered && "opacity-45",
                  )}
                >
                  {/* Axis Point Marker */}
                  <circle
                    cx={x}
                    cy={axisY}
                    r={m.isAres ? 6.5 : 4.5}
                    className={cn(
                      m.isAres
                        ? "fill-primary stroke-background stroke-2"
                        : "fill-muted-foreground stroke-background stroke-1.5",
                      isHovered && "scale-125 stroke-primary",
                    )}
                  />

                  {/* Proposed Halo Ring for ARES */}
                  {m.isAres && (
                    <circle
                      cx={x}
                      cy={axisY}
                      r="9.5"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                    />
                  )}

                  {/* Non-overlapping Elbow Connector: Down then Right */}
                  <path
                    d={`M ${x} ${axisY} L ${x} ${yLevel} L ${labelX} ${yLevel}`}
                    fill="none"
                    stroke={m.isAres ? "var(--color-primary, #1f4e46)" : "#a8a29e"}
                    strokeWidth={m.isAres ? "2.2" : "1.2"}
                    strokeDasharray={m.isAres ? undefined : "3 2"}
                    className={cn(
                      "transition-all",
                      isHovered && "stroke-primary stroke-[2.5]",
                    )}
                  />

                  {/* Model Text Label (Left-aligned to right margin) */}
                  <text
                    x={labelX + 8}
                    y={yLevel + 4}
                    textAnchor="start"
                    className={cn(
                      "transition-all font-sans",
                      m.isAres
                        ? "fill-primary font-bold text-[13px]"
                        : "fill-muted-foreground text-[12px] font-medium",
                      isHovered && "fill-primary font-bold",
                    )}
                  >
                    {m.name}{" "}
                    <tspan className="font-mono text-[11px] font-bold text-foreground">
                      ({m.rank.toFixed(2)})
                    </tspan>
                    {m.isAres && (
                      <tspan className="fill-amber-500 font-bold text-[10px] ml-1">
                        {" "}★
                      </tspan>
                    )}
                  </text>
                </g>
              );
            })}
        </svg>
      </div>

      {/* Legend & Statistical Interpretation Guide */}
      <div className="mt-4 grid gap-3 sm:grid-cols-3 border-t border-border/60 pt-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="flex size-3.5 items-center justify-center rounded-full bg-primary text-white text-[9px] font-bold">
            ✓
          </span>
          <span className="text-muted-foreground">
            <strong className="text-foreground">Optimal Model:</strong>{" "}
            {bestModel ? `${bestModel.name} (Rank ${bestModel.rank.toFixed(2)})` : "Pending"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-5 rounded-full bg-emerald-500" />
          <span className="text-muted-foreground">
            <strong className="text-foreground">Clique Line:</strong>{" "}
            {cliques.length > 0 ? `${cliques.length} Non-Significant Group${cliques.length > 1 ? "s" : ""}` : "No Cliques"} (p &gt; 0.05)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-foreground text-[11px]">
            CD = {cd.toFixed(3)}
          </span>
          <span className="text-muted-foreground">
            Critical Difference cutoff at α = 0.05
          </span>
        </div>
      </div>
    </div>
  );
}
