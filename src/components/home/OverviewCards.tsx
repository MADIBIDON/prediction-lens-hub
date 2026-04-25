import { ChevronRight } from "lucide-react";
import { OVERVIEW, fmtProb } from "@/data/fixtures/markets";
import { Sparkline } from "./Sparkline";
import { Delta } from "./Delta";

export function OverviewCards() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-[1440px] px-6 pb-12 pt-0 lg:px-12">
        <div className="grid grid-cols-12 gap-6">
          {/* Most active */}
          <Card
            sublabel={OVERVIEW.active.sublabel}
            title="Most active markets"
            big={OVERVIEW.active.big}
            sub={<Delta value={OVERVIEW.active.delta} />}
            spark={<Sparkline data={OVERVIEW.active.spark} width={280} height={56} tone="positive" strokeWidth={1.5} />}
            footer="View all markets"
          >
            {OVERVIEW.active.rows.map((r) => (
              <Row key={r.title} title={r.title} prob={fmtProb(r.prob)} change={r.change} />
            ))}
          </Card>

          {/* Resolving this week */}
          <Card
            sublabel={OVERVIEW.resolving.sublabel}
            title="Resolving this week"
            big={OVERVIEW.resolving.big}
            sub={<span className="text-[13px] text-muted-foreground">{OVERVIEW.resolving.sub}</span>}
            spark={<Sparkline data={OVERVIEW.resolving.spark} width={280} height={56} tone="info" strokeWidth={1.5} />}
            footer="View calendar"
          >
            {OVERVIEW.resolving.rows.map((r) => (
              <li
                key={r.title}
                className="flex items-center justify-between border-b border-border py-2 last:border-0"
              >
                <span className="line-clamp-1 text-[13px] text-foreground">{r.title}</span>
                <div className="flex items-center gap-3 font-mono text-[13px] tabular-nums">
                  <span className="text-muted-foreground">{r.days}d</span>
                  <span className="font-medium text-foreground">{fmtProb(r.prob)}</span>
                </div>
              </li>
            ))}
          </Card>

          {/* Top Oracle Score */}
          <Card
            sublabel={OVERVIEW.signal.sublabel}
            title="Top Oracle Score"
            big={OVERVIEW.signal.big}
            sub={<span className="text-[13px] text-muted-foreground">{OVERVIEW.signal.sub}</span>}
            spark={<Sparkline data={OVERVIEW.signal.spark} width={280} height={56} tone="positive" strokeWidth={1.5} />}
            footer="How Oracle Score works"
          >
            {OVERVIEW.signal.rows.map((r) => (
              <li
                key={r.title}
                className="flex items-center justify-between border-b border-border py-2 last:border-0"
              >
                <span className="line-clamp-1 text-[13px] text-foreground">{r.title}</span>
                <div className="flex items-center gap-2 font-mono text-[13px] tabular-nums">
                  <span className="rounded bg-surface-2 px-1.5 py-0.5 text-[11px] text-foreground">
                    {r.score}
                  </span>
                  <span className="font-medium text-foreground">{fmtProb(r.prob)}</span>
                </div>
              </li>
            ))}
          </Card>
        </div>
      </div>
    </section>
  );
}

interface CardProps {
  title: string;
  sublabel: string;
  big: string;
  sub: React.ReactNode;
  spark: React.ReactNode;
  footer: string;
  children: React.ReactNode;
}

function Card({ title, sublabel, big, sub, spark, footer, children }: CardProps) {
  return (
    <article className="col-span-12 rounded-lg border border-border bg-surface-1 p-6 transition-colors hover:border-hover md:col-span-6 lg:col-span-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <h3 className="font-display text-[16px] font-semibold text-foreground">{title}</h3>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>
        <span className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] tracking-wider text-muted-foreground">
          {sublabel}
        </span>
      </div>
      <div className="mt-4 flex items-baseline gap-3">
        <span className="font-mono text-[24px] font-semibold leading-none text-foreground">{big}</span>
        {sub}
      </div>
      <div className="mt-3 -mx-1 h-14 overflow-hidden">{spark}</div>
      <ul className="mt-4">{children}</ul>
      <a
        href="#"
        className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium text-info hover:opacity-80"
      >
        {footer} <ChevronRight className="h-3.5 w-3.5" />
      </a>
    </article>
  );
}

function Row({ title, prob, change }: { title: string; prob: string; change: number }) {
  return (
    <li className="flex items-center justify-between border-b border-border py-2 last:border-0">
      <span className="line-clamp-1 text-[13px] text-foreground">{title}</span>
      <div className="flex items-center gap-3">
        <span className="font-mono text-[13px] font-medium text-foreground">{prob}</span>
        <Delta value={change} className="text-[12px]" />
      </div>
    </li>
  );
}
