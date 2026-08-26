import { NextResponse } from "next/server";
import { validateContact } from "@/lib/contact/validation";
import { sendContact } from "@/lib/contact/send";
import { createHash, randomUUID } from "node:crypto";
import { checkRateLimit } from "@/lib/contact/rate-limit";
import { getContactConfiguration } from "@/lib/contact/config";
import { getEffectiveMarketEntryMode } from "@/lib/release";

function isAllowedRequestOrigin(request: Request) {
  const configuredOrigins = getContactConfiguration().allowedOrigins;
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
  const requestId = randomUUID();
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json"))
    return NextResponse.json({ ok: false, error: "unsupported_media_type", requestId }, { status: 415 });
  const length = Number(request.headers.get("content-length") || 0);
  if (length > 25000)
    return NextResponse.json({ ok: false, error: "payload_too_large", requestId }, { status: 413 });
  if (!isAllowedRequestOrigin(request))
    return NextResponse.json({ ok: false, error: "invalid_request", requestId }, { status: 403 });
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json", requestId }, { status: 400 });
  }
  if (new TextEncoder().encode(JSON.stringify(body)).byteLength > 25000)
    return NextResponse.json({ ok: false, error: "payload_too_large", requestId }, { status: 413 });
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const rateLimitKey = createHash("sha256").update(ip).digest("hex");
  const fingerprint = createHash("sha256")
    .update(`${ip}:${JSON.stringify(body)}`)
    .digest("hex");
  const limit = await checkRateLimit(rateLimitKey, fingerprint);
  if (!limit.ok)
    return NextResponse.json(
      { ok: false, error: limit.reason, requestId },
      { status: limit.reason === "unavailable" ? 503 : 429 }
    );
  const result = validateContact(body);
  if (!result.ok)
    return NextResponse.json(
      { ok: false, error: "validation", fields: result.errors, requestId },
      { status: 400 }
    );
  if (result.data.projectType === "market-entry" && getEffectiveMarketEntryMode() === "hidden")
    return NextResponse.json({ ok: false, error: "service_unavailable", requestId }, { status: 404 });
  const sent = await sendContact(result.data, requestId);
  if (!sent.ok) {
    console.error(
      JSON.stringify({
        event: "contact_delivery_failed",
        requestId,
        reason: sent.reason,
        enquiryType: result.data.enquiryType
      })
    );
    return NextResponse.json(
      {
        ok: false,
        error: sent.reason === "not_configured" ? "not_configured" : "delivery_unavailable",
        requestId
      },
      { status: sent.reason === "not_configured" ? 503 : 502 }
    );
  }
  return NextResponse.json({ ok: true, projectType: result.data.projectType, requestId });
}
