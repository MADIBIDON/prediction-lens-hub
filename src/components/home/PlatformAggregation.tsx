import { ChevronRight } from "lucide-react";
import { PLATFORMS } from "@/data/fixtures/venues";

export function PlatformAggregation() {
  return (
    <section id="section-Platforms" className="border-b border-border">
      <div className="mx-auto max-w-[1440px] px-6 py-12 lg:px-12">
        <header className="mb-6">
          <h2 className="font-display text-[28px] font-semibold tracking-tight text-foreground">
            Aggregating the world's prediction markets
          </h2>
          <p className="mt-1 text-[14px] text-muted-foreground">
            One view across the venues that matter.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PLATFORMS.map((p) => (
            <article
              key={p.id}
              className="rounded-lg border border-border bg-surface-1 p-6 transition-colors hover:border-hover"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-2 font-display text-[20px] font-semibold text-foreground">
                  {p.initial}
                </div>
                <div>
                  <h3 className="font-display text-[20px] font-semibold text-foreground">{p.id}</h3>
                  <p className="text-[12px] text-muted-foreground">{p.subtitle}</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <Stat label="MARKETS" value={p.markets} />
                <Stat label="24H VOLUME" value={p.vol24h} />
                <Stat label="AVG SPREAD" value={p.avgSpread} />
                <Stat label="STRONGEST IN" value={p.strongest} mono={false} />
              </div>

              <a
                href="#"
                className="mt-6 inline-flex items-center gap-1 text-[13px] font-medium text-info hover:opacity-80"
              >
                Browse markets <ChevronRight className="h-3.5 w-3.5" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, mono = true }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <div className={mono ? "font-mono text-[18px] font-semibold text-foreground" : "text-[14px] font-medium text-foreground"}>
        {value}
      </div>
      <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}
