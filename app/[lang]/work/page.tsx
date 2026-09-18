import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { withLanguage } from "@/lib/i18n";
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
        ? "英国与欧洲品牌发布、展会与文化项目 | Venus Bridge"
        : "UK & European Brand Launches, Exhibitions & Culture | Venus Bridge",
    description:
      lang === "zh"
        ? "浏览英国与欧洲品牌发布、行业展会和文化项目，了解市场背景、团队贡献与项目价值。"
        : "Explore UK and European brand launches, exhibitions and cultural projects through their market context, team contribution and project value."
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
            {zh ? "让国际化目标，成为有当地相关性的品牌实践。" : "International ambition. Local relevance."}
          </h1>
          <p className="type-lede max-w-[26rem] border-t border-ink/15 pt-5 text-ink/65 lg:col-span-4 lg:self-end">
            {zh
              ? "这些英国与欧洲的品牌发布、行业展会和文化项目，展示不同市场场景中的团队贡献，以及这份经验与下一次项目的关系。"
              : "Brand launches, industry exhibitions and cultural projects across the UK and Europe. Explore the market setting, our team’s contribution and the relevance to your next project."}
          </p>
        </Container>
      </section>
      <PortfolioWork language={lang} />
      <section className="bg-night py-16 text-pearl lg:py-24" data-work-opportunity>
        <Container>
          <Eyebrow>{zh ? "下一次合作" : "YOUR NEXT PROJECT"}</Eyebrow>
          <h2 className="editorial-heading mt-6 max-w-4xl">
            {zh ? "为英国与欧洲市场，组织合适的表达与执行。" : "Bring your next market moment into focus."}
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-pearl/75">
            {zh
              ? "Venus Bridge 面向中国企业，连接英国与欧洲的品牌表达、本地制作与合作资源。对于正在筹备品牌发布、展会或文化项目的团队，我们可以从市场与受众需求出发，讨论活动内容策划、展会传播、本地制作及相关资源协调，并按项目明确职责与交付。"
              : "Venus Bridge connects Chinese businesses with brand expression, local production and collaboration resources in the UK and Europe. For brands planning a launch, exhibition or cultural project, we can discuss audience needs, event content planning, exhibition communications, local production and relevant resource coordination, with scope and delivery agreed for the project."}
          </p>
          <div className="mt-8">
            <ButtonLink href={withLanguage("/contact?intent=company", lang)} showArrow>
              {zh ? "讨论下一次项目" : "Discuss Your Next Project"}
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
