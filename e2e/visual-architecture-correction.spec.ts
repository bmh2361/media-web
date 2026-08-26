import { expect, test } from "@playwright/test";

const widths = [1440, 1280, 1024, 768, 430, 390];

test("About opening stays compact and typographic at required widths", async ({ page }) => {
  for (const width of widths) {
    const height = width < 600 ? 844 : 1000;
    await page.setViewportSize({ width, height });
    await page.goto("/en/about");
    const hero = page.locator('[data-about-chapter="identity"]');
    await expect(hero.locator("img")).toHaveCount(0);
    await expect(hero.locator("ol li")).toHaveCount(3);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    if (width >= 1024) expect((await hero.boundingBox())?.height ?? height).toBeLessThanOrEqual(height * 0.73);
  }
});

test("homepage uses one direct landscape image with autoplay and square navigation", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/en");
  const system = page.locator("[data-home-media-system]");
  const indicators = system.locator("[data-carousel-indicator]");
  const seen = new Set<string>();

  await expect(indicators).toHaveCount(5);
  await expect(page.getByRole("button", { name: "Next image" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Previous image" })).toHaveCount(0);

  for (let index = 0; index < 5; index += 1) {
    await indicators.nth(index).click();
    await expect(system).toHaveAttribute("data-carousel-active", String(index));
    await page.waitForTimeout(950);
    await expect(system.locator("img")).toHaveCount(1);
    await expect.poll(() => system.locator("img").evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
    const media = await system.locator("img").evaluate((image: HTMLImageElement) => ({
      mediaId: image.closest("figure")?.getAttribute("data-media-id") ?? "",
      naturalWidth: image.naturalWidth,
      naturalHeight: image.naturalHeight,
      imageRect: image.getBoundingClientRect().toJSON(),
      figureRect: image.closest("figure")?.getBoundingClientRect().toJSON()
    }));
    seen.add(media.mediaId);
    expect(media.naturalWidth).toBeGreaterThan(media.naturalHeight);
    expect(Math.abs(media.imageRect.width - (media.figureRect?.width ?? 0))).toBeLessThanOrEqual(5);
  }
  expect(seen.size).toBe(5);
  expect(await system.evaluate((node) => getComputedStyle(node).backgroundColor)).not.toBe("rgb(0, 0, 0)");

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en");
  await system.dispatchEvent("pointerdown", { pointerId: 1, pointerType: "touch", clientX: 340 });
  await system.dispatchEvent("pointerup", { pointerId: 1, pointerType: "touch", clientX: 40 });
  await expect(system).toContainText("02 / 05");
});

test("every Work row resolves to exactly one explicit cover", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/en/work");
  const rows = page.locator("[data-case-row]");
  await expect(rows).toHaveCount(12);

  for (let index = 0; index < 12; index += 1) {
    const row = rows.nth(index);
    await row.locator("button").click();
    await expect(row).toHaveAttribute("data-active-case", "true");
    await expect(page.locator("[data-case-preview] [data-preview-media-stage] img")).toHaveCount(1);
    await expect(page.locator("[data-case-preview] [data-preview-media-stage]")).toHaveAttribute("data-preview-image-count", "1");
    expect(await page.locator("[data-case-preview] [data-preview-media-stage]").evaluate((node) => getComputedStyle(node).backgroundColor)).not.toBe("rgb(0, 0, 0)");
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en/work");
  await page.locator("[data-mobile-case-row] button").first().click();
  await page.locator("[data-mobile-case-row] button").nth(1).click();
  await expect(page.locator('[data-mobile-case-row] button[aria-expanded="true"]')).toHaveCount(1);
  await expect(page.locator("[data-mobile-case-cover] img")).toHaveCount(1);
});
