import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";

const root = process.cwd();
const outputDir = path.join(root, "audit", "final-prelaunch");
const baseUrl = process.env.AUDIT_BASE_URL || "http://127.0.0.1:3340";
const routes = ["", "/companies", "/partners", "/work", "/how-we-work", "/about", "/contact", "/privacy", "/terms"];
const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1440, height: 1000 }
];

await fs.mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({ headless: true });
for (const language of ["en", "zh"]) {
  for (const route of routes) {
    for (const viewport of viewports) {
      const context = await browser.newContext({ viewport, reducedMotion: "reduce" });
      const page = await context.newPage();
      await page.goto(`${baseUrl}/${language}${route}`, { waitUntil: "networkidle", timeout: 30_000 });
      await page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += Math.max(500, innerHeight - 120)) {
          window.scrollTo(0, y);
          await new Promise((resolve) => setTimeout(resolve, 80));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(300);
      const routeName = route.replaceAll("/", "-").replace(/^-/, "") || "home";
      await page.screenshot({
        path: path.join(outputDir, `${language}-${routeName}-${viewport.name}.png`),
        fullPage: true,
        animations: "disabled"
      });
      await context.close();
    }
  }
}
await browser.close();
console.log("Captured 36 lazy-load-complete evidence screenshots.");
