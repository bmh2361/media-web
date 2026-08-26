import { spawn } from "node:child_process";
import { createServer } from "node:http";
import path from "node:path";
import process from "node:process";
import { chromium } from "@playwright/test";

const root = process.cwd();
const appPort = 3311;
const webhookPort = 3310;
const origin = `http://127.0.0.1:${appPort}`;
const received = [];

const webhook = createServer((request, response) => {
  let body = "";
  request.on("data", (chunk) => (body += chunk));
  request.on("end", () => {
    const payload = JSON.parse(body || "{}");
    received.push({
      requestId: request.headers["x-venus-bridge-request-id"],
      signature: request.headers["x-venus-bridge-signature"],
      payload
    });
    response.statusCode = payload.data?.company === "FAIL_PROVIDER" ? 503 : 204;
    response.end();
  });
});
await new Promise((resolve) => webhook.listen(webhookPort, "127.0.0.1", resolve));

const app = spawn(
  process.execPath,
  [path.join(root, "node_modules", "next", "dist", "bin", "next"), "start", "-p", String(appPort)],
  {
    cwd: root,
    stdio: "inherit",
    env: {
      ...process.env,
      CONTACT_WEBHOOK_URL: `http://127.0.0.1:${webhookPort}`,
      CONTACT_WEBHOOK_SECRET: "contact-test-secret",
      CONTACT_ALLOWED_ORIGINS: origin,
      CONTACT_NOTIFICATION_DESTINATION: "test-inbox",
      RATE_LIMIT_PROVIDER: "memory"
    }
  }
);

for (let attempt = 0; attempt < 80; attempt += 1) {
  try {
    const response = await fetch(`${origin}/en/contact`);
    if (response.ok) break;
  } catch {}
  if (attempt === 79) throw new Error("Contact test server did not become ready.");
  await new Promise((resolve) => setTimeout(resolve, 250));
}

const base = {
  name: "Test User",
  company: "Test Company",
  email: "test@example.test",
  contact: "",
  projectType: "other",
  industry: "other",
  market: "other",
  location: "London",
  projectDate: "",
  services: [],
  summary: "A controlled automated test enquiry with sufficient project detail.",
  objective: "A controlled automated test enquiry with sufficient project detail.",
  consent: true,
  website: "",
  startedAt: Date.now() - 5000
};

async function submit(payload, ip, requestOrigin = origin) {
  return fetch(`${origin}/api/contact`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: requestOrigin,
      "x-forwarded-for": ip
    },
    body: JSON.stringify(payload)
  });
}

const assertions = [];
const check = (condition, label) => {
  if (!condition) throw new Error(`Contact delivery assertion failed: ${label}`);
  assertions.push(label);
};

