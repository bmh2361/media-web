import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import ts from "typescript";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const require = createRequire(import.meta.url);
const compiled = ts.transpileModule(fs.readFileSync("components/sections/MarketVoiceCoverage.tsx", "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX }
}).outputText;
const exports = {};
const wrapper = ({ children, ...props }) => {
  delete props.compact;
  return React.createElement("div", props, children);
};
new Function("require", "exports", compiled)((id) => {
  if (id.includes("/ui/")) return { Container: wrapper, Eyebrow: wrapper, Section: wrapper };
  if (id.includes("market-coverage")) return { marketCoverage: [] };
  return require(id);
}, exports);
const render = (items, language = "en") =>
  renderToStaticMarkup(React.createElement(exports.MarketVoiceCoverage, { items, language }));
const fixture = (index, status = "published") => ({
  status,
  type: { en: "Interview", zh: "采访" },
  publication: "Test publication",
  headline: { en: `Test headline ${index}`, zh: `测试标题 ${index}` },
  subject: { en: "Test company", zh: "测试企业" },
  date: "2026-01-01",
  url: `https://example.org/test/${index}`
});

test("coverage renders no section for empty data or planned articles", () => {
  assert.equal(render([]), "");
  assert.equal(render([fixture(1, "draft")]), "");
  assert.match(
    fs.readFileSync("content/market-coverage.ts", "utf8"),
    /marketCoverage: MarketCoverageItem\[\] = \[\]/
  );
});
test("coverage excludes drafts, caps real items at three and preserves bilingual article fields", () => {
  const items = [fixture(0, "draft"), ...[1, 2, 3, 4].map((i) => fixture(i))];
  for (const language of ["en", "zh"]) {
    const html = render(items, language);
    assert.equal((html.match(/<article/g) ?? []).length, 3);
    assert.doesNotMatch(html, /test\/0|test\/4/);
    assert.match(html, /rel="noopener noreferrer"/);
    assert.match(html, /target="_blank"/);
    assert.match(html, /dateTime="2026-01-01"/);
    assert.ok(html.includes(items[1].headline[language]));
    assert.ok(html.includes(items[1].subject[language]));
  }
});
