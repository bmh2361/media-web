import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { EditorialScene } from "@/components/sections/phase32c/EditorialScene";
import { commercial, engagements } from "@/content/commercial";
import { findPublishedPortfolioProject, getProjectHero } from "@/content/portfolio";
import { withLanguage, type Language } from "@/lib/i18n";

export function Engagements({ language, detailed = false }: { language: Language; detailed?: boolean }) {
  const zh = language === "zh";
  return (
    <Section className="bg-porcelain" data-commercial-section="engagements">
      <Container>
        <Eyebrow>{zh ? "三种合作方式" : "THREE ENGAGEMENT MODELS"}</Eyebrow>
        <h2 className="commercial-heading mt-5">
          {zh ? "从市场判断，到启动与持续推进。" : "Choose the work your next decision needs."}
        </h2>
        <div className="mt-10 border-t border-ink/20">
          {engagements.map((offer, index) => (
            <article
              key={offer.id}
              id={offer.id}
              className={`commercial-offer grid scroll-mt-28 gap-6 border-b border-ink/20 py-8 lg:grid-cols-12 lg:gap-10 ${index === 1 ? "border-l-2 border-l-champagne pl-5 lg:pl-8" : ""}`}
            >
              <div className="lg:col-span-5">
                <p className="text-xs uppercase tracking-editorial text-slate">
                  0{index + 1}
                  {index === 1 ? (zh ? " · 核心服务" : " · PRIMARY OFFER") : ""}
                </p>
                <h3 className="mt-4 text-2xl font-medium leading-tight md:text-3xl">
                  {offer.title[language]}
                </h3>
                <p className="mt-4 text-base leading-7 text-ink/70">{offer.audience[language]}</p>
              </div>
              <div className="lg:col-span-7">
                {detailed && (
                  <>
                    <h4 className="text-sm font-semibold">{zh ? "可约定的范围" : "Possible scope"}</h4>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-ink/75">
                      {offer.scope[language].map((item) => (
                        <li key={item}>— {item}</li>
                      ))}
                    </ul>
                  </>
                )}
                <h4 className={`text-sm font-semibold ${detailed ? "mt-6" : ""}`}>
                  {zh ? "可交付成果" : "Possible outputs"}
                </h4>
                <ul className="mt-3 space-y-2 text-base leading-7 text-ink/75">
                  {offer.outputs[language].map((item) => (
                    <li key={item}>— {item}</li>
                  ))}
                </ul>
                <Link
                  className="mt-5 inline-flex min-h-11 items-center text-sm underline underline-offset-4"
                  href={withLanguage(
                    detailed
                      ? `/contact?intent=company&service=${offer.id}#company`
                      : `/services#${offer.id}`,
                    language
                  )}
                >
                  {zh
                    ? detailed
                      ? "沟通这个项目"
                      : "了解服务范围"
                    : detailed
                      ? "Discuss this engagement"
                      : "Explore the scope"}{" "}
                  →
                </Link>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-7 max-w-4xl text-sm leading-7 text-ink/65">{commercial.scopeNote[language]}</p>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-ink/65">
          {zh
            ? "合作推进以约定期限和任务开展，不构成无限期销售代理；买家、媒体、高校或分销商并非每个项目的固定配置。"
            : "Partnership development is a defined engagement, not open-ended sales representation. Buyers, media, universities and distributors are not standard inclusions in every project."}
        </p>
      </Container>
    </Section>
  );
}

export function Situations({ language }: { language: Language }) {
  return (
    <Section className="bg-pearl" data-commercial-section="situations">
      <Container>
        <Eyebrow>{language === "zh" ? "从你的实际问题开始" : "START WITH YOUR SITUATION"}</Eyebrow>
        <h2 className="commercial-heading mt-5">
          {language === "zh"
            ? "有市场目标，也需要清楚的行动路径。"
            : "A market objective needs a practical local plan."}
        </h2>
        <div className="mt-10 grid gap-x-12 border-t border-ink/15 md:grid-cols-2">
          {commercial.situations[language].map(([title, body], i) => (
            <article key={title} className="border-b border-ink/15 py-7">
              <p className="text-xs text-slate">0{i + 1}</p>
              <h3 className="mt-4 text-xl font-medium">{title}</h3>
              <p className="mt-3 max-w-xl text-base leading-7 text-ink/70">{body}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function CommercialProcess({ language }: { language: Language }) {
  return (
    <Section className="bg-night text-pearl" id="process" data-commercial-section="process">
      <Container>
        <Eyebrow className="text-champagne">
          {language === "zh" ? "项目如何推进" : "HOW VALUE IS CREATED"}
        </Eyebrow>
        <h2 className="commercial-heading mt-5">
          {language === "zh"
            ? "每一步，都对应具体工作。"
            : "From an initial question to the next commercial action."}
        </h2>
        <ol className="mt-10 grid gap-x-7 border-t border-pearl/20 md:grid-cols-2 xl:grid-cols-5">
          {commercial.steps[language].map(([title, text], i) => (
            <li key={title} className="border-b border-pearl/20 py-7">
              <p className="text-xs text-champagne">0{i + 1}</p>
              <h3 className="mt-5 text-xl font-medium">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-pearl/75">{text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

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

export function DemandInvitation({ language }: { language: Language }) {
  const zh = language === "zh";
  return (
    <Section className="bg-graphite text-pearl" data-commercial-section="demand">
      <Container className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Eyebrow className="text-champagne">
            {zh ? "面向英国与欧洲企业" : "FOR UK & EUROPEAN PARTNERS"}
          </Eyebrow>
          <h2 className="commercial-heading mt-5">
            {zh ? "你的英国或欧洲项目，需要解决什么问题？" : "What does your UK or European project need?"}
          </h2>
        </div>
        <div className="lg:col-span-5 lg:self-end">
          <p className="text-base leading-8 text-pearl/80">{commercial.demandIntroduction[language]}</p>
          <ButtonLink
            href={withLanguage("/contact?intent=demand#demand", language)}
            className="mt-7"
            showArrow
          >
            {commercial.demandCta[language]}
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
