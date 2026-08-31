import { expect, test } from "@playwright/test";

const routes = ["/en", "/en/companies", "/en/partners", "/en/how-we-work", "/en/about"];
const desktopWidths = [1280, 1366, 1440, 1600, 1728];

test("desktop editorial headings stay controlled across the public journeys", async ({ page }) => {
  for (const width of desktopWidths) {
    await page.setViewportSize({ width, height: 900 });

    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator("main")).toBeVisible();

      const audit = await page.locator("main").evaluate((main) => {
        const visibleSectionHeadings = Array.from(main.querySelectorAll<HTMLElement>("h2")).filter(
          (heading) => {
            const rect = heading.getBoundingClientRect();
            const size = Number.parseFloat(getComputedStyle(heading).fontSize);
            return rect.width > 0 && size >= 32 && !heading.closest("[data-connection-globe]");
          }
        );

        return {
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          headings: visibleSectionHeadings.map((heading) => {
            const style = getComputedStyle(heading);
            return {
              lines: Math.round(heading.getBoundingClientRect().height / Number.parseFloat(style.lineHeight)),
              text: heading.textContent?.trim() ?? ""
            };
          })
        };
      });

      expect(audit.overflow, `${route} at ${width}px should not overflow horizontally`).toBeLessThanOrEqual(
        1
      );
      const headlineTowers = audit.headings.filter((heading) => heading.lines > 4);
      expect(headlineTowers, `${route} at ${width}px should not contain a desktop headline tower`).toEqual(
        []
      );
    }
  }
});

test("homepage editorial statements return to the left spine", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/en");

  for (const text of [
    "Four types of local action built around market outcomes.",
    "Make the market moment useful before, during and after it happens."
  ]) {
    const x = await page
      .getByRole("heading", { name: text })
      .evaluate((heading) => heading.getBoundingClientRect().x);
    expect(x).toBeLessThan(144);
  }
});

test("desktop-only measures leave mobile and tablet flow free of overflow", async ({ page }) => {
  for (const width of [390, 430, 768]) {
    await page.setViewportSize({ width, height: width === 768 ? 1024 : 844 });

    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator("main")).toBeVisible();
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      expect(overflow, `${route} at ${width}px should not overflow horizontally`).toBeLessThanOrEqual(1);
    }
  }
});

test("scoped public journeys remain free of console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await page.setViewportSize({ width: 1440, height: 900 });
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator("main")).toBeVisible();
  }

  expect(errors).toEqual([]);
});
