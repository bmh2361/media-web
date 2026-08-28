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
import type { PublicWorkMode } from "@/lib/release";
export function WorkFilterGrid({
  language,
  mode
}: {
  language: Language;
  mode: Exclude<PublicWorkMode, "hidden">;
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
        className="flex flex-wrap gap-2 pb-3"
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
            ? "尚无满足证据、媒体、使用权与客户许可要求的公开项目。"
            : "No work currently meets the public portfolio evidence requirement. Concept project models are not mixed into the portfolio."}
        </p>
      ) : null}
      <motion.div layout className="mt-10 grid gap-x-5 gap-y-12 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((item, index) => (
            <motion.article
              layout
              key={item.slug}
              initial={reduced ? false : { y: 14 }}
              animate={{ y: 0 }}
              exit={reduced ? undefined : { y: 14 }}
              className={`group ${index === 0 ? "lg:col-span-2" : ""}`}
            >
              <MediaSlot
                id={item.heroMediaId}
                language={language}
                className={index === 0 ? "aspect-[16/9] rounded-[18px]" : "aspect-[4/3] rounded-[18px]"}
                sizes={index === 0 ? "(min-width:1024px) 66vw,100vw" : "(min-width:1024px) 33vw,100vw"}
                showCaption={false}
              />
              <div className="pt-5">
                <p className="inline-flex border-b border-ink/30 pb-1 text-xs font-medium text-slate">
                  {disclosureLabel(item.status, item.disclosureLevel, language)}
                </p>
                <p className="mt-5 text-xs uppercase tracking-editorial text-slate">
                  {item.servicePillars.map((p) => serviceLabels[p][language]).join(" · ")} ·{" "}
                  {item.industry[language]}
                </p>
                <h2 className={`${index === 0 ? "text-4xl" : "text-2xl"} mt-3 max-w-2xl font-medium`}>
                  {item.title[language]}
                </h2>
                {index < 3 ? (
                  <p className="mt-4 max-w-2xl text-base leading-7 text-ink/65">
                    {item.frameBridgeRole[language]}
                  </p>
                ) : null}
                <Link
                  href={withLanguage(`/work/${item.slug}`, language)}
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold focus-visible:ring-2 focus-visible:ring-blue"
                >
                  {mode === "portfolio"
                    ? language === "zh"
                      ? "查看案例"
                      : "View case study"
                    : language === "zh"
                      ? "查看制作场景"
                      : "View production scenario"}
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
      className={`min-h-11 border-b px-3 py-2 text-sm font-medium ${active ? "border-ink text-ink" : "border-transparent text-ink/70 hover:text-ink"}`}
    >
      {children}
    </button>
  );
}
