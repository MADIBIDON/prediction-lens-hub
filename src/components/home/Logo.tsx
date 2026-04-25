import { cn } from "@/lib/utils";

/** Three-dot triangle (top-left + top-right white, bottom-center lime) + "oracle" wordmark. */
export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative h-5 w-6" aria-hidden>
        {/* top-left dot */}
        <span className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-foreground" />
        {/* top-right dot — lime accent (allowed) */}
        <span className="absolute right-0 top-0 h-1.5 w-1.5 rounded-full bg-accent-lime" />
        {/* bottom-center dot */}
        <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-foreground" />
      </div>
      <span className="font-display text-[18px] font-semibold lowercase leading-none tracking-tight text-foreground">
        oracle
      </span>
    </div>
  );
}
