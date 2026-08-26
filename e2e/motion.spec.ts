import { expect, test } from "@playwright/test";

test.describe("motion direction", () => {
  test("first visit resolves and leaves both audience journeys operable", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.getByRole("link", { name: "For Companies" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "For Partners" }).first()).toBeVisible();
  });

  test("case index remains keyboard operable", async ({ page }) => {
    await page.goto("/en/work");
    const row = page
      .locator((await page.viewportSize())!.width < 1024 ? "[data-mobile-case-row]" : "[data-case-row]")
      .nth(1);
    await row.focus();
    await expect(row).toBeFocused();
    await expect(row).toHaveAttribute("href", /\/en\/work\//);
  });

  test("reduced motion removes first-visit overlay", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/zh");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("[data-opening-overlay]")).toHaveCount(0);
  });
});
