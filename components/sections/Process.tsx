import { process } from "@/content/site";
import type { Language } from "@/lib/i18n";

export function Process({ language }: { language: Language }) {
  return (
    <div className="relative grid gap-8 lg:grid-cols-3">
      {process.map((step, index) => (
        <article
          key={step.title.en}
          className="relative rounded-lg border border-ink/10 bg-pearl p-7 shadow-soft"
        >
          <div className="flex size-12 items-center justify-center rounded-full bg-ink text-sm font-semibold text-pearl">
            {index + 1}
          </div>
          <h3 className="mt-12 text-3xl font-semibold leading-tight">{step.title[language]}</h3>
          <p className="mt-5 text-sm leading-6 text-ink/60">{step.text[language]}</p>
        </article>
      ))}
    </div>
  );
}
