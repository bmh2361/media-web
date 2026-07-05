import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
import { Hero } from "@/components/sections/Hero";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { MediaId } from "@/content/media";
import { home } from "@/content/site";
import type { Language } from "@/lib/i18n";
import { withLanguage } from "@/lib/i18n";
import { buildMetadata, seoDescriptions } from "@/lib/seo";

const featuredWorkMedia: MediaId[] = [
  "case-london-celebrity-hero",
  "case-fashion-campaign-hero",
  "case-ai-product-hero"
];

export async function generateMetadata({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params;

  return buildMetadata({
    lang,
    path: "/",
    title: "FrameBridge Studio | UK Creative Production for Chinese Brands",
    description: lang === "zh" ? seoDescriptions.zh : seoDescriptions.en,
    keywords: [
      "UK creative production",
      "Chinese brands overseas content",
      "London commercial photography",
      "UK brand video",
      "Chinese creator campaigns"
    ]
  });
}

export default async function HomePage({
  params
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  const copy = home[lang];

  return (
    <>
      <Hero language={lang} />

      <section className="bg-ink pb-20 text-pearl">
        <div className="container-x">
          <div className="rounded-lg border border-pearl/12 bg-pearl/[0.04] p-6 shadow-cinematic md:p-8">
            <p className="mb-6 text-xs font-semibold uppercase tracking-editorial text-champagne">{copy.proofTitle}</p>
            <div className="grid gap-4 md:grid-cols-5">
              {copy.proofPoints.map((point) => (
                <div key={point} className="border-t border-pearl/16 pt-4 text-sm leading-6 text-pearl/72">
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-y bg-porcelain">
        <div className="container-x">
          <SectionHeading
            eyebrow={copy.sections.scenariosEyebrow}
            title={copy.sections.scenariosTitle}
            intro={copy.sections.scenariosIntro}
          />
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {copy.scenarioCards.map((item, index) => (
              <Reveal key={item} delay={index * 0.03}>
                <article className="group min-h-48 rounded-lg border border-ink/10 bg-pearl p-5 shadow-soft transition duration-500 hover:-translate-y-1 hover:border-blue/40 hover:shadow-cinematic">
                  <span className="text-xs font-semibold text-slate">0{index + 1}</span>
                  <h3 className="mt-16 text-2xl font-semibold leading-tight text-ink">{item}</h3>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-ink text-pearl">
        <div className="container-x">
          <SectionHeading
            eyebrow={copy.sections.capabilitiesEyebrow}
            title={copy.sections.capabilitiesTitle}
            theme="dark"
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {copy.capabilityCards.map((card, index) => (
              <Reveal key={card.title} delay={index * 0.04}>
                <article className="min-h-72 rounded-lg border border-pearl/12 bg-pearl/[0.04] p-7 transition duration-500 hover:-translate-y-1 hover:border-champagne/60">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-champagne">0{index + 1}</span>
                    <span className="h-px w-12 bg-pearl/24" />
                  </div>
                  <h3 className="mt-16 text-3xl font-semibold leading-tight">{card.title}</h3>
                  <p className="mt-5 text-sm leading-6 text-pearl/64">{card.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-pearl">
        <div className="container-x">
          <SectionHeading eyebrow={copy.sections.industriesEyebrow} title={copy.sections.industriesTitle} />
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-5">
            {copy.industries.map((industry) => (
              <div key={industry} className="bg-pearl p-5 text-lg font-semibold text-ink transition hover:bg-porcelain">
                {industry}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-porcelain">
        <div className="container-x">
          <SectionHeading eyebrow={copy.sections.workEyebrow} title={copy.sections.workTitle} />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {copy.featuredWork.map((work, index) => (
              <Reveal key={work.title} delay={index * 0.05}>
                <article className="group overflow-hidden rounded-lg border border-ink/10 bg-pearl shadow-soft transition duration-500 hover:-translate-y-1 hover:shadow-cinematic">
                  <MediaPlaceholder
                    id={featuredWorkMedia[index] ?? "case-supporting-1"}
                    language={lang}
                    className="aspect-[16/10] rounded-none"
                    captionClassName="bottom-auto top-4 border-b border-t-0 pb-3 pt-0"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                  />
                  <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-editorial text-slate">{work.industry}</p>
                    <h3 className="mt-5 text-3xl font-semibold leading-tight text-ink">{work.title}</h3>
                    <div className="mt-6 grid gap-5 text-sm leading-6 text-ink/64">
                      <p>
                        <span className="block font-semibold text-ink">{copy.caseLabels.challenge}</span>
                        {work.challenge}
                      </p>
                      <p>
                        <span className="block font-semibold text-ink">{copy.caseLabels.delivered}</span>
                        {work.delivered}
                      </p>
                    </div>
                    <Link href={withLanguage("/work", lang)} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-ink transition hover:text-blue">
                      {work.cta}
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-ink text-pearl">
        <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading
            eyebrow={copy.sections.talentEyebrow}
            title={copy.sections.talentTitle}
            intro={copy.sections.talentText}
            theme="dark"
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {copy.talentNetwork.map((item) => (
              <div key={item} className="rounded-lg border border-pearl/12 bg-pearl/[0.04] p-5 text-sm font-semibold text-pearl/76">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-pearl">
        <div className="container-x">
          <SectionHeading eyebrow={copy.sections.processEyebrow} title={copy.sections.processTitle} />
          <div className="mt-12">
            <ProcessTimeline steps={copy.process} />
          </div>
        </div>
      </section>

      <section className="section-y bg-ink text-pearl">
        <div className="container-x text-center">
          <h2 className="mx-auto max-w-5xl text-balance text-5xl font-semibold leading-tight tracking-[-0.03em] md:text-7xl">
            {copy.sections.finalTitle}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-pearl/68">{copy.sections.finalText}</p>
          <div className="mt-10">
            <ButtonLink href={withLanguage("/contact", lang)} showArrow className="bg-pearl text-ink hover:bg-champagne">
              {copy.finalCta}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
