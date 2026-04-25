import { memo } from "react";

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  tone?: "positive" | "negative" | "info" | "muted";
  strokeWidth?: number;
  fill?: boolean;
}

const TONE_VAR: Record<NonNullable<SparklineProps["tone"]>, string> = {
  positive: "var(--positive)",
  negative: "var(--negative)",
  info: "var(--info)",
  muted: "var(--muted-foreground)",
};

/** Lightweight inline-SVG sparkline. No deps. Used everywhere. */
export const Sparkline = memo(function Sparkline({
  data,
  width = 120,
  height = 32,
  tone = "info",
  strokeWidth = 1.25,
  fill = false,
}: SparklineProps) {
  if (!data.length) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1);
  const points = data
    .map((v, i) => {
      const x = i * stepX;
      const y = height - ((v - min) / range) * (height - 2) - 1;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
  const color = `hsl(${TONE_VAR[tone]})`;
  const id = `spark-${tone}-${Math.round(width)}-${Math.round(height)}`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden>
      {fill && (
        <>
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.25" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon
            fill={`url(#${id})`}
            points={`0,${height} ${points} ${width},${height}`}
          />
        </>
      )}
      <polyline
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
        points={points}
      />
    </svg>
  );
});
