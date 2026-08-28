"use client";
import { motion, useReducedMotion } from "framer-motion";
import { distances, durations, easings, viewport } from "@/lib/motion-system";
export function EditorialReveal({
  children,
  className,
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: distances.medium }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={
        reduced ? { duration: 0.01 } : { duration: durations.media, ease: easings.editorial, delay }
      }
    >
      {children}
    </motion.div>
  );
}
