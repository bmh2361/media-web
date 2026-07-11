"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { motionTokens } from "@/lib/motion";

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
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={pathname}
        id="main-content"
        lang={lang}
        className={className}
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 0.22, ease: motionTokens.ease }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
