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
    await expect(visual).toHaveAttribute("data-main-propagation-ms", "2600");
    await expect(visual).toHaveAttribute("data-globe-stage", "settled", { timeout: 8500 });
    await page.waitForTimeout(1200);
    await expect(visual).toHaveAttribute("data-globe-stage", "settled");
    await expect(globe.locator("[data-globe-halo]")).toHaveCount(2);
    await expect(globe.locator("[data-cobe-layer]")).toHaveAttribute("data-enhanced", "true");
    await expect(globe.locator("[data-globe-fallback]")).toHaveCSS("opacity", "0");
    await expect(globe.locator("[data-connection-residual-route]")).toHaveCount(0);
    await expect(globe.locator("[data-residual-particle]")).toHaveCount(5);
    await expect(globe.locator("[data-residual-particle] animateMotion")).toHaveCount(5);
    await expect(globe.locator("[data-residual-particle-core]")).toHaveCount(5);
    const particle = globe.locator("[data-residual-particle]").first();
    const particleStart = await particle.evaluate(
      (element) => (element as SVGGraphicsElement).getCTM()?.e ?? 0
    );
    await page.waitForTimeout(500);
    const particleEnd = await particle.evaluate(
      (element) => (element as SVGGraphicsElement).getCTM()?.e ?? 0
    );
    expect(Math.abs(particleEnd - particleStart)).toBeGreaterThan(1);
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

  test("editorial rows and city labels take priority over the narrative loop", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === "mobile");
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/en/about");
    const visual = page.locator("[data-connection-visual]");
    await visual.scrollIntoViewIfNeeded();

    const china = page.locator('[data-globe-trigger="china"]');
    await china.focus();
    await expect(china).toHaveAttribute("data-active", "true");
    await expect(visual).toHaveAttribute("data-globe-emphasis", "china");
    await expect(visual).toHaveAttribute("data-globe-narrative", "suppressed");
    await expect(page.locator('[data-connection-node="beijing"]')).toHaveAttribute(
      "data-node-highlighted",
      "true"
    );

    const europe = page.locator('[data-globe-trigger="europe"]');
    await europe.focus();
    await expect(visual).toHaveAttribute("data-globe-emphasis", "europe");
    await expect(page.locator('[data-connection-node="paris"]')).toHaveAttribute(
      "data-node-highlighted",
      "true"
    );

    await page.getByRole("link", { name: "Venus Bridge home" }).focus();
    await expect(visual).toHaveAttribute("data-globe-emphasis", "ambient");
    await expect(visual).toHaveAttribute("data-globe-narrative", "active");

    const beijingLabel = page.locator('[data-connection-label="beijing"]');
    await beijingLabel.hover();
    await expect(visual).toHaveAttribute("data-globe-emphasis", "beijing");
    await expect(
      page.locator('[data-connection-base-route="primary"][data-route-highlighted="true"]')
    ).toHaveCount(1);
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
    await expect(visual).toHaveAttribute("data-globe-stage", "settled", { timeout: 8500 });
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
  await page.locator('[data-globe-trigger="china"]').focus();
  await expect(visual).toHaveAttribute("data-globe-emphasis", "china");
  await expect(visual).toHaveAttribute("data-globe-narrative", "suppressed");
  await expect(page.locator('[data-connection-route="primary"]').first()).toHaveCSS("animation-name", "none");
  await expect(page.locator("[data-residual-particle-layer]")).toHaveCSS("visibility", "hidden");
  await expect(page.locator("[data-residual-particle-layer]")).toHaveCSS("opacity", "0");
});
