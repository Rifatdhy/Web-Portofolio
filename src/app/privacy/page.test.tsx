import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import PrivacyPage from "./page";

describe("PrivacyPage", () => {
  it("names every analytics service the site loads", () => {
    const html = renderToStaticMarkup(<PrivacyPage />);

    expect(html).toContain("Vercel Analytics");
    expect(html).toContain("Speed Insights");
  });

  it("shows the latest revision date", () => {
    const html = renderToStaticMarkup(<PrivacyPage />);

    expect(html).toContain("Oktober 2026");
  });
});
