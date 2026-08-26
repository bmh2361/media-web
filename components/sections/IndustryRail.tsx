import type { Language } from "@/lib/i18n";

const sectors = {
  en: [
    "Fashion, Beauty & Apparel",
    "Automotive",
    "AI",
    "Consumer Technology",
    "Events",
    "Research",
    "Lifestyle"
  ],
  zh: ["时尚、美妆与服装", "汽车", "人工智能", "消费科技", "活动", "科研", "生活方式"]
} as const;

export function IndustryRail({ language }: { language: Language }) {
  return (
    <section className="overflow-hidden border-y border-pearl/15 bg-ink py-7 text-pearl">
      <p className="container-x text-[10px] uppercase tracking-[.18em] text-champagne">
        {language === "zh" ? "服务行业与项目语境" : "Sectors and project contexts"}
      </p>
      <div className="industry-rail mt-5" aria-label={language === "zh" ? "行业列表" : "Industry list"}>
        {[false, true].map((hidden) => (
          <div key={String(hidden)} className="industry-rail-group" aria-hidden={hidden || undefined}>
            {sectors[language].map((sector, index) => (
              <span key={sector} className="inline-flex items-center gap-5">
                <span className="text-[10px] text-champagne">0{index + 1}</span>
                <span className="text-2xl font-medium md:text-4xl">{sector}</span>
                <span className="text-champagne" aria-hidden>
                  ✦
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
