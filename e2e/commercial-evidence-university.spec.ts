import { expect, test } from "@playwright/test";

const viewports = [
  { width: 1440, height: 1000 },
  { width: 1280, height: 900 },
  { width: 1024, height: 900 },
  { width: 768, height: 900 },
  { width: 430, height: 900 },
  { width: 375, height: 812 }
];

const detailSlugs = ["byd-bd11-london", "london-automotive-brand-film"];

test.describe("scalable commercial case evidence", () => {
  for (const locale of ["en", "zh"] as const) {
    test(`${locale} archive filters, hover, focus and publication boundary`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name === "mobile");
      await page.setViewportSize(viewports[0]);
      await page.goto(`/${locale}/work`);
      const rows = page.locator("[data-case-row]");
      await expect(rows).toHaveCount(12);
      await expect(page.locator("[data-case-preview]")).toBeVisible();
      await rows.nth(1).hover();
      await expect(page.locator("[data-case-preview]")).toContainText(
        locale === "zh" ? "记录慕尼黑发布现场" : "documented the Munich launch setting"
      );
      await rows.first().focus();
      await expect(rows.first()).toBeFocused();

      await page.locator('[data-case-filter="market-presence"]').click();
      await expect(rows).toHaveCount(3);
      await expect(rows.first()).toHaveAttribute("href", `/${locale}/work/byd-bd11-london`);

      await page.locator('[data-case-filter="institutional-talent"]').click();
      await expect(rows).toHaveCount(2);
      await expect(page.locator("body")).not.toContainText("Cambridge Student-Community Cultural Programme");

      await page.setViewportSize(viewports.at(-1)!);
      await page.goto(`/${locale}/work`);
      await expect(page.locator("[data-case-preview]")).toBeHidden();
    });

    test(`${locale} home, archive and two details remain responsive at six breakpoints`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name === "mobile");
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      for (const viewport of viewports) {
        await page.setViewportSize(viewport);
        for (const path of ["", "/work", ...detailSlugs.map((slug) => `/work/${slug}`)]) {
          await page.goto(`/${locale}${path}`);
          await expect(page.locator("main, [data-phase5-section='hero'], [data-work-hero], [data-case-section='hero']").first()).toBeVisible();
          const overflow = await page.evaluate(
            () => document.documentElement.scrollWidth - document.documentElement.clientWidth
          );
          expect(overflow, `${locale}${path || "/"} at ${viewport.width}px`).toBeLessThanOrEqual(1);
        }
      }
      expect(errors).toEqual([]);
    });

    test(`${locale} detail has eight-part commercial narrative and related links`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name === "mobile");
      await page.goto(`/${locale}/work/byd-bd11-london`);
      for (const section of [
        "hero",
        "objective",
        "challenge",
        "responsibility",
        "structure",
        "visual-evidence",
        "outputs",
        "related"
      ])
        await expect(page.locator(`[data-case-section="${section}"]`)).toBeVisible();
      await expect(page.locator('[data-case-section="related"] a[href*="/work/"]')).toHaveCount(1);
      await expect(page.locator("h1")).toContainText(
        locale === "zh" ? "BYD BD11 双层公交车伦敦发布" : "BYD BD11 Double-Decker Bus Launch"
      );
    });
  }
});
