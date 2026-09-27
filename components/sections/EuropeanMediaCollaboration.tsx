import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { europeanTimesUrl, marketCredibility } from "@/content/market-credibility";
import type { Language } from "@/lib/i18n";

export function EuropeanMediaCollaboration({ language }: { language: Language }) {
  const copy = marketCredibility[language];
  return (
    <Section compact className="bg-porcelain" data-phase5-section="media-collaboration">
      <Container className="grid gap-9 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div>
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h2 className="mt-5 max-w-[22ch] text-balance text-3xl font-medium leading-tight md:text-4xl">
            {copy.headline}
          </h2>
          <p className="mt-6 hidden max-w-xl text-base leading-7 text-ink/65 md:block">{copy.body}</p>
        </div>
        <div className="border-t border-ink/15 pt-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <a
            href={europeanTimesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-3 text-xl font-medium underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne"
          >
            {copy.relationship}
            <span aria-hidden="true" className="text-sm">
              ↗
            </span>
            <span className="sr-only"> ({copy.newTab})</span>
          </a>
          <p className="mt-2 text-xs text-slate">{copy.label}</p>
          <p className="mt-5 max-w-xl text-sm leading-7 text-ink/65">{copy.supporting}</p>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-3 border-t border-ink/15 pt-5">
            {copy.tags.map((tag) => (
              <li key={tag} className="text-xs leading-5 text-ink/75">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
