import { expect, test } from "@playwright/test";

test.describe("current portfolio archive", () => {
  test("published projects form one real-only archive", async ({ page }) => {
    await page.goto("/en/work");
    await expect(page.locator("[data-case-row]")).toHaveCount(12);
    await expect(page.getByText("Production scenario", { exact: true })).toHaveCount(0);
    await expect(page.locator("body")).not.toContainText(/Xhouse|FrameBridge/i);
    for (const row of await page.locator("[data-case-row]").all())
      await expect(row).toHaveAttribute("href", /\/en\/work\/[a-z0-9-]+/);
  });

  test("archive and representative details remain media-safe from 320 to 1920", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === "mobile");
    for (const width of [320, 390, 768, 1024, 1440, 1920]) {
      await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
      for (const path of ["/en/work", "/en/work/changan-europe-launch-2025", "/zh/work/wang-linkai-london-concert", "/en/work/beauty-fashion-brand-content"]) {
        await page.goto(path);
        const health = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          broken: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).length,
          missingAlt: [...document.images].filter((image) => !image.hasAttribute("alt")).length
        }));
        expect(health, `${path} at ${width}`).toEqual({ overflow: 0, broken: 0, missingAlt: 0 });
      }
    }
  });
});
