import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Skills } from "./Skills";

describe("Skills accessibility", () => {
  it("hides decorative skill icons because the skill name is already text", () => {
    const html = renderToStaticMarkup(<Skills />);
    const iconTags = html.match(/<img[^>]*class="[^"]*w-7[^"]*"[^>]*>/g) ?? [];

    expect(iconTags.length).toBeGreaterThan(0);
    for (const tag of iconTags) {
      expect(tag).toContain('alt=""');
    }
  });

  it("uses neutral category styling instead of stale pastel names", () => {
    const html = renderToStaticMarkup(<Skills />);

    expect(html).toContain("badge-category");
    expect(html).not.toContain("pastel-");
  });
});
