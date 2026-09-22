import { expect, test } from "@playwright/test";

for (const lang of ["en", "zh"]) {
  test(`${lang} technical profile, priority order and requirement-first route`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`/${lang}/about`);
    const profile = page.locator('[data-team-member="minghan"]');
    await expect(profile).toContainText(
      lang === "en"
        ? "Energy systems, applied AI & industrial technology"
        : "能源系统、应用人工智能与工业技术"
    );
    await expect(profile).toContainText(
      lang === "en"
        ? "PhD in Chemical & Process Engineering, University of Leeds"
        : "利兹大学化学与过程工程博士"
    );
    await expect(profile).toContainText(
      lang === "en"
        ? "Global Talent Visa holder, endorsed by the Royal Academy of Engineering"
        : "英国皇家工程院背书全球人才签证持有人"
    );
    await expect(profile).toContainText(
      lang === "en" ? "not an endorsement of Venus Bridge" : "不代表对 Venus Bridge 的背书"
    );
    await expect(profile).not.toContainText(
      /PhD · Artificial Intelligence|GTV Global Talent recipient|Engineering-certified|皇家工学院/
    );
    const paragraphs = await profile.locator("p").allTextContents();
    const research = paragraphs.findIndex((text) =>
      text.includes(lang === "en" ? "multiphase-flow" : "多相流")
    );
    const credential = paragraphs.findIndex((text) =>
      text.includes(lang === "en" ? "Global Talent" : "全球人才")
    );
    expect(research).toBeGreaterThanOrEqual(0);
    expect(credential).toBeGreaterThan(research);
    const sizes = await profile
      .locator("p")
      .evaluateAll((nodes) => nodes.map((node) => parseFloat(getComputedStyle(node).fontSize)));
    expect(sizes[credential]).toBeLessThan(sizes[research]);
    await profile.locator("button").first().click();
    await expect(
      page
        .getByText(lang === "en" ? "Technical Commercialisation" : "技术商业化", { exact: true })
        .filter({ visible: true })
    ).toBeVisible();
    expect(await page.locator('script[type="application/ld+json"]').allTextContents()).not.toEqual(
      expect.arrayContaining([expect.stringMatching(/Royal Academy|皇家工程院/)])
    );
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    await profile.screenshot({ path: `tmp/second-pass/${lang}-minghan-${test.info().project.name}.png` });
    await page.goto(`/${lang}/services`);
    const priorities = page.locator("#priority-areas li");
    await expect(priorities).toHaveText(
      lang === "en"
        ? [
            "1. AI, Robotics & Intelligent Systems",
            "2. Energy & Smart Infrastructure",
            "3. Mobility & Automotive Technology"
          ]
        : ["1. 人工智能、机器人与智能系统", "2. 能源与智慧基础设施", "3. 出行与汽车技术"]
    );
    await page.goto(`/${lang}/partners`);
    await expect(page.locator("h1")).toHaveText(
      lang === "en"
        ? "Start with your UK or European business requirement."
        : "先说清楚你的英国或欧洲业务需求。"
    );
    await expect(page.locator("main")).toContainText(
      lang === "en"
        ? "Start with the UK or European requirement, then assess whether"
        : "先理解英国或欧洲企业的真实业务需求，再判断"
    );
  });
}

test("legacy priority routes reach the focused services section", async ({ request }) => {
  for (const lang of ["en", "zh"]) {
    for (const route of ["industries", "expertise", "industries/automotive", "expertise/automotive"]) {
      const response = await request.get(`/${lang}/${route}`, { maxRedirects: 0 });
      expect(response.status()).toBe(308);
      expect(response.headers().location).toBe(`/${lang}/services#priority-areas`);
    }
  }
});
