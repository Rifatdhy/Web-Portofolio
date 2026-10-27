import { readFile } from "node:fs/promises";

const budgets = {
  performance: 0.8,
  accessibility: 0.95,
  "best-practices": 0.95,
  seo: 0.95,
};

const reportUrl = new URL("../lighthouse.json", import.meta.url);
const report = JSON.parse(await readFile(reportUrl, "utf8"));

let failed = false;

console.log("Lighthouse category scores:");
for (const [category, minimum] of Object.entries(budgets)) {
  const score = report.categories?.[category]?.score;

  if (typeof score !== "number") {
    console.error(`${category}: missing from report`);
    failed = true;
    continue;
  }

  const pass = score >= minimum;
  failed ||= !pass;
  console.log(
    `${category.padEnd(14)} ${String(Math.round(score * 100)).padStart(3)} ` +
      `(minimum ${Math.round(minimum * 100)}) ${pass ? "PASS" : "FAIL"}`,
  );
}

if (failed) {
  console.error("Lighthouse budget failed.");
  process.exitCode = 1;
}
