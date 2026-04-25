interface OracleScoreProps {
  score: number;
  className?: string;
  showBar?: boolean;
}

function colorFor(score: number) {
  if (score >= 75) return "hsl(var(--positive))";
  if (score >= 55) return "hsl(var(--info))";
  if (score >= 35) return "hsl(var(--warning))";
  return "hsl(var(--negative))";
}

export const OracleScore = ({ score, className = "", showBar = true }: OracleScoreProps) => {
  const c = colorFor(score);
  return (
    <div className={`inline-flex items-center gap-2 ${className}`} title="Oracle Score is a 0–100 prioritization indicator. Not a profit guarantee.">
      <span className="mono text-xs font-semibold text-foreground tabular-nums">{score}</span>
      {showBar && (
        <div className="flex h-1 w-12 gap-px overflow-hidden rounded-sm bg-[hsl(var(--surface-3))]">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="flex-1"
              style={{
                background: i * 10 < score ? c : "hsl(var(--border))",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};