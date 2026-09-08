type PagesContext = { request: Request; next(): Promise<Response> };

export async function onRequest({ request, next }: PagesContext) {
  const response = await next();
  const headers = new Headers(response.headers);
  const hostname = new URL(request.url).hostname;
  if (hostname.endsWith(".pages.dev")) headers.set("x-robots-tag", "noindex, nofollow");
  headers.set("x-content-type-options", "nosniff");
  headers.set("referrer-policy", "strict-origin-when-cross-origin");
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}
