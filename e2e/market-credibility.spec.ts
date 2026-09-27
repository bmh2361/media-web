import { expect, test } from "@playwright/test";
import fs from "node:fs";

for (const language of ["en", "zh"]) {
  test(`${language} credibility integrates into the existing commercial journey`, async ({
    page
  }, testInfo) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.goto(`/${language}`);
    const collaboration = page.locator('[data-phase5-section="media-collaboration"]');
    await expect(collaboration).toBeVisible();
    expect(
      await collaboration.evaluate((el) => [
        el.previousElementSibling?.getAttribute("data-phase5-section"),
        el.nextElementSibling?.getAttribute("data-phase5-section")
      ])
    ).toEqual(["model", "value"]);
    await expect(collaboration.locator("li")).toHaveCount(4);
    await expect(page.locator('[data-phase5-section="market-coverage"]')).toHaveCount(0);
    const link = collaboration.getByRole("link");
    await expect(link).toHaveAttribute("href", "https://www.oushinet.com/");
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    await expect(link).toHaveAccessibleName(language === "en" ? /opens in a new tab/ : /在新标签页打开/);
    await link.focus();
    await expect(link).toBeFocused();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Shift+Tab");
    await expect(link).toBeFocused();
    await page.route("https://www.oushinet.com/**", (route) => route.fulfill({ body: "Official link test" }));
    const popupPromise = page.waitForEvent("popup");
    await page.keyboard.press("Enter");
    const popup = await popupPromise;
    expect(await popup.evaluate(() => window.opener === null)).toBe(true);
    await popup.close();
    await link.evaluate((element) => element.blur());
    const folder = "audit/market-credibility";
    fs.mkdirSync(folder, { recursive: true });
    const widths = testInfo.project.name === "mobile" ? [375, 390, 430] : [1440];
    for (const width of widths) {
      await page.setViewportSize({ width, height: 1000 });
      await collaboration.scrollIntoViewIfNeeded();
      await page.waitForTimeout(900);
      await collaboration.screenshot({ path: `${folder}/${language}-home-${width}.png` });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    }
    await page.goto(`/${language}/companies`);
    const route = page.locator('[data-company-route="4"]');
    await expect(route).toContainText(
      language === "en" ? "Market Credibility & Strategic Communications" : "市场公信力与战略传播"
    );
    await expect(route).not.toContainText(/photography|film|摄影|影片/i);
    const framework = page.locator("[data-market-credibility-framework]");
    await expect(framework.locator("li")).toHaveCount(4);
    await expect(framework).toContainText(
      language === "en" ? "European Times · Oushinet" : "欧洲时报 · 欧时网"
    );
    for (const width of widths) {
      await page.setViewportSize({ width, height: 1000 });
      await route.scrollIntoViewIfNeeded();
      await page.waitForTimeout(900);
      await route.screenshot({ path: `${folder}/${language}-route04-${width}.png` });
      await framework.scrollIntoViewIfNeeded();
      await page.waitForTimeout(900);
      await framework.screenshot({ path: `${folder}/${language}-framework-${width}.png` });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    }
    await page.goto(`/${language}/partners`);
    await expect(page.locator("[data-partner-type-list] > li")).toHaveCount(7);
    const media = page.locator("[data-partner-media]");
    await expect(media).toContainText(language === "en" ? "Media & Editorial Platforms" : "媒体与编辑平台");
    for (const width of widths) {
      await page.setViewportSize({ width, height: 1000 });
      await media.scrollIntoViewIfNeeded();
      await page.waitForTimeout(900);
      await media.screenshot({ path: `${folder}/${language}-partners-${width}.png` });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    }
    expect(errors).toEqual([]);
  });

  test(`${language} credibility remains available without JavaScript`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(`/${language}`);
    await expect(page.locator('[data-phase5-section="media-collaboration"]')).toBeVisible();
    await expect(page.locator('[data-phase5-section="market-coverage"]')).toHaveCount(0);
    await page.goto(`/${language}/companies`);
    await expect(page.locator("[data-market-credibility-framework] li")).toHaveCount(4);
    await context.close();
  });
}
