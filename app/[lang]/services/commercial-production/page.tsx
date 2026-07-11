import { CommercialProductionExperience } from "@/components/sections/experiences/CommercialProductionExperience";
import { commercialProduction } from "@/content/pages/service-details";
import type { Language } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
export async function generateMetadata({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params,
    c = commercialProduction[lang];
  return buildMetadata({
    lang,
    path: "/services/commercial-production",
    title: `${c.title} | FrameBridge Studio`,
    description: c.intro
  });
}
export default async function Page({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params;
  return <CommercialProductionExperience copy={commercialProduction[lang]} language={lang} />;
}
