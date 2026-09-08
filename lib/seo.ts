import type { Metadata } from "next";
import type { Language } from "@/lib/i18n";
import { company } from "@/content/company";
import { isIndexingAllowed } from "@/lib/release";

const siteUrl = company.websiteDomain;
const indexable = isIndexingAllowed();
const ogVersion = "v20260831";
const ogImagePath = (lang: Language, path: string) => {
  const route = path === "/" ? "home" : path.replace(/^\//, "").replaceAll("/", "-");
  return `/og/${ogVersion}/${lang}/${route}.png`;
};

export const seoDescriptions = {
  en: "UK and European market validation, buyer and partner engagement, launches and local execution for Chinese companies.",
  zh: "帮助中国企业验证英国与欧洲市场机会、对接买家与合作方，并推进发布、展会和本地执行。"
};

export function buildMetadata({
  lang,
  path,
  title,
  description,
  keywords = [],
  ogAlt,
  ogImage,
  allowIndex = indexable
}: {
  lang: Language;
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  ogAlt?: string;
  ogImage?: string;
  allowIndex?: boolean;
}): Metadata {
  const localizedPath = `/${lang}${path === "/" ? "" : path}`;
  const resolvedOgImage = ogImage ?? ogImagePath(lang, path);
  const absolute = (value: string) => (value.startsWith("http") ? value : `${siteUrl}${value}`);
  return {
    title: { absolute: title },
    description,
    keywords,
    robots: allowIndex
      ? { index: true, follow: true }
      : { index: false, follow: false, noarchive: true, nocache: true },
    alternates: {
      canonical: absolute(localizedPath),
      languages: {
        "en-GB": absolute(`/en${path === "/" ? "" : path}`),
        "zh-CN": absolute(`/zh${path === "/" ? "" : path}`),
        "x-default": absolute(`/en${path === "/" ? "" : path}`)
      }
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}${localizedPath}`,
      siteName: "Venus Bridge",
      type: "website",
      locale: lang === "zh" ? "zh_CN" : "en_GB",
      alternateLocale: lang === "zh" ? ["en_GB"] : ["zh_CN"],
      images: [{ url: absolute(resolvedOgImage), width: 1200, height: 630, alt: ogAlt ?? title }]
    },
    twitter: { card: "summary_large_image", title, description, images: [absolute(resolvedOgImage)] }
  };
}
