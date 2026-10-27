import type { Metadata } from "next";
import { SITE } from "./constants";

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
}

/**
 * Single source for per-page title, canonical, Open Graph, and Twitter
 * metadata. Keeps social URLs pointed at the page itself instead of
 * inheriting the homepage URL from the root layout.
 */
export function buildPageMetadata({
  title,
  description,
  path,
}: PageMetadataInput): Metadata {
  const fullTitle = `${title} | ${SITE.name}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
