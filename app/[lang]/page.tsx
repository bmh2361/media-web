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
        ? "中国企业英国与欧洲市场进入及本地执行 | Venus Bridge"
        : "UK Market Entry, Partnerships & Local Execution for Chinese Companies | Venus Bridge",
    description:
      lang === "zh"
        ? "帮助中国企业验证英国与欧洲市场机会、对接买家与合作方，并落地发布、展会及本地市场行动。"
        : "Venus Bridge helps Chinese companies validate UK and European opportunities, engage buyers and partners, and deliver launches, exhibitions and market activity on the ground.",
    keywords: [
      "UK market entry for Chinese companies",
      "Europe expansion",
      "buyer and distributor engagement",
      "UK local execution"
    ]
  });
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) notFound();
  return <Phase5Homepage language={lang} />;
}
