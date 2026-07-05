import { PageIntro } from "@/components/sections/PageIntro";
import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
import { aboutPoints, pageCopy } from "@/content/site";
import type { Language } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params;
  const copy = pageCopy.about[lang];

  return buildMetadata({
    lang,
    path: "/about",
    title: `${copy.title} | About`,
    description: copy.intro,
    keywords: ["London creative production studio", "China UK production partner", "UK content production for Chinese brands"]
  });
}

export default async function AboutPage({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params;
  const copy = pageCopy.about[lang];

  return (
    <>
      <PageIntro eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} />
      <section className="container-x grid gap-10 pb-28 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          {aboutPoints[lang].map((point) => (
            <div key={point} className="rounded-lg border border-ink/10 bg-white/55 p-6 text-xl font-semibold">
              {point}
            </div>
          ))}
        </div>
        <MediaPlaceholder
          id="hero-cinematic"
          language={lang}
          className="min-h-[30rem]"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </section>
    </>
  );
}
