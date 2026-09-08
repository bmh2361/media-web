import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { chromium } from "@playwright/test";

const root = process.cwd();
const port = 3320;
const base = `http://127.0.0.1:${port}`;
const fixtureDir = path.join(root, "audit", "performance", "fixtures");
const manifest = JSON.parse(await fs.readFile(path.join(fixtureDir, "manifest.json"), "utf8"));
const fixtureBytesByName = new Map(manifest.assets.map((asset) => [asset.name, asset.bytes]));
const server = spawn(
  process.execPath,
  [path.join(root, "scripts", "serve-static-export.mjs"), "--port", String(port)],
  { cwd: root, stdio: "inherit", env: process.env }
);
for (let attempt = 0; attempt < 80; attempt += 1) {
  try {
    const response = await fetch(`${base}/en`);
    if (response.ok) break;
  } catch {}
  if (attempt === 79) throw new Error("Performance audit server did not become ready.");
  await new Promise((resolve) => setTimeout(resolve, 250));
}

const scenarios = [
  { name: "fast-desktop", viewport: { width: 1440, height: 900 }, cpu: 1, latency: 0, down: -1 },
  { name: "mid-laptop", viewport: { width: 1280, height: 800 }, cpu: 2, latency: 40, down: 6_000_000 },
  { name: "mid-mobile-slow4g", viewport: { width: 390, height: 844 }, cpu: 4, latency: 150, down: 1_600_000 },
  {
    name: "reduced-data-motion",
    viewport: { width: 390, height: 844 },
    cpu: 4,
    latency: 150,
    down: 1_600_000,
    reduced: true
  }
];
const browser = await chromium.launch({ headless: true });
const results = [];
try {
  for (const scenario of scenarios) {
    const context = await browser.newContext({
      viewport: scenario.viewport,
      reducedMotion: scenario.reduced ? "reduce" : "no-preference"
    });
    const page = await context.newPage();
    const cdp = await context.newCDPSession(page);
    await cdp.send("Performance.enable");
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: scenario.cpu });
    if (scenario.down > 0)
      await cdp.send("Network.emulateNetworkConditions", {
        offline: false,
        latency: scenario.latency,
        downloadThroughput: scenario.down / 8,
        uploadThroughput: 750_000 / 8,
        connectionType: "cellular4g"
      });
    await page.addInitScript((saveData) => {
      Object.defineProperty(navigator, "connection", {
        configurable: true,
        value: { saveData, effectiveType: saveData ? "3g" : "4g" }
      });
      window.__phase7Metrics = {
        lcp: 0,
        cls: 0,
        inp: 0,
        longTasks: 0,
        longTaskDuration: 0
      };
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        window.__phase7Metrics.lcp = entries.at(-1)?.startTime ?? 0;
      }).observe({ type: "largest-contentful-paint", buffered: true });
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries())
          if (!entry.hadRecentInput) window.__phase7Metrics.cls += entry.value;
      }).observe({ type: "layout-shift", buffered: true });
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          window.__phase7Metrics.longTasks += 1;
          window.__phase7Metrics.longTaskDuration += entry.duration;
        }
      }).observe({ type: "longtask", buffered: true });
      try {
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries())
            if (entry.interactionId)
              window.__phase7Metrics.inp = Math.max(window.__phase7Metrics.inp, entry.duration);
        }).observe({ type: "event", buffered: true, durationThreshold: 16 });
      } catch {}
    }, Boolean(scenario.reduced));
    let imageRequest = 0;
    let videoRequest = 0;
    let simulatedFixtureBytes = 0;
    const fulfillMediaFixture = async (route) => {
      if (route.request().url().includes("video-placeholder")) {
        videoRequest += 1;
        simulatedFixtureBytes += manifest.simulatedVideo.bytes;
        await route.fulfill({
          path: path.join(fixtureDir, manifest.simulatedVideo.name),
          contentType: "video/mp4"
        });
        return;
      }
      imageRequest += 1;
      const fixture =
        imageRequest === 1
          ? scenario.viewport.width < 768
            ? "hero-mobile.webp"
            : "hero-desktop.webp"
          : `gallery-${String(((imageRequest - 2) % 12) + 1).padStart(2, "0")}.webp`;
      simulatedFixtureBytes += fixtureBytesByName.get(fixture) ?? 0;
      await route.fulfill({ path: path.join(fixtureDir, fixture), contentType: "image/webp" });
    };
    await page.route("**/_next/image**", fulfillMediaFixture);
    await page.route("**/media/placeholders/**", fulfillMediaFixture);
    await page.route("**/media/demo/**", fulfillMediaFixture);
    const started = Date.now();
    await page.goto(`${base}/en`, { waitUntil: "networkidle" });
    await page
      .locator("[data-opening-overlay]")
      .waitFor({ state: "detached", timeout: 3000 })
      .catch(() => {});
    const scrollFrameP95Ms = await page.evaluate(async () => {
      const samples = [];
      for (let index = 0; index < 12; index += 1) {
        const startedAt = performance.now();
        window.scrollBy({ top: 240, behavior: "auto" });
        await new Promise((resolve) =>
          requestAnimationFrame(() => {
            samples.push(performance.now() - startedAt);
            resolve();
          })
        );
      }
      samples.sort((left, right) => left - right);
      return samples[Math.ceil(samples.length * 0.95) - 1] ?? 0;
    });
    await page.waitForTimeout(200);
    const landingVitals = await page.evaluate(() => ({
      lcp: window.__phase7Metrics.lcp,
      cls: window.__phase7Metrics.cls
    }));
    let routeTransitionMs;
    if (scenario.viewport.width < 768) {
      await page.getByRole("button", { name: "Menu" }).click();
      const routeStarted = performance.now();
      await Promise.all([
        page.waitForURL("**/en/work"),
        page.getByRole("dialog", { name: "Menu" }).locator('a[href="/en/work"]').click()
      ]);
      routeTransitionMs = performance.now() - routeStarted;
    } else {
      const routeStarted = performance.now();
      await Promise.all([page.waitForURL("**/en/work"), page.locator('header a[href="/en/work"]').click()]);
      routeTransitionMs = performance.now() - routeStarted;
    }
    await page.waitForTimeout(500);
    const metrics = await page.evaluate(() => {
      const resources = performance.getEntriesByType("resource");
      const overflowingElements = [...document.querySelectorAll("body *")].filter((element) => {
        if (!(element instanceof HTMLElement || element instanceof SVGElement)) return false;
        if (element.closest(".mobile-progress-navigation")) return false;
        const style = getComputedStyle(element);
        if (style.display === "none" || style.visibility === "hidden" || Number(style.opacity) === 0)
          return false;
        const rect = element.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0 || rect.bottom <= 0 || rect.top >= innerHeight)
          return false;
        const insideHorizontalScroller = [...document.querySelectorAll("body *")].some((candidate) => {
          if (!(candidate instanceof HTMLElement) || !candidate.contains(element)) return false;
          const candidateStyle = getComputedStyle(candidate);
          return (
            ["auto", "scroll"].includes(candidateStyle.overflowX) &&
            candidate.scrollWidth > candidate.clientWidth
          );
        });
        if (insideHorizontalScroller) return false;
        return rect.left < -1 || rect.right > innerWidth + 1;
      });
      const brokenImages = [...document.images].filter(
        (image) => image.complete && image.naturalWidth === 0
      ).length;
      return {
        ...window.__phase7Metrics,
        visibleOverflow: overflowingElements.length,
        overflowTargets: overflowingElements.slice(0, 20).map((element) => ({
          tag: element.tagName.toLowerCase(),
          className: element.getAttribute("class") ?? "",
          marker: [...element.attributes].find((attribute) => attribute.name.startsWith("data-"))?.name ?? ""
        })),
        brokenImages,
        transferBytes: resources.reduce((total, entry) => total + (entry.transferSize || 0), 0),
        jsBytes: resources
          .filter((entry) => entry.name.includes("/_next/static/") && entry.name.endsWith(".js"))
          .reduce((total, entry) => total + (entry.transferSize || 0), 0),
        imageBytes: resources
          .filter((entry) => entry.initiatorType === "img")
          .reduce((total, entry) => total + (entry.transferSize || 0), 0)
      };
    });
    const heap = await cdp.send("Performance.getMetrics");
    results.push({
      scenario: scenario.name,
      viewport: scenario.viewport,
      navigationMs: Date.now() - started,
      routeTransitionMs: Math.round(routeTransitionMs),
      videoPayloadMs: null,
      simulatedVideoBytes: 0,
      scrollFrameP95Ms: Math.round(scrollFrameP95Ms * 10) / 10,
      ...metrics,
      ...landingVitals,
      jsHeapUsed: heap.metrics.find((metric) => metric.name === "JSHeapUsedSize")?.value ?? null,
      fixtureRequests: imageRequest + videoRequest,
      fixtureImageRequests: imageRequest,
      fixtureVideoRequests: videoRequest,
      simulatedFixtureBytes
    });
    await context.close();
  }
} finally {
  await browser.close();
  server.kill();
}

