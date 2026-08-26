import { expect, test } from "@playwright/test";

test.describe("About Us geographic story", () => {
  test("China origins converge on London before the quieter London to Europe network", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/en/about");
    const globe = page.locator('[data-connection-globe="cobe-hybrid"]');
    await expect(globe).toBeVisible();
    await expect(globe).toContainText("China-side context. UK & European project reach.");
    for (const city of ["Beijing", "Shanghai", "Shenzhen", "Guangzhou", "Hangzhou"])
      await expect(globe.getByText(city, { exact: false }).first()).toBeVisible();
    for (const city of ["Paris", "Berlin", "Brussels", "Rome", "Madrid", "Amsterdam", "Vienna"])
      await expect(globe.getByText(city, { exact: false }).first()).toBeVisible();

    await globe.scrollIntoViewIfNeeded();
    const visual = globe.locator("[data-connection-visual]");
    await expect(visual).toHaveAttribute("data-globe-stage", /origin|primary|europe|settled/);
    await expect(visual).toHaveAttribute("data-globe-stage", "settled", { timeout: 6500 });
    await expect(globe.locator('[data-connection-route="primary"]')).toHaveCount(5);
    await expect(globe.locator('[data-connection-route="secondary"]')).toHaveCount(7);

    const primaryWidth = Number(
      await globe.locator('[data-connection-route="primary"]').first().getAttribute("stroke-width")
    );
    const secondaryWidth = Number(
      await globe.locator('[data-connection-route="secondary"]').first().getAttribute("stroke-width")
    );
    expect(primaryWidth).toBeGreaterThan(secondaryWidth);

    const ratio = await globe.locator("[data-cobe-canvas]").evaluate((canvas) => {
      const element = canvas as HTMLCanvasElement;
      return element.width / element.getBoundingClientRect().width;
    });
    expect(ratio).toBeLessThanOrEqual((await page.viewportSize())!.width < 768 ? 1.26 : 1.61);
  });

  test("the finite sequence pauses outside the viewport and resumes on return", async ({
    page
  }, testInfo) => {
    test.skip(testInfo.project.name === "mobile");
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/en/about");
    const visual = page.locator("[data-connection-visual]");
    await visual.scrollIntoViewIfNeeded();
    await expect(visual).toHaveAttribute("data-globe-stage", /origin|primary/, { timeout: 1800 });
    await page.locator('[data-about-chapter="identity"]').scrollIntoViewIfNeeded();
    await expect(visual).toHaveAttribute("data-globe-paused", "true");
    const pausedStage = await visual.getAttribute("data-globe-stage");
    const primaryRoute = page.locator('[data-connection-route="primary"]').first();
    const pausedOffset = await primaryRoute.evaluate((route) => getComputedStyle(route).strokeDashoffset);
    await page.waitForTimeout(700);
    expect(await visual.getAttribute("data-globe-stage")).toBe(pausedStage);
    expect(await primaryRoute.evaluate((route) => getComputedStyle(route).strokeDashoffset)).toBe(
      pausedOffset
    );
    await visual.scrollIntoViewIfNeeded();
    await expect(visual).toHaveAttribute("data-globe-stage", "settled", { timeout: 6500 });
  });

  test("WebGL failure leaves the complete SVG and semantic story in place", async ({ page }) => {
    await page.addInitScript(() => {
      const original = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (
        this: HTMLCanvasElement,
        type: string,
        ...args: unknown[]
      ) {
        if (type === "webgl" || type === "webgl2" || type === "experimental-webgl") return null;
        return original.call(this, type as never, ...(args as never[]));
      } as typeof HTMLCanvasElement.prototype.getContext;
    });
    await page.goto("/en/about");
    const globe = page.locator('[data-connection-globe="cobe-hybrid"]');
    await globe.scrollIntoViewIfNeeded();
    await expect(globe.locator("[data-globe-fallback]")).toBeVisible();
    await expect(globe.locator("[data-cobe-layer]")).toHaveAttribute("data-enhanced", "false");
    await expect(globe.locator('[data-connection-route="primary"]')).toHaveCount(5);
    await expect(globe.locator('[data-connection-route="secondary"]')).toHaveCount(7);
  });
});

test("reduced motion shows the completed network without traversal", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en/about");
  const visual = page.locator("[data-connection-visual]");
  await visual.scrollIntoViewIfNeeded();
  await expect(visual).toHaveAttribute("data-reduced-motion", "true");
  await expect(visual).toHaveAttribute("data-globe-stage", "settled");
  await expect(visual).toHaveAttribute("data-globe-paused", "false");
});
