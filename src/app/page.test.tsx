import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("homepage structure", () => {
  it("presents work before the profile, capabilities, and contact close", () => {
    const html = renderToStaticMarkup(<Home />);
    const order = [
      html.indexOf('id="hero"'),
      html.indexOf('id="proyek"'),
      html.indexOf('id="tentang"'),
      html.indexOf('id="keahlian"'),
      html.indexOf('id="kontak"'),
    ];

    expect(order.every((index) => index >= 0)).toBe(true);
    expect(order).toEqual([...order].sort((a, b) => a - b));
    expect(html).toContain("profile-editorial");
    expect(html).toContain("skills-compact");
    expect(html).toContain("contact-statement");
  });
});
