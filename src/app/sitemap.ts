import type { MetadataRoute } from "next";
import { execFileSync } from "node:child_process";
import { SITE } from "@/lib/constants";

/**
 * Last-modified date for a source path, taken from git so it reflects when
 * the content actually changed instead of resetting to "today" on every
 * deploy (which trains crawlers to ignore `lastmod`).
 *
 * Falls back to the build time when git isn't available — e.g. a shallow
 * or archive-based build — so this can never fail the build.
 */
function lastModifiedFor(path: string, fallback: Date): Date {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", path], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    const date = new Date(out);
    return Number.isNaN(date.getTime()) ? fallback : date;
  } catch {
    return fallback;
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const buildTime = new Date();
  const home = lastModifiedFor("src/app/page.tsx", buildTime);
  const proyek = lastModifiedFor("src/app/proyek/page.tsx", buildTime);
  const cv = lastModifiedFor("src/app/cv/page.tsx", buildTime);
  const privacy = lastModifiedFor("src/app/privacy/page.tsx", buildTime);

  return [
    {
      url: SITE.url,
      lastModified: home,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE.url}/proyek`,
      lastModified: proyek,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE.url}/cv`,
      lastModified: cv,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE.url}/privacy`,
      lastModified: privacy,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
