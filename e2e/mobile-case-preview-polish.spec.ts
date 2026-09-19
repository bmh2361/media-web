import { expect, test, type Page } from "@playwright/test";

const activeButton = (page: Page) => page.locator('[data-mobile-case-row] button[aria-expanded="true"]');
const row = (page: Page, index: number) => page.locator("[data-mobile-case-row]").nth(index);

async function placeAnchor(page: Page, index: number, ratio = 0.46) {
  await page.evaluate(
    ({ targetIndex, targetRatio }) => {
      const anchor = document.querySelectorAll<HTMLElement>("[data-mobile-case-anchor]")[targetIndex];
      if (!anchor) throw new Error(`Missing mobile case anchor ${targetIndex}`);
      const point =
        anchor.getBoundingClientRect().top + Math.min(48, anchor.getBoundingClientRect().height * 0.35);
      window.scrollBy({ top: point - innerHeight * targetRatio, behavior: "auto" });
    },
    { targetIndex: index, targetRatio: ratio }
  );
}

test.beforeEach(async ({ page }, testInfo) => {
  if (testInfo.title.includes("desktop preview")) return;
  test.skip(testInfo.project.name !== "mobile");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en/work");
});

test("candidate dwell filters incidental movement and direct tap overrides immediately", async ({ page }) => {
  const list = page.locator("[data-mobile-case-list]");
  await expect(list).toHaveAttribute("data-candidate-dwell-ms", "210");
  await expect(list).toHaveAttribute("data-transition-lock-ms", "380");

  await row(page, 3).locator("button").click();
  await expect(row(page, 3).locator("button")).toHaveAttribute("aria-expanded", "true");

  await page.waitForTimeout(420);
  await placeAnchor(page, 4);
  await page.waitForTimeout(120);
  await expect(row(page, 3).locator("button")).toHaveAttribute("aria-expanded", "true");
  await expect
    .poll(async () => row(page, 4).locator("button").getAttribute("aria-expanded"), { timeout: 1200 })
    .toBe("true");
});

test("tiny forward and backward corrections retain the explicitly active case", async ({ page }) => {
  await row(page, 3).locator("button").click();
  await page.waitForTimeout(420);
  await page.evaluate(() => window.scrollBy({ top: 48, behavior: "auto" }));
  await page.waitForTimeout(500);
  await expect(row(page, 3).locator("button")).toHaveAttribute("aria-expanded", "true");

  await row(page, 4).locator("button").click();
  await page.waitForTimeout(420);
  await page.evaluate(() => window.scrollBy({ top: -48, behavior: "auto" }));
  await page.waitForTimeout(500);
  await expect(row(page, 4).locator("button")).toHaveAttribute("aria-expanded", "true");
});

test("active preview body retains ownership while its media and role are read", async ({ page }) => {
  await row(page, 2).locator("button").click();
  await page.waitForTimeout(420);
  await row(page, 2).locator("[data-mobile-case-meta]").scrollIntoViewIfNeeded();
  await page.waitForTimeout(650);
  await expect(row(page, 2).locator("button")).toHaveAttribute("aria-expanded", "true");
  await expect(activeButton(page)).toHaveCount(1);

  await placeAnchor(page, 3);
  await expect
    .poll(async () => row(page, 3).locator("button").getAttribute("aria-expanded"), { timeout: 1200 })
    .toBe("true");
});

test("rapid flick suppresses sequential intermediate activations", async ({ page }) => {
  await row(page, 0).locator("button").click();
  await page.evaluate(() => {
    const list = document.querySelector("[data-mobile-case-list]");
    const history: string[] = [];
    const record = () => {
      const active = document.querySelector<HTMLElement>('[data-mobile-case-anchor][aria-expanded="true"]');
      const slug = active?.dataset.mobileCaseAnchor;
      if (slug && history.at(-1) !== slug) history.push(slug);
    };
    record();
    new MutationObserver(record).observe(list!, {
      attributes: true,
      subtree: true,
      attributeFilter: ["aria-expanded"]
    });
    (window as Window & { __caseActivationHistory?: string[] }).__caseActivationHistory = history;
  });

  await placeAnchor(page, 4);
  // Sample throughout the same deadline: default poll backoff can jump from
  // 850 ms past 1500 ms while the CSS smooth scroll is still settling.
  await expect
    .poll(async () => row(page, 4).locator("button").getAttribute("aria-expanded"), {
      timeout: 1500,
      intervals: [50]
    })
    .toBe("true");
  const history = await page.evaluate(
    () => (window as Window & { __caseActivationHistory?: string[] }).__caseActivationHistory ?? []
  );
  expect(history.length).toBeLessThanOrEqual(2);
  expect(history.at(-1)).toBe(await row(page, 4).getAttribute("data-mobile-case-row"));
});

test("an intermediate stop remains stable without snap or oscillation", async ({ page }) => {
  await row(page, 2).locator("button").click();
  await page.waitForTimeout(420);
  const before = await activeButton(page).getAttribute("data-mobile-case-anchor");
  await page.evaluate(() => window.scrollBy({ top: 72, behavior: "auto" }));
  await page.waitForTimeout(700);
  await expect(activeButton(page)).toHaveCount(1);
  expect(await activeButton(page).getAttribute("data-mobile-case-anchor")).toBe(before);
  await expect(page.locator("html")).not.toHaveCSS("scroll-snap-type", /mandatory/);
});

test("reduced motion preserves the stable activation model", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await row(page, 3).locator("button").click();
  await expect(row(page, 3).locator("button")).toHaveAttribute("aria-expanded", "true");
  await expect(row(page, 3).locator("[data-mobile-case-media]")).toBeVisible();
  await page.evaluate(() => window.scrollBy({ top: 45, behavior: "auto" }));
  await page.waitForTimeout(450);
  await expect(row(page, 3).locator("button")).toHaveAttribute("aria-expanded", "true");
});

test("desktop preview interaction remains unchanged", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop");
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/en/work");
  await expect(page.locator("[data-mobile-case-list]")).toBeHidden();
  await page.locator("[data-case-row]").nth(2).hover();
  await expect(page.locator("[data-case-row]").nth(2)).toHaveAttribute("data-active-case", "true");
  await expect(page.locator("[data-case-preview]")).toBeVisible();
});
