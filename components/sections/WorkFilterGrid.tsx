"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
import { caseHeroMediaBySlug } from "@/content/media";
import type { workPage } from "@/content/site";
import type { Language } from "@/lib/i18n";
import { withLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type WorkCopy = (typeof workPage)["en"];

export function WorkFilterGrid({
  language,
  copy
}: {
  language: Language;
  copy: WorkCopy;
}) {
  const [activeFilter, setActiveFilter] = useState(copy.filters[0]);
  const prefersReducedMotion = useReducedMotion();
  const allLabel = copy.filters[0];

  const cases = useMemo(() => {
    if (activeFilter === allLabel) {
      return copy.cases;
    }

    return copy.cases.filter((item) => item.filters.includes(activeFilter));
  }, [activeFilter, allLabel, copy.cases]);

  return (
    <>
      <div className="flex gap-2 overflow-x-auto pb-3">
        {copy.filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition",
              activeFilter === filter
                ? "border-ink bg-ink text-pearl"
                : "border-ink/10 bg-white/70 text-ink/64 hover:border-blue hover:text-ink"
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-8 grid gap-5 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {cases.map((item, index) => (
            <motion.article
              layout
              key={item.slug}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.35, delay: prefersReducedMotion ? 0 : index * 0.03 }}
              className="group overflow-hidden rounded-lg border border-ink/10 bg-pearl shadow-soft transition duration-500 hover:-translate-y-1 hover:shadow-cinematic focus-within:shadow-cinematic"
            >
              <div className="relative aspect-[16/11] overflow-hidden">
                <MediaPlaceholder
                  id={caseHeroMediaBySlug[item.slug] ?? "case-supporting-1"}
                  language={language}
                  className="absolute inset-0 rounded-none"
                  captionClassName="bottom-auto top-4 border-b border-t-0 pb-3 pt-0"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
                <div className="absolute inset-0 bg-ink/0 transition duration-500 group-hover:bg-ink/24" />
                <div className="absolute bottom-4 left-4 right-4 translate-y-2 border-t border-pearl/0 pt-3 text-sm font-semibold text-pearl opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:border-pearl/24 group-hover:opacity-100">
                  {copy.labels.viewCase}
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-editorial text-slate">{item.industry}</p>
                <h2 className="mt-5 text-3xl font-semibold leading-tight text-ink">{item.title}</h2>
                <div className="mt-6 grid gap-5 text-sm leading-6 text-ink/64">
                  <p>
                    <span className="block font-semibold text-ink">{copy.labels.challenge}</span>
                    {item.challenge}
                  </p>
                  <p>
                    <span className="block font-semibold text-ink">{copy.labels.delivered}</span>
                    {item.delivered}
                  </p>
                </div>
                <Link
                  href={withLanguage(`/work/${item.slug}`, language)}
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-ink transition hover:text-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-blue/45"
                >
                  {copy.labels.viewCase}
                  <ArrowRight size={16} className="transition duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
