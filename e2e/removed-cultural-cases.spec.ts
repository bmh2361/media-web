import { expect, test } from "@playwright/test";

test("withdrawn cultural cases are absent from both languages, routes and sitemap", async ({
  page,
  request
}, testInfo) => {
  const removed = ["wang-linkai-london-concert", "yue-yunpeng-london-live"];
  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const language of ["en", "zh"]) {
    await page.goto(`/${language}/work`);
    await expect(
      page.locator(testInfo.project.name === "mobile" ? "[data-mobile-case-row]" : "[data-case-row]")
    ).toHaveCount(10);
    await expect(page.locator("main")).not.toContainText(/王琳凯|小鬼|岳云鹏|Wang Linkai|Yue Yunpeng/);
    await expect(page.locator('[data-case-filter="institutional-talent"]')).toHaveCount(0);
    for (const slug of removed) {
      await expect(page.locator(`a[href*="${slug}"]`)).toHaveCount(0);
      expect(sitemap).not.toContain(slug);
      expect((await request.get(`/${language}/work/${slug}`)).status()).toBe(404);
    }
  }
});
