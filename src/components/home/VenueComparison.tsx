import { ChevronRight } from "lucide-react";
import { VENUE_COMPARE } from "@/data/fixtures/venues";

/**
 * Side-by-side venue intelligence — not arbitrage advice.
 * Surfaces depth, spread, fees, liquidity score, resolution clarity
 * and a short reason for the recommended venue.
 */
export function VenueComparison() {
  return (
    <section id="section-Platforms" className="border-b border-border">
      <div className="mx-auto max-w-[1440px] px-6 py-12 lg:px-12 lg:py-16">
        <header className="mb-6">
          <div className="flex items-center gap-1">
            <h2 className="font-display text-[28px] font-semibold tracking-tight text-foreground">
              Where to look — Polymarket vs Kalshi
            </h2>
            <ChevronRight className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="mt-1 text-[14px] text-muted-foreground">
            Compare venue depth, spread, liquidity and resolution clarity for the same event.
          </p>
        </header>

        <div className="overflow-x-auto rounded-lg border border-border bg-surface-1">
          <table className="w-full min-w-[1180px] text-left">
            <thead>
              <tr className="h-10 bg-surface-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                <th className="px-4">Market</th>
                <th className="px-3">Category</th>
                <th className="px-3 text-right">Poly</th>
                <th className="px-3 text-right">Kalshi</th>
                <th className="px-3 text-right">Spread</th>
                <th className="px-3 text-right">POLY vol</th>
                <th className="px-3 text-right">KAL vol</th>
                <th className="px-3 text-right">Fees</th>
                <th className="px-3 text-right">Liquidity</th>
                <th className="px-3 text-center">Clarity</th>
                <th className="px-3 text-center">Best venue</th>
                <th className="px-4 text-left">Why</th>
              </tr>
            </thead>
            <tbody>
              {VENUE_COMPARE.map((r) => (
                <tr
                  key={r.market}
                  className="h-14 border-b border-border last:border-0 transition-colors hover:bg-surface-2"
                >
                  <td className="px-4 text-[14px] text-foreground">{r.market}</td>
                  <td className="px-3 text-[12px] text-muted-foreground">{r.category}</td>
                  <td className="px-3 text-right font-mono text-[13px] text-foreground">{r.poly.toFixed(2)}</td>
                  <td className="px-3 text-right font-mono text-[13px] text-foreground">{r.kal.toFixed(2)}</td>
                  <td className="px-3 text-right font-mono text-[13px] text-muted-foreground">{r.spread.toFixed(2)}</td>
                  <td className="px-3 text-right font-mono text-[12px] text-muted-foreground">{r.polyVol}</td>
                  <td className="px-3 text-right font-mono text-[12px] text-muted-foreground">{r.kalVol}</td>
                  <td className="px-3 text-right font-mono text-[12px] text-muted-foreground">{r.fees}</td>
                  <td className="px-3 text-right">
                    <div className="ml-auto flex w-24 items-center justify-end gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-3">
                        <div
                          className="h-full rounded-full bg-info"
                          style={{ width: `${r.liquidity}%` }}
                        />
                      </div>
                      <span className="font-mono text-[12px] text-foreground">{r.liquidity}</span>
                    </div>
                  </td>
                  <td className="px-3 text-center">
                    <span
                      className={
                        r.clarity === "High"
                          ? "inline-flex items-center rounded bg-positive/10 px-1.5 py-0.5 text-[11px] font-medium text-positive"
                          : r.clarity === "Medium"
                            ? "inline-flex items-center rounded bg-warning/10 px-1.5 py-0.5 text-[11px] font-medium text-warning"
                            : "inline-flex items-center rounded bg-negative/10 px-1.5 py-0.5 text-[11px] font-medium text-negative"
                      }
                    >
                      {r.clarity}
                    </span>
                  </td>
                  <td className="px-3 text-center">
                    <span
                      className={
                        r.best === "Polymarket"
                          ? "inline-flex items-center rounded-md bg-positive/10 px-2 py-0.5 font-mono text-[12px] text-positive"
                          : "inline-flex items-center rounded-md bg-info/10 px-2 py-0.5 font-mono text-[12px] text-info"
                      }
                    >
                      {r.best}
                    </span>
                  </td>
                  <td className="px-4 text-[12px] text-muted-foreground">{r.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[12px] text-muted-foreground">
          Market intelligence only. Spreads, liquidity scores and fees are simulated. Not financial advice.
        </p>
      </div>
    </section>
  );
}
