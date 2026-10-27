import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Kebijakan Privasi Rifat Dhiya Ul Lail";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgImage({
    title: "Kebijakan Privasi",
    subtitle: "Rifat Dhiya Ul Lail",
    footer: "Web, App & Network Engineer",
  });
}
