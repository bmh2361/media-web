import Link from "next/link";
import { notFound } from "next/navigation";
import { MediaSlot } from "@/components/media/MediaSlot";
import { StickyStory } from "@/components/motion/StickyStory";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredCaseStudies, getCaseDisclosureLabel, serviceLabels } from "@/content/cases";
import { homeContent } from "@/content/pages/home";
import { isSupportedLocale, type Language, withLanguage } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) return {};
  const copy = homeContent[lang];
  return buildMetadata({
    lang,
    path: "/",
    title:
      lang === "zh"
        ? "镜桥创意 | 英国制作、人才与创新活动"
        : "FrameBridge Studio | UK Production, Talent & Innovation",
    description: copy.intro
  });
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) notFound();
  const language: Language = lang;
  const copy = homeContent[language];
  const zh = language === "zh";

  return (
    <>
      <Hero language={language} />
      <section className="section-y bg-pearl">
        <div className="container-x">
          <SectionHeading
            eyebrow={zh ? "核心能力" : "Core capabilities"}
            title={zh ? "从项目需求到英国本地执行。" : "From the brief to local UK execution."}
          />
          <div className="mt-10">
            <StickyStory
              items={copy.actions.map((item) => ({ ...item, href: withLanguage(item.href, language) }))}
              linkLabel={zh ? "查看服务" : "Explore service"}
              language={language}
            />
          </div>
        </div>
      </section>
      <section className="section-y bg-porcelain">
        <div className="container-x">
          <SectionHeading
            eyebrow={zh ? "项目模式示例" : "Illustrative project models"}
            title={
              zh
                ? "以下内容用于说明 FrameBridge 可如何组织不同类型的英国制作与资源协调项目。"
                : "These examples show how FrameBridge can structure different UK production and coordination briefs."
            }
          />
          <p className="mt-5 max-w-3xl text-sm leading-6 text-ink/60">
            {zh ? "不作为已完成客户项目展示。" : "They are not presented as completed client projects."}
          </p>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {featuredCaseStudies.map((caseStudy, index) => (
              <article
                key={caseStudy.slug}
                className={`border border-ink/10 bg-white ${index === 0 ? "lg:col-span-2" : ""}`}
              >
                <MediaSlot
                  id={
                    (["home-featured-case", "home-supporting-case-01", "home-supporting-case-02"] as const)[
                      index
                    ]
                  }
                  language={language}
                  sizes={index === 0 ? "(min-width:1024px) 66vw, 100vw" : "(min-width:1024px) 33vw, 100vw"}
                  className="aspect-[16/10]"
                  showCaption={false}
                />
                <div className="p-6">
                  <p className="text-xs uppercase tracking-editorial text-slate">
                    {caseStudy.industry[language]}
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold">{caseStudy.title[language]}</h2>
                  <p className="mt-4 text-sm leading-6 text-ink/60">
                    <strong>{zh ? "可承担角色：" : "Potential FrameBridge role: "}</strong>
                    {caseStudy.frameBridgeRole[language]}
                  </p>
                  <p className="mt-3 text-xs text-slate">
                    {getCaseDisclosureLabel(caseStudy, language)} ·{" "}
                    {caseStudy.servicePillars.map((pillar) => serviceLabels[pillar][language]).join(" / ")}
                  </p>
                  <Link
                    href={withLanguage(`/work/${caseStudy.slug}`, language)}
                    className="mt-6 inline-block text-sm font-semibold text-blue"
                  >
                    {zh ? "查看示例" : "View example"} →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-y bg-ink text-pearl">
        <div className="container-x grid gap-px bg-pearl/10 md:grid-cols-3">
          {copy.routes.map((route) => (
            <article key={route.title} className="bg-night p-7">
              <h2 className="text-2xl font-semibold">{route.title}</h2>
              <p className="mt-4 text-sm leading-6 text-pearl/70">{route.text}</p>
              <Link
                href={withLanguage(route.href, language)}
                className="mt-7 inline-block text-sm font-semibold text-champagne"
              >
                {route.cta} →
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="section-y bg-pearl">
        <div className="container-x max-w-4xl text-center">
          <h2 className="text-4xl font-semibold md:text-6xl">{copy.finalTitle}</h2>
          <p className="mt-6 text-lg leading-8 text-ink/70">{copy.finalText}</p>
          <Link
            href={withLanguage("/contact", language)}
            className="mt-8 inline-block bg-ink px-6 py-3 text-sm font-semibold text-pearl"
          >
            {copy.finalCta}
          </Link>
        </div>
      </section>
    </>
  );
}
