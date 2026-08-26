import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { PortfolioProjectDetail } from "@/components/sections/PortfolioProjectDetail";
import { commercialCaseCategories, findPublishedPortfolioProject, getProjectCover, publishedPortfolioProjects } from "@/content/portfolio";
import { isSupportedLocale, languages } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { getEffectiveWorkMode } from "@/lib/release";
import { breadcrumbJsonLd, creativeWorkJsonLd } from "@/lib/structured-data";

export function generateStaticParams() {
  const mode = getEffectiveWorkMode();
  return languages.flatMap((lang) =>
    (mode === "hidden" ? [] : publishedPortfolioProjects).map((project) => ({ lang, slug: project.slug }))
  );
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  if (!isSupportedLocale(lang)) return {};
  const project = findPublishedPortfolioProject(slug);
  if (!project || getEffectiveWorkMode() === "hidden") return {};
  return buildMetadata({
    lang,
    path: `/work/${slug}`,
    title: `${lang === "zh" ? project.titleZh : project.titleEn} | ${commercialCaseCategories[project.category][lang]} | Venus Bridge`,
    description: [
      lang === "zh" ? project.commercialObjectiveZh : project.commercialObjectiveEn,
      lang === "zh" ? project.roleStatementZh : project.roleStatementEn,
      project.location
    ].filter(Boolean).join(" — "),
    ogAlt: lang === "zh" ? project.titleZh : project.titleEn,
    ogImage: getProjectCover(project)?.publicPath,
  });
}

export default async function Page({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  if (!isSupportedLocale(lang) || getEffectiveWorkMode() === "hidden") notFound();
  const project = findPublishedPortfolioProject(slug);
  if (!project) notFound();
  const name = lang === "zh" ? project.titleZh : project.titleEn;
  const description = [
    lang === "zh" ? project.commercialObjectiveZh : project.commercialObjectiveEn,
    lang === "zh" ? project.roleStatementZh : project.roleStatementEn,
    project.location
  ].filter(Boolean).join(" — ");
  const cover = getProjectCover(project)?.publicPath;
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd({
          lang,
          items: [
            { name: lang === "zh" ? "首页" : "Home", path: "/" },
            { name: lang === "zh" ? "案例研究" : "Case Studies", path: "/work" },
            { name, path: `/work/${slug}` }
          ]
        })}
      />
      <JsonLd data={creativeWorkJsonLd({ lang, name, description, path: `/work/${slug}`, image: cover })} />
      <PortfolioProjectDetail project={project} language={lang} />
    </>
  );
}
