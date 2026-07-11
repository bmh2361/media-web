import { ResearchInnovationExperience } from "@/components/sections/experiences/ResearchInnovationExperience";
import { researchInnovation } from "@/content/pages/service-details";
import type { Language } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
export async function generateMetadata({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params,
    c = researchInnovation[lang];
  return buildMetadata({
    lang,
    path: "/services/research-innovation",
    title: `${c.title} | FrameBridge Studio`,
    description: c.intro
  });
}
export default async function Page({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params;
  return <ResearchInnovationExperience copy={researchInnovation[lang]} language={lang} />;
}
