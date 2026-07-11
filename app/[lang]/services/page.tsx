import Link from "next/link";
import { servicesContent } from "@/content/pages/services";
import type { Language } from "@/lib/i18n";
import { withLanguage } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
export async function generateMetadata({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params;
  return buildMetadata({
    lang,
    path: "/services",
    title: lang === "zh" ? "服务能力 | 镜桥创意" : "Services | FrameBridge Studio",
    description: servicesContent.intro[lang]
  });
}
export default async function Page({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params;
  return (
    <>
      <section className="bg-ink pt-36 text-pearl">
        <div className="container-x pb-24">
          <p className="text-xs uppercase tracking-editorial text-champagne">
            {servicesContent.eyebrow[lang]}
          </p>
          <h1 className="editorial-heading mt-5 max-w-5xl font-semibold">{servicesContent.title[lang]}</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-pearl/70">{servicesContent.intro[lang]}</p>
        </div>
      </section>
      <section className="section-y bg-porcelain">
        <div className="container-x divide-y divide-ink/10 border-y border-ink/10">
          {servicesContent.pillars.map((p, i) => (
            <Link
              key={p.key}
              href={withLanguage(p.href, lang)}
              data-analytics={`service-${p.key}`}
              className="group grid gap-5 py-10 focus-visible:ring-2 focus-visible:ring-blue md:grid-cols-[5rem_.7fr_1fr] md:items-start"
            >
              <span className="text-sm text-slate">0{i + 1}</span>
              <h2 className="text-3xl font-semibold group-hover:text-blue">{p.title[lang]}</h2>
              <p className="leading-7 text-ink/70">{p.capabilities[lang]}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
