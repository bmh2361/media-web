import type { MetadataRoute } from "next";
import { brand } from "@/content/brand";
import { publishedPortfolioProjects } from "@/content/portfolio";
import { getEffectiveWorkMode, isProductionReleaseReady } from "@/lib/release";

export default function sitemap(): MetadataRoute.Sitemap {
  if (process.env.RELEASE_PROFILE === "production" && !isProductionReleaseReady()) return [];
  const workMode = getEffectiveWorkMode();
  const pages = [
    "",
    "/companies",
    "/partners",
    "/work",
    "/how-we-work",
    "/about",
    "/contact",
    "/privacy",
    "/terms"
  ];
  if (workMode === "hidden") pages.splice(pages.indexOf("/work"), 1);

  const routes = ["en", "zh"].flatMap((lang) =>
    pages.map((path) => ({
      url: `${brand.domain}/${lang}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7
    }))
  );
  const projects = ["en", "zh"].flatMap((lang) =>
    (workMode === "hidden" ? [] : publishedPortfolioProjects).map((project) => ({
      url: `${brand.domain}/${lang}/work/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6
    }))
  );
  return [...routes, ...projects];
}
