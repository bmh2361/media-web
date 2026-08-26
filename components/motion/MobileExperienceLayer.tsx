"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Language } from "@/lib/i18n";

type SectionMarker = { id: string; label: string };

export function MobileExperienceLayer({ language }: { language: Language }) {
  const pathname = usePathname();
  const [sections, setSections] = useState<SectionMarker[]>([]);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [contextVisible, setContextVisible] = useState(false);
  const contextTimer = useRef<number | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1199px)");
    if (!media.matches) return;

    document.body.dataset.mobileExperience = "ready";
    const sectionNodes = Array.from(
      document.querySelectorAll<HTMLElement>(
        "#main-content > section, #main-content > [data-case-archetype] > section, #main-content > [data-case-archetype] > div > section"
      )
    );
    const markers = sectionNodes.map((section, index) => {
      const heading = section.querySelector<HTMLElement>("h1, h2");
      const id = section.id || `mobile-section-${index + 1}`;
      section.id = id;
      section.dataset.mobileMotionSection = "true";
      if (index === 0) section.dataset.mobileHero = "true";
      if (index > 0 && index % 3 === 0) section.dataset.mobileChapterRule = "true";
      return {
        id,
        label: heading?.innerText.trim() || `${language === "zh" ? "章节" : "Section"} ${index + 1}`
      };
    });
    setSections(markers);
    setActive(0);

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const current = entries.find((entry) => entry.isIntersecting);
        if (!current) return;
        current.target.setAttribute("data-mobile-entered", "true");
        const index = sectionNodes.indexOf(current.target as HTMLElement);
        if (index >= 0) setActive(index);
      },
      { rootMargin: "-32% 0px -54% 0px", threshold: 0 }
    );

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-mobile-entered", "true");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );

    sectionNodes.forEach((section) => sectionObserver.observe(section));
    const observeReveals = () => {
      document.querySelectorAll<HTMLElement>("[data-mobile-reveal]:not([data-mobile-entered])").forEach((node) => revealObserver.observe(node));
    };
    const activateVisibleReveals = () => {
      document.querySelectorAll<HTMLElement>("[data-mobile-reveal]:not([data-mobile-entered])").forEach((node) => {
        const rect = node.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) node.dataset.mobileEntered = "true";
      });
    };
    observeReveals();
    activateVisibleReveals();
    const revealTimer = window.setTimeout(() => {
      observeReveals();
      activateVisibleReveals();
    }, 450);
    const updateVisibility = () => {
      setVisible(window.scrollY > 120);
      activateVisibleReveals();
    };
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => {
      sectionObserver.disconnect();
      revealObserver.disconnect();
      window.clearTimeout(revealTimer);
      window.removeEventListener("scroll", updateVisibility);
      delete document.body.dataset.mobileExperience;
    };
  }, [language, pathname]);

  useEffect(() => {
    if (!visible) return;
    setContextVisible(true);
    if (contextTimer.current !== null) window.clearTimeout(contextTimer.current);
    contextTimer.current = window.setTimeout(() => setContextVisible(false), 800);
    return () => {
      if (contextTimer.current !== null) window.clearTimeout(contextTimer.current);
    };
  }, [active, visible]);

  if (sections.length < 2) return null;

  return (
    <nav
      className="mobile-progress-navigation"
      aria-label={language === "zh" ? "页面章节进度" : "Page section progress"}
      data-visible={visible}
      data-context-visible={contextVisible || undefined}
    >
      <span className="mobile-progress-context" aria-hidden="true">
        <span className="mobile-progress-count">
          {String(active + 1).padStart(2, "0")} / {String(sections.length).padStart(2, "0")}
        </span>
      </span>
      <span className="mobile-progress-track" aria-hidden="true">
        <span
          style={{
            height: `${100 / sections.length}%`,
            transform: `translateY(${active * 100}%)`
          }}
        />
      </span>
      <span className="mobile-progress-markers">
        {sections.map((section, index) => (
          <button
            key={section.id}
            type="button"
            aria-label={`${language === "zh" ? "前往" : "Go to"} ${section.label}`}
            aria-current={index === active ? "step" : undefined}
            onClick={() => document.getElementById(section.id)?.scrollIntoView({
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
            })}
          >
            <span />
          </button>
        ))}
      </span>
    </nav>
  );
}
