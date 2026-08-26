import { notFound } from "next/navigation";
import { PartnersJourney } from "@/components/sections/Phase5AudiencePages";
import { isSupportedLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) { const { lang } = await params; if (!isSupportedLocale(lang)) return {}; return buildMetadata({ lang, path: "/partners", title: lang === "zh" ? "英国与欧洲合作方参与中国企业项目 | Venus Bridge" : "China-Related Opportunities for UK & European Partners | Venus Bridge", description: lang === "zh" ? "为英国与欧洲机构、专家、场地和专业团队提供商业背景清楚、范围明确、双语协调的中国企业项目机会。" : "Relevant China-related opportunities for UK and European organisations, experts, venues and specialist teams, with clear context, scope and bilingual coordination." }); }
export default async function PartnersPage({ params }: { params: Promise<{ lang: string }> }) { const { lang } = await params; if (!isSupportedLocale(lang)) notFound(); return <PartnersJourney language={lang} />; }
