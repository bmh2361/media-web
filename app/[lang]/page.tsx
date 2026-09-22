import { notFound } from "next/navigation";
import { Phase5Homepage } from "@/components/sections/Phase5Homepage";
import { isSupportedLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) return {};
  return buildMetadata({
    lang,
    path: "/",
    title:
      lang === "zh"
        ? "帮助中国科技企业在英国建立市场与合作 | Venus Bridge"
        : "UK Market Entry for Chinese Technology Companies | Venus Bridge",
    description:
      lang === "zh"
        ? "英国市场判断、品牌本地化、市场启动与合作推进。以英国为起点，按项目开展欧洲工作。"
        : "UK market readiness, brand localisation, launch programmes and partnership development for Chinese technology companies. UK-led, with selected European projects.",
    keywords: [
      "UK market entry for Chinese companies",
      "Chinese technology companies UK",
      "China UK commercial partnerships",
      "UK local execution"
    ]
  });
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) notFound();
  return <Phase5Homepage language={lang} />;
}
