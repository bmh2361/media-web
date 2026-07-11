"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { motionTokens } from "@/lib/motion";
export function WordMaskReveal({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <span className={`block overflow-hidden ${className ?? ""}`}>
      <motion.span
        className="block"
        initial={reduced ? false : { y: "105%", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={motionTokens.viewport}
        transition={{ duration: reduced ? 0.01 : motionTokens.duration, ease: motionTokens.ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}
