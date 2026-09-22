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
        ? "中国科技企业英国市场进入与合作服务 | Venus Bridge"
        : "UK Market Entry & Partnerships for Chinese Technology Companies | Venus Bridge",
    description:
      lang === "zh"
        ? "判断英国市场机会、筹备发布与展会、推进合作。了解三种合作方式、具体交付和项目匹配标准。"
        : "Assess UK market fit, prepare a launch or exhibition and follow up relevant partnerships. Explore three scoped engagements, deliverables and project-fit criteria."
  });
}
export default async function CompaniesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) notFound();
  return <CompaniesJourney language={lang} />;
}
