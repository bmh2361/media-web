import { chromium } from "playwright";
import { writeFile, mkdir } from "node:fs/promises";
const base = process.env.MOTION_AUDIT_URL ?? "http://127.0.0.1:3231",
  routes = [
    "/en",
    "/en/services",
    "/en/work",
    "/en/industries",
    "/en/about",
    "/en/services/commercial-production",
    "/en/services/events-exhibitions",
    "/en/services/research-innovation"
  ],
  urls = new Set(),
  browser = await chromium.launch({ headless: true }),
  page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
page.on("request", (request) => {
  const decoded = decodeURIComponent(request.url());
  const match = decoded.match(/\/media\/demo\/[^?&]+/);
  if (match) urls.add(match[0]);
});
for (const route of routes) {
  await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
  for (let i = 0; i < 8; i++) {
    await page.mouse.wheel(0, 900);
    await page.waitForTimeout(120);
  }
}
await browser.close();
await mkdir("audit/motion-correction", { recursive: true });
const result = { routes, requested: [...urls].sort() };
await writeFile("audit/motion-correction/demo-media-requests.json", JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
