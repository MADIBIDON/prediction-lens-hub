import { CALENDAR, fmtDate, fmtMoney, getMarket } from "@/data/mock";
import { CategoryChip } from "./CategoryChip";
import { SectionHeader } from "./SectionHeader";

export const ResolutionCalendar = () => (
  <section className="border-b border-border">
    <div className="mx-auto max-w-[1400px] px-4 py-12 md:px-6 md:py-16">
      <SectionHeader
        eyebrow="Resolution calendar"
        title="When markets will move and resolve"
        description="Central bank decisions, elections, court rulings, regulatory votes and major events — linked to the markets they will resolve."
        link={{ label: "Open the calendar", href: "/calendar" }}
      />
      <div className="-mx-4 overflow-x-auto px-4 pb-2 md:-mx-6 md:px-6 [&::-webkit-scrollbar]:h-1.5">
        <ol className="flex min-w-max items-stretch gap-3">
          {CALENDAR.map((e) => (
            <li key={e.id} className="w-[280px] shrink-0 rounded-lg border border-border bg-[hsl(var(--surface-1))] p-4 transition-colors hover:border-hover hover:bg-[hsl(var(--surface-2))]">
              <div className="flex items-center justify-between text-[11px]">
                <span className="mono text-foreground">{fmtDate(e.date)}</span>
                <span className="mono text-subtle">{e.timeUTC}</span>
              </div>
              <div className="mt-2 text-[14px] font-semibold leading-snug text-foreground">{e.event}</div>
              <div className="mt-2 flex items-center gap-1.5">
                <CategoryChip category={e.category} />
              </div>
              <div className="mt-3 space-y-1.5">
                {e.related.map((id) => {
                  const m = getMarket(id);
                  if (!m) return null;
                  return (
                    <div key={id} className="flex items-baseline justify-between gap-2 rounded-md bg-[hsl(var(--surface-2))] px-2 py-1.5">
                      <div className="line-clamp-1 text-[12px] text-muted-foreground">{m.title}</div>
                      <div className="mono text-[12px] font-semibold text-foreground">{m.probability}%</div>
                    </div>
                  );
                })}
              </div>
              <div className="mono mt-3 flex items-center justify-between border-t border-border pt-2 text-[11px]">
                <span className="text-subtle">Volume in play</span>
                <span className="text-foreground">{fmtMoney(e.volumeInPlay)}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </section>
);