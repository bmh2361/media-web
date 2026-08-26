"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { PortfolioImage } from "@/components/media/PortfolioImage";
import {
  commercialCaseCategories,
  commercialCaseFilters,
  getProjectCover,
  type CommercialCaseCategory,
  type PortfolioProject
} from "@/content/portfolio";
import type { Language } from "@/lib/i18n";
import { withLanguage } from "@/lib/i18n";

export type CommercialCaseFilter = "all" | CommercialCaseCategory;
const permittedFilters = new Set<CommercialCaseFilter>(commercialCaseFilters.map((filter) => filter.value));
export const isCommercialCaseFilter = (value?: string): value is CommercialCaseFilter => Boolean(value && permittedFilters.has(value as CommercialCaseFilter));
const editorialEase = [0.22, 1, 0.36, 1] as const;

export function CommercialCaseIndex({ cases, language, mode = "archive", initialCategory = "all", showFilters = mode === "archive" }: { cases: PortfolioProject[]; language: Language; mode?: "homepage" | "archive"; initialCategory?: CommercialCaseFilter; showFilters?: boolean }) {
  const zh = language === "zh";
  const reducedMotion = useReducedMotion();
  const [category, setCategory] = useState<CommercialCaseFilter>(initialCategory);
  const [activeSlug, setActiveSlug] = useState(cases[0]?.slug ?? "");
  const [mobileActiveSlug, setMobileActiveSlug] = useState<string | null>(cases[0]?.slug ?? null);
  const mobileListRef = useRef<HTMLDivElement>(null);
  const filteredCases = useMemo(() => category === "all" ? cases : cases.filter((item) => item.category === category), [cases, category]);
  const activeCase = filteredCases.find((item) => item.slug === activeSlug) ?? filteredCases[0] ?? null;
  const initialCover = getProjectCover(cases[0]);

  const chooseCategory = (value: CommercialCaseFilter) => {
    const nextCases = value === "all" ? cases : cases.filter((item) => item.category === value);
    setCategory(value);
    setActiveSlug(nextCases[0]?.slug ?? "");
    setMobileActiveSlug(nextCases[0]?.slug ?? null);
  };

  useEffect(() => {
    if (!window.matchMedia("(max-width: 1199px)").matches) return;
    const rows = Array.from(mobileListRef.current?.querySelectorAll<HTMLElement>("[data-mobile-case-row]") ?? []);
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const slug = (current?.target as HTMLElement | undefined)?.dataset.mobileCaseRow;
        if (slug) setMobileActiveSlug(slug);
      },
      { rootMargin: "-32% 0px -42% 0px", threshold: [0, 0.18, 0.42] }
    );
    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, [filteredCases]);

  return (
    <div data-case-index={mode}>
      {initialCover ? <link rel="preload" as="image" href={initialCover.mobilePath ?? initialCover.publicPath} /> : null}
      {showFilters ? (
        <div className="flex gap-2 overflow-x-auto border-y border-ink/15 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label={zh ? "案例分类" : "Case categories"} data-case-filters>
          {commercialCaseFilters.map((filter) => (
            <button key={filter.value} type="button" data-case-filter={filter.value} aria-pressed={category === filter.value} onClick={() => chooseCategory(filter.value)} className="min-h-11 shrink-0 rounded-full border border-ink/20 px-4 py-2 text-xs uppercase tracking-[0.12em] text-ink/65 transition-colors hover:border-ink/50 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-pearl">
              {filter.label[language]}
            </button>
          ))}
        </div>
      ) : null}

      {filteredCases.length ? (
        <>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,54fr)_minmax(0,46fr)] lg:items-start">
            <div className="hidden lg:block">
              {filteredCases.map((project, index) => <ProjectRow key={project.slug} project={project} index={index} active={project.slug === activeCase?.slug} language={language} onActivate={() => setActiveSlug(project.slug)} />)}
            </div>
            <div className="hidden lg:block" data-case-preview>
              <div className="sticky top-28 text-ink">
                <AnimatePresence initial={false} mode="wait">
                  {activeCase ? (
                    <motion.article key={activeCase.slug} initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.22, ease: editorialEase }}>
                      <PreviewVisual project={activeCase} language={language} />
                      <PreviewCopy project={activeCase} language={language} />
                    </motion.article>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div ref={mobileListRef} className="divide-y divide-ink/15 lg:hidden" data-mobile-case-list>
            {filteredCases.map((project, index) => (
              <MobileProjectRow key={project.slug} project={project} index={index} language={language} expanded={mobileActiveSlug === project.slug} reducedMotion={Boolean(reducedMotion)} onActivate={() => setMobileActiveSlug(project.slug)} />
            ))}
          </div>
        </>
      ) : (
        <div className="border-b border-ink/15 py-16" data-case-empty={category}>
          <p className="max-w-[48ch] text-lg leading-8 text-ink/65">{category === "institutional-talent" ? (zh ? "机构与人才项目只有在证据和公开许可核验完成后才会发布。" : "Institutional and talent records will not appear as public cases until verified and publication-approved.") : (zh ? "该分类暂时没有已核验并获准公开的案例。" : "No verified, publication-approved cases are available in this category yet.")}</p>
        </div>
      )}
    </div>
  );
}

