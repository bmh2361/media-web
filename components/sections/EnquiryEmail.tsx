"use client";
import { useEffect, useState } from "react";
import { engagements } from "@/content/commercial";
import type { Language } from "@/lib/i18n";

export function EnquiryEmail({
  email,
  title,
  fields,
  route,
  language
}: {
  email: string;
  title: string;
  fields: string[];
  route: string;
  language: Language;
}) {
  const [service, setService] = useState<string | null>(null);
  useEffect(() => {
    if (route === "company") setService(new URLSearchParams(window.location.search).get("service"));
  }, [route]);
  const selected = engagements.find((offer) => offer.id === service);
  const serviceTitle = route === "company" ? selected?.title[language] : undefined;
  const subject = `Venus Bridge — ${title}${serviceTitle ? ` — ${serviceTitle}` : ""}`;
  const body = `${serviceTitle ? `${language === "zh" ? "意向服务" : "Engagement"}: ${serviceTitle}\r\n\r\n` : ""}${fields.map((field) => `${field}: `).join("\r\n\r\n")}`;
  return (
    <a
      href={`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}
      className="mt-7 inline-flex min-h-12 items-center bg-ink px-6 py-4 text-base font-medium text-pearl hover:bg-graphite"
      data-enquiry-email={route}
    >
      {language === "zh" ? "打开邮件并填写需求" : "Open email with this brief"} →
    </a>
  );
}
