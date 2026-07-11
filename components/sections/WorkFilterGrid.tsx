"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { MediaSlot } from "@/components/media/MediaSlot";
import { caseStudies, disclosureLabel, isPortfolioEligible, serviceLabels } from "@/content/cases";
import type { ServicePillar } from "@/content/types";
import type { Language } from "@/lib/i18n";
import { withLanguage } from "@/lib/i18n";
export function WorkFilterGrid({
  language,
  mode
}: {
  language: Language;
  mode: "concept-models" | "portfolio";
}) {
  const [active, setActive] = useState<"all" | ServicePillar>("all"),
    reduced = useReducedMotion();
  const records = mode === "portfolio" ? caseStudies.filter(isPortfolioEligible) : caseStudies;
  const available = useMemo(
    () =>
      Object.keys(serviceLabels).filter((k) =>
        records.some((c) => c.servicePillars.includes(k as ServicePillar))
      ) as ServicePillar[],
    [records]
  );
  const shown = active === "all" ? records : records.filter((c) => c.servicePillars.includes(active));
  return (
    <>
      <div
        className="flex gap-2 overflow-x-auto pb-3"
        aria-label={language === "zh" ? "按服务筛选案例" : "Filter work by service"}
      >
        <Filter active={active === "all"} onClick={() => setActive("all")}>
          {language === "zh" ? "全部" : "All"}
        </Filter>
        {available.map((key) => (
          <Filter key={key} active={active === key} onClick={() => setActive(key)}>
            {serviceLabels[key][language]}
          </Filter>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {language === "zh" ? `显示 ${shown.length} 个项目模式` : `Showing ${shown.length} project models`}
      </p>
      {mode === "portfolio" && !records.length ? (
        <p className="mt-8 max-w-xl text-sm leading-6 text-slate">
          {language === "zh"
            ? "尚无符合公开作品集证据要求的项目。概念项目模式不会被混入作品集。"
            : "No work currently meets the public portfolio evidence requirement. Concept project models are not mixed into the portfolio."}
        </p>
      ) : null}
      <motion.div layout className="mt-8 grid gap-5 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((item) => (
            <motion.article
              layout
              key={item.slug}
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: 14 }}
              className="group overflow-hidden border border-ink/10 bg-pearl"
            >
              <MediaSlot
                id={item.heroMediaId}
                language={language}
                className="aspect-[16/11]"
                sizes="(min-width:1024px) 33vw,100vw"
                showCaption={false}
              />
              <div className="p-6">
                <p className="inline-flex border border-blue/30 px-2 py-1 text-[10px] font-semibold uppercase tracking-editorial text-blue">
                  {disclosureLabel(item.status, item.disclosureLevel, language)}
                </p>
                <p className="mt-5 text-xs uppercase tracking-editorial text-slate">
                  {item.servicePillars.map((p) => serviceLabels[p][language]).join(" · ")} ·{" "}
                  {item.industry[language]}
                </p>
                <h2 className="mt-4 text-3xl font-semibold">{item.title[language]}</h2>
                <p className="mt-5 text-sm leading-6 text-ink/70">{item.frameBridgeRole[language]}</p>
                <Link
                  href={withLanguage(`/work/${item.slug}`, language)}
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold focus-visible:ring-2 focus-visible:ring-blue"
                >
                  {language === "zh" ? "查看案例" : "View case"}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
function Filter({
  active,
  onClick,
  children
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium focus-visible:ring-2 focus-visible:ring-blue ${active ? "border-ink bg-ink text-pearl" : "border-ink/10 bg-white text-ink"}`}
    >
      {children}
    </button>
  );
}