function ProjectRow({ project, index, active, language, onActivate }: { project: PortfolioProject; index: number; active: boolean; language: Language; onActivate: () => void }) {
  const zh = language === "zh";
  return (
    <div data-case-row={project.slug} data-active-case={active || undefined} className={`group grid min-h-[128px] grid-cols-[minmax(0,1fr)_2rem] items-center gap-x-4 border-b py-6 transition-colors ${active ? "border-champagne/55 bg-champagne/[0.045] text-champagne" : "border-ink/15 text-ink hover:text-champagne"}`} onMouseEnter={() => { if (!(document.activeElement instanceof HTMLElement) || !document.activeElement.closest("[data-case-row]")) onActivate(); }}>
      <button type="button" onClick={onActivate} onFocus={onActivate} className="grid self-stretch grid-cols-[3rem_minmax(0,1.6fr)_minmax(8rem,.68fr)_minmax(7rem,.55fr)] items-center gap-x-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne" aria-pressed={active} aria-label={`${zh ? project.titleZh : project.titleEn}, ${commercialCaseCategories[project.category][language]}`}>
        <span className="text-xs tabular-nums text-ink/70">{String(index + 1).padStart(2, "0")}</span>
        <span className="text-[clamp(1.25rem,1.7vw,1.75rem)] font-medium leading-[1.12]">{zh ? project.titleZh : project.titleEn}</span>
        <span className="text-[11px] uppercase tracking-editorial text-ink/65">{commercialCaseCategories[project.category][language]}</span>
        <span className="text-sm leading-5 text-ink/70">{[project.location, project.year].filter(Boolean).join(" · ")}</span>
      </button>
      <Link href={withLanguage(`/work/${project.slug}`, language)} className="flex size-10 items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-champagne" aria-label={zh ? `打开${project.titleZh}` : `Open ${project.titleEn}`}>↗</Link>
    </div>
  );
}

function PreviewVisual({ project, language }: { project: PortfolioProject; language: Language }) {
  const primary = getProjectCover(project);
  if (!primary) return <div className="flex min-h-72 items-end border-y border-ink/15 py-8 text-sm text-ink/65">{language === "zh" ? "公开视觉证据正在核验。" : "Public visual evidence is under review."}</div>;
  const portrait = primary.height > primary.width;
  return (
    <div className={portrait ? "flex justify-start" : "w-full"} data-preview-media-stage data-preview-layout={portrait ? "portrait" : "landscape"} data-preview-image-count="1">
      <PortfolioImage media={primary} language={language} className={portrait ? "max-h-[68vh] w-[72%] max-w-[430px] lg:w-[68%]" : "max-h-[68vh] w-full"} sizes={portrait ? "(min-width:1024px) 32vw, 72vw" : "(min-width:1280px) 46vw, (min-width:1024px) 44vw, 100vw"} fit="natural" mediaRole="editorial-natural" />
    </div>
  );
}

