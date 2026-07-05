import { caseStudies } from "@/content/site";
import type { Language } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";
import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
import type { MediaId } from "@/content/media";

const studyMedia: MediaId[] = [
  "case-london-celebrity-hero",
  "case-fashion-campaign-hero",
  "case-ai-product-hero"
];

export function CaseStudyGrid({ language }: { language: Language }) {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {caseStudies.map((study, index) => (
        <Reveal key={study.title.en} delay={index * 0.05}>
          <article className="group overflow-hidden rounded-lg border border-ink/10 bg-pearl shadow-soft transition duration-500 hover:-translate-y-1 hover:shadow-cinematic">
            <MediaPlaceholder
              id={studyMedia[index] ?? "case-supporting-1"}
              language={language}
              className="aspect-[4/3] rounded-none"
              captionClassName="bottom-auto top-4 border-b border-t-0 pb-3 pt-0"
              sizes="(min-width: 1024px) 33vw, 100vw"
            />
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-editorial text-slate">{study.category[language]}</p>
              <h3 className="mt-5 text-2xl font-semibold leading-tight text-ink">{study.title[language]}</h3>
              <p className="mt-4 text-sm leading-6 text-ink/62">{study.text[language]}</p>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
