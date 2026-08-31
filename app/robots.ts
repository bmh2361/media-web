import type { MetadataRoute } from "next";
import { brand } from "@/content/brand";
import { isIndexingAllowed } from "@/lib/release";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (!isIndexingAllowed()) {
    return {
      rules: { userAgent: "*", disallow: "/" }
    };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${brand.domain}/sitemap.xml`,
    host: brand.domain
  };
}
