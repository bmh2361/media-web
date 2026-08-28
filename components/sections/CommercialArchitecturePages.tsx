import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EditorialLink } from "@/components/ui/EditorialLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import {
  customerSituations,
  commercialProducts,
  executionBriefLabel,
  executionClusters,
  fitCallLabel,
  solutions
} from "@/content/commercial-architecture";
import type { Language } from "@/lib/i18n";
import { withLanguage } from "@/lib/i18n";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/structured-data";

export function CustomerSituationHub({ language }: { language: Language }) {
  const zh = language === "zh";
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd({
          lang: language,
          items: [
            { name: "Venus Bridge", path: "/" },
            { name: zh ? "我们如何协助" : "How We Help", path: "/what-we-do" }
          ]
        })}
      />
      <section className="bg-ink pt-16 text-pearl">
        <Container className="py-20 md:py-28">
          <Eyebrow className="text-champagne">{zh ? "我们如何协助" : "HOW WE HELP"}</Eyebrow>
          <h1 className="editorial-heading mt-6 max-w-[15ch]">
            {zh ? "从你正在做出的英国市场决策开始。" : "Start with the UK decision you are making."}
          </h1>
          <p className="body-large mt-7 max-w-2xl text-pearl/65">
            {zh
              ? "我们不是从服务清单开始，而是先确认你当前所处阶段、关键不确定性与需要可靠完成的下一步。"
              : "We start with your stage, main uncertainty and the next step that needs to happen reliably—not a generic service list."}
          </p>
        </Container>
      </section>
      <Section className="bg-porcelain">
        <Container>
          <div className="divide-y divide-ink/15 border-y border-ink/15">
            {customerSituations.map((situation, index) => (
              <article
                key={situation.id}
                className="grid gap-6 py-9 lg:grid-cols-[4rem_.7fr_1.3fr_auto] lg:items-start"
              >
                <span className="text-champagne">0{index + 1}</span>
                <h2 className="text-3xl font-medium">{situation.title[language]}</h2>
                <div>
                  <p className="text-base leading-7 text-ink/65">{situation.signal[language]}</p>
                  <p className="mt-4 text-base leading-7">{situation.decision[language]}</p>
                </div>
                <EditorialLink href={withLanguage(situation.href, language)}>
                  {zh ? "查看路径" : "Explore path"}
                </EditorialLink>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <DualContactCta language={language} />
    </>
  );
}

export function BuildingUkPresencePage({ language }: { language: Language }) {
  const zh = language === "zh";
  const title = zh ? "建立英国市场存在" : "Building UK Presence";
  const description = zh
    ? "为已经完成初步进入或发布、需要持续建立英国市场表达的中国企业，形成可执行的内容与市场节奏。"
    : "For Chinese companies that have moved beyond initial entry or launch and need a practical rhythm of UK-facing content and market moments.";

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          lang: language,
          name: title,
          description,
          path: "/what-we-do/building-uk-presence"
        })}
      />
      <section className="bg-ink pt-16 text-pearl">
        <Container className="py-20 md:py-28">
          <Eyebrow className="text-champagne">{zh ? "客户情境" : "CUSTOMER SITUATION"}</Eyebrow>
          <h1 className="editorial-heading mt-6 max-w-[14ch]">{title}</h1>
          <p className="body-large mt-7 max-w-2xl text-pearl/65">{description}</p>
        </Container>
      </section>
      <Section className="bg-porcelain">
        <Container className="grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <Eyebrow>{zh ? "需要解决的决策" : "THE DECISION"}</Eyebrow>
            <h2 className="editorial-heading mt-5 max-w-[12ch]">
              {zh
                ? "从一次性亮相，转向持续而可信的英国市场表达。"
                : "Move from a one-off moment to credible UK continuity."}
            </h2>
          </div>
          <div className="grid gap-px bg-ink/15 sm:grid-cols-2">
            {[
              { en: "UK-facing content priorities", zh: "英国市场内容重点" },
              { en: "Campaign and event rhythm", zh: "传播与活动节奏" },
              { en: "Founder, expert and product stories", zh: "创始人、专家与产品内容" },
              { en: "Local production and approval flow", zh: "本地制作与审批流程" }
            ].map((item, index) => (
              <p key={item.en} className="min-h-32 bg-porcelain p-6 text-lg">
                <span className="mb-5 block text-xs text-champagne">0{index + 1}</span>
                {item[language]}
              </p>
            ))}
          </div>
        </Container>
      </Section>
      <Section className="bg-pearl">
        <Container>
          <Eyebrow>{zh ? "可能的工作范围" : "POSSIBLE SCOPE"}</Eyebrow>
          <div className="mt-10 grid gap-px bg-ink/15 md:grid-cols-3">
            {[
              {
                en: "Content planning and local production",
                zh: "内容规划与英国本地制作"
              },
              {
                en: "Launch follow-up and market moments",
                zh: "发布后续与市场节点执行"
              },
              {
                en: "Bilingual coordination and organised handoff",
                zh: "双语协调与规范交付"
              }
            ].map((item) => (
              <p key={item.en} className="min-h-40 bg-pearl p-6 text-lg leading-7">
                {item[language]}
              </p>
            ))}
          </div>
          <p className="mt-8 max-w-3xl border-l border-champagne pl-4 text-sm leading-6 text-ink/60">
            {zh
              ? "具体渠道、频率、人才、合作方与交付范围均根据项目另行确认。"
              : "Channels, cadence, talent, collaborators and deliverables are confirmed per project."}
          </p>
        </Container>
      </Section>
      <DualContactCta language={language} />
    </>
  );
}

