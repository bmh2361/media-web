import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { chromium, firefox, webkit } from "@playwright/test";

const root = process.cwd();
const port = 3330;
const base = `http://127.0.0.1:${port}`;
const out = path.join(root, "audit", "phase-7-browser-qa");
await fs.mkdir(out, { recursive: true });
const server = spawn(
  process.execPath,
  [path.join(root, "node_modules", "next", "dist", "bin", "next"), "start", "-p", String(port)],
  { cwd: root, stdio: "inherit", env: process.env }
);
for (let attempt = 0; attempt < 80; attempt += 1) {
  try {
    const response = await fetch(`${base}/en`);
    if (response.ok) break;
  } catch {}
  if (attempt === 79) throw new Error("Browser QA server did not become ready.");
  await new Promise((resolve) => setTimeout(resolve, 250));
}

const engines = { chromium, firefox, webkit };
const viewports = [
  [320, 568],
  [360, 800],
  [375, 812],
  [390, 844],
  [430, 932],
  [768, 1024],
  [1024, 768],
  [1280, 800],
  [1440, 900],
  [1920, 1080]
];
const routes = [
  "/en",
  "/zh",
  "/en/work",
  "/en/services/commercial-production",
  "/en/talent",
  "/en/services/events-exhibitions",
  "/en/for-agencies",
  "/en/services/research-innovation",
  "/en/contact"
];
const results = [];
const issues = [];
try {
  for (const [engineName, engine] of Object.entries(engines)) {
    const browser = await engine.launch({ headless: true });
    try {
      console.log(`Auditing ${engineName}...`);
      for (const [width, height] of viewports) {
        const context = await browser.newContext({
          viewport: { width, height },
          reducedMotion: "reduce",
          hasTouch: width < 600
        });
        const routesForViewport = width === 390 || width === 1440 ? routes : ["/en"];
        for (const route of routesForViewport) {
          const page = await context.newPage();
          const errors = [];
          page.on("console", (message) => {
            if (message.type() === "error") errors.push(message.text());
          });
          page.on("pageerror", (error) => errors.push(error.message));
          const response = await page.goto(`${base}${route}`, {
            waitUntil: "domcontentloaded",
            timeout: 15000
          });
          const audit = await page.evaluate(() => ({
            width: document.documentElement.clientWidth,
            scrollWidth: document.documentElement.scrollWidth,
            h1: document.querySelectorAll("h1").length,
            main: document.querySelectorAll("main").length,
            missingAlt: [...document.images].filter((image) => !image.hasAttribute("alt")).length,
            lang: document.documentElement.lang
          }));
          const record = {
            engine: engineName,
            viewport: { width, height },
            route,
            status: response?.status(),
            errors,
            ...audit
          };
          results.push(record);
          if (
            record.status !== 200 ||
            record.scrollWidth > record.width ||
            record.h1 !== 1 ||
            record.main !== 1 ||
            record.missingAlt ||
            errors.length
          )
            issues.push(record);
          if (route === "/en" && (width === 390 || width === 1440)) {
            await page.waitForTimeout(350);
            await page.screenshot({
              path: path.join(out, `${engineName}-home-${width}.png`),
              fullPage: false,
              animations: "disabled"
            });
          }
          await page.close();
        }
        await context.close();
      }

      const interactionContext = await browser.newContext({
        viewport: { width: 390, height: 844 },
        hasTouch: true
      });
      const interaction = await interactionContext.newPage();
      await interaction.goto(`${base}/en`);
      await interaction.getByRole("button", { name: "Menu" }).click();
      const menuVisible = await interaction.getByRole("dialog", { name: "Menu" }).isVisible();
      await interaction.keyboard.press("Escape");
      await interaction.getByRole("dialog", { name: "Menu" }).waitFor({ state: "detached" });
      const menuClosed = (await interaction.getByRole("dialog", { name: "Menu" }).count()) === 0;
      await interaction.goto(`${base}/en/contact?brief=quick`);
      await interaction.locator("footer").scrollIntoViewIfNeeded();
      await Promise.all([
        interaction.waitForURL(
          (url) => url.pathname === "/zh/contact" && url.searchParams.get("brief") === "quick"
        ),
        interaction.locator("footer a[href*='/zh/contact']").click()
      ]);
      const languagePreserved =
        new URL(interaction.url()).pathname === "/zh/contact" &&
        new URL(interaction.url()).searchParams.get("brief") === "quick";
      results.push({
        engine: engineName,
        interaction: { menuVisible, menuClosed, languagePreserved }
      });
      if (!menuVisible || !menuClosed || !languagePreserved)
        issues.push({ engine: engineName, interaction: { menuVisible, menuClosed, languagePreserved } });
      await interactionContext.close();
      console.log(`${engineName} complete.`);
    } finally {
      await browser.close();
    }
  }
} finally {
  server.kill();
}

await fs.writeFile(
  path.join(out, "results.json"),
  JSON.stringify({ generatedAt: new Date().toISOString(), results, issues }, null, 2)
);
console.log(`Phase 7 browser QA: ${results.length} checks, ${issues.length} issues.`);
if (issues.length) {
  console.error(JSON.stringify(issues.slice(0, 20), null, 2));
  process.exit(1);
}
