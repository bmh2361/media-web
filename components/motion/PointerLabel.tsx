"use client";

import { motion, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { springs } from "@/lib/motion-system";

export function PointerLabel() {
  const reduced = useReducedMotion();
  const x = useSpring(-120, springs.pointer);
  const y = useSpring(-120, springs.pointer);
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const precisePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setEnabled(precisePointer.matches && !reduced);
    sync();
    precisePointer.addEventListener("change", sync);
    return () => precisePointer.removeEventListener("change", sync);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        x.set(event.clientX + 18);
        y.set(event.clientY + 18);
      });
    };
    const over = (event: PointerEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      setLabel(target?.dataset.cursor ?? "");
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  return (
    <motion.div
      aria-hidden
      className="bg-ink/88 pointer-events-none fixed left-0 top-0 z-[120] rounded-full border border-pearl/25 px-3 py-2 text-[10px] font-medium uppercase tracking-[.16em] text-pearl shadow-cinematic backdrop-blur-md"
      style={{ x, y }}
      animate={{ opacity: label ? 1 : 0, scale: label ? 1 : 0.82 }}
    >
      {label}
    </motion.div>
  );
}
