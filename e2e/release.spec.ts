import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = [
  "/en",
  "/zh",
  "/en/services/commercial-production",
  "/en/talent",
  "/en/services/research-innovation",
  "/en/services/events-exhibitions",
  "/en/for-agencies",
  "/en/industries",
  "/en/work",
  "/en/work/london-celebrity-event-coverage",
  "/en/about",
  "/en/contact"
];

test("representative routes render one main landmark without horizontal overflow", async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveCount(1);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)
    ).toBeTruthy();
  }
});

test("invalid locale and case slug return not found", async ({ page }) => {
  expect((await page.goto("/fr/work"))?.status()).toBe(404);
  expect((await page.goto("/en/work/not-a-case"))?.status()).toBe(404);
});

test("language switch preserves contact query and concept terminology", async ({ page }) => {
  await page.goto("/zh/contact?project=video");
  await page.locator("footer a[href*='/en/contact']").click();
  await expect(page).toHaveURL(/\/en\/contact\?project=video$/);
  await page.goto("/en/work");
  await expect(page.getByRole("heading", { name: "Concept Project Models" })).toBeVisible();
});

test("contact validation never creates a fake success", async ({ page }) => {
  await page.goto("/en/contact");
  await page.getByRole("button", { name: /continue|next/i }).click();
  await expect(page.locator("#name")).toBeFocused();
  await expect(page.getByText(/review the form errors/i)).toBeVisible();
});

test("representative routes have no serious automated axe findings", async ({ page }) => {
  for (const route of [
    "/en",
    "/en/services/commercial-production",
    "/en/talent",
    "/en/services/research-innovation",
    "/en/services/events-exhibitions",
    "/en/work",
    "/en/contact"
  ]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page: page as never }).analyze();
    const serious = results.violations.filter((violation) =>
      ["serious", "critical"].includes(violation.impact ?? "")
    );
    expect(
      serious.map((violation) => ({
        id: violation.id,
        nodes: violation.nodes.map((node) => ({ target: node.target, summary: node.failureSummary }))
      })),
      `Axe findings for ${route}`
    ).toEqual([]);
  }
});
