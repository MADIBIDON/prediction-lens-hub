import { ArrowDown, ArrowUp } from "lucide-react";

interface DeltaProps {
  value: number;
  className?: string;
  size?: "sm" | "md";
  withIcon?: boolean;
  /** Render as a colored pill (used in gainers/losers tables). */
  pill?: boolean;
}

export const Delta = ({ value, className = "", size = "md", withIcon = true, pill = false }: DeltaProps) => {
  const positive = value >= 0;
  const Icon = positive ? ArrowUp : ArrowDown;
  const sizeCls = size === "sm" ? "text-[11px]" : "text-xs";
  const sign = positive ? "+" : "−";
  const text = `${sign}${Math.abs(value).toFixed(1)}%`;

  if (pill) {
    const pillCls = positive
      ? "bg-positive/10 text-positive ring-1 ring-inset ring-[hsl(var(--positive))/30]"
      : "bg-negative/10 text-negative ring-1 ring-inset ring-[hsl(var(--negative))/30]";
    return (
      <span className={`mono inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 font-semibold ${pillCls} ${sizeCls} ${className}`}>
        {withIcon && <Icon className="h-3 w-3" strokeWidth={2.5} />}
        {text}
      </span>
    );
  }

  const colorCls = positive ? "text-positive" : "text-negative";
  return (
    <span className={`mono inline-flex items-center gap-0.5 font-medium ${colorCls} ${sizeCls} ${className}`}>
      {withIcon && <Icon className="h-3 w-3" strokeWidth={2.5} />}
      {text}
      <span className="sr-only">{positive ? "up" : "down"}</span>
    </span>
  );
};