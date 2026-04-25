interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: "positive" | "negative" | "info" | "neutral";
  className?: string;
  fill?: boolean;
}

const COLOR_MAP = {
  positive: "hsl(var(--positive))",
  negative: "hsl(var(--negative))",
  info: "hsl(var(--info))",
  neutral: "hsl(var(--muted-foreground))",
};

export const Sparkline = ({
  data,
  width = 100,
  height = 28,
  color = "neutral",
  className = "",
  fill = true,
}: SparklineProps) => {
  if (!data.length) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1 || 1);
  const stroke = COLOR_MAP[color];

  const points = data.map((v, i) => {
    const x = i * stepX;
    const y = height - ((v - min) / range) * (height - 2) - 1;
    return [x, y];
  });

  const path = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
  const area = `${path} L${width.toFixed(2)},${height} L0,${height} Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {fill && <path d={area} fill={stroke} fillOpacity={0.12} />}
      <path d={path} fill="none" stroke={stroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};