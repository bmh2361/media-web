import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PortfolioImage } from "@/components/media/PortfolioImage";
import { ButtonLink } from "@/components/ui/Button";
import {
  commercialCaseCategories,
  getMediaDecision,
  getNextPortfolioProject,
  getProjectHero,
  type PortfolioMedia,
  type PortfolioProject,
  type ProjectLayoutBlock
} from "@/content/portfolio";
import type { Language } from "@/lib/i18n";
import { withLanguage } from "@/lib/i18n";

export function PortfolioProjectDetail({
  project,
  language
}: {
  project: PortfolioProject;
  language: Language;
}) {
  const zh = language === "zh";
  const next = getNextPortfolioProject(project);
  const series = project.contentType === "portfolio-series";
  const visibleBlocks = project.layout.filter((block) =>
    block.media.some((id) => id !== project.heroMediaId)
  );

  return (
    <div
      data-case-archetype={project.archetype}
      data-case-category={project.category}
      data-evidence-level={project.evidenceLevel}
    >
      <CaseStudyHero project={project} language={language} />
      <div className="bg-porcelain text-ink">
        <section className="container-x py-12 lg:py-16" data-case-section="market">
          <Narrative eyebrow="01" title={zh ? "项目背景与沟通重点" : "Project Context & Communication Focus"}>
            {zh ? project.contextZh : project.contextEn}
          </Narrative>
        </section>

        <section
          className="border-y border-ink/15 bg-pearl py-10 lg:py-14"
          data-case-section="responsibility"
        >
          <div className="container-x grid gap-8 lg:grid-cols-2 lg:gap-16">
            <Narrative eyebrow="02" title={zh ? "团队参与与具体内容" : "Team Contribution"}>
              {zh ? project.roleStatementZh : project.roleStatementEn}
            </Narrative>
            <Narrative
              eyebrow={
                series
                  ? zh
                    ? "独立作品选集"
                    : "Independent works"
                  : zh
                    ? "团队项目经验"
                    : "Selected team experience"
              }
              title={zh ? "本页内容" : "In This Selection"}
            >
              {zh ? project.executionZh : project.executionEn}
            </Narrative>
          </div>
        </section>

        {visibleBlocks.length ? (
          <section
            className="bg-mist py-12 lg:py-16"
            data-case-section="visual-evidence"
            aria-label={zh ? "项目影像" : "Project imagery"}
          >
            <div className="container-x space-y-10 lg:space-y-16" data-editorial-media-blocks>
              <h2 className="text-sm uppercase tracking-editorial">
                03 · {zh ? "项目影像" : "Project Imagery"}
              </h2>
              {visibleBlocks.map((block, index) => (
                <div
                  key={`${block.type}-${index}`}
                  data-case-section={index === 0 ? "first-evidence" : undefined}
                >
                  <EditorialBlock block={block} project={project} language={language} />
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="bg-night py-16 text-pearl lg:py-20" data-case-section="related">
          <div className="container-x">
            <p className="text-xs uppercase tracking-editorial text-pearl/60">
              04 · {zh ? "下一次合作" : "Your Next Project"}
            </p>
            <h2 className="editorial-heading mt-6 max-w-[22ch]">
              {zh ? "筹备你的英国或欧洲项目。" : "Plan your next UK or European project."}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-pearl/75">
              {zh
                ? "为下一次品牌发布、行业活动或当地传播需求，与 Venus Bridge 讨论活动内容策划、现场内容制作、英国实景协调及本地执行资源。具体职责、合作方与交付按新项目确认。"
                : "For your next launch, industry event or local communications brief, discuss event content planning, on-site content production, UK locations and local execution resources with Venus Bridge. Responsibilities, collaborators and deliverables are agreed for the new project."}
            </p>
            <div className="mt-8">
              <ButtonLink href={withLanguage("/contact?intent=company", language)} showArrow>
                {zh ? "讨论下一次项目" : "Discuss Your Next Project"}
              </ButtonLink>
            </div>
            <div className="mt-12 border-t border-pearl/20 pt-8">
              <p className="text-xs uppercase tracking-editorial text-pearl/60">
                {zh ? "下一个项目" : "Next project"}
              </p>
              <Link
                href={withLanguage(`/work/${next.slug}`, language)}
                className="mt-6 grid gap-5 border-y border-pearl/20 py-8 text-pearl hover:text-champagne focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne md:grid-cols-[1fr_auto] md:items-end"
              >
                <span className="editorial-heading max-w-[20ch]">{zh ? next.titleZh : next.titleEn}</span>
                <span className="text-xs uppercase tracking-editorial">
                  {next.contentType === "portfolio-series"
                    ? zh
                      ? "作品选集"
                      : "Portfolio series"
                    : commercialCaseCategories[next.category][language]}{" "}
                  ↗
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function CaseStudyHero({ project, language }: { project: PortfolioProject; language: Language }) {
  const zh = language === "zh";
  const hero = getProjectHero(project);
  const series = project.contentType === "portfolio-series";
  const split = project.heroLayout === "portrait" || project.heroLayout === "editorial-split";
  const title = zh ? project.titleZh : project.titleEn;
  const statement = zh ? project.commercialObjectiveZh : project.commercialObjectiveEn;
  const intro = (
    <>
      <p className="text-xs uppercase tracking-editorial text-pearl/70">
        {series
          ? zh
            ? "独立作品选集"
            : "Independent works"
          : commercialCaseCategories[project.category][language]}
      </p>
      {!series ? (
        <p className="mt-3 text-xs text-pearl/60">{zh ? "团队项目经验" : "Selected team experience"}</p>
      ) : null}
      <h1 className="type-display-page zh-display-measure mt-6 max-w-[20ch] [font-size:clamp(2.65rem,5.6vw,6.2rem)]">
        {title}
      </h1>
      <p className="text-pearl/78 mt-7 max-w-[39rem] border-l border-champagne/45 pl-5 text-lg leading-8">
        {statement}
      </p>
    </>
  );
  return (
    <section
      className="bg-ink pt-32 text-pearl"
      data-case-section="hero"
      data-hero-layout={project.heroLayout}
    >
      <div className="container-x pb-14 lg:pb-20">
        <Link
          href={withLanguage("/work", language)}
          className="inline-flex min-h-11 items-center gap-2 text-sm text-pearl/70 hover:text-pearl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne"
        >
          <ArrowLeft size={16} /> {zh ? "返回案例研究" : "Back to case studies"}
        </Link>
        {split ? (
          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">{intro}</div>
            {hero ? (
              <div className="flex justify-center lg:col-span-5 lg:col-start-8">
                <PortfolioImage
                  media={hero}
                  language={language}
                  className="w-full max-w-[620px]"
                  sizes="(min-width:1024px) 42vw, 92vw"
                  fit="natural"
                  priority
                  mediaRole="editorial-natural"
                />
              </div>
            ) : null}
          </div>
        ) : (
          <>
            <div className="mt-10 lg:max-w-[62rem]">{intro}</div>
            {hero ? (
              <div className="mt-12 max-w-[1320px]">
                <PortfolioImage
                  media={hero}
                  language={language}
                  className="w-full"
                  sizes="(min-width:1440px) 1320px, 94vw"
                  fit={project.heroLayout === "contained" ? "contain" : "natural"}
                  priority
                  mediaRole="editorial-natural"
                />
              </div>
            ) : null}
          </>
        )}
        <dl className="mt-12 grid border-y border-pearl/15 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [zh ? "完整项目名称" : "Project / Brand", zh ? project.eventNameZh : project.eventNameEn],
            [
              zh ? "地点 / 年份" : "Location / year",
              [project.location, project.year].filter(Boolean).join(" · ")
            ],
            [zh ? "项目类型" : "Project type", zh ? project.projectTypeZh : project.projectTypeEn],
            [
              zh ? "团队贡献" : "Team contribution",
              zh ? project.participationSummaryZh : project.participationSummaryEn
            ]
          ].map(([label, value]) => (
            <div
              key={label}
              className="border-b border-pearl/10 py-5 sm:px-5 lg:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <dt className="text-[11px] uppercase tracking-editorial text-pearl/65">{label}</dt>
              <dd className="text-pearl/78 mt-3 text-sm leading-6">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function EditorialBlock({
  block,
  project,
  language
}: {
  block: ProjectLayoutBlock;
  project: PortfolioProject;
  language: Language;
}) {
  const items = block.media
    .map((mediaId) => project.media.find((media) => media.id === mediaId))
    .filter((media): media is PortfolioMedia => Boolean(media))
    .filter((media) => media.id !== project.heroMediaId);
  if (!items.length) return null;
  if (items.length === 1)
    return (
      <div className={block.type === "offset" && block.side === "right" ? "flex justify-end" : ""}>
        <Media project={project} media={items[0]} language={language} />
      </div>
    );
  if (block.type === "portrait-focus")
    return (
      <div className="grid gap-8 md:grid-cols-2 md:items-start">
        {items.map((media) => (
          <Media key={media.id} project={project} media={media} language={language} />
        ))}
      </div>
    );
  if (block.type === "triptych" && items.every((media) => media.width > media.height))
    return (
      <div className="space-y-8">
        <Media project={project} media={items[0]} language={language} />
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          {items.slice(1).map((media) => (
            <Media key={media.id} project={project} media={media} language={language} />
          ))}
        </div>
      </div>
    );
  if (block.type === "triptych")
    return (
      <div className="grid gap-8 md:grid-cols-12 md:items-start">
        {items.map((media) => (
          <div key={media.id} className={media.width < media.height ? "md:col-span-4" : "md:col-span-8"}>
            <Media project={project} media={media} language={language} />
          </div>
        ))}
      </div>
    );
  const split =
    block.type === "pair" && block.split === "7-5"
      ? "md:grid-cols-[7fr_5fr]"
      : block.type === "pair" && block.split === "5-7"
        ? "md:grid-cols-[5fr_7fr]"
        : "md:grid-cols-2";
  return (
    <div
      className={`grid gap-8 ${split} ${block.type === "pair" && block.align === "bottom" ? "items-end" : block.type === "pair" && block.align === "centre" ? "items-center" : "items-start"}`}
    >
      {items.map((media) => (
        <Media key={media.id} project={project} media={media} language={language} />
      ))}
    </div>
  );
}

function Media({
  project,
  media,
  language
}: {
  project: PortfolioProject;
  media: PortfolioMedia;
  language: Language;
}) {
  const decision = getMediaDecision(project, media.id);
  const alignment = decision?.role === "detail" ? "mx-auto" : decision?.role === "closing" ? "ml-auto" : "";
  return (
    <div
      className={`w-full ${alignment}`}
      style={{ maxWidth: decision?.maxDisplayWidth ?? 1200 }}
      data-media-narrative-role={decision?.role}
      data-media-width={decision?.width}
      data-mobile-reveal
    >
      <PortfolioImage
        media={media}
        language={language}
        className="w-full"
        sizes={
          decision?.width === "detail" || decision?.width === "portrait"
            ? "(min-width:768px) 42vw, 92vw"
            : "(min-width:1280px) 1100px, 92vw"
        }
        fit="natural"
        mediaRole="editorial-natural"
      />
    </div>
  );
}

function Narrative({
  eyebrow,
  title,
  children
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="border-t border-ink/15 pt-5">
      <p className="text-xs text-ink/65">{eyebrow}</p>
      <h2 className="mt-5 text-xs uppercase tracking-editorial text-slate">{title}</h2>
      <p className="mt-5 max-w-4xl text-lg leading-8">{children}</p>
    </article>
  );
}
