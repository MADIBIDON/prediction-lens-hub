import { VENUE_COMPARE } from "@/data/fixtures/venues";

export function VenueComparison() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-[1440px] px-6 py-12 lg:px-12">
        <header className="mb-6">
          <h2 className="font-display text-[28px] font-semibold tracking-tight text-foreground">
            Where to look — Polymarket vs Kalshi
          </h2>
          <p className="mt-1 text-[14px] text-muted-foreground">
            Compare venues for the same event. Pick the best liquidity, spread, and clarity.
          </p>
        </header>

        <div className="overflow-x-auto rounded-lg border border-border bg-surface-1">
          <table className="w-full min-w-[920px] text-left">
            <thead>
              <tr className="h-10 bg-surface-2 text-[12px] font-medium uppercase tracking-wider text-muted-foreground">
                <th className="px-4">Market</th>
                <th className="px-4 text-right">Polymarket</th>
                <th className="px-4 text-right">Kalshi</th>
                <th className="px-4 text-right">Spread</th>
                <th className="px-4 text-right">POLY 24h vol</th>
                <th className="px-4 text-right">KAL 24h vol</th>
                <th className="px-4 text-right">Best venue</th>
              </tr>
            </thead>
            <tbody>
              {VENUE_COMPARE.map((r) => (
                <tr
                  key={r.market}
                  className="h-14 border-b border-border last:border-0 transition-colors hover:bg-surface-2"
                >
                  <td className="px-4 text-[14px] text-foreground">{r.market}</td>
                  <td className="px-4 text-right font-mono text-[14px] text-foreground">{r.poly.toFixed(2)}</td>
                  <td className="px-4 text-right font-mono text-[14px] text-foreground">{r.kal.toFixed(2)}</td>
                  <td className="px-4 text-right font-mono text-[14px] text-muted-foreground">{r.spread.toFixed(2)}</td>
                  <td className="px-4 text-right font-mono text-[13px] text-muted-foreground">{r.polyVol}</td>
                  <td className="px-4 text-right font-mono text-[13px] text-muted-foreground">{r.kalVol}</td>
                  <td className="px-4 text-right">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[12px] text-muted-foreground">
          Comparison shown for market intelligence purposes. Spreads and volumes update every 60s. Not financial advice.
        </p>
      </div>
    </section>
  );
}
