import { expect, test } from "@playwright/test";

test("Work hierarchy remains stable across refresh and browser Back", async ({ page }) => {
  await page.goto("/en/work");
  await expect(page.locator("[data-work-tier]")).toHaveCount(3);
  await page.goto("/en/work/byd-bd11-london");
  await page.goBack();
  await expect(page).toHaveURL(/\/en\/work$/);
  await expect(page.locator('[data-work-tier="1"] [data-case-row]')).toHaveCount(6);
  await page.reload();
  await expect(page.locator('[data-work-tier="2"] [data-case-row]')).toHaveCount(1);
  await expect(page.locator('[data-work-tier="3"] [data-case-row]')).toHaveCount(5);
});

test("legacy Work category query cannot hide the canonical hierarchy", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 760 });
  await page.goto("/en/work?category=unknown");
  await expect(page.locator("[data-case-row]")).toHaveCount(12);
  await expect(page.locator("[data-case-filters]")).toHaveCount(0);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth
  );
  expect(overflow).toBeFalsy();
});
