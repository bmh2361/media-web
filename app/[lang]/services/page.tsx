import { notFound } from "next/navigation";
import { SolutionsHub } from "@/components/sections/CommercialArchitecturePages";
import { isSupportedLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) return {};
  return buildMetadata({
    lang,
    path: "/services",
    title: lang === "zh" ? "解决方案｜Venus Bridge" : "Solutions | Venus Bridge",
    description:
      lang === "zh"
        ? "品牌与本地化、发布与市场激活、创意内容制作及英国本地交付。"
        : "Brand and localisation, launch and activation, creative production and UK local delivery."
  });
}

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) notFound();
  return <SolutionsHub language={lang} />;
}
