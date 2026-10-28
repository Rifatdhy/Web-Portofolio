import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Projects } from "./Projects";

describe("Projects visual treatment", () => {
  it("uses an editorial performance grid without changing project content", () => {
    const html = renderToStaticMarkup(<Projects />);

    expect(html).toContain("projects-editorial");
    expect(html).toContain("projects-rule");
    expect(html).toContain("Clash.Soccer");
    expect(html).toContain("TODO-List");
  });
});
