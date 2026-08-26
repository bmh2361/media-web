import { chromium } from "playwright";
import { mkdir, copyFile, writeFile } from "node:fs/promises";
const base = process.env.MOTION_AUDIT_URL ?? "http://127.0.0.1:3224",
  out = "audit/motion-correction",
  raw = `${out}/raw-video`,
  only = process.env.MOTION_SCENARIO;
await mkdir(raw, { recursive: true });
const browser = await chromium.launch({ headless: true }),
  manifest = [];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function scrollHuman(page, total, steps = 10, delay = 420) {
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, total / steps);
    await sleep(delay);
  }
}
async function record({
  scenario,
  route = "/en",
  viewport = { width: 1440, height: 1000 },
  mobile = false,
  reduced = false,
  minSeconds,
  actions,
  run
}) {
  const context = await browser.newContext({
      viewport,
      isMobile: mobile,
      hasTouch: mobile,
      reducedMotion: reduced ? "reduce" : "no-preference",
      recordVideo: { dir: raw, size: viewport }
    }),
    page = await context.newPage(),
    started = Date.now();
  await run(page, context);
  const elapsed = (Date.now() - started) / 1000;
  if (elapsed < minSeconds) await sleep((minSeconds - elapsed) * 1000);
  await page.screenshot({ path: `${out}/${scenario}.png` });
  const video = page.video();
  await context.close();
  const source = await video.path(),
    target = `${out}/${scenario}.webm`;
  await copyFile(source, target);
  const duration = Math.max(minSeconds, (Date.now() - started) / 1000);
  if (duration < minSeconds) throw new Error(`${scenario} shorter than ${minSeconds}s`);
  manifest.push({
    scenario,
    route,
    viewport,
    duration: Number(duration.toFixed(1)),
    actions,
    expectedStates: actions,
    outputPath: target
  });
}
async function homeOpening() {
  await record({
    scenario: "01-home-opening",
    minSeconds: 9,
    actions: ["first-session opening", "coordinated hero", "proof strip"],
    run: async (p) => {
      await p.goto(`${base}/en`, { waitUntil: "networkidle" });
      await sleep(3800);
      await scrollHuman(p, 520, 4, 550);
      await sleep(2200);
    }
  });
}
async function homeScroll() {
  await record({
    scenario: "02-home-continuous-scroll",
    minSeconds: 22,
    actions: ["hero", "proof", "capability 0-2", "selected work"],
    run: async (p) => {
      await p.addInitScript(() => sessionStorage.setItem("vbm-opening-seen", "1"));
      await p.goto(`${base}/en`);
      await scrollHuman(p, 4400, 22, 650);
    }
  });
}
async function capabilityScene() {
  await record({
    scenario: "03-capability-scroll",
    minSeconds: 18,
    actions: ["scroll only active 0", "scroll only active 1", "scroll only active 2", "scroll only active 3"],
    run: async (p) => {
      await p.addInitScript(() => sessionStorage.setItem("vbm-opening-seen", "1"));
      await p.goto(`${base}/en`);
      await p.locator('[data-capability-step="0"]').scrollIntoViewIfNeeded();
      for (const i of [0, 1, 2, 3]) {
        await p.locator(`[data-capability-step="${i}"]`).scrollIntoViewIfNeeded();
        await p.mouse.wheel(0, 180);
        await sleep(3200);
      }
    }
  });
}
async function selectedWork() {
  await record({
    scenario: "04-selected-work",
    minSeconds: 14,
    actions: ["hover 0-2", "keyboard focus", "two-layer transition"],
    run: async (p) => {
      await p.addInitScript(() => sessionStorage.setItem("vbm-opening-seen", "1"));
      await p.goto(`${base}/en`);
      await p.locator('[data-project-index="0"]').scrollIntoViewIfNeeded();
      for (const i of [0, 1, 2]) {
        await p.locator(`[data-project-index="${i}"]`).hover();
        await sleep(2200);
      }
      await p.locator('[data-project-index="0"] a').focus();
      await sleep(2200);
    }
  });
}
async function routeTransition() {
  await record({
    scenario: "05-route-transition",
    minSeconds: 12,
    actions: [
      "internal capability link to commercial production",
      "header link to project models",
      "browser back"
    ],
    run: async (p) => {
      await p.addInitScript(() => sessionStorage.setItem("vbm-opening-seen", "1"));
      await p.goto(`${base}/en`);
      const capability = p.locator('[data-capability-step="0"]');
      await capability.scrollIntoViewIfNeeded();
      await capability.getByRole("link", { name: "Explore service" }).click();
      await p.waitForURL("**/en/services/commercial-production");
      await sleep(2300);
      await p.getByRole("link", { name: "Project Models" }).first().click();
      await p.waitForURL("**/en/work");
      await sleep(2300);
      await p.goBack();
      await p.waitForURL("**/en/services/commercial-production");
      await sleep(2600);
    }
  });
}
async function mediaLoading() {
  await record({
    scenario: "06-media-loading",
    minSeconds: 10,
    actions: ["1200ms delayed image", "loading preview", "loaded curtain reveal"],
    run: async (p) => {
      await p.route(/_next\/image/, async (route) => {
        await sleep(1200);
        await route.continue();
      });
      await p.goto(`${base}/en`, { waitUntil: "domcontentloaded" });
      await p
        .locator('[data-media-id="home-hero-primary"]')
        .screenshot({ path: `${out}/media-loading-before.png` });
      await sleep(700);
      await p
        .locator('[data-media-id="home-hero-primary"]')
        .screenshot({ path: `${out}/media-loading-mid.png` });
      await sleep(2600);
      await p
        .locator('[data-media-id="home-hero-primary"]')
        .screenshot({ path: `${out}/media-loading-after.png` });
      await sleep(3500);
    }
  });
}
async function industryRail() {
  await record({
    scenario: "07-industry-rail",
    minSeconds: 12,
    actions: ["continuous sector rail", "hover pause", "no client-logo implication"],
    run: async (p) => {
      await p.addInitScript(() => sessionStorage.setItem("vbm-opening-seen", "1"));
      await p.goto(`${base}/en`);
      const section = p.locator("section:has(.industry-rail)");
      await section.scrollIntoViewIfNeeded();
      await sleep(4500);
      await section.hover();
      await sleep(4500);
    }
  });
}
async function mobileHome() {
  await record({
    scenario: "08-mobile-home",
    viewport: { width: 390, height: 844 },
    mobile: true,
    minSeconds: 20,
    actions: ["mobile hero", "natural capability cards", "selected work cards"],
    run: async (p) => {
      await p.addInitScript(() => sessionStorage.setItem("vbm-opening-seen", "1"));
      await p.goto(`${base}/zh`);
      await scrollHuman(p, 4800, 24, 620);
    }
  });
}
async function reducedPass() {
  for (const [scenario, viewport, mobile] of [
    ["09-reduced-desktop", { width: 1440, height: 1000 }, false],
    ["10-reduced-mobile", { width: 390, height: 844 }, true]
  ])
    await record({
      scenario,
      viewport,
      mobile,
      reduced: true,
      minSeconds: 8,
      actions: ["no intro block", "static industry rail", "no parallax"],
      run: async (p) => {
        await p.goto(`${base}/en`);
        await sleep(2000);
        await scrollHuman(p, 3900, 10, 380);
      }
    });
}
const tasks = {
  opening: homeOpening,
  scroll: homeScroll,
  capability: capabilityScene,
  work: selectedWork,
  route: routeTransition,
  loading: mediaLoading,
  industry: industryRail,
  mobile: mobileHome,
  reduced: reducedPass
};
if (only) await tasks[only]();
else for (const task of Object.values(tasks)) await task();
await browser.close();
await writeFile(`${out}/scenarios-${only ?? "all"}.json`, JSON.stringify(manifest, null, 2));
console.log(JSON.stringify(manifest, null, 2));
