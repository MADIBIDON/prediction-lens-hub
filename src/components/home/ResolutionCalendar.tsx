import { ChevronRight } from "lucide-react";
import { RESOLUTION_EVENTS } from "@/data/fixtures/calendar";

export function ResolutionCalendar() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-[1440px] px-6 py-12 lg:px-12">
        <header className="mb-6">
          <div className="flex items-center gap-1">
            <h2 className="font-display text-[28px] font-semibold tracking-tight text-foreground">
              Resolution calendar
            </h2>
            <ChevronRight className="h-6 w-6 text-muted-foreground" />
          </div>
          <a href="/calendar" className="mt-1 inline-flex items-center gap-1 text-[13px] font-medium text-info hover:opacity-80">
            View all events <ChevronRight className="h-3.5 w-3.5" />
          </a>
        </header>

        <div className="-mx-6 overflow-x-auto px-6 pb-1 lg:-mx-12 lg:px-12 [&::-webkit-scrollbar]:h-1.5">
          <div className="flex gap-4">
            {RESOLUTION_EVENTS.map((e) => (
              <article
                key={e.id}
                className="flex w-[280px] shrink-0 flex-col rounded-lg border border-border bg-surface-1 p-4 transition-colors hover:border-hover"
              >
                <div className="font-mono text-[12px] text-muted-foreground">
                  <span className="text-foreground">{e.date}</span>
                  <span className="px-1">·</span>
                  <span>{e.timeUTC}</span>
                </div>
                <h4 className="mt-2 line-clamp-2 min-h-[44px] font-display text-[15px] font-semibold leading-snug text-foreground">
                  {e.event}
                </h4>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {e.chips.map((c) => (
                    <span key={c} className="rounded bg-surface-2 px-2 py-0.5 text-[11px] text-muted-foreground">
                      {c}
                    </span>
                  ))}
                </div>
                <div className="mt-3 border-t border-border pt-3 font-mono text-[12px] text-muted-foreground">
                  <span className="text-foreground">{e.volInPlay}</span> in play
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
