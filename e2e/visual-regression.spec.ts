import { expect, test } from "@playwright/test";

for (const locale of ["en", "zh"] as const) {
  test(`${locale} canonical homepage produces a complete reduced-motion capture`, async ({
    page
  }, testInfo) => {
    test.skip(testInfo.project.name === "mobile");
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`/${locale}`);
    await expect(page.locator("h1")).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name:
          locale === "zh"
            ? "在真实英国与欧洲市场现场完成工作。"
            : "Serious market activity, delivered on the ground."
      })
    ).toBeVisible();
    const capture = await page.screenshot({ fullPage: true, animations: "disabled" });
    expect(capture.byteLength).toBeGreaterThan(100_000);
  });
}
