import {
  BookOpen,
  Scale,
  Percent,
  Layers,
  GitCompare,
  CheckCircle2,
  AlertTriangle,
  Gauge,
  Calendar,
  Newspaper,
} from "lucide-react";

const DOCS = [
  { icon: BookOpen,    title: "What are prediction markets?", desc: "An introduction to how probabilities are formed." },
  { icon: Scale,       title: "Polymarket vs Kalshi",          desc: "Two venues, two regulatory regimes." },
  { icon: Percent,     title: "How probabilities work",        desc: "From price to probability and back." },
  { icon: Layers,      title: "Understanding liquidity",       desc: "Why depth matters more than volume." },
  { icon: GitCompare,  title: "Understanding spreads",         desc: "Bid-ask, slippage, and venue cost." },
  { icon: CheckCircle2,title: "Resolution rules",              desc: "How markets settle and what to watch." },
  { icon: AlertTriangle,title:"Market risk",                   desc: "What can go wrong, and how to think about it." },
  { icon: Gauge,       title: "How Oracle Score works",        desc: "Our methodology, explained." },
  { icon: Calendar,    title: "Event calendars",               desc: "Reading the resolution timeline." },
  { icon: Newspaper,   title: "How news moves probabilities",  desc: "Cause, effect, and lag." },
];

export function DocumentationGrid() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-[1440px] px-6 py-12 lg:px-12">
        <header className="mb-6">
          <h2 className="font-display text-[28px] font-semibold tracking-tight text-foreground">
            Understand the markets
          </h2>
          <p className="mt-1 text-[14px] text-muted-foreground">
            Learn how prediction markets work, before you commit.
          </p>
        </header>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {DOCS.map((d) => (
            <article
              key={d.title}
              className="flex flex-col rounded-lg border border-border bg-surface-1 p-5 transition-colors hover:border-hover"
            >
              <d.icon className="h-6 w-6 text-info" strokeWidth={1.75} />
              <h3 className="mt-3 font-display text-[15px] font-semibold leading-snug text-foreground">
                {d.title}
              </h3>
              <p className="mt-1 line-clamp-2 flex-1 text-[13px] text-muted-foreground">{d.desc}</p>
              <a href="/docs" className="mt-3 text-[12px] font-medium text-info hover:opacity-80">
                Read →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
