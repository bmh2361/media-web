"use client";

import { motion, useReducedMotion } from "framer-motion";
import { deliveryProcess } from "@/content/commercial-architecture";
import type { Language } from "@/lib/i18n";
import { durations, easings, viewport } from "@/lib/motion-system";

export function ProductionProcess({ language }: { language: Language }) {
  const reduced = useReducedMotion();
  return (
    <ol className="relative mt-9 grid gap-0 border-y border-pearl/15 lg:mt-12 lg:grid-cols-5">
      <motion.span
        aria-hidden
        className="absolute left-0 top-0 hidden h-px w-full origin-left bg-champagne lg:block"
        initial={reduced ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={viewport}
        transition={{ duration: reduced ? 0 : durations.section, ease: easings.editorial }}
      />
      {deliveryProcess.map((step, index) => (
        <motion.li
          key={step.title.en}
          className="relative border-b border-pearl/15 py-6 last:border-b-0 lg:min-h-72 lg:border-b-0 lg:border-r lg:px-6 lg:py-8 lg:last:border-r-0"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{
            duration: durations.component,
            delay: reduced ? 0 : index * 0.07,
            ease: easings.editorial
          }}
        >
          <span className="text-xs text-champagne">
            0{index + 1} / 0{deliveryProcess.length}
          </span>
          <h3 className="mt-8 text-2xl font-medium lg:mt-20">{step.title[language]}</h3>
          <p className="mt-5 text-sm leading-6 text-pearl/65">{step.text[language]}</p>
        </motion.li>
      ))}
    </ol>
  );
}
