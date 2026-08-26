import { notFound } from "next/navigation";
import { CustomerSituationHub } from "@/components/sections/CommercialArchitecturePages";
import { isSupportedLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) return {};
  return buildMetadata({
    lang,
    path: "/what-we-do",
    title: lang === "zh" ? "我们如何协助｜Venus Bridge" : "How We Help | Venus Bridge",
    description:
      lang === "zh"
        ? "从探索英国市场、筹备发布、建立市场存在到英国本地执行，按企业当前阶段选择下一步。"
        : "Choose the next UK step from your current situation: exploration, launch, presence or local delivery."
  });
}

export default async function WhatWeDoPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) notFound();
  return <CustomerSituationHub language={lang} />;
}
