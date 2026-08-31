const origin = new URL(process.env.SMOKE_ORIGIN || "https://www.venusbridge.co.uk");
if (origin.protocol !== "https:") throw new Error("SMOKE_ORIGIN must use HTTPS.");
const paths = [
  "/en",
  "/zh",
  "/en/privacy",
  "/zh/privacy",
  "/en/terms",
  "/zh/terms",
  "/robots.txt",
  "/sitemap.xml"
];
const failures = [];
for (const pathname of paths) {
  try {
    const response = await fetch(new URL(pathname, origin), { redirect: "manual" });
    if (!response.ok) failures.push(`${pathname}: HTTP ${response.status}`);
    const body = await response.text();
    if (pathname === "/en" && !body.includes('hreflang="zh-CN"'))
      failures.push(`${pathname}: missing zh-CN hreflang`);
    if (pathname === "/zh" && !body.includes('hreflang="en-GB"'))
      failures.push(`${pathname}: missing en-GB hreflang`);
    if ((pathname === "/en" || pathname === "/zh") && !body.includes('rel="canonical"'))
      failures.push(`${pathname}: missing canonical`);
  } catch (error) {
    failures.push(`${pathname}: ${error instanceof Error ? error.message : "request failed"}`);
  }
}
const notFound = await fetch(new URL(`/__smoke-not-found-${Date.now()}`, origin));
if (notFound.status !== 404) failures.push(`404 route: HTTP ${notFound.status}`);
if (process.env.SAFE_CONTACT_RECEIPT_TEST === "true")
  failures.push(
    "Automated real enquiry is intentionally unsupported; use the authorised manual receipt procedure."
  );
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`Read-only post-deploy smoke passed for ${origin.origin}; no enquiry was submitted.`);
