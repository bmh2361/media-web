import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const root = process.cwd();
const outputDir = path.join(root, "audit", "final-prelaunch");
const baseUrl = process.env.AUDIT_BASE_URL || "http://127.0.0.1:3340";
const languages = ["en", "zh"];
const pagePaths = ["", "/companies", "/partners", "/work", "/how-we-work", "/about", "/contact", "/privacy", "/terms"];
const caseSlugs = [
  "wang-linkai-london-concert",
  "geely-london-brand-launch",
  "changan-europe-launch-2025",
  "catl-open-day-2025",
  "yue-yunpeng-london-live",
  "london-fashion-week-2025",
  "leapmotor-iaa-2023",
  "byd-bd11-london",
  "agibot-london-launch",
  "london-automotive-brand-film",
  "beauty-fashion-brand-content",
  "european-road-lifestyle"
];
const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 1000 }
];
const screenshotViewports = new Set(["mobile", "desktop"]);

await fs.mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({ headless: true });
const results = [];

const safeName = (language, pagePath, viewport) =>
  `${language}-${pagePath.replaceAll("/", "-").replace(/^-/, "") || "home"}-${viewport}.png`;

for (const language of languages) {
  const routes = [
    ...pagePaths.map((pagePath) => ({ kind: "page", pagePath })),
    ...caseSlugs.map((slug) => ({ kind: "case", pagePath: `/work/${slug}` }))
  ];
  for (const route of routes) {
    for (const viewport of viewports) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        reducedMotion: "reduce",
        locale: language === "zh" ? "zh-CN" : "en-GB"
      });
      const page = await context.newPage();
      const consoleErrors = [];
      const pageErrors = [];
      const failedRequests = [];
      page.on("console", (message) => {
        if (message.type() === "error") consoleErrors.push(message.text());
      });
      page.on("pageerror", (error) => pageErrors.push(error.message));
      page.on("requestfailed", (request) => failedRequests.push(`${request.method()} ${request.url()} :: ${request.failure()?.errorText || "failed"}`));
      const url = `${baseUrl}/${language}${route.pagePath}`;
      const response = await page.goto(url, { waitUntil: "networkidle", timeout: 30_000 });
      await page.waitForTimeout(250);
      const browserData = await page.evaluate(() => {
        const visibleOverflow = [...document.querySelectorAll("body *")].flatMap((element) => {
          if (!(element instanceof HTMLElement || element instanceof SVGElement)) return [];
          const style = getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          if (style.display === "none" || style.visibility === "hidden" || Number(style.opacity) === 0 || rect.width === 0 || rect.height === 0) return [];
          if (rect.left >= -1 && rect.right <= innerWidth + 1) return [];
          return [{ tag: element.tagName.toLowerCase(), left: Math.round(rect.left), right: Math.round(rect.right), className: String(element.getAttribute("class") || "").slice(0, 180), text: String(element.textContent || "").trim().replace(/\s+/g, " ").slice(0, 100) }];
        });
        return {
          title: document.title,
          description: document.querySelector('meta[name="description"]')?.getAttribute("content") || null,
          robots: document.querySelector('meta[name="robots"]')?.getAttribute("content") || null,
          canonical: document.querySelector('link[rel="canonical"]')?.href || null,
          hreflang: [...document.querySelectorAll('link[rel="alternate"][hreflang]')].map((node) => node.getAttribute("hreflang")),
          ogImage: document.querySelector('meta[property="og:image"]')?.getAttribute("content") || null,
          lang: document.documentElement.lang,
          h1: [...document.querySelectorAll("h1")].map((node) => node.textContent?.trim()),
          h2: [...document.querySelectorAll("h2")].map((node) => node.textContent?.trim()),
          mainCount: document.querySelectorAll("main").length,
          brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.currentSrc || image.src),
          missingImageAlt: [...document.images].filter((image) => !image.hasAttribute("alt")).map((image) => image.currentSrc || image.src),
          visibleOverflow,
          scrollWidth: document.documentElement.scrollWidth,
          viewportWidth: innerWidth,
          linkCount: document.querySelectorAll("a[href]").length,
          buttonCount: document.querySelectorAll("button").length
        };
      });
      let accessibility = { serious: 0, critical: 0, violations: [] };
      if (route.kind === "page") {
        const axe = await new AxeBuilder({ page }).analyze();
        const violations = axe.violations.filter((violation) => violation.impact === "serious" || violation.impact === "critical");
        accessibility = {
          serious: violations.filter((violation) => violation.impact === "serious").length,
          critical: violations.filter((violation) => violation.impact === "critical").length,
          violations: violations.map((violation) => ({ id: violation.id, impact: violation.impact, nodes: violation.nodes.length, help: violation.help }))
        };
      }
      if (route.kind === "page" && screenshotViewports.has(viewport.name)) {
        await page.screenshot({ path: path.join(outputDir, safeName(language, route.pagePath, viewport.name)), fullPage: true, animations: "disabled" });
      }
      results.push({ language, ...route, viewport, status: response?.status() || null, finalUrl: page.url(), consoleErrors, pageErrors, failedRequests, accessibility, ...browserData });
      await context.close();
    }
  }
}

