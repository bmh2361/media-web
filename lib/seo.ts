import type { Metadata } from "next";
import type { Language } from "@/lib/i18n";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://framebridge.studio";
const ogImagePath = (lang: Language, path: string) =>
  `/og/${lang}/${path === "/" ? "home" : path.replace(/^\//, "").replaceAll("/", "--")}`;

export const seoDescriptions = {
  en: "UK-based creative production, photography, video, styling, models, creators and event content partner for Chinese brands, agencies and PR teams.",
  zh: "为中国品牌、媒体、广告公司和PR团队提供英国本地创意制作、商业摄影、短视频、模特达人、活动拍摄和海外传播素材服务。"
};

export function buildMetadata({
  lang,
  path,
  title,
  description,
  keywords = [],
  ogAlt
}: {
  lang: Language;
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  ogAlt?: string;
}): Metadata {
  const localizedPath = `/${lang}${path === "/" ? "" : path}`;
  return {
    title: {
      absolute: title
    },
    description,
    keywords,
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
      siteName: "FrameBridge Studio",
      type: "website",
      locale: lang === "zh" ? "zh_CN" : "en_GB",
      alternateLocale: lang === "zh" ? ["en_GB"] : ["zh_CN"],
      images: [
        {
          url: ogImagePath(lang, path),
          width: 1200,
          height: 630,
          alt: ogAlt ?? title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImagePath(lang, path)]
    }
  };
}
