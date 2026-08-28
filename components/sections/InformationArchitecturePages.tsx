import Link from "next/link";
import { CapabilityImage } from "@/components/media/CapabilityImage";
import { PortfolioImage } from "@/components/media/PortfolioImage";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  EntertainmentCulturePage,
  TechnologyAiResearchPage
} from "@/components/sections/CapabilityExpertisePages";
import { Container } from "@/components/ui/Container";
import { EditorialLink } from "@/components/ui/EditorialLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { capabilityMediaById } from "@/content/capability-media";
import {
  expertiseSectors,
  pathLabels,
  projectPaths,
  type ExpertiseDefinition,
  type PathDefinition
} from "@/content/information-architecture";
import { findPortfolioMedia, findPortfolioProject, type PortfolioProject } from "@/content/portfolio";
import type { Language } from "@/lib/i18n";
import { withLanguage } from "@/lib/i18n";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/structured-data";

export function WhatWeDoOverview({ language }: { language: Language }) {
  const zh = language === "zh";
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd({
          lang: language,
          items: [
            { name: "Venus Bridge", path: "/" },
            { name: zh ? "我们能做什么" : "What We Do", path: "/what-we-do" }
          ]
        })}
      />
      <PageHero
        eyebrow={zh ? "我们能做什么" : "WHAT WE DO"}
        title={
          zh
            ? "从内容制作、市场发布到英国落地，用三条清晰路径推进项目。"
            : "Three routes for creating, launching and building a UK presence."
        }
        intro={
          zh
            ? "我们把创意制作、人才、现场执行、本地协调和中英双语沟通整合进同一项目体系。"
            : "Creative production, talent, live delivery, local execution and bilingual coordination in one project system."
        }
      />
      <Section className="bg-porcelain">
        <Container>
          <div className="divide-y divide-ink/15 border-y border-ink/15">
            {projectPaths.map((path, index) => (
              <article key={path.slug} className="grid gap-6 py-9 lg:grid-cols-[4rem_.8fr_1.2fr_auto]">
                <span className="text-champagne">0{index + 1}</span>
                <div>
                  <h2 className="text-3xl font-medium">{path.title[language]}</h2>
                  <p className="mt-3 text-sm leading-6 text-ink/60">{path.headline[language]}</p>
                </div>
                <p className="text-base leading-7 text-ink/70">{path.intro[language]}</p>
                <EditorialLink href={withLanguage(`/what-we-do/${path.slug}`, language)}>
                  {zh ? "查看路径" : "Explore route"}
                </EditorialLink>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <SimpleCta language={language} />
    </>
  );
}

export function PathDetailPage({ language, path }: { language: Language; path: PathDefinition }) {
  const zh = language === "zh";
  const media = path.mediaIds
    .map(capabilityMediaById)
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          lang: language,
          name: path.title[language],
          description: path.intro[language],
          path: `/what-we-do/${path.slug}`
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd({
          lang: language,
          items: [
            { name: "Venus Bridge", path: "/" },
            { name: zh ? "我们能做什么" : "What We Do", path: "/what-we-do" },
            { name: path.title[language], path: `/what-we-do/${path.slug}` }
          ]
        })}
      />
      <PageHero
        eyebrow={zh ? "客户路径" : "PROJECT PATH"}
        title={path.title[language]}
        intro={path.intro[language]}
      />
      {media[0] ? (
        <div className="bg-ink pb-10">
          <CapabilityImage
            media={media[0]}
            language={language}
            className="container-x aspect-[16/7]"
            sizes="100vw"
            priority
          />
        </div>
      ) : null}
      <Section compact className="bg-pearl">
        <Container className="grid gap-8 lg:grid-cols-[.65fr_1.35fr]">
          <div>
            <Eyebrow>{zh ? "适合谁" : "WHO THIS ROUTE IS FOR"}</Eyebrow>
            <h2 className="mt-5 text-4xl font-medium">
              {zh ? "从客户目标开始。" : "Start with the client objective."}
            </h2>
          </div>
          <ul className="divide-y divide-ink/15 border-y border-ink/15">
            {path.clients[language].map((item) => (
              <li key={item} className="py-5 text-lg">
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <Section className="bg-porcelain">
        <Container>
          <Eyebrow>{zh ? "项目范围" : "PROJECT SCOPE"}</Eyebrow>
          <div className="mt-10 divide-y divide-ink/15 border-y border-ink/15">
            {path.modules.map((module) => (
              <article
                id={module.id}
                key={module.id}
                className="grid scroll-mt-28 gap-6 py-8 lg:grid-cols-[.75fr_1.25fr]"
              >
                <h2 className="text-3xl font-medium">{module.title[language]}</h2>
                <div>
                  <p className="max-w-3xl text-base leading-7 text-ink/70">{module.text[language]}</p>
                  <p className="mt-4 text-sm text-ink/55">{module.items[language].join(" · ")}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      {media.length > 1 ? (
        <Section compact className="bg-ink text-pearl">
          <Container>
            <Eyebrow className="text-champagne">{zh ? "执行现场" : "PRODUCTION IN CONTEXT"}</Eyebrow>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {media.slice(1, path.slug === "enter-the-uk" ? 1 : 5).map((item) => (
                <CapabilityImage
                  key={item.id}
                  media={item}
                  language={language}
                  className="aspect-[4/3]"
                  sizes="(min-width:1024px) 25vw, 50vw"
                />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}
      {path.directScope && path.specialistScope ? (
        <Section compact className="bg-ink text-pearl">
          <Container>
            <Eyebrow className="text-champagne">{zh ? "责任边界" : "RESPONSIBILITY BOUNDARIES"}</Eyebrow>
            <div className="mt-9 grid gap-px bg-pearl/15 lg:grid-cols-2">
              <ScopeList
                title={zh ? "Venus Bridge 直接提供" : "Venus Bridge provides"}
                items={path.directScope[language]}
              />
              <ScopeList
                title={zh ? "独立专业机构提供" : "Independent specialists provide"}
                items={path.specialistScope[language]}
              />
            </div>
          </Container>
        </Section>
      ) : null}
      <WorkSection language={language} slugs={path.projectSlugs} />
      <ScenarioSection language={language} path={path} />
      <SimpleCta language={language} project={path.slug} />
    </>
  );
}

export function ExpertiseOverview({ language }: { language: Language }) {
  const zh = language === "zh";
  return (
    <>
      <PageHero
        eyebrow={zh ? "专业领域" : "EXPERTISE"}
        title={zh ? "行业理解，决定制作路径是否准确。" : "Sector understanding shapes better production."}
        intro={
          zh
            ? "四个重点领域共享同一交付体系，同时保留各自的审批、人才、现场和传播特点。"
            : "Four focus sectors share one delivery system while retaining distinct approval, talent, live and communication needs."
        }
      />
      <Section className="bg-porcelain">
        <Container className="grid gap-x-5 gap-y-12 lg:grid-cols-2">
          {expertiseSectors.map((sector) => {
            const portfolio = findPortfolioMedia(sector.heroProjectId);
            const capability = sector.homepageMediaId
              ? capabilityMediaById(sector.homepageMediaId)
              : undefined;
            return (
              <article key={sector.slug}>
                {capability ? (
                  <CapabilityImage
                    media={capability}
                    language={language}
                    className="aspect-[16/10]"
                    sizes="50vw"
                  />
                ) : portfolio ? (
                  <PortfolioImage
                    media={portfolio}
                    language={language}
                    className="aspect-[16/10]"
                    sizes="50vw"
                  />
                ) : null}
                <h2 className="mt-6 text-3xl font-medium">{sector.title[language]}</h2>
                <p className="mt-3 text-base leading-7 text-ink/65">{sector.challenge[language]}</p>
                <EditorialLink href={withLanguage(`/industries/${sector.slug}`, language)} className="mt-5">
                  {zh ? "查看专业领域" : "Explore expertise"}
                </EditorialLink>
              </article>
            );
          })}
        </Container>
      </Section>
      <SimpleCta language={language} />
    </>
  );
}

export function ExpertiseDetailPage({
  language,
  sector
}: {
  language: Language;
  sector: ExpertiseDefinition;
}) {
  if (sector.slug === "entertainment-culture")
    return <EntertainmentCulturePage language={language} sector={sector} />;
  if (sector.slug === "technology-ai-research")
    return <TechnologyAiResearchPage language={language} sector={sector} />;
  const zh = language === "zh";
  const media = findPortfolioMedia(sector.heroProjectId);
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          lang: language,
          name: sector.title[language],
          description: sector.subtitle[language],
          path: `/industries/${sector.slug}`
        })}
      />
      <PageHero
        eyebrow={zh ? "专业领域" : "EXPERTISE"}
        title={sector.title[language]}
        intro={sector.subtitle[language]}
      />
      {media ? (
        <div className="bg-ink pb-10">
          <PortfolioImage
            media={media}
            language={language}
            className="container-x aspect-[16/7]"
            sizes="100vw"
            priority
          />
        </div>
      ) : null}
      <Section compact className="bg-pearl">
        <Container className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <h2 className="text-4xl font-medium">
            {zh ? "这个领域真正困难的是什么？" : "What is difficult in this sector?"}
          </h2>
          <p className="text-xl leading-8 text-ink/70">{sector.challenge[language]}</p>
        </Container>
      </Section>
      <Section className="bg-porcelain">
        <Container>
          <div className="grid gap-px bg-ink/15 lg:grid-cols-2">
            <ScopeList
              light
              title={zh ? "我们可以制作" : "What we can produce"}
              items={sector.produce[language]}
            />
            <ScopeList
              light
              title={zh ? "我们可以统筹" : "What we can coordinate"}
              items={sector.coordinate[language]}
            />
          </div>
          <div className="mt-16 grid gap-10 lg:grid-cols-2">
            {sector.modules.map((module) => (
              <article key={module.title.en} className="border-t border-ink/15 pt-6">
                <h2 className="text-3xl font-medium">{module.title[language]}</h2>
                <p className="mt-5 text-base leading-7 text-ink/65">{module.text[language]}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <WorkSection language={language} slugs={sector.projectSlugs} />
      <RelatedPathStrip language={language} sector={sector} />
      <SimpleCta language={language} />
    </>
  );
}

export function HomepageExpertise({ language }: { language: Language }) {
  const zh = language === "zh";
  return (
    <Section compact className="bg-porcelain">
      <Container>
        <Eyebrow>{zh ? "专业领域" : "EXPERTISE"}</Eyebrow>
        <h2 className="editorial-heading mt-5 max-w-[15ch]">
          {zh ? "四个领域，同一套克制而清晰的制作体系。" : "Four sectors, one disciplined production system."}
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {expertiseSectors.map((sector) => {
            const portfolio = findPortfolioMedia(sector.heroProjectId);
            const capability = sector.homepageMediaId
              ? capabilityMediaById(sector.homepageMediaId)
              : undefined;
            return (
              <Link
                key={sector.slug}
                href={withLanguage(`/industries/${sector.slug}`, language)}
                className="group block"
              >
                {capability ? (
                  <CapabilityImage
                    media={capability}
                    language={language}
                    className="aspect-[4/5]"
                    sizes="(min-width:1024px) 25vw, 50vw"
                  />
                ) : portfolio ? (
                  <PortfolioImage
                    media={portfolio}
                    language={language}
                    className="aspect-[4/5]"
                    sizes="(min-width:1024px) 25vw, 50vw"
                  />
                ) : null}
                <h3 className="mt-5 text-xl font-medium group-hover:text-champagne">
                  {sector.title[language]}
                </h3>
                <p className="mt-3 text-sm leading-6 text-ink/60">{sector.subtitle[language]}</p>
              </Link>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return (
    <section className="bg-ink pt-16 text-pearl">
      <div className="container-x py-20 lg:py-28">
        <p className="eyebrow text-champagne">{eyebrow}</p>
        <h1 className="editorial-heading mt-5 max-w-[16ch]">{title}</h1>
        <p className="body-large mt-7 max-w-3xl text-pearl/65">{intro}</p>
      </div>
    </section>
  );
}
function WorkSection({ language, slugs }: { language: Language; slugs: string[] }) {
  const zh = language === "zh";
  const projects = slugs
    .map(findPortfolioProject)
    .filter((item): item is PortfolioProject => Boolean(item))
    .slice(0, 3);
  if (!projects.length) return null;
  return (
    <Section compact className="bg-pearl">
      <Container>
        <Eyebrow>{zh ? "相关真实项目" : "RELEVANT WORK"}</Eyebrow>
        <div className="mt-9 grid gap-7 md:grid-cols-3">
          {projects.map((project) => (
            <Link key={project.slug} href={withLanguage(`/work/${project.slug}`, language)}>
              <PortfolioImage
                media={project.media[1] ?? project.media[0]}
                language={language}
                className="aspect-[4/3]"
                sizes="33vw"
              />
              <h3 className="mt-5 text-xl font-medium">{zh ? project.titleZh : project.titleEn}</h3>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
function ScenarioSection({ language, path }: { language: Language; path: PathDefinition }) {
  const zh = language === "zh";
  return (
    <Section id="typical-project-route" compact className="scroll-mt-28 bg-mist">
      <Container>
        <Eyebrow>{zh ? "典型项目路径" : "TYPICAL PROJECT ROUTE"}</Eyebrow>
        <p className="mt-5 max-w-3xl text-base leading-7 text-ink/65">
          {zh
            ? "以下为能力路径，不是已完成客户项目。"
            : "The following are capability routes, not completed client projects."}
        </p>
        <div className="mt-9 grid gap-px bg-ink/15 lg:grid-cols-2">
          {path.scenarios.map((item) => (
            <article key={item.id} className="bg-pearl p-7">
              <h2 className="text-3xl font-medium">{item.title[language]}</h2>
              <p className="mt-5 text-base leading-7 text-ink/65">{item.clientObjective[language]}</p>
              <p className="mt-5 text-sm text-ink/55">{item.coordination[language].join(" · ")}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
function ScopeList({ title, items, light = false }: { title: string; items: string[]; light?: boolean }) {
  return (
    <div className={light ? "bg-pearl p-7 lg:p-10" : "bg-night p-7 lg:p-10"}>
      <h2 className="text-2xl font-medium">{title}</h2>
      <ul className={`mt-6 divide-y ${light ? "divide-ink/15" : "divide-pearl/15"}`}>
        {items.map((item) => (
          <li key={item} className="py-4 text-sm leading-6">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
function RelatedPathStrip({ language, sector }: { language: Language; sector: ExpertiseDefinition }) {
  const zh = language === "zh";
  return (
    <Section compact className="bg-ink text-pearl">
      <Container>
        <Eyebrow className="text-champagne">{zh ? "相关客户路径" : "RELATED PATHS"}</Eyebrow>
        <div className="mt-8 flex flex-wrap gap-8">
          {sector.relatedPaths.map((path) => (
            <EditorialLink
              key={path}
              href={withLanguage(`/what-we-do/${path}`, language)}
              className="text-pearl"
            >
              {pathLabels[path][language]}
            </EditorialLink>
          ))}
        </div>
      </Container>
    </Section>
  );
}
function SimpleCta({ language, project }: { language: Language; project?: string }) {
  const zh = language === "zh";
  return (
    <Section compact className="bg-ink text-pearl">
      <Container className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <Eyebrow className="text-champagne">{zh ? "开始项目" : "START A PROJECT"}</Eyebrow>
          <h2 className="editorial-heading mt-5 max-w-[14ch]">
            {zh
              ? "从目标开始，我们会梳理适合的英国路径。"
              : "Start with the objective. We will map the right UK route."}
          </h2>
        </div>
        <EditorialLink
          href={`${withLanguage("/contact", language)}${project ? `?project=${project}` : ""}`}
          className="text-pearl"
        >
          {zh ? "提交项目需求" : "Send a project brief"}
        </EditorialLink>
      </Container>
    </Section>
  );
}
