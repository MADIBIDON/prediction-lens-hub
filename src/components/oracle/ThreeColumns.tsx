import { CATEGORIES, MARKETS, daysUntil, fmtMoney } from "@/data/mock";
import { CategoryChip, PlatformChip } from "./CategoryChip";
import { OracleScore } from "./OracleScore";
import { SectionHeader } from "./SectionHeader";
import { ArrowRight } from "lucide-react";

export const ThreeColumns = () => {
  const mostActive = [...MARKETS].sort((a, b) => b.volume24h - a.volume24h).slice(0, 5);
  const resolvingSoon = [...MARKETS]
    .filter((m) => daysUntil(m.closeDate) > 0)
    .sort((a, b) => daysUntil(a.closeDate) - daysUntil(b.closeDate))
    .slice(0, 5);
  const topScored = [...MARKETS].sort((a, b) => b.oracleScore - a.oracleScore).slice(0, 5);

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-4 py-12 md:px-6 md:py-16">
        <SectionHeader
          eyebrow="Market overview"
          title="What's moving across prediction markets"
          description="A quick read on the most active markets, the ones resolving soon, and the highest Oracle Scores."
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Column
            title="Most Active Today"
            sublabel="by 24h volume"
            rows={mostActive.map((m) => ({
              key: m.id,
              title: m.title,
              chips: <PlatformChip platform={m.platform} />,
              right: (
                <div className="text-right">
                  <div className="mono text-sm font-semibold">{m.probability}%</div>
                  <div className="mono text-[11px] text-subtle">{fmtMoney(m.volume24h)}</div>
                </div>
              ),
            }))}
          />
          <Column
            title="Resolving This Week"
            sublabel="by close date"
            rows={resolvingSoon.map((m) => {
              const d = daysUntil(m.closeDate);
              return {
                key: m.id,
                title: m.title,
                chips: <CategoryChip category={m.category} />,
                right: (
                  <div className="text-right">
                    <div className="mono text-sm font-semibold">{m.probability}%</div>
                    <div className="mono text-[11px] text-subtle">{d}d</div>
                  </div>
                ),
              };
            })}
          />
          <Column
            title="Top Oracle Scores"
            sublabel="prioritization indicator · 0–100"
            rows={topScored.map((m) => ({
              key: m.id,
              title: m.title,
              chips: <CategoryChip category={m.category} />,
              right: (
                <div className="flex flex-col items-end gap-1">
                  <div className="mono text-sm font-semibold">{m.probability}%</div>
                  <OracleScore score={m.oracleScore} />
                </div>
              ),
            }))}
          />
        </div>
        <div className="sr-only">{CATEGORIES.length} categories</div>
      </div>
    </section>
  );
};

interface ColumnProps {
  title: string;
  sublabel: string;
  rows: { key: string; title: string; chips: React.ReactNode; right: React.ReactNode }[];
}

const Column = ({ title, sublabel, rows }: ColumnProps) => (
  <div className="rounded-lg border border-border bg-[hsl(var(--surface-1))]">
    <div className="flex items-center justify-between border-b border-border px-4 py-3">
      <div>
        <h3 className="text-[14px] font-semibold tracking-tight">{title}</h3>
        <p className="mono text-[10px] uppercase tracking-wider text-subtle">{sublabel}</p>
      </div>
    </div>
    <ul>
      {rows.map((r, i) => (
        <li
          key={r.key}
          className={`flex items-start justify-between gap-3 px-4 py-3 transition-colors hover:bg-[hsl(var(--surface-2))] ${
            i !== rows.length - 1 ? "border-b border-border" : ""
          }`}
        >
          <div className="min-w-0 flex-1">
            <div className="line-clamp-2 text-[13px] font-medium leading-snug text-foreground">
              {r.title}
            </div>
            <div className="mt-1.5 flex items-center gap-1.5">{r.chips}</div>
          </div>
          {r.right}
        </li>
      ))}
    </ul>
    <a
      href="/markets"
      className="flex items-center justify-between border-t border-border px-4 py-2.5 text-[12px] font-medium text-info transition-colors hover:bg-[hsl(var(--surface-2))] hover:text-[hsl(var(--info-hover))]"
    >
      View all <ArrowRight className="h-3 w-3" />
    </a>
  </div>
);