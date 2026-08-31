import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { EditorialScene } from "@/components/sections/phase32c/EditorialScene";
import { MobileIndexedStory } from "@/components/motion/MobileIndexedStory";
import { capabilityMediaById } from "@/content/capability-media";
import { findPortfolioProject } from "@/content/portfolio";
import type { Language } from "@/lib/i18n";
import { withLanguage } from "@/lib/i18n";

const capability = (id: string) => {
  const media = capabilityMediaById(id);
  if (!media?.websiteUseApproved || !media.mediaRightsApproved || !media.copyrightApproved) {
    throw new Error(`Audience media ${id} is not approved.`);
  }
  return { kind: "capability" as const, media };
};

const portfolio = (slug: string, category: "hero" | "cover" | "gallery" = "hero", offset = 0) => {
  const project = findPortfolioProject(slug);
  if (!project) throw new Error(`Audience project ${slug} is missing.`);
  return {
    kind: "portfolio" as const,
    media:
      project.media.filter((item) => item.category === category)[offset] ??
      project.media.find((item) => item.category === category) ??
      project.media[0]
  };
};

export function CompaniesJourney({ language }: { language: Language }) {
  const zh = language === "zh";
  const situations = zh
    ? [
        ["验证市场", "判断英国或欧洲机会是否值得投入、从哪里开始，以及下一步需要验证什么。"],
        ["建立商业关系", "识别并对接买家、经销商、渠道伙伴及关键行业利益相关方。"],
        ["落地发布与展会", "把确定的市场节点转化为活动前、现场及后续连贯的商务行动。"],
        ["建立可信市场存在", "在合适的行业、专家、机构或内容环境中，让企业真实出现。"],
        ["补充本地执行能力", "为中国总部或精简欧洲团队增加英国本地协调与执行支持。"]
      ]
    : [
        [
          "Validate the market",
          "Decide whether the UK or European opportunity merits investment, where to begin and what to test next."
        ],
        [
          "Build commercial relationships",
          "Identify and engage buyers, distributors, channel partners and relevant industry stakeholders."
        ],
        [
          "Deliver launches and exhibitions",
          "Turn a fixed market date into joined-up activity before, during and after the event."
        ],
        [
          "Establish credible market presence",
          "Show up in the right industry, expert, institutional or content environment."
        ],
        [
          "Add local execution capacity",
          "Give Chinese headquarters or a lean European team a UK coordination and delivery layer."
        ]
      ];
  const solutions = zh
    ? [
        [
          "市场验证与进入",
          "市场格局、竞争环境、机会判断、相关方梳理与首步行动建议。",
          "在大规模投入前，先决定钱和时间应该放在哪里。"
        ],
        [
          "买家、伙伴与行业参与",
          "买家与经销商研究、合作方识别、商务会面及行业参与。",
          "建立能够推动市场进展的本地关系。"
        ],
        [
          "发布、展会与本地激活",
          "展会计划、发布活动、场地、本地团队、现场统筹与利益相关方协调。",
          "把一次市场节点变成完整的商务计划。"
        ],
        [
          "行业影响力、内容与市场资产",
          "在适用时组织专家、高校、创作者、摄影、影片、采访与项目记录。",
          "留下可用于销售、传播和后续跟进的资产。"
        ]
      ]
    : [
        [
          "Market Validation & Entry",
          "Market landscape, competitor context, opportunity assessment, stakeholder mapping and a first-action recommendation.",
          "Decide where to invest before committing heavily."
        ],
        [
          "Buyers, Partners & Industry Engagement",
          "Buyer and distributor research, partner identification, business meetings and industry participation.",
          "Build local relationships that can move the market forward."
        ],
        [
          "Launches, Exhibitions & Local Activation",
          "Exhibition planning, launches, venues, local teams, on-site coordination and stakeholder coordination.",
          "Turn a market moment into a complete commercial programme."
        ],
        [
          "Credibility, Content & Market Assets",
          "Expert, university or creator engagement where relevant, plus photography, film, interviews and project records.",
          "Leave with assets that support sales, communications and follow-up."
        ]
      ];
  const benefits = zh
    ? [
        ["本地判断", "依据英国与欧洲市场语境决定怎么做，而不是机械执行总部指令。"],
        ["一个统筹窗口", "由同一个团队连接商务需求、当地关系、时间、审批与现场执行。"],
        ["中欧沟通", "把中国总部目标转化为当地团队可以准确理解并推进的行动。"],
        ["灵活本地能力", "围绕当前任务补齐所需能力，不必立即自建全部职能。"],
        ["活动后继续推进", "及时整理关系、市场信息、获准内容和下一步商务跟进。"]
      ]
    : [
        [
          "Local judgement",
          "Choose the right action for the UK or European context, rather than simply following headquarters instructions mechanically."
        ],
        [
          "One point of coordination",
          "Connect the brief, local relationships, timing, approvals and live execution through one team."
        ],
        [
          "China–Europe communication",
          "Turn the headquarters goal into action that local teams can understand and advance."
        ],
        [
          "Flexible local capability",
          "Add the capability the current goal requires without immediately building every function in-house."
        ],
        [
          "Continued progress after the event",
          "Organise relationships, market information, approved content and commercial follow-up while momentum is fresh."
        ]
      ];
  const exhibition = zh
    ? [
        ["活动前", "梳理目标买家、经销商或合作方；安排重点会面；明确本地叙事与跟进计划。"],
        ["活动现场", "统筹现场执行、利益相关方互动，以及获准用于市场沟通的内容记录。"],
        ["活动后", "整理联系人、市场反馈、后续材料与下一步行动，让展会真正进入商务管道。"]
      ]
    : [
        [
          "Before",
          "Map target buyers, distributors or partners; arrange priority meetings; define the local narrative and follow-up plan."
        ],
        [
          "On the ground",
          "Coordinate on-site delivery, stakeholder engagement and approved material for market communications."
        ],
        [
          "After",
          "Organise contacts, market feedback, follow-up material and next actions so the exhibition feeds the commercial pipeline."
        ]
      ];

  return (
    <>
      <section className="bg-ink pt-[76px] text-pearl lg:pt-[88px]" data-audience-page="companies">
        <Container className="grid gap-12 py-16 lg:min-h-[720px] lg:grid-cols-12 lg:items-center lg:py-24">
          <div className="lg:col-span-7">
            <Eyebrow className="text-champagne">{zh ? "面向中国企业" : "FOR CHINESE COMPANIES"}</Eyebrow>
            <h1 className="type-display-page mt-7 max-w-[17ch] md:max-w-[18ch] lg:max-w-[15ch]">
              {zh
                ? "以本地商业执行，进入并拓展英国与欧洲市场。"
                : "Enter and grow in the UK & Europe with local commercial execution."}
            </h1>
            <p className="type-lede mt-8 text-pearl/70">
              {zh
                ? "当英国或欧洲机会已经变得具体——无论是验证市场、寻找买家、筹备展会、落地发布，还是为精简欧洲团队补充执行能力——Venus Bridge 都可以在本地推进工作。"
                : "Venus Bridge works with Chinese companies when a UK or European opportunity has become real—whether that means validating the market, finding buyers, preparing for an exhibition, launching locally or adding capacity around a lean European team."}
            </p>
            <p className="text-pearl/58 mt-5 max-w-2xl text-base leading-7">
              {zh
                ? "我们帮助确定正确行动、推进相关本地关系，并把工作落实到现场。"
                : "We help define the right action, coordinate the relevant local relationships and deliver the work on the ground."}
            </p>
            <ButtonLink href={withLanguage("/contact?intent=company", language)} className="mt-9" showArrow>
              {zh ? "沟通英国 / 欧洲计划" : "Discuss Your UK / European Plans"}
            </ButtonLink>
          </div>
          <div className="lg:col-span-5" data-audience-hero-media>
            <EditorialScene
              scene={portfolio("leapmotor-iaa-2023", "cover")}
              language={language}
              priority
              sizes="(min-width:1024px) 40vw, 100vw"
              fit="contain"
              mediaRole="hero-landscape"
            />
          </div>
        </Container>
      </section>

      <Section id="market-validation-entry" className="scroll-mt-24 bg-pearl">
        <Container>
          <Eyebrow>{zh ? "我们在哪里创造价值" : "WHERE WE CREATE VALUE"}</Eyebrow>
          <h2 className="editorial-heading heading-measure-standard mt-5 max-w-[15ch]">
            {zh ? "当英国或欧洲机会需要真正开始推进。" : "When the UK or European opportunity needs to move."}
          </h2>
          <div className="mt-10 min-[1200px]:hidden">
            <MobileIndexedStory
              items={situations.map(([title, description]) => ({ title, description }))}
              label={zh ? "企业市场机会旅程" : "Company market opportunity journey"}
              scrollLinked
            />
          </div>
          <div className="mt-10 hidden border-l border-t border-ink/15 min-[1200px]:mt-14 min-[1200px]:grid min-[1200px]:grid-cols-5">
            {situations.map(([title, text], index) => (
              <article key={title} className="border-b border-r border-ink/15 p-6 lg:min-h-64">
                <span className="text-xs text-champagne">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-9 text-xl font-medium">{title}</h3>
                <p className="mt-5 text-sm leading-6 text-ink/65">{text}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="creative-production-brand-assets" className="scroll-mt-24 bg-porcelain">
        <Container>
          <Eyebrow>{zh ? "解决路径" : "SOLUTION ROUTES"}</Eyebrow>
          <h2 className="editorial-heading heading-measure-standard mt-5 max-w-[14ch]">
            {zh ? "围绕商业结果组合本地行动。" : "Local action assembled around the commercial result."}
          </h2>
          <div
            className="mt-10 grid border-t border-ink/15 md:grid-cols-2 lg:mt-14"
            data-company-solution-grid
            data-editorial-reveal
            data-editorial-stagger
          >
            {solutions.map(([title, scope, value], index) => (
              <article
                key={title}
                className="border-b border-ink/15 py-8 md:px-8 md:odd:border-r md:odd:pl-0 lg:min-h-80"
              >
                <span className="text-xs text-champagne">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-9 text-2xl font-medium">{title}</h3>
                <p className="mt-5 max-w-xl text-base leading-7 text-ink/65">{scope}</p>
                <p className="mt-7 border-l border-champagne pl-4 text-sm font-medium leading-6">{value}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-2 text-sm">
            <span className="text-ink/70">{zh ? "查看相关项目" : "See relevant projects"}</span>
            <ButtonLink
              href={withLanguage("/work?category=market-presence", language)}
              variant="ghost"
              showArrow
            >
              {zh ? "市场进入与发布" : "Market Entry & Launch"}
            </ButtonLink>
            <ButtonLink
              href={withLanguage("/work?category=industry-credibility", language)}
              variant="ghost"
              showArrow
            >
              {zh ? "行业与展会" : "Industry & Exhibitions"}
            </ButtonLink>
            <ButtonLink
              href={withLanguage("/work?category=brand-evidence", language)}
              variant="ghost"
              showArrow
            >
              {zh ? "品牌与内容" : "Brand & Content"}
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <Section className="bg-night text-pearl">
        <Container>
          <Eyebrow className="text-champagne">{zh ? "客户获得什么" : "WHAT CLIENTS GAIN"}</Eyebrow>
          <h2 className="editorial-heading heading-measure-wide mt-5 max-w-[14ch]">
            {zh
              ? "更快行动，更少复杂度，更强本地连续性。"
              : "Faster action. Less complexity. Stronger local continuity."}
          </h2>
          <div
            className="mt-10 grid border-y border-pearl/15 md:grid-cols-5 lg:mt-14"
            data-company-benefit-grid
            data-editorial-reveal
            data-editorial-stagger
          >
            {benefits.map(([title, text], index) => (
              <article
                key={title}
                className="border-b border-pearl/15 py-7 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0 lg:min-h-64"
              >
                <span className="text-xs text-champagne">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-10 text-xl font-medium">{title}</h3>
                <p className="mt-4 text-sm leading-6 text-pearl/60">{text}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="industry-presence-events" className="scroll-mt-24 bg-pearl">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow>{zh ? "从展会到商务管道" : "FROM EXHIBITION TO PIPELINE"}</Eyebrow>
              <h2 className="editorial-heading heading-measure-standard mt-5 max-w-[13ch]">
                {zh
                  ? "把固定日期变成前后连贯的商务行动。"
                  : "Turn a fixed date into joined-up commercial activity."}
              </h2>
            </div>
            <p className="type-body lg:col-span-4 lg:col-start-9 lg:self-end">
              {zh
                ? "展会价值不只在展台当天，而在目标关系、现场判断与后续推进能否连成一条线。"
                : "The value of an exhibition is not confined to the stand. It comes from connecting target relationships, on-the-ground market judgement and follow-up."}
            </p>
          </div>
          <ol className="mt-12 grid border-y border-ink/15 md:grid-cols-3">
            {exhibition.map(([title, text], index) => (
              <li
                key={title}
                className="border-b border-ink/15 py-7 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0 lg:min-h-60"
              >
                <span className="text-xs text-champagne">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-10 text-2xl font-medium">{title}</h3>
                <p className="mt-5 text-sm leading-7 text-ink/65">{text}</p>
              </li>
            ))}
          </ol>
          <div
            id="local-team-capability"
            className="mt-16 grid scroll-mt-24 gap-8 border-t border-ink/15 pt-10 lg:grid-cols-12"
          >
            <div className="lg:col-span-7">
              <Eyebrow>{zh ? "本地团队能力" : "LOCAL TEAM CAPABILITY"}</Eyebrow>
              <h3 className="mt-5 max-w-[15ch] text-3xl font-medium leading-tight lg:text-4xl">
                {zh
                  ? "在自建完整团队之前，先补上关键执行能力。"
                  : "Add key execution capability before building a full local team."}
              </h3>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="text-base leading-7 text-ink/65">
                {zh
                  ? "Venus Bridge 可以与总部和现有英国或欧洲团队并肩工作，围绕明确任务补充市场协调、合作方对接与执行能力。高校、研究人员及人才能力仅在有助于技术可信度、雇主品牌或行业交流时加入。"
                  : "Venus Bridge can work alongside headquarters and existing UK or European teams, adding market coordination, partner engagement and execution around a defined goal. University, researcher and talent expertise is brought in selectively for technical credibility, employer branding or industry dialogue."}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-ink text-pearl">
        <Container className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Eyebrow className="text-champagne">
              {zh ? "从市场结果开始" : "START WITH THE MARKET RESULT"}
            </Eyebrow>
            <h2 className="editorial-heading mt-5 max-w-[14ch]">
              {zh
                ? "告诉我们，英国或欧洲现在需要发生什么。"
                : "Tell us what needs to happen in the UK or Europe."}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-pearl/65">
              {zh
                ? "不需要先准备完整方案。说明市场、目标、时间和已经确定的条件，我们会判断是否匹配并建议下一步。"
                : "You do not need a finished brief. Share the market, goal, timing and anything already agreed or in place; we will assess the fit and suggest the most useful next step."}
            </p>
          </div>
          <ButtonLink
            href={withLanguage("/contact?intent=company", language)}
            variant="secondary"
            className="border-pearl/30 text-pearl hover:bg-pearl hover:text-ink"
            showArrow
          >
            {zh ? "沟通英国 / 欧洲计划" : "Discuss Your UK / European Plans"}
          </ButtonLink>
        </Container>
      </Section>
    </>
  );
}

export function PartnersJourney({ language }: { language: Language }) {
  const zh = language === "zh";
  const types = zh
    ? ["高校与研究人员", "行业专家", "专业服务机构", "创作者与人才", "场地与活动执行", "本地交付团队"]
    : [
        "Universities & Researchers",
        "Industry Specialists",
        "Professional Services",
        "Creators & Talent",
        "Venues & Event Operations",
        "Local Delivery Teams"
      ];
  const values = zh
    ? [
        ["相关机会", "仅在项目与贵方能力、受众或环境真正匹配时发出邀请。"],
        ["清楚商业背景", "在沟通参与前说明企业、市场目标与合作相关性。"],
        ["明确范围", "提前确认角色、时间、交付内容、审批与使用方式。"],
        ["双语协调", "减少中国企业与英国、欧洲团队之间的信息损耗。"],
        ["统一项目接口", "由 Venus Bridge 连接跨境沟通与本地执行。"],
        ["长期匹配", "首次合作顺利且相关性持续时，再自然推进后续机会。"]
      ]
    : [
        [
          "Relevant opportunities",
          "Invitations begin only when the project genuinely fits your capability, audience or environment."
        ],
        [
          "Clear commercial context",
          "Understand the company, market goal and reason for the collaboration before becoming involved."
        ],
        ["Defined scope", "Agree roles, timing, deliverables, approvals and usage before delivery."],
        [
          "Bilingual coordination",
          "Reduce information loss between Chinese companies and UK or European teams."
        ],
        ["One project interface", "Venus Bridge connects cross-border communication with local delivery."],
        [
          "Long-term fit",
          "When the first project works well and relevance continues, further opportunities can follow naturally."
        ]
      ];
  const process = zh
    ? [
        ["说明背景", "介绍企业、市场目标与项目时机。"],
        ["确认匹配", "判断项目对双方是否真正有价值。"],
        ["明确范围", "确认角色、授权、时间与交付内容。"],
        ["统一推进", "连接跨境沟通、审批与当地执行。"],
        ["延续价值", "整理成果与关系，为合适的后续合作保留基础。"]
      ]
    : [
        ["Share the context", "Explain the company, market goal and project timing."],
        ["Confirm the fit", "Assess whether the project creates genuine value for both sides."],
        ["Define the scope", "Agree roles, approvals, timing and deliverables."],
        ["Coordinate delivery", "Connect cross-border communication, approvals and local execution."],
        [
          "Carry the value forward",
          "Organise outputs and relationships so relevant future work has a strong base."
        ]
      ];

  return (
    <>
      <section className="bg-ink pt-[76px] text-pearl lg:pt-[88px]" data-audience-page="partners">
        <Container className="grid gap-12 py-16 lg:min-h-[720px] lg:grid-cols-12 lg:items-center lg:py-24">
          <div className="lg:col-span-7">
            <Eyebrow className="text-champagne">
              {zh ? "面向英国与欧洲合作方" : "FOR UK & EUROPEAN PARTNERS"}
            </Eyebrow>
            <h1 className="type-display-page mt-7 max-w-[17ch] md:max-w-[18ch] lg:max-w-[15ch]">
              {zh
                ? "参与背景清楚、与你真正相关的中国企业项目。"
                : "Access relevant China-related opportunities with clear commercial context."}
            </h1>
            <p className="type-lede mt-8 text-pearl/70">
              {zh
                ? "Venus Bridge 连接有明确英国或欧洲目标的中国企业，与真正适合项目的机构、专家、场地和专业团队。我们说明背景、确定范围、双语协调，并统一推进本地执行。"
                : "Venus Bridge connects Chinese companies with defined UK or European goals to organisations, experts, venues and specialist teams that genuinely fit the work. We explain the context, define the scope, coordinate bilingually and manage local delivery."}
            </p>
            <ButtonLink href={withLanguage("/contact?intent=partner", language)} className="mt-9" showArrow>
              {zh ? "介绍你的机构" : "Introduce Your Organisation"}
            </ButtonLink>
          </div>
          <div className="lg:col-span-5" data-audience-hero-media>
            <EditorialScene
              scene={capability("vbm-024")}
              language={language}
              priority
              sizes="(min-width:1024px) 40vw, 100vw"
              fit="contain"
              mediaRole="hero-landscape"
            />
          </div>
        </Container>
      </section>

      <Section id="capabilities-a-project-may-require" className="scroll-mt-24 bg-pearl">
        <Container>
          <Eyebrow>{zh ? "项目可能需要的能力" : "CAPABILITIES A PROJECT MAY REQUIRE"}</Eyebrow>
          <h2 className="editorial-heading heading-measure-standard mt-5 max-w-[14ch]">
            {zh ? "由项目目标决定谁需要加入。" : "The project goal determines who needs to be involved."}
          </h2>
          <ul
            className="mt-10 grid border-y border-ink/15 md:mt-12 md:grid-cols-3"
            data-partner-type-list
            data-editorial-reveal
            data-editorial-stagger
          >
            {types.map((item, index) => (
              <li
                key={item}
                className="border-b border-ink/15 p-7 md:border-r lg:min-h-40 md:[&:nth-child(3n)]:border-r-0"
              >
                <span className="text-xs text-champagne">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-9 text-xl font-medium">{item}</h3>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section className="bg-porcelain">
        <Container>
          <Eyebrow>{zh ? "合作方获得什么" : "WHAT PARTNERS RECEIVE"}</Eyebrow>
          <h2 className="editorial-heading heading-measure-wide mt-5 max-w-[14ch]">
            {zh
              ? "相关机会、清楚范围和顺畅跨境协作。"
              : "Relevant opportunities, clear scope and smoother cross-border collaboration."}
          </h2>
          <div
            className="mt-10 grid border-t border-ink/15 md:grid-cols-2 lg:mt-14 lg:grid-cols-3"
            data-partner-fit-grid
            data-editorial-reveal
            data-editorial-stagger
          >
            {values.map(([title, text], index) => (
              <article
                key={title}
                className="border-b border-ink/15 py-7 md:px-7 lg:min-h-64 lg:border-r lg:[&:nth-child(3n)]:border-r-0"
              >
                <span className="text-xs text-champagne">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-9 text-2xl font-medium">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-ink/65">{text}</p>
              </article>
            ))}
          </div>
          <ButtonLink href={withLanguage("/work", language)} variant="ghost" className="mt-8" showArrow>
            {zh ? "查看案例研究" : "View Case Studies"}
          </ButtonLink>
        </Container>
      </Section>

      <Section className="bg-night text-pearl">
        <Container>
          <Eyebrow className="text-champagne">{zh ? "合作如何展开" : "HOW WE WORK WITH PARTNERS"}</Eyebrow>
          <h2 className="editorial-heading heading-measure-standard mt-5 max-w-[14ch]">
            {zh
              ? "从商业背景到项目成果，全程保持清楚。"
              : "Clear from commercial context through to useful outputs."}
          </h2>
          <div className="mt-10 min-[1200px]:hidden">
            <MobileIndexedStory
              items={process.map(([title, description]) => ({ title, description }))}
              label={zh ? "合作方项目流程" : "Partner project process"}
              dark
              scrollLinked
            />
          </div>
          <ol
            className="mt-10 hidden border-y border-pearl/15 min-[1200px]:mt-14 min-[1200px]:grid min-[1200px]:grid-cols-5"
            data-editorial-reveal
            data-editorial-stagger
          >
            {process.map(([title, text], index) => (
              <li
                key={title}
                className="border-b border-pearl/15 py-7 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0 lg:min-h-64"
              >
                <span className="text-xs text-champagne">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-12 text-xl font-medium">{title}</h3>
                <p className="mt-4 text-sm leading-6 text-pearl/60">{text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section className="bg-pearl">
        <Container className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5" data-partner-proof-media>
            <EditorialScene
              scene={capability("vbm-003")}
              language={language}
              sizes="(min-width:1024px) 40vw, 100vw"
              mediaRole="proof-landscape"
            />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Eyebrow>{zh ? "介绍你的机构" : "INTRODUCE YOUR ORGANISATION"}</Eyebrow>
            <h2 className="editorial-heading mt-5 max-w-[13ch]">
              {zh ? "让我们了解哪些项目最适合你。" : "Tell us which opportunities are a genuine fit."}
            </h2>
            <p className="mt-7 text-lg leading-8 text-ink/65">
              {zh
                ? "如果你代表高校、研究团队、行业机构、专业服务、场地、创意团队或其他本地执行能力，请介绍你们的工作，以及最有价值的合作场景。"
                : "If you represent a university, research team, industry organisation, professional service, venue, creative team or another local capability, introduce your work and the situations where collaboration creates the most value."}
            </p>
            <ButtonLink href={withLanguage("/contact?intent=partner", language)} className="mt-9" showArrow>
              {zh ? "介绍你的机构" : "Introduce Your Organisation"}
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
