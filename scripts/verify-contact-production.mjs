const confirmed = process.argv.includes("--confirm-live-test");
const origin = process.env.CONTACT_LIVE_TEST_ORIGIN?.trim();
const email = process.env.CONTACT_LIVE_TEST_EMAIL?.trim();

if (!confirmed || !origin || !email) {
  console.error(
    "Usage: set CONTACT_LIVE_TEST_ORIGIN and CONTACT_LIVE_TEST_EMAIL, then run npm run verify:contact:production -- --confirm-live-test"
  );
  process.exit(1);
}

const endpoint = new URL("/api/contact", origin).toString();
const payload = {
  enquiryType: "quick",
  name: "Venus Bridge release verification",
  company: "Venus Bridge",
  email,
  contact: "",
  projectType: "other",
  industry: "other",
  market: "uk",
  location: "London",
  projectDate: "",
  services: [],
  summary: "Controlled production contact delivery verification. No prospect data.",
  objective: "Confirm live receipt, signature validation, alerting and operational ownership.",
  consent: true,
  website: "",
  startedAt: Date.now() - 5000
};

const submit = () =>
  fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json", origin },
    body: JSON.stringify(payload)
  });

const first = await submit();
const firstBody = await first.json().catch(() => ({}));
if (!first.ok) throw new Error(`Live contact submission failed with ${first.status}.`);

const duplicate = await submit();
const duplicateBody = await duplicate.json().catch(() => ({}));
if (duplicate.status !== 429 || duplicateBody.error !== "duplicate")
  throw new Error(`Distributed duplicate protection was not observed; received ${duplicate.status}.`);

console.log(
  JSON.stringify(
    {
      submission: "accepted",
      requestId: firstBody.requestId,
      duplicateProtection: "verified",
      ownerAction:
        "Confirm the request ID was received by the approved workflow with a valid signature, notification and retention handling before setting CONTACT_DELIVERY_VERIFIED=true."
    },
    null,
    2
  )
);
