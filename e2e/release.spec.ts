import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  "/en",
  "/zh",
  "/en/companies",
  "/en/partners",
  "/en/work",
  "/zh/work",
  "/en/work/byd-bd11-london",
  "/en/how-we-work",
  "/en/about",
  "/en/contact"
];

test("canonical release routes render one main landmark without overflow", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile");
  for (const width of [375, 430, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator("main")).toHaveCount(1);
      await expect(page.locator("h1")).toHaveCount(1);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth - innerWidth),
        `${route} ${width}`
      ).toBeLessThanOrEqual(1);
    }
  }
});

test("invalid locale and unknown case return not found", async ({ page }) => {
  expect((await page.goto("/fr/work"))?.status()).toBe(404);
  expect((await page.goto("/en/work/not-a-case"))?.status()).toBe(404);
});

test("language switch preserves the contact query", async ({ page }) => {
  await page.goto("/zh/contact?intent=company");
  await page.locator("footer a[href*='/en/contact']").click();
  await expect(page).toHaveURL(/\/en\/contact\?intent=company$/);
});

test("static contact exposes direct channels without a fake submission path or public pricing", async ({
  page
}) => {
  await page.goto("/en/contact?intent=company");
  const contact = page.locator('[data-contact-delivery="direct-only"]');
  await expect(contact).toContainText("Venusbridge");
  await expect(contact.getByRole("link", { name: "venusbridge.co.uk@gmail.com" })).toHaveAttribute(
    "href",
    "mailto:venusbridge.co.uk@gmail.com"
  );
  await expect(page.locator("form")).toHaveCount(0);
  await expect(page.getByRole("button", { name: /Send enquiry|Submit/i })).toHaveCount(0);
  await expect(page.locator("body")).not.toContainText(
    /GBP|budget range|starting from|package price|Received\./i
  );
});

test("mobile navigation closes with Escape and restores focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en");
  const menu = page.getByRole("button", { name: "Menu" });
  await menu.click();
  await expect(page.getByRole("dialog", { name: "Menu" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Menu" })).toBeHidden();
  await expect(menu).toBeFocused();
});

test("canonical commercial pages have no serious automated accessibility findings", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of [
    "/en",
    "/en/work",
    "/en/work/byd-bd11-london",
    "/en/how-we-work",
    "/en/about",
    "/en/contact"
  ]) {
    await page.goto(route);
    if (route === "/en/contact")
      await page.locator('[data-contact-delivery="direct-only"]').scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);
    const results = await new AxeBuilder({ page: page as never }).analyze();
    const serious = results.violations.filter((item) => ["serious", "critical"].includes(item.impact ?? ""));
    expect(
      serious.map((item) => ({ id: item.id, targets: item.nodes.map((node) => node.target) })),
      route
    ).toEqual([]);
  }
});

test("route changes expose the bilingual polite page announcement", async ({ page }) => {
  await page.goto("/en");
  await expect(page.getByRole("status")).toContainText("Page loaded");
  await page.goto("/zh/work");
  await expect(page.getByRole("status")).toContainText("页面已载入");
});
