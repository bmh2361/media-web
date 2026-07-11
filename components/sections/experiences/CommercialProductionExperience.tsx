import { MediaSlot } from "@/components/media/MediaSlot";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServiceProof } from "@/components/sections/ServiceProof";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ServiceDetail } from "@/content/types";
import type { Language } from "@/lib/i18n";
import { serviceJsonLd } from "@/lib/structured-data";
import { ServiceBreadcrumbs, ServiceCTA, ServiceHero, ServicePageShell } from "./ServicePageShell";

export function CommercialProductionExperience({
  copy,
  language
}: {
  copy: ServiceDetail;
  language: Language;
}) {
  const zh = language === "zh";
  const deliveryFormats = zh
    ? ["主视觉图片", "竖版 9:16", "竖版 4:5", "横版 16:9", "访谈短剪", "社交媒体短片"]
    : [
        "Hero stills",
        "Vertical 9:16",
        "Portrait 4:5",
        "Landscape 16:9",
        "Interview cutdowns",
        "Social clips"
      ];
  return (
    <ServicePageShell>
      <JsonLd
        data={serviceJsonLd({
          lang: language,
          name: copy.title,
          description: copy.intro,
          path: "/services/commercial-production"
        })}
      />
      <ServiceHero eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} dark>
        <div className="relative aspect-[16/10] overflow-hidden border border-pearl/15">
          <MediaSlot
            id="production-hero"
            language={language}
            priority
            sizes="(min-width:1024px) 38vw, 100vw"
            showCaption={false}
          />
          <span className="absolute left-4 top-4 text-xs tracking-editorial text-pearl">FB / 001</span>
        </div>
      </ServiceHero>
      <section className="bg-night py-6 text-pearl">
        <div className="container-x">
          <ServiceBreadcrumbs language={language} current={copy.title} dark />
        </div>
      </section>
      <section className="section-y bg-porcelain">
        <div className="container-x grid gap-10 lg:grid-cols-[.68fr_1.32fr]">
          <SectionHeading
            eyebrow={zh ? "制作目标" : "Campaign objective"}
            title={
              zh
                ? "每项制作决策都回到内容要完成的传播任务。"
                : "Every production decision returns to the campaign's commercial job."
            }
          />
          <div className="grid gap-px bg-ink/10 sm:grid-cols-2">
            {copy.needs.map((item) => (
              <p key={item} className="bg-pearl p-6 text-lg">
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>
      <section className="section-y bg-ink text-pearl">
        <div className="container-x grid gap-10 lg:grid-cols-[.5fr_1fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow={zh ? "制作学科" : "Production disciplines"}
              title={
                zh ? "从创意到交付的现场制作台。" : "A production desk from creative development to delivery."
              }
              theme="dark"
            />
          </div>
          <div className="grid gap-px bg-pearl/10">
            {copy.scope.map((item, index) => (
              <article key={item} className="grid gap-5 bg-night p-6 md:grid-cols-[4rem_1fr_1fr]">
                <span className="text-champagne">0{index + 1}</span>
                <h2 className="text-2xl font-semibold">{item}</h2>
                <p className="text-sm leading-6 text-pearl/65">
                  {copy.deliverables[index % copy.deliverables.length]}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-y bg-pearl">
        <div className="container-x">
          <SectionHeading
            eyebrow={zh ? "分镜与联系表" : "Storyboard / contact sheet"}
            title={
              zh ? "按画面与比例预先规划交付。" : "Plan the deliverables frame by frame and ratio by ratio."
            }
          />
          <div className="mt-10 grid gap-3 md:grid-cols-3">
            {(
              ["production-storyboard-01", "production-storyboard-02", "production-storyboard-03"] as const
            ).map((id) => (
              <MediaSlot key={id} id={id} language={language} sizes="(min-width:768px) 33vw, 100vw" />
            ))}
          </div>
        </div>
      </section>
      <section className="section-y bg-porcelain">
        <div className="container-x">
          <SectionHeading
            eyebrow={zh ? "交付格式" : "Deliverable wall"}
            title={
              zh
                ? "为真实渠道准备，而不是为了填满文件夹。"
                : "Formats prepared for real channels, not a fuller folder."
            }
          />
          <div className="mt-10 grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {deliveryFormats.map((format) => (
              <div key={format} className="bg-pearl p-6 text-xl font-semibold">
                {format}
              </div>
            ))}
          </div>
        </div>
      </section>
      <ServiceProof service="commercial" language={language} />
      <ServiceCTA language={language} title={copy.ctaTitle} cta={copy.cta} project="commercial" />
    </ServicePageShell>
  );
}
