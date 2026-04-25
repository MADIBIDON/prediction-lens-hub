import { Calendar } from "lucide-react";

/**
 * Economy-only macro strip: rate-decision cards + recession probability bar.
 * Visually distinct from generic category sections — emphasizes central
 * banks, macro releases and recession odds.
 */
const RATE_CARDS = [
  { bank: "FOMC", flag: "🇺🇸", date: "May 7", current: "5.25%", expected: "-25 bps", prob: 0.34, dir: "cut" },
  { bank: "ECB",  flag: "🇪🇺", date: "Jun 5", current: "3.75%", expected: "-25 bps", prob: 0.62, dir: "cut" },
  { bank: "BoE",  flag: "🇬🇧", date: "Jun 19", current: "5.00%", expected: "Hold",   prob: 0.71, dir: "hold" },
  { bank: "BoJ",  flag: "🇯🇵", date: "Jun 14", current: "0.50%", expected: "+10 bps", prob: 0.28, dir: "hike" },
];

const RECESSION = [
  { region: "United States", prob: 0.28, change: 1.1 },
  { region: "Eurozone",      prob: 0.41, change: -0.6 },
  { region: "United Kingdom",prob: 0.36, change: 0.4 },
  { region: "Japan",         prob: 0.19, change: 0.2 },
  { region: "China",         prob: 0.24, change: -0.3 },
];

export function EconomyStrip() {
  return (
    <div className="mt-10 grid grid-cols-12 gap-6">
      {/* Rate decisions */}
      <div className="col-span-12 lg:col-span-7">
        <div className="mb-3 flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" strokeWidth={1.75} />
          <h3 className="font-display text-[18px] font-semibold text-foreground">
            Next central bank decisions
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {RATE_CARDS.map((r) => (
            <div
              key={r.bank}
              className="rounded-lg border border-border bg-surface-1 p-4 transition-colors hover:border-hover"
            >
              <div className="flex items-center justify-between">
                <span className="text-[20px] leading-none">{r.flag}</span>
                <span className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] uppercase text-muted-foreground">
                  {r.date}
                </span>
              </div>
              <div className="mt-3 font-display text-[15px] font-semibold text-foreground">
                {r.bank}
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-mono text-[18px] font-semibold text-foreground">
                  {r.current}
                </span>
                <span
                  className={
                    r.dir === "cut"
                      ? "font-mono text-[12px] text-positive"
                      : r.dir === "hike"
                        ? "font-mono text-[12px] text-negative"
                        : "font-mono text-[12px] text-muted-foreground"
                  }
                >
                  {r.expected}
                </span>
              </div>
              <div className="mt-3 text-[11px] uppercase tracking-wider text-muted-foreground">
                Market-implied prob
              </div>
              <div className="mt-1 flex items-center gap-2">
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-surface-3">
                  <div
                    className="h-full rounded-full bg-info"
                    style={{ width: `${Math.round(r.prob * 100)}%` }}
                  />
                </div>
                <span className="font-mono text-[12px] text-foreground">
                  {r.prob.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recession probabilities */}
      <div className="col-span-12 lg:col-span-5">
        <h3 className="mb-3 font-display text-[18px] font-semibold text-foreground">
          Recession probability — 2026
        </h3>
        <div className="rounded-lg border border-border bg-surface-1 p-4">
          <ul className="space-y-3">
            {RECESSION.map((r) => {
              const pct = Math.round(r.prob * 100);
              const positive = r.change >= 0;
              return (
                <li key={r.region} className="flex items-center gap-3">
                  <span className="w-32 shrink-0 text-[13px] text-foreground">
                    {r.region}
                  </span>
                  <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-surface-3">
                    <div
                      className="h-full rounded-full bg-negative/80"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-12 text-right font-mono text-[13px] font-medium text-foreground">
                    {r.prob.toFixed(2)}
                  </span>
                  <span
                    className={
                      positive
                        ? "w-14 text-right font-mono text-[12px] text-positive"
                        : "w-14 text-right font-mono text-[12px] text-negative"
                    }
                  >
                    {positive ? "+" : ""}
                    {r.change.toFixed(1)}%
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
