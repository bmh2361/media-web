"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { routeTransition } from "@/lib/motion-system";

export function PageTransition({
  children,
  className,
  lang
}: {
  children: ReactNode;
  className?: string;
  lang?: string;
}) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence mode="sync" initial={false}>
      <motion.main
        key={pathname}
        id="main-content"
        lang={lang}
        className={className}
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0.85 }}
        animate={{ opacity: 1 }}
        exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0.85 }}
        transition={prefersReducedMotion ? { duration: 0.01 } : routeTransition}
      >
        <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {lang === "zh" ? "页面已载入" : "Page loaded"}
        </span>
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
