"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { MediaSlot } from "@/components/media/MediaSlot";
import { EditorialLink } from "@/components/ui/EditorialLink";
import { serviceMediaSequence } from "@/content/media";
import { servicesContent } from "@/content/pages/services";
import { withLanguage, type Language } from "@/lib/i18n";
import { durations, easings, viewport } from "@/lib/motion-system";

export function ServicesMotionList({
  language,
  showMarketEntry
}: {
  language: Language;
  showMarketEntry: boolean;
}) {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const core = servicesContent.pillars.slice(0, 4);
  const marketEntry = servicesContent.pillars[4];
  const specialist = servicesContent.pillars[5];

  return (
    <div>
      <div className="grid gap-10 lg:grid-cols-[1fr_.72fr]">
        <div className="border-t border-ink/15">
          {core.map((pillar, index) => (
            <motion.article
              key={pillar.key}
              onMouseEnter={() => setActive(index)}
              onFocusCapture={() => setActive(index)}
              initial={reduced ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewport}
              transition={{ duration: durations.fast, ease: easings.editorial }}
              className={`grid gap-5 border-b border-ink/15 py-9 ${active === index ? "opacity-100" : "opacity-65"}`}
            >
              <div className="flex items-baseline gap-5">
                <span className="text-xs text-champagne">0{index + 1}</span>
                <h2 className="text-3xl font-medium">{pillar.title[language]}</h2>
              </div>
              <p className="max-w-xl text-base leading-7 text-ink/65">{pillar.result[language]}</p>
              <div className="grid gap-5 sm:grid-cols-2">
                <p className="text-sm leading-6">{pillar.capabilities[language]}</p>
                <p className="text-sm leading-6 text-ink/65">{pillar.deliverables[language]}</p>
              </div>
              <EditorialLink href={withLanguage(pillar.href, language)} className="min-h-11">
                {language === "zh" ? "查看详情" : "View service"}
              </EditorialLink>
            </motion.article>
          ))}
        </div>
        <div className="hidden lg:block">
          <div className="sticky top-28">
            <MediaSlot
              key={active}
              id={serviceMediaSequence[active]}
              language={language}
              showCaption={false}
              reveal="curtain"
              className="aspect-[4/5] rounded-[18px]"
            />
          </div>
        </div>
      </div>

      <div className="mt-14 grid gap-4 lg:grid-cols-2">
        {showMarketEntry ? (
          <aside className="grid gap-6 border-l-4 border-champagne bg-ink p-7 text-pearl">
            <div>
              <p className="text-xs uppercase tracking-editorial text-champagne">
                {language === "zh" ? "市场进入协同" : "Market-entry coordination"}
              </p>
              <h2 className="mt-3 text-2xl font-medium">{marketEntry.title[language]}</h2>
            </div>
            <p className="text-base leading-7 text-pearl/65">{marketEntry.result[language]}</p>
            <EditorialLink href={withLanguage(marketEntry.href, language)} className="min-h-11 text-pearl">
              {language === "zh" ? "查看协同范围" : "View coordination scope"}
            </EditorialLink>
          </aside>
        ) : null}
        <aside className="grid gap-6 border-l-4 border-champagne bg-mist p-7">
          <div>
            <p className="text-xs uppercase tracking-editorial text-champagne">
              {language === "zh" ? "次级专业能力" : "Secondary specialist route"}
            </p>
            <h2 className="mt-3 text-2xl font-medium">{specialist.title[language]}</h2>
          </div>
          <p className="text-base leading-7 text-ink/65">{specialist.result[language]}</p>
          <EditorialLink href={withLanguage(specialist.href, language)} className="min-h-11">
            {language === "zh" ? "了解专业项目" : "Explore specialist projects"}
          </EditorialLink>
        </aside>
      </div>
    </div>
  );
}
