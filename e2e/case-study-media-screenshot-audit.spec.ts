import { mkdirSync } from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";

const slugs = [
  "wang-linkai-london-concert",
  "geely-london-brand-launch",
  "changan-europe-launch-2025",
  "catl-open-day-2025",
  "yue-yunpeng-london-live",
  "london-fashion-week-2025",
  "leapmotor-iaa-2023",
  "byd-bd11-london",
  "agibot-london-launch",
  "london-automotive-brand-film",
  "beauty-fashion-brand-content",
  "european-road-lifestyle"
];
const output = path.join(process.cwd(), "audit", "case-study-media-presentation", "screenshots");

test("capture index preview art direction at required widths", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile");
  mkdirSync(output, { recursive: true });
  await page.addInitScript(() => sessionStorage.setItem("vbm-opening-seen", "1"));
  for (const width of [1440, 1024, 768, 390]) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
    await page.goto("/en/work");
    await expect(
      page.locator(width < 1024 ? "[data-mobile-case-row]" : "[data-case-row]").first()
    ).toBeVisible();
    await page.screenshot({ path: path.join(output, `index-${width}.png`), fullPage: false });
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/en/work");
  for (const slug of [
    "wang-linkai-london-concert",
    "geely-london-brand-launch",
    "changan-europe-launch-2025",
    "catl-open-day-2025",
    "london-fashion-week-2025",
    "agibot-london-launch"
  ]) {
    await page.locator(`[data-case-row="${slug}"]`).hover();
    await page.waitForTimeout(420);
    await page.locator("[data-case-preview]").screenshot({ path: path.join(output, `preview-${slug}.png`) });
  }
});

test("capture every active project hero and media sequence on desktop and mobile", async ({
  page
}, testInfo) => {
  test.skip(testInfo.project.name === "mobile");
  mkdirSync(output, { recursive: true });
  await page.addInitScript(() => sessionStorage.setItem("vbm-opening-seen", "1"));
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    for (const slug of slugs) {
      await page.goto(`/en/work/${slug}`);
      await page
        .locator('[data-case-section="hero"]')
        .screenshot({ path: path.join(output, `${slug}-${width}-hero.png`) });
      const media = page.locator("[data-media-narrative-role]");
      await expect(media.first()).toBeVisible();
      await media.first().screenshot({ path: path.join(output, `${slug}-${width}-first.png`) });
      await media.last().scrollIntoViewIfNeeded();
      await media.last().screenshot({ path: path.join(output, `${slug}-${width}-last.png`) });
    }
  }
});
