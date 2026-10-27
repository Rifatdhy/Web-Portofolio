import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { projects } from "@/lib/data";
import { ProjectFilter } from "./ProjectFilter";

const { mockSearchParams } = vi.hoisted(() => ({
  mockSearchParams: new URLSearchParams(),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/proyek",
  useRouter: () => ({ push: vi.fn() }),
  useSearchParams: () => mockSearchParams,
}));

beforeEach(() => {
  mockSearchParams.delete("tech");
});

describe("ProjectFilter accessibility", () => {
  it("exposes the filters as a labelled toggle group", () => {
    const html = renderToStaticMarkup(<ProjectFilter />);

    expect(html).toContain('role="group"');
    expect(html).toContain('aria-label="Filter proyek berdasarkan teknologi"');
    expect(html).toContain('aria-controls="daftar-proyek"');
    expect(html).toContain('aria-pressed="true"');
  });

  it("announces the result count and labels the project list", () => {
    const html = renderToStaticMarkup(<ProjectFilter />);

    expect(html).toContain('role="status"');
    expect(html).toContain(`Menampilkan ${projects.length} proyek.`);
    expect(html).toContain('id="daftar-proyek"');
    expect(html).toContain('aria-labelledby="daftar-proyek-heading"');
  });

  it("reads the active tech filter from the URL", () => {
    mockSearchParams.set("tech", "React");
    const html = renderToStaticMarkup(<ProjectFilter />);

    expect(html).toContain("Menampilkan 2 proyek dengan filter React.");
    expect(html).toContain("Clash.Soccer");
    expect(html).not.toContain("FINN BUDDY");
  });
});
