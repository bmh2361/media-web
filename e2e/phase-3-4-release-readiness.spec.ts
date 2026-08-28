import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  "/en",
  "/zh",
  "/en/work",
  "/zh/work",
  "/en/work/byd-bd11-london",
  "/zh/work/byd-bd11-london",
  "/en/work/changan-europe-launch-2025",
  "/zh/work/changan-europe-launch-2025",
  "/en/work/catl-open-day-2025",
  "/zh/work/catl-open-day-2025",
  "/en/capabilities#institutional-expert-collaboration",
  "/zh/capabilities#institutional-expert-collaboration",
  "/en/about",
  "/zh/about",
  "/en/contact",
  "/zh/contact"
] as const;

const viewports = [
  { width: 1440, height: 900 },
  { width: 1280, height: 800 },
  { width: 390, height: 844 },
  { width: 375, height: 812 }
] as const;

test("Phase 3.4 canonical release surface is responsive and accessible", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop");
  test.setTimeout(240_000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  const runtimeErrors: string[] = [];
  page.on("pageerror", (error) => runtimeErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") runtimeErrors.push(message.text());
  });

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    for (const route of routes) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await expect(page.locator("main")).toBeVisible();
      await expect(page.locator("h1")).toBeVisible();

      const layout = await page.evaluate(() => ({
        documentOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        bodyOverflow: document.body.scrollWidth - document.documentElement.clientWidth,
        brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0)
          .length
      }));
      expect(
        layout.documentOverflow,
        `${route} document overflow at ${viewport.width}px`
      ).toBeLessThanOrEqual(1);
      expect(layout.bodyOverflow, `${route} body overflow at ${viewport.width}px`).toBeLessThanOrEqual(1);
      expect(layout.brokenImages, `${route} broken images at ${viewport.width}px`).toBe(0);

      if (viewport.width === 1440 || viewport.width === 390) {
        const accessibility = await new AxeBuilder({ page: page as never })
          .withTags(["wcag2a", "wcag2aa"])
          .analyze();
        expect(accessibility.violations, `${route} accessibility violations at ${viewport.width}px`).toEqual(
          []
        );
      }
    }
  }

  expect(runtimeErrors, "canonical pages should not emit console or page errors").toEqual([]);
});
