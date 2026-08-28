import fs from "node:fs";
import path from "node:path";

const roots = ["app", "components", "content", "lib"];
const pattern =
  /\b(?:pricing|prices?|packages?|budgets?|starting from)\b|(?:报价|价格|预算|套餐|起价|费用|价位|收费)/i;
const stripApprovedScopeDisclaimer = (value) =>
  value
    .replace(
      /Each project is scoped around the actual brief\. We do not force clients into fixed public packages\./g,
      ""
    )
    .replace(/每个项目均根据真实需求单独定义，不通过公开固定套餐限制项目范围。/g, "");
const files = [];
const visit = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) visit(target);
    else if (
      /\.(?:ts|tsx|js|mjs)$/.test(entry.name) &&
      pattern.test(stripApprovedScopeDisclaimer(fs.readFileSync(target, "utf8")))
    )
      files.push(target);
  }
};
for (const root of roots) visit(path.join(process.cwd(), root));
if (files.length) {
  console.error(`Prohibited public pricing language found:\n${files.join("\n")}`);
  process.exit(1);
}
console.log("Pricing-removal validation passed.");
