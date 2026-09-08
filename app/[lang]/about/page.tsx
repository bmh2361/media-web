import { notFound } from "next/navigation";
import { CrossBorderGlobe } from "@/components/globe/CrossBorderGlobe";
import { EditorialReveal } from "@/components/motion/EditorialReveal";
import { MobileIndexedStory } from "@/components/motion/MobileIndexedStory";
import { AboutTeam } from "@/components/sections/AboutTeam";
import { ButtonLink } from "@/components/ui/Button";
import { isSupportedLocale, withLanguage } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) return {};
  return buildMetadata({
    lang,
    path: "/about",
    title:
      lang === "zh"
        ? "关于 Venus Bridge | 中国企业英国与欧洲市场执行"
        : "About Venus Bridge | China–UK & Europe Market Execution",
    description:
      lang === "zh"
        ? "认识连接中国总部目标与英国、欧洲本地市场行动的跨境运营团队。"
        : "Meet the cross-border operating team connecting Chinese headquarters goals with market action in the UK and Europe."
  });
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) notFound();
  const zh = lang === "zh";

  const fragmentation = zh
    ? ["市场方向", "买家与合作关系", "行业与专业能力", "现场执行", "后续商务跟进"]
    : [
        "Market direction",
        "Buyers & partner relationships",
        "Industry & specialist capability",
        "Live delivery",
        "Commercial follow-through"
      ];
  const principles = zh
    ? ["商业方向一致", "本地关系有人推进", "现场执行有人负责", "项目结束后继续跟进"]
    : [
        "Aligned commercial direction",
        "Local relationships actively managed",
        "Clear ownership of on-site delivery",
        "Follow-through after the project"
      ];
  const operatingFrame = zh
    ? [
        { title: "总部商业目标", description: "明确企业进入英国与欧洲所要解决的商业问题。" },
        { title: "英国与欧洲市场判断", description: "判断市场、合作关系与行动优先级。" },
        { title: "本地协同推进", description: "协调相关合作方与本地执行。" }
      ]
    : [
        {
          title: "Headquarters commercial objectives",
          description:
            "Define the commercial problem the company needs to solve when entering the UK and European markets."
        },
        {
          title: "UK & European market judgement",
          description: "Assess the market, relevant relationships and priorities for action."
        },
        {
          title: "Coordinated local action",
          description: "Coordinate relevant partners and delivery on the ground."
        }
      ];

  return (
    <>
      <section
        className="relative overflow-hidden bg-porcelain pt-[76px] lg:pt-[88px]"
        data-about-chapter="identity"
      >
        <div className="container-x relative py-8 md:py-9 lg:py-5">
          <div className="text-ink/42 flex items-center justify-between border-b border-ink/15 pb-4 text-[11px] uppercase tracking-editorial">
            <span>01 / {zh ? "跨境市场运营" : "CROSS-BORDER MARKET OPERATIONS"}</span>
            <span className="hidden sm:inline">BEIJING · LONDON · EUROPE</span>
          </div>

          <div className="mt-7 grid gap-x-8 gap-y-8 lg:grid-cols-12 lg:gap-y-0">
            <EditorialReveal className={zh ? "lg:col-span-6" : "lg:col-span-7"}>
              <p className="text-xs uppercase tracking-editorial text-champagne">
                {zh ? "关于我们" : "ABOUT US"}
              </p>
              <h1
                className={`zh-display-measure mt-5 font-medium leading-[1.01] tracking-[-0.045em] ${zh ? "max-w-[17ch] text-[clamp(2.5rem,4.35vw,4.2rem)]" : "max-w-[20ch] text-[clamp(2.25rem,3.8vw,3.7rem)]"}`}
              >
                {zh ? (
                  <>
                    <span className="block">服务中国企业</span>
                    <span className="block">英国与欧洲发展的</span>
                    <span className="block">跨境运营团队。</span>
                  </>
                ) : (
                  "A cross-border operating team for Chinese companies building in the UK and Europe."
                )}
              </h1>
            </EditorialReveal>

            <EditorialReveal
              className={`max-w-md border-l border-ink/20 pl-5 lg:mt-14 lg:pl-7 ${zh ? "lg:col-span-4 lg:col-start-9" : "lg:col-span-5 lg:col-start-8"}`}
              delay={0.08}
            >
              <p
                className={`text-ink/68 text-base leading-7 md:text-lg md:leading-8 ${zh ? "" : "lg:text-base lg:leading-7"}`}
              >
                {zh
                  ? "Venus Bridge 是面向中国企业的跨境商业合作与英国、欧洲市场执行团队，将总部目标、相关商业关系与本地交付连接成协同行动。"
                  : "Venus Bridge is a cross-border team focused on commercial partnerships and market execution, connecting Chinese headquarters goals, relevant relationships and delivery on the ground across the UK and Europe."}
              </p>
              <p className="mt-4 text-sm leading-6 text-ink/65">
                {zh
                  ? "从总部目标，到市场判断，再到本地执行。"
                  : "From headquarters commercial objectives to market judgement and local delivery."}
              </p>
            </EditorialReveal>
          </div>

          <div className="mt-9 md:hidden">
            <MobileIndexedStory
              items={operatingFrame.map((item) => ({ title: item.title, description: item.description }))}
              label={zh ? "跨境市场运营逻辑" : "Cross-border operating frame"}
              compact
              headingLevel={2}
            />
          </div>
          <ol
            className="mt-9 hidden border-y border-ink/15 md:grid md:grid-cols-3 lg:mt-10"
            aria-label={zh ? "跨境市场运营逻辑" : "Cross-border operating frame"}
          >
            {operatingFrame.map((item, index) => (
              <li
                key={item.title}
                className="border-b border-ink/15 py-5 last:border-b-0 sm:border-b-0 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0 lg:py-6"
              >
                <span className="text-[11px] text-champagne">0{index + 1}</span>
                <h2 className="mt-4 text-base font-medium leading-6 text-ink/80">{item.title}</h2>
                <p className="text-ink/56 mt-2 max-w-[29ch] text-sm leading-6">{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-mist py-16 lg:py-[4.25rem]" data-about-chapter="why" aria-labelledby="why-title">
        <div className="container-x">
          <p className="text-xs uppercase tracking-editorial text-champagne">
            {zh ? "我们为何存在" : "WHY WE EXIST"}
          </p>
          <div className="mt-7 grid gap-10 lg:grid-cols-12 lg:gap-8">
            <EditorialReveal className="lg:col-span-6">
              <h2
                id="why-title"
                className="type-display-page zh-display-measure heading-measure-wide max-w-[11ch]"
              >
                {zh
                  ? "关键是让每一个本地行动都服务同一个商业目标。"
                  : "Make every local action work towards the same commercial goal."}
              </h2>
            </EditorialReveal>

            <div className="lg:col-span-5 lg:col-start-8">
              <p className="text-ink/66 text-lg leading-8">
                {zh
                  ? "进入新市场可能涉及买家、经销商、行业机构、专业能力、内容、现场执行与后续跟进。商业目标决定哪些关系与能力真正重要；Venus Bridge 把这些环节连接到同一个市场结果。"
                  : "Entering a new market can involve buyers, distributors, industry organisations, specialist capability, content, live delivery and follow-up. The commercial objective determines which relationships and capabilities matter; Venus Bridge connects them to one market result."}
              </p>
              <ul
                className="mt-7 border-t border-ink/15"
                aria-label={zh ? "需要连接的项目要素" : "Project elements to connect"}
              >
                {fragmentation.map((item, index) => (
                  <li
                    key={item}
                    className="text-ink/52 grid grid-cols-[2.5rem_1fr] border-b border-ink/15 py-3 text-sm"
                  >
                    <span className="text-champagne">{String(index + 1).padStart(2, "0")}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-7 border-l border-champagne pl-6 text-xl leading-8 text-ink">
                {zh
                  ? "对中国总部来说，我们是英国与欧洲市场行动的本地运营层。"
                  : "For Chinese headquarters, we provide the local operating layer for UK and European market activity."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <CrossBorderGlobe language={lang} />

      <AboutTeam language={lang} />

      <section
        className="section-y bg-mist"
        aria-labelledby="accountability-title"
        data-about-chapter="accountability"
      >
        <div className="container-x">
          <p className="text-xs uppercase tracking-editorial text-champagne">
            {zh ? "一条持续推进的本地路径" : "ONE CONTINUOUS LOCAL ROUTE"}
          </p>
          <div className="mt-7 grid gap-10 lg:grid-cols-12 lg:items-end">
            <h2
              id="accountability-title"
              className="type-heading-section zh-display-measure heading-measure-standard max-w-[14ch] lg:col-span-8"
            >
              {zh
                ? "从最初市场判断到现场执行与后续跟进，工作始终保持连接。"
                : "Connected from the initial market assessment through on-site delivery and follow-through."}
            </h2>
            <p className="text-ink/56 max-w-sm text-base leading-7 lg:col-span-3 lg:col-start-10">
              {zh
                ? "一个本地协调点，让总部更快掌握进展。"
                : "One local coordination point helps headquarters track progress more quickly."}
            </p>
          </div>
          <ol className="mt-12 grid grid-cols-2 border-y border-ink/15 lg:grid-cols-4">
            {principles.map((principle, index) => (
              <li
                key={principle}
                className="min-h-28 border-b border-r border-ink/15 py-5 pr-4 even:border-r-0 lg:min-h-36 lg:border-b-0 lg:py-6 lg:pl-6 lg:pr-5 lg:first:pl-0 lg:last:border-r-0 lg:even:border-r"
              >
                <span className="text-xs text-champagne">{String(index + 1).padStart(2, "0")}</span>
                <p className="mt-8 max-w-[14ch] text-lg font-medium leading-7">{principle}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-ink py-20 text-pearl lg:py-28" data-about-chapter="next-step">
        <div className="container-x container-standard grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-editorial text-champagne">
              {zh ? "下一步" : "NEXT STEP"}
            </p>
            <h2 className="type-display-page zh-display-measure mt-6 max-w-[13ch]">
              {zh ? "从你希望真正推进的项目开始。" : "Start with the project you are trying to make happen."}
            </h2>
            <ButtonLink
              href={withLanguage("/how-we-work", lang)}
              variant="ghost"
              className="mt-5 px-0 text-pearl"
              showArrow
            >
              {zh ? "了解工作方式" : "See How We Work"}
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
