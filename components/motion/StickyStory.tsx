"use client";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { MediaSlot } from "@/components/media/MediaSlot";
import { motionTokens } from "@/lib/motion";
import type { Language } from "@/lib/i18n";
type Story = { name: string; problem: string; services: string; deliverables: string; href: string };
const storyMedia = ["home-create", "home-connect", "home-activate"] as const;
export function StickyStory({
  items,
  linkLabel,
  language
}: {
  items: readonly Story[];
  linkLabel: string;
  language: Language;
}) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  return (
    <div className="grid gap-10 lg:grid-cols-[.56fr_1.44fr]">
      <div className="hidden lg:block">
        <div className="sticky top-28">
          <p className="text-xs uppercase tracking-editorial text-slate">
            {language === "zh" ? "当前能力方向" : "Current pillar"}
          </p>
          <p className="mt-5 text-6xl font-semibold leading-none text-ink">{items[active]?.name}</p>
          <p className="mt-6 max-w-sm text-sm leading-6 text-ink/65">{items[active]?.deliverables}</p>
        </div>
      </div>
      <div className="grid">
        {items.map((a, i) => (
          <motion.article
            key={a.name}
            className="border-t border-ink/20 py-12 first:border-0 lg:flex lg:min-h-[62vh] lg:flex-col lg:justify-center lg:py-16"
            initial={reduced ? false : { opacity: 0.35, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            onViewportEnter={() => setActive(i)}
            viewport={{ amount: 0.55 }}
            transition={{ duration: reduced ? 0.01 : motionTokens.duration, ease: motionTokens.ease }}
          >
            <span className="text-xs tracking-editorial text-slate">0{i + 1}</span>
            <h2 className="mt-6 text-5xl font-semibold tracking-[-.04em] md:text-7xl">{a.name}</h2>
            <p className="mt-7 max-w-xl text-2xl leading-snug">{a.problem}</p>
            <MediaSlot
              id={storyMedia[i]}
              language={language}
              sizes="(min-width:1024px) 56vw, 100vw"
              className="mt-8 aspect-[16/8] border border-ink/10"
              showCaption={false}
            />
            <div className="mt-10 grid gap-5 border-t border-ink/10 pt-6 md:grid-cols-2">
              <p className="text-sm leading-6 text-ink/60">{a.services}</p>
              <p className="text-sm leading-6 text-ink/60">{a.deliverables}</p>
            </div>
            <Link href={a.href} className="mt-8 text-sm font-semibold text-blue">
              {linkLabel} →
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
