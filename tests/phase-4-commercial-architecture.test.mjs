import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (file) => readFile(new URL(file, root), "utf8");

test("Phase 4 homepage starts with the client objective and retains early proof", async () => {
  const [page, copy] = await Promise.all([
    read("components/sections/Phase4Homepage.tsx"),
    read("content/phase4.ts")
  ]);
  assert.match(copy, /Build credibility in the UK and Europe/);
  assert.match(copy, /围绕你现在的目标/);
  assert.ok(page.indexOf('data-home-section="early-proof"') < page.indexOf('data-home-section="objectives"'));
  assert.match(page, /byd-bd11-london/);
  assert.match(page, /changan-europe-launch-2025/);
});

test("Phase 4 publishes the two credibility types and truth-gated talent and media capability", async () => {
  const copy = await read("content/phase4.ts");
  assert.match(copy, /Industry Credibility/);
  assert.match(copy, /Market \/ Scene Credibility/);
  assert.match(copy, /does not imply representation, exclusivity/);
  assert.match(copy, /具名媒体合作/);
  assert.doesNotMatch(copy, /Our media partner|我们的媒体合作伙伴|exclusive talent|our artist/i);
});

test("Phase 4 media audit records the full public library", async () => {
  const summary = JSON.parse(await read("audit/phase-4-media/summary.json"));
  assert.equal(summary.totalAssets, 1050);
  assert.ok(summary.contactSheets >= 100);
  assert.ok(summary.exactDuplicateFiles >= 0);
});
