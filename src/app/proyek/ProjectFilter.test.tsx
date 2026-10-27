import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { projects } from "@/lib/data";
import { ProjectFilter } from "./ProjectFilter";

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
});
