import { expect, test } from "@playwright/test";

test.describe("current motion correction", () => {
  test("homepage hero remains stable after client motion mounts", async ({ page }) => {
    await page.goto("/en");
    const hero = page.locator('[data-phase5-section="hero"]');
    const before = await hero.boundingBox();
    await expect(page.locator("h1")).toBeVisible();
    await page.waitForTimeout(500);
    const after = await hero.boundingBox();
    expect(Math.abs((before?.height ?? 0) - (after?.height ?? 0))).toBeLessThanOrEqual(1);
  });

  test("case preview follows hover and keyboard focus from a fixed region", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === "mobile");
    await page.goto("/en/work");
    const preview = page.locator('[data-work-tier="1"] [data-case-preview]');
    await page.locator('[data-case-row="changan-europe-launch-2025"]').hover();
    await expect(preview).toContainText("documented the Munich exhibition setting");
    const catl = page.locator('[data-case-row="catl-open-day-2025"] button');
    await catl.focus();
    await expect(catl).toBeFocused();
    await expect(preview).toContainText("technical screens and the professional audience setting");
  });

  test("reduced motion skips the opening overlay", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/en");
    await expect(page.locator("[data-opening-overlay]")).toHaveCount(0);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("mobile archive has rows without a hover preview", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/en/work");
    await expect(page.locator("[data-mobile-case-row]")).toHaveCount(12);
    await expect(page.locator("[data-case-preview]")).toHaveCount(3);
    for (const preview of await page.locator("[data-case-preview]").all()) await expect(preview).toBeHidden();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(
      1
    );
  });
});
