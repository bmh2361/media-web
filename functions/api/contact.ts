type ContactIntent = "company" | "partner" | "other";

export type ContactPayload = {
  intent: ContactIntent;
  name: string;
  company_or_organisation: string;
  role_or_title: string;
  work_email: string;
  market_or_location: string;
  goal_and_timing: string;
  project_summary: string;
  consent: true;
  website: "";
  started_at: number;
  turnstile_token: string;
};

type RateLimiter = { limit(input: { key: string }): Promise<{ success: boolean }> };
type DeduplicationStore = {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options: { expirationTtl: number }): Promise<void>;
};

// Cloudflare Rate Limiting plus Workers KV provide best-effort distributed
// abuse protection and best-effort duplicate suppression. KV is eventually
// consistent, so the receiver must enforce final deduplication with the stable
// idempotency key supplied in every signed delivery.

export type ContactEnvironment = {
  CONTACT_FORM_ENABLED?: string;
  CONTACT_PRIVACY_PROCESSING_APPROVED?: string;
  CONTACT_PUBLIC_IDENTITY_CONFIRMED?: string;
  CONTACT_DELIVERY_VERIFIED?: string;
  CONTACT_CHANNELS_CONFIRMED?: string;
  CONTACT_ALLOWED_ORIGINS?: string;
  CONTACT_WEBHOOK_URL?: string;
  CONTACT_WEBHOOK_SECRET?: string;
  TURNSTILE_SECRET_KEY?: string;
  CONTACT_PREVIEW_RUNTIME_APPROVED?: string;
  CONTACT_RATE_LIMITER?: RateLimiter;
  CONTACT_DEDUPLICATION?: DeduplicationStore;
};

type PagesContext = {
  request: Request;
  env: ContactEnvironment;
};

const maxBodyBytes = 16_384;
const allowedKeys = new Set([
  "intent",
  "name",
  "company_or_organisation",
  "role_or_title",
  "work_email",
  "market_or_location",
  "goal_and_timing",
  "project_summary",
  "consent",
  "website",
  "started_at",
  "turnstile_token"
]);

const clean = (value: unknown, max: number) =>
  typeof value === "string"
    ? value
        .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
        .replace(/\r\n?/g, "\n")
        .trim()
        .slice(0, max + 1)
    : "";

export function validateContactPayload(
  input: unknown,
  now = Date.now()
): { ok: true; data: ContactPayload } | { ok: false; error: string; fields?: Record<string, string> } {
  if (!input || typeof input !== "object" || Array.isArray(input)) return { ok: false, error: "malformed" };
  const source = input as Record<string, unknown>;
  if (Object.keys(source).some((key) => !allowedKeys.has(key))) return { ok: false, error: "malformed" };
  const fields: Record<string, string> = {};
  const intent = source.intent;
  if (intent !== "company" && intent !== "partner" && intent !== "other") fields.intent = "invalid";
  const values = {
    name: clean(source.name, 100),
    company_or_organisation: clean(source.company_or_organisation, 150),
    role_or_title: clean(source.role_or_title, 120),
    work_email: clean(source.work_email, 200),
    market_or_location: clean(source.market_or_location, 160),
    goal_and_timing: clean(source.goal_and_timing, 500),
    project_summary: clean(source.project_summary, 3000),
    turnstile_token: clean(source.turnstile_token, 2048)
  };
  for (const [key, value] of Object.entries(values)) {
    if (!value) fields[key] = "required";
    const limits: Record<string, number> = {
      name: 100,
      company_or_organisation: 150,
      role_or_title: 120,
      work_email: 200,
      market_or_location: 160,
      goal_and_timing: 500,
      project_summary: 3000,
      turnstile_token: 2048
    };
    if (value.length > limits[key]) fields[key] = "too_long";
  }
  if (values.work_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.work_email))
    fields.work_email = "invalid";
  if (values.project_summary && values.project_summary.length < 20) fields.project_summary = "too_short";
  if (source.consent !== true) fields.consent = "required";
  if (clean(source.website, 200)) return { ok: false, error: "rejected" };
  const startedAt = Number(source.started_at);
  if (!Number.isFinite(startedAt) || now - startedAt < 2500 || now - startedAt > 86_400_000) {
    return { ok: false, error: "rejected" };
  }
  if (Object.keys(fields).length) return { ok: false, error: "validation", fields };
  return {
    ok: true,
    data: {
      intent: intent as ContactIntent,
      ...values,
      consent: true,
      website: "",
      started_at: startedAt
    }
  };
}

const encodeHex = (buffer: ArrayBuffer) =>
  [...new Uint8Array(buffer)].map((byte) => byte.toString(16).padStart(2, "0")).join("");

async function hash(value: string) {
  return encodeHex(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)));
}

async function hmac(secret: string, value: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  return encodeHex(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value)));
}

function headers(request: Request) {
  const preview = request.url.includes(".pages.dev");
  return {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
    "referrer-policy": "no-referrer",
    ...(preview ? { "x-robots-tag": "noindex, nofollow" } : {})
  };
}

function json(request: Request, body: object, status: number) {
  return new Response(JSON.stringify(body), { status, headers: headers(request) });
}

