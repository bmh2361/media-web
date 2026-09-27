import type { Language } from "@/lib/i18n";

export type MarketCoverageItem = {
  status: "draft" | "published";
  type: Record<Language, string>;
  publication: string;
  headline: Record<Language, string>;
  subject: Record<Language, string>;
  date: string;
  url: string;
};

// Add only verified articles, with their real publication date and original URL.
export const marketCoverage: MarketCoverageItem[] = [];
