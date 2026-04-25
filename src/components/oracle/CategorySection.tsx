import { byCategory, type Category, NEWS, fmtMoney, fmtDate, getMarket, CALENDAR } from "@/data/mock";
import { CategoryChip, PlatformChip } from "./CategoryChip";
import { Sparkline } from "./Sparkline";
import { Delta } from "./Delta";
import { CalendarClock } from "lucide-react";

interface CategorySectionProps {
  category: Category;
  description: string;
}

export const CategorySection = ({ category, description }: CategorySectionProps) => {
  const all = byCategory(category);
  const trending = all.slice(0, 3);
  const movers = [...all].sort((a, b) => Math.abs(b.change24h) - Math.abs(a.change24h)).slice(0, 3);
  const liquid = [...all].sort((a, b) => b.liquidity - a.liquidity).slice(0, 3);
  const related = NEWS.filter((n) => {
    const m = getMarket(n.relatedMarketId);
    return m?.category === category;
  }).slice(0, 3);
  const upcoming = CALENDAR.find((e) => e.category === category);

  return (
    <section
      id={`cat-${category}`}
      className="border-b border-border"
    >
      <div className="mx-auto max-w-[1400px] px-4 py-10 md:px-6 md:py-14">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="mono text-[11px] uppercase tracking-wider text-info">{category}</div>
            <h2 className="mt-1 text-[22px] font-semibold tracking-tight md:text-[24px]">
              {category} markets
            </h2>
            <p className="mt-1.5 max-w-[620px] text-[13px] text-muted-foreground">{description}</p>
          </div>
          <a href="/markets" className="text-[12px] font-medium text-info hover:text-[hsl(var(--info-hover))]">
            View {category.toLowerCase()} →
          </a>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
          <Tile title="Trending" className="lg:col-span-3">
            {trending.map((m) => (
              <Row
                key={m.id}
                title={m.title}
                left={<PlatformChip platform={m.platform} />}
                right={<span className="mono text-sm font-semibold">{fmtProb(m.probability)}</span>}
              />
            ))}
          </Tile>

          <Tile title="Biggest movers" className="lg:col-span-3">
            {movers.map((m) => (
              <Row
                key={m.id}
                title={m.title}
                left={
                  <Sparkline
                    data={m.spark}
                    width={48}
                    height={18}
                    color={m.change24h >= 0 ? "positive" : "negative"}
                  />
                }
                right={<Delta value={m.change24h} size="sm" />}
              />
            ))}
          </Tile>

          <Tile title="Most liquid" className="lg:col-span-3">
            {liquid.map((m) => (
              <Row
                key={m.id}
                title={m.title}
                left={<PlatformChip platform={m.platform} />}
                right={<span className="mono text-[11px] text-foreground">{fmtMoney(m.liquidity)}</span>}
              />
            ))}
          </Tile>

          <Tile title="Related news" className="lg:col-span-3">
            {related.length === 0 ? (
              <div className="text-[12px] text-subtle">No catalysts in last 24h.</div>
            ) : (
              related.map((n) => {
                const m = getMarket(n.relatedMarketId);
                return (
                  <Row
                    key={n.id}
                    title={n.headline}
                    left={<span className="mono text-[10px] text-subtle">{n.source}</span>}
                    right={<Delta value={n.probabilityChange} size="sm" />}
                  />
                );
              })
            )}
          </Tile>
        </div>

        {upcoming && (
          <div className="mt-3 flex flex-wrap items-center gap-3 rounded-lg border border-border bg-[hsl(var(--surface-1))] px-4 py-3">
            <CalendarClock className="h-4 w-4 text-info" />
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="mono text-[11px] uppercase tracking-wider text-subtle">Upcoming resolution</span>
              <span className="text-[13px] font-medium text-foreground">{upcoming.event}</span>
              <span className="mono text-[12px] text-muted-foreground">
                {fmtDate(upcoming.date)} · {upcoming.timeUTC}
              </span>
              <span className="mono text-[12px] text-info">{fmtMoney(upcoming.volumeInPlay)} in play</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const Tile = ({
  title,
  className = "",
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) => (
  <div className={`rounded-lg border border-border bg-[hsl(var(--surface-1))] ${className}`}>
    <div className="border-b border-border px-3 py-2">
      <h3 className="mono text-[10px] font-semibold uppercase tracking-wider text-subtle">{title}</h3>
    </div>
    <div className="divide-y divide-border">{children}</div>
  </div>
);

const Row = ({
  title,
  left,
  right,
}: {
  title: string;
  left: React.ReactNode;
  right: React.ReactNode;
}) => (
  <div className="flex items-start justify-between gap-3 px-3 py-2.5">
    <div className="min-w-0 flex-1">
      <div className="line-clamp-2 text-[12.5px] font-medium leading-snug text-foreground">{title}</div>
      <div className="mt-1 flex items-center gap-1.5">{left}</div>
    </div>
    <div className="shrink-0">{right}</div>
  </div>
);