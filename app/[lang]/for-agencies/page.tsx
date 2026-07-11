import { AgencySupportExperience } from "@/components/sections/experiences/AgencySupportExperience";
import { agenciesPage } from "@/content/site";
import type { Language } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params;
  const copy = agenciesPage[lang];
  return buildMetadata({
    lang,
    path: "/for-agencies",
    title: lang === "zh" ? `${copy.title} | 代理支持` : `${copy.title} | For Agencies`,
    description: copy.intro,
    keywords: [
      "UK production partner for Chinese agencies",
      "London local production team",
      "Bilingual production coordinator UK"
    ]
  });
}

export default async function ForAgenciesPage({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params;
  return <AgencySupportExperience language={lang} />;
}
