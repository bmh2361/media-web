import path from "node:path";
import { pathToFileURL } from "node:url";

const profile =
  process.argv.find((argument) => argument.startsWith("--profile="))?.split("=")[1] ?? "staging";
const { media, criticalMediaIds } = await import(
  pathToFileURL(path.join(process.cwd(), "content/media.ts")).href
);
const errors = [];
const warnings = [];
const noncanonicalCriticalMediaIds = new Set([
  "home-hero-primary",
  "home-featured-case",
  "talent-hero",
  "research-hero",
  "industry-tech"
]);
for (const [id, item] of Object.entries(media)) {
  for (const field of ["route", "section", "purpose", "approvalStatus", "aspectRatio"])
    if (!item[field]) errors.push(`${id}: missing ${field}`);
  if (!item.alt?.en || !item.alt?.zh) errors.push(`${id}: missing bilingual alt text`);
  if (item.type === "video" && !item.poster) errors.push(`${id}: video requires a poster`);
  if (item.type === "video" && item.speaking && !item.captions?.en && !item.transcript?.en)
    errors.push(`${id}: speaking video requires captions or transcript metadata`);
  if (id.includes("-concept-") && !item.projectId) errors.push(`${id}: project media requires projectId`);
}
if (profile === "production")
  for (const id of criticalMediaIds)
    if (media[id].approvalStatus !== "approved")
      (noncanonicalCriticalMediaIds.has(id) ? warnings : errors).push(
        `${id}: ${media[id].route} / ${media[id].section} is ${media[id].approvalStatus}; retired/noncanonical and blocked from reuse`
      );

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
if (warnings.length) console.warn(warnings.join("\n"));
console.log(
  `Media validation passed for ${Object.keys(media).length} records (${criticalMediaIds.size} critical, profile ${profile}).`
);
