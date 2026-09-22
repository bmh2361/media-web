import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = [
  "",
  "/companies",
  "/partners",
  "/services",
  "/work",
  "/about",
  "/contact",
  "/work/changan-europe-launch-2025"
];
for (const lang of ["en", "zh"]) {
  for (const width of [375, 390, 430, 768, 1024, 1440, 1536]) {
    test(`${lang} commercial routes at ${width}px`, async ({ page }) => {
      test.setTimeout(120000);
      await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      for (const route of routes) {
        const response = await page.goto(`/${lang}${route}`);
        expect(response?.status(), route).toBe(200);
        await expect(page.locator("h1")).toHaveCount(1);
        await expect(page.locator("h1")).toBeVisible();
        await page.evaluate(() => document.fonts.ready);
        expect(
          await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
          `${lang}${route} horizontal overflow at ${width}`
        ).toBe(true);
        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
          "href",
          `https://www.venusbridge.co.uk/${lang}${route}`
        );
        await expect(page.locator('link[hreflang="en-GB"]')).toHaveAttribute(
          "href",
          `https://www.venusbridge.co.uk/en${route}`
        );
        await expect(page.locator('link[hreflang="zh-CN"]')).toHaveAttribute(
          "href",
          `https://www.venusbridge.co.uk/zh${route}`
        );
        if (
          [390, 1440].includes(width) &&
          [
            "",
            "/partners",
            "/services",
            "/contact",
            "/companies",
            "/about",
            "/work/changan-europe-launch-2025"
          ].includes(route)
        ) {
          await page.evaluate(async () => {
            for (let y = 0; y < document.body.scrollHeight; y += 600) {
              window.scrollTo(0, y);
              await new Promise((r) => setTimeout(r, 25));
            }
            window.scrollTo(0, 0);
          });
          await page.screenshot({
            path: `test-results/commercial-review/${lang}-${route.replaceAll("/", "-") || "home"}-${width}.png`,
            fullPage: true
          });
        }
      }
      expect(errors).toEqual([]);
    });
  }
  test(`${lang} five audience paths and structured email briefs`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`/${lang}`);
    const expected =
      lang === "zh"
        ? "帮助中国科技企业，在英国建立市场与合作。"
        : "UK market entry and partnerships for Chinese technology companies.";
    await expect(page.locator("h1")).toHaveText(expected);
    await expect(page.locator('[data-commercial-section="engagements"]')).toHaveCount(0);
    await expect(page.locator('main a[href="/' + lang + '/companies"]')).toBeVisible();
    await page.goto(`/${lang}/companies`);
    await expect(page.locator('#market-action-map a[href="/' + lang + '/services#readiness"]')).toBeVisible();
    await page.goto(`/${lang}/services`);
    await expect(page.locator("#launch")).toContainText(
      lang === "zh" ? "项目后：反馈记录" : "After: feedback record"
    );
    await page.goto(`/${lang}/partners`);
    await expect(page.locator("#commercial-demand")).toContainText(lang === "zh" ? "分销商" : "Distributors");
    await expect(page.locator("#requirement-map")).toContainText(
      lang === "zh" ? "研究参与不等于品牌背书" : "Research participation is not brand endorsement"
    );
    await expect(page.locator("#delivery-partners")).toContainText(
      lang === "zh" ? "审批路径" : "approval route"
    );
    await page.goto(`/${lang}/contact?intent=demand#demand`);
    for (const route of ["company", "demand", "research", "specialist"]) {
      const link = page.locator(`[data-enquiry-email="${route}"]`);
      const href = await link.getAttribute("href");
      expect(href).toMatch(/^mailto:/);
      const url = new URL(href!);
      expect(url.pathname).toBe("venusbridge.co.uk@gmail.com");
      expect(url.searchParams.get("subject")).toContain("Venus Bridge");
      expect(url.searchParams.get("body")).toContain(lang === "zh" ? "联系方式" : "Contact information");
      expect(url.searchParams.get("body")).toContain("\r\n\r\n");
    }
    await expect(page.locator("form")).toHaveCount(0);
    const a11y = await new AxeBuilder({ page: page as never }).withTags(["wcag2a", "wcag2aa"]).analyze();
    expect(a11y.violations).toEqual([]);
  });
}

test("navigation works by keyboard, mobile and desktop; language retains route", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [390, 1440, 1536]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/en/partners");
    if (width < 1280) {
      await page.getByRole("button", { name: "Open menu", exact: true }).click();
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();
      await expect(
        dialog.getByRole("link", { name: "For UK & European Partners", exact: true })
      ).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(dialog).not.toBeVisible();
      await page.getByRole("button", { name: "Open menu", exact: true }).click();
      await page.getByRole("dialog").getByRole("link", { name: "Services", exact: true }).click();
    } else
      await page
        .getByRole("navigation", { name: "Primary navigation" })
        .getByRole("link", { name: "Services", exact: true })
        .click();
    await expect(page).toHaveURL(/\/en\/services$/);
    await expect(page.locator("h1")).toBeVisible();
  }
  await page.goto("/en/partners");
  await page.locator('header a[href="/zh/partners"]').first().click();
  await expect(page).toHaveURL(/\/zh\/partners$/);
});

test("legacy routes redirect once to canonical services with valid anchors", async ({ request }) => {
  for (const lang of ["en", "zh"]) {
    for (const [from, to] of [
      ["capabilities", "services"],
      ["what-we-do", "services"],
      ["services/events-exhibitions", "services#launch"],
      ["services/commercial-production", "services#brand-communication"],
      ["how-we-work", "services#process"]
    ]) {
      const response = await request.get(`/${lang}/${from}`, { maxRedirects: 0 });
      expect(response.status()).toBe(308);
      expect(response.headers().location).toBe(`/${lang}/${to}`);
      const destination = await request.get(`/${lang}/${to.split("#")[0]}`, { maxRedirects: 0 });
      expect(destination.status()).toBe(200);
    }
  }
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("/en/services");
  expect(sitemap).not.toContain("/how-we-work");
  expect(sitemap).toContain("/radar");
});

test("homepage motion controls work and reduced motion pauses autoplay", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");
  const hero = page.locator("[data-home-hero-media]");
  await expect(hero).toBeVisible();
  expect(
    await hero
      .locator("img")
      .first()
      .evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)
  ).toBe(true);
  const before = await hero.textContent();
  await page.waitForTimeout(6400);
  expect(await hero.textContent()).toBe(before);
});

test("key commercial pages stay readable with normal motion and meet accessibility checks", async ({
  page
}) => {
  test.setTimeout(120000);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  for (const lang of ["en", "zh"]) {
    for (const route of ["", "/companies", "/partners", "/services"]) {
      await page.goto(`/${lang}${route}`);
      const heading = page.locator("h1");
      await expect(heading).toBeVisible();
      await expect(heading).toHaveCSS("opacity", "1");
      if (route === "") {
        const cta = page.locator("[data-home-hero-copy] a").first();
        await expect(cta).toBeVisible();
        const box = await cta.boundingBox();
        expect(box!.y + box!.height).toBeLessThan(844);
        expect(box!.height).toBeGreaterThanOrEqual(44);
      }
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 500) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 50));
        }
      });
      const results = await new AxeBuilder({ page: page as never }).withTags(["wcag2a", "wcag2aa"]).analyze();
      expect(results.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) }))).toEqual([]);
    }
  }
});
