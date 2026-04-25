import { cn } from "@/lib/utils";

/**
 * Oracle brand mark — three clean white dots in a triangle (two top, one bottom)
 * rendered as inline SVG so the dots stay perfectly crisp at any size and inherit
 * `currentColor`. Transparent background, no glow, no badge.
 */
export function Logo({ className, size = 22 }: { className?: string; size?: number }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        className="text-foreground"
      >
        {/* top-left */}
        <circle cx="7.5" cy="9" r="3" fill="currentColor" />
        {/* top-right */}
        <circle cx="16.5" cy="9" r="3" fill="currentColor" />
        {/* bottom-center */}
        <circle cx="12" cy="17" r="3" fill="currentColor" />
      </svg>
      <span className="font-display text-[19px] font-medium lowercase leading-none tracking-tight text-foreground">
        oracle
      </span>
    </div>
  );
}
