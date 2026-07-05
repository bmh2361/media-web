"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function ProcessTimeline({
  steps,
  dark = false
}: {
  steps: string[];
  dark?: boolean;
}) {
  const [activeStep, setActiveStep] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, index) => {
        const active = activeStep === index;

        return (
          <motion.article
            key={step}
            onViewportEnter={() => setActiveStep(index)}
            viewport={{ amount: 0.65 }}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.03 }}
            className={cn(
              "rounded-lg border p-6 transition duration-300",
              dark
                ? "border-pearl/12 bg-pearl/[0.04] text-pearl"
                : "border-ink/10 bg-white/70 text-ink shadow-soft",
              active && (dark ? "border-champagne/70 bg-pearl/[0.07]" : "border-blue/40 shadow-cinematic")
            )}
          >
            <span className={cn("text-sm font-semibold", dark ? "text-champagne" : "text-slate")}>0{index + 1}</span>
            <h3 className="mt-12 text-2xl font-semibold leading-tight">{step}</h3>
          </motion.article>
        );
      })}
    </div>
  );
}
