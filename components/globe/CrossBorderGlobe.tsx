"use client";

import { useEffect, useRef, useState } from "react";
import { VenusGlobeVisual } from "@/components/globe/VenusGlobeVisual";
import type { GlobeEmphasis } from "@/components/globe/VenusGlobeVisual";
import { connectionLocations } from "@/content/locations";
import type { Language } from "@/lib/i18n";

export function CrossBorderGlobe({ language }: { language: Language }) {
  const zh = language === "zh";
  const [emphasis, setEmphasis] = useState<GlobeEmphasis>(null);
  const releaseTimerRef = useRef<number | null>(null);
  const origins = connectionLocations.filter((item) => item.type === "origin");
  const europe = connectionLocations.filter((item) => item.type === "europe-context");

  const activate = (next: Exclude<GlobeEmphasis, null>) => {
    if (releaseTimerRef.current !== null) window.clearTimeout(releaseTimerRef.current);
    releaseTimerRef.current = null;
    setEmphasis(next);
  };
  const release = () => {
    if (releaseTimerRef.current !== null) window.clearTimeout(releaseTimerRef.current);
    releaseTimerRef.current = window.setTimeout(() => {
      setEmphasis(null);
      releaseTimerRef.current = null;
    }, 550);
  };

  useEffect(
    () => () => {
      if (releaseTimerRef.current !== null) window.clearTimeout(releaseTimerRef.current);
    },
    []
  );

  return (
    <section
      className="relative overflow-hidden bg-ink text-pearl"
      aria-labelledby="connection-title"
      data-about-chapter="geography"
      data-connection-globe="cobe-hybrid"
    >
      <div className="container-x relative py-14 md:min-h-[980px] md:py-24 lg:min-h-[92svh] lg:py-0">
        <div className="relative z-20 max-w-[31rem] lg:absolute lg:left-0 lg:top-1/2 lg:max-w-[23rem] lg:-translate-y-1/2 xl:max-w-[25rem]">
          <p className="text-xs uppercase tracking-editorial text-champagne">
            {zh ? "中国 → 英国与欧洲" : "CHINA → UK & EUROPE"}
          </p>
          <h2 id="connection-title" className="type-display-page zh-display-measure mt-6 max-w-[10ch]">
            {zh
              ? "理解中国端目标，在英国与欧洲推进。"
              : "Understand the China-side goal. Move it forward in the UK and Europe."}
          </h2>
          <p className="text-pearl/62 mt-6 max-w-[34rem] text-base leading-7 md:mt-7 md:text-lg md:leading-8">
            {zh
              ? "Venus Bridge 从中国总部的商业目标出发，在伦敦及英国、欧洲市场组织所需关系、专业能力与本地执行。"
              : "Venus Bridge starts with the commercial goals of Chinese headquarters, then coordinates the relationships, specialist capability and local execution required in London and across the UK and Europe."}
          </p>

          <div
            className="border-pearl/16 mt-7 border-t pt-4 md:mt-10 md:pt-5"
            aria-label={zh ? "跨境项目地理路径" : "Cross-border project geography"}
          >
            <div
              className="group grid grid-cols-[2.4rem_1fr] gap-3 transition-[border-color,color] duration-200 ease-editorial focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-champagne"
              tabIndex={0}
              role="group"
              aria-label={zh ? "中国端业务语境" : "China-side business context"}
              data-globe-trigger="china"
              data-active={emphasis === "china" ? "true" : "false"}
              onPointerEnter={(event) => {
                if (event.pointerType !== "touch") activate("china");
              }}
              onPointerLeave={release}
              onFocus={() => activate("china")}
              onBlur={release}
            >
              <span
                className={`text-xs transition-colors duration-200 ${emphasis === "china" ? "text-pearl" : "text-champagne"}`}
              >
                01
              </span>
              <div>
                <p
                  className={`text-sm font-medium text-pearl transition-transform duration-200 ease-editorial ${emphasis === "china" ? "translate-x-0.5" : ""}`}
                >
                  {zh ? "中国端业务语境" : "China-side business context"}
                </p>
                <p
                  className={`mt-2 text-xs leading-6 transition-colors duration-200 ${emphasis === "china" ? "text-pearl/58" : "text-pearl/42"}`}
                >
                  {origins.map((item) => item.label[language]).join(" · ")}
                </p>
              </div>
            </div>
            <div
              className={`mt-5 grid grid-cols-[2.4rem_1fr] gap-3 border-t pt-5 transition-[border-color,color] duration-200 ease-editorial focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-champagne ${emphasis === "europe" ? "border-pearl/20" : "border-pearl/10"}`}
              tabIndex={0}
              role="group"
              aria-label={zh ? "英国与欧洲项目覆盖" : "UK & European project reach"}
              data-globe-trigger="europe"
              data-active={emphasis === "europe" ? "true" : "false"}
              onPointerEnter={(event) => {
                if (event.pointerType !== "touch") activate("europe");
              }}
              onPointerLeave={release}
              onFocus={() => activate("europe")}
              onBlur={release}
            >
              <span
                className={`text-xs transition-colors duration-200 ${emphasis === "europe" ? "text-pearl" : "text-champagne/70"}`}
              >
                02
              </span>
              <div>
                <p
                  className={`text-sm font-medium text-pearl transition-[color,transform] duration-200 ease-editorial ${emphasis === "europe" ? "translate-x-0.5" : "text-pearl/74"}`}
                >
                  {zh ? "英国与欧洲项目覆盖" : "UK & European project reach"}
                </p>
                <p
                  className={`mt-2 text-xs leading-6 transition-colors duration-200 ${emphasis === "europe" ? "text-pearl/58" : "text-pearl/42"}`}
                >
                  {europe.map((item) => item.label[language]).join(" · ")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <figure className="relative z-10 mt-6 w-full max-w-none md:-ml-[8vw] md:w-[94vw] lg:absolute lg:-right-[4vw] lg:top-1/2 lg:mt-0 lg:w-[min(68vw,860px)] lg:-translate-y-1/2 xl:w-[min(62vw,860px)]">
          <VenusGlobeVisual language={language} emphasis={emphasis} />
          <figcaption className="sr-only">
            {zh
              ? "数字地球显示北京、上海、深圳、广州与杭州的项目起点汇聚到伦敦，再由伦敦连接欧洲市场语境。"
              : "A digital globe showing project origins in Beijing, Shanghai, Shenzhen, Guangzhou and Hangzhou converging on London before branching into European market contexts."}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
