import { expect, test } from "@playwright/test";

test("team profiles keep semantic order, 4:5 portraits and role-first fields", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/en/about");

  const members = page.locator("[data-team-member]");
  await expect(members).toHaveCount(5);
  expect(await members.evaluateAll((items) => items.map((item) => item.getAttribute("data-team-member")))).toEqual([
    "minghan",
    "vivian",
    "richard-bussmann",
    "patrick-lenihan",
    "fei-cao"
  ]);

  for (let index = 0; index < 5; index += 1) {
    const frame = members.nth(index).locator("[data-portrait-frame]");
    const box = await frame.boundingBox();
    expect(box).not.toBeNull();
    expect(Math.abs((box!.width / box!.height) - 0.8)).toBeLessThan(0.02);
    await expect(frame.locator("img")).toHaveCount(1);
    await expect(members.nth(index).locator("p")).not.toHaveCount(0);
  }
});

test("team grid remains intentional with eight members", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/en/about");
  const grid = page.locator("[data-team-grid]");

  await grid.evaluate((node) => {
    const core = [...node.querySelectorAll<HTMLElement>('[data-team-tier="core"]')];
    core.forEach((member, index) => {
      const clone = member.cloneNode(true) as HTMLElement;
      clone.dataset.teamMember = `layout-simulation-${index + 6}`;
      node.appendChild(clone);
    });
  });

  const members = grid.locator("[data-team-member]");
  await expect(members).toHaveCount(8);
  const boxes = await members.evaluateAll((items) => items.map((item) => item.getBoundingClientRect().toJSON()));
  expect(Math.abs(boxes[0].y - boxes[1].y)).toBeLessThan(2);
  expect(Math.abs(boxes[2].y - boxes[3].y)).toBeLessThan(2);
  expect(Math.abs(boxes[3].y - boxes[4].y)).toBeLessThan(2);
  expect(Math.abs(boxes[5].y - boxes[6].y)).toBeLessThan(2);
  expect(Math.abs(boxes[6].y - boxes[7].y)).toBeLessThan(2);
  expect(Math.abs(boxes[2].width - boxes[7].width)).toBeLessThan(2);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
});

test("homepage carousel autoplays, pauses and resets after direct selection", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/en");

  const system = page.locator("[data-home-media-system]");
  const viewport = system.locator("[data-home-media-viewport]");
  const indicators = system.locator("[data-carousel-indicator]");

  await expect(system).toHaveAttribute("data-autoplay-interval", "6000");
  await expect(indicators).toHaveCount(5);
  const initial = await system.getAttribute("data-carousel-active");
  await expect.poll(() => system.getAttribute("data-carousel-active"), { timeout: 7500 }).not.toBe(initial);

  await indicators.nth(3).click();
  await expect(system).toHaveAttribute("data-carousel-active", "3");
  await page.waitForTimeout(3000);
  await expect(system).toHaveAttribute("data-carousel-active", "3");

  await viewport.hover();
  await expect(system).toHaveAttribute("data-autoplay-paused", "true");
  await page.waitForTimeout(6200);
  await expect(system).toHaveAttribute("data-carousel-active", "3");
  await page.mouse.move(2, 2);
  await expect(system).not.toHaveAttribute("data-autoplay-paused", "true");

  await indicators.nth(1).click();
  await page.locator("footer").scrollIntoViewIfNeeded();
  await expect(system).toHaveAttribute("data-autoplay-paused", "true");
  await page.waitForTimeout(6200);
  await expect(system).toHaveAttribute("data-carousel-active", "1");

  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", { configurable: true, get: () => true });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(system).toHaveAttribute("data-autoplay-paused", "true");
});

test("mobile swipe and reduced motion remain accessible", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en");
  const system = page.locator("[data-home-media-system]");

  await system.dispatchEvent("pointerdown", { pointerId: 1, pointerType: "touch", clientX: 340 });
  await system.dispatchEvent("pointerup", { pointerId: 1, pointerType: "touch", clientX: 40 });
  await expect(system).toHaveAttribute("data-carousel-active", "1");

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await expect(system).toHaveAttribute("data-autoplay-paused", "true");
  const active = await system.getAttribute("data-carousel-active");
  await page.waitForTimeout(6200);
  await expect(system).toHaveAttribute("data-carousel-active", active ?? "0");
});

test("refined pages remain clean in the production console", async ({ page }) => {
  const messages: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error" || message.type() === "warning") messages.push(message.text());
  });
  page.on("pageerror", (error) => messages.push(error.message));

  await page.goto("/en");
  const indicators = page.locator("[data-carousel-indicator]");
  for (let index = 0; index < 5; index += 1) {
    await indicators.nth(index).click();
    await expect(page.locator("[data-home-media-viewport] img")).toHaveCount(1);
  }
  await page.goto("/en/about");
  await expect(page.locator("[data-team-member] img")).toHaveCount(5);
  expect(messages).toEqual([]);
});
