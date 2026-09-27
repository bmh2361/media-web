import { expect, test } from "@playwright/test";

const slugs = [
  "byd-bd11-london",
  "changan-europe-launch-2025",
  "geely-london-brand-launch",
  "catl-open-day-2025",
  "leapmotor-iaa-2023",
  "agibot-london-launch",
  "london-automotive-brand-film",
  "london-fashion-week-2025",
  "beauty-fashion-brand-content",
  "european-road-lifestyle"
];

for (const language of ["en", "zh"]) {
  test(`${language}: all ten narratives, metadata, imagery and next-project links`, async ({
    page
  }, testInfo) => {
    test.setTimeout(240000);
    const widths = testInfo.project.name === "mobile" ? [390] : [1440, 768];
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    for (const width of widths) {
      await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
      for (const slug of slugs) {
        const response = await page.goto(`/${language}/work/${slug}`);
        expect(response?.status()).toBe(200);
        await expect(page.locator("h1")).toBeVisible();
        await expect(page.locator("html")).toHaveAttribute("lang", language === "zh" ? "zh-CN" : "en-GB");
        await expect(page.locator("html")).not.toHaveAttribute("translate", "no");
        await expect(page.locator('[data-analytics="language-switch"]').first()).toHaveAttribute(
          "href",
          `/${language === "zh" ? "en" : "zh"}/work/${slug}`
        );
        await expect(page.locator("main")).not.toContainText(
          /photograph|videograph|filming|content (?:capture|production|documentation)|event documentation|摄影|拍摄|影视制作|作品集|Potential use|事件文档/i
        );
        for (const heading of language === "zh"
          ? ["市场背景", "客户目标", "我们的参与", "本地执行", "市场结果", "战略意义"]
          : [
              "The Market Context",
              "The Client Objective",
              "Our Role",
              "Local Execution",
              "Market Outcome",
              "Why It Matters"
            ])
          await expect(page.getByRole("heading", { name: heading, exact: true })).toBeVisible();
        const positions = await page
          .locator(
            '[data-case-section="market"], [data-case-section="responsibility"], [data-case-section="visual-evidence"], [data-case-section="related"]'
          )
          .evaluateAll((nodes) => nodes.map((n) => n.getBoundingClientRect().top));
        expect(positions).toEqual([...positions].sort((a, b) => a - b));
        for (const section of ["market", "responsibility", "outcome", "visual-evidence", "related"])
          await expect(page.locator(`[data-case-section="${section}"]`)).toBeVisible();
        await expect(page.locator('[data-case-section="responsibility"]')).not.toContainText(
          /\d+ (approved public project images|张获准)/
        );
        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
          "href",
          new RegExp(`/${language}/work/${slug}$`)
        );
        for (const locale of ["en-GB", "zh-CN"])
          await expect(page.locator(`link[hreflang="${locale}"]`)).toHaveAttribute(
            "href",
            new RegExp(`/${locale.slice(0, 2)}/work/${slug}$`)
          );
        const description = await page.locator('meta[name="description"]').getAttribute("content");
        expect(description).not.toMatch(/photograph|videograph|filming|摄影|拍摄/i);
        for (const image of await page.locator("main img").all())
          expect(await image.getAttribute("alt")).not.toMatch(/photograph|videograph|filming|摄影|拍摄/i);
        await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
          "content",
          description!
        );
        const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
        expect(schemas.map((s) => JSON.parse(s)).find((s) => s["@type"] === "CreativeWork").description).toBe(
          description
        );
        const next = page.locator('[data-case-section="related"] a[href*="/work/"]');
        expect(slugs).toContain((await next.getAttribute("href"))!.split("/").at(-1));
        await expect(page.locator('[data-case-section="related"] a[href*="/contact"]')).toHaveAttribute(
          "href",
          `/${language}/contact?intent=company`
        );
        for (const img of await page.locator("main img").all()) {
          await img.scrollIntoViewIfNeeded();
          await expect(img).toHaveJSProperty("complete", true);
          expect(await img.evaluate((el) => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
        }
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth - document.documentElement.clientWidth
          )
        ).toBeLessThanOrEqual(1);
        if (["byd-bd11-london", "catl-open-day-2025", "agibot-london-launch"].includes(slug)) {
          await page.evaluate(() => {
            if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
            window.scrollTo({ top: 0, behavior: "instant" });
          });
          await page.waitForTimeout(400);
          await page.screenshot({
            path: `audit/market-repositioning/screenshots/${language}-${width}-${slug}.png`,
            fullPage: true
          });
        }
      }
    }
    expect(errors).toEqual([]);
  });

  test(`${language}: category filters, visible contribution and cooperation CTA`, async ({
    page
  }, testInfo) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`/${language}/work`);
    const mobile = testInfo.project.name === "mobile";
    for (const [category, count] of [
      ["all", 10],
      ["market-presence", 3],
      ["industry-credibility", 3],
      ["brand-evidence", 4]
    ] as const) {
      const filter = page.locator(`[data-case-filter="${category}"]`);
      await filter.click();
      await expect(filter).toHaveAttribute("aria-pressed", "true");
      await expect(page.locator(mobile ? "[data-mobile-case-row]" : "[data-case-row]")).toHaveCount(count);
      await expect(page.locator(mobile ? "[data-mobile-case-meta]" : "[data-case-preview]")).toContainText(
        language === "zh" ? "我们的参与" : "Our role"
      );
      await expect(page.locator(mobile ? "[data-mobile-case-meta]" : "[data-case-preview]")).toContainText(
        language === "zh" ? "市场结果" : "Market outcome"
      );
    }
    await expect(page.locator("[data-work-opportunity] a")).toHaveAttribute(
      "href",
      `/${language}/contact?intent=company`
    );
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    ).toBeLessThanOrEqual(1);
    await page.locator('[data-case-filter="all"]').click();
    await expect(
      page.locator(mobile ? "[data-mobile-case-meta]" : "[data-case-preview] article")
    ).toHaveCount(1);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("main")).not.toContainText(/photograph|videograph|filming|摄影|拍摄|作品集/i);
    // Capture the initial overview after interaction checks, with no outgoing preview or sticky-header scroll state.
    await page.goto(`/${language}/work`);
    await expect(
      page.locator(mobile ? "[data-mobile-case-meta]" : "[data-case-preview] article")
    ).toHaveCount(1);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(400);
    await page.screenshot({
      path: `audit/market-repositioning/screenshots/${language}-${mobile ? 390 : 1440}-work.png`,
      fullPage: true
    });
  });
}
