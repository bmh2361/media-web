import { expect, test } from "@playwright/test";

test("Work category query survives refresh and browser Back", async ({ page }) => {
  await page.goto("/en/work");
  await page.locator('[data-case-filter="market-presence"]').click();
  await expect(page).toHaveURL(/\?category=market-presence$/);
  await page.reload();
  await expect(page.locator('[data-case-filter="market-presence"]')).toHaveAttribute("aria-pressed", "true");
  await page.locator('[data-case-filter="brand-evidence"]').click();
  await expect(page).toHaveURL(/\?category=brand-evidence$/);
  await page.goBack();
  await expect(page).toHaveURL(/\?category=market-presence$/);
  await expect(page.locator('[data-case-filter="market-presence"]')).toHaveAttribute("aria-pressed", "true");
});

test("unknown Work category fails closed to All without overflow", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 760 });
  await page.goto("/en/work?category=unknown");
  await expect(page.locator('[data-case-filter="all"]')).toHaveAttribute("aria-pressed", "true");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth
  );
  expect(overflow).toBeFalsy();
});
