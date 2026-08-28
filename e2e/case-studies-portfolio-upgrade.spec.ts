import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const newSlugs = [
  "wang-linkai-london-concert",
  "geely-london-brand-launch",
  "yue-yunpeng-london-live",
  "london-fashion-week-2025",
  "agibot-london-launch",
  "beauty-fashion-brand-content"
];

test("new bilingual project pages render every approved image without overflow", async ({ page }) => {
  for (const width of [390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
    for (const language of ["en", "zh"]) {
      for (const slug of newSlugs) {
        await page.goto(`/${language}/work/${slug}`);
        await expect(page.locator("h1")).toBeVisible();
        await expect(page.locator("[data-editorial-media-blocks]")).toBeVisible();
        const health = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          broken: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).length,
          missingAlt: [...document.images].filter((image) => !image.hasAttribute("alt")).length
        }));
        expect(health, `${language}/${slug} at ${width}`).toEqual({ overflow: 0, broken: 0, missingAlt: 0 });
      }
    }
  }
});

test("index taxonomy, preview and retired redirects follow the new contract", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/zh/work");
  await expect(page.locator("[data-case-row]")).toHaveCount(12);
  for (const label of ["全部", "市场进入与发布", "行业与展会", "合作与机构", "品牌与内容"])
    await expect(page.getByRole("button", { name: label, exact: true })).toBeVisible();
  await expect(page.locator("[data-case-preview] img")).toBeVisible();
  const accessibility = await new AxeBuilder({ page: page as never }).include("main").analyze();
  expect(accessibility.violations).toEqual([]);
  for (const slug of ["teal-editorial-series", "commercial-fashion-styling", "creative-beauty-makeup"]) {
    await page.goto(`/en/work/${slug}`);
    await expect(page).toHaveURL(/\/en\/work$/);
  }
});
