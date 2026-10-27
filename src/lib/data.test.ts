import { describe, expect, it } from "vitest";
import { existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { allTechs, getProjectBySlug, projects, skillCategories } from "./data";
import { SITE } from "./constants";

const iconsDir = resolve(process.cwd(), "public", "icons");

describe("data integrity", () => {
  it("every skill has a matching icon file in public/icons", () => {
    const icons = new Set(readdirSync(iconsDir));
    for (const cat of skillCategories) {
      for (const skill of cat.skills) {
        const icon = skill.icon ?? `${skill.slug}.svg`;
        expect(icons.has(icon), `${icon} missing`).toBe(true);
      }
    }
  });

  it("allTechs matches the union of project techs", () => {
    const union = [...new Set(projects.flatMap((p) => p.techs))].sort();
    expect([...allTechs].sort()).toEqual(union);
  });

  it("projects have unique titles and valid hrefs", () => {
    const titles = projects.map((p) => p.title);
    expect(new Set(titles).size).toBe(titles.length);
    for (const p of projects) {
      expect(p.href).toMatch(/^https?:\/\//);
      expect(p.techs.length).toBeGreaterThan(0);
      if (p.demo !== undefined) {
        expect(p.demo).toMatch(/^https?:\/\//);
      }
    }
  });

  it("projects have unique URL-safe slugs and resolve by slug", () => {
    const slugs = projects.map((project) => project.slug);

    expect(slugs.every((slug) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))).toBe(true);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(getProjectBySlug("clash-soccer")?.title).toBe("Clash.Soccer");
    expect(getProjectBySlug("does-not-exist")).toBeUndefined();
  });

  it("configured project images exist in public/", () => {
    for (const project of projects) {
      if (!project.image) continue;

      expect(project.image, project.title).toMatch(
        /^\/projects\/[a-z0-9-]+\.png$/,
      );
      const filePath = resolve(
        process.cwd(),
        "public",
        project.image.replace(/^\//, ""),
      );
      expect(existsSync(filePath), `${project.image} missing`).toBe(true);
    }
  });

  it("SITE.cvPath points at a real file in public/", () => {
    const filePath = resolve(
      process.cwd(),
      "public",
      decodeURIComponent(SITE.cvPath).replace(/^\//, ""),
    );
    expect(existsSync(filePath), `${SITE.cvPath} missing`).toBe(true);
  });
});