function PreviewCopy({ project, language }: { project: PortfolioProject; language: Language }) {
  const zh = language === "zh";
  const series = project.contentType === "portfolio-series";
  return (
    <div className="grid gap-5 border-t border-ink/15 py-6 xl:grid-cols-[1fr_1.25fr]">
      <div><p className="text-[11px] uppercase tracking-editorial text-champagne">{series ? (zh ? "能力证据" : "Capability evidence") : commercialCaseCategories[project.category][language]}</p><h2 className="mt-3 text-2xl font-medium leading-tight">{zh ? project.titleZh : project.titleEn}</h2><p className="mt-3 text-xs text-ink/65">{[project.location, project.year].filter(Boolean).join(" · ")}</p></div>
      <div className="border-l border-ink/15 pl-5"><p className="text-[11px] uppercase tracking-editorial text-ink/65">{zh ? "Venus Bridge 职责" : "Venus Bridge role"}</p><p className="mt-3 text-sm leading-6 text-ink/68">{zh ? project.roleStatementZh : project.roleStatementEn}</p></div>
    </div>
  );
}

function MobileProjectRow({ project, index, language, expanded, reducedMotion, onActivate }: { project: PortfolioProject; index: number; language: Language; expanded: boolean; reducedMotion: boolean; onActivate: () => void }) {
  const zh = language === "zh";
  return (
    <article data-mobile-case-row={project.slug}>
      <button type="button" data-expanded={expanded || undefined} className="grid w-full grid-cols-[2.25rem_1fr_auto] gap-x-4 py-7 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne" onClick={onActivate} onFocus={onActivate} aria-expanded={expanded} aria-controls={`mobile-case-${project.slug}`}>
        <span className="pt-1 text-xs tabular-nums text-ink/70">{String(index + 1).padStart(2, "0")}</span>
        <span><span className="block text-[11px] uppercase tracking-editorial text-ink/70">{project.contentType === "portfolio-series" ? (zh ? "能力证据" : "Capability evidence") : commercialCaseCategories[project.category][language]}</span><span className="mt-2 block text-[clamp(1.45rem,6vw,2rem)] font-medium leading-[1.08]">{zh ? project.titleZh : project.titleEn}</span><span className="mt-3 block text-sm text-ink/70">{[project.location, project.year].filter(Boolean).join(" · ")}</span></span>
        <span aria-hidden className="mt-2 block h-px w-5 origin-left bg-champagne transition-transform duration-300" style={{ transform: `scaleX(${expanded ? 1 : 0.28})` }} />
      </button>
      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div id={`mobile-case-${project.slug}`} className="overflow-hidden pb-8" initial={reducedMotion ? false : { height: 0, opacity: 0, clipPath: "inset(0 0 100% 0)" }} animate={{ height: "auto", opacity: 1, clipPath: "inset(0)" }} exit={reducedMotion ? { opacity: 0 } : { height: 0, opacity: 0, clipPath: "inset(0 0 100% 0)" }} transition={{ duration: reducedMotion ? 0 : 0.56, ease: editorialEase }}>
            <div className="bg-porcelain/60 px-4 py-4 text-ink" data-mobile-case-cover={project.slug}>
              <PreviewVisual project={project} language={language} />
              <div className="border-t border-ink/15 py-5">
                <p className="text-[11px] uppercase tracking-editorial text-ink/65">{zh ? "Venus Bridge 职责" : "Venus Bridge role"}</p>
                <p className="mt-3 text-sm leading-6 text-ink/68">{zh ? project.roleStatementZh : project.roleStatementEn}</p>
              </div>
              <Link href={withLanguage(`/work/${project.slug}`, language)} className="mb-2 inline-flex min-h-11 items-center border-b border-champagne text-xs uppercase tracking-editorial text-champagne">{zh ? "查看完整案例" : "View full case"} ↗</Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}
