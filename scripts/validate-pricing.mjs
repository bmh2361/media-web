import { containsPublicPricing } from "./public-pricing-policy.mjs";
import fs from "node:fs";
import path from "node:path";

const roots = ["app", "components", "content", "lib"];
const files = [];
const visit = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) visit(target);
    else if (
      /\.(?:ts|tsx|js|mjs)$/.test(entry.name) &&
      containsPublicPricing(fs.readFileSync(target, "utf8"))
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
