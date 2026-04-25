import { ArrowUpRight } from "lucide-react";
import { GUIDES } from "@/data/mock";
import { SectionHeader } from "./SectionHeader";

export const Guides = () => (
  <section className="border-b border-border">
    <div className="mx-auto max-w-[1440px] px-4 py-12 md:px-6 md:py-16 lg:px-16 lg:py-20">
      <SectionHeader
        eyebrow="Documentation"
        title="Understand prediction markets"
        description="A serious resource hub. Foundations, mechanics, risk, methodology and the workflow Oracle is built around."
        link={{ label: "Browse all guides", href: "/docs" }}
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {GUIDES.map((g) => (
          <a
            key={g.title}
            href="/docs"
            className="group flex h-full flex-col rounded-lg border border-border bg-[hsl(var(--surface-1))] p-4 transition-colors hover:border-hover hover:bg-[hsl(var(--surface-2))]"
          >
            <div className="mono mb-2 text-[10px] uppercase tracking-wider text-info">{g.topic}</div>
            <h3 className="text-[14px] font-semibold leading-snug text-foreground">{g.title}</h3>
            <p className="mt-1.5 flex-1 text-[12.5px] leading-relaxed text-muted-foreground">{g.desc}</p>
            <div className="mt-3 flex items-center gap-1 text-[11px] font-medium text-info opacity-80 transition-opacity group-hover:opacity-100">
              Read guide <ArrowUpRight className="h-3 w-3" />
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);