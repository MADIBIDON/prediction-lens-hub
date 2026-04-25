import { ChevronDown } from "lucide-react";
import { MARKETS, fmtMoney, fmtDate, fmtProb } from "@/data/mock";
import { CategoryChip, PlatformChip } from "./CategoryChip";
import { Delta } from "./Delta";
import { OracleScore } from "./OracleScore";
import { Sparkline } from "./Sparkline";
import { SectionHeader } from "./SectionHeader";

const FILTERS = [
  "Category",
  "Platform",
  "Probability",
  "24h move",
  "Volume",
  "Liquidity",
  "Close date",
  "Region",
  "Oracle Score",
];

export const ScreenerPreview = () => {
  const rows = [...MARKETS].sort((a, b) => b.oracleScore - a.oracleScore).slice(0, 8);
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-[1440px] px-4 py-12 md:px-6 md:py-16 lg:px-16 lg:py-20">
        <SectionHeader
          eyebrow="Prediction market screener"
          title="A full screener for prediction markets"
          description="Filter, sort and screen every prediction market across categories, platforms and regions. Preview below."
          link={{ label: "Open the full screener", href: "/markets" }}
        />

        <div className="overflow-hidden rounded-lg border border-border bg-[hsl(var(--surface-1))]">
          <div className="flex flex-wrap gap-2 border-b border-border p-3">
            {FILTERS.map((f) => (
              <button
                key={f}
                className="inline-flex items-center gap-1 rounded-md border border-border bg-[hsl(var(--surface-2))] px-2.5 py-1.5 text-[12px] text-muted-foreground transition-colors hover:border-hover hover:text-foreground"
              >
                {f}
                <ChevronDown className="h-3 w-3" />
              </button>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead>
                <tr className="mono border-b border-border text-[10px] uppercase tracking-wider text-subtle">
                  <th className="px-4 py-2.5 font-medium">Market</th>
                  <th className="px-3 py-2.5 text-right font-medium">Probability</th>
                  <th className="px-3 py-2.5 text-right font-medium">24h Δ</th>
                  <th className="px-3 py-2.5 text-right font-medium">Volume 24h</th>
                  <th className="px-3 py-2.5 text-right font-medium">Liquidity</th>
                  <th className="px-3 py-2.5 text-right font-medium">Closes</th>
                  <th className="px-3 py-2.5 text-right font-medium">Trend</th>
                  <th className="px-4 py-2.5 text-right font-medium">Oracle Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {rows.map((m) => (
                  <tr key={m.id} className="transition-colors hover:bg-[hsl(var(--surface-2))]">
                    <td className="px-4 py-2.5">
                      <div className="text-[13px] font-medium text-foreground">{m.title}</div>
                      <div className="mt-1 flex items-center gap-1.5">
                        <CategoryChip category={m.category} />
                        <PlatformChip platform={m.platform} />
                      </div>
                    </td>
                    <td className="mono px-3 py-2.5 text-right text-[13px] font-semibold">{fmtProb(m.probability)}</td>
                    <td className="px-3 py-2.5 text-right">
                      <Delta value={m.change24h} size="sm" />
                    </td>
                    <td className="mono px-3 py-2.5 text-right text-[12px] text-muted-foreground">{fmtMoney(m.volume24h)}</td>
                    <td className="mono px-3 py-2.5 text-right text-[12px] text-muted-foreground">{fmtMoney(m.liquidity)}</td>
                    <td className="mono px-3 py-2.5 text-right text-[12px] text-muted-foreground">{fmtDate(m.closeDate)}</td>
                    <td className="px-3 py-2.5 text-right">
                      <div className="inline-block">
                        <Sparkline data={m.spark} width={70} height={22} color={m.change24h >= 0 ? "positive" : "negative"} />
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <OracleScore score={m.oracleScore} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};