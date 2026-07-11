import Link from "next/link";
import { notFound } from "next/navigation";
import { OperationalProof } from "@/components/sections/OperationalProof";
import { aboutContent } from "@/content/pages/about";
import { isSupportedLocale, type Language, withLanguage } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) return {};
  const c = aboutContent[lang];
  return buildMetadata({
    lang,
    path: "/about",
    title: lang === "zh" ? "关于镜桥创意" : "About FrameBridge Studio",
    description: c.intro
  });
}
export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params,
    language: Language | null = isSupportedLocale(lang) ? lang : null;
  if (!language) notFound();
  const c = aboutContent[language],
    zh = language === "zh";
  return (
    <>
      <section className="bg-pearl pt-36">
        <div className="container-x pb-24">
          <p className="text-xs uppercase tracking-editorial text-slate">{c.eyebrow}</p>
          <h1 className="editorial-heading mt-5 max-w-5xl font-semibold">{c.title}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-ink/70">{c.intro}</p>
        </div>
      </section>
      <section className="section-y bg-porcelain">
        <div className="container-x divide-y divide-ink/10">
          {c.sections.map(([title, text], i) => (
            <section key={title} className="grid gap-6 py-10 md:grid-cols-[5rem_.65fr_1fr]">
              <span className="text-sm text-slate">0{i + 1}</span>
              <h2 className="text-2xl font-semibold">{title}</h2>
              <p className="leading-7 text-ink/70">{text}</p>
            </section>
          ))}
        </div>
      </section>
      <OperationalProof language={language} />
      <section className="section-y bg-pearl">
        <div className="container-x">
          <h2 className="text-4xl font-semibold">{zh ? "选择合作入口" : "Choose your project route"}</h2>
          <div className="mt-10 grid gap-px bg-ink/10 md:grid-cols-3">
            {[
              [zh ? "品牌" : "Brand", "commercial"],
              [zh ? "代理公司" : "Agency", "agency"],
              [zh ? "科技或科研机构" : "Technology or research organisation", "research"]
            ].map((x) => (
              <Link
                key={x[1]}
                href={`${withLanguage("/contact", language)}?project=${x[1]}`}
                className="bg-white p-7 text-xl font-semibold hover:text-blue"
              >
                {x[0]} →
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
