"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
import { ButtonLink } from "@/components/ui/Button";
import { home } from "@/content/site";
import { withLanguage, type Language } from "@/lib/i18n";

function splitHeadline(headline: string) {
  if (!headline.includes(" ")) {
    const midpoint = Math.ceil(headline.length / 2);
    return [headline.slice(0, midpoint), headline.slice(midpoint)];
  }

  const words = headline.split(" ");
  const lines: string[] = [];
  const lineCount = words.length > 8 ? 3 : 2;
  const perLine = Math.ceil(words.length / lineCount);

  for (let index = 0; index < words.length; index += perLine) {
    lines.push(words.slice(index, index + perLine).join(" "));
  }

  return lines;
}

export function Hero({ language }: { language: Language }) {
  const copy = home[language];
  const prefersReducedMotion = useReducedMotion();
  const lines = splitHeadline(copy.title);

  const fadeUp = {
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-ink pt-16 text-pearl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(111,183,255,0.32),transparent_24rem),radial-gradient(circle_at_20%_35%,rgba(216,199,162,0.24),transparent_28rem),linear-gradient(180deg,#14171c_0%,#0b0d10_72%)]" />
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-[-8vw] top-24 hidden h-[68vh] w-[58vw] rotate-[-8deg] rounded-lg border border-pearl/10 bg-pearl/[0.06] shadow-cinematic lg:block"
      />
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        className="absolute right-[7vw] top-36 hidden aspect-[4/5] w-[26vw] lg:block"
      >
        <MediaPlaceholder
          id="hero-cinematic"
          language={language}
          priority
          sizes="26vw"
          className="h-full rounded-lg border border-pearl/12"
        />
      </motion.div>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.24 }}
        className="absolute bottom-20 right-[32vw] hidden h-44 w-72 rounded-lg border border-pearl/12 bg-pearl/[0.08] backdrop-blur-md lg:block"
      >
        <div className="m-5 h-20 rounded-md bg-pearl/15" />
        <div className="mx-5 h-px bg-pearl/20" />
        <div className="mx-5 mt-5 grid grid-cols-3 gap-2">
          <span className="h-2 rounded-full bg-champagne/70" />
          <span className="h-2 rounded-full bg-pearl/30" />
          <span className="h-2 rounded-full bg-blue/50" />
        </div>
      </motion.div>
      <div className="container-x relative flex min-h-[calc(100vh-4rem)] flex-col justify-end pb-16 pt-24">
        <div className="max-w-5xl">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs font-semibold uppercase tracking-editorial text-champagne"
          >
            {copy.eyebrow}
          </motion.p>
          <h1 className="display-heading mt-6 max-w-5xl font-semibold text-balance">
            {lines.map((line, index) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={prefersReducedMotion ? { y: 0, opacity: 1 } : { y: "105%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1], delay: 0.08 + index * 0.08 }}
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
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.38 }}
            className="mt-8 max-w-2xl text-lg leading-8 text-pearl/72 sm:text-xl"
          >
            {copy.intro}
          </motion.p>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <ButtonLink href={withLanguage("/contact", language)} showArrow className="bg-pearl text-ink hover:bg-champagne">
              {copy.ctaPrimary}
            </ButtonLink>
            <ButtonLink href={withLanguage("/work", language)} variant="secondary" className="border-pearl/20 bg-pearl/10 text-pearl hover:bg-pearl/15">
              {copy.ctaSecondary}
            </ButtonLink>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
