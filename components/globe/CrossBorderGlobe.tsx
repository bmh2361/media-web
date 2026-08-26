import { VenusGlobeVisual } from "@/components/globe/VenusGlobeVisual";
import { connectionLocations } from "@/content/locations";
import type { Language } from "@/lib/i18n";

export function CrossBorderGlobe({ language }: { language: Language }) {
  const zh = language === "zh";
  const origins = connectionLocations.filter((item) => item.type === "origin");
  const europe = connectionLocations.filter((item) => item.type === "europe-context");

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
            {zh ? "理解中国端目标，在英国与欧洲推进。" : "China-side context. UK & European project reach."}
          </h2>
          <p className="text-pearl/62 mt-6 max-w-[34rem] text-base leading-7 md:mt-7 md:text-lg md:leading-8">
            {zh
              ? "Venus Bridge 从中国总部的商业目标出发，在伦敦及英国、欧洲市场组织所需关系、专业能力与本地执行。"
              : "Venus Bridge starts with the commercial goal in China, then coordinates the relationships, specialist capability and local execution required in London and across the UK and Europe."}
          </p>

          <div
            className="border-pearl/16 mt-7 border-t pt-4 md:mt-10 md:pt-5"
            aria-label={zh ? "跨境项目地理路径" : "Cross-border project geography"}
          >
            <div className="grid grid-cols-[2.4rem_1fr] gap-3">
              <span className="text-xs text-champagne">01</span>
              <div>
                <p className="text-sm font-medium text-pearl">
                  {zh ? "中国端业务语境" : "China-side business context"}
                </p>
                <p className="text-pearl/42 mt-2 text-xs leading-6">
                  {origins.map((item) => item.label[language]).join(" · ")}
                </p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-[2.4rem_1fr] gap-3 border-t border-pearl/10 pt-5">
              <span className="text-xs text-champagne/70">02</span>
              <div>
                <p className="text-pearl/74 text-sm font-medium">
                  {zh ? "英国与欧洲项目覆盖" : "UK & European project reach"}
                </p>
                <p className="text-pearl/42 mt-2 text-xs leading-6">
                  {europe.map((item) => item.label[language]).join(" · ")}
                </p>
              </div>
            </div>
          </div>

        </div>

        <figure className="relative z-10 mt-6 w-full max-w-none md:-ml-[8vw] md:w-[94vw] lg:absolute lg:-right-[4vw] lg:top-1/2 lg:mt-0 lg:w-[min(68vw,860px)] lg:-translate-y-1/2 xl:w-[min(62vw,860px)]">
          <VenusGlobeVisual language={language} />
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
