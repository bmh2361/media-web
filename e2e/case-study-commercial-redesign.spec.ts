import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const representativeCases = [
  "byd-bd11-london",
  "catl-open-day-2025",
  "wang-linkai-london-concert",
  "beauty-fashion-brand-content"
];

test("case index is stable at every required viewport", async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  for (const width of [1440, 1280, 1024, 768, 430, 390, 375]) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
    await page.goto("/en/work");
    await expect(page.locator("[data-case-row]")).toHaveCount(12);
    const health = await page.evaluate(() => ({ overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, broken: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).length }));
    expect(health, `index at ${width}`).toEqual({ overflow: 0, broken: 0 });
  }
  expect(consoleErrors).toEqual([]);
});

test("four case archetypes remain evidence-led, accessible and reduced-motion safe", async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    for (const slug of representativeCases) {
      await page.goto(`/en/work/${slug}`);
      await expect(page.locator("[data-evidence-level=confirmed]")).toBeVisible();
      await expect(page.locator("[data-case-section=responsibility]")).toBeVisible();
      await expect(page.locator("[data-case-section=outputs]")).toBeVisible();
      await expect(page.locator("[data-editorial-media-blocks]").first()).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/en/work/byd-bd11-london");
  const accessibility = await new AxeBuilder({ page: page as never }).include("main").analyze();
  expect(accessibility.violations).toEqual([]);
  expect(await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches)).toBe(true);
  expect(consoleErrors).toEqual([]);
});
