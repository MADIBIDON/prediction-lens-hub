import { useState } from "react";
import { REGIONS, fmtMoney, getMarket, type RegionStat } from "@/data/mock";
import { SectionHeader } from "./SectionHeader";

/**
 * Stylized SVG world silhouette. Continent shapes are intentionally simplified —
 * this is a financial-platform map, not a cartographic one.
 */

const CONTINENTS: { id: string; d: string; tone: 1 | 2 | 3 | 4 | 5 }[] = [
  // North America
  {
    id: "na",
    tone: 5,
    d: "M 80 110 L 130 90 L 200 95 L 260 110 L 290 145 L 305 195 L 280 235 L 240 260 L 215 285 L 195 270 L 175 245 L 150 220 L 120 195 L 95 165 Z",
  },
  // South America
  {
    id: "sa",
    tone: 2,
    d: "M 290 305 L 320 295 L 360 320 L 380 365 L 365 410 L 345 440 L 320 445 L 305 410 L 295 365 Z",
  },
  // Europe
  {
    id: "eu",
    tone: 4,
    d: "M 460 130 L 495 120 L 530 125 L 555 145 L 545 175 L 520 195 L 495 195 L 470 180 L 455 160 Z",
  },
  // Africa
  {
    id: "af",
    tone: 2,
    d: "M 480 215 L 530 215 L 565 240 L 575 290 L 555 340 L 525 370 L 495 365 L 475 320 L 470 270 Z",
  },
  // Middle East
  {
    id: "me",
    tone: 4,
    d: "M 575 200 L 620 195 L 645 215 L 635 250 L 605 260 L 580 245 Z",
  },
  // Russia + Central Asia (long horizontal)
  {
    id: "ru",
    tone: 3,
    d: "M 540 95 L 620 80 L 720 80 L 820 95 L 870 120 L 845 150 L 770 155 L 690 150 L 610 145 L 555 135 Z",
  },
  // India
  {
    id: "in",
    tone: 3,
    d: "M 680 235 L 715 230 L 730 260 L 715 295 L 690 290 L 675 265 Z",
  },
  // China + East Asia
  {
    id: "cn",
    tone: 4,
    d: "M 720 165 L 790 160 L 845 180 L 855 215 L 825 240 L 770 240 L 730 220 L 715 195 Z",
  },
  // Southeast Asia
  {
    id: "sea",
    tone: 2,
    d: "M 790 270 L 825 260 L 855 285 L 845 315 L 815 320 L 795 300 Z",
  },
  // Japan
  {
    id: "jp",
    tone: 3,
    d: "M 855 195 L 875 200 L 880 225 L 865 235 L 855 220 Z",
  },
  // Australia
  {
    id: "au",
    tone: 2,
    d: "M 800 370 L 855 365 L 895 385 L 890 415 L 850 425 L 815 415 L 795 395 Z",
  },
];

const TONE_VAR: Record<number, string> = {
  1: "var(--map-low)",
  2: "var(--map-mid-low)",
  3: "var(--map-mid)",
  4: "var(--map-mid-high)",
  5: "var(--map-high)",
};

