import { describe, expect, it } from "vitest";
import { metadata as proyekMetadata } from "../app/proyek/page";
import { metadata as cvMetadata } from "../app/cv/page";
import { metadata as privacyMetadata } from "../app/privacy/page";
import { SITE } from "./constants";
import { projects } from "./data";
import { buildPageMetadata } from "./metadata";
import sitemap from "../app/sitemap";

describe("page metadata", () => {
  it("builds title, canonical, Open Graph, and Twitter fields from one input", () => {
    const metadata = buildPageMetadata({
      title: "Proyek",
      description: "Deskripsi proyek.",
      path: "/proyek",
    });

    expect(metadata.title).toBe(`Proyek | ${SITE.name}`);
    expect(metadata.alternates?.canonical).toBe("/proyek");
    expect(metadata.openGraph?.title).toBe(`Proyek | ${SITE.name}`);
    expect(metadata.openGraph?.description).toBe("Deskripsi proyek.");
    expect(metadata.openGraph?.url).toBe("/proyek");
    expect(metadata.openGraph).toMatchObject({ type: "website" });
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
    expect(metadata.twitter?.title).toBe(`Proyek | ${SITE.name}`);
    expect(metadata.twitter?.description).toBe("Deskripsi proyek.");
  });

  it("gives /proyek its own social URL instead of inheriting the homepage", () => {
    expect(proyekMetadata.openGraph?.url).toBe("/proyek");
    expect(proyekMetadata.openGraph?.title).toBe(`Proyek | ${SITE.name}`);
    expect(proyekMetadata.twitter?.title).toBe(`Proyek | ${SITE.name}`);
  });

  it("gives /cv its own social URL instead of inheriting the homepage", () => {
    expect(cvMetadata.openGraph?.url).toBe("/cv");
    expect(cvMetadata.openGraph?.title).toBe(
      `Curriculum Vitae | ${SITE.name}`,
    );
    expect(cvMetadata.twitter?.title).toBe(
      `Curriculum Vitae | ${SITE.name}`,
    );
  });

  it("gives /privacy its own social URL instead of inheriting the homepage", () => {
    expect(privacyMetadata.openGraph?.url).toBe("/privacy");
    expect(privacyMetadata.openGraph?.title).toBe(
      `Kebijakan Privasi | ${SITE.name}`,
    );
    expect(privacyMetadata.twitter?.title).toBe(
      `Kebijakan Privasi | ${SITE.name}`,
    );
  });

  it("includes every project detail URL in the sitemap", () => {
    const urls = sitemap().map((entry) => entry.url);

    for (const project of projects) {
      expect(urls).toContain(`${SITE.url}/proyek/${project.slug}`);
    }
  });
});
