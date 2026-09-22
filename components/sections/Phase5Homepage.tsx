import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { HomeHeroExperience, type HomeHeroScene } from "@/components/sections/phase32c/HomeHeroExperience";
import { SelectedCommercialExperience } from "@/components/sections/CommercialSections";
import { commercial } from "@/content/commercial";
import { findPublishedPortfolioProject, getProjectHero } from "@/content/portfolio";
import { withLanguage, type Language } from "@/lib/i18n";

export function Phase5Homepage({ language }: { language: Language }) {
  const zh = language === "zh";
  const heroScenes: HomeHeroScene[] = [
    "agibot-london-launch",
    "changan-europe-launch-2025",
    "catl-open-day-2025"
  ].map((slug) => {
    const item = findPublishedPortfolioProject(slug)!;
    return {
      kind: "portfolio",
      media:
        item.slug === "agibot-london-launch"
          ? (item.media.find((media) => media.category === "cover") ?? getProjectHero(item))
          : getProjectHero(item),
      label: zh ? item.titleZh : item.titleEn,
      context: item.location
    };
  });
  return (
    <>
      <section
        className="commercial-hero overflow-hidden bg-ink pt-[76px] text-pearl lg:pt-[88px]"
        data-phase5-section="hero"
      >
        <Container className="grid gap-10 py-12 lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-16">
          <div className="min-w-0 lg:col-span-7" data-home-hero-copy>
            <Eyebrow className="max-w-xl leading-6 text-champagne">
              {zh
                ? "英国市场进入 · 品牌本地化 · 产业合作"
                : "UK MARKET ENTRY · BRAND LOCALISATION · COMMERCIAL PARTNERSHIPS"}
            </Eyebrow>
            <h1 className="commercial-hero-title mt-6">
              {zh ? (
                <>
                  <span className="block">帮助中国科技企业，</span>
                  <span className="inline-block">在英国建立</span>
                  <span className="inline-block">市场与合作。</span>
                </>
              ) : (
                commercial.positioning.en
              )}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-pearl/80 md:text-lg">
              {commercial.introduction[language]}
            </p>
            <p className="mt-4 text-sm leading-7 text-pearl/65">{commercial.geography[language]}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href={withLanguage("/companies", language)} showArrow>
                {zh ? "中国企业的市场行动" : "For Chinese Companies"}
              </ButtonLink>
              <ButtonLink
                href={withLanguage("/partners", language)}
                variant="secondary"
                className="border-pearl/30 text-pearl hover:bg-pearl hover:text-ink"
              >
                {zh ? "欧洲企业与机构合作" : "For UK & European Partners"}
              </ButtonLink>
            </div>
          </div>
          <div className="min-w-0 lg:col-span-5" data-home-hero-media>
            <HomeHeroExperience scenes={heroScenes} language={language} />
            <p className="mt-4 text-xs leading-6 text-pearl/65">
              {zh
                ? "精选团队项目影像 · 具体参与范围见案例"
                : "Selected team project imagery · See cases for the actual scope"}
            </p>
          </div>
        </Container>
      </section>
      <Section className="bg-porcelain" id="priority-areas">
        <Container>
          <Eyebrow>{zh ? "技术重点" : "TECHNOLOGY PRIORITIES"}</Eyebrow>
          <h2 className="commercial-heading mt-5">
            {zh ? "聚焦科技与产业创新。" : "Technology with a UK market context."}
          </h2>
          <ol className="brief-flow mt-8">
            {commercial.sectors[language].map((sector, index) => (
              <li key={sector} className="border-t border-ink/20 pt-5">
                <span className="text-sm text-slate">0{index + 1}</span>
                <h3 className="mt-4 text-2xl leading-snug">{sector}</h3>
              </li>
            ))}
          </ol>
          <p className="mt-7 text-base leading-7 text-ink/70">{commercial.adjacent[language]}</p>
        </Container>
      </Section>
      <SelectedCommercialExperience language={language} />
      <Section className="bg-night text-pearl">
        <Container className="grid gap-8 lg:grid-cols-2">
          <div>
            <Eyebrow className="text-champagne">{zh ? "团队与责任" : "PEOPLE & RESPONSIBILITY"}</Eyebrow>
            <h2 className="commercial-heading mt-5">
              {zh ? "懂技术，讲清楚，落到现场。" : "Understand the technology. Make the work concrete."}
            </h2>
          </div>
          <div>
            <p className="text-lg leading-8 text-pearl/80">
              {zh
                ? "工程、能源系统与应用 AI 研究背景，结合客户沟通、品牌表达与英国本地交付。了解各位成员的专业背景与项目职责。"
                : "Engineering, energy systems and applied AI research backgrounds alongside client communication, brand expression and UK delivery. Meet the people and see who owns each responsibility."}
            </p>
            <ButtonLink className="mt-6" href={withLanguage("/about", language)} showArrow>
              {zh ? "了解团队" : "Meet the team"}
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
