import { notFound } from "next/navigation";
import type { CommercialCaseFilter } from "@/components/sections/CommercialCaseIndex";
import { PortfolioWork } from "@/components/sections/PortfolioWork";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { commercialCaseFilters } from "@/content/portfolio";
import { isSupportedLocale } from "@/lib/i18n";
import { getEffectiveWorkMode } from "@/lib/release";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) return {};
  return buildMetadata({
    lang,
    path: "/work",
    title: lang === "zh" ? "英国与欧洲项目案例 | Venus Bridge" : "UK & European Projects | Venus Bridge Case Studies",
    description:
      lang === "zh"
        ? "浏览真实英国与欧洲项目，了解商业背景、Venus Bridge 的具体职责、本地执行和后续可用成果。"
        : "Explore real UK and European projects through their business context, Venus Bridge role, local delivery and useful outputs."
  });
}

export default async function WorkPage({
  params,
  searchParams
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const [{ lang }, query] = await Promise.all([params, searchParams]);
  if (!isSupportedLocale(lang) || getEffectiveWorkMode() === "hidden") notFound();
  const zh = lang === "zh";
  const initialCategory = commercialCaseFilters.some((filter) => filter.value === query.category)
    ? (query.category as CommercialCaseFilter)
    : "all";

  return (
    <>
      <section className="bg-pearl pt-[76px] text-ink lg:pt-[88px]" data-work-hero>
        <Container className="grid gap-8 py-16 md:grid-cols-12 md:items-end lg:py-24">
          <div className="md:col-span-8">
            <Eyebrow>{zh ? "案例研究" : "CASE STUDIES"}</Eyebrow>
            <h1 className="type-display-page zh-display-measure mt-6 max-w-[13ch]">
              {zh ? "真实英国与欧洲项目，清楚目标与职责。" : "Real UK & European projects. Clear objectives. Clear roles."}
            </h1>
          </div>
          <p className="type-lede text-ink/65 md:col-span-4">
            {zh
              ? "按商业场景浏览项目。每个案例说明项目目标、商业背景、实际职责、本地执行，以及之后留下的可用成果。"
              : "Browse by commercial situation. Each case explains the objective, business context, our verified role, local delivery and what remained useful."}
          </p>
        </Container>
      </section>
      <PortfolioWork language={lang} initialCategory={initialCategory} />
    </>
  );
}
