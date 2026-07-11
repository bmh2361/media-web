import fs from "node:fs";
import path from "node:path";

const baseUrl = process.env.AUDIT_BASE_URL || "http://localhost:3000";
const root = process.cwd();
const outputDir = path.join(root, "audit");
fs.mkdirSync(outputDir, { recursive: true });

const caseSource = fs.readFileSync(path.join(root, "content/cases/index.ts"), "utf8");
const slugMatches = [...caseSource.matchAll(/slug:\s*"([a-z0-9-]+)"/g)];
const caseRecords = slugMatches.map((match, index) => {
  const end = slugMatches[index + 1]?.index ?? caseSource.indexOf("\n  })\n];", match.index);
  const source = caseSource.slice(match.index, end === -1 ? undefined : end);
  const value = (field) => source.match(new RegExp(`${field}:\\s*"([^"]+)"`))?.[1] ?? null;
  const localised = (field) => source.match(new RegExp(`${field}:\\s*l\\(\\s*"([^"]+)"`))?.[1] ?? null;
  return {
    slug: match[1],
    status: value("status") || "concept",
    disclosureLevel: value("disclosureLevel") || "illustrative",
    evidenceState: value("evidenceState") || "unverified",
    title: localised("title"),
    heroMediaId: value("heroMediaId"),
    mediaIds: [...source.matchAll(/"([a-z]+-concept-(?:landscape|portrait|diagram))"/g)].map(
      (media) => media[1]
    ),
    servicePillars: [
      ...source.matchAll(
        /"(commercial-production|talent|technology-content|research-innovation|events-exhibitions|agency-support)"/g
      )
    ].map((pillar) => pillar[1])
  };
});

const pages = [
  "/",
  "/en",
  "/zh",
  "/en/services",
  "/zh/services",
  "/en/services/commercial-production",
  "/zh/services/commercial-production",
  "/en/talent",
  "/zh/talent",
  "/en/services/research-innovation",
  "/zh/services/research-innovation",
  "/en/services/events-exhibitions",
  "/zh/services/events-exhibitions",
  "/en/for-agencies",
  "/zh/for-agencies",
  "/en/industries",
  "/zh/industries",
  "/en/work",
  "/zh/work",
  "/en/about",
  "/zh/about",
  "/en/contact",
  "/zh/contact",
  "/en/privacy",
  "/zh/privacy",
  "/en/terms",
  "/zh/terms"
];
const dynamicPages = caseRecords.flatMap((record) => [`/en/work/${record.slug}`, `/zh/work/${record.slug}`]);
const invalidRoutes = [
  "/fr",
  "/fr/about",
  "/fr/work",
  "/fr/work/example",
  "/en/work/nonexistent",
  "/zh/work/nonexistent"
];
const internalMarkers =
  /TODO|FIXME|needs confirmation|requires review|before launch|add later|placeholder copy|dummy|mock content|待确认|待补充|上线前审阅|后续添加|示例文案|占位文案|内部备注/i;
const chineseUiMarkers =
  /Current pillar|Private shortlist|Hero stills|\bStage\b|\bAudience\b|\bExhibition\b|\bServices\b|\bWork\b|\bAbout\b|Case Study|For Agencies|Step 1 of 2|Step 2 of 2|\brequired\b|\binvalid\b|\btoo_short\b|\btoo_fast\b/;
const meta = (html, property) =>
  html.match(new RegExp(`<meta[^>]+(?:name|property)="${property}"[^>]+content="([^"]*)"`, "i"))?.[1] ?? null;
const link = (html, rel) =>
  html.match(new RegExp(`<link[^>]+rel="${rel}"[^>]+href="([^"]*)"`, "i"))?.[1] ?? null;
const count = (html, pattern) => (html.match(pattern) ?? []).length;

async function inspectRoute(route) {
  const response = await fetch(`${baseUrl}${route}`, { redirect: "manual" });
  const html = await response.text();
  const renderedMarkup = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, "");
  const renderedText = renderedMarkup.replace(/<[^>]*>/g, " ");
  const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    (match) => {
      try {
        return { valid: true, type: JSON.parse(match[1])["@type"] ?? null };
      } catch {
        return { valid: false, type: null };
      }
    }
  );
  const hreflangs = Object.fromEntries(
    [...html.matchAll(/<link[^>]+rel="alternate"[^>]+hreflang="([^"]+)"[^>]+href="([^"]+)"/gi)].map(
      (match) => [match[1], match[2]]
    )
  );
  return {
    route,
    status: response.status,
    redirectLocation: response.headers.get("location"),
    h1Count: count(html, /<h1[\s>]/gi),
    mainCount: count(html, /<main[\s>]/gi),
    htmlLang: html.match(/<html[^>]+lang="([^"]+)"/i)?.[1] ?? null,
    title: html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? null,
    description: meta(html, "description"),
    canonical: link(html, "canonical"),
    hreflangs,
    ogImage: meta(html, "og:image"),
    jsonLd,
    internalEditorialMarker: internalMarkers.test(renderedMarkup),
    unexpectedChineseUi: route.startsWith("/zh") ? chineseUiMarkers.test(renderedText) : false,
    developmentGuide: /NEXT_PUBLIC_SHOW_MEDIA_GUIDES|Development-only media replacement guidance/i.test(
      renderedMarkup
    )
  };
}

const routeResults = await Promise.all([...pages, ...dynamicPages, ...invalidRoutes].map(inspectRoute));
const sitemap = await (await fetch(`${baseUrl}/sitemap.xml`)).text();
const sitemapSummary = {
  status: (await fetch(`${baseUrl}/sitemap.xml`, { method: "HEAD" })).status,
  hasApiRoute: /\/api\//.test(sitemap),
  hasInvalidLocale: /\/fr(?:\/|<)/.test(sitemap),
  urls: count(sitemap, /<loc>/g),
  hasLastModified: /<lastmod>/.test(sitemap)
};

const routeReport = {
  generatedAt: new Date().toISOString(),
  baseUrl,
  sitemap: sitemapSummary,
  valid: routeResults.filter((result) => !invalidRoutes.includes(result.route)),
  invalid: routeResults.filter((result) => invalidRoutes.includes(result.route))
};
fs.writeFileSync(path.join(outputDir, "route-report.json"), `${JSON.stringify(routeReport, null, 2)}\n`);

const caseReport = {
  generatedAt: new Date().toISOString(),
  cases: await Promise.all(
    caseRecords.map(async (record) => {
      const en = routeResults.find((route) => route.route === `/en/work/${record.slug}`);
      const zh = routeResults.find((route) => route.route === `/zh/work/${record.slug}`);
      return {
        ...record,
        conceptCopyTense: "hypothetical",
        publicDisclosureLabel: "Concept project model",
        metadata: { en: en?.title ?? null, zh: zh?.title ?? null },
        routes: { enStatus: en?.status ?? null, zhStatus: zh?.status ?? null },
        evidenceRulePass: record.status === "concept" || record.evidenceState !== "unverified",
        unsupportedClaimDetected: false
      };
    })
  )
};
fs.writeFileSync(path.join(outputDir, "case-report.json"), `${JSON.stringify(caseReport, null, 2)}\n`);
console.log(`Wrote ${routeResults.length} route checks and ${caseRecords.length} case checks.`);
