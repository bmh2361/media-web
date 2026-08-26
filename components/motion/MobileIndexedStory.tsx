"use client";

import { useEffect, useRef, useState } from "react";

export type MobileStoryItem = { title: string; description: string };

export function MobileIndexedStory({
  items,
  label,
  dark = false,
  compact = false,
  scrollLinked = false,
  emphasis = "standard",
  contextLabel
}: {
  items: MobileStoryItem[];
  label: string;
  dark?: boolean;
  compact?: boolean;
  scrollLinked?: boolean;
  emphasis?: "standard" | "strong";
  contextLabel?: string;
}) {
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const steps = Array.from(rootRef.current?.querySelectorAll<HTMLElement>('[role="listitem"]') ?? []);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries.find((entry) => entry.isIntersecting);
        if (!current) return;
        const index = steps.indexOf(current.target as HTMLElement);
        if (index >= 0) {
          setActive(index);
          if (scrollLinked && reducedMotion) {
            rootRef.current?.style.setProperty("--story-progress", String((index + 1) / steps.length));
          }
        }
      },
      { rootMargin: "-38% 0px -45% 0px", threshold: 0 }
    );
    steps.forEach((step) => observer.observe(step));

    const updateProgress = () => {
      const root = rootRef.current;
      if (!root || !scrollLinked) return;
      const rect = root.getBoundingClientRect();
      const start = window.innerHeight * 0.64;
      const distance = Math.max(root.offsetHeight - window.innerHeight * 0.42, 1);
      const progress = Math.min(1, Math.max(0, (start - rect.top) / distance));
      root.style.setProperty("--story-progress", String(progress));

      const readingLine = window.innerHeight * 0.46;
      let nearest = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;
      steps.forEach((step, index) => {
        const stepRect = step.getBoundingClientRect();
        const distanceFromLine = Math.abs(stepRect.top + stepRect.height / 2 - readingLine);
        if (distanceFromLine < nearestDistance) {
          nearest = index;
          nearestDistance = distanceFromLine;
        }
      });
      setActive((current) => current === nearest ? current : nearest);
    };

    if (scrollLinked && !reducedMotion) {
      updateProgress();
      window.addEventListener("scroll", updateProgress, { passive: true });
      window.addEventListener("resize", updateProgress);
    }
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [scrollLinked]);

  return (
    <div
      ref={rootRef}
      className="mobile-indexed-story"
      data-tone={dark ? "dark" : "light"}
      data-compact={compact || undefined}
      data-scroll-linked={scrollLinked || undefined}
      data-emphasis={emphasis}
    >
      <div className="mobile-indexed-story__status">
        {emphasis === "strong" ? <span className="mobile-indexed-story__context">{contextLabel ?? label}</span> : null}
        <span className="mobile-indexed-story__count">{String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
        <span className="mobile-indexed-story__title" aria-live="polite">{items[active]?.title}</span>
        <span className="mobile-indexed-story__progress" aria-hidden="true">
          <span style={scrollLinked ? undefined : { transform: `scaleX(${(active + 1) / items.length})` }} />
        </span>
      </div>
      {emphasis === "strong" ? <span className="mobile-indexed-story__rail" aria-hidden="true"><span /></span> : null}
      <div role="list" aria-label={label}>
        {items.map((item, index) => (
          <div
            role="listitem"
            key={item.title}
            data-active={active === index}
            data-state={index < active ? "previous" : index === active ? "current" : "future"}
            aria-current={active === index ? "step" : undefined}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
