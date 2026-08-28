import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const profileFile = path.join(root, "content", "media", "presentation-profiles.json");
type Area = { left: number; top: number; right: number; bottom: number };
type Device = "desktop" | "tablet" | "mobile";
type Derivative = { fit: "cover" | "contain"; visibleArea: Area; avifBytes: number };
type Profile = {
  assetId: string;
  focalPoint: { x: number; y: number };
  protectedArea: Area;
  desktopAvifPath: string;
  tabletAvifPath: string;
  mobileAvifPath: string;
  derivatives: Record<Device, Derivative>;
};
type ResultRow = {
  assetId: string;
  device: Device;
  fit: "cover" | "contain";
  safe: boolean;
  exists: boolean;
  kilobytes: number;
};

const profiles = JSON.parse(fs.readFileSync(profileFile, "utf8")).profiles as Profile[];
const errors: string[] = [];
const rows: ResultRow[] = [];

function includesArea(window: Area, area: Area) {
  const epsilon = 0.005;
  return (
    area.left >= window.left - epsilon &&
    area.top >= window.top - epsilon &&
    area.right <= window.right + epsilon &&
    area.bottom <= window.bottom + epsilon
  );
}

for (const profile of profiles) {
  if (
    profile.focalPoint.x < 0 ||
    profile.focalPoint.x > 1 ||
    profile.focalPoint.y < 0 ||
    profile.focalPoint.y > 1
  ) {
    errors.push(`${profile.assetId}: focal point is outside the source image.`);
  }
  for (const device of ["desktop", "tablet", "mobile"] as Device[]) {
    const derivative = profile.derivatives[device];
    const safe = includesArea(derivative.visibleArea, profile.protectedArea);
    const sourcePath = path.join(
      root,
      "public",
      (device === "desktop"
        ? profile.desktopAvifPath
        : device === "tablet"
          ? profile.tabletAvifPath
          : profile.mobileAvifPath
      ).replace(/^\//, "")
    );
    const exists = fs.existsSync(sourcePath);
    const budget = device === "desktop" ? 450 * 1024 : device === "mobile" ? 250 * 1024 : 250 * 1024;
    if (!safe) errors.push(`${profile.assetId}/${device}: protected area is outside the final crop.`);
    if (!exists) errors.push(`${profile.assetId}/${device}: generated AVIF is missing.`);
    if (derivative.avifBytes > budget)
      errors.push(`${profile.assetId}/${device}: AVIF exceeds ${Math.round(budget / 1024)} KB.`);
    rows.push({
      assetId: profile.assetId,
      device,
      fit: derivative.fit,
      safe,
      exists,
      kilobytes: Math.round(derivative.avifBytes / 1024)
    });
  }
}

const report = `# Phase 14 crop safety report

## Result

- Profiles checked: ${profiles.length}.
- Device crops checked: ${rows.length}.
- Protected-area failures: ${rows.filter((row) => !row.safe).length}.
- Missing files: ${rows.filter((row) => !row.exists).length}.
- Overall status: ${errors.length ? "FAIL" : "PASS"}.

## Device summary

| Device | Crops | Cover | Contain | Maximum AVIF | Failures |
| --- | ---: | ---: | ---: | ---: | ---: |
${["desktop", "tablet", "mobile"]
  .map((device) => {
    const items = rows.filter((row) => row.device === device);
    return `| ${device} | ${items.length} | ${items.filter((row) => row.fit === "cover").length} | ${items.filter((row) => row.fit === "contain").length} | ${Math.max(...items.map((row) => row.kilobytes))} KB | ${items.filter((row) => !row.safe || !row.exists).length} |`;
  })
  .join("\n")}

${errors.length ? `## Failures\n\n${errors.map((error) => `- ${error}`).join("\n")}` : "Every protected area remains inside the desktop, tablet and mobile visible window."}
`;

fs.writeFileSync(path.join(root, "docs", "phase-14-crop-safety-report.md"), report);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Validated ${rows.length} responsive crops across ${profiles.length} assets.`);
