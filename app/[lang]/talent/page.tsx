import { TalentExperience } from "@/components/sections/experiences/TalentExperience";
import { talentPage } from "@/content/site";
import type { Language } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params;
  const copy = talentPage[lang];
  return buildMetadata({
    lang,
    path: "/talent",
    title: lang === "zh" ? `${copy.title} | 人才与创作者` : `${copy.title} | Talent & Creators`,
    description: copy.intro,
    keywords: ["London models", "UK Chinese creators", "UK talent casting", "London presenters"]
  });
}

export default async function TalentPage({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params;
  return <TalentExperience language={lang} />;
}
