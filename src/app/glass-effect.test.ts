import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { describe, expect, it } from "vitest";
import Home from "./page";

const css = readFileSync(new URL("./globals.css", import.meta.url), "utf8");

function baseRule(selector: string): string {
  const start = css.indexOf(`${selector} {`);
  const end = start === -1 ? -1 : css.indexOf("\n}", start);
  return start === -1 || end === -1 ? "" : css.slice(start, end);
}

describe("Apple-style glass surfaces", () => {
  it("defines a restrained glass treatment for the approved primary surfaces", () => {
    expect(css).toContain("--glass-surface");
    expect(css).toContain(".glass-surface");
    expect(css).toContain("--glass-backdrop: blur(18px) saturate(145%)");
    expect(css).toContain("backdrop-filter: var(--glass-backdrop)");
    expect(css).toContain(".filter-pill.glass-surface");
    expect(css).toContain(".profile-editorial .edu-card.glass-surface");
    expect(css).toContain(".contact-statement .contact-card.glass-surface");
  });

  it("lets the shared glass rule win over legacy card defaults", () => {
    expect(css.indexOf(".glass-surface {")).toBeGreaterThan(css.indexOf(".cv-card {"));
  });

  it("keeps small decorative and repeated controls outside the blur budget", () => {
    expect(baseRule(".skill-cell")).not.toContain("backdrop-filter");
    expect(baseRule(".social-link")).not.toContain("backdrop-filter");
    expect(css).toContain("@media (prefers-reduced-transparency: reduce)");
    expect(css).toContain(".glass-surface");
  });

  it("does not use decorative separator lines between homepage sections", () => {
    const html = renderToStaticMarkup(createElement(Home));

    expect(html).not.toContain("section-divider");
    expect(html).not.toContain("border-y border-[var(--color-border)]");
    expect(html).not.toContain("divide-x divide-[var(--color-border)]");
    expect(html).not.toContain("border-t border-[var(--color-border)]");
    expect(html).not.toContain("border-b border-white/10");
    expect(html).not.toContain("bg-[var(--color-border-hover)]");
    expect(html).not.toContain("borderBottom");
    expect(css).not.toMatch(/\.profile-editorial\s*\{[\s\S]*?border-top/);
    expect(css).not.toMatch(/\.contact-statement\s*\{[\s\S]*?border-top/);
    expect(css).not.toMatch(/\.profile-editorial \.edu-card:not\(\.glass-surface\)[^{]*\{[\s\S]*?border-top/);
    expect(css).not.toMatch(/\.skills-compact \.badge-category\s*\{[\s\S]*?border-bottom/);
    expect(css).not.toContain(".edu-timeline::before");
    expect(css).not.toContain(".section-divider");
  });
});
