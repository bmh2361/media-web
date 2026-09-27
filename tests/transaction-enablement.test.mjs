import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import ts from "typescript";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const require = createRequire(import.meta.url);
const load = (file, resolve = require) => {
  const exports = {};
  const compiled = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX }
  }).outputText;
  new Function("require", "exports", compiled)(resolve, exports);
  return exports;
};
const content = load("content/transaction-enablement.ts");
const { TransactionEnablement } = load("components/sections/TransactionEnablement.tsx", (id) => {
  if (id.includes("transaction-enablement")) return content;
  if (id.includes("/ui/Eyebrow"))
    return { Eyebrow: ({ children }) => React.createElement("p", {}, children) };
  return require(id);
});

for (const language of ["en", "zh"]) {
  test(`${language} transaction section renders the specialist boundary and accessible official link on the server`, () => {
    const copy = content.transactionEnablement[language];
    const html = renderToStaticMarkup(React.createElement(TransactionEnablement, { language }));
    for (const field of [
      "headline",
      "context",
      "body",
      "mobileBody",
      "description",
      "mobileDescription",
      "connection",
      "qualification"
    ]) {
      assert.ok(html.includes(copy[field]), `${field} must be server-rendered`);
    }
    assert.match(html, /href="https:\/\/weiric\.com\/" target="_blank" rel="noopener noreferrer"/);
    assert.ok(html.includes(copy.newTab));
    assert.doesNotMatch(
      html,
      /<img|<form|guaranteed (?:funding|financing)|finance arm|preferred lender|资金方|保证融资|自有资金/i
    );
  });
}

test("both language records contain matching fields and no invented relationship status", () => {
  const { en, zh } = content.transactionEnablement;
  assert.deepEqual(Object.keys(en), Object.keys(zh));
  assert.equal(en.relationship, "SELECTED SPECIALIST RELATIONSHIP");
  assert.equal(zh.relationship, "专业合作关系");
  assert.equal(en.name, zh.name);
});
