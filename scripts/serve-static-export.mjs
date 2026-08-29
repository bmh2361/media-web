import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
import process from "node:process";
import { createGzip } from "node:zlib";

const root = process.cwd();
const outputDirectory = path.resolve(root, process.env.STATIC_EXPORT_DIR ?? "out");
const portArgument = process.argv.findIndex((argument) => argument === "--port" || argument === "-p");
const port = Number(
  portArgument >= 0
    ? process.argv[portArgument + 1]
    : (process.env.PORT ?? process.env.PLAYWRIGHT_PORT ?? 3217)
);
const redirectsPath = path.join(outputDirectory, "_redirects");
const headersPath = path.join(outputDirectory, "_headers");

if (!existsSync(outputDirectory)) throw new Error(`Static output is missing: ${outputDirectory}`);

const escapePattern = (value) => value.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
const redirects = existsSync(redirectsPath)
  ? readFileSync(redirectsPath, "utf8")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#"))
      .map((line) => {
        const [source, destination, status = "302"] = line.split(/\s+/);
        return {
          destination,
          status: Number(status),
          pattern: new RegExp(`^${escapePattern(source).replaceAll("\\*", ".*")}/?$`)
        };
      })
  : [];

const responseHeaders = {};
if (existsSync(headersPath)) {
  const lines = readFileSync(headersPath, "utf8").split(/\r?\n/);
  let global = false;
  for (const line of lines) {
    if (line.trim() === "/*") {
      global = true;
      continue;
    }
    if (!global || !/^\s+/.test(line)) continue;
    const separator = line.indexOf(":");
    if (separator > 0) responseHeaders[line.slice(0, separator).trim()] = line.slice(separator + 1).trim();
  }
}

const contentTypes = {
  ".avif": "image/avif",
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webm": "video/webm",
  ".webmanifest": "application/manifest+json",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2"
};
const compressibleExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".svg",
  ".txt",
  ".webmanifest",
  ".xml"
]);

function resolveFile(pathname) {
  const relative = decodeURIComponent(pathname).replace(/^\/+/, "");
  const base = path.resolve(outputDirectory, relative);
  if (base !== outputDirectory && !base.startsWith(`${outputDirectory}${path.sep}`)) return null;
  const candidates =
    pathname === "/"
      ? [path.join(outputDirectory, "index.html")]
      : [base, `${base}.html`, path.join(base, "index.html")];
  return candidates.find((candidate) => existsSync(candidate) && statSync(candidate).isFile()) ?? null;
}

const server = createServer((request, response) => {
  const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "127.0.0.1"}`);
  const redirect = redirects.find((rule) => rule.pattern.test(url.pathname));
  if (redirect) {
    response.writeHead(redirect.status, { ...responseHeaders, Location: redirect.destination });
    response.end();
    return;
  }

  const file = resolveFile(url.pathname);
  if (!file) {
    const notFound = path.join(outputDirectory, "404.html");
    response.writeHead(404, { ...responseHeaders, "Content-Type": "text/html; charset=utf-8" });
    if (request.method === "HEAD" || !existsSync(notFound)) response.end();
    else createReadStream(notFound).pipe(response);
    return;
  }

  const extension = path.extname(file).toLowerCase();
  const useGzip =
    compressibleExtensions.has(extension) &&
    /(?:^|,)\s*gzip\b/.test(request.headers["accept-encoding"] ?? "");
  response.writeHead(200, {
    ...responseHeaders,
    "Content-Type": contentTypes[extension] ?? "application/octet-stream",
    ...(useGzip ? { "Content-Encoding": "gzip", Vary: "Accept-Encoding" } : {})
  });
  if (request.method === "HEAD") response.end();
  else if (useGzip) createReadStream(file).pipe(createGzip()).pipe(response);
  else createReadStream(file).pipe(response);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Static export ready at http://127.0.0.1:${port}`);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
