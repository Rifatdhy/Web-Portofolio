import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders the professional first role and CV CTA in the server markup", () => {
    const html = renderToStaticMarkup(<Hero />);

    expect(html).toContain("Web &amp; App Developer");
    expect(html).toContain("Lihat CV");
    expect(html).toContain("/assets/CV%20Rifat%20Dhiya%20Ul%20Lail.pdf");
  });
});
