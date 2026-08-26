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
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth), `${route} ${width}`).toBeLessThanOrEqual(1);
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

test("contact validation never creates a fake success and exposes no public pricing", async ({ page }) => {
  await page.goto("/en/contact?intent=company");
  const nextToContext = page.getByRole("button", { name: "Next: project context" });
  if (await nextToContext.isVisible()) {
    await nextToContext.click();
    await expect(page.getByLabel("What are you trying to achieve in the UK or Europe?")).toBeVisible();
    await page.getByLabel("Current situation").selectOption("exploring");
    await page.getByLabel("What are you trying to achieve in the UK or Europe?").fill("Validate the market opportunity.");
    await page.getByRole("button", { name: "Next: contact details" }).click();
  } else {
    await expect(page.getByLabel("What are you trying to achieve in the UK or Europe?")).toBeVisible();
  }
  await expect(page.getByLabel("Name")).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await expect(page.getByLabel("Name")).toBeFocused();
  await expect(page.locator("body")).not.toContainText(/GBP|budget range|starting from|package price|Received\./i);
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
  for (const route of ["/en", "/en/work", "/en/work/byd-bd11-london", "/en/how-we-work", "/en/about", "/en/contact"]) {
    await page.goto(route);
    if (route === "/en/contact") await page.locator("form").scrollIntoViewIfNeeded();
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
