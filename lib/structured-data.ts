import { brand } from "@/content/brand";
import type { Language } from "@/lib/i18n";
export type BreadcrumbItem = { name: string; path: string };
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    name: brand.name,
    url: brand.domain,
    email: brand.email,
    description: brand.strapline.en
  };
}
export function serviceJsonLd({
  lang,
  name,
  description,
  path
}: {
  lang: Language;
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${brand.domain}/${lang}${path}`,
    provider: { "@type": "Organization", name: brand.name, url: brand.domain },
    areaServed: "United Kingdom"
  };
}
export function breadcrumbJsonLd({ lang, items }: { lang: Language; items: BreadcrumbItem[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${brand.domain}/${lang}${item.path === "/" ? "" : item.path}`
    }))
  };
}
