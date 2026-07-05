import { Check, Quote } from "lucide-react";
import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
import { Reveal } from "@/components/Reveal";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { agenciesPage } from "@/content/site";
import type { Language } from "@/lib/i18n";
import { withLanguage } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params;
  const copy = agenciesPage[lang];

  return buildMetadata({
    lang,
    path: "/for-agencies",
    title: `${copy.title} | For Agencies`,
    description: copy.intro,
    keywords: [
      "UK production partner for Chinese agencies",
      "London local production team",
      "UK filming support for Chinese brands",
      "Bilingual production coordinator UK"
    ]
  });
}

export default async function ForAgenciesPage({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params;
  const copy = agenciesPage[lang];

  return (
    <>
      <section className="relative overflow-hidden bg-ink pt-36 text-pearl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_8%,rgba(216,199,162,0.2),transparent_28rem),radial-gradient(circle_at_18%_12%,rgba(111,183,255,0.18),transparent_24rem)]" />
        <div className="container-x relative pb-24">
          <p className="text-xs font-semibold uppercase tracking-editorial text-champagne">{copy.eyebrow}</p>
          <h1 className="editorial-heading mt-5 max-w-5xl font-semibold text-balance">{copy.title}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-pearl/68">{copy.intro}</p>
        </div>
      </section>

      <section className="section-y bg-porcelain">
        <div className="container-x">
          <SectionHeading eyebrow={copy.sections.supportEyebrow} title={copy.sections.supportTitle} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {copy.support.map((item, index) => (
              <Reveal key={item} delay={index * 0.03}>
                <div className="rounded-lg border border-ink/10 bg-pearl p-6 shadow-soft">
                  <Check size={18} className="text-blue" />
                  <p className="mt-10 text-xl font-semibold leading-tight text-ink">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-ink text-pearl">
        <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow={copy.sections.whyEyebrow}
              title={copy.sections.whyTitle}
              theme="dark"
            />
          </div>
          <div className="grid gap-3">
            {copy.why.map((item, index) => (
              <Reveal key={item} delay={index * 0.03}>
                <div className="flex items-center justify-between rounded-lg border border-pearl/12 bg-pearl/[0.04] p-5">
                  <span className="text-lg font-semibold">{item}</span>
                  <span className="text-sm text-champagne">0{index + 1}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-pearl">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal>
            <div className="relative overflow-hidden rounded-lg bg-ink p-7 text-pearl shadow-cinematic">
              <MediaPlaceholder
                id="service-creative-planning"
                language={lang}
                className="absolute inset-0 rounded-none opacity-80"
                imageClassName="group-hover:scale-100"
                sizes="50vw"
                showCaption={false}
              />
              <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(11,13,16,0.9),rgba(11,13,16,0.32))]" />
              <div className="relative min-h-96">
                <p className="text-xs font-semibold uppercase tracking-editorial text-champagne">
                  {copy.sections.whiteLabelEyebrow}
                </p>
                <h2 className="mt-16 text-5xl font-semibold leading-tight tracking-[-0.03em]">
                  {copy.sections.whiteLabelTitle}
                </h2>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="rounded-lg border border-ink/10 bg-white/70 p-8 shadow-soft">
              <Quote size={30} className="text-champagne" />
              <p className="mt-8 text-3xl leading-snug text-ink">{copy.whiteLabel}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-porcelain">
        <div className="container-x">
          <SectionHeading eyebrow={copy.sections.requestsEyebrow} title={copy.sections.requestsTitle} />
          <div className="mt-12 grid gap-4 lg:grid-cols-5">
            {copy.requests.map((request, index) => (
              <Reveal key={request} delay={index * 0.04}>
                <div className="flex min-h-72 flex-col justify-between rounded-lg border border-ink/10 bg-pearl p-6 shadow-soft">
                  <span className="text-sm font-semibold text-slate">0{index + 1}</span>
                  <p className="text-xl font-semibold leading-tight text-ink">“{request}”</p>
                </div>
              </Reveal>
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
          <p className="text-xs font-semibold uppercase tracking-editorial text-champagne">{copy.sections.ctaText}</p>
          <h2 className="mx-auto mt-5 max-w-5xl text-balance text-5xl font-semibold leading-tight tracking-[-0.03em] md:text-7xl">
            {copy.sections.ctaTitle}
          </h2>
          <div className="mt-10">
            <ButtonLink href={withLanguage("/contact", lang)} showArrow className="bg-pearl text-ink hover:bg-champagne">
              {copy.sections.ctaButton}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
