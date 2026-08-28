import { expect, test } from "@playwright/test";

const keyRoutes = [
  "/en",
  "/zh",
  "/en/companies",
  "/zh/companies",
  "/en/partners",
  "/zh/partners",
  "/en/work",
  "/zh/work",
  "/en/how-we-work",
  "/zh/how-we-work",
  "/en/about",
  "/zh/about",
  "/en/contact",
  "/zh/contact"
];

test("public routes expose intentional bilingual metadata and language alternates", async ({ page }) => {
  for (const route of keyRoutes) {
    await page.goto(route);
    await expect(page).toHaveTitle(/Venus Bridge/);
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(description?.trim().length).toBeGreaterThanOrEqual(30);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      new RegExp(`${route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`)
    );
    await expect(page.locator('link[rel="alternate"][hreflang="en-GB"]')).toHaveCount(1);
    await expect(page.locator('link[rel="alternate"][hreflang="zh-CN"]')).toHaveCount(1);
    await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /\/og\//);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
  }
});

test("robots fails closed before production approval and sitemap is data-driven", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBeTruthy();
  expect(await robots.text()).toContain("Disallow: /");

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  const xml = await sitemap.text();
  expect(xml).toContain("/en/companies");
  expect(xml).toContain("/zh/companies");
  expect(xml).toMatch(/\/en\/work\/[a-z0-9-]+/);
  expect(xml).not.toContain("localhost");
});

test("case details expose truthful CreativeWork and breadcrumb structured data", async ({ page }) => {
  await page.goto("/en/work/byd-bd11-london");
  const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
  const parsed = schemas.map((schema) => JSON.parse(schema));
  expect(parsed.some((schema) => schema["@type"] === "CreativeWork")).toBeTruthy();
  expect(parsed.some((schema) => schema["@type"] === "BreadcrumbList")).toBeTruthy();
});

test("not-found routes provide restrained recovery paths", async ({ page }) => {
  const response = await page.goto("/en/not-a-real-route");
  expect(response?.status()).toBe(404);
  await expect(page).toHaveTitle("Page Not Found | Venus Bridge");
  await expect(page.getByRole("heading", { name: "This page is not available." })).toBeVisible();
  await expect(page.getByRole("link", { name: "Return home" })).toHaveAttribute("href", "/en");
  await expect(page.getByRole("link", { name: "Contact Venus Bridge" })).toHaveAttribute(
    "href",
    "/en/contact"
  );
});

test("commercial measurement emits only allow-listed non-sensitive event context", async ({ page }) => {
  await page.addInitScript(() => {
    window.addEventListener("venus-bridge:measurement", ((event: CustomEvent) => {
      const events = JSON.parse(sessionStorage.getItem("measurement-events") || "[]");
      events.push(event.detail);
      sessionStorage.setItem("measurement-events", JSON.stringify(events));
    }) as EventListener);
  });
  await page.goto("/en");
  await page.getByRole("link", { name: "See How We Help Companies" }).first().click();
  await page.waitForURL("**/en/companies");
  const events = (await page.evaluate(() =>
    JSON.parse(sessionStorage.getItem("measurement-events") || "[]")
  )) as Array<{
    name: string;
    properties: Record<string, unknown>;
  }>;
  expect(events.some((event: { name: string }) => event.name === "companies_cta_click")).toBeTruthy();
  const propertyKeys = events.flatMap((event) => Object.keys(event.properties));
  expect(propertyKeys).not.toEqual(
    expect.arrayContaining(["project_description", "email", "contact_name", "free_text"])
  );
});

test("contact endpoint rejects malformed requests without exposing a stack trace", async ({ request }) => {
  const malformed = await request.post("/api/contact", {
    headers: { "content-type": "application/json", origin: "http://127.0.0.1:3217" },
    data: "{invalid"
  });
  expect([400, 403]).toContain(malformed.status());
  expect(await malformed.text()).not.toMatch(/stack|node_modules|TypeError/i);
});

test("canonical internal links resolve without broken destinations", async ({ page, request }) => {
  const links = new Set<string>();
  for (const route of keyRoutes) {
    await page.goto(route);
    for (const href of await page
      .locator("a[href]")
      .evaluateAll((anchors) => anchors.map((anchor) => anchor.getAttribute("href") || ""))) {
      if (!href.startsWith("/") || href.startsWith("//")) continue;
      const url = new URL(href, "https://internal.invalid");
      links.add(`${url.pathname}${url.search}`);
    }
  }
  for (const href of links) {
    const response = await request.get(href);
    expect(response.status(), href).toBeLessThan(400);
  }
});

test("production pages emit no console, hydration, or resource failures", async ({ page }) => {
  const problems: string[] = [];
  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) problems.push(`${message.type()}: ${message.text()}`);
  });
  page.on("pageerror", (error) => problems.push(`pageerror: ${error.message}`));
  page.on("requestfailed", (request) => {
    if (!request.url().includes("_rsc")) problems.push(`requestfailed: ${request.url()}`);
  });
  for (const route of ["/en", "/zh", "/en/work", "/en/work/byd-bd11-london", "/en/contact"]) {
    await page.goto(route);
    await page.waitForTimeout(150);
  }
  expect(problems).toEqual([]);
});
