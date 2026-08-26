import { MediaSlot } from "@/components/media/MediaSlot";
import { ServiceProof } from "@/components/sections/ServiceProof";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { agencyResponsibilityRows } from "@/content/responsibilities";
import { agenciesPage } from "@/content/site";
import { withLanguage, type Language } from "@/lib/i18n";
import { getEffectiveMarketEntryMode } from "@/lib/release";

export function AgencySupportExperience({ language }: { language: Language }) {
  const copy = agenciesPage[language];
  const zh = language === "zh";
  const showMarketEntry = getEffectiveMarketEntryMode() !== "hidden";
  const handoff = zh
    ? ["文件夹结构", "版本审核", "母版与社媒导出", "授权与使用说明"]
    : ["Folder structure", "Review versions", "Masters and social exports", "Release and usage notes"];
  return (
    <>
      <section className="bg-night pt-32 text-pearl">
        <div className="container-x grid gap-8 pb-16 lg:grid-cols-[1fr_.7fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-editorial text-champagne">
              {copy.eyebrow}
            </p>
            <h1 className="editorial-heading mt-5 max-w-4xl font-semibold">{copy.title}</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-pearl/70">{copy.intro}</p>
          </div>
          <MediaSlot
            id="agency-hero"
            language={language}
            priority
            sizes="(min-width:1024px) 35vw, 100vw"
            showCaption={false}
          />
        </div>
      </section>
      <section className="section-y bg-ink text-pearl">
        <div className="container-x">
          <SectionHeading
            eyebrow={copy.sections.supportEyebrow}
            title={copy.sections.supportTitle}
            theme="dark"
          />
          <div className="mt-10 grid gap-px bg-pearl/10 sm:grid-cols-2 lg:grid-cols-3">
            {copy.support.map((item) => (
              <div key={item} className="bg-night p-6 text-xl font-semibold">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-y bg-porcelain">
        <div className="container-x grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
          <SectionHeading
            eyebrow={zh ? "范围矩阵" : "Scope matrix"}
            title={
              zh ? "让项目主导权和执行接口保持清楚。" : "Keep ownership and execution interfaces explicit."
            }
          />
          <div className="divide-y divide-ink/15 border-y border-ink/15">
            {agencyResponsibilityRows.map((row, index) => (
              <div key={row.scope.en} className="grid grid-cols-[2rem_1fr_auto] gap-3 py-4">
                <span className="text-slate">0{index + 1}</span>
                <span>{row.scope[language]}</span>
                <span className="text-sm text-blue">{row.owner[language]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-y bg-pearl">
        <div className="container-x grid gap-8 lg:grid-cols-2">
          <MediaSlot id="agency-workflow" language={language} sizes="45vw" />
          <div>
            <SectionHeading eyebrow={copy.sections.whiteLabelEyebrow} title={copy.sections.whiteLabelTitle} />
            <p className="mt-8 text-xl leading-8 text-ink/70">{copy.whiteLabel}</p>
            <p className="mt-6 border-l-2 border-blue pl-4 text-sm leading-6 text-ink/65">
              {zh
                ? "Venus Bridge 可按约定在幕后执行；客户关系由代理保持，沟通和素材通过约定渠道交付。"
                : "Venus Bridge can work behind the scenes by agreement; the agency retains the client relationship and receives materials through agreed channels."}
            </p>
          </div>
        </div>
      </section>
      <section className="section-y bg-porcelain">
        <div className="container-x grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow={zh ? "交付交接" : "Asset handoff"}
              title={zh ? "让审核和交接可追踪。" : "Keep review and handoff traceable."}
            />
            <div className="mt-8 grid gap-3">
              {handoff.map((item) => (
                <p key={item} className="border-t border-ink/15 pt-3">
                  {item}
                </p>
              ))}
            </div>
          </div>
          <MediaSlot id="agency-handoff" language={language} sizes="45vw" />
        </div>
      </section>
      {showMarketEntry ? (
        <section className="border-y border-champagne/25 bg-night py-12 text-pearl">
          <div className="container-x grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="eyebrow text-champagne">
                {zh ? "计划进入英国市场？" : "Entering the UK market?"}
              </p>
              <h2 className="mt-4 max-w-3xl text-3xl font-medium">
                {zh
                  ? "把英国制作支持连接到设立准备、专业机构工作流与市场启动。"
                  : "Connect UK production support to setup preparation, specialist workstreams and market launch."}
              </h2>
            </div>
            <ButtonLink
              href={withLanguage("/services/uk-market-entry", language)}
              className="bg-champagne text-ink"
              showArrow
            >
              {zh ? "查看市场进入协同" : "View market-entry coordination"}
            </ButtonLink>
          </div>
        </section>
      ) : null}
      <ServiceProof service="agency" language={language} />
      <section className="section-y bg-ink text-center text-pearl">
        <div className="container-x">
          <h2 className="mx-auto max-w-4xl text-4xl font-semibold md:text-6xl">{copy.sections.ctaTitle}</h2>
          <ButtonLink
            href={`${withLanguage("/contact", language)}?project=agency`}
            variant="secondary"
            className="mt-9"
            showArrow
            data-project-type="agency"
          >
            {copy.sections.ctaButton}
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
