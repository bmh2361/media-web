import type { Metadata } from "next";
import type { Language } from "@/lib/i18n";
import { company } from "@/content/company";

const siteUrl = company.websiteDomain;
const indexable = true;
const ogImagePath = () => "/og/venus-bridge.png";

export const seoDescriptions = {
  en: "UK market entry and partnerships for Chinese technology companies. UK-led, with selected European projects.",
  zh: "帮助中国科技企业在英国建立市场与合作，并按项目开展欧洲工作。"
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
  const resolvedOgImage = ogImage ?? ogImagePath();
  return {
    title: { absolute: title },
    description,
    keywords,
    robots: allowIndex
      ? { index: true, follow: true }
      : { index: false, follow: false, noarchive: true, nocache: true },
    alternates: {
      canonical: localizedPath,
      languages: {
        "en-GB": `/en${path === "/" ? "" : path}`,
        "zh-CN": `/zh${path === "/" ? "" : path}`,
        "x-default": `/en${path === "/" ? "" : path}`
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
      images: [{ url: resolvedOgImage, width: 1200, height: 630, alt: ogAlt ?? title }]
    },
    twitter: { card: "summary_large_image", title, description, images: [resolvedOgImage] }
  };
}
