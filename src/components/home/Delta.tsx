import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface DeltaProps {
  value: number; // percent points
  pill?: boolean;
  showArrow?: boolean;
  className?: string;
}

export function Delta({ value, pill = false, showArrow = false, className }: DeltaProps) {
  const positive = value >= 0;
  const text = `${positive ? "+" : ""}${value.toFixed(2)}%`;
  if (pill) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-mono text-[12px] font-medium",
          positive ? "bg-positive/10 text-positive" : "bg-negative/10 text-negative",
          className,
        )}
      >
        {showArrow && (positive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />)}
        {text}
      </span>
    );
  }
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-mono text-[13px] font-medium",
        positive ? "text-positive" : "text-negative",
        className,
      )}
    >
      {showArrow && (positive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />)}
      {text}
    </span>
  );
}
