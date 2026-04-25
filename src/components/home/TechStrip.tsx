import { Rocket } from "lucide-react";

/**
 * Tech-only release timeline: AI / product launches with market-implied
 * probabilities. Visually a horizontal timeline, not the same list pattern.
 */
const LAUNCHES = [
  { date: "Jun 12", company: "OpenAI",    product: "GPT-6 dev preview",        prob: 0.39, change:  2.1 },
  { date: "Jul 03", company: "Anthropic", product: "Claude Opus 4",            prob: 0.48, change:  0.6 },
  { date: "Jul 28", company: "Google",    product: "Gemini Ultra 2.0",         prob: 0.55, change:  1.4 },
  { date: "Sep 09", company: "Apple",     product: "iPhone 18 + AR Glasses",   prob: 0.19, change: -0.7 },
  { date: "Oct 14", company: "Tesla",     product: "Robotaxi commercial pilot",prob: 0.44, change:  3.2 },
  { date: "Nov 21", company: "Nvidia",    product: "Rubin GB300 GA",           prob: 0.61, change:  0.9 },
];

export function TechStrip() {
  return (
    <div className="mt-10">
      <div className="mb-3 flex items-center gap-2">
        <Rocket className="h-4 w-4 text-muted-foreground" strokeWidth={1.75} />
        <h3 className="font-display text-[18px] font-semibold text-foreground">
          AI &amp; product release timeline
        </h3>
      </div>
      <div className="rounded-lg border border-border bg-surface-1 p-6">
        {/* Timeline rail */}
        <div className="relative">
          <div className="absolute left-0 right-0 top-3 h-px bg-border" />
          <div className="relative grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {LAUNCHES.map((l) => {
              const positive = l.change >= 0;
              return (
                <div key={l.date + l.company} className="relative flex flex-col items-start">
                  <div className="relative h-6">
                    <div className="absolute left-0 top-2 h-2.5 w-2.5 rounded-full border border-border bg-surface-2" />
                  </div>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    {l.date}
                  </div>
                  <div className="mt-1 text-[13px] font-medium text-foreground">
                    {l.company}
                  </div>
                  <div className="mt-0.5 line-clamp-2 text-[12px] text-muted-foreground">
                    {l.product}
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="font-mono text-[15px] font-semibold text-foreground">
                      {l.prob.toFixed(2)}
                    </span>
                    <span
                      className={
                        positive
                          ? "font-mono text-[11px] text-positive"
                          : "font-mono text-[11px] text-negative"
                      }
                    >
                      {positive ? "+" : ""}
                      {l.change.toFixed(1)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
