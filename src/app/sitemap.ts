import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

/**
 * `lastModified` is intentionally omitted.
 *
 * The obvious source is `git log -1 -- <path>`, but both Vercel and
 * `actions/checkout` clone shallow by default (depth 1). In a shallow clone
 * `git log -- <path>` returns the tip commit for *every* path, changed or
 * not — so it would report the deploy date, which is the same inaccuracy as
 * calling `new Date()` here. Google ignores a `lastmod` it can't trust, so a
 * wrong value is worse than none.
 *
 * Re-add it only with a real per-page date source (e.g. a maintained
 * `updated` field in `src/lib/data.ts`).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE.url}/proyek`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE.url}/cv`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE.url}/privacy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
