"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function EditorialMotionLayer() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-editorial-reveal]"));
    document.body.dataset.editorialMotion = reduced.matches ? "reduced" : "ready";

    if (reduced.matches || typeof IntersectionObserver === "undefined") {
      targets.forEach((target) => target.setAttribute("data-editorial-entered", "true"));
      return () => {
        delete document.body.dataset.editorialMotion;
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-editorial-entered", "true");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );

    targets.forEach((target) => {
      const rect = target.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
        target.setAttribute("data-editorial-entered", "true");
      } else {
        observer.observe(target);
      }
    });

    return () => {
      observer.disconnect();
      delete document.body.dataset.editorialMotion;
    };
  }, [pathname]);

  return null;
}
