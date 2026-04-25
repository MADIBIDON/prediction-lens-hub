import { ArrowRight } from "lucide-react";
import { PLATFORMS, fmtMoney } from "@/data/mock";
import { SectionHeader } from "./SectionHeader";

export const Platforms = () => (
  <section id="platforms" className="border-b border-border">
    <div className="mx-auto max-w-[1400px] px-4 py-12 md:px-6 md:py-16">
      <SectionHeader
        eyebrow="Platform aggregation"
        title="One view across prediction markets"
        description="oracle aggregates markets from the major prediction market venues — so you can compare, monitor and screen in one place."
      />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {PLATFORMS.map((p) => (
          <div
            key={p.id}
            className="flex flex-col rounded-lg border border-border bg-[hsl(var(--surface-1))] p-5 transition-colors hover:border-hover hover:bg-[hsl(var(--surface-2))]"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-[18px] font-semibold tracking-tight">{p.id}</h3>
              <span className="mono text-[11px] uppercase tracking-wider text-subtle">aggregated</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4">
              <Stat label="Markets" value={p.markets.toLocaleString()} />
              <Stat label="24h volume" value={fmtMoney(p.volume24h)} />
              <Stat label="Strongest" value={p.strongest} />
              <Stat label="Avg spread" value={`${p.avgSpread.toFixed(1)} pts`} />
            </div>
            <a
              href={p.url}
              className="mt-5 inline-flex items-center gap-1 text-[12px] font-medium text-info hover:text-[hsl(var(--info-hover))]"
            >
              Browse {p.id} markets <ArrowRight className="h-3 w-3" />
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div>
    <div className="mono text-[10px] uppercase tracking-wider text-subtle">{label}</div>
    <div className="mono mt-1 text-[14px] font-semibold text-foreground">{value}</div>
  </div>
);