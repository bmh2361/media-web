import { notFound } from "next/navigation";
import { ExpertiseDetailPage } from "@/components/sections/InformationArchitecturePages";
import { expertiseSectors, getExpertiseSector } from "@/content/information-architecture";
import { isSupportedLocale, languages } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  const dynamicSectors = expertiseSectors.filter(
    (sector) => sector.slug === "entertainment-culture" || sector.slug === "technology-ai-research"
  );
  return languages.flatMap((lang) => dynamicSectors.map((sector) => ({ lang, sector: sector.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; sector: string }> }) {
  const { lang, sector: slug } = await params;
  if (!isSupportedLocale(lang)) return {};
  const sector = getExpertiseSector(slug);
  if (!sector) return {};
  return buildMetadata({
    lang,
    path: `/industries/${sector.slug}`,
    title: `${sector.title[lang]} | Venus Bridge`,
    description: `${sector.subtitle[lang]} ${sector.challenge[lang]}`
  });
}

export default async function IndustryDetailPage({
  params
}: {
  params: Promise<{ lang: string; sector: string }>;
}) {
  const { lang, sector: slug } = await params;
  if (!isSupportedLocale(lang)) notFound();
  const sector = getExpertiseSector(slug);
  if (!sector) notFound();
  return <ExpertiseDetailPage language={lang} sector={sector} />;
}
