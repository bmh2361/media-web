import { notFound } from "next/navigation";
import { CompaniesJourney } from "@/components/sections/Phase5AudiencePages";
import { isSupportedLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) return {};
  return buildMetadata({
    lang,
    path: "/companies",
    title:
      lang === "zh"
        ? "中国企业英国与欧洲市场进入及本地执行 | Venus Bridge"
        : "UK & Europe Market Entry and Local Execution for Chinese Companies | Venus Bridge",
    description:
      lang === "zh"
        ? "为中国企业提供市场验证、买家与经销商对接、发布与展会落地，以及英国和欧洲本地执行能力。"
        : "Market validation, buyer and distributor engagement, launches, exhibitions and local execution for Chinese companies building in the UK and Europe."
  });
}
export default async function CompaniesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) notFound();
  return <CompaniesJourney language={lang} />;
}
