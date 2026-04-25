import { ArrowRight } from "lucide-react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  link?: { label: string; href: string };
  className?: string;
}

export const SectionHeader = ({ eyebrow, title, description, link, className = "" }: SectionHeaderProps) => (
  <div className={`mb-5 flex flex-wrap items-end justify-between gap-3 ${className}`}>
    <div>
      {eyebrow && (
        <div className="mono mb-1.5 text-[11px] uppercase tracking-wider text-info">{eyebrow}</div>
      )}
      <h2 className="text-[22px] font-semibold tracking-tight md:text-[26px]">{title}</h2>
      {description && (
        <p className="mt-1.5 max-w-[640px] text-[13px] text-muted-foreground">{description}</p>
      )}
    </div>
    {link && (
      <a
        href={link.href}
        className="group inline-flex items-center gap-1 text-[12px] font-medium text-info hover:text-[hsl(var(--info-hover))]"
      >
        {link.label}
        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
      </a>
    )}
  </div>
);