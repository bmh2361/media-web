import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ServicesStory } from "@/components/sections/ServicesStory";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { servicesPage } from "@/content/site";
import type { Language } from "@/lib/i18n";
import { withLanguage } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params;
  const copy = servicesPage[lang];

  return buildMetadata({
    lang,
    path: "/services",
    title: `${copy.title} | Services`,
    description: copy.intro,
    keywords: [
      "UK creative production",
      "London commercial photography",
      "UK product video production",
      "UK brand film production",
      "London model casting",
      "UK creator campaign",
      "China UK production partner",
      "UK event photography",
      "London styling and makeup for shoots"
    ]
  });
}

export default async function ServicesPage({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params;
  const copy = servicesPage[lang];

  return (
    <>
      <section className="relative overflow-hidden bg-ink pt-36 text-pearl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(111,183,255,0.22),transparent_26rem),radial-gradient(circle_at_18%_0%,rgba(216,199,162,0.2),transparent_30rem)]" />
        <div className="container-x relative pb-24">
          <p className="text-xs font-semibold uppercase tracking-editorial text-champagne">{copy.eyebrow}</p>
          <h1 className="editorial-heading mt-5 max-w-5xl font-semibold text-balance">{copy.title}</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-pearl/68">{copy.intro}</p>
        </div>
      </section>

      <ServicesStory language={lang} copy={copy} />

      <section className="section-y bg-ink text-pearl">
        <div className="container-x">
          <SectionHeading
            eyebrow={copy.labels.packagesEyebrow}
            title={copy.labels.packagesTitle}
            intro={copy.labels.packagesIntro}
            theme="dark"
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {copy.packages.map((item, index) => (
              <Reveal key={item} delay={index * 0.04}>
                <div className="group rounded-lg border border-pearl/12 bg-pearl/[0.04] p-6 transition duration-500 hover:-translate-y-1 hover:border-champagne/60">
                  <span className="text-sm font-semibold text-champagne">0{index + 1}</span>
                  <h3 className="mt-12 text-2xl font-semibold leading-tight">{item}</h3>
                  <ArrowRight className="mt-8 text-pearl/44 transition group-hover:translate-x-1 group-hover:text-champagne" size={18} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-pearl">
        <div className="container-x text-center">
          <h2 className="mx-auto max-w-5xl text-balance text-5xl font-semibold leading-tight tracking-[-0.03em] md:text-7xl">
            {copy.labels.finalTitle}
          </h2>
          <div className="mt-10">
            <ButtonLink href={withLanguage("/contact", lang)} showArrow>
              {copy.labels.finalCta}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
