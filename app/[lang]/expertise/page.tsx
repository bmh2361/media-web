import { notFound } from "next/navigation";
import { ExpertiseOverview } from "@/components/sections/InformationArchitecturePages";
import { isSupportedLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) return {};
  return buildMetadata({
    lang,
    path: "/expertise",
    title: lang === "zh" ? "专业领域｜Venus Bridge" : "Expertise | Venus Bridge",
    description:
      lang === "zh"
        ? "汽车与出行、时尚美妆与服装、娱乐与文化、科技 AI 与科研四个重点专业领域。"
        : "Sector expertise across automotive, fashion and beauty, entertainment and culture, and technology, AI and research."
  });
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) notFound();
  return <ExpertiseOverview language={lang} />;
}
