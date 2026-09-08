import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const inventory = JSON.parse(fs.readFileSync(path.join(root, "audit", "og-card-inventory.json"), "utf8"));
const baseline = fs.readFileSync(
  path.join(root, "audit", "english-hardening", "baseline", "2026-08-31-rendered-bilingual-baseline.md"),
  "utf8"
);
const outputDirectory = path.join(root, "audit", "english-hardening", "final");
const chineseSourceFiles = [
  "app/[lang]/about/page.tsx",
  "app/[lang]/contact/page.tsx",
  "app/[lang]/how-we-work/page.tsx",
  "app/[lang]/privacy/page.tsx",
  "app/[lang]/terms/page.tsx",
  "app/[lang]/work/page.tsx",
  "components/globe/CrossBorderGlobe.tsx",
  "components/sections/AboutTeam.tsx",
  "components/sections/Phase5AudiencePages.tsx",
  "components/sections/CommercialCaseIndex.tsx",
  "components/sections/Phase5Homepage.tsx",
  "components/sections/PortfolioWork.tsx",
  "components/sections/PortfolioProjectDetail.tsx",
  "content/evidence/public-case-narratives.ts",
  "content/phase5.ts",
  "content/portfolio.ts",
  "content/team.ts"
];
const recordedNewChineseCopyFiles = new Set([
  "components/sections/CommercialCaseIndex.tsx",
  "components/sections/Phase5Homepage.tsx",
  "components/sections/PortfolioWork.tsx",
  "components/sections/PortfolioProjectDetail.tsx",
  "content/evidence/public-case-narratives.ts",
  "content/portfolio.ts"
]);
const chineseCharacters = (value) =>
  [...value].filter((character) => /[\u3400-\u9fff\u3000-\u303f\uff00-\uffef]/u.test(character)).join("");
const resolveChineseBaseline = () => {
  const candidates = [process.env.GITHUB_BASE_SHA, "origin/main"].filter(Boolean);
  for (const candidate of candidates) {
    try {
      execFileSync("git", ["rev-parse", "--verify", `${candidate}^{commit}`], {
        cwd: root,
        stdio: "ignore"
      });
      return candidate;
    } catch {}
  }
  return null;
};
const chineseSourceBaseline = resolveChineseBaseline();
const chineseSourceChanges = chineseSourceBaseline
  ? chineseSourceFiles.flatMap((file) => {
      try {
        const before = execFileSync("git", ["show", `${chineseSourceBaseline}:${file}`], {
          cwd: root,
          encoding: "utf8",
          stdio: ["ignore", "pipe", "ignore"]
        });
        const after = fs.readFileSync(path.join(root, file), "utf8");
        return chineseCharacters(before) === chineseCharacters(after) ? [] : [file];
      } catch {
        return fs.existsSync(path.join(root, file)) ? [file] : [];
      }
    })
  : [];
const chineseSourceUnchanged = Boolean(chineseSourceBaseline) && chineseSourceChanges.length === 0;
const unrecordedChineseSourceChanges = chineseSourceChanges.filter(
  (file) => !recordedNewChineseCopyFiles.has(file)
);
const selectedTags = new Set([
  "a",
  "button",
  "p",
  "h1",
  "h2",
  "h3",
  "li",
  "span",
  "dt",
  "dd",
  "label",
  "legend"
]);
const voidTags = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "source",
  "track",
  "wbr"
]);
const ignoredTags = new Set(["head", "script", "style", "svg", "noscript", "template"]);

const namedEntities = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
const decode = (value) =>
  value.replace(/&(?:#(x?[0-9a-f]+)|([a-z]+));/gi, (entity, number, name) => {
    if (number) {
      const point = Number.parseInt(number.replace(/^x/i, ""), /^x/i.test(number) ? 16 : 10);
      return Number.isSafeInteger(point) && point <= 0x10ffff ? String.fromCodePoint(point) : entity;
    }
    return namedEntities[name.toLowerCase()] ?? entity;
  });
const normalise = (value) => decode(value).replace(/\s+/g, " ").trim();

