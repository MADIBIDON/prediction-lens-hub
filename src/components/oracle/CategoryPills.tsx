import { useEffect, useState } from "react";
import { CATEGORY_PILLS } from "@/data/mock";

export const CategoryPills = () => {
  const [active, setActive] = useState<string>("all");

  useEffect(() => {
    const onScroll = () => {
      const fromTop = window.scrollY + 140;
      let current = "all";
      for (const p of CATEGORY_PILLS) {
        const el = document.getElementById(p.targetId);
        if (el && el.offsetTop <= fromTop) current = p.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onClick = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="sticky top-16 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-16">
        <div className="flex items-center gap-1 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {CATEGORY_PILLS.map((p) => {
            const isActive = active === p.id;
            return (
              <button
                key={p.id}
                onClick={() => onClick(p.targetId)}
                className={`shrink-0 rounded-md px-3 py-1.5 text-[12px] font-medium transition-colors ${
                  isActive
                    ? "bg-[hsl(var(--surface-2))] text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};