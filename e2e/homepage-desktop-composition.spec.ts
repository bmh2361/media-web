import { expect, test } from "@playwright/test";

test("desktop homepage composition remains intentional across large breakpoints", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile");
  const consoleIssues: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error" || message.type() === "warning") consoleIssues.push(message.text());
  });
  page.on("pageerror", (error) => consoleIssues.push(error.message));

  for (const viewport of [
    { width: 1280, height: 900 },
    { width: 1366, height: 768 },
    { width: 1440, height: 900 },
    { width: 1600, height: 900 },
    { width: 1728, height: 1000 }
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/en");

    const context = page.locator("[data-home-journey-context]");
    const cards = page.locator("[data-home-journey-card]");
    const cta = page.getByRole("link", { name: "See How We Help Companies" }).first();
    await expect(context).toBeVisible();
    await expect(cards).toHaveCount(5);

    const geometry = await page.evaluate(() => {
      const sections = [...document.querySelectorAll("main > section")];
      const journey = sections[2]!;
      const bodyTops = [...journey.querySelectorAll("[data-home-journey-card] p")].map((body) =>
        Math.round(body.getBoundingClientRect().top)
      );
      return {
        overflow: document.documentElement.scrollWidth - innerWidth,
        journeyHeight: Math.round(journey.getBoundingClientRect().height),
        journeyHeadingWidth: Math.round(journey.querySelector("h2")!.getBoundingClientRect().width),
        modelHeadingX: Math.round(sections[3]!.querySelector("h2")!.getBoundingClientRect().left),
        workHeadingX: Math.round(sections[6]!.querySelector("h2")!.getBoundingClientRect().left),
        bodyTopSpread: Math.max(...bodyTops) - Math.min(...bodyTops)
      };
    });
    const ctaBox = await cta.boundingBox();

    expect(geometry.overflow).toBeLessThanOrEqual(1);
    expect(geometry.journeyHeight).toBeLessThan(900);
    expect(geometry.journeyHeadingWidth).toBeGreaterThan(400);
    expect(geometry.modelHeadingX).toBeLessThan(viewport.width * 0.1);
    expect(geometry.workHeadingX).toBeLessThan(viewport.width * 0.1);
    expect(geometry.bodyTopSpread).toBeLessThanOrEqual(1);
    expect(ctaBox?.width ?? 0).toBeGreaterThan(viewport.width * 0.8);
  }

  expect(consoleIssues).toEqual([]);
});

test("mobile and tablet retain the approved homepage composition", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "desktop");

  for (const viewport of [
    { width: 390, height: 844 },
    { width: 430, height: 932 },
    { width: 768, height: 1024 }
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/en");

    await expect(page.locator("[data-home-journey-context]")).toBeHidden();
    const geometry = await page.evaluate(() => {
      const sections = [...document.querySelectorAll("main > section")];
      return {
        overflow: document.documentElement.scrollWidth - innerWidth,
        modelHeadingX: Math.round(sections[3]!.querySelector("h2")!.getBoundingClientRect().left),
        workHeadingX: Math.round(sections[6]!.querySelector("h2")!.getBoundingClientRect().left)
      };
    });

    expect(geometry.overflow).toBeLessThanOrEqual(1);
    expect(geometry.modelHeadingX).toBeLessThan(80);
    expect(geometry.workHeadingX).toBeLessThan(80);
  }
});
