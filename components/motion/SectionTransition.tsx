"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { motionTokens } from "@/lib/motion";
export function SectionTransition({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={motionTokens.viewport}
      transition={{ duration: reduced ? 0.01 : motionTokens.duration, ease: motionTokens.ease }}
    >
      {children}
    </motion.div>
  );
}
