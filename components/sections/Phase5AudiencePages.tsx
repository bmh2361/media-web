import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { PortfolioImage } from "@/components/media/PortfolioImage";
import { commercial, engagements } from "@/content/commercial";
import { findPublishedPortfolioProject, findPortfolioMedia } from "@/content/portfolio";
import { withLanguage, type Language } from "@/lib/i18n";

export function CompaniesJourney({ language }: { language: Language }) {
  const zh = language === "zh";
  const hero = findPortfolioMedia("geely-london-brand-launch");
  const stories = ["agibot-london-launch", "catl-open-day-2025"].flatMap((slug) => {
    const project = findPublishedPortfolioProject(slug);
    const media = findPortfolioMedia(slug, slug === "catl-open-day-2025" ? "cover" : "hero");
    return project && media ? [{ project, media }] : [];
  });
  return (
    <>
      <section
        className="commercial-hero bg-ink pt-[76px] text-pearl lg:pt-[88px]"
        data-audience-page="companies"
      >
        <Container className="grid gap-10 py-12 lg:grid-cols-2 lg:items-center lg:py-16">
          <div>
            <Eyebrow className="text-champagne">
              {zh ? "面向中国科技企业" : "FOR CHINESE TECHNOLOGY COMPANIES"}
            </Eyebrow>
            <h1 className="commercial-hero-title mt-6">
              {zh ? (
                <>
                  <span className="inline-block">让你的英国市场计划，</span>
                  <span className="inline-block">开始落地。</span>
                </>
              ) : (
                "Make your next UK market move."
              )}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-pearl/80">
              {zh
                ? "从产品与目标出发，找到当前最值得推进的英国市场行动。我们协助判断、表达与当地执行；欧洲合作按具体项目延伸。"
                : "Start with your product and objective. Identify the UK action worth taking next, with support for assessment, messaging and local execution. European work follows a defined project need."}
            </p>
            <ButtonLink
              href={withLanguage("/contact?intent=company#company", language)}
              className="mt-7"
              showArrow
            >
              {commercial.companyCta[language]}
            </ButtonLink>
          </div>
          {hero && (
            <figure data-audience-hero-media>
              <PortfolioImage
                media={hero}
                language={language}
                priority
                fit="natural"
                sizes="(min-width:1024px) 50vw, 100vw"
              />
              <figcaption className="mt-3 text-sm leading-6 text-pearl/70">
                {zh
                  ? "吉利伦敦品牌发布 · 团队现场影像经验"
                  : "Geely London brand launch · Team on-site visual production"}
              </figcaption>
            </figure>
          )}
        </Container>
      </section>
      <Section className="bg-porcelain" id="market-action-map">
        <Container>
          <Eyebrow>{zh ? "市场行动路径" : "MARKET ACTION MAP"}</Eyebrow>
          <h2 className="commercial-heading mt-5">
            {zh ? "从你现在的阶段开始。" : "Begin where your business is now."}
          </h2>
          <p className="mt-5 text-base leading-7 text-ink/70">
            {zh
              ? "三项服务可独立开展，无需依次购买。选择当前需要回答的问题。"
              : "Each engagement stands alone. Choose the question you need to answer; this is not a sequence of required purchases."}
          </p>
          <ol className="action-map mt-10">
            {engagements.map((offer, index) => (
              <li key={offer.id}>
                <p className="text-sm uppercase tracking-editorial text-slate">
                  0{index + 1} / {offer.stage[language]}
                </p>
                <h3 className="mt-5 text-2xl font-medium leading-snug">{offer.question[language]}</h3>
                <dl className="mt-7 space-y-5 text-base leading-7">
                  <div>
                    <dt className="text-slate">{zh ? "关键动作" : "Action"}</dt>
                    <dd>{offer.action[language]}</dd>
                  </div>
                  <div>
                    <dt className="text-slate">{zh ? "有形输出" : "Output"}</dt>
                    <dd>{offer.mapOutput[language]}</dd>
                  </div>
                </dl>
                <Link
                  className="mt-6 inline-flex min-h-11 items-center underline underline-offset-4"
                  href={withLanguage(`/services#${offer.id}`, language)}
                >
                  {zh ? "查看对应服务" : "See this engagement"} →
                </Link>
              </li>
            ))}
          </ol>
        </Container>
      </Section>
      <Section className="bg-pearl" data-company-stories>
        <Container>
          <Eyebrow>{zh ? "真实项目中的参与" : "REAL PROJECT SETTINGS"}</Eyebrow>
          <h2 className="commercial-heading mt-5">
            {zh ? "不同技术场景，明确参与范围。" : "Different technologies. Specific contributions."}
          </h2>
          <div className="mt-10 space-y-14">
            {stories.map(({ project, media }, index) => (
              <article key={project.slug} className="grid items-center gap-8 lg:grid-cols-12">
                <div className={`lg:col-span-8 ${index === 1 ? "lg:order-2" : ""}`}>
                  <PortfolioImage
                    media={media}
                    language={language}
                    fit="natural"
                    sizes="(min-width:1024px) 66vw, 100vw"
                  />
                </div>
                <div className="lg:col-span-4">
                  <h3 className="text-2xl font-medium leading-snug">
                    {zh ? project.titleZh : project.titleEn}
                  </h3>
                  <p className="mt-5 text-base leading-7 text-ink/70">
                    {project.slug === "agibot-london-launch"
                      ? zh
                        ? "机器人品牌的伦敦发布现场。"
                        : "A robotics brand in a London launch setting."
                      : zh
                        ? "电池技术企业开放日的现场交流。"
                        : "On-site communication at a battery technology open day."}
                  </p>
                  <p className="mt-4 text-base leading-7">
                    {zh ? project.roleStatementZh : project.roleStatementEn}
                  </p>
                  <Link
                    className="mt-5 inline-flex min-h-11 items-center underline underline-offset-4"
                    href={withLanguage(`/work/${project.slug}`, language)}
                  >
                    {zh ? "核对案例与交付" : "View scope and deliverables"} →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <Section className="bg-porcelain">
        <Container>
          <Eyebrow>{zh ? "开始项目需要什么" : "STARTING THE WORK"}</Eyebrow>
          <h2 className="commercial-heading mt-5">
            {zh ? "把计划变成清楚的工作简报。" : "Turn your plan into a working brief."}
          </h2>
          <dl className="brief-flow mt-10">
            {(zh
              ? [
                  ["你提供", "产品、目标、时间"],
                  ["我们组织", "判断、表达、约定的当地行动"],
                  ["你获得", "材料、反馈和下一步"]
                ]
              : [
                  ["You provide", "Product, objective, timing"],
                  ["We organise", "Assessment, messaging, agreed local activity"],
                  ["You receive", "Materials, feedback, next actions"]
                ]
            ).map(([label, value]) => (
              <div key={label}>
                <dt className="text-slate">{label}</dt>
                <dd className="mt-3 text-xl leading-8">{value}</dd>
              </div>
            ))}
          </dl>
          <ul className="mt-8 space-y-2 text-base leading-7 text-ink/70">
            {(zh
              ? [
                  "已有可对外讨论的产品或技术。",
                  "决策者参与需求与审批。",
                  "愿意根据当地反馈调整，并持续跟进。"
                ]
              : [
                  "A product or technology ready for external discussion.",
                  "A decision maker involved in the brief and approvals.",
                  "Capacity to adapt to local feedback and sustain follow-up."
                ]
            ).map((item) => (
              <li key={item}>— {item}</li>
            ))}
          </ul>
        </Container>
      </Section>
      <Section className="bg-night text-pearl">
        <Container>
          <h2 className="commercial-heading">
            {zh ? "发来产品、目标和时间。" : "Send your product, objective and timing."}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-pearl/75">
            {zh
              ? "附上产品介绍或网站，以及希望在英国解决的问题。我们先判断适配，再约定范围与费用。"
              : "Include a product overview or website and the question you want to resolve in the UK. We assess fit before agreeing scope and fees."}
          </p>
          <ButtonLink
            className="mt-7"
            href={withLanguage("/contact?intent=company#company", language)}
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
  const routes = [
    {
      id: "commercial-demand",
      intent: "demand",
      title: zh ? "商业与应用需求" : "Commercial requirements",
      body: zh
        ? "提出运营、采购或分销问题；先判断应用要求，再考虑相关技术。"
        : "Bring an operating, procurement or distribution question. Application requirements come before a technology shortlist.",
      tags: zh ? ["运营方", "买家", "分销商"] : ["Operators", "Buyers", "Distributors"],
      cta: commercial.demandCta[language]
    },
    {
      id: "research",
      intent: "research",
      title: zh ? "技术与研究合作" : "Research & technical collaboration",
      body: zh
        ? "说明研究问题、技术条件与合作兴趣，由双方判断是否适配。"
        : "Describe a research question, technical conditions and collaboration interest for both sides to assess.",
      tags: zh ? ["高校", "研发团队", "技术专家"] : ["Universities", "R&D teams", "Technical experts"],
      cta: zh ? "讨论研究方向" : "Discuss a research question"
    },
    {
      id: "delivery-partners",
      intent: "specialist",
      title: zh ? "专业与交付合作" : "Specialist delivery",
      body: zh
        ? "介绍专业能力、可用时间和服务范围，按具体项目约定职责与审批路径。"
        : "Share your expertise, availability and scope. Responsibilities and the approval route are agreed for a specific project.",
      tags: zh
        ? ["专业顾问", "技术支持", "本地执行"]
        : ["Professional advice", "Technical support", "Local delivery"],
      cta: commercial.specialistCta[language]
    }
  ];
  return (
    <>
      <section
        className="commercial-hero bg-ink pt-[76px] text-pearl lg:pt-[88px]"
        data-audience-page="partners"
      >
        <Container className="grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <Eyebrow className="text-champagne">
              {zh ? "面向英国与欧洲合作方" : "FOR UK & EUROPEAN PARTNERS"}
            </Eyebrow>
            <h1 className="commercial-hero-title mt-6">
              {zh ? "从你的业务需求，寻找合适的合作。" : "What does your next project need?"}
            </h1>
            <p className="mt-6 text-lg leading-8 text-pearl/80">{commercial.demandIntroduction[language]}</p>
            <ButtonLink
              className="mt-7"
              href={withLanguage("/contact?intent=demand#demand", language)}
              showArrow
            >
              {commercial.demandCta[language]}
            </ButtonLink>
          </div>
          <figure
            className="requirement-orbit"
            aria-label={zh ? "需求匹配关系" : "Requirement matching relationship"}
          >
            <div className="orbit-node">{zh ? "你的应用环境" : "Your application"}</div>
            <div className="orbit-connection" aria-hidden="true">
              ↓
            </div>
            <div className="orbit-centre">
              <span className="text-sm uppercase tracking-editorial text-champagne">Venus Bridge</span>
              <p className="mt-3 text-2xl">{zh ? "澄清问题 · 判断相关性" : "Clarify · Assess relevance"}</p>
            </div>
            <div className="orbit-connection" aria-hidden="true">
              ↕
            </div>
            <div className="orbit-node">
              {zh ? "可能相关的技术或企业" : "Potentially relevant technology or company"}
            </div>
            <figcaption className="mt-6 text-center text-base leading-7 text-pearl/70">
              {zh
                ? "以需求为起点，由双方决定下一步。"
                : "Led by the requirement. Progress depends on mutual fit."}
            </figcaption>
          </figure>
        </Container>
      </section>
      <Section className="bg-porcelain">
        <Container>
          <Eyebrow>{zh ? "选择参与方式" : "CHOOSE YOUR ROUTE"}</Eyebrow>
          <div className="mt-6 divide-y divide-ink/20">
            {routes.map((route, index) => (
              <article key={route.id} id={route.id} className="grid scroll-mt-28 gap-6 py-8 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <p className="text-sm text-slate">0{index + 1}</p>
                  <h2 className="mt-3 text-2xl font-medium leading-snug">{route.title}</h2>
                </div>
                <div className="lg:col-span-5">
                  <p className="text-base leading-7 text-ink/75">{route.body}</p>
                  <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-base text-slate">
                    {route.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
                <div className="lg:col-span-3 lg:self-center">
                  <ButtonLink
                    variant="ghost"
                    href={withLanguage(`/contact?intent=${route.intent}#${route.intent}`, language)}
                    showArrow
                  >
                    {route.cta}
                  </ButtonLink>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <Section className="bg-night text-pearl" id="requirement-map">
        <Container>
          <Eyebrow className="text-champagne">{zh ? "从需求到决定" : "FROM REQUIREMENT TO DECISION"}</Eyebrow>
          <h2 className="commercial-heading mt-5">
            {zh ? "每一次推进，都有判断依据。" : "A decision at each connection."}
          </h2>
          <ol className="decision-map mt-10">
            {(zh
              ? ["需求", "相关性研究", "双方判断", "约定下一步"]
              : ["Requirement", "Relevance check", "Mutual fit", "Agreed next step"]
            ).map((label, index) => (
              <li key={label}>
                <span className="text-sm text-champagne">0{index + 1}</span>
                <p className="mt-3 text-xl leading-7">{label}</p>
              </li>
            ))}
          </ol>
          <div className="decision-branches">
            <p>{zh ? "信息不足 → 补充信息，再评估" : "Information missing → Clarify, then reassess"}</p>
            <p>{zh ? "不适配 → 暂不推进" : "No mutual fit → Do not progress"}</p>
          </div>
          <p className="mt-8 max-w-3xl text-base leading-7 text-pearl/75">
            {zh
              ? "外部参与取决于适配、意愿和必要的机构审批。研究参与不等于品牌背书；不保证引荐、采购或订单。"
              : "Participation depends on fit, interest and any required institutional approval. Research participation is not brand endorsement. Introductions, procurement and orders are not guaranteed."}
          </p>
        </Container>
      </Section>
      <Section className="bg-pearl">
        <Container>
          <Eyebrow>{zh ? "合作形式示意" : "ILLUSTRATIVE COLLABORATION FORMATS"}</Eyebrow>
          <h2 className="commercial-heading mt-5">
            {zh ? "先定义评估条件。" : "Define what would make a fit."}
          </h2>
          <p className="mt-5 text-base leading-7 text-ink/70">
            {zh
              ? "以下仅展示讨论结构，并非客户案例、现有采购需求或正在进行的项目。"
              : "Discussion structures only, not client cases, live procurement requirements or active projects."}
          </p>
          <div className="mt-8 grid gap-10 md:grid-cols-2">
            {(zh
              ? [
                  ["运营自动化", "运营环境", "任务、接口与安全要求", "自动化技术可行性讨论"],
                  ["能源与智能系统", "企业能源数据应用", "数据条件与使用目标", "技术评估或研究讨论"]
                ]
              : [
                  [
                    "Operational automation",
                    "An operating environment",
                    "Tasks, interfaces and safety requirements",
                    "Automation feasibility discussion"
                  ],
                  [
                    "Energy & intelligent systems",
                    "Enterprise energy data application",
                    "Data conditions and intended use",
                    "Technical evaluation or research discussion"
                  ]
                ]
            ).map(([title, ...values]) => (
              <article key={title} className="border-t border-ink/25 pt-6">
                <h3 className="text-2xl font-medium">{title}</h3>
                <dl className="mt-5 space-y-4">
                  {values.map((value, index) => (
                    <div key={value}>
                      <dt className="text-base text-slate">
                        {
                          (zh
                            ? ["应用环境", "评估条件", "合作方式"]
                            : ["Application", "Evaluation conditions", "Collaboration format"])[index]
                        }
                      </dt>
                      <dd className="mt-1 text-lg leading-7">{value}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <Section className="bg-porcelain">
        <Container>
          <h2 className="commercial-heading">
            {zh ? "带着一个清楚的问题开始。" : "Start with a clear question."}
          </h2>
          <p className="mt-5 text-lg leading-8 text-ink/70">
            {zh
              ? "说明应用环境、需要解决的问题与时间；研究和专业服务请使用对应入口。"
              : "Share the application, the problem and timing. Research and specialist enquiries have their own briefs."}
          </p>
          <div className="mt-7 flex flex-wrap gap-4">
            {routes.map((route) => (
              <ButtonLink
                key={route.id}
                variant={route.intent === "demand" ? "primary" : "ghost"}
                href={withLanguage(`/contact?intent=${route.intent}#${route.intent}`, language)}
              >
                {route.cta}
              </ButtonLink>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
