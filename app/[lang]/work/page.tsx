import { notFound } from "next/navigation";
import { PortfolioWork } from "@/components/sections/PortfolioWork";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { isSupportedLocale } from "@/lib/i18n";
import { getEffectiveWorkMode } from "@/lib/release";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) return {};
  return buildMetadata({
    lang,
    path: "/work",
    title:
      lang === "zh"
        ? "英国与欧洲项目案例 | Venus Bridge"
        : "UK & European Projects | Venus Bridge Case Studies",
    description:
      lang === "zh"
        ? "浏览真实英国与欧洲项目，了解商业背景、Venus Bridge 的具体职责、本地执行和后续可用成果。"
        : "Explore real UK and European projects through their business context, Venus Bridge role, local delivery and useful outputs."
  });
}

export default async function WorkPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang) || getEffectiveWorkMode() === "hidden") notFound();
  const zh = lang === "zh";

  return (
    <>
      <section className="bg-pearl pt-[76px] text-ink lg:pt-[88px]" data-work-hero>
        <Container className="container-editorial editorial-grid py-16 lg:items-end lg:py-24">
          <Eyebrow className="lg:col-span-12">{zh ? "案例研究" : "CASE STUDIES"}</Eyebrow>
          <h1 className="type-display-page editorial-display-measure zh-display-measure lg:col-span-8">
            {zh
              ? "真实英国与欧洲项目，清楚目标与职责。"
              : "Real UK & European projects. Clear objectives. Clear roles."}
          </h1>
          <p className="type-lede max-w-[26rem] border-t border-ink/15 pt-5 text-ink/65 lg:col-span-4 lg:self-end">
            {zh
              ? "按商业场景浏览项目。每个案例说明项目目标、商业背景、实际职责、本地执行，以及之后留下的可用成果。"
              : "Browse by commercial situation. Each case explains the objective, business context, our verified role, local delivery and what remained useful."}
          </p>
        </Container>
      </section>
      <PortfolioWork language={lang} />
    </>
  );
}
