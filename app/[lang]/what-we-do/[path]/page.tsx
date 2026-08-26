import { notFound } from "next/navigation";
import { PathDetailPage } from "@/components/sections/InformationArchitecturePages";
import { getProjectPath, projectPaths } from "@/content/information-architecture";
import { isSupportedLocale, languages } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return languages.flatMap((lang) => projectPaths.map((path) => ({ lang, path: path.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; path: string }> }) {
  const { lang, path: slug } = await params;
  if (!isSupportedLocale(lang)) return {};
  const path = getProjectPath(slug);
  if (!path) return {};
  return buildMetadata({
    lang,
    path: `/what-we-do/${path.slug}`,
    title: `${path.title[lang]} | Venus Bridge`,
    description: path.intro[lang]
  });
}

export default async function Page({ params }: { params: Promise<{ lang: string; path: string }> }) {
  const { lang, path: slug } = await params;
  if (!isSupportedLocale(lang)) notFound();
  const path = getProjectPath(slug);
  if (!path) notFound();
  return <PathDetailPage language={lang} path={path} />;
}
