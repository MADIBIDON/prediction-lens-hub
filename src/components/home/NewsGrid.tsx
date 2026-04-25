import { useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
import { HOME_NEWS, type HomeNewsItem } from "@/data/fixtures/news";
import { fmtPct } from "@/data/fixtures/markets";
import { cn } from "@/lib/utils";

const TABS = ["All", "Politics", "Geopolitics", "Crypto", "Economy", "Tech", "Sports"] as const;

export function NewsGrid() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");
  const items = useMemo<HomeNewsItem[]>(
    () => (tab === "All" ? HOME_NEWS : HOME_NEWS.filter((n) => n.category === tab)).slice(0, 16),
    [tab],
  );

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-[1440px] px-6 py-12 lg:px-12">
        <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div className="flex items-center gap-1">
            <h2 className="font-display text-[28px] font-semibold tracking-tight text-foreground">
              News driving markets
            </h2>
            <ChevronRight className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="flex flex-wrap items-center gap-1 rounded-full border border-border bg-surface-2 px-1 py-1">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "h-7 rounded-full px-3 text-[12px] font-medium transition-colors duration-150",
                  tab === t
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((n) => (
            <article key={n.id} className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
                <span className="inline-block h-4 w-4 rounded-full bg-surface-2" />
                <span className="font-medium">{n.source}</span>
                <span>·</span>
                <span>{n.ago}</span>
              </div>
              <h4 className="line-clamp-2 cursor-pointer text-[15px] font-medium leading-snug text-foreground transition-colors hover:text-info">
                {n.headline}
              </h4>
              <div className="text-[12px] text-muted-foreground">
                Related: <span className="text-foreground">{n.relatedTitle}</span> ·{" "}
                <span className={n.probMove >= 0 ? "font-mono text-positive" : "font-mono text-negative"}>
                  {fmtPct(n.probMove)}
                </span>
              </div>
            </article>
          ))}
        </div>

        <a href="/news" className="mt-8 inline-flex items-center gap-1 text-[13px] font-medium text-info hover:opacity-80">
          Continue reading <ChevronRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </section>
  );
}
