import type { ContactPayload } from "./validation";
import { createHmac } from "node:crypto";
export async function sendContact(data: ContactPayload) {
  const url = process.env.CONTACT_WEBHOOK_URL;
  if (!url) return { ok: false as const, reason: "not_configured" as const };
  try {
    const body = JSON.stringify({
      type: "framebridge_project_brief",
      submittedAt: new Date().toISOString(),
      data
    });
    const secret = process.env.CONTACT_WEBHOOK_SECRET;
    const signature = secret ? createHmac("sha256", secret).update(body).digest("hex") : undefined;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(signature ? { "x-framebridge-signature": `sha256=${signature}` } : {})
      },
      body,
      signal: AbortSignal.timeout(10000)
    });
    return response.ok ? { ok: true as const } : { ok: false as const, reason: "provider_error" as const };
  } catch {
    return { ok: false as const, reason: "provider_error" as const };
  }
}
