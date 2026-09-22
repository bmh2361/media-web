import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { EditorialScene } from "@/components/sections/phase32c/EditorialScene";
import { engagements } from "@/content/commercial";
import { findPublishedPortfolioProject, getProjectHero } from "@/content/portfolio";
import { withLanguage, type Language } from "@/lib/i18n";

export function SelectedCommercialExperience({ language }: { language: Language }) {
  const zh = language === "zh";
  const projects = ["agibot-london-launch", "changan-europe-launch-2025", "catl-open-day-2025"]
    .map((slug) => findPublishedPortfolioProject(slug))
    .filter((item) => item !== undefined);
  return (
    <Section className="bg-pearl" data-commercial-section="experience">
      <Container>
        <Eyebrow>{zh ? "相关项目经验" : "SELECTED EXPERIENCE"}</Eyebrow>
        <div className="mt-5 grid gap-6 lg:grid-cols-2">
          <h2 className="commercial-heading">
            {zh ? "真实项目，明确职责。" : "Real settings. Specific contributions."}
          </h2>
          <p className="max-w-xl self-end text-base leading-7 text-ink/70">
            {zh
              ? "以下展示团队在科技、汽车与国际活动中的实际影像制作与现场经验。品牌及活动背景不代表 Venus Bridge 承担了市场战略、分销或销售工作，也不代表品牌代理关系。"
              : "These projects show the team's actual visual production and on-site experience in technology, mobility and international events. Brand and event context does not imply market strategy, distribution, sales work or brand representation by Venus Bridge."}
          </p>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {projects.map((item) => (
            <article key={item.slug} className="min-w-0">
              <Link href={withLanguage(`/work/${item.slug}`, language)} className="group block">
                <EditorialScene
                  scene={{ kind: "portfolio", media: getProjectHero(item) }}
                  language={language}
                  sizes="(min-width:768px) 33vw, 100vw"
                  mediaRole="card-landscape"
                />
                <h3 className="mt-5 text-xl font-medium group-hover:underline">
                  {zh ? item.titleZh : item.titleEn}
                </h3>
              </Link>
              <p className="mt-3 text-xs uppercase tracking-editorial text-slate">
                {zh ? "实际参与" : "ACTUAL ROLE"}
              </p>
              <p className="mt-2 text-sm leading-7 text-ink/75">
                {zh ? item.roleStatementZh : item.roleStatementEn}
              </p>
            </article>
          ))}
        </div>
        <ButtonLink href={withLanguage("/work", language)} variant="ghost" className="mt-8" showArrow>
          {zh ? "查看案例与交付内容" : "Explore cases and deliverables"}
        </ButtonLink>
      </Container>
    </Section>
  );
}

export function ServiceComparison({ language }: { language: Language }) {
  const zh = language === "zh";
  return (
    <Section className="bg-porcelain" data-commercial-section="engagements">
      <Container>
        <Eyebrow>{zh ? "三种可独立开展的服务" : "THREE INDEPENDENT ENGAGEMENTS"}</Eyebrow>
        <div className="service-comparison mt-7">
          {engagements.map((offer, index) => (
            <article
              key={offer.id}
              id={offer.id}
              className={`scroll-mt-28 ${index === 1 ? "service-primary" : ""}`}
            >
              <p className="text-sm uppercase tracking-editorial text-slate">
                0{index + 1} / {offer.stage[language]}
                {index === 1 ? (zh ? " · 主推服务" : " · PRIMARY OFFER") : ""}
              </p>
              <h2 className="mt-5 text-2xl font-medium leading-snug">{offer.title[language]}</h2>
              <dl className="service-dimensions mt-7 text-base leading-7">
                <div>
                  <dt>{zh ? "适用阶段" : "Stage"}</dt>
                  <dd>
                    {zh
                      ? ["准备判断英国机会", "筹备发布、展会或演示", "首轮活动之后"][index]
                      : [
                          "Assessing a UK opportunity",
                          "Preparing a launch, exhibition or demonstration",
                          "Following an initial market activity"
                        ][index]}
                  </dd>
                </div>
                <div>
                  <dt>{zh ? "核心问题" : "Core question"}</dt>
                  <dd>{offer.question[language]}</dd>
                </div>
                <div>
                  <dt>{zh ? "三项主要交付" : "Three main deliverables"}</dt>
                  <dd>
                    <ul className="space-y-2">
                      {offer.outputs[language].slice(0, 3).map((item) => (
                        <li key={item}>— {item}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div>
                  <dt>{zh ? "你需要提供" : "Your input"}</dt>
                  <dd>{offer.inputs[language]}</dd>
                </div>
                <div>
                  <dt>{zh ? "如何启动" : "Starting the work"}</dt>
                  <dd>
                    {zh
                      ? "先沟通简报，再确认范围、时间、职责与费用。"
                      : "Discuss the brief, then agree scope, timing, responsibilities and fee."}
                  </dd>
                </div>
              </dl>
              <ButtonLink
                className="mt-6"
                variant={index === 1 ? "primary" : "ghost"}
                href={withLanguage(`/contact?intent=company&service=${offer.id}#company`, language)}
                showArrow
              >
                {zh ? "沟通这项服务" : "Discuss this engagement"}
              </ButtonLink>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function DeliverableWorkbench({ language }: { language: Language }) {
  const zh = language === "zh";
  return (
    <Section className="bg-night text-pearl" id="deliverable-workbench">
      <Container>
        <Eyebrow className="text-champagne">
          {zh ? "交付格式示意" : "ILLUSTRATIVE DELIVERABLE FORMAT"}
        </Eyebrow>
        <h2 className="commercial-heading mt-5">
          {zh ? "看见工作的具体形状。" : "See the shape of the work."}
        </h2>
        <p className="mt-5 max-w-3xl text-base leading-7 text-pearl/75">
          {zh
            ? "以下为文档结构示意，仅展示字段，不包含客户、买家或会议数据。实际内容按项目约定。"
            : "Document structures showing fields only, without client, buyer or meeting data. Actual contents are agreed for each project."}
        </p>
        <div className="deliverable-desk mt-10">
          {engagements.map((offer, index) => (
            <figure key={offer.id} className={`deliverable-paper deliverable-paper-${index}`}>
              <figcaption>
                <span className="text-sm text-slate">
                  0{index + 1} / {zh ? "交付格式示意" : "FORMAT STUDY"}
                </span>
                <h3 className="mt-4 text-2xl font-medium leading-snug">{offer.formatTitle[language]}</h3>
              </figcaption>
              <ol className="mt-7">
                {offer.formatFields[language].map((field, i) => (
                  <li key={field}>
                    <span className="text-sm text-slate">0{i + 1}</span>
                    <span>{field}</span>
                  </li>
                ))}
              </ol>
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}
