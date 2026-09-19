import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Proyek Rifat Dhiya Ul Lail";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgImage({
    title: "Proyek",
    subtitle: "Rifat Dhiya Ul Lail",
    footer: "Web, Desktop & Mobile",
  });
}
