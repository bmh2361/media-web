import { services } from "@/content/site";
import type { Language } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";

export function ServiceGrid({ language, dark = false }: { language: Language; dark?: boolean }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => (
        <Reveal key={service.title.en} delay={index * 0.04}>
          <article className={`group min-h-72 rounded-lg border p-7 transition duration-500 hover:-translate-y-1 ${
            dark
              ? "border-pearl/12 bg-pearl/[0.04] text-pearl hover:border-champagne/50"
              : "border-ink/10 bg-pearl text-ink shadow-soft hover:border-champagne hover:shadow-cinematic"
          }`}>
            <div className="flex items-center justify-between">
              <span className={dark ? "text-sm font-semibold text-champagne" : "text-sm font-semibold text-slate"}>
                0{index + 1}
              </span>
              <span className={dark ? "text-xs uppercase tracking-editorial text-pearl/45" : "text-xs uppercase tracking-editorial text-slate"}>
                {service.tag[language]}
              </span>
            </div>
            <h3 className="mt-16 text-3xl font-semibold leading-tight tracking-[-0.01em]">{service.title[language]}</h3>
            <p className={dark ? "mt-5 text-sm leading-6 text-pearl/62" : "mt-5 text-sm leading-6 text-ink/62"}>
              {service.text[language]}
            </p>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
