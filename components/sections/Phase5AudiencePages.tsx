import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { EditorialScene } from "@/components/sections/phase32c/EditorialScene";
import {
  CommercialProcess,
  Engagements,
  SelectedCommercialExperience,
  Situations
} from "@/components/sections/CommercialSections";
import { commercial, partnerTracks } from "@/content/commercial";
import { findPublishedPortfolioProject, getProjectHero } from "@/content/portfolio";
import { withLanguage, type Language } from "@/lib/i18n";

export function CompaniesJourney({ language }: { language: Language }) {
  const zh = language === "zh";
  const project = findPublishedPortfolioProject("agibot-london-launch")!;
  return (
    <>
      <section
        className="commercial-hero bg-ink pt-[76px] text-pearl lg:pt-[88px]"
        data-audience-page="companies"
      >
        <Container className="grid gap-10 py-14 lg:grid-cols-12 lg:items-center lg:py-20">
          <div className="lg:col-span-7">
            <Eyebrow className="text-champagne">
              {zh ? "面向中国科技企业" : "FOR CHINESE TECHNOLOGY COMPANIES"}
            </Eyebrow>
            <h1 className="commercial-hero-title mt-6">
              {zh
                ? "把英国市场目标，变成可执行的项目。"
                : "Turn your UK market objective into an executable project."}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-pearl/80">
              {zh
                ? "你已经有产品或技术，需要决定英国机会是否值得投入，或者让一次发布、展会、来访真正服务于市场目标。我们从需求判断开始，约定工作范围，再组织本地行动。"
                : "You have a real product or technology. You need to assess the UK opportunity, or make a launch, exhibition or visit serve a clear market objective. We start with the decision you need to make, agree the scope and organise local action."}
            </p>
            <p className="mt-4 text-sm leading-7 text-pearl/65">{commercial.geography[language]}</p>
            <ButtonLink
              href={withLanguage("/contact?intent=company#company", language)}
              className="mt-7"
              showArrow
            >
              {commercial.companyCta[language]}
            </ButtonLink>
          </div>
          <div className="min-w-0 lg:col-span-5" data-audience-hero-media>
            <EditorialScene
              scene={{
                kind: "portfolio",
                media: project.media.find((media) => media.category === "cover") ?? getProjectHero(project)
              }}
              language={language}
              priority
              sizes="(min-width:1024px) 42vw, 100vw"
              mediaRole="hero-landscape"
            />
            <p className="mt-4 text-xs leading-6 text-pearl/65">
              {zh
                ? "AGIBOT 伦敦发布 · 团队现场影像经验"
                : "AGIBOT London launch · Team on-site visual production experience"}
            </p>
          </div>
        </Container>
      </section>
      <Section className="bg-pearl">
        <Container>
          <Eyebrow>{zh ? "技术优先领域" : "TECHNOLOGY PRIORITIES"}</Eyebrow>
          <ol className="mt-5 space-y-3 text-lg leading-8">
            {commercial.sectors[language].map((sector, index) => (
              <li key={sector}>
                {index + 1}. {sector}
              </li>
            ))}
          </ol>
          <p className="mt-5 text-sm leading-7 text-ink/70">{commercial.adjacent[language]}</p>
          <ButtonLink
            href={withLanguage("/services#priority-areas", language)}
            variant="ghost"
            className="mt-5"
            showArrow
          >
            {zh ? "查看项目范围" : "Explore project scope"}
          </ButtonLink>
        </Container>
      </Section>
      <Situations language={language} />
      <Engagements language={language} />
      <Section className="bg-pearl">
        <Container>
          <Eyebrow>{zh ? "项目包含什么" : "WHAT A PROJECT INCLUDES"}</Eyebrow>
          <h2 className="commercial-heading mt-5">
            {zh
              ? "工作、责任和验收，启动前说清楚。"
              : "Agree the work, responsibilities and acceptance criteria first."}
          </h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-3">
            {(zh
              ? [
                  [
                    "一份明确的项目约定",
                    "商业目标、优先受众、工作范围、交付清单、时间、费用、审批人与验收标准。具体买家沟通、专家参与或演示安排，均需单独纳入范围。"
                  ],
                  [
                    "Venus Bridge 直接负责",
                    "需求梳理、产品与传播表达、项目规划、双语沟通、约定的本地执行与反馈整理。我们根据确认的范围向中国总部汇报。"
                  ],
                  [
                    "专业方分别负责",
                    "法律、税务、合规、认证、物流或专业研究，由项目所需的合资格服务方提供。我们协调需求和接口，专业意见与责任由该服务方承担。"
                  ]
                ]
              : [
                  [
                    "A defined project agreement",
                    "The objective, priority audience, scope, deliverables, timeline, fee, approval owner and acceptance criteria. Buyer outreach, expert participation and demonstrations must be specifically scoped."
                  ],
                  [
                    "What Venus Bridge does directly",
                    "Requirement discovery, proposition and communication work, project planning, bilingual coordination, agreed local execution and feedback reporting to China headquarters."
                  ],
                  [
                    "What specialists deliver",
                    "Legal, tax, compliance, certification, logistics or specialist research is provided by appropriately qualified providers where needed. We coordinate the brief; the specialist owns their advice and professional responsibilities."
                  ]
                ]
            ).map(([title, text]) => (
              <article key={title} className="border-t border-ink/20 pt-6">
                <h3 className="text-xl font-medium">{title}</h3>
                <p className="mt-4 text-base leading-7 text-ink/70">{text}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <SelectedCommercialExperience language={language} />
      <CommercialProcess language={language} />
      <Section className="bg-porcelain" data-commercial-section="fit">
        <Container>
          <Eyebrow>{zh ? "项目匹配" : "PROJECT FIT"}</Eyebrow>
          <h2 className="commercial-heading mt-5">
            {zh ? "什么情况下，我们适合合作？" : "A useful engagement starts with realistic expectations."}
          </h2>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            {[
              { title: zh ? "适合合作" : "Good fit", items: commercial.goodFit[language] },
              { title: zh ? "不适合的需求" : "Not the right fit", items: commercial.notFit[language] }
            ].map((group) => (
              <article key={group.title} className="border-t border-ink/20 pt-6">
                <h3 className="text-2xl font-medium">{group.title}</h3>
                <ul className="mt-6 divide-y divide-ink/10">
                  {group.items.map((item) => (
                    <li key={item} className="py-3 text-base leading-7 text-ink/75">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-base leading-7 text-ink/70">
            {zh
              ? "请带上产品介绍、目标市场、希望实现的结果、时间和现有英国活动。我们会先判断是否匹配，再建议准备、启动或跟进项目。"
              : "Bring your product brief, target market, objective, timing and existing UK activity. We first assess fit, then recommend readiness, launch or follow-up work."}
          </p>
          <ButtonLink
            href={withLanguage("/contact?intent=company#company", language)}
            className="mt-7"
            showArrow
          >
            {commercial.companyCta[language]}
          </ButtonLink>
        </Container>
      </Section>
    </>
  );
}

export function PartnersJourney({ language }: { language: Language }) {
  const zh = language === "zh";
  const project = findPublishedPortfolioProject("catl-open-day-2025")!;
  return (
    <>
      <section
        className="commercial-hero bg-ink pt-[76px] text-pearl lg:pt-[88px]"
        data-audience-page="partners"
      >
        <Container className="grid gap-10 py-14 lg:grid-cols-12 lg:items-center lg:py-20">
          <div className="lg:col-span-7">
            <Eyebrow className="text-champagne">
              {zh ? "英国与欧洲商业及技术合作" : "FOR UK & EUROPEAN PARTNERS"}
            </Eyebrow>
            <h1 className="commercial-hero-title mt-6">
              {zh
                ? "先说清楚你的英国或欧洲业务需求。"
                : "Start with your UK or European business requirement."}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-pearl/80">
              {commercial.demandIntroduction[language]}
            </p>
            <ButtonLink
              href={withLanguage("/contact?intent=demand#demand", language)}
              className="mt-7"
              showArrow
            >
              {commercial.demandCta[language]}
            </ButtonLink>
          </div>
          <div className="min-w-0 lg:col-span-5" data-audience-hero-media>
            <EditorialScene
              scene={{ kind: "portfolio", media: getProjectHero(project) }}
              language={language}
              priority
              sizes="(min-width:1024px) 42vw, 100vw"
              mediaRole="hero-landscape"
            />
            <p className="mt-4 text-xs leading-6 text-pearl/65">
              {zh
                ? "CATL 活动影像 · 历史制作经验，不代表供应或代理关系"
                : "CATL event imagery · Historical production experience, not a supply or representation relationship"}
            </p>
          </div>
        </Container>
      </section>
      {partnerTracks.map((track, i) => (
        <Section
          key={track.id}
          id={track.id}
          className={`scroll-mt-24 ${i === 1 ? "bg-night text-pearl" : "bg-porcelain"}`}
          data-partner-track={track.id}
        >
          <Container className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow className={i === 1 ? "text-champagne" : ""}>
                {String.fromCharCode(65 + i)} · {zh ? "合作路径" : "PARTNERSHIP ROUTE"}
              </Eyebrow>
              <h2 className="commercial-heading mt-5">{track.title[language]}</h2>
              <p className={`mt-6 text-base leading-7 ${i === 1 ? "text-pearl/75" : "text-ink/70"}`}>
                {track.audience[language]}
              </p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className={`text-lg leading-8 ${i === 1 ? "text-pearl/80" : "text-ink/80"}`}>
                {track.body[language]}
              </p>
              <ul
                className={`mt-6 divide-y border-y ${i === 1 ? "divide-pearl/20 border-pearl/20" : "divide-ink/15 border-ink/15"}`}
              >
                {track.examples[language].map((item) => (
                  <li key={item} className="py-4 text-sm leading-7">
                    {item}
                  </li>
                ))}
              </ul>
              <ButtonLink
                href={withLanguage(
                  `/contact?intent=${track.intent}#${track.intent === "research" ? "demand" : track.intent}`,
                  language
                )}
                className="mt-7"
                showArrow
              >
                {i === 0
                  ? commercial.demandCta[language]
                  : i === 1
                    ? zh
                      ? "沟通技术合作需求"
                      : "Discuss a Research Brief"
                    : commercial.specialistCta[language]}
              </ButtonLink>
            </div>
          </Container>
        </Section>
      ))}
      <Section className="bg-pearl">
        <Container>
          <Eyebrow>{zh ? "从需求到决定" : "FROM REQUIREMENT TO DECISION"}</Eyebrow>
          <h2 className="commercial-heading mt-5">
            {zh
              ? "先确认相关性，再约定下一步。"
              : "A clear requirement, a fit assessment, then an agreed next step."}
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-ink/70">
            {zh
              ? "我们会先查看你的应用、地区、时间与评估标准。若存在值得继续的方向，再确认研究与沟通范围、双方责任和费用。是否采购、分销、开展试点或研究，由相关各方自行评估和决定。"
              : "We review your application, geography, timing and assessment criteria. If there is a useful route forward, we agree the research and communication scope, responsibilities and fees. Procurement, distribution, pilot and research decisions remain with the participating parties."}
          </p>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-ink/65">
            {zh
              ? "Venus Bridge 不提供无限范围的免费采购搜寻，也不以分销商、采购担保人或机构代理身份行事。"
              : "Venus Bridge does not offer unlimited free sourcing or act as a distributor, procurement guarantor or institutional representative."}
          </p>
        </Container>
      </Section>
    </>
  );
}
