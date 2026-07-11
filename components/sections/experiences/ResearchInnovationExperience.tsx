import { MediaSlot } from "@/components/media/MediaSlot";
import { JsonLd } from "@/components/seo/JsonLd";
import { ResourceMap } from "@/components/sections/ResourceMap";
import { ServiceProof } from "@/components/sections/ServiceProof";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ServiceDetail } from "@/content/types";
import type { Language } from "@/lib/i18n";
import { serviceJsonLd } from "@/lib/structured-data";
import { ServiceBreadcrumbs, ServiceCTA, ServiceHero, ServicePageShell } from "./ServicePageShell";

export function ResearchInnovationExperience({
  copy,
  language
}: {
  copy: ServiceDetail;
  language: Language;
}) {
  const zh = language === "zh";
  const narrative = zh
    ? ["技术主题", "专家输入", "传播结构", "访谈 / 圆桌 / 影片", "公众内容"]
    : [
        "Technical subject",
        "Expert input",
        "Communication structure",
        "Interview / roundtable / film",
        "Public-facing content"
      ];
  return (
    <ServicePageShell>
      <JsonLd
        data={serviceJsonLd({
          lang: language,
          name: copy.title,
          description: copy.intro,
          path: "/services/research-innovation"
        })}
      />
      <ServiceHero eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro}>
        <MediaSlot
          id="research-hero"
          language={language}
          priority
          sizes="(min-width:1024px) 38vw, 100vw"
          showCaption={false}
        />
      </ServiceHero>
      <section className="bg-white py-6">
        <div className="container-x">
          <ServiceBreadcrumbs language={language} current={copy.title} />
        </div>
      </section>
      <section className="section-y bg-pearl">
        <div className="container-x">
          <SectionHeading
            eyebrow={zh ? "资源协作" : "Resource map"}
            title={zh ? "示意性资源协作模型" : "Illustrative coordination model"}
          />
          <div className="mt-10 border border-ink/10 bg-white p-4 md:p-8">
            <ResourceMap language={language} />
          </div>
        </div>
      </section>
      <section className="section-y bg-white">
        <div className="container-x">
          <SectionHeading
            eyebrow={zh ? "科研到公众" : "Research to public"}
            title={
              zh
                ? "让技术表达保持准确，也让公众能够理解。"
                : "Keep the technical subject accurate and the public narrative legible."
            }
          />
          <ol className="mt-10 grid gap-3 md:grid-cols-5">
            {narrative.map((step, index) => (
              <li key={step} className="border-t-2 border-blue pt-4 text-lg font-semibold">
                <span className="block text-xs text-slate">0{index + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section-y bg-porcelain">
        <div className="container-x grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow={zh ? "技术传播输出" : "Technical communication"}
              title={zh ? "适配不同受众的内容结构。" : "Outputs shaped for different audiences."}
            />
            <div className="mt-8 grid gap-3">
              {copy.deliverables.map((item) => (
                <p key={item} className="border-t border-ink/15 pt-3">
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <MediaSlot id="research-interview" language={language} sizes="30vw" />
            <MediaSlot id="research-roundtable" language={language} sizes="30vw" />
          </div>
        </div>
      </section>
      <section className="section-y bg-ink text-pearl">
        <div className="container-x grid gap-px bg-pearl/15 md:grid-cols-2">
          <div className="bg-night p-8">
            <p className="text-xs uppercase tracking-editorial text-champagne">
              {zh ? "我们协调" : "What we coordinate"}
            </p>
            <ul className="mt-6 grid gap-3">
              {copy.scope.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-night p-8">
            <p className="text-xs uppercase tracking-editorial text-champagne">
              {zh ? "需要审批" : "What requires approval"}
            </p>
            <p className="mt-6 leading-7 text-pearl/70">{copy.note}</p>
          </div>
        </div>
      </section>
      <ServiceProof service="research" language={language} />
      <ServiceCTA language={language} title={copy.ctaTitle} cta={copy.cta} project="research" />
    </ServicePageShell>
  );
}
