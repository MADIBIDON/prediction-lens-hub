import type { Category } from "@/data/mock";

interface CategoryChipProps {
  category: Category | string;
  className?: string;
}

export const CategoryChip = ({ category, className = "" }: CategoryChipProps) => (
  <span
    className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground ring-1 ring-inset ring-border ${className}`}
  >
    {category}
  </span>
);

interface PlatformChipProps {
  platform: string;
  className?: string;
}

export const PlatformChip = ({ platform, className = "" }: PlatformChipProps) => (
  <span
    className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground ring-1 ring-inset ring-border ${className}`}
  >
    {platform}
  </span>
);