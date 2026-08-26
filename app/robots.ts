import type { MetadataRoute } from "next";
import { brand } from "@/content/brand";
import { isProductionReleaseReady } from "@/lib/release";
export default function robots(): MetadataRoute.Robots {
  const production = isProductionReleaseReady();
  return {
    rules: production ? { userAgent: "*", allow: "/", disallow: "/api/" } : { userAgent: "*", disallow: "/" },
    ...(production ? { sitemap: `${brand.domain}/sitemap.xml`, host: brand.domain } : {})
  };
}
