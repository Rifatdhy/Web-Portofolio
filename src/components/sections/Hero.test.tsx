import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders the first role text in the server markup", () => {
    const html = renderToStaticMarkup(<Hero />);

    expect(html).toContain("Software Enthusiast");
  });
});