const request = await browser.newPage();
const routeChecks = [];
for (const route of [
  "/en/services/uk-market-entry",
  "/zh/services/uk-market-entry",
  "/en/capabilities",
  "/zh/industries/automotive",
  "/en/work/fashion-campaign-production-london",
  "/fr",
  "/en/work/not-a-real-case",
  "/robots.txt",
  "/sitemap.xml"
]) {
  const response = await request.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
  routeChecks.push({ route, status: response?.status() || null, finalUrl: request.url() });
}
await request.close();
await browser.close();

const summary = {
  generatedAt: new Date().toISOString(),
  baseUrl,
  resultCount: results.length,
  routeChecks,
  failures: results.filter((result) => result.status !== 200),
  pagesWithConsoleErrors: results.filter((result) => result.consoleErrors.length || result.pageErrors.length || result.failedRequests.length).map((result) => ({ language: result.language, pagePath: result.pagePath, viewport: result.viewport.name, consoleErrors: result.consoleErrors, pageErrors: result.pageErrors, failedRequests: result.failedRequests })),
  pagesWithOverflow: results.filter((result) => result.visibleOverflow.length).map((result) => ({ language: result.language, pagePath: result.pagePath, viewport: result.viewport.name, scrollWidth: result.scrollWidth, viewportWidth: result.viewportWidth, elements: result.visibleOverflow })),
  pagesWithBrokenImages: results.filter((result) => result.brokenImages.length).map((result) => ({ language: result.language, pagePath: result.pagePath, viewport: result.viewport.name, images: result.brokenImages })),
  accessibilityFindings: results.filter((result) => result.accessibility.serious || result.accessibility.critical).map((result) => ({ language: result.language, pagePath: result.pagePath, viewport: result.viewport.name, accessibility: result.accessibility })),
  metadataProblems: results.filter((result) => !result.title || !result.description || result.h1.length !== 1 || result.mainCount !== 1 || result.hreflang.length !== 3).map((result) => ({ language: result.language, pagePath: result.pagePath, viewport: result.viewport.name, title: result.title, description: result.description, h1: result.h1, mainCount: result.mainCount, hreflang: result.hreflang }))
};

await fs.writeFile(path.join(outputDir, "rendered-route-audit.json"), JSON.stringify({ summary, results }, null, 2));
console.log(JSON.stringify({
  resultCount: summary.resultCount,
  routeChecks,
  failureCount: summary.failures.length,
  consoleErrorPageCount: summary.pagesWithConsoleErrors.length,
  overflowPageCount: summary.pagesWithOverflow.length,
  brokenImagePageCount: summary.pagesWithBrokenImages.length,
  accessibilityFindingCount: summary.accessibilityFindings.length,
  metadataProblemCount: summary.metadataProblems.length
}, null, 2));
