import { brand } from "@/content/brand";
import { company } from "@/content/company";
import type { Language } from "@/lib/i18n";
import { venusBridgeMedia } from "@/lib/brand/venusBridgeMedia";
import { isProductionReleaseReady } from "@/lib/release";
export type BreadcrumbItem = { name: string; path: string };
export function organizationJsonLd() {
  if (process.env.RELEASE_PROFILE === "production" && !isProductionReleaseReady()) {
    return null;
  }
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    name: brand.name,
    url: brand.domain,
    email: brand.email,
    description: brand.strapline.en,
    slogan: venusBridgeMedia.slogan,
    logo: {
      "@type": "ImageObject",
      url: `${brand.domain}${venusBridgeMedia.logos["full-transparent"].light}`,
      width: venusBridgeMedia.logos["full-transparent"].width,
      height: venusBridgeMedia.logos["full-transparent"].height
    },
    ...(company.legalName ? { legalName: company.legalName } : {}),
    ...(company.registeredOffice
      ? { address: { "@type": "PostalAddress", streetAddress: company.registeredOffice } }
      : {}),
    sameAs: Object.values(company.socialProfiles).filter((profile): profile is string => Boolean(profile))
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

export function creativeWorkJsonLd({
  lang,
  name,
  description,
  path,
  image
}: {
  lang: Language;
  name: string;
  description: string;
  path: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name,
    description,
    inLanguage: lang === "zh" ? "zh-CN" : "en-GB",
    url: `${brand.domain}/${lang}${path}`,
    ...(image ? { image: image.startsWith("http") ? image : `${brand.domain}${image}` } : {}),
    creator: { "@type": "Organization", name: brand.name, url: brand.domain }
  };
}
