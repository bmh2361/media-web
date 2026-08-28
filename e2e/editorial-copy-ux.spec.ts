import { expect, test } from "@playwright/test";

const widths = [1440, 1280, 1024, 768, 430, 375];
const pages = ["", "/companies", "/partners", "/work", "/about", "/contact"];
const caseSlugs = [
  "catl-open-day-2025",
  "byd-bd11-london",
  "changan-europe-launch-2025",
  "leapmotor-iaa-2023",
  "london-automotive-brand-film",
  "european-road-lifestyle",
  "wang-linkai-london-concert",
  "geely-london-brand-launch",
  "yue-yunpeng-london-live",
  "london-fashion-week-2025",
  "agibot-london-launch",
  "beauty-fashion-brand-content"
];

async function expectEditorialLayout(page: import("@playwright/test").Page) {
  await expect(page.locator("h1")).toBeVisible();
  const audit = await page.evaluate(() => {
    const visible = (element: Element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden";
    };
    const undersized = [...document.querySelectorAll("p, span, a, button, dt, dd, li")]
      .filter(visible)
      .filter((element) => (element.textContent ?? "").trim())
      .filter((element) => Number.parseFloat(getComputedStyle(element).fontSize) < 10)
      .map((element) => (element.textContent ?? "").trim().slice(0, 60));
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).length,
      undersized
    };
  });
  expect(audit.overflow).toBeLessThanOrEqual(1);
  expect(audit.brokenImages).toBe(0);
  expect(audit.undersized).toEqual([]);
}

for (const locale of ["en", "zh"] as const) {
  test(`${locale} editorial layout holds across six required widths`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === "mobile");
    for (const width of widths) {
      await page.setViewportSize({ width, height: width < 768 ? 844 : 900 });
      for (const path of pages) {
        await page.goto(`/${locale}${path}`);
        await expectEditorialLayout(page);
      }
    }
  });

  test(`${locale} all published case studies retain the editorial structure`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === "mobile");
    for (const width of [1440, 375]) {
      await page.setViewportSize({ width, height: width === 375 ? 844 : 900 });
      for (const slug of caseSlugs) {
        await page.goto(`/${locale}/work/${slug}`);
        await expectEditorialLayout(page);
        if (!["beauty-fashion-brand-content", "european-road-lifestyle"].includes(slug))
          await expect(page.locator('[data-case-section="responsibility"]')).toBeVisible();
        await expect(page.locator('[data-case-section="related"]')).toBeVisible();
      }
    }
  });
}

test("case filters and responsive preview keep their interaction contract", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile");
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/en/work");
  await page.getByRole("button", { name: "Brand & Content", exact: true }).click();
  await expect(page.locator("[data-case-row]")).toHaveCount(4);
  await expect(page.locator("[data-case-preview]")).toBeVisible();
  await page.getByRole("button", { name: "Partnerships & Institutions", exact: true }).click();
  await expect(page.locator("[data-case-row]")).toHaveCount(2);

  await page.setViewportSize({ width: 375, height: 844 });
  await page.goto("/en/work");
  await expect(page.locator("[data-case-preview]")).toBeHidden();
});
