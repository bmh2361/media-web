import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const canonicalRoutes = [
  "/en",
  "/zh",
  "/en/capabilities",
  "/zh/capabilities",
  "/en/work",
  "/zh/work",
  "/en/about",
  "/zh/about",
  "/en/contact",
  "/zh/contact",
  "/en/work/changan-europe-launch-2025",
  "/en/work/catl-open-day-2025",
  "/en/work/beauty-fashion-brand-content"
];

test("Phase 3.2C canonical pages pass responsive and automated accessibility checks", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of canonicalRoutes) {
    await page.goto(route);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveCount(1);
    const rendered = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2,
      brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).length,
      missingAlt: [...document.images].filter((image) => !image.hasAttribute("alt")).length
    }));
    expect(rendered, route).toEqual({ overflow: false, brokenImages: 0, missingAlt: 0 });

    const results = await new AxeBuilder({ page: page as never }).analyze();
    const findings = results.violations
      .filter((violation) => ["moderate", "serious", "critical"].includes(violation.impact ?? ""))
      .map((violation) => ({ id: violation.id, targets: violation.nodes.map((node) => node.target) }));
    expect(findings, `Axe findings for ${route}`).toEqual([]);
  }
});

test("Phase 3.2C mobile navigation opens, closes and restores focus", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile");
  await page.goto("/en");
  const menu = page.getByRole("button", { name: "Open menu" });
  await menu.click();
  await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Close menu" })).toHaveCount(0);
  await expect(menu).toBeFocused();
});

test("Phase 3.2C homepage stays within the initial-load budget", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop");
  await page.goto("/en");
  await page.waitForLoadState("load");
  await page.waitForTimeout(500);
  const metrics = await page.evaluate(() => {
    const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
    const encoded = resources.reduce((total, resource) => total + resource.encodedBodySize, 0);
    const scripts = resources.filter((resource) => resource.initiatorType === "script");
    const images = resources.filter((resource) => resource.initiatorType === "img");
    return {
      encoded,
      scriptBytes: scripts.reduce((total, resource) => total + resource.encodedBodySize, 0),
      imageBytes: images.reduce((total, resource) => total + resource.encodedBodySize, 0),
      priorityImages: document.querySelectorAll('img[fetchpriority="high"]').length,
      renderedHeroScenes: document.querySelectorAll("[data-phase32c-home-hero] img").length
    };
  });
  console.log(`Phase 3.2C load metrics: ${JSON.stringify(metrics)}`);
  expect(metrics.encoded).toBeLessThan(2_500_000);
  expect(metrics.scriptBytes).toBeLessThan(500_000);
  expect(metrics.imageBytes).toBeLessThan(1_750_000);
  expect(metrics.priorityImages).toBe(1);
  expect(metrics.renderedHeroScenes).toBe(1);
});
