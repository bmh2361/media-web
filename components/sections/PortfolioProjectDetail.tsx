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

function caseChallenge(project: PortfolioProject, zh: boolean) {
  if (project.contentType === "portfolio-series") {
    return zh
      ? "把不同内容形式整理成一组连贯、易于判断的能力证明。"
      : "Bring distinct content formats together as a clear demonstration of our capabilities.";
  }
  if (project.archetype === "market-presence-launch") {
    return zh
      ? "在时间有限的发布现场，同时清楚呈现产品、人物与当地市场环境。"
      : "Make the product, people and local market setting clear within a time-bound live launch.";
  }
  if (project.archetype === "industry-event-presence") {
    return zh
      ? "把产品或技术细节与更完整的欧洲行业现场连接在同一组记录中。"
      : "Connect product or technical detail with the wider European industry setting in one useful record.";
  }
  if (project.archetype === "talent-activation") {
    return zh
      ? "在精炼的公开内容中，同时保留演出主体、现场氛围与伦敦环境。"
      : "Preserve the performer, live atmosphere and London setting in a concise public selection.";
  }
  return zh
    ? "让不同实景、人物或内容形式形成统一、可继续使用的品牌表达。"
    : "Turn distinct locations, people or content formats into a coherent body of reusable branded content.";
}

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
  const context = zh ? project.contextZh : project.contextEn;
  const objective = zh ? project.commercialObjectiveZh : project.commercialObjectiveEn;
  const execution = zh ? project.executionZh : project.executionEn;
  const roles = zh ? project.venusRoleZh : project.venusRoleEn;
  const structure = zh ? project.structureZh : project.structureEn;
  const visibleBlocks = project.layout.filter((block) =>
    block.media.some((id) => id !== project.heroMediaId)
  );
  const firstBlock = visibleBlocks[0];
  const remainingBlocks = visibleBlocks.slice(1);
  const challenge = caseChallenge(project, zh);

  if (project.commercialNarrative) {
    return <CommercialProjectDetail project={project} language={language} />;
  }

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
          data-case-section="objective"
        >
          <Narrative eyebrow="01" title={zh ? "项目目标" : "Project Objective"}>
            {objective}
          </Narrative>
          <Narrative eyebrow="02" title={zh ? "商业背景" : "Business Context"}>
            {context ?? (zh ? project.projectTypeZh : project.projectTypeEn)}
          </Narrative>
        </section>

        <section className="border-y border-ink/15 bg-pearl py-14 lg:py-20" data-case-section="challenge">
          <div className="container-x grid gap-8 lg:grid-cols-12">
            <p className="text-xs uppercase tracking-editorial text-ink/70 lg:col-span-3">
              03 · {zh ? "挑战" : "Challenge"}
            </p>
            <p className="max-w-3xl text-2xl leading-9 lg:col-span-7 lg:col-start-5">{challenge}</p>
          </div>
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
                04 · {zh ? "Venus Bridge 职责" : "Venus Bridge Role"}
              </p>
              <h2 className="editorial-heading mt-5 max-w-[12ch]">
                {series
                  ? zh
                    ? "经核实的内容能力。"
                    : "A clear demonstration of our capabilities."
                  : zh
                    ? "本项目中实际承担的工作。"
                    : "The work delivered within this project."}
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-2xl leading-9">{zh ? project.roleStatementZh : project.roleStatementEn}</p>
              <ul
                className="mt-8 flex flex-wrap gap-2"
                aria-label={zh ? "已核实能力" : "Verified capabilities"}
              >
                {project.capabilities.map((capability) => (
                  <li
                    key={capability}
                    className="border border-ink/20 px-3 py-2 text-xs uppercase tracking-[0.1em]"
                  >
                    {zh ? capabilityZh[capability] : capability}
                  </li>
                ))}
              </ul>
              <div className="mt-10 border-t border-ink/15 pt-6">
                <p className="text-xs uppercase tracking-editorial text-ink/70">
                  {zh ? "记录中的工作范围" : "Scope on record"}
                </p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {roles.map((role) => (
                    <li key={role} className="text-lg leading-7">
                      {role}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-ink/15 py-16 lg:py-24" data-case-section="structure">
          <div className="container-x">
            <p className="text-xs uppercase tracking-editorial text-ink/70">
              05 · {zh ? "策略与方法" : "Strategy / Approach"}
            </p>
            <ol className="mt-10 grid border-y border-ink/15 md:grid-cols-3">
              {structure.map((step, index) => (
                <li
                  key={step}
                  className="border-b border-ink/15 py-7 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0 lg:min-h-48"
                >
                  <span className="text-xs tabular-nums text-ink/65">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-8 text-xl leading-8 lg:mt-10">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-mist py-16 lg:py-24" data-case-section="visual-evidence">
          <div className="container-x">
            <div className="grid gap-8 border-b border-ink/15 pb-7 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <p className="text-xs uppercase tracking-editorial text-ink/70">
                  06 · {zh ? "本地执行" : "Local Delivery"}
                </p>
                <h2 className="editorial-heading mt-4">
                  {series
                    ? zh
                      ? "内容制作与筛选"
                      : "Content production and selection"
                    : zh
                      ? "现场工作"
                      : "On the ground"}
                </h2>
              </div>
              <p className="max-w-[44ch] text-base leading-7 text-ink/70 lg:col-span-4 lg:col-start-9">
                {execution}
              </p>
            </div>
            {remainingBlocks.length ? (
              <div className="mt-12 space-y-10 lg:space-y-16">
                {remainingBlocks.map((block, index) => (
                  <EditorialBlock
                    key={`${block.type}-${index}`}
                    block={block}
                    project={project}
                    language={language}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </section>

        <section className="bg-porcelain py-16 lg:py-24" data-case-section="outputs">
          <div className="container-x grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-xs uppercase tracking-editorial text-ink/70">
                07 · {zh ? "交付与成果" : "Outputs / Outcomes"}
              </p>
              <h2 className="editorial-heading mt-5 max-w-[14ch]">
                {zh
                  ? `${project.media.length} 张获准公开使用的项目影像。`
                  : `${project.media.length} approved public project images.`}
              </h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="text-xs uppercase tracking-editorial text-ink/70">
                {zh ? "已核实工作" : "Verified work"}
              </p>
              <ul className="mt-5 border-t border-ink/15">
                {roles.map((role) => (
                  <li key={role} className="border-b border-ink/15 py-4 text-base">
                    {role}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-night py-16 text-pearl lg:py-20" data-case-section="related">
          <div className="container-x">
            <p className="text-xs uppercase tracking-editorial text-pearl/60">
              08 · {zh ? "项目之后仍可使用的价值" : "What Remained Useful"}
            </p>
            <h2 className="editorial-heading mt-6 max-w-[16ch]">
              {zh ? project.projectValueZh : project.projectValueEn}
            </h2>
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
                      ? "能力证据"
                      : "Capability evidence"
                    : commercialCaseCategories[next.category][language]}{" "}
                  ↗
                </span>
              </Link>
            </div>
            <div className="mt-8">
              <ButtonLink href={withLanguage("/contact?intent=company", language)} showArrow>
                {zh ? "讨论类似市场目标" : "Discuss a Similar Market Goal"}
              </ButtonLink>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function CommercialProjectDetail({ project, language }: { project: PortfolioProject; language: Language }) {
  const zh = language === "zh";
  const narrative = project.commercialNarrative!;
  const visibleBlocks = project.layout.filter((block) =>
    block.media.some((id) => id !== project.heroMediaId)
  );
  const [firstBlock, ...remainingBlocks] = visibleBlocks;
  const next = getNextPortfolioProject(project);
  const text = (value: { en: string; zh: string }) => value[language];
  return (
    <div
      data-case-tier="commercial"
      data-case-archetype={project.archetype}
      data-case-category={project.category}
      data-evidence-level={project.evidenceLevel}
      data-engagement-type={project.engagementType}
      data-geography={project.geography}
    >
      <CaseStudyHero project={project} language={language} />
      <div className="bg-porcelain text-ink">
        <section
          className="container-x grid gap-12 py-16 lg:grid-cols-2 lg:gap-24 lg:py-24"
          data-case-section="market-context"
        >
          <Narrative eyebrow="01" title={zh ? "市场节点" : "Market Moment"}>
            {text(narrative.marketMoment.text)}
          </Narrative>
          <Narrative eyebrow="02" title={zh ? "为何重要" : "Why It Mattered"}>
            {text(narrative.whyItMattered.text)}
          </Narrative>
        </section>
        <section className="border-y border-ink/15 bg-pearl py-16 lg:py-24" data-case-section="objective">
          <div className="container-x grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Narrative eyebrow="03" title={zh ? "项目目标" : "Project Objective"}>
                {text(narrative.projectObjective.text)}
              </Narrative>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-xs uppercase tracking-editorial text-ink/65">
                {zh ? "本项目的具体挑战" : "Case-specific challenge"}
              </p>
              <p className="mt-5 text-2xl leading-9">{text(narrative.challenge.text)}</p>
            </div>
          </div>
        </section>
        {firstBlock ? (
          <section className="bg-mist py-10 lg:py-16" data-case-section="first-evidence">
            <div className="container-x" data-editorial-media-blocks>
              <EditorialBlock block={firstBlock} project={project} language={language} />
            </div>
          </section>
        ) : null}
        <section className="bg-pearl py-16 lg:py-24" data-case-section="responsibility">
          <div className="container-x">
            <p className="text-xs uppercase tracking-editorial text-ink/70">
              04 · {zh ? "Venus Bridge 职责" : "Venus Bridge Role"}
            </p>
            <p className="mt-6 max-w-4xl text-2xl leading-9">{text(narrative.verifiedVenusRole.text)}</p>
            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              <BoundaryList
                title={zh ? "实际完成" : "What Venus Bridge did"}
                items={narrative.whatVenusBridgeDid.map(text)}
              />
              <BoundaryList
                title={zh ? "不作主张" : "What Venus Bridge did not claim"}
                items={narrative.whatVenusBridgeDidNotDo.map(text)}
                muted
              />
            </div>
          </div>
        </section>
        <section className="border-y border-ink/15 py-16 lg:py-24" data-case-section="activity">
          <div className="container-x">
            <p className="text-xs uppercase tracking-editorial text-ink/70">
              05 · {text(narrative.approachLabel)}
            </p>
            <div className="mt-10 grid border-y border-ink/15 md:grid-cols-3">
              {[
                [zh ? "前期" : "Before", narrative.activity.before],
                [zh ? "现场" : "On the Ground", narrative.activity.onSite],
                [zh ? "后续" : "After", narrative.activity.after]
              ].map(([label, items]) => (
                <BoundaryList
                  key={String(label)}
                  title={String(label)}
                  items={
                    (items as { en: string; zh: string }[]).length
                      ? (items as { en: string; zh: string }[]).map(text)
                      : [zh ? "不作公开主张" : "Not publicly claimed"]
                  }
                />
              ))}
            </div>
          </div>
        </section>
        {remainingBlocks.length ? (
          <section className="bg-mist py-12 lg:py-20" data-case-section="visual-evidence">
            <div className="container-x space-y-10 lg:space-y-16" data-editorial-media-blocks>
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
        <section className="bg-porcelain py-16 lg:py-24" data-case-section="outputs">
          <div className="container-x grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-xs uppercase tracking-editorial text-ink/70">
                06 · {zh ? "经核实的交付" : "Verified Outputs"}
              </p>
              <ul className="mt-6 border-t border-ink/15">
                {narrative.verifiedOutputs.map((item) => (
                  <li key={text(item.text)} className="border-b border-ink/15 py-4 text-xl">
                    {text(item.text)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="text-xs uppercase tracking-editorial text-ink/60">
                {zh ? "公开证据" : "Public evidence available"}
              </p>
              <p className="mt-4 text-base">{text(narrative.publicEvidenceAvailable)}</p>
            </div>
          </div>
        </section>
        <section className="bg-night py-16 text-pearl lg:py-20" data-case-section="result">
          <div className="container-x">
            <p className="text-xs uppercase tracking-editorial text-pearl/60">
              07 · {zh ? "经核实的结果" : "Verified Result"}
            </p>
            <h2 className="editorial-heading mt-6 max-w-[18ch]">{text(narrative.verifiedResult.text)}</h2>
            <p className="mt-8 max-w-2xl text-sm leading-7 text-pearl/65">{text(narrative.continuedValue)}</p>
          </div>
        </section>
        {narrative.subsequentDevelopment ? (
          <section className="bg-pearl py-16 lg:py-20" data-case-section="subsequent-development">
            <div className="container-x max-w-4xl">
              <p className="text-xs uppercase tracking-editorial text-ink/65">
                08 · {zh ? "后续公开发展" : "What Happened Next"}
              </p>
              <p className="mt-6 text-xl leading-8">{text(narrative.subsequentDevelopment.text)}</p>
              <p className="mt-6 border-l border-champagne pl-4 text-sm leading-7 text-ink/60">
                {text(narrative.subsequentDisclaimer!)}
              </p>
            </div>
          </section>
        ) : null}
        <section className="border-t border-ink/15 bg-porcelain py-14" data-case-section="claim-boundary">
          <div className="container-x grid gap-5 lg:grid-cols-12">
            <p className="text-xs uppercase tracking-editorial text-ink/65 lg:col-span-3">
              09 · {zh ? "证据与主张边界" : "Evidence & Claim Boundary"}
            </p>
            <p className="max-w-3xl text-sm leading-7 text-ink/65 lg:col-span-7">
              {text(narrative.claimBoundary)}
            </p>
            <div
              className="border-t border-ink/15 pt-8 lg:col-span-9 lg:col-start-4"
              data-case-section="related"
            >
              <p className="text-xs uppercase tracking-editorial text-ink/70">
                {zh ? "下一个项目" : "Next project"}
              </p>
              <Link
                href={withLanguage(`/work/${next.slug}`, language)}
                className="mt-4 inline-flex min-h-11 items-center border-b border-champagne text-lg hover:text-champagne"
              >
                {zh ? next.titleZh : next.titleEn} ↗
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function BoundaryList({ title, items, muted = false }: { title: string; items: string[]; muted?: boolean }) {
  return (
    <div className="border-t border-ink/15 px-0 py-6 md:px-6">
      <h2 className="text-sm font-medium uppercase tracking-editorial">{title}</h2>
      <ul className={`mt-5 space-y-3 ${muted ? "text-ink/70" : "text-ink/75"}`}>
        {items.map((item) => (
          <li key={item} className="text-base leading-7">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CaseStudyHero({ project, language }: { project: PortfolioProject; language: Language }) {
  const zh = language === "zh";
  const hero = getProjectHero(project);
  const series = project.contentType === "portfolio-series";
  const split = project.heroLayout === "portrait" || project.heroLayout === "editorial-split";
  const title = zh ? project.titleZh : project.titleEn;
  const statement =
    project.commercialNarrative?.marketMoment.text[language] ??
    (zh ? project.projectValueZh : project.projectValueEn);
  const intro = (
    <>
      <p className="text-xs uppercase tracking-editorial text-pearl/70">
        {project.commercialNarrative
          ? project.commercialNarrative.marketMomentLabel[language]
          : series
            ? zh
              ? "精选能力项目"
              : "Selected capability work"
            : commercialCaseCategories[project.category][language]}
      </p>
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
              zh ? "经核实的 Venus Bridge 职责" : "Verified Venus Bridge role",
              project.commercialNarrative?.verifiedVenusRole.text[language] ??
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
