import { notFound } from "next/navigation";
import { EditorialScene } from "@/components/sections/phase32c/EditorialScene";
import { MobileIndexedStory } from "@/components/motion/MobileIndexedStory";
import { ButtonLink } from "@/components/ui/Button";
import { capabilityMediaById, type CapabilityMedia } from "@/content/capability-media";
import { isSupportedLocale, withLanguage } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

const processMedia = capabilityMediaById("vbm-003") as CapabilityMedia | undefined;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) return {};
  return buildMetadata({
    lang,
    path: "/how-we-work",
    title:
      lang === "zh"
        ? "Venus Bridge 如何交付英国与欧洲项目"
        : "How Venus Bridge Delivers UK & European Projects",
    description:
      lang === "zh"
        ? "了解 Venus Bridge 如何从商业目标出发，设计本地行动、推进关系、管理执行，并在项目后继续跟进。"
        : "How Venus Bridge turns a commercial goal into local action, coordinates relationships, manages delivery and follows through after the live moment."
  });
}

export default async function HowWeWorkPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) notFound();
  const zh = lang === "zh";
  const responsibilities = zh
    ? [
        ["商业方向", "明确市场结果、优先级、限制条件和成功标准。"],
        ["本地路径", "把目标转化为适合英国或欧洲市场的具体行动。"],
        ["关系与执行", "推进所需本地关系，并管理时间、沟通、审批与现场工作。"],
        ["后续跟进", "整理关系、市场信息、获准内容及下一步行动。"]
      ]
    : [
        [
          "Commercial direction",
          "Clarify the market result, priorities, constraints and definition of success."
        ],
        ["Local route", "Turn the goal into action that fits the UK or European market."],
        [
          "Relationships & delivery",
          "Advance the required local relationships and manage timing, communication, approvals and live work."
        ],
        ["Follow-through", "Organise relationships, market learning, approved material and next actions."]
      ];
  const stages = zh
    ? [
        ["理解", "明确商业目标、市场阶段、时间及已经确定的条件。"],
        ["设计", "形成适合当地市场、能够真正推进目标的行动路径。"],
        ["激活", "启动相关买家、伙伴、行业或专业关系，并统一工作范围。"],
        ["交付", "管理本地执行、沟通、审批与现场判断。"],
        ["跟进", "整理商务关系、市场信息、项目资产与下一步行动。"]
      ]
    : [
        ["Understand", "Clarify the commercial goal, market stage, timing and anything already committed."],
        ["Design", "Create a locally relevant route that can move the goal forward."],
        [
          "Activate",
          "Engage the required buyer, partner, industry or specialist relationships around a clear scope."
        ],
        ["Deliver", "Manage local execution, communication, approvals and live decisions."],
        [
          "Follow Through",
          "Organise commercial relationships, market learning, project assets and next actions."
        ]
      ];
  const timings = zh
    ? [
        ["活动前", "目标关系、重点会面、本地叙事、排期与跟进计划。"],
        ["现场", "利益相关方协调、现场执行、即时判断与获准内容。"],
        ["活动后", "商务跟进、市场反馈、关系延续与可复用项目资产。"]
      ]
    : [
        ["Before", "Target relationships, priority meetings, local narrative, schedule and follow-up plan."],
        [
          "On the ground",
          "Stakeholder coordination, live delivery, immediate decisions and approved content."
        ],
        [
          "After",
          "Commercial follow-up, market feedback, relationship continuity and reusable project assets."
        ]
      ];
  return (
    <>
      <section className="bg-porcelain pt-[76px] lg:pt-[88px]">
        <div className="container-x grid gap-12 py-20 lg:min-h-[720px] lg:grid-cols-12 lg:items-center lg:py-24">
          <div className="lg:col-span-7">
            <p className="text-xs uppercase tracking-editorial text-champagne">
              {zh ? "工作方式" : "HOW WE WORK"}
            </p>
            <h1 className="type-display-page zh-display-measure mt-7 max-w-[17ch] md:max-w-[18ch] lg:max-w-[15ch]">
              {zh
                ? "从一个具体市场目标，到真正落地并持续推进。"
                : "From one commercial goal to local action and follow-through."}
            </h1>
            <p className="type-lede text-ink/66 mt-8">
              {zh
                ? "先说明英国或欧洲需要实现什么。我们会判断合适的本地行动、所需关系与执行路径，并把各环节连接起来。"
                : "Start with what needs to happen in the UK or Europe. We define the right local action, relationships and delivery route, then keep the work connected."}
            </p>
          </div>
          {processMedia?.websiteUseApproved && processMedia.mediaRightsApproved ? (
            <div className="lg:col-span-5">
              <EditorialScene
                scene={{ kind: "capability", media: processMedia }}
                language={lang}
                sizes="(min-width:1024px) 40vw, 100vw"
                priority
                mediaRole="hero-landscape"
              />
              <p className="mt-4 text-sm leading-6 text-ink/65">
                {zh
                  ? "市场判断、关系推进与现场执行，进入同一条工作路径。"
                  : "Market judgement, relationship engagement and live delivery follow one working route."}
              </p>
            </div>
          ) : null}
        </div>
      </section>

      <section className="section-y bg-ink text-pearl">
        <div className="container-x">
          <p className="text-xs uppercase tracking-editorial text-champagne">
            {zh ? "我们承担什么" : "WHAT WE TAKE RESPONSIBILITY FOR"}
          </p>
          <h2 className="type-heading-section zh-display-measure heading-measure-standard mt-6 max-w-[13ch]">
            {zh
              ? "一个本地团队，把商务方向与现场行动连接起来。"
              : "One local team connecting commercial direction with action on the ground."}
          </h2>
          <div
            className="mt-10 grid border-l border-t border-pearl/15 md:grid-cols-2 lg:mt-14"
            data-how-principles
            data-editorial-reveal
            data-editorial-stagger
          >
            {responsibilities.map(([title, text], index) => (
              <article key={title} className="border-b border-r border-pearl/15 p-7 lg:min-h-56">
                <span className="text-xs text-champagne">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-10 text-2xl font-medium">{title}</h3>
                <p className="text-pearl/58 mt-4 max-w-lg text-base leading-7">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-mist">
        <div className="container-x">
          <div className="min-[1200px]:hidden">
            <p className="text-xs uppercase tracking-editorial text-champagne">
              {zh ? "项目顺序" : "THE PROJECT JOURNEY"}
            </p>
            <h2 className="type-heading-section zh-display-measure heading-measure-compact mt-6 max-w-[11ch]">
              {zh ? "五个阶段，从目标到持续跟进。" : "Five stages from objective to follow-through."}
            </h2>
            <div className="mt-10">
              <MobileIndexedStory
                items={stages.map(([title, description]) => ({ title, description }))}
                label={zh ? "五阶段项目顺序" : "Five-stage project journey"}
                contextLabel={zh ? "五个阶段" : "05 STAGES"}
                emphasis="strong"
                scrollLinked
              />
            </div>
          </div>
          <div className="hidden gap-14 min-[1200px]:grid min-[1200px]:grid-cols-[.78fr_1.22fr]">
            <div className="self-start lg:sticky lg:top-32">
              <p className="text-xs uppercase tracking-editorial text-champagne">
                {zh ? "项目顺序" : "THE PROJECT JOURNEY"}
              </p>
              <h2 className="type-heading-section zh-display-measure heading-measure-compact mt-6 max-w-[11ch]">
                {zh ? "五个阶段，从目标到持续跟进。" : "Five stages from objective to follow-through."}
              </h2>
            </div>
            <ol
              className="border-t border-ink/15"
              data-how-process
              data-editorial-reveal
              data-editorial-stagger
            >
              {stages.map(([title, text], index) => (
                <li
                  key={title}
                  className="grid gap-5 border-b border-ink/15 py-8 sm:grid-cols-[64px_1fr] lg:min-h-48"
                >
                  <span className="text-xs text-champagne">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-3xl font-medium">{title}</h3>
                    <p className="text-ink/62 mt-5 max-w-xl text-lg leading-8">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section-y bg-porcelain" aria-labelledby="timing-title">
        <div className="container-x">
          <p className="text-xs uppercase tracking-editorial text-champagne">
            {zh ? "活动前、现场与活动后" : "BEFORE, ON THE GROUND & AFTER"}
          </p>
          <h2
            id="timing-title"
            className="type-heading-section zh-display-measure heading-measure-wide mt-6 max-w-[13ch]"
          >
            {zh
              ? "市场节点只有连到后续行动，才真正有价值。"
              : "A market moment becomes valuable when it connects to what happens next."}
          </h2>
          <ol
            className="mt-12 grid border-y border-ink/15 md:grid-cols-3"
            data-how-timing
            data-editorial-reveal
            data-editorial-stagger
          >
            {timings.map(([title, text], index) => (
              <li
                key={title}
                className="border-b border-ink/15 py-7 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0 lg:min-h-56"
              >
                <span className="text-xs text-champagne">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-10 text-2xl font-medium">{title}</h3>
                <p className="text-ink/62 mt-5 text-base leading-7">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y bg-mist">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="text-xs uppercase tracking-editorial text-champagne">
              {zh ? "专业能力何时加入" : "WHEN SPECIALISTS ENTER"}
            </p>
            <h2 className="type-heading-section zh-display-measure heading-measure-compact mt-6 max-w-[12ch]">
              {zh ? "由目标决定需要什么能力。" : "The goal determines the capability."}
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="type-lede text-ink/65">
              {zh
                ? "研究人员、行业专家、场地、创意团队、人才或本地后勤会在有助于商业结果时加入，并围绕同一份需求、排期与审批路径协作。"
                : "Researchers, industry specialists, venues, creative teams, talent or local logistics join where they strengthen the commercial result, working to one brief, schedule and approval route."}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-pearl lg:py-28">
        <div className="container-x container-standard grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-editorial text-champagne">
              {zh ? "从需求开始" : "START WITH THE NEED"}
            </p>
            <h2 className="type-display-page zh-display-measure mt-6 max-w-[14ch]">
              {zh
                ? "告诉我们，英国或欧洲需要发生什么。"
                : "Tell us what needs to happen in the UK or Europe."}
            </h2>
            <ButtonLink
              href={withLanguage("/about", lang)}
              variant="ghost"
              className="mt-5 px-0 text-pearl"
              showArrow
            >
              {zh ? "认识团队" : "Meet the team"}
            </ButtonLink>
          </div>
          <ButtonLink
            href={withLanguage("/contact", lang)}
            variant="secondary"
            className="border-pearl/30 text-pearl hover:bg-pearl hover:text-ink"
            showArrow
          >
            {zh ? "讨论项目" : "Discuss a Project"}
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
