"use client";
import { motion, useScroll, useReducedMotion } from "framer-motion";
export function ScrollProgress() {
  const { scrollYProgress } = useScroll(),
    reduced = useReducedMotion();
  if (reduced) return null;
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-blue"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
