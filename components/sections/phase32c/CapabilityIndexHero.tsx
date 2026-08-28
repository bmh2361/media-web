"use client";

import Link from "next/link";
import { useState } from "react";
import { EditorialScene, type EditorialSceneMedia } from "@/components/sections/phase32c/EditorialScene";
import type { Language } from "@/lib/i18n";

export type CapabilityIndexItem = {
  id: string;
  title: string;
  summary: string;
  scene?: EditorialSceneMedia;
};

export function CapabilityIndexHero({
  items,
  language,
  baseHref = ""
}: {
  items: CapabilityIndexItem[];
  language: Language;
  baseHref?: string;
}) {
  const [active, setActive] = useState(0);
  const current = items[active];
  return (
    <div
      className="grid min-h-[600px] border-y border-pearl/15 lg:grid-cols-12"
      data-phase32c-capability-index
    >
      <nav
        aria-label={language === "zh" ? "核心能力索引" : "Capabilities index"}
        className="divide-y divide-pearl/15 lg:col-span-5"
      >
        {items.map((item, index) => (
          <Link
            key={item.id}
            href={`${baseHref}#${item.id}`}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            className={`grid min-h-36 grid-cols-[3rem_1fr] gap-4 py-7 pr-5 transition lg:px-7 ${active === index ? "border-l-2 border-champagne bg-pearl/[.06] text-pearl" : "text-pearl"}`}
          >
            <span className="text-xs text-champagne">0{index + 1}</span>
            <span>
              <span className="block max-w-[23ch] text-2xl font-medium lg:text-[1.75rem]">{item.title}</span>
              <span className="mt-3 block max-w-md text-base leading-7 text-pearl/60">{item.summary}</span>
            </span>
          </Link>
        ))}
      </nav>
      <div className="relative hidden min-h-[600px] overflow-hidden bg-graphite lg:col-span-7 lg:block">
        {current?.scene ? (
          <EditorialScene
            key={current.scene.media.id}
            scene={current.scene}
            language={language}
            className="absolute inset-0 h-full w-full animate-[phase32c-scene-in_.55s_ease-out_both]"
            sizes="55vw"
            mediaRole="mosaic-fill"
          />
        ) : (
          <div className="flex h-full items-end bg-pearl p-12 text-ink">
            <div className="max-w-lg border-l border-champagne pl-7">
              <p className="text-xs uppercase tracking-editorial text-champagne">
                {language === "zh" ? "关系与知识合作" : "RELATIONSHIPS & KNOWLEDGE"}
              </p>
              <p className="mt-7 max-w-xl text-4xl leading-tight">
                {language === "zh"
                  ? "以清晰目标、合适形式与准确边界，组织有价值的专业交流。"
                  : "Serious engagement starts with a clear objective, the right format and precise boundaries."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