let browser;
try {
  const quick = await submit({ ...base, enquiryType: "quick" }, "10.0.0.1");
  check(quick.status === 200, "valid quick enquiry is delivered");

  const quickWithoutCompany = await submit({ ...base, enquiryType: "quick", company: "" }, "10.0.0.2");
  check(quickWithoutCompany.status === 200, "optional company can be blank");

  const invalid = await submit({ ...base, enquiryType: "quick", email: "invalid" }, "10.0.0.3");
  check(invalid.status === 400, "invalid email is rejected");

  const missingRequired = await submit(
    { ...base, enquiryType: "quick", objective: "" },
    "10.0.0.7"
  );
  check(missingRequired.status === 400, "missing required fields are rejected");

  const longDescription = await submit(
    { ...base, enquiryType: "quick", summary: "x".repeat(4001) },
    "10.0.0.8"
  );
  check(longDescription.status === 400, "overlong project descriptions are rejected");

  const chinese = await submit(
    {
      ...base,
      enquiryType: "quick",
      name: "中文测试",
      company: "跨境科技公司",
      summary: "验证中文、标点符号与英国／欧洲项目说明能够安全交付。",
      objective: "验证中文、标点符号与英国／欧洲项目说明能够安全交付。"
    },
    "10.0.0.9"
  );
  check(chinese.status === 200, "Chinese and special-character content is delivered");

  const optionalFields = await submit(
    {
      ...base,
      enquiryType: "quick",
      company: "",
      contact: "",
      location: "",
      projectDate: ""
    },
    "10.0.0.10"
  );
  check(optionalFields.status === 200, "empty optional fields are accepted");

  const consentMissing = await submit(
    { ...base, enquiryType: "quick", consent: false },
    "10.0.0.11"
  );
  check(consentMissing.status === 400, "missing consent is rejected");

  const repeatPayload = { ...base, enquiryType: "quick", company: "Duplicate Test" };
  const firstRepeat = await submit(repeatPayload, "10.0.0.12");
  const duplicate = await submit(repeatPayload, "10.0.0.12");
  check(firstRepeat.status === 200 && duplicate.status === 429, "repeated submissions are rejected");

  const malformed = await fetch(`${origin}/api/contact`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin,
      "x-forwarded-for": "10.0.0.13"
    },
    body: "{not-json"
  });
  check(malformed.status === 400, "malformed direct API requests are rejected");

  const spam = await submit({ ...base, enquiryType: "quick", website: "spam.example" }, "10.0.0.4");
  check(spam.status === 400, "honeypot payload is rejected");

  const badOrigin = await submit({ ...base, enquiryType: "quick" }, "10.0.0.5", "https://invalid.example");
  check(badOrigin.status === 403, "disallowed origin is rejected");

  const providerFailure = await submit(
    { ...base, enquiryType: "quick", company: "FAIL_PROVIDER" },
    "10.0.0.6"
  );
  check(providerFailure.status === 502, "delivery provider failure returns a safe API error");

  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`${origin}/en/contact`);
  await page.getByLabel("Name").fill("Browser Test");
  await page.getByLabel("Organisation").fill("Browser Company");
  await page.getByLabel("Role (optional)").fill("Marketing Director");
  await page.getByLabel("Email").fill("browser@example.test");
  await page.getByLabel("Current situation").selectOption({ index: 1 });
  await page
    .getByLabel("What are you trying to achieve in the UK or Europe?")
    .fill("A browser-driven test enquiry with enough detail to validate confirmation.");
  await page.getByLabel(/I consent to Venus Bridge Media/).check();
  await page.waitForTimeout(2600);
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await page.getByText(/Received\. We will review/).waitFor();
  check(true, "successful English submission shows confirmation");

  await page.goto(`${origin}/en/contact`);
  await page.getByLabel("Name").fill("Browser Failure");
  await page.getByLabel("Organisation").fill("FAIL_PROVIDER");
  await page.getByLabel("Role (optional)").fill("CMO");
  await page.getByLabel("Email").fill("failure@example.test");
  await page.getByLabel("Current situation").selectOption({ index: 1 });
  await page
    .getByLabel("What are you trying to achieve in the UK or Europe?")
    .fill("A browser-driven failure test with enough detail to validate the error state.");
  await page.getByLabel(/I consent to Venus Bridge Media/).check();
  await page.waitForTimeout(2600);
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await page.getByText(/could not submit/i).waitFor();
  check(true, "delivery failure shows a user-visible error");

  await page.route("**/api/contact", (route) => route.abort());
  await page.goto(`${origin}/en/contact`);
  await page.getByLabel("Name").fill("Browser Network Failure");
  await page.getByLabel("Organisation").fill("Network Test");
  await page.getByLabel("Email").fill("network@example.test");
  await page.getByLabel("Current situation").selectOption({ index: 1 });
  await page
    .getByLabel("What are you trying to achieve in the UK or Europe?")
    .fill("A controlled browser network failure that must never display a false success state.");
  await page.getByLabel(/I consent to Venus Bridge Media/).check();
  await page.waitForTimeout(2600);
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await page.getByText(/could not submit/i).waitFor();
  check(true, "network failure shows a user-visible error without false success");
  await page.unroute("**/api/contact");

  await page.goto(`${origin}/zh/contact`);
  await page.getByLabel("姓名").fill("中文测试");
  await page.getByLabel("机构或公司").fill("测试公司");
  await page.getByLabel("职位（选填）").fill("品牌总监");
  await page.getByLabel("邮箱").fill("zh@example.test");
  await page.getByLabel("当前阶段").selectOption({ index: 1 });
  await page.getByLabel("希望在英国或欧洲实现什么？").fill("验证中文联系表单的提交、成功提示与本地交付流程。 ");
  await page.getByLabel(/我同意 Venus Bridge Media/).check();
  await page.waitForTimeout(2600);
  await page.getByRole("button", { name: "提交咨询" }).click();
  await page.getByText(/已收到，我们会审核信息后回复/).waitFor();
  check(true, "successful Chinese submission shows confirmation");

  check(
    received.every((entry) => entry.requestId),
    "webhook receives request identifiers"
  );
  check(
    received.every((entry) => entry.signature?.startsWith("sha256=")),
    "webhook payloads are signed"
  );
  console.log(JSON.stringify({ assertions, webhookRequests: received.length }, null, 2));
} finally {
  await browser?.close();
  app.kill();
  await new Promise((resolve) => webhook.close(resolve));
}
