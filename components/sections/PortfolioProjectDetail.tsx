import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PortfolioImage } from "@/components/media/PortfolioImage";
import { ButtonLink } from "@/components/ui/Button";
import {
  commercialCaseCategories,
  getMediaDecision,
  getNextPortfolioProject,
  getProjectHero,
  type CaseCapability,
  type PortfolioMedia,
  type PortfolioProject,
  type ProjectLayoutBlock
} from "@/content/portfolio";
import type { Language } from "@/lib/i18n";
import { withLanguage } from "@/lib/i18n";

const capabilityZh: Record<CaseCapability, string> = {
  "Event Documentation": "活动记录",
  "Content Production": "内容制作",
  "Brand Presentation": "品牌呈现",
  "Local Production": "本地制作",
  "UK Location Coordination": "英国实景协调",
  "Post-project Assets": "项目后续资产"
};

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
  const roles = zh ? project.venusRoleZh : project.venusRoleEn;
  const value = zh ? project.continuedValueZh : project.continuedValueEn;
  const visibleBlocks = project.layout.filter((block) =>
    block.media.some((id) => id !== project.heroMediaId)
  );
  const [firstBlock, ...remainingBlocks] = visibleBlocks;

  return (
    <div
      data-case-archetype={project.archetype}
      data-case-category={project.category}
      data-evidence-level={project.evidenceLevel}
    >
      <CaseStudyHero project={project} language={language} />
      <div className="bg-porcelain text-ink">
        <section
          className="container-x grid gap-12 py-16 md:grid-cols-2 lg:gap-24 lg:py-24"
          data-case-section="market"
        >
          <Narrative
            eyebrow="01"
            title={series ? (zh ? "内容语境" : "The Content Context") : zh ? "市场背景" : "The Market Moment"}
          >
            {zh ? project.contextZh : project.contextEn}
          </Narrative>
          <Narrative
            eyebrow={zh ? "沟通重点" : "Communication focus"}
            title={zh ? "项目挑战" : "Project Challenge"}
          >
            {zh ? project.projectChallengeZh : project.projectChallengeEn}
          </Narrative>
        </section>

        {firstBlock ? (
          <section
            className="border-y border-ink/15 bg-mist py-10 lg:py-16"
            data-case-section="first-evidence"
          >
            <div className="container-x" data-editorial-media-blocks>
              <EditorialBlock block={firstBlock} project={project} language={language} />
            </div>
          </section>
        ) : null}

        <section className="bg-pearl py-16 lg:py-24" data-case-section="responsibility">
          <div className="container-x grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs uppercase tracking-editorial text-ink/70">
                02 · {zh ? "团队贡献" : "Our Contribution"}
              </p>
              <h2 className="editorial-heading mt-5 max-w-[16ch]">
                {zh ? "在项目中承担的工作。" : "Our part in the project."}
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-2xl leading-9">{zh ? project.roleStatementZh : project.roleStatementEn}</p>
              <ul className="mt-8 grid gap-3 border-t border-ink/15 pt-6 sm:grid-cols-2">
                {roles.map((role) => (
                  <li key={role} className="text-lg leading-7">
                    {role}
                  </li>
                ))}
              </ul>
              <ul className="mt-8 flex flex-wrap gap-2" aria-label={zh ? "项目能力" : "Project capabilities"}>
                {project.capabilities.map((capability) => (
                  <li
                    key={capability}
                    className="border border-ink/20 px-3 py-2 text-xs uppercase tracking-[0.1em]"
                  >
                    {zh ? capabilityZh[capability] : capability}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-y border-ink/15 py-16 lg:py-24" data-case-section="outputs">
          <div className="container-x grid gap-12 md:grid-cols-2 lg:gap-24">
            <Narrative eyebrow="03" title={zh ? "执行与项目价值" : "Delivery & Project Value"}>
              {zh ? project.executionZh : project.executionEn}
            </Narrative>
            <Narrative
              eyebrow={zh ? "后续用途" : "Potential use"}
              title={zh ? "与未来项目的关系" : "Relevance to Future Projects"}
            >
              {value?.join(" ")}
            </Narrative>
          </div>
        </section>

        {remainingBlocks.length ? (
          <section
            className="bg-mist py-16 lg:py-24"
            data-case-section="visual-evidence"
            aria-label={zh ? "项目影像" : "Project imagery"}
          >
            <div className="container-x space-y-10 lg:space-y-16">
              {remainingBlocks.map((block, index) => (
                <EditorialBlock
                  key={`${block.type}-${index}`}
                  block={block}
                  project={project}
                  language={language}
                />
              ))}
            </div>
          </section>
        ) : null}

        <section className="bg-night py-16 text-pearl lg:py-20" data-case-section="related">
          <div className="container-x">
            <p className="text-xs uppercase tracking-editorial text-pearl/60">
              04 · {zh ? "合作入口" : "Related Opportunity"}
            </p>
            <h2 className="editorial-heading mt-6 max-w-[22ch]">
              {zh ? "筹备你的英国或欧洲项目。" : "Plan your next UK or European project."}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-pearl/75">
              {zh
                ? "从目标受众、市场场景与实际交付需求开始，讨论适合此次项目的内容与本地执行安排。"
                : "Start with the audience, market setting and delivery needs, then discuss the content and local execution appropriate to your project."}
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
  const statement = zh ? project.projectValueZh : project.projectValueEn;
  const intro = (
    <>
      <p className="text-xs uppercase tracking-editorial text-pearl/70">
        {series
          ? zh
            ? "精选能力项目"
            : "Selected capability work"
          : commercialCaseCategories[project.category][language]}
      </p>
      {!series ? (
        <p className="mt-3 text-xs text-pearl/60">{zh ? "团队项目经验" : "Selected team experience"}</p>
      ) : null}
      <h1 className="type-display-page zh-display-measure mt-6 max-w-[14ch] [font-size:clamp(2.65rem,5.6vw,6.2rem)]">
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
            [
              zh ? "项目 / 品牌" : "Project / Brand",
              project.clientName ?? (zh ? "内容选集" : "Content selection")
            ],
            [
              zh ? "地点 / 年份" : "Location / year",
              [project.location, project.year].filter(Boolean).join(" · ")
            ],
            [zh ? "项目类型" : "Project type", zh ? project.projectTypeZh : project.projectTypeEn],
            [
              zh ? "团队贡献" : "Team contribution",
              (zh ? project.venusRoleZh : project.venusRoleEn).join(" · ")
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
      <p className="mt-5 text-2xl leading-9">{children}</p>
    </article>
  );
}
