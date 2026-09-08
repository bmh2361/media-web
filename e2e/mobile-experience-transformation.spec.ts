import { expect, test } from "@playwright/test";

const routes = [
  "/en",
  "/en/companies",
  "/en/partners",
  "/en/work",
  "/en/work/byd-bd11-london",
  "/en/how-we-work",
  "/en/about",
  "/en/contact"
];

const viewports = [
  { width: 360, height: 800 },
  { width: 375, height: 812 },
  { width: 390, height: 844 },
  { width: 393, height: 852 },
  { width: 430, height: 932 },
  { width: 768, height: 1024 }
];

test("mobile header and full-screen navigation form one accessible interaction", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en");
  const header = page.locator("header");
  const trigger = page.locator('button[aria-controls="mobile-navigation"]');

  await page.evaluate(() => window.scrollTo(0, 80));
  await expect(header).toHaveAttribute("data-mobile-compact", "true");
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("dialog", { name: "Open menu" })).toBeVisible();
  await expect(page.locator("#mobile-navigation nav a")).toHaveCount(7);
  expect(await page.locator("#mobile-navigation nav a").allTextContents()).toEqual([
    "01Home■",
    "02For Companies→",
    "03For Partners→",
    "04Case Studies→",
    "05How We Work→",
    "06About Us→",
    "07Contact→"
  ]);
  expect(await page.evaluate(() => getComputedStyle(document.body).overflow)).toBe("hidden");
  await page.keyboard.press("Escape");
  await expect(page.locator("#mobile-navigation")).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test("section progress is compact, current, and directly selectable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en");
  const progress = page.locator(".mobile-progress-navigation");
  await expect(progress).toBeAttached();
  await page.evaluate(() => window.scrollTo(0, 400));
  await expect(progress).toHaveAttribute("data-visible", "true");
  expect(await progress.locator("button").count()).toBeGreaterThan(4);
  await expect(progress.locator('button[aria-current="step"]')).toHaveCount(1);
  const target = progress.locator("button").nth(2);
  await target.click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(400);
});

test("four mobile journeys use the shared bounded sticky story", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const expectations: Array<[string, number]> = [
    ["/en/companies", 5],
    ["/en/partners", 5],
    ["/en/how-we-work", 5],
    ["/en/about", 3]
  ];
  for (const [route, count] of expectations) {
    await page.goto(route);
    const story = page.locator(".mobile-indexed-story").first();
    await expect(story.locator('[role="listitem"]')).toHaveCount(count);
    expect(
      await story.locator(".mobile-indexed-story__status").evaluate((node) => getComputedStyle(node).position)
    ).toBe("sticky");
    await expect(story.locator('[role="listitem"][data-active="true"]')).toHaveCount(1);
  }
});

test("case archive touch reveal and case-detail media remain spatially continuous", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en/work");
  const tierOne = page.locator('[data-work-tier="1"]');
  const rows = tierOne.locator("[data-mobile-case-row]");
  await rows.nth(0).locator("button").click();
  await expect(rows.nth(0).locator("button")).toHaveAttribute("aria-expanded", "true");
  await expect(rows.nth(0).locator("img")).toBeVisible();
  await rows.nth(1).locator("button").click();
  await expect(tierOne.locator('[data-mobile-case-row] button[aria-expanded="true"]')).toHaveCount(1);

  await page.goto("/en/work/byd-bd11-london");
  const firstEvidence = page.locator('[data-case-section="first-evidence"] [data-mobile-reveal]').first();
  await firstEvidence.scrollIntoViewIfNeeded();
  const box = await firstEvidence.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.width / 390).toBeGreaterThan(0.98);
});

test("reduced motion exposes all content and pauses carousel movement", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en/about");
  const portrait = page.locator("[data-portrait-frame]").first();
  await portrait.scrollIntoViewIfNeeded();
  expect(
    await portrait.evaluate((node) => ({
      clip: getComputedStyle(node).clipPath,
      opacity: getComputedStyle(node).opacity
    }))
  ).toEqual({ clip: "none", opacity: "1" });

  await page.goto("/en");
  await expect(page.locator("[data-home-media-system]")).toHaveAttribute("data-autoplay-paused", "true");
});

test("all core pages remain readable and overflow-free at every required mobile viewport", async ({
  page
}) => {
  const consoleIssues: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error" || message.type() === "warning") consoleIssues.push(message.text());
  });
  page.on("pageerror", (error) => consoleIssues.push(error.message));

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator("h1")).toBeVisible();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)
      ).toBeLessThanOrEqual(1);
    }
  }
  for (const route of ["/zh", "/zh/about"]) {
    await page.goto(route);
    await expect(page.locator("h1")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(
      1
    );
  }
  expect(consoleIssues).toEqual([]);
});

test("protected desktop keeps mobile systems out of layout", async ({ page }) => {
  for (const width of [1280, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/en/companies");
    await expect(page.locator(".mobile-indexed-story")).toBeHidden();
    await expect(page.locator(".mobile-progress-navigation")).toHaveCount(0);
    expect(await page.evaluate(() => document.body.dataset.mobileExperience ?? null)).toBeNull();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(
      1
    );
  }
});