function parse(html) {
  const rootNode = { tag: "root", attrs: {}, children: [], parent: null };
  let current = rootNode;
  for (const token of html.match(/<!--[\s\S]*?-->|<![^>]*>|<[^>]+>|[^<]+/g) ?? []) {
    if (token.startsWith("<!--") || token.startsWith("<!")) continue;
    if (token.startsWith("</")) {
      const tag = token
        .slice(2)
        .match(/^\s*([^\s>]+)/)?.[1]
        ?.toLowerCase();
      while (current !== rootNode && current.tag !== tag) current = current.parent;
      if (current !== rootNode) current = current.parent;
      continue;
    }
    if (token.startsWith("<")) {
      const tag = token.match(/^<\s*([^\s/>]+)/)?.[1]?.toLowerCase();
      if (!tag) continue;
      const attrs = {};
      for (const match of token.matchAll(/([:\w-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)) {
        if (match[1].toLowerCase() !== tag)
          attrs[match[1].toLowerCase()] = match[2] ?? match[3] ?? match[4] ?? "";
      }
      const node = { tag, attrs, children: [], parent: current };
      current.children.push(node);
      if (!voidTags.has(tag) && !token.endsWith("/>")) current = node;
      continue;
    }
    current.children.push({ tag: "#text", value: token, attrs: {}, children: [], parent: current });
  }
  return rootNode;
}

const hidden = (node) => {
  let current = node;
  while (current) {
    const classes = current.attrs?.class?.split(/\s+/) ?? [];
    if (
      current.attrs?.hidden !== undefined ||
      current.attrs?.["aria-hidden"] === "true" ||
      classes.includes("sr-only")
    )
      return true;
    if (ignoredTags.has(current.tag)) return true;
    current = current.parent;
  }
  return false;
};
const directText = (node) =>
  normalise(
    node.children
      .filter((child) => child.tag === "#text")
      .map((child) => child.value)
      .join(" ")
  );
const textContent = (node) =>
  normalise(
    node.children
      .map((child) => (child.tag === "#text" ? child.value : hidden(child) ? "" : textContent(child)))
      .join(" ")
  );
const variant = (node) => {
  let current = node;
  while (current) {
    const classes = current.attrs?.class ?? "";
    if (/\b(?:sm|md|lg):hidden\b/.test(classes)) return "mobile-only";
    if (/\bhidden\b/.test(classes) && /\b(?:sm|md|lg):(?:block|grid|flex)\b/.test(classes))
      return "desktop-only";
    current = current.parent;
  }
  return "shared";
};

function extract(html) {
  const records = [];
  const elementCounts = new Map();
  function visit(node, pathParts = []) {
    if (node.tag === "#text" || hidden(node)) return;
    const siblings = node.parent?.children.filter((child) => child.tag === node.tag) ?? [];
    const index = Math.max(0, siblings.indexOf(node));
    const nextPath = node.tag === "root" ? pathParts : [...pathParts, `${node.tag}[${index}]`];
    if (selectedTags.has(node.tag)) {
      const ownText = directText(node);
      const aggregateNestedText = /^(?:h1|h2|h3|p|dt|dd)$/.test(node.tag) && !ownText;
      const value = ownText || (aggregateNestedText ? textContent(node) : "");
      if (value) {
        const count = (elementCounts.get(node.tag) ?? 0) + 1;
        elementCounts.set(node.tag, count);
        records.push({
          path: `visible/${node.tag}[${count}]`,
          element: `<${node.tag}>`,
          variant: variant(node),
          text: value
        });
      }
      if (aggregateNestedText) return;
    }
    for (const child of node.children) visit(child, nextPath);
  }
  visit(parse(html));
  return records;
}

function htmlPath(route) {
  if (route === "/en" || route === "/zh") return path.join(root, "out", `${route.slice(1)}.html`);
  return path.join(root, "out", `${route.slice(1)}.html`);
}

function baselineChinese() {
  const result = new Map();
  let route = null;
  for (const line of baseline.split(/\r?\n/)) {
    const heading = line.match(/^## Venus Bridge (?:(home)|\/(.+?)) page:/);
    if (heading) {
      route = heading[1] ? "/" : `/${heading[2]}`;
      result.set(route, []);
      continue;
    }
    if (route && /^\|\s*\d+\s*\|/.test(line)) {
      const cells = [];
      let current = "";
      let escaped = false;
      for (const character of line) {
        if (escaped) {
          current += character;
          escaped = false;
        } else if (character === "\\") escaped = true;
        else if (character === "|") {
          cells.push(current.trim());
          current = "";
        } else current += character;
      }
      cells.push(current.trim());
      if (cells.length >= 6) result.get(route).push(normalise(cells.at(-2)));
    }
  }
  return result;
}

const routes = [...new Set(inventory.cards.map((card) => card.route.replace(/^\/(?:en|zh)/, "") || "/"))];
const baselineZh = baselineChinese();
const report = {
  generatedAt: new Date().toISOString(),
  chineseSourceBaseline: chineseSourceBaseline ?? "UNKNOWN",
  chineseSourceUnchanged,
  chineseSourceStatus: !chineseSourceBaseline
    ? "UNKNOWN"
    : chineseSourceUnchanged
      ? "UNCHANGED"
      : unrecordedChineseSourceChanges.length
        ? "CHANGED_UNRECORDED"
        : "CHANGED_NEW_COPY_RECORDED",
  chineseSourceChanges,
  unrecordedChineseSourceChanges,
  routes: []
};
for (const route of routes) {
  const enRoute = route === "/" ? "/en" : `/en${route}`;
  const zhRoute = route === "/" ? "/zh" : `/zh${route}`;
  const en = extract(fs.readFileSync(htmlPath(enRoute), "utf8"));
  const zh = extract(fs.readFileSync(htmlPath(zhRoute), "utf8"));
  const pathParity =
    en.length === zh.length &&
    en.every(
      (item, index) =>
        item.path === zh[index]?.path &&
        item.element === zh[index]?.element &&
        item.variant === zh[index]?.variant
    );
  const baselineValues = baselineZh.get(route);
  const renderedBaselineTextMatch = Boolean(
    baselineValues &&
      baselineValues.length === zh.length &&
      baselineValues.every((value, index) => value === zh[index]?.text)
  );
  report.routes.push({
    route,
    pathParity,
    chineseSourceUnchanged,
    renderedBaselineTextMatch,
    baselineChineseCount: baselineValues?.length ?? 0,
    currentChineseCount: zh.length,
    firstChineseMismatch: baselineValues
      ? baselineValues.findIndex((value, index) => value !== zh[index]?.text)
      : -1,
    rows: en.map((item, index) => {
      const { text: english, ...rest } = item;
      return { ...rest, en: english, zh: zh[index]?.text ?? null };
    })
  });
}
fs.mkdirSync(outputDirectory, { recursive: true });
fs.writeFileSync(path.join(outputDirectory, "visible-copy.json"), `${JSON.stringify(report, null, 2)}\n`);
const markdown = ["# Rendered bilingual visible-copy export", "", `Generated: ${report.generatedAt}`, ""];
for (const route of report.routes) {
  markdown.push(
    `## ${route.route}`,
    "",
    `Path parity: ${route.pathParity ? "PASS" : "FAIL"}`,
    `Chinese source: ${route.chineseSourceUnchanged ? "UNCHANGED" : "CHANGED"}`,
    `Rendered 31 August baseline text: ${route.renderedBaselineTextMatch ? "MATCH" : "NOT DIRECTLY COMPARABLE"}`,
    "",
    "| Path | Element | Variant | English | 中文 |",
    "| --- | --- | --- | --- | --- |"
  );
  for (const row of route.rows)
    markdown.push(
      `| ${row.path} | ${row.element} | ${row.variant} | ${String(row.en).replaceAll("|", "\\|")} | ${String(row.zh ?? "").replaceAll("|", "\\|")} |`
    );
  markdown.push("");
}
const renderedMarkdown = `${markdown.join("\n")}\n`;
fs.writeFileSync(path.join(outputDirectory, "visible-copy.md"), renderedMarkdown);
fs.writeFileSync(path.join(outputDirectory, "rendered-bilingual-copy.md"), renderedMarkdown);
console.log(`Exported ${report.routes.length} bilingual canonical routes to audit/english-hardening/final/.`);
