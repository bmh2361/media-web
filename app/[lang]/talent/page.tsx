import { LockKeyhole } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { talentPage } from "@/content/site";
import type { Language } from "@/lib/i18n";
import { withLanguage } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params;
  const copy = talentPage[lang];

  return buildMetadata({
    lang,
    path: "/talent",
    title: `${copy.title} | Talent & Creators`,
    description: copy.intro,
    keywords: [
      "London models",
      "UK Chinese creators",
      "UK talent casting",
      "London presenters",
      "Chinese creator campaigns UK"
    ]
  });
}

export default async function TalentPage({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params;
  const copy = talentPage[lang];

  return (
    <>
      <section className="relative overflow-hidden bg-ink pt-36 text-pearl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_8%,rgba(216,199,162,0.24),transparent_28rem),radial-gradient(circle_at_18%_12%,rgba(111,183,255,0.18),transparent_24rem)]" />
        <div className="container-x relative grid gap-10 pb-24 lg:grid-cols-[1fr_24rem] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-editorial text-champagne">{copy.eyebrow}</p>
            <h1 className="editorial-heading mt-5 max-w-5xl font-semibold text-balance">{copy.title}</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-pearl/68">{copy.intro}</p>
          </div>
          <div className="rounded-lg border border-pearl/12 bg-pearl/[0.05] p-6 backdrop-blur-md">
            <LockKeyhole size={22} className="text-champagne" />
            <p className="mt-5 text-sm leading-6 text-pearl/66">{copy.privateNote}</p>
          </div>
        </div>
      </section>

      <section className="section-y bg-porcelain">
        <div className="container-x grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {copy.categories.map((category, index) => (
            <Reveal key={category.name} delay={index * 0.03}>
              <article className="group min-h-[32rem] rounded-lg border border-ink/10 bg-pearl p-6 shadow-soft transition duration-500 hover:-translate-y-1 hover:border-champagne hover:shadow-cinematic">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate">0{index + 1}</span>
                  <span className="h-px w-12 bg-silver transition group-hover:w-20 group-hover:bg-champagne" />
                </div>
                <h2 className="mt-12 text-3xl font-semibold leading-tight tracking-[-0.02em] text-ink">
                  {category.name}
                </h2>
                <div className="mt-7">
                  <p className="text-xs font-semibold uppercase tracking-editorial text-slate">
                    {copy.labels.suitableFor}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-ink/64">{category.suitableFor}</p>
                </div>
                <InfoPills title={copy.labels.useCases} items={category.useCases} />
                <InfoPills title={copy.labels.industries} items={category.industries} />
                <ButtonLink href={withLanguage("/contact", lang)} className="mt-8 w-full" showArrow>
                  {copy.labels.cta}
                </ButtonLink>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-y bg-ink text-pearl">
        <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow={copy.labels.processEyebrow}
              title={copy.labels.processTitle}
              theme="dark"
            />
          </div>
          <div className="grid gap-4">
            {copy.process.map((step, index) => (
              <Reveal key={step} delay={index * 0.04}>
                <div className="rounded-lg border border-pearl/12 bg-pearl/[0.04] p-6">
                  <span className="text-sm font-semibold text-champagne">0{index + 1}</span>
                  <h3 className="mt-8 text-3xl font-semibold leading-tight">{step}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-pearl">
        <div className="container-x">
          <div className="rounded-lg border border-ink/10 bg-white/70 p-7 shadow-soft md:p-10">
            <p className="text-xs font-semibold uppercase tracking-editorial text-slate">
              {copy.labels.disclaimerTitle}
            </p>
            <p className="mt-5 max-w-4xl text-2xl leading-snug text-ink md:text-3xl">{copy.disclaimer}</p>
            <ButtonLink href={withLanguage("/contact", lang)} className="mt-8" showArrow>
              {copy.labels.cta}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}

function InfoPills({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-7">
      <p className="text-xs font-semibold uppercase tracking-editorial text-slate">{title}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="rounded-full border border-ink/10 bg-white/70 px-3 py-2 text-xs text-ink/62">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
