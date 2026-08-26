import { notFound } from "next/navigation";
import { BuildingUkPresencePage } from "@/components/sections/CommercialArchitecturePages";
import { isSupportedLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) return {};
  return buildMetadata({
    lang,
    path: "/what-we-do/building-uk-presence",
    title:
      lang === "zh" ? "建立英国市场存在｜Venus Bridge" : "Building UK Presence | Venus Bridge",
    description:
      lang === "zh"
        ? "通过持续内容、市场节点与双语本地执行，帮助中国企业建立可信的英国市场存在。"
        : "Build credible UK continuity through content, market moments and bilingual local delivery."
  });
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) notFound();
  return <BuildingUkPresencePage language={lang} />;
}
