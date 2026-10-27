import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Rifat Dhiya Ul Lail, Web, App & Network Engineer";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgImage({
    title: "Rifat Dhiya Ul Lail",
    subtitle: "Web, App & Network Engineer",
    footer: "React, Next.js, Laravel, TypeScript, Networking",
  });
}
