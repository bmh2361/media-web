"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
import { ButtonLink } from "@/components/ui/Button";
import { homeContent } from "@/content/pages/home";
import { withLanguage, type Language } from "@/lib/i18n";
import { editorialEase, fastDuration, slowDuration, standardDuration } from "@/lib/motion";

export function Hero({ language }: { language: Language }) {
  const copy = homeContent[language];
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = {
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="relative overflow-hidden bg-ink pt-16 text-pearl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(111,183,255,0.32),transparent_24rem),radial-gradient(circle_at_20%_35%,rgba(216,199,162,0.24),transparent_28rem),linear-gradient(180deg,#14171c_0%,#0b0d10_72%)]" />
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: slowDuration, ease: editorialEase }}
        className="absolute right-[-8vw] top-24 hidden h-[68vh] w-[58vw] rotate-[-8deg] border border-pearl/10 bg-pearl/[0.06] shadow-cinematic lg:block"
      />
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: slowDuration, ease: editorialEase, delay: 0.08 }}
        className="absolute right-[7vw] top-36 hidden aspect-[4/5] w-[26vw] lg:block"
      >
        <MediaPlaceholder
          id="home-hero-primary"
          language={language}
          priority
          sizes="26vw"
          className="h-full rounded-lg border border-pearl/10"
        />
      </motion.div>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        transition={{ duration: standardDuration, ease: editorialEase, delay: 0.24 }}
        className="absolute bottom-20 right-[32vw] hidden w-72 border border-pearl/10 bg-ink/80 p-5 lg:block"
      >
        <p className="text-xs uppercase tracking-editorial text-champagne">
          {language === "zh" ? "伦敦 / 英国" : "London / UK"}
        </p>
        <p className="mt-6 border-t border-pearl/20 pt-4 text-sm text-pearl/70">
          {language === "zh" ? "制作、人才与活动执行协调" : "Production, talent and activation coordination"}
        </p>
      </motion.div>
      <div className="container-x relative grid min-h-[calc(100svh-4rem)] gap-10 pb-14 pt-20 lg:grid-cols-[minmax(0,1fr)_minmax(24rem,.72fr)] lg:items-end lg:pb-16">
        <div className="max-w-5xl">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: standardDuration, ease: editorialEase }}
            className="text-xs font-semibold uppercase tracking-editorial text-champagne"
          >
            {copy.eyebrow}
          </motion.p>
          <h1 className="display-heading mt-6 max-w-5xl text-balance font-semibold">
            {copy.titleLines.map((line, index) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={prefersReducedMotion ? { y: 0, opacity: 1 } : { y: "105%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: slowDuration, ease: editorialEase, delay: 0.08 + index * 0.08 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: standardDuration, ease: editorialEase, delay: 0.38 }}
            className="mt-8 max-w-2xl text-lg leading-8 text-pearl/70 sm:text-xl"
          >
            {copy.intro}
          </motion.p>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: standardDuration, ease: editorialEase, delay: 0.5 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <ButtonLink
              href={withLanguage("/contact", language)}
              showArrow
              className="bg-pearl text-ink hover:bg-champagne"
            >
              {copy.primary}
            </ButtonLink>
            <ButtonLink
              href={withLanguage("/services", language)}
              variant="secondary"
              className="border-pearl/20 bg-pearl/10 text-pearl hover:bg-pearl/20"
            >
              {copy.secondary}
            </ButtonLink>
          </motion.div>
        </div>
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: fastDuration, ease: editorialEase, delay: 0.18 }}
          className="relative aspect-[4/5] w-full max-w-sm justify-self-end lg:hidden"
        >
          <MediaPlaceholder
            id="home-hero-primary"
            language={language}
            priority
            sizes="(max-width: 640px) 100vw, 24rem"
            className="h-full border border-pearl/10"
          />
        </motion.div>
      </div>
    </section>
  );
}
