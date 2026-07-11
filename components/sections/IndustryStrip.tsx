import { industries } from "@/content/site";
import type { Language } from "@/lib/i18n";

export function IndustryStrip({ language }: { language: Language }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {industries.map((industry) => (
        <div
          key={industry.en}
          className="group rounded-lg border border-ink/10 bg-white/50 p-5 text-ink transition duration-300 hover:-translate-y-1 hover:border-blue/40 hover:bg-pearl"
        >
          <div className="mb-8 h-px w-12 bg-silver transition group-hover:w-20 group-hover:bg-blue" />
          <h3 className="text-lg font-semibold">{industry[language]}</h3>
          <p className="mt-4 text-sm leading-6 text-ink/60">{industry.description[language]}</p>
        </div>
      ))}
    </div>
  );
}
