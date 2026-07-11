import { MediaSlot } from "@/components/media/MediaSlot";
import { ServiceProof } from "@/components/sections/ServiceProof";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { talentPage } from "@/content/site";
import { withLanguage, type Language } from "@/lib/i18n";

export function TalentExperience({ language }: { language: Language }) {
  const copy = talentPage[language];
  const zh = language === "zh";
  const criteria = zh
    ? ["品牌与受众匹配", "语言与镜头表达", "可用档期", "使用权与排他范围"]
    : [
        "Brand and audience fit",
        "Language and on-camera expression",
        "Availability",
        "Usage and exclusivity scope"
      ];
  const rights = zh
    ? ["地区", "渠道", "期限", "排他", "付费媒体", "自然流量媒体"]
    : ["Territory", "Channel", "Duration", "Exclusivity", "Paid media", "Organic media"];
  return (
    <>
      <section className="bg-[#f4f0e8] pt-32 text-ink">
        <div className="container-x grid gap-8 pb-16 lg:grid-cols-[1fr_.68fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-editorial text-slate">{copy.eyebrow}</p>
            <h1 className="editorial-heading mt-5 max-w-4xl font-semibold">{copy.title}</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-ink/65">{copy.intro}</p>
          </div>
          <MediaSlot
            id="talent-hero"
            language={language}
            priority
            sizes="(min-width:1024px) 34vw, 100vw"
            showCaption={false}
          />
        </div>
      </section>
      <section className="section-y bg-pearl">
        <div className="container-x">
          <SectionHeading
            eyebrow={zh ? "选角范围" : "Casting categories"}
            title={
              zh
                ? "匿名模卡，而不是虚构的公开人才目录。"
                : "Anonymous casting cards, not a fictional public database."
            }
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {copy.categories.map((category, index) => (
              <article key={category.name} className="group overflow-hidden border border-ink/10 bg-white">
                <MediaSlot
                  id={
                    (
                      [
                        "talent-contact-sheet-01",
                        "talent-contact-sheet-02",
                        "talent-contact-sheet-03"
                      ] as const
                    )[index % 3]
                  }
                  language={language}
                  sizes="(min-width:1024px) 28vw, 100vw"
                  showCaption={false}
                />
                <div className="p-5">
                  <span className="text-xs text-slate">
                    {zh ? "私密候选名单" : "Private shortlist"} / 0{index + 1}
                  </span>
                  <h2 className="mt-3 text-2xl font-semibold">{category.name}</h2>
                  <p className="mt-4 text-sm leading-6 text-ink/60">{category.suitableFor}</p>
                  <p className="mt-5 text-xs uppercase tracking-editorial text-slate">
                    {category.useCases.join(" · ")}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-y bg-[#f4f0e8]">
        <div className="container-x grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <SectionHeading
              eyebrow={zh ? "筛选标准" : "Selection criteria"}
              title={
                zh
                  ? "从项目需求开始，再进入候选流程。"
                  : "Start with the brief, then move into a private shortlist."
              }
            />
            <div className="mt-8 grid gap-3">
              {criteria.map((item, index) => (
                <p key={item} className="border-t border-ink/20 pt-3">
                  <span className="mr-3 text-slate">0{index + 1}</span>
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div className="border border-ink/10 bg-pearl p-7">
            <MediaSlot id="talent-private-shortlist" language={language} sizes="45vw" showCaption={false} />
            <p className="mt-6 text-lg leading-8 text-ink/70">{copy.privateNote}</p>
          </div>
        </div>
      </section>
      <section className="section-y bg-ink text-pearl">
        <div className="container-x">
          <SectionHeading
            eyebrow={zh ? "使用权规划" : "Usage rights"}
            title={
              zh
                ? "在确认候选前，先核对使用范围。"
                : "Confirm the usage scope before a shortlist becomes a booking."
            }
            theme="dark"
          />
          <div className="mt-10 grid gap-px bg-pearl/10 sm:grid-cols-2 lg:grid-cols-3">
            {rights.map((item) => (
              <div key={item} className="bg-night p-6 text-xl font-semibold">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-y bg-pearl">
        <div className="container-x">
          <SectionHeading
            eyebrow={zh ? "私密候选流程" : "Private shortlist process"}
            title={zh ? "公开网页并非完整人才数据库。" : "The public site is not a complete talent database."}
          />
          <ol className="mt-10 grid gap-px bg-ink/10 md:grid-cols-3">
            {copy.process.map((step, index) => (
              <li key={step} className="bg-pearl p-6">
                <span className="text-xs text-blue">0{index + 1}</span>
                <h2 className="mt-8 text-xl font-semibold">{step}</h2>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <ServiceProof service="talent" language={language} />
      <section className="section-y bg-ink text-center text-pearl">
        <div className="container-x">
          <h2 className="mx-auto max-w-4xl text-4xl font-semibold md:text-6xl">{copy.disclaimer}</h2>
          <ButtonLink
            href={`${withLanguage("/contact", language)}?project=talent`}
            className="mt-9 bg-pearl text-ink"
            showArrow
            data-project-type="talent"
          >
            {copy.labels.cta}
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
