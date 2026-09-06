import { describe, expect, it } from "vitest";
import { readdirSync } from "node:fs";
import { resolve } from "node:path";
import { allTechs, projects, skillCategories } from "./data";

const iconsDir = resolve(process.cwd(), "public", "icons");

describe("data integrity", () => {
  it("every skill has a matching icon file in public/icons", () => {
    const icons = new Set(readdirSync(iconsDir));
    for (const cat of skillCategories) {
      for (const skill of cat.skills) {
        expect(icons.has(`${skill.slug}.svg`), `${skill.slug}.svg missing`).toBe(true);
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
    }
  });
});
