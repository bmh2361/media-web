import { talentCards } from "@/content/site";
import type { Language } from "@/lib/i18n";

export function TalentCards({ language }: { language: Language }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {talentCards.map((card) => (
        <article
          key={card.title.en}
          className="rounded-lg border border-ink/10 bg-white/50 p-7 transition duration-300 hover:-translate-y-1 hover:border-champagne hover:bg-pearl"
        >
          <div className="mb-10 h-px w-16 bg-champagne" />
          <h3 className="text-2xl font-semibold text-ink">{card.title[language]}</h3>
          <p className="mt-4 text-sm leading-6 text-ink/60">{card.text[language]}</p>
        </article>
      ))}
    </div>
  );
}
