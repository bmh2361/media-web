"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { durations, easings } from "@/lib/motion-system";
export function AboutProcess({ steps }: { steps: string[] }) {
  const [active, setActive] = useState(0);
  return (
    <ol className="relative mt-12 border-t border-pearl/15">
      <motion.span
        aria-hidden
        className="absolute left-0 top-0 h-px bg-champagne"
        animate={{ width: `${((active + 1) / steps.length) * 100}%` }}
        transition={{ duration: durations.fast, ease: easings.editorial }}
      />
      {steps.map((x, i) => (
        <motion.li
          key={x}
          onViewportEnter={() => setActive(i)}
          viewport={{ margin: "-42% 0px -42% 0px" }}
          data-active={active === i}
          className={`grid min-h-28 content-center gap-3 border-b border-pearl/15 py-6 transition-opacity sm:grid-cols-[4rem_1fr] ${active === i ? "opacity-100" : "opacity-45"}`}
        >
          <span className="text-sm text-champagne">0{i + 1}</span>
          <span className="text-lg">{x}</span>
        </motion.li>
      ))}
    </ol>
  );
}
