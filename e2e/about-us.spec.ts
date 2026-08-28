import { expect, test } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";

const auditDir = path.join(process.cwd(), "audit", "phase-10-about-us");

test.describe("About Us and sector content", () => {
  test.skip(({ browserName }) => browserName !== "chromium");

  for (const locale of ["en", "zh"] as const) {
    for (const width of [390, 768, 1024, 1440]) {
      test(`${locale} About Us at ${width}px`, async ({ page }, testInfo) => {
        test.skip(testInfo.project.name === "mobile");
        await page.setViewportSize({ width, height: width < 768 ? 844 : 900 });
        await page.goto(`/${locale}/about`);
        await page.evaluate(() => sessionStorage.setItem("vbm-opening-seen", "1"));
        await page.reload();

        await expect(page.locator("h1")).toContainText(
          locale === "zh"
            ? "服务中国企业英国与欧洲发展的跨境运营团队。"
            : "A cross-border operating team for Chinese companies building in the UK and Europe."
        );
        await expect(
          page.getByRole("heading", {
            name:
              locale === "zh"
                ? "把总部目标变成本地行动的人。"
                : "The people turning headquarters goals into local action."
          })
        ).toBeVisible();
        await expect(page.getByText("Dr. Richard Bußmann", { exact: true }).first()).toBeAttached();
        await expect(page.locator("[data-team-member]")).toHaveCount(5);
        await expect(page.locator("[data-team-grid] img")).toHaveCount(5);
        await expect(page.locator('[data-about-chapter="real-work"]')).toHaveCount(0);
        await expect(page.locator("body")).not.toContainText("关于镜桥");
        if (locale === "en" && width >= 1280)
          await expect(
            page.locator("header").getByRole("link", { name: "About Us", exact: true })
          ).toBeAttached();
        await expect(
          page.getByRole("link", { name: locale === "zh" ? "讨论项目" : "Discuss a Project" }).last()
        ).toBeVisible();

        const overflow = await page.evaluate(() => ({
          document: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          body: document.body.scrollWidth - document.documentElement.clientWidth
        }));
        expect(overflow.document, `document overflow at ${width}`).toBeLessThanOrEqual(1);
        expect(overflow.body, `body overflow at ${width}`).toBeLessThanOrEqual(1);

        if (width === 390 || width === 1440) {
          await fs.mkdir(auditDir, { recursive: true });
          await page.screenshot({
            path: path.join(auditDir, `${locale}-about-${width}.png`),
            fullPage: true,
            animations: "disabled"
          });
        }
      });
    }

    test(`${locale} retired fashion sector route resolves to the canonical company journey`, async ({
      page
    }, testInfo) => {
      test.skip(testInfo.project.name === "mobile");
      await page.goto(`/${locale}/industries/fashion-beauty-apparel`);
      await expect(page).toHaveURL(new RegExp(`/${locale}/companies$`));
      await expect(page).toHaveTitle(
        locale === "zh"
          ? /中国企业英国与欧洲市场进入及本地执行/
          : /UK & Europe Market Entry and Local Execution/
      );
      await expect(page.locator("h1")).toContainText(
        locale === "zh"
          ? "以本地商业执行，进入并拓展英国与欧洲市场。"
          : "Enter and grow in the UK & Europe with local commercial execution."
      );
    });
  }

  test("team profiles expose accessible responsibility controls", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === "mobile");
    await page.goto("/en/about");

    const teamButtons = page.locator("[data-team-member] button[aria-expanded]");
    await expect(teamButtons).toHaveCount(5);
    await teamButtons.nth(1).focus();
    await page.keyboard.press("Enter");
    await expect(teamButtons.nth(1)).toHaveAttribute("aria-expanded", "true");
    await expect(teamButtons.first()).toHaveAttribute("aria-expanded", "false");
  });
});
