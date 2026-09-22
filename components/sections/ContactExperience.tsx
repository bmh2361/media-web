import type { Language } from "@/lib/i18n";

import { company } from "@/content/company";

const CONTACT_EMAIL = company.businessEmail;
const CONTACT_WECHAT = company.contactMethods.wechat;

export function ContactExperience({ language }: { language: Language }) {
  const zh = language === "zh";
  return (
    <section
      className="border-t border-pearl/20 pt-6 lg:pt-7"
      aria-labelledby="direct-contact-heading"
      data-contact-delivery="direct-only"
    >
      <p className="text-xs uppercase tracking-editorial text-champagne">
        {zh ? "直接联系" : "DIRECT CONTACT"}
      </p>
      <h2 id="direct-contact-heading" className="sr-only">
        {zh ? "直接联系方式" : "Direct contact methods"}
      </h2>
      <address className="mt-5 not-italic">
        <dl className="divide-y divide-pearl/15 border-y border-pearl/15">
          <div className="grid grid-cols-[5rem_minmax(0,1fr)] items-baseline gap-4 py-4 sm:grid-cols-[7rem_minmax(0,1fr)]">
            <dt className="text-xs uppercase tracking-[0.12em] text-pearl/55">{zh ? "微信" : "WeChat"}</dt>
            <dd className="text-lg font-medium text-pearl">{CONTACT_WECHAT}</dd>
          </div>
          <div className="grid grid-cols-[5rem_minmax(0,1fr)] items-baseline gap-4 py-4 sm:grid-cols-[7rem_minmax(0,1fr)]">
            <dt className="text-xs uppercase tracking-[0.12em] text-pearl/55">{zh ? "邮箱" : "Email"}</dt>
            <dd className="min-w-0">
              <a
                className="break-words text-base font-medium text-pearl underline decoration-pearl/25 underline-offset-4 transition-[color,text-decoration-color] duration-200 hover:text-champagne hover:decoration-champagne focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne sm:text-lg"
                href={`mailto:${CONTACT_EMAIL}`}
              >
                {CONTACT_EMAIL}
              </a>
            </dd>
          </div>
        </dl>
      </address>
      <p className="mt-5 max-w-sm text-sm leading-6 text-pearl/55">
        {zh
          ? "适用于项目、合作及英国与欧洲市场咨询。"
          : "For projects, partnerships and UK / Europe enquiries."}
      </p>
    </section>
  );
}
