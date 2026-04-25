import type { Market } from "@/data/mock";
import { fmtMoney, fmtDate, fmtProb } from "@/data/mock";
import { CategoryChip, PlatformChip } from "./CategoryChip";
import { Sparkline } from "./Sparkline";
import { Delta } from "./Delta";

interface MarketCardProps {
  market: Market;
}

export const MarketCard = ({ market: m }: MarketCardProps) => {
  const positive = m.change24h >= 0;
  return (
    <div className="group flex flex-col rounded-lg border border-border bg-[hsl(var(--surface-1))] p-4 transition-colors hover:border-hover hover:bg-[hsl(var(--surface-2))]">
      <div className="mb-3 flex items-center gap-1.5">
        <CategoryChip category={m.category} />
        <PlatformChip platform={m.platform} />
      </div>
      <h3 className="line-clamp-2 min-h-[40px] text-[14px] font-medium leading-snug text-foreground">
        {m.title}
      </h3>
      <div className="mt-3 flex items-end justify-between">
        <div>
          <div className="mono text-2xl font-semibold tracking-tight">{fmtProb(m.probability)}</div>
          <Delta value={m.change24h} size="sm" />
        </div>
        <Sparkline
          data={m.spark}
          width={92}
          height={32}
          color={positive ? "positive" : "negative"}
        />
      </div>
      <div className="mono mt-4 grid grid-cols-3 gap-2 border-t border-border pt-3 text-[10px] uppercase tracking-wider text-subtle">
        <div>
          <div className="text-subtle">Vol 24h</div>
          <div className="mt-0.5 text-foreground normal-case tracking-normal">{fmtMoney(m.volume24h)}</div>
        </div>
        <div>
          <div className="text-subtle">Liq</div>
          <div className="mt-0.5 text-foreground normal-case tracking-normal">{fmtMoney(m.liquidity)}</div>
        </div>
        <div className="text-right">
          <div className="text-subtle">Closes</div>
          <div className="mt-0.5 text-foreground normal-case tracking-normal">{fmtDate(m.closeDate)}</div>
        </div>
      </div>
    </div>
  );
};