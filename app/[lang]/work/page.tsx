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
        ? "案例：科技与汽车发布的真实团队经验 | Venus Bridge"
        : "Case Studies: Technology & Mobility Launch Experience | Venus Bridge",
    description:
      lang === "zh"
        ? "查看团队在科技、汽车与国际活动中的实际影像制作、本地执行职责与具体交付。"
        : "Explore the team’s actual visual production and local delivery roles in technology, mobility and international events. Clear context, contributions and deliverables."
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
            {zh ? "真实项目中的具体参与。" : "Real projects. Clearly defined roles."}
          </h1>
          <p className="type-lede max-w-[26rem] border-t border-ink/15 pt-5 text-ink/65 lg:col-span-4 lg:self-end">
            {zh
              ? "团队在英国与欧洲的科技、汽车及国际活动中，承担影像制作、品牌内容与本地执行工作。具体范围以每个案例为准。"
              : "Selected team experience in visual production, brand content and local delivery across UK and European technology, mobility and international events. Each case identifies the actual scope."}
          </p>
          <div className="border-t border-ink/15 pt-6 lg:col-span-12" data-work-introduction>
            <p className="max-w-3xl text-base leading-7 text-ink/70">
              {zh
                ? "这些项目与历史独立作品展示真实参与，不证明市场战略、买家开发、销售结果或品牌代理关系。未来商业项目将以实际沟通、反馈和后续行动记录为依据。"
                : "These projects and historical independent works show specific contributions, not market strategy, buyer development, sales outcomes or brand representation. Future commercial cases will be grounded in documented conversations, feedback and next steps."}
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
            {zh ? "为英国与欧洲市场，组织合适的表达与执行。" : "Bring your next market moment into focus."}
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-pearl/75">
            {zh
              ? "Venus Bridge 面向中国企业，连接英国与欧洲的品牌表达、本地制作与合作资源。对于正在筹备科技发布、展会或技术演示的团队，我们可以从市场与受众需求出发，讨论活动内容策划、展会传播、本地制作及相关资源协调，并按项目明确职责与交付。"
              : "Venus Bridge connects Chinese businesses with brand expression, local production and collaboration resources in the UK and Europe. For brands planning a technology launch, exhibition or demonstration, we can discuss audience needs, event content planning, exhibition communications, local production and relevant resource coordination, with scope and delivery agreed for the project."}
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
