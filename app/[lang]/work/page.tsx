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
        ? "英国及欧洲市场项目经验 | Venus Bridge"
        : "Selected UK & European Market Experience | Venus Bridge",
    description:
      lang === "zh"
        ? "了解团队参与中国企业英国与欧洲市场呈现的实践，涵盖市场进入、产业交流、本地定位与落地执行。"
        : "Explore our team’s UK and European market experience across Chinese brand launches, industry ecosystems, local positioning and market-facing execution."
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
            {zh ? "让国际化目标，成为扎根当地的市场实践。" : "International ambition. Local relevance."}
          </h1>
          <p className="type-lede max-w-[26rem] border-t border-ink/15 pt-5 text-ink/65 lg:col-span-4 lg:self-end">
            {zh
              ? "Venus Bridge 立足英国，为中国科技与工业企业连接英国及欧洲的市场进入、商业合作与本地执行，推动产品优势转化为当地市场认知与合作路径。"
              : "Venus Bridge is a UK-based market entry, commercial partnership and local execution platform helping Chinese technology and industrial companies establish credible presence, relationships and commercial pathways in the UK and Europe."}
          </p>
          <div className="border-t border-ink/15 pt-6 lg:col-span-12" data-work-introduction>
            <p className="max-w-3xl text-base leading-7 text-ink/70">
              {zh
                ? "从汽车品牌发布到电池技术与具身智能，以下项目呈现团队参与中国企业欧洲市场实践的经验，以及将国际产品主张与当地产业、受众和应用场景相衔接的认识。"
                : "From automotive introductions to battery technology and embodied AI, these projects show our team’s experience around Chinese companies in Europe—and how an international proposition connects with local industries, audiences and market settings."}
            </p>
            <div className="mt-5">
              <ButtonLink href={withLanguage("/contact?intent=company", lang)} showArrow>
                {zh ? "讨论下一次项目" : "Discuss Your Next Project"}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
      <PortfolioWork language={lang} />
      <section className="bg-night py-16 text-pearl lg:py-24" data-work-opportunity>
        <Container>
          <Eyebrow>{zh ? "下一次合作" : "YOUR NEXT PROJECT"}</Eyebrow>
          <h2 className="editorial-heading mt-6 max-w-4xl">
            {zh
              ? "为英国与欧洲市场，建立下一步商业路径。"
              : "Build your next commercial pathway in the UK and Europe."}
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-pearl/75">
            {zh
              ? "与 Venus Bridge 从市场目标和产业环境出发，讨论本地定位、利益相关方沟通、合作资源与英国端执行，将国际化计划推进为具体的当地市场行动。"
              : "Start with your market objectives and industry context. Work with Venus Bridge on local positioning, stakeholder engagement, partnership resources and UK-side execution to turn international plans into practical local market activity."}
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
