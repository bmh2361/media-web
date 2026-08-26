import { notFound } from "next/navigation";
import { ExpertiseDetailPage } from "@/components/sections/InformationArchitecturePages";
import { expertiseSectors, getExpertiseSector } from "@/content/information-architecture";
import { isSupportedLocale, languages } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return languages.flatMap((lang) => expertiseSectors.map((sector) => ({ lang, sector: sector.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; sector: string }> }) {
  const { lang, sector: slug } = await params;
  if (!isSupportedLocale(lang)) return {};
  const sector = getExpertiseSector(slug);
  if (!sector) return {};
  return buildMetadata({
    lang,
    path: `/expertise/${sector.slug}`,
    title: `${sector.title[lang]} | Venus Bridge`,
    description: `${sector.subtitle[lang]} ${sector.challenge[lang]}`
  });
}

export default async function Page({ params }: { params: Promise<{ lang: string; sector: string }> }) {
  const { lang, sector: slug } = await params;
  if (!isSupportedLocale(lang)) notFound();
  const sector = getExpertiseSector(slug);
  if (!sector) notFound();
  return <ExpertiseDetailPage language={lang} sector={sector} />;
}