export function SolutionsHub({ language }: { language: Language }) {
  const zh = language === "zh";
  return (
    <>
      <section className="bg-ink pt-16 text-pearl">
        <Container className="py-20 md:py-28">
          <Eyebrow className="text-champagne">{zh ? "解决方案" : "SOLUTIONS"}</Eyebrow>
          <h1 className="editorial-heading mt-6 max-w-[14ch]">
            {zh
              ? "执行导向的英国品牌、发布与本地交付。"
              : "Execution-led UK brand, launch and local delivery."}
          </h1>
          <p className="body-large mt-7 max-w-2xl text-pearl/65">
            {zh
              ? "策略服务于决策，决策服务于可执行的英国工作。"
              : "Strategy supports the decision; the decision supports work that can be delivered in the UK."}
          </p>
        </Container>
      </section>
      <Section className="bg-porcelain">
        <Container>
          <div className="divide-y divide-ink/15 border-y border-ink/15">
            {solutions.map((solution, index) => (
              <article
                id={solution.href.split("#")[1]}
                key={solution.title.en}
                className="grid scroll-mt-28 gap-6 py-9 lg:grid-cols-[4rem_.8fr_1.2fr]"
              >
                <span className="text-champagne">0{index + 1}</span>
                <div>
                  <h2 className="text-3xl font-medium">{solution.title[language]}</h2>
                  <p className="mt-3 text-xs uppercase tracking-editorial text-ink/45">
                    {solution.status[language]}
                  </p>
                </div>
                <p className="text-base leading-7 text-ink/65">{solution.description[language]}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <Section className="bg-ink text-pearl">
        <Container>
          <Eyebrow className="text-champagne">{zh ? "本地交付能力" : "LOCAL DELIVERY CAPABILITIES"}</Eyebrow>
          <div className="mt-10 grid gap-px bg-pearl/15 sm:grid-cols-2 lg:grid-cols-3">
            {executionClusters.map((cluster) => (
              <p key={cluster.en} className="min-h-28 bg-ink p-6 text-lg">
                {cluster[language]}
              </p>
            ))}
          </div>
        </Container>
      </Section>
      <Section compact className="bg-pearl">
        <Container>
          <Eyebrow>{zh ? "小范围产品化服务" : "FOCUSED PROJECT SCOPES"}</Eyebrow>
          <h2 className="editorial-heading mt-5 max-w-[14ch]">
            {zh
              ? "先以选定项目与试点验证，再决定是否扩大。"
              : "Validate through selected projects and pilots before expanding."}
          </h2>
          <div className="mt-10 grid gap-px bg-ink/15 lg:grid-cols-3">
            {commercialProducts.map((product) => (
              <article key={product.id} className="bg-pearl p-6">
                <p className="text-xs uppercase tracking-editorial text-champagne">
                  {product.status === "build-first"
                    ? zh
                      ? "建设中"
                      : "Build first"
                    : zh
                      ? "试点中"
                      : "Pilot first"}
                </p>
                <h3 className="mt-5 text-2xl font-medium">{product.title[language]}</h3>
                <p className="mt-5 text-sm leading-6 text-ink/65">{product.scope[language]}</p>
                <p className="mt-5 border-l border-champagne pl-3 text-sm">
                  {product.publicWording[language]}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <DualContactCta language={language} />
    </>
  );
}

function DualContactCta({ language }: { language: Language }) {
  const zh = language === "zh";
  return (
    <Section className="bg-ink text-pearl">
      <Container className="grid gap-8 lg:grid-cols-2">
        <div>
          <Eyebrow className="text-champagne">{zh ? "先判断适配度" : "START WITH FIT"}</Eyebrow>
          <h2 className="mt-5 text-3xl font-medium">{fitCallLabel[language]}</h2>
          <ButtonLink
            href={withLanguage("/contact?brief=fit-call", language)}
            className="mt-7 bg-champagne text-ink hover:bg-pearl"
            showArrow
          >
            {fitCallLabel[language]}
          </ButtonLink>
        </div>
        <div className="border-t border-pearl/15 pt-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <Eyebrow className="text-champagne">{zh ? "已有明确需求" : "READY TO DELIVER"}</Eyebrow>
          <h2 className="mt-5 text-3xl font-medium">{executionBriefLabel[language]}</h2>
          <ButtonLink
            href={withLanguage("/contact?brief=execution", language)}
            className="mt-7 border border-pearl/25 bg-transparent text-pearl hover:border-champagne"
            showArrow
          >
            {executionBriefLabel[language]}
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
