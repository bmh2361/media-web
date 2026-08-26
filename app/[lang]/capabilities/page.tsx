import { notFound, redirect } from "next/navigation";
import { isSupportedLocale, withLanguage } from "@/lib/i18n";

export default async function CapabilitiesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) notFound();
  redirect(withLanguage("/companies", lang));
}