const output = {
  generatedAt: new Date().toISOString(),
  fixtureManifest: manifest,
  results,
  thresholds: {
    mobileLcpMs: 2500,
    cls: 0.1,
    inpMs: 200,
    routeTransitionMs: 800,
    visibleOverflow: 0,
    brokenImages: 0
  }
};
output.violations = results.flatMap((result) => {
  const violations = [];
  if (result.viewport.width < 768 && result.lcp > output.thresholds.mobileLcpMs)
    violations.push(`LCP ${Math.round(result.lcp)}ms`);
  if (result.cls > output.thresholds.cls) violations.push(`CLS ${result.cls}`);
  if (result.inp > output.thresholds.inpMs) violations.push(`INP ${Math.round(result.inp)}ms`);
  if (result.routeTransitionMs > output.thresholds.routeTransitionMs)
    violations.push(`route transition ${result.routeTransitionMs}ms`);
  if (result.visibleOverflow > output.thresholds.visibleOverflow)
    violations.push(`visible overflow ${result.visibleOverflow}`);
  if (result.brokenImages > output.thresholds.brokenImages)
    violations.push(`broken images ${result.brokenImages}`);
  return violations.map((detail) => ({ scenario: result.scenario, detail }));
});
await fs.writeFile(
  path.join(root, "audit", "performance", "phase-7-results.json"),
  JSON.stringify(output, null, 2)
);
console.log(JSON.stringify(output, null, 2));
if (output.violations.length) process.exitCode = 1;
