import { mkdirSync } from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";

const widths = [320, 375, 390, 430, 768, 1024, 1440, 1920];
const coreSlugs = [
  "byd-bd11-london",
  "geely-london-brand-launch",
  "changan-europe-launch-2025",
  "catl-open-day-2025",
  "leapmotor-iaa-2023",
  "agibot-london-launch"
];
const output = path.join(process.cwd(), "audit", "case-narrative", "visual-qa");

async function expectHealthyLayout(page: import("@playwright/test").Page, label: string) {
  await expect(page.locator("h1")).toBeVisible();
  const health = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).length,
    tinyText: [...document.querySelectorAll("main p, main li, main dt, main dd")]
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      })
      .filter((element) => Number.parseFloat(getComputedStyle(element).fontSize) < 10).length
  }));
  expect(health, label).toEqual({ overflow: 0, brokenImages: 0, tinyText: 0 });
}

test("commercial hierarchy and long case copy hold at all required widths", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile");
  mkdirSync(output, { recursive: true });
  for (const width of widths) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
    for (const locale of ["en", "zh"] as const) {
      await page.goto(`/${locale}/work`);
      await expectHealthyLayout(page, `${locale} work ${width}`);
      await expect(page.locator('[data-work-tier="1"] [data-case-row]')).toHaveCount(6);
      await page.goto(`/${locale}/work/byd-bd11-london`);
      await expectHealthyLayout(page, `${locale} BYD ${width}`);
      await expect(page.locator('[data-case-section="claim-boundary"]')).toBeVisible();
    }
  }
  for (const width of [320, 1920]) {
    await page.setViewportSize({ width, height: width === 320 ? 844 : 1000 });
    for (const slug of coreSlugs) {
      await page.goto(`/en/work/${slug}`);
      await expectHealthyLayout(page, `${slug} ${width}`);
    }
  }
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    await page.goto("/en/work");
    await page.screenshot({ path: path.join(output, `work-en-${width}.png`), fullPage: true });
    await page.goto("/en/work/changan-europe-launch-2025");
    await page.screenshot({ path: path.join(output, `changan-en-${width}.png`), fullPage: true });
  }
});
