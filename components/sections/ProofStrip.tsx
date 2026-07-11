import { proofStrip } from "@/content/site";
import type { Language } from "@/lib/i18n";

export function ProofStrip({ language }: { language: Language }) {
  return (
    <div className="grid overflow-hidden rounded-lg border border-pearl/10 bg-pearl/[0.04] md:grid-cols-3">
      {proofStrip.map((item) => (
        <div
          key={item.label.en}
          className="border-b border-pearl/10 p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
        >
          <p className="font-serif text-5xl text-champagne">{item.value[language]}</p>
          <p className="mt-3 text-sm leading-6 text-pearl/70">{item.label[language]}</p>
        </div>
      ))}
    </div>
  );
}
