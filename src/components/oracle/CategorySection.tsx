import { byCategory, type Category, fmtMoney, fmtProb } from "@/data/mock";
import { Coins, Cpu, Flag, Globe, Sparkles, TrendingUp, Trophy, Scale } from "lucide-react";
import { Sparkline } from "./Sparkline";
import { Delta } from "./Delta";

const CATEGORY_ICON: Record<Category, typeof Flag> = {
  Politics: Flag,
  Geopolitics: Globe,
  Crypto: Coins,
  Economy: TrendingUp,
  Tech: Cpu,
  Sports: Trophy,
  Culture: Sparkles,
  Regulation: Scale,
};

interface CategorySectionProps {
  category: Category;
  description?: string;
}

export const CategorySection = ({ category }: CategorySectionProps) => {
  const all = byCategory(category);
  const trending = all.slice(0, 6);
  const gainers = [...all].filter((m) => m.change24h > 0).sort((a, b) => b.change24h - a.change24h).slice(0, 5);
  const losers = [...all].filter((m) => m.change24h < 0).sort((a, b) => a.change24h - b.change24h).slice(0, 5);
  const Icon = CATEGORY_ICON[category];

  return (
    <section id={`cat-${category}`} className="border-b border-border">
      <div className="mx-auto max-w-[1440px] px-4 py-12 md:px-6 md:py-16 lg:px-16 lg:py-20">
        {/* Section header */}
        <div className="mb-5 flex items-end justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Icon className="h-5 w-5 text-muted-foreground" strokeWidth={1.75} />
            <h2 className="text-[22px] font-semibold tracking-tight md:text-[24px]">{category}</h2>
          </div>
          <a
            href="/markets"
            className="text-[12px] font-medium text-info hover:text-[hsl(var(--info-hover))]"
          >
            View all →
          </a>
        </div>

        {/* Sub-section: Trending markets — horizontal scroll */}
        <div className="mb-3">
          <h3 className="mono mb-2.5 text-[10px] font-semibold uppercase tracking-wider text-subtle">
            Trending markets
          </h3>
          <div className="-mx-4 overflow-x-auto px-4 pb-1 md:-mx-6 md:px-6 lg:-mx-16 lg:px-16 [&::-webkit-scrollbar]:h-1.5">
            <div className="flex min-w-max items-stretch gap-3">
              {trending.map((m) => (
                <article
                  key={m.id}
                  className="flex w-[220px] shrink-0 flex-col rounded-lg border border-border bg-[hsl(var(--surface-1))] p-4 transition-colors hover:border-hover hover:bg-[hsl(var(--surface-2))]"
                  style={{ minHeight: 180 }}
                >
                  <h4 className="line-clamp-2 min-h-[36px] text-[13px] font-medium leading-snug text-foreground">
                    {m.title}
                  </h4>
                  <div className="mt-2.5 flex items-baseline justify-between">
                    <span className="mono text-2xl font-semibold tracking-tight text-foreground">
                      {fmtProb(m.probability)}
                    </span>
                    <Delta value={m.change24h} size="sm" />
                  </div>
                  <div className="mono mt-1.5 text-[11px] text-subtle">{fmtMoney(m.volume24h)} 24h</div>
                  <div className="mt-2 flex-1">
                    <Sparkline
                      data={m.spark}
                      width={188}
                      height={28}
                      color={m.change24h >= 0 ? "positive" : "negative"}
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between border-t border-border pt-2">
                    <span className="mono text-[10px] uppercase tracking-wider text-subtle">{m.platform}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Sub-section: Gainers / Losers two columns */}
        <div className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-2">
          <MoverPanel title={`${category} gainers`} tone="positive" rows={gainers} />
          <MoverPanel title={`${category} losers`} tone="negative" rows={losers} />
        </div>
      </div>
    </section>
  );
};

interface MoverPanelProps {
  title: string;
  tone: "positive" | "negative";
  rows: ReturnType<typeof byCategory>;
}

const MoverPanel = ({ title, tone, rows }: MoverPanelProps) => (
  <div className="overflow-hidden rounded-lg border border-border bg-[hsl(var(--surface-1))]">
    <div className="flex items-center justify-between border-b border-border px-4 py-3">
      <div className="flex items-center gap-2">
        <span className={`h-1.5 w-1.5 rounded-full ${tone === "positive" ? "bg-positive" : "bg-negative"}`} />
        <h3 className="text-[13px] font-semibold">{title}</h3>
      </div>
      <span className="mono text-[10px] uppercase tracking-wider text-subtle">24h Δ</span>
    </div>
    {rows.length === 0 ? (
      <div className="px-4 py-6 text-center text-[12px] text-subtle">No markets in this bucket.</div>
    ) : (
      <ul className="divide-y divide-border">
        {rows.map((m) => (
          <li
            key={m.id}
            className="grid grid-cols-[1fr,auto,auto] items-center gap-3 px-4 py-3 transition-colors hover:bg-[hsl(var(--surface-2))]"
          >
            <div className="min-w-0">
              <div className="line-clamp-1 text-[13px] font-medium text-foreground">{m.title}</div>
              <div className="mono mt-0.5 text-[10px] uppercase tracking-wider text-subtle">{m.platform}</div>
            </div>
            <div className="mono text-right text-[13px] font-semibold text-foreground">{fmtProb(m.probability)}</div>
            <Delta value={m.change24h} size="sm" pill />
          </li>
        ))}
      </ul>
    )}
  </div>
);
