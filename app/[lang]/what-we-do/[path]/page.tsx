import { notFound, redirect } from "next/navigation";
import { isSupportedLocale, languages, withLanguage } from "@/lib/i18n";
const destinations: Record<string, string> = {
  "enter-the-uk": "/services",
  "launch-in-the-uk": "/services#launch",
  "create-in-the-uk": "/services#brand-communication"
};
export function generateStaticParams() {
  return languages.flatMap((lang) => Object.keys(destinations).map((path) => ({ lang, path })));
}
export default async function Page({ params }: { params: Promise<{ lang: string; path: string }> }) {
  const { lang, path } = await params;
  if (!isSupportedLocale(lang) || !destinations[path]) notFound();
  redirect(withLanguage(destinations[path], lang));
}
