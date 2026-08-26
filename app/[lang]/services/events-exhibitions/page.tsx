import { EventsExhibitionsExperience } from "@/components/sections/experiences/EventsExhibitionsExperience";
import { eventsExhibitions } from "@/content/pages/service-details";
import type { Language } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
export async function generateMetadata({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params,
    c = eventsExhibitions[lang];
  return buildMetadata({
    lang,
    path: "/services/events-exhibitions",
    title: `${c.title} | Venus Bridge`,
    description: c.intro
  });
}
export default async function Page({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params;
  return <EventsExhibitionsExperience copy={eventsExhibitions[lang]} language={lang} />;
}
