import { expect, test } from "@playwright/test";

const viewports = [390, 430, 768, 1024, 1440, 1920];
const copy = {
  en: {
    headline: "Move your UK and European market plans forward on the ground.",
    company: "For Companies",
    partner: "For Partners"
  },
  zh: {
    headline: "让你的英国与欧洲市场行动，在本地真正向前推进。",
    company: "面向企业",
    partner: "面向合作方"
  }
} as const;

test.describe("approved Venus Bridge brand assets", () => {
  for (const locale of ["en", "zh"] as const) {
    for (const width of viewports) {
      test(`${locale} homepage at ${width}px`, async ({ page }, testInfo) => {
        test.skip(testInfo.project.name === "mobile");
        await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.goto(`/${locale}`);
        await expect(page.locator("h1")).toHaveText(copy[locale].headline);
        await expect(page.getByRole("link", { name: copy[locale].company }).first()).toBeVisible();
        await expect(page.getByRole("link", { name: copy[locale].partner }).first()).toBeVisible();
        const headerLogo = page.locator("header [data-brand-logo] img").filter({ visible: true }).first();
        await expect(headerLogo).toHaveJSProperty("complete", true);
        await expect(headerLogo).toHaveAttribute(
          "src",
          width < 1280 ? /venus-bridge-monogram-white/ : /venus-bridge-horizontal-lockup-white/
        );
        await expect(page.locator("footer [data-brand-logo] img")).toHaveAttribute(
          "src",
          /venus-bridge-horizontal-lockup-white/
        );
        await expect(page.locator("body")).not.toContainText(/FrameBridge|FRAMEBRIDGE/);
        expect(
          await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)
        ).toBeLessThanOrEqual(1);
      });
    }
  }

  test("320px mobile header and menu remain operable", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === "mobile");
    await page.setViewportSize({ width: 320, height: 780 });
    await page.goto("/en");
    await page.getByRole("button", { name: "Menu" }).click();
    await expect(page.getByRole("dialog", { name: "Menu" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog", { name: "Menu" })).toBeHidden();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(
      1
    );
  });
});
