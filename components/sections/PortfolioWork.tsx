import { CommercialCaseIndex } from "@/components/sections/CommercialCaseIndex";
import { publishedPortfolioProjects } from "@/content/portfolio";
import type { Language } from "@/lib/i18n";

export function PortfolioWork({ language }: { language: Language }) {
  const zh = language === "zh";
  const tiers = [
    {
      tier: 1,
      title: zh ? "商业案例" : "Commercial Case Studies",
      body: zh
        ? "中国企业真实发生在英国与欧洲市场节点中的项目，并将商业背景与 Venus Bridge 经核实的职责清楚分开。"
        : "Chinese companies operating at real UK and European market moments, with the commercial context separated clearly from Venus Bridge's verified role."
    },
    {
      tier: 2,
      title: zh ? "本地品牌与制作执行" : "Local Brand & Production Execution",
      body: zh
        ? "英国本地化、实景协调、品牌叙事与制作执行。"
        : "UK localisation, locations, brand storytelling and production delivery."
    },
    {
      tier: 3,
      title: zh ? "创意与文化项目经验" : "Creative & Cultural Experience",
      body: zh
        ? "如实呈现创意制作、人才环境、时尚娱乐执行与文化语境能力。"
        : "Creative production, talent environments, fashion and entertainment execution, and local cultural fluency."
    }
  ] as const;
  return (
    <section className="bg-porcelain py-16 text-ink lg:py-24" data-work-archive>
      <div className="container-x">
        <div className="space-y-24">
          {tiers.map((tier) => {
            const cases = publishedPortfolioProjects.filter((project) => project.workTier === tier.tier);
            return (
              <section key={tier.tier} data-work-tier={tier.tier}>
                <p className="text-xs uppercase tracking-editorial text-champagne">0{tier.tier}</p>
                <div className="mt-4 grid gap-5 border-b border-ink/15 pb-8 lg:grid-cols-12 lg:items-end">
                  <h2 className="editorial-heading lg:col-span-7">{tier.title}</h2>
                  <p className="text-base leading-7 text-ink/65 lg:col-span-4 lg:col-start-9">{tier.body}</p>
                </div>
                <CommercialCaseIndex cases={cases} language={language} showFilters={false} />
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
