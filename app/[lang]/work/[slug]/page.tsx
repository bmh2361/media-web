import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MediaSlot } from "@/components/media/MediaSlot";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { caseStudies, getCaseDisclosureLabel, getCaseProjectType, serviceLabels } from "@/content/cases";
import { isSupportedLocale, languages, type Language, withLanguage } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";
export function generateStaticParams() {
  return languages.flatMap((lang) => caseStudies.map((c) => ({ lang, slug: c.slug })));
}
export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params,
    c = caseStudies.find((x) => x.slug === slug);
  if (!isSupportedLocale(lang) || !c) return {};
  return buildMetadata({
    lang,
    path: `/work/${slug}`,
    title:
      lang === "zh"
        ? `${c.title.zh}｜概念项目模式｜FrameBridge Studio`
        : `${c.title.en} | Concept Project Model | FrameBridge Studio`,
    description: c.summary[lang]
  });
}
export default async function Page({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params,
    c = caseStudies.find((x) => x.slug === slug);
  if (!isSupportedLocale(lang) || !c) notFound();
  const language: Language = lang;
  const zh = language === "zh";
  const facts = [
    [zh ? "项目类型" : "Project type", c.projectType[language]],
    [zh ? "行业" : "Industry", c.industry[language]],
    [zh ? "地点" : "Location", c.location?.[language]],
    [zh ? "市场" : "Market", c.market?.[language]],
    [zh ? "形式" : "Formats", c.formats.map((x) => x[language]).join(", ")],
    [zh ? "披露" : "Disclosure", getCaseDisclosureLabel(c, language)],
    [zh ? "服务" : "Services", c.servicePillars.map((x) => serviceLabels[x][language]).join(", ")]
  ].filter((x): x is string[] => Boolean(x[1]));
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd({
          lang,
          items: [
            { name: "FrameBridge Studio", path: "/" },
            { name: zh ? "概念项目模式" : "Concept Project Models", path: "/work" },
            { name: c.title[lang], path: `/work/${c.slug}` }
          ]
        })}
      />
      <section className="bg-ink pt-36 text-pearl">
        <div className="container-x pb-16">
          <Link
            href={withLanguage("/work", lang)}
            className="inline-flex items-center gap-2 text-sm text-pearl/70"
          >
            <ArrowLeft size={16} />
            {zh ? "返回案例" : "Back to work"}
          </Link>
          <p className="mt-10 inline-flex border border-blueBright/40 px-3 py-2 text-xs font-semibold uppercase tracking-editorial text-blueBright">
            {getCaseDisclosureLabel(c, lang)}
          </p>
          <h1 className="editorial-heading mt-5 max-w-5xl font-semibold">{c.title[lang]}</h1>
          <p className="mt-7 max-w-3xl text-xl leading-8 text-pearl/70">{c.summary[lang]}</p>
        </div>
        <MediaSlot
          id={c.heroMediaId}
          language={lang}
          className="container-x aspect-[16/7]"
          priority
          showCaption={false}
        />
      </section>
      <section className="section-y bg-porcelain">
        <div className="container-x">
          <div className="grid gap-px border border-ink/10 bg-ink/10 md:grid-cols-3 lg:grid-cols-7">
            {facts.map(([k, v]) => (
              <div key={k} className="bg-pearl p-4">
                <p className="text-[10px] uppercase tracking-editorial text-slate">{k}</p>
                <p className="mt-3 text-sm leading-5">{v}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 grid gap-5 lg:grid-cols-2">
            <Text title={zh ? "示例背景" : "Illustrative context"} value={c.challenge[lang]} />
            <Text title={zh ? "示例需求" : "Example brief"} value={c.clientNeed[lang]} />
            <Text title={zh ? "可承担角色" : "Potential FrameBridge role"} value={c.frameBridgeRole[lang]} />
            <Text title={zh ? "预期目标" : "Intended outcome"} value={c.objective[lang]} />
            <List
              title={zh ? "示意范围" : "Illustrative scope"}
              values={c.productionScope.map((x) => x[lang])}
            />
            <List
              title={zh ? "潜在交付内容" : "Potential deliverables"}
              values={c.deliverables.map((x) => x[lang])}
            />
            <List
              title={zh ? "限制与审批" : "Constraints and approvals"}
              values={c.constraints.map((x) => x[lang])}
            />
            <Text title={zh ? "视觉方向" : "Visual direction"} value={c.visualDirection[lang]} />
          </div>
          <div className="mt-16 grid gap-4 md:grid-cols-3">
            {c.mediaIds.map((id, i) => (
              <MediaSlot
                key={id}
                id={id}
                language={lang}
                className={i === 1 ? "aspect-[4/5]" : "aspect-[4/3]"}
              />
            ))}
          </div>
          <div className="mt-16 border-t border-ink/10 pt-10">
            <p className="text-sm text-slate">
              {c.servicePillars.map((x) => serviceLabels[x][lang]).join(" · ")}
            </p>
            <ButtonLink
              href={`${withLanguage("/contact", lang)}?project=${getCaseProjectType(c)}`}
              showArrow
              className="mt-6"
            >
              {c.cta[lang]}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
function Text({ title, value }: { title: string; value: string }) {
  return (
    <section className="border-t border-ink/10 pt-5">
      <h2 className="text-xs uppercase tracking-editorial text-slate">{title}</h2>
      <p className="mt-5 text-xl leading-8">{value}</p>
    </section>
  );
}
function List({ title, values }: { title: string; values: string[] }) {
  return (
    <section className="border-t border-ink/10 pt-5">
      <h2 className="text-xs uppercase tracking-editorial text-slate">{title}</h2>
      <ul className="mt-5 grid gap-3">
        {values.map((x) => (
          <li key={x} className="text-base leading-7">
            {x}
          </li>
        ))}
      </ul>
    </section>
  );
}
