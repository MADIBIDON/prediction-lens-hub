import { MARKETS, fmtMoney, fmtProb } from "@/data/mock";
import { CategoryChip, PlatformChip } from "./CategoryChip";
import { Delta } from "./Delta";
import { SectionHeader } from "./SectionHeader";

export const GainersLosers = () => {
  const up = [...MARKETS].filter((m) => m.change24h > 0).sort((a, b) => b.change24h - a.change24h).slice(0, 6);
  const down = [...MARKETS].filter((m) => m.change24h < 0).sort((a, b) => a.change24h - b.change24h).slice(0, 6);
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-4 py-12 md:px-6 md:py-16">
        <SectionHeader
          eyebrow="Probability movement"
          title="Markets moving up and down"
          description="The biggest probability shifts in the last 24h. Movement, not profit."
        />
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <Panel title="Markets Moving Up" tone="positive" rows={up} />
          <Panel title="Markets Moving Down" tone="negative" rows={down} />
        </div>
      </div>
    </section>
  );
};

const Panel = ({
  title,
  tone,
  rows,
}: {
  title: string;
  tone: "positive" | "negative";
  rows: typeof MARKETS;
}) => (
  <div className="overflow-hidden rounded-lg border border-border bg-[hsl(var(--surface-1))]">
    <div className="flex items-center justify-between border-b border-border px-4 py-3">
      <div className="flex items-center gap-2">
        <span className={`h-1.5 w-1.5 rounded-full ${tone === "positive" ? "bg-positive" : "bg-negative"}`} />
        <h3 className="text-[14px] font-semibold">{title}</h3>
      </div>
      <span className="mono text-[10px] uppercase tracking-wider text-subtle">24h Δ</span>
    </div>
    <div className="divide-y divide-border">
      {rows.map((m) => (
        <div
          key={m.id}
          className="grid grid-cols-[1fr,auto,auto] items-center gap-3 px-4 py-3 transition-colors hover:bg-[hsl(var(--surface-2))]"
        >
          <div className="min-w-0">
            <div className="line-clamp-1 text-[13px] font-medium text-foreground">{m.title}</div>
            <div className="mt-1 flex items-center gap-1.5">
              <CategoryChip category={m.category} />
              <PlatformChip platform={m.platform} />
              <span className="mono text-[10px] text-subtle">{fmtMoney(m.volume24h)}</span>
            </div>
          </div>
          <div className="mono text-right text-sm font-semibold">{fmtProb(m.probability)}</div>
          <Delta value={m.change24h} />
        </div>
      ))}
    </div>
  </div>
);