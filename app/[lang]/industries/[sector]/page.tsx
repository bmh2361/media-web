import { notFound, redirect } from "next/navigation";
import { isSupportedLocale, languages, withLanguage } from "@/lib/i18n";
const sectors = ["technology-ai-research"];
export function generateStaticParams() {
  return languages.flatMap((lang) => sectors.map((sector) => ({ lang, sector })));
}
export default async function Page({ params }: { params: Promise<{ lang: string; sector: string }> }) {
  const { lang, sector } = await params;
  if (!isSupportedLocale(lang) || !sectors.includes(sector)) notFound();
  redirect(withLanguage("/#priority-areas", lang));
}
