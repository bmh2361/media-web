import { expect, test } from "@playwright/test";

test("edge progress rail stays at the viewport edge with count-only visual feedback", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en");
  await page.evaluate(() => window.scrollTo(0, 900));

  const rail = page.locator(".mobile-progress-navigation");
  await expect(rail).toHaveAttribute("data-visible", "true");
  const box = await rail.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.width).toBeLessThanOrEqual(44);
  expect(390 - (box!.x + box!.width)).toBeLessThanOrEqual(1);
  expect(
    await rail.locator(".mobile-progress-track").evaluate((node) => getComputedStyle(node).height)
  ).not.toBe("1px");
  const current = rail.locator('button[aria-current="step"]');
  const context = rail.locator(".mobile-progress-context");
  await expect(current).toHaveCount(1);
  await expect(current).toHaveAttribute("aria-label", /^Go to /);
  await current.focus();
  await expect(context).toBeVisible();
  await expect(context).toHaveText(/^\d{2} \/ \d{2}$/);
  await expect(context.locator(":scope > span")).toHaveCount(1);
  expect((await context.boundingBox())!.width).toBeLessThanOrEqual(64);
});

test("only three journey systems use continuous scroll-linked state", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile");
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ["/en/companies", "/en/partners", "/en/how-we-work"]) {
    await page.goto(route);
    const story = page.locator('.mobile-indexed-story[data-scroll-linked="true"]');
    await expect(story).toHaveCount(1);
    await story.scrollIntoViewIfNeeded();
    const before = await story.evaluate((node) =>
      getComputedStyle(node).getPropertyValue("--story-progress")
    );
    await page.mouse.wheel(0, 700);
    await expect
      .poll(() => story.evaluate((node) => getComputedStyle(node).getPropertyValue("--story-progress")))
      .not.toBe(before);
    await expect(story.locator('[aria-current="step"]')).toHaveCount(1);
    if (route === "/en/how-we-work") {
      expect(
        await story
          .locator('[role="listitem"]')
          .first()
          .evaluate((node) => (node as HTMLElement).offsetHeight)
      ).toBeLessThanOrEqual(432);
    }
  }

  await page.goto("/en/about");
  await expect(page.locator('.mobile-indexed-story[data-scroll-linked="true"]')).toHaveCount(0);
});

test("home exposes distinct full-bleed, touch-rail, dark-grid and compact-proof compositions", async ({
  page
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en");
  const proof = page.locator("[data-home-proof-grid]");
  const journey = page.locator("[data-home-journey-rail]");
  await expect(proof).toHaveCSS("overflow-x", "auto");
  await expect(journey).toHaveCSS("overflow-x", "auto");
  expect((await proof.boundingBox())!.width / 390).toBeGreaterThan(0.98);
  await expect(page.locator("[data-home-model-grid]")).toHaveCSS("grid-template-columns", /.+ .+/);
  await expect(page.locator("[data-home-participant-grid]")).toHaveCSS("grid-template-columns", /.+ .+/);
});

test("case archive activates one project through scroll, tap and focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en/work");
  const tierOne = page.locator('[data-work-tier="1"]');
  const rows = tierOne.locator("[data-mobile-case-row]");
  await rows.nth(2).scrollIntoViewIfNeeded();
  await expect
    .poll(() => tierOne.locator('[data-mobile-case-row] button[aria-expanded="true"]').count())
    .toBe(1);
  await rows.nth(2).locator("button").focus();
  await expect(rows.nth(2).locator("button")).toHaveAttribute("aria-expanded", "true");
  await rows.nth(1).locator("button").click();
  await expect(rows.nth(1).locator("button")).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("[data-case-filters]")).toHaveCount(0);
});

test("team is a native semantic swipe rail on phones and stays a desktop grid", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en/about");
  const rail = page.locator("[data-team-rail]");
  await rail.scrollIntoViewIfNeeded();
  await expect(rail).toHaveCSS("overflow-x", "auto");
  expect((await rail.locator("[data-team-member]").first().boundingBox())!.width / 390).toBeGreaterThan(0.82);
  await expect(page.locator(".team-mobile-progress")).toBeVisible();
  await page.locator(".team-mobile-progress button").nth(1).click();
  await expect(page.locator('.team-mobile-progress button[aria-current="true"]')).toHaveCount(1);

  await page.setViewportSize({ width: 1280, height: 900 });
  await page.reload();
  await expect(page.locator(".team-mobile-progress")).toBeHidden();
  await expect(rail).toHaveCSS("display", "grid");
});

test("mobile contact exposes direct channels without a server-dependent form", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en/contact");
  const contact = page.locator('[data-contact-delivery="direct-only"]');
  await expect(contact).toBeVisible();
  await expect(contact).toContainText("Venusbridge");
  await expect(contact.getByRole("link", { name: "venusbridge.co.uk@gmail.com" })).toHaveAttribute(
    "href",
    "mailto:venusbridge.co.uk@gmail.com"
  );
  await expect(page.locator("form")).toHaveCount(0);
  await expect(page.getByRole("button", { name: /Send|Submit/i })).toHaveCount(0);
});

test("reduced motion keeps transformed information visible without running scroll-linked fills", async ({
  page
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en/how-we-work");
  const story = page.locator('.mobile-indexed-story[data-scroll-linked="true"]');
  const opacities = await story
    .locator('[role="listitem"]')
    .evaluateAll((nodes) => nodes.map((node) => Number(getComputedStyle(node).opacity)));
  expect(Math.min(...opacities)).toBeGreaterThanOrEqual(0.6);
  const translation = await story
    .locator('[role="listitem"]')
    .first()
    .evaluate((node) => {
      const value = getComputedStyle(node).transform;
      const matrix = value === "none" ? new DOMMatrix() : new DOMMatrix(value);
      return { x: matrix.e, y: matrix.f };
    });
  expect(translation).toEqual({ x: 0, y: 0 });
});
