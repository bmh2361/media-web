import type { ContactPayload } from "./validation";
import { createHmac } from "node:crypto";
import { getContactConfiguration } from "./config";

export async function sendContact(data: ContactPayload, requestId: string) {
  const config = getContactConfiguration();
  const url = config.webhookUrl;
  if (!url) return { ok: false as const, reason: "not_configured" as const };
  const body = JSON.stringify({
    type: "venus_bridge_project_brief",
    requestId,
    submittedAt: new Date().toISOString(),
    notificationDestination: config.notificationDestination,
    data
  });
  const signature = config.webhookSecret
    ? createHmac("sha256", config.webhookSecret).update(body).digest("hex")
    : undefined;
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-venus-bridge-request-id": requestId,
          ...(signature ? { "x-venus-bridge-signature": `sha256=${signature}` } : {})
        },
        body,
        signal: AbortSignal.timeout(10000)
      });
      if (response.ok) return { ok: true as const };
      if (response.status < 500 || attempt === 2)
        return { ok: false as const, reason: "provider_error" as const };
    } catch {
      if (attempt === 2) return { ok: false as const, reason: "provider_error" as const };
    }
  }
  return { ok: false as const, reason: "provider_error" as const };
}
