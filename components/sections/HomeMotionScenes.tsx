"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { MediaSlot } from "@/components/media/MediaSlot";
import { EditorialLink } from "@/components/ui/EditorialLink";
import { type MediaId } from "@/content/media";
import { featuredCaseStudies, isPortfolioEligible } from "@/content/cases";
import { withLanguage, type Language } from "@/lib/i18n";
import { durations, easings } from "@/lib/motion-system";
import type { PublicWorkMode } from "@/lib/release";

type Capability = Readonly<{
  name: string;
  label: string;
  problem: string;
  services: string;
  deliverables: string;
  href: string;
}>;
const capabilityMedia: MediaId[] = ["home-create", "home-connect", "home-activate", "home-localise"];

export function StickyCapabilities({
  items,
  language
}: {
  items: readonly Capability[];
  language: Language;
}) {
  const [active, setActive] = useState(0),
    [direction, setDirection] = useState(1),
    refs = useRef<(HTMLElement | null)[]>([]),
    reduced = useReducedMotion();
  const activate = useCallback((index: number) => {
    setActive((previous) => {
      setDirection(index >= previous ? 1 : -1);
      return index;
    });
  }, []);
  useEffect(() => {
    const observers = refs.current.map((node, index) => {
      if (!node) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) activate(index);
        },
        { rootMargin: "-32% 0px -42% 0px", threshold: 0.05 }
      );
      observer.observe(node);
      return observer;
    });
    return () => observers.forEach((x) => x?.disconnect());
  }, [activate]);
  const copy = (x: Capability, i: number) => (
    <>
      <span className="text-xs text-slate">0{i + 1}</span>
      <span>
        <span className="text-xs uppercase tracking-[.12em] text-champagne">{x.name}</span>
        <h3 className="mt-2 text-2xl font-medium">{x.label}</h3>
        <p className="body-large mt-5 max-w-xl">{x.problem}</p>
        <p className="mt-3 max-w-xl text-sm leading-6 text-ink/60">
          {x.services} {x.deliverables}
        </p>
        <EditorialLink href={withLanguage(x.href, language)} className="mt-5">
          {language === "zh" ? "查看服务" : "Explore service"}
        </EditorialLink>
      </span>
    </>
  );
  return (
    <div className="mt-14">
      <div className="hidden gap-12 lg:grid lg:grid-cols-[.9fr_1.1fr]">
        <div>
          {items.map((x, i) => (
            <article
              ref={(node) => {
                refs.current[i] = node;
              }}
              key={x.name}
              data-capability-step={i}
              data-active={active === i}
              tabIndex={0}
              onFocus={() => activate(i)}
              onClick={() => activate(i)}
              className="grid min-h-[56vh] grid-cols-[3rem_1fr] content-center border-t border-ink/15 transition-opacity duration-300 last:border-b"
              style={{ opacity: 1 }}
              aria-current={active === i ? "step" : undefined}
            >
              {copy(x, i)}
            </article>
          ))}
        </div>
        <div>
          <div
            className="sticky top-24 h-[calc(100vh-8rem)] max-h-[760px] overflow-hidden rounded-[18px] bg-ink"
            data-capability-active={active}
          >
            <AnimatePresence initial={false} mode="sync" custom={direction}>
              {
                <motion.div
                  key={capabilityMedia[active]}
                  custom={direction}
                  className="absolute inset-0"
                  initial={
                    reduced ? false : { clipPath: direction > 0 ? "inset(100% 0 0 0)" : "inset(0 0 100% 0)" }
                  }
                  animate={{ clipPath: "inset(0 0 0% 0)" }}
                  exit={
                    reduced
                      ? { opacity: 0 }
                      : { clipPath: direction > 0 ? "inset(0 0 100% 0)" : "inset(100% 0 0 0)" }
                  }
                  transition={{ duration: durations.route, ease: easings.curtain }}
                >
                  <MediaSlot
                    id={capabilityMedia[active]}
                    language={language}
                    showCaption={false}
                    reveal="curtain"
                    className="h-full"
                  />
                </motion.div>
              }
            </AnimatePresence>
            <div
              className="absolute bottom-0 left-0 h-px bg-champagne"
              style={{ width: `${((active + 1) / items.length) * 100}%` }}
            />
            <p className="absolute bottom-5 left-5 text-xs uppercase tracking-[.18em] text-pearl/65">
              0{active + 1} / 0{items.length}
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-14 lg:hidden">
        {items.map((x, i) => (
          <article key={x.name} className="border-t border-ink/15 pt-8">
            <div className="grid grid-cols-[3rem_1fr]">{copy(x, i)}</div>
            <MediaSlot
              id={capabilityMedia[i]}
              language={language}
              showCaption={false}
              className="mt-7 aspect-[4/3] rounded-[14px]"
            />
          </article>
        ))}
      </div>
    </div>
  );
}

