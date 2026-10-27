import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Hero } from "./Hero";

describe("Hero accessibility", () => {
  it("offers a control to pause the rotating role text", () => {
    const html = renderToStaticMarkup(<Hero />);
    const button =
      html.match(/<button[^>]*aria-label="Jeda rotasi teks"[^>]*>/)?.[0] ?? "";

    expect(button).not.toBe("");
    // 44px touch target.
    expect(button).toContain("h-11");
    expect(button).toContain("w-11");
  });
});
