import { expect, test } from "@playwright/test";
import fs from "node:fs";

for (const language of ["en", "zh"]) {
  test(`${language} transaction enablement joins the pipeline and preserves the commercial ecosystem`, async ({
    page
  }, testInfo) => {
    test.setTimeout(90_000);
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    const capital = language === "en" ? "Capital, Legal & Professional Services" : "资本、法律与专业服务";
    const widths = testInfo.project.name === "desktop" ? [375, 390, 430, 768, 1440] : [390];
    fs.mkdirSync("audit/transaction-enablement", { recursive: true });
    await page.goto(`/${language}/companies`);
    const transaction = page.locator("[data-transaction-enablement]");
    await expect(transaction).toBeVisible();
    expect(
      await transaction.evaluate((element) => ({
        preceding: element.previousElementSibling?.tagName,
        following: element.nextElementSibling?.hasAttribute("data-local-team-capability"),
        pipeline: element.previousElementSibling?.textContent
      }))
    ).toMatchObject({
      preceding: "OL",
      following: true,
      pipeline: expect.stringContaining(language === "en" ? "commercial pipeline" : "商务管道")
    });
    await expect(page.locator('[data-company-route="4"]')).toContainText(
      language === "en" ? "Market Credibility & Strategic Communications" : "市场公信力与战略传播"
    );
    await expect(page.locator("[data-market-credibility-framework] li")).toHaveCount(4);
    await expect(transaction.locator("[data-transaction-qualification]")).toContainText(
      language === "en" ? "independently assessed" : "独立评估"
    );
    await expect(transaction.locator("img, form")).toHaveCount(0);
    const link = transaction.getByRole("link");
    await expect(link).toHaveAttribute("href", "https://weiric.com/");
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    await expect(link).toHaveAccessibleName(language === "en" ? /opens in a new tab/ : /在新标签页打开/);
    await link.focus();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Shift+Tab");
    await expect(link).toBeFocused();
    await page
      .context()
      .route("https://weiric.com/**", (route) => route.fulfill({ body: "Official destination test" }));
    const popupPromise = page.waitForEvent("popup");
    await page.keyboard.press("Enter");
    const popup = await popupPromise;
    expect(await popup.evaluate(() => window.opener === null)).toBe(true);
    await popup.close();
    await link.evaluate((element) => element.blur());
    for (const width of widths) {
      await page.setViewportSize({ width, height: 1000 });
      await transaction.scrollIntoViewIfNeeded();
      await page.waitForTimeout(700);
      await transaction.screenshot({
        style: "header { visibility: hidden !important; }",
        path: `audit/transaction-enablement/${language}-companies-${width}.png`
      });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
      await expect(transaction.locator("[data-transaction-qualification]")).toBeVisible();
    }
    for (const route of ["", "/partners"]) {
      await page.goto(`/${language}${route}`);
      const taxonomy = page.locator(route ? "[data-partner-type-list]" : "[data-home-participant-grid]");
      await expect(taxonomy.getByRole("heading", { name: capital, exact: true })).toBeVisible();
      await expect(taxonomy.locator(":scope > li")).toHaveCount(route ? 7 : 6);
      await expect(page.locator("main")).not.toContainText("WEIRIC");
      if (!route)
        await expect(page.locator('[data-phase5-section="media-collaboration"]')).toContainText(
          language === "en" ? "EUROPEAN TIMES" : "欧洲时报"
        );
      else
        await expect(page.locator("[data-partner-media]")).toContainText(
          language === "en" ? "Media & Editorial Platforms" : "媒体与编辑平台"
        );
      for (const width of widths) {
        await page.setViewportSize({ width, height: 1000 });
        await taxonomy.scrollIntoViewIfNeeded();
        await page.waitForTimeout(700);
        await taxonomy.screenshot({
          style: "header { visibility: hidden !important; }",
          path: `audit/transaction-enablement/${language}-${route ? "partners" : "home"}-${width}.png`
        });
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
      }
    }
    await page.goto(`/${language}/how-we-work`);
    await expect(page.locator("[data-how-process] > li")).toHaveCount(5);
    await expect(page.locator("main")).toContainText(
      language === "en"
        ? "capital and professional advisers, editorial platforms"
        : "资本与专业顾问、媒体平台"
    );
    await expect(page.locator("main")).not.toContainText("WEIRIC");
    await page.goto(`/${language}/contact`);
    await expect(page.locator("main")).toContainText(language === "en" ? "transaction support" : "交易支持");
    await expect(page.locator("form")).toHaveCount(0);
    expect(errors).toEqual([]);
  });

  test(`${language} transaction context and qualification remain available without JavaScript`, async ({
    browser
  }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(`/${language}/companies`);
    const section = page.locator("[data-transaction-enablement]");
    await expect(section).toBeVisible();
    await expect(section.getByRole("link")).toHaveAttribute("href", "https://weiric.com/");
    await expect(section.locator("[data-transaction-qualification]")).toBeVisible();
    await context.close();
  });
}