export function ProjectPreview({
  language,
  mode
}: {
  language: Language;
  mode: Exclude<PublicWorkMode, "hidden">;
}) {
  const works = (
      mode === "portfolio" ? featuredCaseStudies.filter(isPortfolioEligible) : featuredCaseStudies
    ).slice(0, 3),
    [active, setActive] = useState(0),
    [direction, setDirection] = useState(1),
    reduced = useReducedMotion(),
    ids: MediaId[] = works.map((item) => item.heroMediaId);
  if (!works.length) return null;
  const activate = (i: number) => {
    setDirection(i >= active ? 1 : -1);
    setActive(i);
  };
  const list = (
    <div className="border-t border-ink/15">
      {works.map((x, i) => (
        <article
          key={x.slug}
          data-project-index={i}
          data-active={active === i}
          onMouseEnter={() => activate(i)}
          onFocusCapture={() => activate(i)}
          className="border-b border-ink/15 py-7 transition-opacity"
          data-cursor={language === "zh" ? "查看项目" : "View project"}
        >
          <EditorialLink href={withLanguage(`/work/${x.slug}`, language)} className="block w-full">
            <span className="text-xs text-slate">
              {mode === "portfolio"
                ? language === "zh"
                  ? "公开项目"
                  : "Published work"
                : language === "zh"
                  ? "制作场景"
                  : "Production scenario"}{" "}
              · {x.industry[language]}
            </span>
            <span
              className={`mt-2 flex items-center justify-between gap-4 text-xl font-medium transition-transform ${active === i ? "translate-x-1" : ""}`}
            >
              <span>{x.title[language]}</span>
              <span aria-hidden className="text-champagne">
                ↗
              </span>
            </span>
            <span
              className="mt-4 block h-px origin-left bg-champagne transition-transform"
              style={{ transform: `scaleX(${active === i ? 1 : 0})` }}
            />
          </EditorialLink>
        </article>
      ))}
    </div>
  );
  return (
    <div className="mt-9 lg:mt-12">
      <div className="hidden gap-10 lg:grid lg:grid-cols-[1.15fr_.85fr]">
        <div
          className="relative h-[64vh] overflow-hidden rounded-[18px] bg-ink"
          data-project-media={ids[active]}
        >
          <AnimatePresence initial={false} mode="sync" custom={direction}>
            <motion.div
              key={ids[active]}
              className="absolute inset-0"
              initial={
                reduced ? false : { clipPath: direction > 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)" }
              }
              animate={{ clipPath: "inset(0 0 0 0)" }}
              exit={
                reduced
                  ? { opacity: 0 }
                  : { clipPath: direction > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" }
              }
              transition={{ duration: durations.route, ease: easings.curtain }}
            >
              <MediaSlot
                id={ids[active]}
                language={language}
                showCaption={false}
                reveal="curtain"
                className="h-full"
              />
            </motion.div>
          </AnimatePresence>
          <p className="absolute bottom-5 left-5 text-xs text-pearl/65">0{active + 1} / 03</p>
        </div>
        {list}
      </div>
      <div className="grid gap-7 lg:hidden">
        {works.map((x, i) => (
          <article key={x.slug}>
            <MediaSlot
              id={ids[i]}
              language={language}
              showCaption={false}
              className="aspect-[16/10] rounded-[14px]"
            />
            <p className="mt-4 text-xs text-slate">
              {mode === "portfolio"
                ? language === "zh"
                  ? "公开项目"
                  : "Published work"
                : language === "zh"
                  ? "制作场景"
                  : "Production scenario"}{" "}
              · {x.industry[language]}
            </p>
            <EditorialLink href={withLanguage(`/work/${x.slug}`, language)} className="mt-2 text-xl">
              {x.title[language]}
            </EditorialLink>
          </article>
        ))}
      </div>
    </div>
  );
}
