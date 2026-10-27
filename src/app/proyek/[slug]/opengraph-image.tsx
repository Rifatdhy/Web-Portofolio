import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/data";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return renderOgImage({
    title: project.title,
    subtitle: project.description,
    footer: "Rifat Dhiya Ul Lail",
  });
}
