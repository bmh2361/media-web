import { expect, test } from "@playwright/test";

for (const route of ["/radar", "/privacy", "/terms"]) {
  test(`${route} is public, readable without JavaScript, and linked`, async ({
    browser,
    request
  }, testInfo) => {
    const context = await browser.newContext({
      javaScriptEnabled: false,
      viewport: testInfo.project.use.viewport
    });
    const page = await context.newPage();
    const response = await page.goto(`${testInfo.project.use.baseURL}${route}`);
    expect(response?.status()).toBe(200);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://www.venusbridge.co.uk${route}`
    );
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    const links = await page
      .locator('a[href^="/"]')
      .evaluateAll((nodes) => [...new Set(nodes.map((node) => node.getAttribute("href")!))]);
    for (const href of links) expect((await request.get(href)).status()).toBe(200);
    await page.screenshot({
      path: `/tmp/venus08-${testInfo.project.name}-${route.slice(1)}.png`,
      fullPage: true
    });
    await context.close();
  });
}
