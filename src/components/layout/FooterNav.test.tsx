import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/cv",
}));

import { FooterNav } from "./FooterNav";

describe("FooterNav", () => {
  it("marks the current page with aria-current", () => {
    const html = renderToStaticMarkup(<FooterNav />);

    const anchors = [...html.matchAll(/<a[^>]*>/g)].map((match) => match[0]);
    const current = anchors.find((anchor) => anchor.includes('href="/cv"'));
    const other = anchors.find((anchor) => anchor.includes('href="/proyek"'));

    expect(current).toContain('aria-current="page"');
    expect(other).not.toContain('aria-current="page"');
  });

  it("links back to the homepage from every page", () => {
    const html = renderToStaticMarkup(<FooterNav />);
    const home = html.match(/<a[^>]*href="\/"[^>]*>Beranda<\/a>/)?.[0];

    expect(home).toBeDefined();
  });
});
