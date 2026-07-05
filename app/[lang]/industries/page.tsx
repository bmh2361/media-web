import { ArrowRight } from "lucide-react";
import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { industryMediaSequence, media } from "@/content/media";
import { industriesPage } from "@/content/site";
import type { Language } from "@/lib/i18n";
import { withLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params;
  const copy = industriesPage[lang];

  return buildMetadata({
    lang,
    path: "/industries",
    title: `${copy.title} | Industries`,
    description: copy.intro,
    keywords: [
      "Chinese fashion brand UK campaign",
      "Jewellery campaign London",
      "Beauty product shoot UK",
      "AI product video UK",
      "Automotive event content UK",
      "Chinese brands going global"
    ]
  });
}

export default async function IndustriesPage({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params;
  const copy = industriesPage[lang];

  return (
    <>
      <section className="relative overflow-hidden bg-ink pt-36 text-pearl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_10%,rgba(111,183,255,0.22),transparent_26rem),radial-gradient(circle_at_20%_0%,rgba(216,199,162,0.18),transparent_28rem)]" />
        <div className="container-x relative pb-24">
          <p className="text-xs font-semibold uppercase tracking-editorial text-champagne">{copy.eyebrow}</p>
          <h1 className="editorial-heading mt-5 max-w-5xl font-semibold text-balance">{copy.title}</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-pearl/68">{copy.intro}</p>
        </div>
      </section>

      {copy.industries.map((industry, index) => {
        const dark = index % 2 === 1;
        const mediaId = industryMediaSequence[index] ?? industryMediaSequence[0];

        return (
          <section
            key={industry.name}
            className={cn("border-b", dark ? "border-pearl/10 bg-ink text-pearl" : "border-ink/10 bg-porcelain text-ink")}
          >
            <div className="container-x grid gap-10 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:py-28">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <Reveal>
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-lg p-6 shadow-cinematic",
                      dark ? "bg-pearl/[0.04] text-pearl" : "bg-ink text-pearl"
                    )}
                  >
                    <MediaPlaceholder
                      id={mediaId}
                      language={lang}
                      className="absolute inset-0 rounded-none opacity-80"
                      imageClassName="group-hover:scale-100"
                      sizes="40vw"
                      showCaption={false}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(11,13,16,0.9),rgba(11,13,16,0.28))]" />
                    <div className="relative flex min-h-[26rem] flex-col justify-between">
                      <span className="text-sm font-semibold text-champagne">0{index + 1}</span>
                      <div>
                        <p className="mb-4 text-xs font-semibold uppercase tracking-editorial text-pearl/52">
                          {copy.labels.insight}
                        </p>
                        <h2 className="text-5xl font-semibold leading-none tracking-[-0.03em] md:text-6xl">
                          {industry.name}
                        </h2>
                        <p className="mt-5 max-w-sm border-t border-pearl/20 pt-4 text-sm leading-6 text-pearl/66">
                          {media[mediaId].replacementNote[lang]}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={0.08}>
                <div className={cn("rounded-lg border p-6 shadow-soft md:p-8", dark ? "border-pearl/12 bg-pearl/[0.04]" : "border-ink/10 bg-pearl")}>
                  <p className={cn("text-2xl leading-snug md:text-3xl", dark ? "text-pearl/82" : "text-ink")}>
                    {industry.insight}
                  </p>

                  <div className="mt-10 grid gap-7 md:grid-cols-2">
                    <InfoBlock title={copy.labels.needs} items={industry.needs} dark={dark} />
                    <InfoBlock title={copy.labels.examples} items={industry.examples} dark={dark} />
                  </div>

                  <div className={cn("mt-8 rounded-lg border p-5", dark ? "border-pearl/12 bg-ink/30" : "border-ink/10 bg-porcelain")}>
                    <p className={cn("text-xs font-semibold uppercase tracking-editorial", dark ? "text-champagne" : "text-slate")}>
                      {copy.labels.delivers}
                    </p>
                    <p className={cn("mt-4 text-base leading-7", dark ? "text-pearl/68" : "text-ink/66")}>
                      {industry.delivers}
                    </p>
                  </div>

                  <div className="mt-8">
                    <InfoBlock title={copy.labels.services} items={industry.relatedServices} dark={dark} />
                  </div>

                  <ButtonLink
                    href={withLanguage("/contact", lang)}
                    showArrow
                    className={cn("mt-10", dark && "bg-pearl text-ink hover:bg-champagne")}
                  >
                    {copy.labels.cta}
                  </ButtonLink>
                </div>
              </Reveal>
            </div>
          </section>
        );
      })}
    </>
  );
}

function InfoBlock({ title, items, dark }: { title: string; items: string[]; dark: boolean }) {
  return (
    <div>
      <p className={cn("text-xs font-semibold uppercase tracking-editorial", dark ? "text-champagne" : "text-slate")}>
        {title}
      </p>
      <div className="mt-4 grid gap-2">
        {items.map((item) => (
          <div
            key={item}
            className={cn(
              "flex items-center justify-between rounded-lg border px-4 py-3 text-sm",
              dark ? "border-pearl/10 bg-pearl/[0.04] text-pearl/70" : "border-ink/10 bg-white/70 text-ink/68"
            )}
          >
            <span>{item}</span>
            <ArrowRight size={14} className={dark ? "text-pearl/28" : "text-ink/24"} />
          </div>
        ))}
      </div>
    </div>
  );
}
