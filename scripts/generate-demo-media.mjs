/* eslint-disable @typescript-eslint/no-unused-vars */
import { mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";
const out = "public/media/demo",
  audit = "audit/motion-correction",
  ink = "#0c0d0f",
  graphite = "#24262b",
  paper = "#f7f5f0",
  stone = "#8c877f",
  bronze = "#9b8057";
await mkdir(`${out}/marks`, { recursive: true });
await mkdir(audit, { recursive: true });
const specs = [
  ["home-hero", 1200, 1500, "production", 0],
  ["production-frame", 1600, 1000, "production", 1],
  ["landscape-film", 1600, 900, "production", 2],
  ["fashion-crop", 1000, 1250, "fashion", 0],
  ["beauty-study", 1200, 1500, "fashion", 1],
  ["editorial-spread", 1600, 1000, "fashion", 2],
  ["campaign-sequence", 1600, 900, "fashion", 3],
  ["talent-sheet", 1600, 1000, "talent", 0],
  ["styling-form", 1000, 1250, "talent", 1],
  ["portrait-shadow", 1000, 1250, "talent", 2],
  ["portrait-contact", 1200, 1500, "talent", 3],
  ["event-stage", 1600, 900, "events", 0],
  ["exhibition-space", 1600, 1000, "events", 1],
  ["interview-frame", 1600, 1000, "events", 2],
  ["automotive-motion", 1600, 900, "technology", 0],
  ["technology-layer", 1600, 1000, "technology", 1],
  ["square-object", 1200, 1200, "technology", 2],
  ["research-map", 1600, 1000, "research", 0],
  ["agency-handoff", 1600, 900, "research", 1],
  ["landscape-light", 1600, 1000, "research", 2]
];
const shell = (w, h, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"><rect width="${w}" height="${h}" fill="${ink}"/>${body}<rect x="28" y="28" width="${w - 56}" height="${h - 56}" fill="none" stroke="${paper}" opacity=".13"/></svg>`;
const art = {
  production: (w, h, v) =>
    shell(
      w,
      h,
      `<path d="M0 ${h * 0.22}H${w}L${w} ${h * 0.62} 0 ${h * 0.88}Z" fill="${v % 2 ? bronze : paper}" opacity=".16"/><rect x="${w * 0.12}" y="${h * 0.16}" width="${w * 0.58}" height="${h * 0.55}" fill="none" stroke="${paper}" stroke-width="5" opacity=".65"/><path d="M${w * 0.12} ${h * 0.76}H${w * 0.88}M${w * 0.2} ${h * 0.82}H${w * 0.62}" stroke="${bronze}" stroke-width="8"/><g stroke="${paper}" opacity=".35"><path d="M${w * 0.08} ${h * 0.12}v${h * 0.13}M${w * 0.92} ${h * 0.12}v${h * 0.13}M${w * 0.08} ${h * 0.88}v-${h * 0.13}M${w * 0.92} ${h * 0.88}v-${h * 0.13}"/></g>`
    ),
  fashion: (w, h, v) =>
    shell(
      w,
      h,
      `<path d="M${w * 0.18} 0 Q${w * (0.45 + v * 0.04)} ${h * 0.34} ${w * 0.28} ${h}H${w * 0.72}Q${w * 0.5} ${h * 0.62} ${w * 0.82} 0Z" fill="${paper}" opacity=".13"/><path d="M${w * 0.38} ${h * 0.18}c${w * 0.18} -${h * 0.08} ${w * 0.24} ${h * 0.16} ${w * 0.18} ${h * 0.32}c-${w * 0.06} ${h * 0.15}-${w * 0.06} ${h * 0.27} ${w * 0.12} ${h * 0.34}H${w * 0.25}c${w * 0.18}-${h * 0.08} ${w * 0.2}-${h * 0.23} ${w * 0.13}-${h * 0.35}c-${w * 0.12}-${h * 0.19}-${w * 0.04}-${h * 0.28} 0-${h * 0.31}Z" fill="${stone}"/><g fill="none" stroke="${bronze}" stroke-width="3"><path d="M${w * 0.08} ${h * 0.12}h${w * 0.18}M${w * 0.08} ${h * 0.12}v${h * 0.12}M${w * 0.92} ${h * 0.88}h-${w * 0.18}M${w * 0.92} ${h * 0.88}v-${h * 0.12}"/></g>`
    ),
  talent: (w, h, v) =>
    shell(
      w,
      h,
      `<g fill="${paper}" opacity=".12">${[0, 1, 2].map((_, i) => `<rect x="${w * (0.08 + i * 0.29)}" y="${h * 0.12}" width="${w * 0.23}" height="${h * 0.55}"/>`).join("")}</g><g fill="${stone}">${[0, 1, 2].map((_, i) => `<path d="M${w * (0.13 + i * 0.29)} ${h * 0.55}c0-${h * 0.13} ${w * 0.13}-${h * 0.13} ${w * 0.13} 0v${h * 0.08}h-${w * 0.13}z"/><ellipse cx="${w * (0.195 + i * 0.29)}" cy="${h * 0.34}" rx="${w * 0.045}" ry="${h * 0.075}"/>`).join("")}</g><path d="M${w * 0.08} ${h * 0.78}H${w * 0.92}" stroke="${bronze}" stroke-width="${h * 0.035}" stroke-dasharray="${w * 0.12} ${w * 0.025}"/><g stroke="${paper}" opacity=".5"><path d="M${w * 0.08} ${h * 0.84}h${w * 0.42}M${w * 0.08} ${h * 0.9}h${w * 0.28}"/></g>`
    ),
  events: (w, h, v) =>
    shell(
      w,
      h,
      `<path d="M${w * 0.12} ${h * 0.12}L${w * 0.42} ${h * 0.82}H${w * 0.02}Z" fill="${bronze}" opacity=".25"/><path d="M${w * 0.88} ${h * 0.12}L${w * 0.58} ${h * 0.82}H${w * 0.98}Z" fill="${paper}" opacity=".14"/><rect x="${w * 0.27}" y="${h * 0.2}" width="${w * 0.46}" height="${h * 0.42}" fill="${graphite}" stroke="${paper}" opacity=".9"/><path d="M${w * 0.08} ${h * 0.82}H${w * 0.92}" stroke="${stone}" stroke-width="${h * 0.12}" stroke-dasharray="${w * 0.025} ${w * 0.018}"/><path d="M${w * 0.18} ${h * 0.12}v${h * 0.72}M${w * 0.82} ${h * 0.12}v${h * 0.72}" stroke="${paper}" opacity=".18"/>`
    ),
  technology: (w, h, v) =>
    shell(
      w,
      h,
      `<defs><linearGradient id="m"><stop stop-color="${stone}"/><stop offset=".48" stop-color="${paper}"/><stop offset="1" stop-color="${graphite}"/></linearGradient></defs><path d="M${w * 0.05} ${h * 0.72}Q${w * 0.45} ${h * (0.05 + v * 0.06)} ${w * 0.95} ${h * 0.42}L${w * 0.88} ${h * 0.78}Q${w * 0.45} ${h * 0.42} ${w * 0.05} ${h * 0.9}Z" fill="url(#m)" opacity=".5"/><g stroke="${bronze}" fill="none"><path d="M0 ${h * 0.25}H${w}M0 ${h * 0.5}H${w}M0 ${h * 0.75}H${w}" opacity=".22"/><path d="M${w * 0.62} ${h * 0.16}h${w * 0.25}v${h * 0.24}h-${w * 0.25}z" stroke-width="4"/></g><path d="M${w * 0.1} ${h * 0.18}h${w * 0.3}M${w * 0.1} ${h * 0.24}h${w * 0.18}" stroke="${paper}" stroke-width="4" opacity=".55"/>`
    ),
  research: (w, h, v) =>
    shell(
      w,
      h,
      `<g transform="rotate(${v ? 3 : -4} ${w / 2} ${h / 2})"><rect x="${w * 0.12}" y="${h * 0.12}" width="${w * 0.46}" height="${h * 0.68}" fill="${paper}" opacity=".12"/><rect x="${w * 0.42}" y="${h * 0.2}" width="${w * 0.45}" height="${h * 0.66}" fill="${graphite}" stroke="${paper}" opacity=".92"/></g><g stroke="${paper}" opacity=".45"><path d="M${w * 0.49} ${h * 0.34}h${w * 0.28}M${w * 0.49} ${h * 0.41}h${w * 0.22}M${w * 0.49} ${h * 0.48}h${w * 0.3}"/></g><g fill="none" stroke="${bronze}" stroke-width="4"><circle cx="${w * 0.62}" cy="${h * 0.66}" r="${Math.min(w, h) * 0.09}"/><path d="M${w * 0.62} ${h * 0.57}v${h * 0.18}M${w * 0.53} ${h * 0.66}h${w * 0.18}"/></g>`
    )
};
const thumbs = [];
for (const [name, w, h, type, v] of specs) {
  const svg = art[type](w, h, v);
  await writeFile(`${out}/${name}.svg`, svg);
  await sharp(Buffer.from(svg)).webp({ quality: 82 }).toFile(`${out}/${name}.webp`);
  thumbs.push({
    input: await sharp(Buffer.from(svg)).resize(300, 220, { fit: "cover" }).png().toBuffer(),
    left: (thumbs.length % 4) * 320,
    top: Math.floor(thumbs.length / 4) * 250
  });
}
await sharp({ create: { width: 1280, height: 1250, channels: 4, background: paper } })
  .composite(thumbs)
  .png()
  .toFile(`${audit}/demo-media-contact-sheet.png`);
for (let i = 0; i < 12; i++) {
  const n = String(i + 1).padStart(2, "0"),
    shape =
      i % 3 === 0
        ? `<circle cx="80" cy="32" r="20"/><path d="M60 32h40"/>`
        : i % 3 === 1
          ? `<path d="M55 48 80 12l25 36z"/><circle cx="80" cy="34" r="8"/>`
          : `<rect x="58" y="10" width="44" height="44" rx="${i % 2 ? 22 : 4}"/><path d="m66 42 28-20"/>`;
  await writeFile(
    `${out}/marks/mark-${n}.svg`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 64"><g fill="none" stroke="#fcfbf8" stroke-width="3" opacity=".8">${shape}</g></svg>`
  );
}
console.log(`Generated ${specs.length} distinct SVG/WebP demo media and contact sheet`);
