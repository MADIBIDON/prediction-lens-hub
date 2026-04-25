import { NEWS, getMarket } from "@/data/mock";
import { CategoryChip } from "./CategoryChip";
import { Delta } from "./Delta";
import { SectionHeader } from "./SectionHeader";

export const NewsGrid = () => (
  <section className="border-b border-border">
    <div className="mx-auto max-w-[1400px] px-4 py-12 md:px-6 md:py-16">
      <SectionHeader
        eyebrow="News driving markets"
        title="Every story linked to a probability move"
        description="Catalysts that moved prediction markets in the last few hours, with the resulting probability shift."
        link={{ label: "Open the news feed", href: "/news" }}
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {NEWS.map((n) => {
          const m = getMarket(n.relatedMarketId);
          return (
            <article
              key={n.id}
              className="flex flex-col rounded-lg border border-border bg-[hsl(var(--surface-1))] p-4 transition-colors hover:border-hover hover:bg-[hsl(var(--surface-2))]"
            >
              <div className="mono flex items-center justify-between text-[10px] uppercase tracking-wider text-subtle">
                <span className="text-info">{n.source}</span>
                <span>{n.ago}</span>
              </div>
              <h3 className="mt-2.5 text-[14px] font-semibold leading-snug text-foreground">
                {n.headline}
              </h3>
              {m && (
                <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-3">
                  <div className="min-w-0">
                    <div className="mono text-[10px] uppercase tracking-wider text-subtle">Related market</div>
                    <div className="mt-0.5 line-clamp-1 text-[12px] text-muted-foreground">{m.title}</div>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <CategoryChip category={m.category} />
                    </div>
                  </div>
                  <Delta value={n.probabilityChange} />
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  </section>
);