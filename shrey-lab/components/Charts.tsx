// shrey-lab/components/Charts.tsx
//
// The signature shrey.lab data viz components. The waffle chart is the brand favorite —
// a 10x10 grid where filled squares show a percentage, more honest than a pie.

import * as React from 'react';

/* ─── Waffle chart — the signature ────────────────────────────────
   A grid of squares (default 10×10 = 100 cells, 1% each).
   Filled cells show the value, ghost cells show the remainder.
   Multi-series mode supports up to 3 colors stacking from bottom-left. */

type WaffleSeries = { label: string; value: number; color?: string };

interface WaffleChartProps {
  /** Single number 0–100, OR an array of series whose values sum to ≤ 100. */
  data: number | WaffleSeries[];
  /** Grid size. 10 means 10×10 = 100 cells. */
  rows?: number;
  cols?: number;
  cellSize?: number;
  cellGap?: number;
  /** Single-value color. Ignored if data is series array. */
  color?: string;
  emptyColor?: string;
  label?: string;
  showLegend?: boolean;
}

export function WaffleChart({
  data,
  rows = 10,
  cols = 10,
  cellSize = 14,
  cellGap = 3,
  color = 'var(--lime-400)',
  emptyColor = 'var(--border)',
  label,
  showLegend = true,
}: WaffleChartProps) {
  const total = rows * cols;
  const series: WaffleSeries[] = Array.isArray(data)
    ? data
    : [{ label: label ?? 'value', value: data, color }];

  const defaultColors = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)'];

  // Build a flat array of cells, each labeled with which series (or 'empty') owns it.
  const cells: (string | null)[] = [];
  series.forEach((s, idx) => {
    const count = Math.round((Math.max(0, Math.min(100, s.value)) / 100) * total);
    const col = s.color ?? defaultColors[idx % defaultColors.length];
    for (let i = 0; i < count; i++) cells.push(col);
  });
  while (cells.length < total) cells.push(null);

  return (
    <div className="inline-flex flex-col gap-3">
      {label && !Array.isArray(data) && (
        <div className="font-mono text-2xs tracking-wide text-fg-muted lowercase before:content-['//_']">
          {label}
        </div>
      )}
      <div
        role="img"
        aria-label={
          Array.isArray(data)
            ? `Waffle chart: ${series.map(s => `${s.label} ${s.value}%`).join(', ')}`
            : `Waffle chart: ${data}% of 100`
        }
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
          gap: cellGap,
        }}
      >
        {/* Fill bottom-up, left-to-right: visual reads like filling a glass */}
        {Array.from({ length: total }).map((_, i) => {
          // Map index to bottom-up reading order
          const row = Math.floor(i / cols);
          const col = i % cols;
          const visualIndex = (rows - 1 - row) * cols + col;
          const fill = cells[visualIndex];
          return (
            <div
              key={i}
              style={{
                width: cellSize,
                height: cellSize,
                background: fill ?? emptyColor,
                borderRadius: 2,
                opacity: fill ? 1 : 0.5,
                transition: 'background var(--duration-fast) var(--ease-out)',
              }}
            />
          );
        })}
      </div>
      {showLegend && Array.isArray(data) && (
        <div className="flex flex-wrap gap-3 mt-2">
          {series.map((s, idx) => (
            <div key={idx} className="flex items-center gap-1.5 font-mono text-2xs text-fg-muted">
              <span
                style={{
                  width: 10, height: 10, borderRadius: 2,
                  background: s.color ?? defaultColors[idx % defaultColors.length],
                }}
                aria-hidden="true"
              />
              <span>{s.label}</span>
              <span className="text-fg">{s.value}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── BarChart — simple SVG, lime-led ─────────────────────────────
   For more complex needs, wrap Recharts/Chart.js with these tokens. */

interface BarChartProps {
  data: { label: string; value: number; color?: string }[];
  height?: number;
  /** Show value on top of each bar */
  showValues?: boolean;
}

export function BarChart({ data, height = 200, showValues = true }: BarChartProps) {
  const max = Math.max(...data.map(d => d.value), 1);
  const padding = { top: 24, right: 8, bottom: 28, left: 8 };
  const width = Math.max(280, data.length * 56);
  const innerH = height - padding.top - padding.bottom;
  const barWidth = (width - padding.left - padding.right) / data.length * 0.6;
  const slot = (width - padding.left - padding.right) / data.length;

  return (
    <svg
      width="100%"
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={`Bar chart: ${data.map(d => `${d.label} ${d.value}`).join(', ')}`}
      style={{ overflow: 'visible' }}
    >
      {/* Baseline */}
      <line
        x1={padding.left} x2={width - padding.right}
        y1={height - padding.bottom} y2={height - padding.bottom}
        stroke="var(--chart-grid)"
        strokeWidth="1"
      />
      {data.map((d, i) => {
        const h = (d.value / max) * innerH;
        const x = padding.left + slot * i + (slot - barWidth) / 2;
        const y = height - padding.bottom - h;
        const color = d.color ?? 'var(--chart-1)';
        return (
          <g key={i}>
            <rect
              x={x} y={y}
              width={barWidth} height={h}
              fill={color}
              rx="4" ry="4"
              style={{ transition: 'all var(--duration-base) var(--ease-out)' }}
            />
            {/* Square off the bottom of the bar so only top corners are rounded */}
            <rect
              x={x} y={y + h - 6}
              width={barWidth} height={6}
              fill={color}
            />
            {showValues && (
              <text
                x={x + barWidth / 2} y={y - 6}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize="11"
                fill="var(--fg)"
              >
                {d.value}
              </text>
            )}
            <text
              x={x + barWidth / 2}
              y={height - padding.bottom + 16}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="11"
              fill="var(--chart-axis)"
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ─── Sparkline — tiny inline trend line ──────────────────────── */
interface SparklineProps {
  values: number[];
  width?: number;
  height?: number;
  color?: string;
  showDot?: boolean;
}
export function Sparkline({
  values, width = 80, height = 24, color = 'var(--lime-400)', showDot = true,
}: SparklineProps) {
  if (values.length < 2) return null;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const stepX = width / (values.length - 1);
  const points = values.map((v, i) => {
    const x = i * stepX;
    const y = height - ((v - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');
  const lastX = (values.length - 1) * stepX;
  const lastY = height - ((values[values.length - 1] - min) / range) * height;
  return (
    <svg
      width={width} height={height}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="Trend"
      style={{ overflow: 'visible' }}
    >
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {showDot && (
        <circle cx={lastX} cy={lastY} r="2.5" fill={color} />
      )}
    </svg>
  );
}

/* ─── Progress ring — circular progress ─────────────────────── */
interface ProgressRingProps {
  value: number; // 0–100
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
}
export function ProgressRing({
  value, size = 64, strokeWidth = 5, showLabel = true,
}: ProgressRingProps) {
  const v = Math.max(0, Math.min(100, value));
  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (v / 100) * circumference;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke="var(--bg-sunken)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke="var(--lime-400)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 400ms var(--ease-out)' }}
        />
      </svg>
      {showLabel && (
        <span className="absolute font-mono text-xs text-fg">{Math.round(v)}%</span>
      )}
    </div>
  );
}
