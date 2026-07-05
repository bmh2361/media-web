"use client";

import { Button } from "@/components/ui/Button";
import { contactForm } from "@/content/site";
import type { Language } from "@/lib/i18n";

export function ContactForm({ language }: { language: Language }) {
  const copy = contactForm[language];
  const inputClass =
    "w-full rounded-lg border border-ink/10 bg-pearl px-4 py-3 text-sm text-ink outline-none transition focus:border-blue focus:ring-4 focus:ring-blue/10";

  return (
    <form className="grid gap-4 rounded-lg border border-ink/10 bg-white/55 p-5 shadow-soft md:grid-cols-2">
      <input className={inputClass} placeholder={copy.name} />
      <input className={inputClass} placeholder={copy.company} />
      <input className={inputClass} type="email" placeholder={copy.email} />
      <input className={inputClass} placeholder={copy.project} />
      <textarea className={`${inputClass} min-h-40 md:col-span-2`} placeholder={copy.message} />
      <div className="md:col-span-2">
        <Button type="button">{copy.submit}</Button>
      </div>
    </form>
  );
}
