"use client";

import { useState } from "react";
import { EditorialScene, type EditorialSceneMedia } from "@/components/sections/phase32c/EditorialScene";
import type { Language } from "@/lib/i18n";

export type OutcomeScene = {
  title: string;
  text: string;
  label: string;
  scene: EditorialSceneMedia;
};

export function OutcomeMediaExperience({ items, language }: { items: OutcomeScene[]; language: Language }) {
  const [active, setActive] = useState(0);
  return (
    <div data-phase32c-outcomes>
      <div className="grid gap-10 md:hidden">
        {items.map((item, index) => (
          <article key={item.title} className="border-t border-ink/15 pt-6">
            <span className="type-label text-champagne">0{index + 1}</span>
            <h3 className="mt-5 text-2xl font-medium">{item.title}</h3>
            <p className="mt-4 text-base leading-7 text-ink/65">{item.text}</p>
            <EditorialScene
              scene={item.scene}
              language={language}
              className="mt-6"
              sizes="100vw"
              mediaRole="card-landscape"
            />
          </article>
        ))}
      </div>
      <div className="hidden gap-12 md:grid md:grid-cols-12 md:items-stretch">
        <div className="border-t border-ink/15 md:col-span-5">
          {items.map((item, index) => (
            <button
              key={item.title}
              type="button"
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
              aria-pressed={active === index}
              className={`grid min-h-32 w-full grid-cols-[3rem_1fr] gap-4 border-b border-ink/15 py-6 text-left transition ${active === index ? "border-l-2 border-l-champagne pl-5" : "hover:pl-3"}`}
            >
              <span className="text-xs text-champagne">0{index + 1}</span>
              <span>
                <span className="block text-2xl font-medium lg:text-3xl">{item.title}</span>
                <span className="mt-3 block max-w-md text-base leading-7 text-ink/65">{item.text}</span>
              </span>
            </button>
          ))}
        </div>
        <div className="relative min-h-[560px] overflow-hidden bg-ink md:col-span-7">
          <EditorialScene
            key={items[active]?.scene.media.id}
            scene={items[active]!.scene}
            language={language}
            className="absolute inset-0 h-full w-full animate-[phase32c-scene-in_.55s_ease-out_both]"
            sizes="58vw"
            mediaRole="mosaic-fill"
          />
          <p className="absolute bottom-6 left-6 bg-ink/85 px-4 py-3 text-xs uppercase tracking-editorial text-pearl">
            {items[active]?.label}
          </p>
        </div>
      </div>
    </div>
  );
}
