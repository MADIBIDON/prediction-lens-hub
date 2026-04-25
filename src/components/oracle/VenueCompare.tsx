import { VENUES, fmtMoney, fmtProb } from "@/data/mock";
import { SectionHeader } from "./SectionHeader";

export const VenueCompare = () => (
  <section className="border-b border-border">
    <div className="mx-auto max-w-[1440px] px-4 py-12 md:px-6 md:py-16 lg:px-16 lg:py-20">
      <SectionHeader
        eyebrow="Polymarket vs Kalshi"
        title="Compare venues before you trade"
        description="Where the market is deeper, where the spread is tighter, and where resolution is clearer. Market intelligence — not arbitrage advice."
      />
      <div className="overflow-hidden rounded-lg border border-border bg-[hsl(var(--surface-1))]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[940px] text-left">
            <thead>
              <tr className="mono border-b border-border text-[10px] uppercase tracking-wider text-subtle">
                <th className="px-4 py-3 font-medium">Market</th>
                <th className="px-3 py-3 text-right font-medium">Polymarket</th>
                <th className="px-3 py-3 text-right font-medium">Kalshi</th>
                <th className="px-3 py-3 text-right font-medium">Poly vol</th>
                <th className="px-3 py-3 text-right font-medium">Kalshi vol</th>
                <th className="px-3 py-3 text-right font-medium">Spread</th>
                <th className="px-3 py-3 text-right font-medium">Fees</th>
                <th className="px-3 py-3 text-right font-medium">Liquidity</th>
                <th className="px-3 py-3 text-right font-medium">Resolution</th>
                <th className="px-4 py-3 text-right font-medium">Best venue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {VENUES.map((v) => {
                const polyBetter = v.polyProb > v.kalshiProb;
                return (
                  <tr key={v.marketId} className="transition-colors hover:bg-[hsl(var(--surface-2))]">
                    <td className="px-4 py-3 text-[13px] font-medium text-foreground">{v.title}</td>
                    <td className={`mono px-3 py-3 text-right text-[13px] ${polyBetter ? "text-foreground" : "text-muted-foreground"}`}>
                      {fmtProb(v.polyProb)}
                    </td>
                    <td className={`mono px-3 py-3 text-right text-[13px] ${!polyBetter ? "text-foreground" : "text-muted-foreground"}`}>
                      {fmtProb(v.kalshiProb)}
                    </td>
                    <td className="mono px-3 py-3 text-right text-[12px] text-muted-foreground">{fmtMoney(v.polyVol)}</td>
                    <td className="mono px-3 py-3 text-right text-[12px] text-muted-foreground">{fmtMoney(v.kalshiVol)}</td>
                    <td className="mono px-3 py-3 text-right text-[12px] text-foreground">{v.spread.toFixed(1)} pts</td>
                    <td className="mono px-3 py-3 text-right text-[12px] text-muted-foreground">{v.fees}</td>
                    <td className="px-3 py-3 text-right text-[12px]">
                      <span className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium ring-1 ring-inset ${
                        v.liquidity === "Deep"
                          ? "bg-positive/10 text-positive ring-[hsl(var(--positive))/30]"
                          : v.liquidity === "Moderate"
                          ? "text-info ring-info/30 bg-info/10"
                          : "text-warning ring-[hsl(var(--warning))/30] bg-[hsl(var(--warning))/10]"
                      }`}>
                        {v.liquidity}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right text-[12px] text-muted-foreground">{v.resolution}</td>
                    <td className="px-4 py-3 text-right">
                      <span className="inline-flex items-center rounded-md bg-info/10 px-2 py-0.5 text-[11px] font-semibold text-info ring-1 ring-inset ring-info/30">
                        {v.best}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="border-t border-border bg-[hsl(var(--surface-1))] px-4 py-3 text-[11px] text-subtle">
          For information only. oracle is not a broker or trading venue. Probabilities can diverge for many reasons including liquidity, fees, and jurisdiction.
        </div>
      </div>
    </div>
  </section>
);