const configured = (request: Request, env: ContactEnvironment) =>
  env.CONTACT_FORM_ENABLED === "true" &&
  env.CONTACT_PRIVACY_PROCESSING_APPROVED === "true" &&
  env.CONTACT_PUBLIC_IDENTITY_CONFIRMED === "true" &&
  env.CONTACT_DELIVERY_VERIFIED === "true" &&
  env.CONTACT_CHANNELS_CONFIRMED === "true" &&
  Boolean(env.TURNSTILE_SECRET_KEY?.trim()) &&
  Boolean(env.CONTACT_WEBHOOK_URL?.trim()) &&
  Boolean(env.CONTACT_WEBHOOK_SECRET?.trim()) &&
  Boolean(env.CONTACT_RATE_LIMITER) &&
  Boolean(env.CONTACT_DEDUPLICATION) &&
  (!request.url.includes(".pages.dev") || env.CONTACT_PREVIEW_RUNTIME_APPROVED === "true");

export async function handleContactRequest(
  request: Request,
  env: ContactEnvironment,
  fetcher: typeof fetch = fetch
) {
  const requestId = crypto.randomUUID();
  if (!configured(request, env)) return json(request, { error: "not_configured", requestId }, 503);
  const contentType = request.headers.get("content-type")?.split(";", 1)[0].trim().toLowerCase();
  if (contentType !== "application/json")
    return json(request, { error: "unsupported_media", requestId }, 415);
  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (declaredLength > maxBodyBytes) return json(request, { error: "payload_too_large", requestId }, 413);
  const origin = request.headers.get("origin") || "";
  const allowedOrigins = (env.CONTACT_ALLOWED_ORIGINS || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  if (!origin || !allowedOrigins.includes(origin))
    return json(request, { error: "origin_rejected", requestId }, 403);

  let raw = "";
  let input: unknown;
  try {
    raw = await request.text();
    if (new TextEncoder().encode(raw).byteLength > maxBodyBytes) {
      return json(request, { error: "payload_too_large", requestId }, 413);
    }
    input = JSON.parse(raw);
  } catch {
    return json(request, { error: "malformed", requestId }, 400);
  }
  const validation = validateContactPayload(input);
  if (!validation.ok)
    return json(request, { error: validation.error, fields: validation.fields, requestId }, 400);

  const ip = request.headers.get("cf-connecting-ip") || "unavailable";
  const rateKey = await hash(`${origin}:${ip}`);
  let rate: { success: boolean };
  try {
    rate = await env.CONTACT_RATE_LIMITER!.limit({ key: rateKey });
  } catch {
    return json(request, { error: "abuse_protection_unavailable", requestId }, 503);
  }
  if (!rate.success) return json(request, { error: "rate_limited", requestId }, 429);
  const fingerprint = await hash(
    `${validation.data.work_email.toLowerCase()}:${validation.data.project_summary}:${validation.data.intent}`
  );
  try {
    if (await env.CONTACT_DEDUPLICATION!.get(fingerprint)) {
      return json(request, { error: "duplicate", requestId }, 409);
    }
  } catch {
    return json(request, { error: "abuse_protection_unavailable", requestId }, 503);
  }

  const turnstile = new FormData();
  turnstile.set("secret", env.TURNSTILE_SECRET_KEY!);
  turnstile.set("response", validation.data.turnstile_token);
  if (ip !== "unavailable") turnstile.set("remoteip", ip);
  let turnstileResult: { success?: boolean } = {};
  try {
    const response = await fetcher("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: turnstile
    });
    turnstileResult = (await response.json()) as { success?: boolean };
  } catch {
    return json(request, { error: "verification_unavailable", requestId }, 503);
  }
  if (!turnstileResult.success) return json(request, { error: "verification_failed", requestId }, 403);

  let webhook: URL;
  try {
    webhook = new URL(env.CONTACT_WEBHOOK_URL!);
  } catch {
    return json(request, { error: "not_configured", requestId }, 503);
  }
  if (webhook.protocol !== "https:" || /(?:^|\.)(?:localhost|example\.com)$/i.test(webhook.hostname)) {
    return json(request, { error: "not_configured", requestId }, 503);
  }
  const deliveryBody = JSON.stringify({
    type: "venus_bridge_enquiry",
    request_id: requestId,
    idempotency_key: fingerprint,
    submitted_at: new Date().toISOString(),
    data: { ...validation.data, turnstile_token: undefined, started_at: undefined, website: undefined }
  });
  const signature = await hmac(env.CONTACT_WEBHOOK_SECRET!, deliveryBody);
  try {
    const response = await fetcher(webhook, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-venus-bridge-request-id": requestId,
        "x-venus-bridge-idempotency-key": fingerprint,
        "x-venus-bridge-signature": `sha256=${signature}`
      },
      body: deliveryBody
    });
    if (!response.ok) return json(request, { error: "delivery_failed", requestId }, 502);
  } catch {
    return json(request, { error: "delivery_failed", requestId }, 502);
  }
  try {
    await env.CONTACT_DEDUPLICATION!.put(fingerprint, requestId, { expirationTtl: 600 });
  } catch {
    console.error("contact_deduplication_write_failed", { requestId });
  }
  return json(request, { ok: true, requestId }, 202);
}

export const onRequestPost = ({ request, env }: PagesContext) => handleContactRequest(request, env);
