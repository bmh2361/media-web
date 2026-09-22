import fs from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const retired = [
  "wang-linkai-london-concert",
  "yue-yunpeng-london-live",
  "london-fashion-week-2025",
  "beauty-fashion-brand-content"
];
const aliases = [
  "london-celebrity-event-coverage",
  "fashion-campaign-production-london",
  "beauty-creator-content-sprint",
  "jewellery-editorial-shoot",
  "teal-editorial-series",
  "commercial-fashion-styling",
  "creative-beauty-makeup"
];

test("static export has no retired case payloads, sitemap entries or catch-all redirects", async ({
  request
}) => {
  const walk = (dir: string): string[] =>
    fs
      .readdirSync(dir, { withFileTypes: true })
      .flatMap((entry) =>
        entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]
      );
  for (const file of walk("out").filter(
    (file) => /\.(html|txt|xml)$/.test(file) && !file.includes(`${path.sep}_next${path.sep}`)
  )) {
    const source = fs.readFileSync(file, "utf8");
    for (const slug of retired) expect(source, `${file}: ${slug}`).not.toContain(`/work/${slug}`);
  }
  for (const lang of ["en", "zh"]) {
    for (const slug of [...retired, ...aliases])
      for (const suffix of ["", "/", ".html"]) {
        const response = await request.get(`/${lang}/work/${slug}${suffix}`, { maxRedirects: 0 });
        expect(response.status(), `${lang}/${slug}${suffix}`).toBe(404);
        expect(await response.text()).not.toContain("data-case-section");
      }
    for (const route of [
      "industries/fashion-beauty-apparel",
      "industries/entertainment-culture",
      "expertise/fashion-beauty-apparel",
      "expertise/entertainment-culture"
    ]) {
      expect((await request.get(`/${lang}/${route}`, { maxRedirects: 0 })).status(), route).toBe(404);
    }
  }
});

for (const lang of ["en", "zh"]) {
  test(`${lang} page ownership, readable diagrams and contact intent`, async ({ page }) => {
    await page.goto(`/${lang}/companies`);
    await expect(page.locator("#market-action-map > div ol > li")).toHaveCount(3);
    await expect(page.locator('[data-commercial-section="engagements"], #process')).toHaveCount(0);
    await expect(page.locator("[data-company-stories] article")).toHaveCount(2);
    for (const service of ["readiness", "launch", "development"]) {
      await page.goto(`/${lang}/services#${service}`);
      const offer = page.locator("#" + service);
      await expect(offer.locator("dd ul li")).toHaveCount(3);
      const title = await offer.locator("h2").innerText();
      await offer.locator(`a[href*="service=${service}"]`).click();
      await expect(page).toHaveURL(new RegExp(`intent=company&service=${service}#company$`));
      await expect(page.locator("main")).toHaveCount(1);
      await expect(page.locator('[data-enquiry-email="company"]')).toHaveAttribute(
        "href",
        new RegExp(encodeURIComponent(title))
      );
      const email = new URL((await page.locator('[data-enquiry-email="company"]').getAttribute("href"))!);
      expect(email.searchParams.get("subject")).toContain(title);
      expect(email.searchParams.get("body")).toContain(title);
      expect(email.searchParams.get("body")).toContain(lang === "zh" ? "联系方式" : "Contact information");
    }
    for (const [id, intent] of [
      ["commercial-demand", "demand"],
      ["research", "research"],
      ["delivery-partners", "specialist"]
    ]) {
      await page.goto(`/${lang}/partners`);
      await page.locator(`#${id} a`).click();
      await expect(page).toHaveURL(new RegExp(`intent=${intent}#${intent}$`));
      await expect(page.locator("main")).toHaveCount(1);
      const email = new URL((await page.locator(`[data-enquiry-email="${intent}"]`).getAttribute("href"))!);
      expect(email.searchParams.get("body")).toContain(
        intent === "research"
          ? lang === "zh"
            ? "研究问题"
            : "Research question"
          : lang === "zh"
            ? "联系方式"
            : "Contact information"
      );
    }
  });
  test(`${lang} diagrams support motion preferences, keyboard and 200 percent reflow`, async ({ page }) => {
    test.setTimeout(120000);
    for (const motion of ["reduce", "no-preference"] as const) {
      await page.emulateMedia({ reducedMotion: motion });
      for (const [route, id] of [
        ["companies", "market-action-map"],
        ["partners", "requirement-map"],
        ["services", "deliverable-workbench"]
      ]) {
        for (const width of [375, 390, 430, 768, 1024, 1440, 1536]) {
          await page.setViewportSize({ width, height: 1000 });
          await page.goto(`/${lang}/${route}`);
          await expect(page.locator("#" + id)).toBeVisible();
          expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(
            true
          );
          expect(await page.locator("#" + id).evaluate((el) => el.scrollWidth <= el.clientWidth + 1)).toBe(
            true
          );
        }
        // CSS zoom exercises 200% enlarged content; 720px also verifies browser-zoom reflow.
        await page.setViewportSize({ width: 1440, height: 1000 });
        await page.evaluate(() => {
          document.documentElement.style.zoom = "2";
        });
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
        await page.evaluate(() => {
          document.documentElement.style.zoom = "";
        });
        await page.setViewportSize({ width: 720, height: 500 });
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
        await page.keyboard.press("Tab");
        await page.keyboard.press("Tab");
        expect(await page.evaluate(() => document.activeElement?.tagName)).toBe("A");
      }
    }
    for (const route of ["companies", "partners", "services"]) {
      await page.goto(`/${lang}/${route}`);
      const a11y = await new AxeBuilder({ page: page as never })
        .include("main")
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(a11y.violations).toEqual([]);
    }
  });
}
