import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { HomeHeroExperience, type HomeHeroScene } from "@/components/sections/phase32c/HomeHeroExperience";
import {
  CommercialProcess,
  DemandInvitation,
  Engagements,
  SelectedCommercialExperience,
  Situations
} from "@/components/sections/CommercialSections";
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
              <ButtonLink href={withLanguage("/contact?intent=company#company", language)} showArrow>
                {commercial.companyCta[language]}
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
      <Situations language={language} />
      <Engagements language={language} />
      <CommercialProcess language={language} />
      <SelectedCommercialExperience language={language} />
      <Section className="bg-porcelain" data-commercial-section="why">
        <Container>
          <Eyebrow>{zh ? "为什么选择 Venus Bridge" : "WHY VENUS BRIDGE"}</Eyebrow>
          <h2 className="commercial-heading mt-5">
            {zh
              ? "理解技术，也把本地工作做具体。"
              : "Technical understanding, clear communication and local delivery."}
          </h2>
          <div className="mt-10 grid gap-x-12 border-t border-ink/15 md:grid-cols-2">
            {commercial.advantages[language].map(([title, text]) => (
              <article key={title} className="border-b border-ink/15 py-7">
                <h3 className="text-xl font-medium">{title}</h3>
                <p className="mt-4 max-w-xl text-base leading-7 text-ink/70">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <h3 className="text-xl font-medium">
              {zh ? "聚焦科技与产业创新" : "Technology & Industrial Innovation"}
            </h3>
            <ul className="space-y-3 text-sm leading-7 text-ink/75">
              {commercial.sectors[language].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-sm leading-7 text-ink/65 lg:col-start-2">{commercial.adjacent[language]}</p>
          </div>
        </Container>
      </Section>
      <DemandInvitation language={language} />
    </>
  );
}
