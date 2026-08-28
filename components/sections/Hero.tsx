"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useOpeningSequence } from "@/components/motion/OpeningSequenceProvider";
import { ProductionSystemCanvas } from "@/components/sections/ProductionSystemCanvas";
import { ButtonLink } from "@/components/ui/Button";
import { homeContent } from "@/content/pages/home";
import { venusBridgeMedia } from "@/lib/brand/venusBridgeMedia";
import { withLanguage, type Language } from "@/lib/i18n";
import { distances, durations, easings } from "@/lib/motion-system";

export function Hero({ language }: { language: Language }) {
  const copy = homeContent[language];
  const reduced = useReducedMotion();
  const { heroReady, firstVisit } = useOpeningSequence();
  const ready = reduced || heroReady;
  const base = firstVisit ? 0.08 : 0;
  const zh = language === "zh";

  return (
    <section className="relative overflow-hidden bg-ink pt-[72px] text-pearl lg:pt-20">
      <div className="media-grain pointer-events-none absolute inset-0 opacity-[.045]" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-[72px] h-px bg-gradient-to-r from-transparent via-champagne/30 to-transparent lg:top-20" />
      <div className="container-x grid gap-12 py-12 lg:min-h-[min(900px,calc(100svh-5rem))] lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-14 xl:gap-14">
        <div className="relative z-10 min-w-0 lg:col-span-6 xl:pr-4">
          <motion.p
            className="eyebrow text-champagne"
            initial={reduced ? false : { opacity: 0, y: distances.small }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: distances.small }}
            transition={{ delay: base, duration: durations.fast, ease: easings.editorial }}
          >
            {copy.eyebrow}
          </motion.p>

          <h1
            className={`mt-6 text-balance font-medium ${
              zh
                ? "max-w-[16ch] text-[clamp(2.4rem,4.4vw,3.9rem)] leading-[1.13] tracking-normal"
                : "max-w-[20ch] text-[clamp(2.75rem,4.1vw,3.95rem)] leading-[.99] tracking-[-.04em]"
            }`}
          >
            <span className="block">{copy.title}</span>
          </h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: distances.small }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: distances.small }}
            transition={{ delay: base + 0.22, duration: durations.fast, ease: easings.editorial }}
            className="text-pearl/68 mt-7 max-w-[37rem] text-base leading-7 sm:text-lg sm:leading-8"
          >
            {copy.intro}
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: distances.small }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: distances.small }}
            transition={{ delay: base + 0.3, duration: durations.fast, ease: easings.editorial }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <ButtonLink
              href={withLanguage("/contact?brief=fit-call", language)}
              showArrow
              className="w-full bg-champagne text-ink hover:bg-pearl sm:w-auto"
            >
              {copy.primary}
            </ButtonLink>
            <ButtonLink
              href={withLanguage("/what-we-do", language)}
              variant="secondary"
              className="w-full border-pearl/25 bg-transparent text-pearl hover:border-champagne hover:bg-pearl/5 sm:w-auto"
            >
              {copy.secondary}
            </ButtonLink>
          </motion.div>

          <motion.p
            initial={reduced ? false : { opacity: 0 }}
            animate={ready ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: base + 0.42, duration: durations.fast }}
            className="mt-8 border-l border-champagne/60 pl-4 font-serif text-xs tracking-[.14em] text-pearl/55"
          >
            {venusBridgeMedia.slogan}
          </motion.p>
        </div>

        <motion.div
          className="min-w-0 lg:col-span-6"
          initial={reduced ? false : { opacity: 0, y: 22 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
          transition={{ delay: base + 0.14, duration: reduced ? 0 : 0.54, ease: easings.editorial }}
        >
          <ProductionSystemCanvas language={language} active={ready} />
        </motion.div>
      </div>
    </section>
  );
}
