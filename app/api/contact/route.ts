import { NextResponse } from "next/server";
import { validateContact } from "@/lib/contact/validation";
import { sendContact } from "@/lib/contact/send";
import { createHash } from "node:crypto";
import { checkRateLimit } from "@/lib/contact/rate-limit";

function isAllowedRequestOrigin(request: Request) {
  const configuredOrigins = (process.env.CONTACT_ALLOWED_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
  const isProduction = process.env.NODE_ENV === "production";
  const allowedOrigins = configuredOrigins.length
    ? configuredOrigins
    : isProduction
      ? []
      : [new URL(request.url).origin];
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  if (origin) return allowedOrigins.includes(origin);
  if (!referer) return false;
  try {
    return allowedOrigins.includes(new URL(referer).origin);
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json"))
    return NextResponse.json({ ok: false, error: "unsupported_media_type" }, { status: 415 });
  const length = Number(request.headers.get("content-length") || 0);
  if (length > 25000) return NextResponse.json({ ok: false, error: "payload_too_large" }, { status: 413 });
  if (!isAllowedRequestOrigin(request))
    return NextResponse.json({ ok: false, error: "invalid_request" }, { status: 403 });
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  if (new TextEncoder().encode(JSON.stringify(body)).byteLength > 25000)
    return NextResponse.json({ ok: false, error: "payload_too_large" }, { status: 413 });
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const fingerprint = createHash("sha256")
    .update(`${ip}:${JSON.stringify(body)}`)
    .digest("hex");
  const limit = checkRateLimit(ip, fingerprint);
  if (!limit.ok) return NextResponse.json({ ok: false, error: limit.reason }, { status: 429 });
  const result = validateContact(body);
  if (!result.ok)
    return NextResponse.json({ ok: false, error: "validation", fields: result.errors }, { status: 400 });
  const sent = await sendContact(result.data);
  if (!sent.ok)
    return NextResponse.json(
      { ok: false, error: sent.reason === "not_configured" ? "not_configured" : "delivery_unavailable" },
      { status: sent.reason === "not_configured" ? 503 : 502 }
    );
  return NextResponse.json({ ok: true, projectType: result.data.projectType });
}
