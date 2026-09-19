import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Curriculum Vitae Rifat Dhiya Ul Lail";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgImage({
    title: "Curriculum Vitae",
    subtitle: "Rifat Dhiya Ul Lail",
    footer: "Web, App & Network Engineer",
  });
}
