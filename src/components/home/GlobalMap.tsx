import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { REGIONS, TOP_REGIONS } from "@/data/fixtures/countries";

const TIER_FILL: Record<1 | 2 | 3 | 4, string> = {
  1: "hsl(213, 30%, 22%)",
  2: "hsl(213, 50%, 35%)",
  3: "hsl(213, 65%, 50%)",
  4: "hsl(213, 80%, 65%)",
};
const TIER_HOVER: Record<1 | 2 | 3 | 4, string> = {
  1: "hsl(213, 50%, 35%)",
  2: "hsl(213, 65%, 50%)",
  3: "hsl(213, 75%, 60%)",
  4: "hsl(213, 85%, 75%)",
};

const LEGEND = [
  { tier: 1 as const, label: "<$1M" },
  { tier: 2 as const, label: "<$10M" },
  { tier: 3 as const, label: "<$50M" },
  { tier: 4 as const, label: ">$50M" },
];

/**
 * Stylized SVG world silhouette. Inline path data — broad continent
 * blobs, financial blue heatmap. Hotspots are clickable per region.
 */
export function GlobalMap() {
  const [hover, setHover] = useState<typeof REGIONS[number] | null>(null);

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-[1440px] px-6 py-12 lg:px-12">
        <header className="mb-6">
          <div className="flex items-center gap-1">
            <h2 className="font-display text-[28px] font-semibold tracking-tight text-foreground">
              Global prediction map
            </h2>
            <ChevronRight className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="mt-1 text-[14px] text-muted-foreground">
            Where the world is making predictions.
          </p>
        </header>

        <div className="relative overflow-hidden rounded-lg border border-border bg-surface-1">
          <svg
            viewBox="0 0 1000 500"
            className="block h-[480px] w-full"
            role="img"
            aria-label="World prediction volume map"
          >
            {/* Subtle grid */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--border))" strokeOpacity="0.4" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="1000" height="500" fill="url(#grid)" />

            {/* Stylized continent silhouettes. Coordinates are deliberate
               approximations — reads as "world" without being a real map. */}
            <g fill="hsl(var(--surface-3))" stroke="hsl(var(--border))" strokeWidth="0.5">
              {/* North America */}
              <path d="M120 110 Q160 80 230 90 L300 110 L320 160 L290 220 L240 270 L180 280 L130 240 L100 180 Z" />
              {/* Central + South America */}
              <path d="M260 280 L310 290 L340 340 L355 410 L315 460 L280 460 L255 400 L240 340 Z" />
              {/* Europe */}
              <path d="M460 130 L550 130 L570 180 L520 215 L470 200 L455 165 Z" />
              {/* Africa */}
              <path d="M490 230 L590 240 L605 320 L560 410 L510 410 L480 340 Z" />
              {/* Russia / N. Asia */}
              <path d="M560 90 L820 95 L850 150 L780 175 L660 170 L580 145 Z" />
              {/* Middle East */}
              <path d="M580 200 L660 210 L660 260 L590 260 Z" />
              {/* India */}
              <path d="M680 230 L735 235 L725 295 L690 295 Z" />
              {/* China + SE Asia */}
              <path d="M720 175 L820 180 L835 250 L795 280 L745 265 L725 215 Z" />
              {/* Japan */}
              <path d="M850 200 L870 205 L865 235 L848 235 Z" />
              {/* Australia */}
              <path d="M790 370 L870 365 L890 410 L830 425 L795 410 Z" />
            </g>

            {/* Region heatmap dots (sized by tier) */}
            {REGIONS.map((r) => {
              const isHover = hover?.id === r.id;
              const fill = isHover ? TIER_HOVER[r.tier] : TIER_FILL[r.tier];
              const radius = 8 + r.tier * 4;
              return (
                <g key={r.id}>
                  <circle
                    cx={r.cx}
                    cy={r.cy}
                    r={radius + 6}
                    fill={fill}
                    fillOpacity={isHover ? 0.18 : 0.10}
                  />
                  <circle
                    cx={r.cx}
                    cy={r.cy}
                    r={radius}
                    fill={fill}
                    stroke="hsl(var(--background))"
                    strokeWidth="1.5"
                    onMouseEnter={() => setHover(r)}
                    onMouseLeave={() => setHover(null)}
                    style={{ cursor: "pointer", transition: "fill 150ms ease-out" }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Tooltip */}
          {hover && (
            <div
              className="pointer-events-none absolute rounded-md border border-border bg-surface-3 px-3 py-2 text-[12px] shadow-lg"
              style={{
                left: `${(hover.cx / 1000) * 100}%`,
                top: `${(hover.cy / 500) * 100}%`,
                transform: "translate(-50%, -130%)",
              }}
            >
              <div className="font-medium text-foreground">{hover.name}</div>
              <div className="mt-0.5 font-mono text-muted-foreground">
                ${(hover.vol / 1_000_000).toFixed(1)}M prediction volume
              </div>
              <div className="mt-0.5 max-w-[220px] truncate text-muted-foreground">
                Top: <span className="text-foreground">{hover.topMarket}</span>
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 flex items-center gap-4 rounded-md border border-border bg-surface-2/90 px-3 py-2 backdrop-blur-sm">
            {LEGEND.map((l) => (
              <div key={l.tier} className="flex items-center gap-1.5">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ background: TIER_FILL[l.tier] }}
                />
                <span className="font-mono text-[11px] text-muted-foreground">{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top regions today */}
        <div className="mt-6">
          <h3 className="mb-3 font-display text-[18px] font-semibold text-foreground">Top regions today</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TOP_REGIONS.map((r) => (
              <article key={r.name} className="rounded-lg border border-border bg-surface-1 p-4 transition-colors hover:border-hover">
                <div className="text-[13px] font-medium text-foreground">{r.name}</div>
                <div className="mt-2 font-mono text-[20px] font-semibold text-foreground">{r.vol}</div>
                <div className="mt-2 line-clamp-1 text-[12px] text-muted-foreground">
                  Top market: <span className="text-foreground">{r.topMarket}</span>
                </div>
              </article>
            ))}
          </div>
          <a href="#" className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium text-info hover:opacity-80">
            View global trends <ChevronRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
