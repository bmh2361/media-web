import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
import { ButtonLink } from "@/components/ui/Button";
import { caseHeroMediaBySlug } from "@/content/media";
import { workPage } from "@/content/site";
import { languages, type Language, withLanguage } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return languages.flatMap((lang) =>
    workPage[lang].cases.map((item) => ({
      lang,
      slug: item.slug
    }))
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: Language; slug: string }>;
}) {
  const { lang, slug } = await params;
  const copy = workPage[lang];
  const study = copy.cases.find((item) => item.slug === slug);

  if (!study) {
    return {};
  }

  return buildMetadata({
    lang,
    path: `/work/${slug}`,
    title: `${study.title} | Case Study`,
    description: study.overview,
    keywords: [study.industry, "UK production case study", "Chinese brand overseas content", ...study.relatedServices]
  });
}

export default async function CaseStudyPage({
  params
}: {
  params: Promise<{ lang: Language; slug: string }>;
}) {
  const { lang, slug } = await params;
  const copy = workPage[lang];
  const study = copy.cases.find((item) => item.slug === slug);

  if (!study) {
    notFound();
  }

  const heroMediaId = caseHeroMediaBySlug[slug] ?? "case-supporting-1";

  return (
    <>
      <section className="relative overflow-hidden bg-ink pt-36 text-pearl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_8%,rgba(111,183,255,0.22),transparent_26rem),radial-gradient(circle_at_20%_0%,rgba(216,199,162,0.18),transparent_28rem)]" />
        <div className="container-x relative pb-20">
          <Link
            href={withLanguage("/work", lang)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-pearl/64 transition hover:text-champagne"
          >
            <ArrowLeft size={16} />
            {copy.labels.back}
          </Link>
          <p className="mt-10 text-xs font-semibold uppercase tracking-editorial text-champagne">{study.industry}</p>
          <h1 className="editorial-heading mt-5 max-w-5xl font-semibold text-balance">{study.title}</h1>
          <p className="mt-7 max-w-3xl text-xl leading-8 text-pearl/72">{study.overview}</p>
        </div>
      </section>

      <section className="bg-porcelain">
        <div className="container-x grid gap-10 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:py-28">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative overflow-hidden rounded-lg bg-ink p-6 text-pearl shadow-cinematic">
              <MediaPlaceholder
                id={heroMediaId}
                language={lang}
                className="absolute inset-0 rounded-none opacity-80"
                imageClassName="group-hover:scale-100"
                sizes="40vw"
                showCaption={false}
              />
              <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(11,13,16,0.9),rgba(11,13,16,0.28))]" />
              <div className="relative flex min-h-[30rem] flex-col justify-between">
                <span className="text-sm font-semibold text-champagne">{copy.labels.industry}</span>
                <div>
                  <p className="mb-4 text-xs font-semibold uppercase tracking-editorial text-pearl/52">
                    {copy.labels.visualDirection}
                  </p>
                  <p className="text-3xl font-semibold leading-tight">{study.visualDirection}</p>
                </div>
              </div>
            </div>
          </aside>

          <div className="grid gap-5">
            <TextPanel title={copy.labels.clientNeed} text={study.clientNeed} />
            <TextPanel title={copy.labels.ourRole} text={study.ourRole} />
            <ListPanel title={copy.labels.productionScope} items={study.productionScope} />
            <ListPanel title={copy.labels.deliverables} items={study.deliverables} />
            <section className="rounded-lg border border-ink/10 bg-pearl p-7 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-editorial text-slate">
                {lang === "zh" ? "媒体槽位" : "Media slots"}
              </p>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {(["case-supporting-1", "case-supporting-2", "case-supporting-3"] as const).map((mediaId) => (
                  <MediaPlaceholder
                    key={mediaId}
                    id={mediaId}
                    language={lang}
                    className="aspect-[4/3]"
                    captionClassName="bottom-3 left-3 right-3"
                    sizes="(min-width: 1024px) 18vw, 100vw"
                  />
                ))}
              </div>
              <MediaPlaceholder
                id="case-video"
                language={lang}
                className="mt-4 aspect-video"
                sizes="(min-width: 1024px) 60vw, 100vw"
              />
            </section>
            <ListPanel title={copy.labels.relatedServices} items={study.relatedServices} />
            <div className="rounded-lg border border-ink/10 bg-pearl p-7 shadow-soft">
              <p className="text-sm leading-6 text-ink/62">{copy.confidentialNote}</p>
              <ButtonLink href={withLanguage("/contact", lang)} showArrow className="mt-8">
                {copy.labels.cta}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function TextPanel({ title, text }: { title: string; text: string }) {
  return (
    <section className="rounded-lg border border-ink/10 bg-pearl p-7 shadow-soft">
      <p className="text-xs font-semibold uppercase tracking-editorial text-slate">{title}</p>
      <p className="mt-5 text-2xl leading-snug text-ink">{text}</p>
    </section>
  );
}

function ListPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-lg border border-ink/10 bg-pearl p-7 shadow-soft">
      <p className="text-xs font-semibold uppercase tracking-editorial text-slate">{title}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="rounded-full border border-ink/10 bg-white/70 px-3 py-2 text-sm text-ink/68">
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
