"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { createContext, useContext, useEffect, useState } from "react";
import { BrandMark } from "@/components/brand/BrandMark";
import { venusBridgeMedia } from "@/lib/brand/venusBridgeMedia";
import { durations, easings } from "@/lib/motion-system";

const OpeningContext = createContext({ heroReady: true, firstVisit: false });
export const useOpeningSequence = () => useContext(OpeningContext);
export function OpeningSequenceProvider({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion(),
    [firstVisit, setFirstVisit] = useState(false),
    [heroReady, setHeroReady] = useState(false),
    [overlay, setOverlay] = useState(false);
  useEffect(() => {
    const first = !sessionStorage.getItem("vbm-opening-seen") && !reduced;
    setFirstVisit(first);
    if (!first) {
      setHeroReady(true);
      return;
    }
    sessionStorage.setItem("vbm-opening-seen", "1");
    setOverlay(true);
    const hero = window.setTimeout(() => setHeroReady(true), 180);
    const done = window.setTimeout(() => setOverlay(false), 410);
    return () => {
      clearTimeout(hero);
      clearTimeout(done);
    };
  }, [reduced]);
  return (
    <OpeningContext.Provider value={{ heroReady, firstVisit }}>
      {children}
      <AnimatePresence>
        {overlay && (
          <motion.div
            data-opening-overlay
            aria-hidden
            className="fixed inset-0 z-[200] grid place-items-center bg-ink text-pearl"
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: durations.route, ease: easings.curtain }}
          >
            <motion.div
              initial={{ y: 12 }}
              animate={{ y: 0 }}
              transition={{ duration: durations.fast, ease: easings.editorial }}
              className="text-center"
            >
              <BrandMark surface="dark" className="w-20" />
              <span className="mt-5 block font-serif text-xs uppercase tracking-[.2em] text-champagne">
                {venusBridgeMedia.slogan}
              </span>
            </motion.div>
            <motion.div
              className="absolute inset-x-[8%] top-1/2 h-px origin-left bg-pearl/25"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.18, duration: 0.38, ease: easings.editorial }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </OpeningContext.Provider>
  );
}
