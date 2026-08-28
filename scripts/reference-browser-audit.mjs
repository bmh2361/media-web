import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
const sites = [
  ["Builders Club", "https://builders-club.com/"],
  ["Blinkink", "https://www.blinkink.co.uk/"],
  ["Stink Films", "https://stinkfilms.com/"],
  ["Tendril", "https://tendril.ca/"],
  ["Panoply", "https://panoply.co.uk/"],
  ["Studio Dumbar", "https://studiodumbar.com/"],
  ["PORTO ROCHA", "https://www.portorocha.com/"],
  ["Base Design", "https://www.basedesign.com/"],
  ["Accept & Proceed", "https://www.acceptandproceed.com/"],
  ["Uncommon", "https://www.uncommon.studio/"],
  ["Modem", "https://modemworks.com/"],
  ["Art&Graft", "https://artandgraft.com/"],
  ["DIVISION", "https://division.global/"],
  ["Hylink UK", "https://www.hylink.co.uk/"],
  ["Viro Media", "https://www.viromedia.co.uk/"]
];
await mkdir("audit/motion-correction/references", { recursive: true });
const browser = await chromium.launch({ headless: true }),
  results = [];
for (const [name, url] of sites) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } }),
    page = await context.newPage(),
    started = Date.now();
  let error = null;
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });
    await page.waitForTimeout(1600);
    const before = await page.evaluate(() => ({
      height: document.documentElement.scrollHeight,
      images: [...document.images].length,
      loaded: [...document.images].filter((x) => x.complete).length,
      overflow: document.documentElement.scrollWidth > innerWidth,
      transitions: [...document.querySelectorAll("*")]
        .slice(0, 500)
        .map((x) => getComputedStyle(x).transitionDuration)
        .filter((x) => x !== "0s")
        .slice(0, 8)
    }));
    for (let i = 0; i < 5; i++) {
      await page.mouse.wheel(0, 700);
      await page.waitForTimeout(300);
    }
    await page.screenshot({
      path: `audit/motion-correction/references/${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.png`
    });
    results.push({
      name,
      url,
      status: await page.title(),
      loadMs: Date.now() - started,
      ...before,
      scrollY: await page.evaluate(() => scrollY),
      error
    });
  } catch (e) {
    error = String(e);
    results.push({ name, url, error });
  }
  await context.close();
}
await browser.close();
await writeFile("audit/motion-correction/reference-browser-audit.json", JSON.stringify(results, null, 2));
console.log(
  JSON.stringify(
    results.map((x) => ({ name: x.name, error: x.error ?? null, loadMs: x.loadMs })),
    null,
    2
  )
);
