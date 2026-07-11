import type { MetadataRoute } from "next";
import { brand } from "@/content/brand";
import { caseStudies } from "@/content/cases";
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/services",
    "/services/commercial-production",
    "/services/research-innovation",
    "/services/events-exhibitions",
    "/industries",
    "/talent",
    "/work",
    "/for-agencies",
    "/about",
    "/contact",
    "/privacy",
    "/terms"
  ];
  const routes = ["en", "zh"].flatMap((lang) =>
    pages.map((path) => ({
      url: `${brand.domain}/${lang}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7
    }))
  );
  const cases = ["en", "zh"].flatMap((lang) =>
    caseStudies.map((c) => ({
      url: `${brand.domain}/${lang}/work/${c.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6
    }))
  );
  return [...routes, ...cases];
}
