import { notFound } from "next/navigation";
import { PartnersJourney } from "@/components/sections/Phase5AudiencePages";
import { isSupportedLocale } from "@/lib/i18n";
import { commercial } from "@/content/commercial";
import { buildMetadata } from "@/lib/seo";
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) return {};
  return buildMetadata({
    lang,
    path: "/partners",
    title:
      lang === "zh"
        ? "英国与欧洲商业需求及中国技术合作 | Venus Bridge"
        : "UK & European Requirements | Technology Assessment | Venus Bridge",
    description: commercial.demandIntroduction[lang]
  });
}
export default async function PartnersPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) notFound();
  return <PartnersJourney language={lang} />;
}
