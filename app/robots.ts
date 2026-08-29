import type { MetadataRoute } from "next";
import { brand } from "@/content/brand";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${brand.domain}/sitemap.xml`,
    host: brand.domain
  };
}
