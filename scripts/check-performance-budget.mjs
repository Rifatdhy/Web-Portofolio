import { readFile } from "node:fs/promises";

const css = await readFile(new URL("../src/app/globals.css", import.meta.url), "utf8");
const failures = [];

if (/will-change\s*:/.test(css)) {
  failures.push("permanent will-change declarations are not allowed");
}

if (/blur\(100px\)/.test(css)) {
  failures.push("ambient blur must stay at or below the measured 24px budget");
}

for (const selector of ["skill-cell", "social-link", "badge", "filter-pill"]) {
  const start = css.indexOf(`.${selector} {`);
  const end = start === -1 ? -1 : css.indexOf("\n}", start);
  const block = start === -1 || end === -1 ? "" : css.slice(start, end);
  if (/backdrop-filter\s*:/.test(block)) {
    failures.push(`.${selector} must not use backdrop-filter`);
  }
}

for (const keyframe of ["liquid-morph-1", "liquid-morph-2", "liquid-morph-3"]) {
  const start = css.indexOf(`@keyframes ${keyframe}`);
  const end = start === -1 ? -1 : css.indexOf("\n}", start);
  const block = start === -1 || end === -1 ? "" : css.slice(start, end);
  if (/border-radius\s*:/.test(block)) {
    failures.push(`${keyframe} must animate transforms only`);
  }
}

if (failures.length > 0) {
  for (const failure of failures) console.error(`Performance budget: ${failure}`);
  process.exitCode = 1;
} else {
  console.log("Performance budget passed.");
}
