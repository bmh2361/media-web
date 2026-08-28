"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { distances, durations, easings, viewport } from "@/lib/motion-system";

export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: distances.medium }}
      whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: prefersReducedMotion ? 0.01 : durations.media, ease: easings.editorial, delay }}
    >
      {children}
    </motion.div>
  );
}
