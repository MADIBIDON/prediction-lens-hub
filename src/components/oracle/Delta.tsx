import { ArrowDown, ArrowUp } from "lucide-react";
import { fmtPct } from "@/data/mock";

interface DeltaProps {
  value: number;
  className?: string;
  size?: "sm" | "md";
  withIcon?: boolean;
}

export const Delta = ({ value, className = "", size = "md", withIcon = true }: DeltaProps) => {
  const positive = value >= 0;
  const Icon = positive ? ArrowUp : ArrowDown;
  const colorCls = positive ? "text-positive" : "text-negative";
  const sizeCls = size === "sm" ? "text-[11px]" : "text-xs";
  return (
    <span className={`mono inline-flex items-center gap-0.5 font-medium ${colorCls} ${sizeCls} ${className}`}>
      {withIcon && <Icon className="h-3 w-3" strokeWidth={2.5} />}
      {fmtPct(Math.abs(value), false)}
      <span className="sr-only">{positive ? "up" : "down"}</span>
    </span>
  );
};