import { CommercialCaseIndex, type CommercialCaseFilter } from "@/components/sections/CommercialCaseIndex";
import { publishedPortfolioProjects } from "@/content/portfolio";
import type { Language } from "@/lib/i18n";

export function PortfolioWork({
  language,
  initialCategory = "all"
}: {
  language: Language;
  initialCategory?: CommercialCaseFilter;
}) {
  return (
    <section className="bg-porcelain py-16 text-ink lg:py-24" data-work-archive>
      <div className="container-x">
        <h2 className="mb-8 text-2xl font-medium">
          {language === "zh" ? "精选项目与团队经验" : "Selected Projects & Team Experience"}
        </h2>
        <CommercialCaseIndex
          cases={publishedPortfolioProjects}
          language={language}
          initialCategory={initialCategory}
        />
      </div>
    </section>
  );
}
