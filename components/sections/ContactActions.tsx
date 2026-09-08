"use client";

import { useState } from "react";
import { trackMeasurement } from "@/lib/measurement";
import type { Language } from "@/lib/i18n";

export function ContactActions({
  language,
  email,
  wechat
}: {
  language: Language;
  email: string;
  wechat: string;
}) {
  const [copied, setCopied] = useState(false);
  const zh = language === "zh";

  async function copyWechat() {
    try {
      await navigator.clipboard.writeText(wechat);
      setCopied(true);
      trackMeasurement("wechat_copy", { cta_location: "contact_direct" });
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="divide-y divide-pearl/15 border-y border-pearl/15" role="list">
      <div
        className="grid grid-cols-[5rem_minmax(0,1fr)_auto] items-center gap-4 py-4 sm:grid-cols-[7rem_minmax(0,1fr)_auto]"
        role="listitem"
      >
        <span className="text-xs uppercase tracking-[0.12em] text-pearl/55">{zh ? "微信" : "WeChat"}</span>
        <span className="text-lg font-medium text-pearl">{wechat}</span>
        <button
          type="button"
          className="min-h-11 rounded-sm border border-pearl/25 px-3 text-xs text-pearl hover:border-champagne hover:text-champagne"
          onClick={copyWechat}
        >
          {zh ? "复制" : "Copy"}
        </button>
        <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {copied ? (zh ? "微信号已复制" : "WeChat ID copied") : ""}
        </span>
      </div>
      <div
        className="grid grid-cols-[5rem_minmax(0,1fr)] items-baseline gap-4 py-4 sm:grid-cols-[7rem_minmax(0,1fr)]"
        role="listitem"
      >
        <span className="text-xs uppercase tracking-[0.12em] text-pearl/55">{zh ? "邮箱" : "Email"}</span>
        <span className="min-w-0">
          <a
            className="break-words text-base font-medium text-pearl underline decoration-pearl/25 underline-offset-4 transition-[color,text-decoration-color] duration-200 hover:text-champagne hover:decoration-champagne focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne sm:text-lg"
            href={`mailto:${email}`}
            onClick={() => trackMeasurement("email_click", { cta_location: "contact_direct" })}
          >
            {email}
          </a>
        </span>
      </div>
    </div>
  );
}
