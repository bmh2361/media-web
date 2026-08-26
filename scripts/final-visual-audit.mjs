import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const base = process.env.AUDIT_BASE_URL || "http://127.0.0.1:3000";
const routes = [
  ["home-en", "/en"],
  ["companies-en", "/en/companies"],
  ["partners-en", "/en/partners"],
  ["work-zh", "/zh/work"],
  ["work-en", "/en/work"],
  ["how-we-work-en", "/en/how-we-work"],
  ["about-en", "/en/about"],
  ["contact-en", "/en/contact"],
  ["home-zh", "/zh"],
  ["companies-zh", "/zh/companies"],
  ["partners-zh", "/zh/partners"],
  ["how-we-work-zh", "/zh/how-we-work"],
  ["about-zh", "/zh/about"],
  ["contact-zh", "/zh/contact"]
];
const viewports = [
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 }
];
const out = "audit/about-team-motion-visual-upgrade";
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ headless: true });
const results = [];
for (const viewport of viewports) {
  const context = await browser.newContext({ viewport, reducedMotion: "reduce" });
  for (const [name, route] of routes) {
    const page = await context.newPage();
    const errors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
    await page
      .locator("[data-opening-overlay]")
      .waitFor({ state: "detached", timeout: 3000 })
      .catch(() => {});
    const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < pageHeight; y += viewport.height) {
      await page.evaluate((value) => window.scrollTo(0, value), y);
      await page.waitForTimeout(60);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(120);
    await page.screenshot({ path: `${out}/${name}-${viewport.width}-viewport.png` });
    await page.screenshot({ path: `${out}/${name}-${viewport.width}-full.png`, fullPage: true });
    const audit = await page.evaluate(() => {
      const root = document.documentElement;
      const forbidden = ["Placeholder", "Media Slot", "replacementNote", "lorem ipsum"];
      const bodyText = document.body.innerText;
      const overflow = [...document.querySelectorAll("body *")]
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return r.right > root.clientWidth + 1 || r.left < -1;
        })
        .slice(0, 12)
        .map((el) => ({
          tag: el.tagName,
          className: String(el.className).slice(0, 140),
          right: Math.round(el.getBoundingClientRect().right)
        }));
      const interactive = [...document.querySelectorAll("a,button,input,select,textarea,label")].filter(
        (el) => {
          const s = getComputedStyle(el);
          const r = el.getBoundingClientRect();
          return s.display !== "none" && s.visibility !== "hidden" && r.width > 0 && r.height > 0;
        }
      );
      return {
        scrollWidth: root.scrollWidth,
        clientWidth: root.clientWidth,
        scrollHeight: root.scrollHeight,
        overflow,
        h1Count: document.querySelectorAll("h1").length,
        brokenImages: [...document.images]
          .filter((img) => img.complete && img.naturalWidth === 0)
          .map((img) => img.currentSrc || img.src),
        missingAlt: [...document.images].filter((img) => !img.hasAttribute("alt")).length,
        forbidden: forbidden.filter((text) => bodyText.includes(text)),
        tinyTargets: interactive
          .filter((el) => {
            const r = el.getBoundingClientRect();
            return r.height < 44 && r.width < 44;
          })
          .slice(0, 15)
          .map((el) => ({
            tag: el.tagName,
            text: (el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 50),
            w: Math.round(el.getBoundingClientRect().width),
            h: Math.round(el.getBoundingClientRect().height)
          })),
        bodyFont: getComputedStyle(document.body).fontFamily,
        h1Font: document.querySelector("h1")
          ? getComputedStyle(document.querySelector("h1")).fontFamily
          : null,
        h1Size: document.querySelector("h1") ? getComputedStyle(document.querySelector("h1")).fontSize : null,
        h1LineHeight: document.querySelector("h1")
          ? getComputedStyle(document.querySelector("h1")).lineHeight
          : null
      };
    });
    results.push({ route, viewport, errors, ...audit });
    await page.close();
  }
  await context.close();
}
await browser.close();
await writeFile(`${out}/audit.json`, JSON.stringify(results, null, 2));
const failures = results.filter(
  (r) =>
    r.scrollWidth > r.clientWidth ||
    r.brokenImages.length ||
    r.errors.length ||
    r.h1Count !== 1 ||
    r.missingAlt
);
console.log(`Audited ${results.length} route/viewport combinations; ${failures.length} require attention.`);
for (const item of failures)
  console.log(item.route, item.viewport.width, {
    overflow: item.overflow,
    broken: item.brokenImages.length,
    errors: item.errors,
    h1: item.h1Count,
    missingAlt: item.missingAlt
  });
