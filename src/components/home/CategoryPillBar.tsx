import { useEffect, useRef, useState } from "react";
import { CATEGORY_ANCHORS, CATEGORY_PILLS, type Pill } from "@/data/fixtures/markets";
import { cn } from "@/lib/utils";

export function CategoryPillBar() {
  const [active, setActive] = useState<Pill>("All");
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const obs = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { rootMargin: "-65px 0px 0px 0px", threshold: 0 },
    );
    obs.observe(sentinel);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const fromTop = window.scrollY + 200;
      let current: Pill = "All";
      for (const p of CATEGORY_PILLS) {
        const id = CATEGORY_ANCHORS[p];
        if (!id) continue;
        const el = document.getElementById(id);
        if (el && el.offsetTop <= fromTop) current = p;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onClick = (p: Pill) => {
    const id = CATEGORY_ANCHORS[p];
    const el = id ? document.getElementById(id) : null;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <>
      <div ref={sentinelRef} aria-hidden />
      <div
        className={cn(
          "sticky top-16 z-40 flex justify-center transition-all duration-150",
          stuck ? "py-3" : "py-4",
        )}
      >
        <nav
          className={cn(
            "flex max-w-[calc(100vw-32px)] items-center gap-1 overflow-x-auto rounded-full border border-border bg-surface-2/95 px-2 py-1 backdrop-blur-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          )}
        >
          {CATEGORY_PILLS.map((p) => {
            const isActive = active === p;
            return (
              <button
                key={p}
                onClick={() => onClick(p)}
                className={cn(
                  "h-8 shrink-0 rounded-full px-4 text-[13px] font-medium transition-colors duration-150",
                  isActive
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {p}
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
}
