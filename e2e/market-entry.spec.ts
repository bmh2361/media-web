import { expect, test } from "@playwright/test";

const widths = [320, 390, 768, 1440, 1920];

test.describe("retired market-entry routes follow the canonical commercial architecture", () => {
  for (const language of ["en", "zh"] as const) {
    for (const width of widths) {
      test(`${language} legacy route at ${width}px`, async ({ page }, testInfo) => {
        test.skip(testInfo.project.name === "mobile");
        await page.setViewportSize({ width, height: width < 700 ? 844 : 1000 });
        await page.goto(`/${language}/services/uk-market-entry`);
        await expect(page).toHaveURL(new RegExp(`/${language}/companies$`));
        await expect(page.locator("h1")).toContainText(
          language === "zh"
            ? "以本地商业执行，进入并拓展英国与欧洲市场。"
            : "Enter and grow in the UK & Europe with local commercial execution."
        );
        expect(
          await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)
        ).toBeLessThanOrEqual(1);
      });
    }
  }

  test("canonical contact keeps the company-project route available", async ({ page }) => {
    await page.goto("/en/contact?intent=company");
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator('input[name="name"]')).toHaveCount(1);
    await expect(page.locator('input[type="file"]')).toHaveCount(0);
  });

  test("unpublished production scenarios are not exposed as Work details", async ({ page }) => {
    await page.goto("/en/work/investor-strategic-partner-roadshow-production");
    await expect(page.locator("body")).not.toContainText("Investor & Strategic Partner Roadshow Production");
    await expect(page.getByText("Production scenario", { exact: true })).toHaveCount(0);
  });
});
