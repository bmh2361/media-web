import { MediaSlot } from "@/components/media/MediaSlot";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServiceProof } from "@/components/sections/ServiceProof";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { eventResponsibilityRows } from "@/content/responsibilities";
import type { ServiceDetail } from "@/content/types";
import type { Language } from "@/lib/i18n";
import { serviceJsonLd } from "@/lib/structured-data";
import { ServiceBreadcrumbs, ServiceCTA, ServiceHero, ServicePageShell } from "./ServicePageShell";

export function EventsExhibitionsExperience({ copy, language }: { copy: ServiceDetail; language: Language }) {
  const zh = language === "zh";
  const timeline = zh
    ? ["规划", "供应商确认", "嘉宾协调", "技术彩排", "现场执行", "内容交接"]
    : [
        "Planning",
        "Supplier confirmation",
        "Speaker coordination",
        "Technical rehearsal",
        "Live delivery",
        "Content handoff"
      ];
  return (
    <ServicePageShell>
      <JsonLd
        data={serviceJsonLd({
          lang: language,
          name: copy.title,
          description: copy.intro,
          path: "/services/events-exhibitions"
        })}
      />
      <ServiceHero eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} dark>
        <MediaSlot
          id="events-hero"
          language={language}
          priority
          sizes="(min-width:1024px) 38vw, 100vw"
          showCaption={false}
        />
      </ServiceHero>
      <section className="bg-night py-6 text-pearl">
        <div className="container-x">
          <ServiceBreadcrumbs language={language} current={copy.title} dark />
        </div>
      </section>
      <section className="section-y bg-porcelain">
        <div className="container-x">
          <SectionHeading
            eyebrow={zh ? "活动形式" : "Event formats"}
            title={
              zh
                ? "活动体验由空间、流程与内容一起构成。"
                : "Spatial experience, run-of-show and content are planned as one."
            }
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {copy.scope.slice(0, 8).map((item, index) => (
              <div key={item} className="border-t-2 border-blue bg-pearl p-5">
                <span className="text-xs text-slate">0{index + 1}</span>
                <p className="mt-8 text-xl font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-y bg-night text-pearl">
        <div className="container-x grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <SectionHeading
              eyebrow={zh ? "活动架构" : "Event architecture"}
              title={zh ? "活动布局示意" : "Illustrative event layout"}
              theme="dark"
            />
            <div className="mt-8 grid min-h-72 grid-cols-3 gap-2 border border-pearl/20 p-3 text-xs">
              <span className="col-span-2 border border-champagne/60 p-3">{zh ? "主舞台" : "Stage"}</span>
              <span className="border border-pearl/30 p-3">{zh ? "媒体区" : "Media"}</span>
              <span className="border border-pearl/30 p-3">{zh ? "观众区" : "Audience"}</span>
              <span className="border border-pearl/30 p-3">{zh ? "展示区" : "Exhibition"}</span>
              <span className="border border-pearl/30 p-3">{zh ? "访谈区" : "Interview"}</span>
              <span className="col-span-3 border border-pearl/30 p-3">
                {zh ? "签到处 / 后台" : "Registration / Backstage"}
              </span>
            </div>
          </div>
          <MediaSlot id="events-floorplan" language={language} sizes="40vw" />
        </div>
      </section>
      <section className="section-y bg-ink text-pearl">
        <div className="container-x">
          <SectionHeading
            eyebrow={zh ? "多机位内容系统" : "Multi-camera content system"}
            title={
              zh
                ? "把舞台、观众、访谈与展区纳入同一拍摄计划。"
                : "Plan stage, audience, interviews and exhibition coverage as one system."
            }
            theme="dark"
          />
          <div className="mt-10 grid gap-3 md:grid-cols-12">
            <MediaSlot id="events-stage" language={language} className="md:col-span-7" showCaption={false} />
            <MediaSlot id="events-panel" language={language} className="md:col-span-5" showCaption={false} />
            <MediaSlot
              id="events-exhibition"
              language={language}
              className="md:col-span-5"
              showCaption={false}
            />
            <MediaSlot
              id="events-interview"
              language={language}
              className="md:col-span-7"
              showCaption={false}
            />
          </div>
        </div>
      </section>
      <section className="section-y bg-white">
        <div className="container-x">
          <SectionHeading
            eyebrow={zh ? "现场流程" : "Run of show"}
            title={zh ? "每一步都有明确的交接节点。" : "Each live step has a clear handoff."}
          />
          <ol className="mt-10 grid gap-px bg-ink/10 md:grid-cols-3">
            {timeline.map((step, index) => (
              <li key={step} className="bg-white p-6">
                <span className="text-xs text-blue">0{index + 1}</span>
                <h2 className="mt-8 text-2xl font-semibold">{step}</h2>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section-y bg-porcelain">
        <div className="container-x">
          <SectionHeading
            eyebrow={zh ? "责任矩阵" : "Responsibility matrix"}
            title={
              zh ? "为跨团队交付明确谁负责什么。" : "Make responsibilities clear across the delivery team."
            }
          />
          <div className="mt-10 grid gap-3 md:hidden">
            {eventResponsibilityRows.map((row) => (
              <article key={row.scope.en} className="border border-ink/10 bg-white p-5">
                <h3 className="font-medium">{row.scope[language]}</h3>
                <dl className="mt-4 grid gap-3 text-sm">
                  {[
                    ["Venus Bridge", row.owners.framebridge],
                    [zh ? "客户" : "Client", row.owners.client],
                    [zh ? "场地" : "Venue", row.owners.venue],
                    [zh ? "嘉宾 / 合作方" : "Speaker / partner", row.owners.speakerPartner],
                    [zh ? "专业供应商" : "Specialist supplier", row.owners.supplier]
                  ].map(([label, owner]) => (
                    <div key={label} className="grid grid-cols-[1fr_auto] gap-4 border-t border-ink/10 pt-3">
                      <dt className="text-ink/60">{label}</dt>
                      <dd className="font-medium">{owner ?? "—"}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
          <div
            className="mt-10 hidden md:block"
            aria-label={language === "zh" ? "活动责任表" : "Event responsibility table"}
          >
            <table className="w-full table-fixed border-collapse text-left text-sm">
              <thead>
                <tr className="border-y border-ink/20">
                  <th className="p-3">{zh ? "工作范围" : "Scope"}</th>
                  {[
                    "Venus Bridge",
                    zh ? "客户" : "Client",
                    zh ? "场地" : "Venue",
                    zh ? "嘉宾 / 合作方" : "Speaker / partner",
                    zh ? "专业供应商" : "Specialist supplier"
                  ].map((label) => (
                    <th key={label} className="p-3">
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {eventResponsibilityRows.map((row) => (
                  <tr key={row.scope.en} className="border-b border-ink/10">
                    <td className="p-3 font-medium">{row.scope[language]}</td>
                    <td className="p-3">{row.owners.framebridge ?? "-"}</td>
                    <td className="p-3">{row.owners.client ?? "-"}</td>
                    <td className="p-3">{row.owners.venue ?? "-"}</td>
                    <td className="p-3">{row.owners.speakerPartner ?? "-"}</td>
                    <td className="p-3">{row.owners.supplier ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="section-y bg-blueDeep text-pearl">
        <div className="container-x grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <div>
            <p className="inline-flex border border-champagne/50 px-3 py-2 text-xs font-semibold uppercase tracking-editorial text-champagne">
              {zh ? "制作场景" : "Production scenario"}
            </p>
            <h2 className="mt-6 text-4xl font-semibold md:text-6xl">
              {zh ? "汽车发布与路演制作" : "Automotive Launch & Roadshow Production"}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-pearl/75">
              {zh
                ? "用于规划品牌发布、多城市展示或产品路演的制作路径。下列范围是可配置的服务模块，不代表旁侧图片所示项目已经执行了全部服务。"
                : "A configurable production route for a brand launch, multi-city showcase or product roadshow. The modules below do not imply that every service was delivered for the project shown in the supporting image."}
            </p>
          </div>
          <MediaSlot
            id="events-exhibition"
            language={language}
            className="aspect-[4/3]"
            sizes="(min-width:1024px) 55vw, 100vw"
            showCaption={false}
          />
          <ul className="grid gap-px bg-pearl/20 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-5">
            {(zh
              ? [
                  "路演形式与场地协调",
                  "产品展示与嘉宾动线",
                  "主持人与采访协调",
                  "中英双语活动物料",
                  "摄影、视频与会后素材交接"
                ]
              : [
                  "Format and venue coordination",
                  "Product presentation and guest flow",
                  "Presenter and interview coordination",
                  "Bilingual event materials",
                  "Photography, video and asset handoff"
                ]
            ).map((item) => (
              <li key={item} className="bg-blueDeep p-5 text-sm leading-6">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <ServiceProof service="events" language={language} />
      <ServiceCTA language={language} title={copy.ctaTitle} cta={copy.cta} project="events" />
    </ServicePageShell>
  );
}
