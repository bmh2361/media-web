import { expect, test } from "@playwright/test";

test.describe("canonical information architecture", () => {
  test("desktop navigation is flat and audience-led", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === "mobile");
    await page.goto("/en");
    const header = page.locator("header");
    for (const label of [
      "Home",
      "For Companies",
      "For Partners",
      "Case Studies",
      "How We Work",
      "About Us",
      "Contact"
    ])
      await expect(header.getByRole("link", { name: label, exact: true })).toBeVisible();
    await expect(header).not.toContainText(/What We Do|Expertise|Services/);
  });

  test("mobile menu exposes the same canonical hierarchy", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/en");
    await page.getByRole("button", { name: "Menu" }).click();
    const dialog = page.getByRole("dialog", { name: "Menu" });
    for (const label of [
      "For Companies",
      "For Partners",
      "Case Studies",
      "How We Work",
      "About Us",
      "Contact"
    ])
      await expect(dialog.getByRole("link", { name: label, exact: true })).toBeVisible();
  });

  test("legacy capability and industry URLs resolve to Companies", async ({ request }) => {
    const redirects = new Map([
      ["/en/capabilities", "/en/companies"],
      ["/en/services", "/en/capabilities"],
      ["/en/industries", "/en/capabilities"],
      ["/en/expertise", "/en/capabilities"],
      ["/en/talent", "/en/capabilities"]
    ]);
    for (const [route, destination] of redirects) {
      const response = await request.get(route, { maxRedirects: 0 });
      expect(response.status(), route).toBe(308);
      expect(response.headers().location, route).toContain(destination);
    }
  });

  test("Work filtering is URL-initialised and fail-closed", async ({ page }) => {
    await page.goto("/en/work?category=brand-evidence");
    await expect(page.locator('[data-case-filter="brand-evidence"]')).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("[data-case-row]")).toHaveCount(4);
    await page.goto("/en/work?category=institutional-talent");
    await expect(page.locator("[data-case-row]")).toHaveCount(2);
  });
});