export const GlobalMap = () => {
  const [hover, setHover] = useState<RegionStat | null>(null);

  return (
    <section id="map" className="border-b border-border bg-[hsl(var(--surface-1))]">
      <div className="mx-auto max-w-[1400px] px-4 py-12 md:px-6 md:py-16">
        <SectionHeader
          eyebrow="Global prediction map"
          title="Where prediction markets are happening right now"
          description="Active markets, 24h volume and geopolitical hotspots, mapped across regions."
        />

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          <div className="overflow-hidden rounded-lg border border-border bg-[hsl(var(--background))] lg:col-span-2">
            <div className="relative">
              <svg
                viewBox="0 0 1000 500"
                className="block h-auto w-full"
                role="img"
                aria-label="Stylized world map of prediction market activity"
              >
                {/* faint grid */}
                <defs>
                  <pattern id="map-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="hsl(var(--border))" strokeOpacity="0.4" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="1000" height="500" fill="url(#map-grid)" />

                {/* continent silhouettes */}
                {CONTINENTS.map((c) => (
                  <path
                    key={c.id}
                    d={c.d}
                    fill={`hsl(${TONE_VAR[c.tone]})`}
                    fillOpacity={0.85}
                    stroke="hsl(var(--border-strong))"
                    strokeWidth={0.6}
                  />
                ))}

                {/* hotspot dots */}
                {REGIONS.map((r) => {
                  const radius = 4 + r.intensity * 1.6;
                  const isHover = hover?.id === r.id;
                  return (
                    <g
                      key={r.id}
                      onMouseEnter={() => setHover(r)}
                      onMouseLeave={() => setHover((h) => (h?.id === r.id ? null : h))}
                      className="cursor-pointer"
                    >
                      <circle
                        cx={r.cx}
                        cy={r.cy}
                        r={radius + 6}
                        fill="hsl(var(--info))"
                        fillOpacity={isHover ? 0.18 : 0.08}
                      />
                      <circle
                        cx={r.cx}
                        cy={r.cy}
                        r={radius}
                        fill="hsl(var(--info))"
                        stroke="hsl(var(--background))"
                        strokeWidth={1.5}
                      />
                    </g>
                  );
                })}
              </svg>

              {hover && (
                <div
                  className="pointer-events-none absolute z-10 max-w-[240px] -translate-x-1/2 -translate-y-full rounded-md border border-border-hover bg-[hsl(var(--surface-3))] p-3 shadow-lg"
                  style={{
                    left: `${(hover.cx / 1000) * 100}%`,
                    top: `${(hover.cy / 500) * 100}%`,
                    marginTop: -10,
                  }}
                >
                  <div className="text-[12px] font-semibold text-foreground">{hover.name}</div>
                  <div className="mono mt-1 text-[11px] text-muted-foreground">
                    {hover.activeMarkets} active · {fmtMoney(hover.volume24h)} 24h
                  </div>
                  <div className="mt-1.5 line-clamp-2 text-[11px] text-muted-foreground">
                    {getMarket(hover.topMarketId)?.title}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between gap-3 border-t border-border bg-[hsl(var(--surface-1))] px-4 py-2 text-[11px] text-subtle">
                <span className="mono uppercase tracking-wider">Activity intensity</span>
                <div className="flex items-center gap-1">
                  <span>low</span>
                  {[1, 2, 3, 4, 5].map((t) => (
                    <span
                      key={t}
                      className="h-3 w-5 rounded-sm"
                      style={{ background: `hsl(${TONE_VAR[t]})` }}
                    />
                  ))}
                  <span>high</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-[hsl(var(--background))]">
            <div className="border-b border-border px-4 py-3">
              <h3 className="text-[14px] font-semibold">Top regions today</h3>
              <p className="mono text-[10px] uppercase tracking-wider text-subtle">by 24h volume</p>
            </div>
            <ul className="divide-y divide-border">
              {REGIONS.slice(0, 8).map((r) => {
                const top = getMarket(r.topMarketId);
                return (
                  <li
                    key={r.id}
                    onMouseEnter={() => setHover(r)}
                    onMouseLeave={() => setHover(null)}
                    className="cursor-default px-4 py-3 transition-colors hover:bg-[hsl(var(--surface-2))]"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <div className="text-[13px] font-semibold text-foreground">{r.name}</div>
                      <div className="mono text-[12px] text-foreground">{fmtMoney(r.volume24h)}</div>
                    </div>
                    <div className="mono mt-0.5 text-[11px] text-subtle">{r.activeMarkets} active markets</div>
                    {top && (
                      <div className="mt-1.5 line-clamp-1 text-[12px] text-muted-foreground">
                        Top: <span className="text-foreground">{top.title}</span>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};