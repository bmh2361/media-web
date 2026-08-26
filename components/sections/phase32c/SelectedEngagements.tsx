"use client";

import { useState } from "react";
import type { Language } from "@/lib/i18n";

export type PublicEngagement = {
  id: string;
  year?: string;
  context: { en: string; zh: string };
  format: { en: string[]; zh: string[] };
  location?: { en: string; zh: string };
  role: { en: string; zh: string };
  outputs?: { en: string; zh: string };
  confidential: boolean;
};

export function SelectedEngagements({ records, language }: { records: PublicEngagement[]; language: Language }) {
  const [open, setOpen] = useState<string | null>(null);
  if (!records.length) return null;
  return (
    <section aria-labelledby="selected-engagements-title" className="border-t border-ink/15">
      <h3 id="selected-engagements-title" className="sr-only">{language === "zh" ? "精选合作项目" : "Selected engagements"}</h3>
      {records.map((record, index) => {
        const expanded = open === record.id;
        return (
          <article key={record.id} className="border-b border-ink/15">
            <button type="button" aria-expanded={expanded} onClick={() => setOpen(expanded ? null : record.id)} className="grid w-full gap-5 py-7 text-left md:grid-cols-[4rem_7rem_1fr_auto] md:items-start">
              <span className="text-xs text-champagne">{String(index + 1).padStart(2, "0")}</span>
              <span className="text-sm">{record.year}</span>
              <span><span className="block text-xl font-medium">{record.context[language]}</span><span className="mt-3 block text-xs uppercase tracking-editorial text-slate">{record.format[language].join(" · ")}</span></span>
              <span className="text-xs uppercase tracking-editorial text-slate">{record.confidential ? (language === "zh" ? "保密项目" : "Confidential") : record.location?.[language]}</span>
            </button>
            {expanded ? <div className="grid gap-6 pb-8 pl-0 md:grid-cols-2 md:pl-44"><div><p className="text-xs uppercase tracking-editorial text-slate">{language === "zh" ? "VENUS BRIDGE 角色" : "Venus Bridge role"}</p><p className="mt-3 leading-7">{record.role[language]}</p></div>{record.outputs ? <div><p className="text-xs uppercase tracking-editorial text-slate">{language === "zh" ? "成果" : "Outputs"}</p><p className="mt-3 leading-7">{record.outputs[language]}</p></div> : null}</div> : null}
          </article>
        );
      })}
    </section>
  );
}
