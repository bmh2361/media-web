import type { Language } from "@/lib/i18n";
import { company } from "@/content/company";
import { isContactFormExposed } from "@/lib/release";
import { ContactActions } from "@/components/sections/ContactActions";
import { EnquiryForm } from "@/components/sections/EnquiryForm";

export function ContactExperience({ language }: { language: Language }) {
  const zh = language === "zh";
  const formEnabled = isContactFormExposed();
  return (
    <section
      className="border-t border-pearl/20 pt-6 lg:pt-7"
      aria-labelledby="direct-contact-heading"
      data-contact-delivery={formEnabled ? "form-and-direct" : "direct-only"}
    >
      <p className="text-xs uppercase tracking-editorial text-champagne">
        {zh ? "直接联系" : "DIRECT CONTACT"}
      </p>
      <h2 id="direct-contact-heading" className="sr-only">
        {zh ? "直接联系方式" : "Direct contact methods"}
      </h2>
      <address className="mt-5 not-italic">
        <ContactActions
          language={language}
          email={company.businessEmail}
          wechat={company.contactMethods.wechat}
        />
      </address>
      <p className="mt-5 max-w-sm text-sm leading-6 text-pearl/55">
        {zh
          ? "适用于项目、合作及英国与欧洲市场咨询。"
          : "For projects, partnerships and UK / Europe enquiries."}
      </p>
      {formEnabled ? (
        <div className="mt-10 rounded-sm bg-porcelain p-5 text-ink sm:p-7">
          <h3 className="text-xl font-semibold">{zh ? "结构化项目咨询" : "Structured project enquiry"}</h3>
          <p className="mt-2 text-sm leading-6 text-ink/65">
            {zh
              ? "我们会直接审核每一项咨询，并回复最有用的下一步。"
              : "Every enquiry is reviewed directly. We will respond with the most useful next step."}
          </p>
          <EnquiryForm
            language={language}
            fallbackEmail={company.businessEmail}
            turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
          />
        </div>
      ) : null}
    </section>
  );
}
