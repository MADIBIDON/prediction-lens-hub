import { MARKETS } from "@/data/mock";
import { MarketCard } from "./MarketCard";
import { SectionHeader } from "./SectionHeader";

export const TopMoving = () => {
  const sorted = [...MARKETS].sort((a, b) => Math.abs(b.change24h) - Math.abs(a.change24h)).slice(0, 8);
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-[1440px] px-4 py-12 md:px-6 md:py-16 lg:px-16 lg:py-20">
        <SectionHeader
          eyebrow="Top moving markets"
          title="Probability movement across categories"
          description="The eight markets with the largest absolute probability moves in the last 24 hours."
          link={{ label: "Open the full screener", href: "/markets" }}
        />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {sorted.map((m) => (
            <MarketCard key={m.id} market={m} />
          ))}
        </div>
      </div>
    </section>
  );
};