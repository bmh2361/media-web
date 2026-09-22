import { notFound, redirect } from "next/navigation";
import { isSupportedLocale, withLanguage } from "@/lib/i18n";
export default async function PriorityAreasPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) notFound();
  redirect(withLanguage("/services#priority-areas", lang));
}
