"use client";

import Image from "next/image";
import { skillCategories } from "@/lib/data";
import { Reveal } from "../magic/Reveal";

export function Skills() {
  const pastelColors = [
    "pastel-blue",
    "pastel-green",
    "pastel-yellow",
    "pastel-red",
  ];

  const colMap: Record<number, string> = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-3",
    4: "sm:grid-cols-4",
  };

  function colsFor(count: number): string {
    if (count % 4 === 0) return colMap[4]!;
    if (count % 3 === 0) return colMap[3]!;
    return colMap[2]!;
  }

  return (
    <section id="keahlian" className="py-28 md:py-32 section-rule">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="mb-12 md:mb-16 flex flex-col gap-2">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
              Teknologi &amp; perangkat
              <br />
              yang saya pakai sehari-hari.
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-12 gap-4 md:gap-5">
          {skillCategories.map((cat, catIdx) => {
            const pastelClass = pastelColors[catIdx] || "pastel-blue";
            return (
              <Reveal
                key={cat.name}
                className={
                  catIdx === 0
                    ? "md:col-span-7"
                    : catIdx === 1
                      ? "md:col-span-5"
                      : "md:col-span-6"
                }
                style={{ transitionDelay: `${catIdx * 0.08}s` }}
              >
                <div>
                  <div className={`badge ${pastelClass} mb-4`}>
                    {cat.name}
                  </div>
                  <div className={`grid grid-cols-2 gap-3 ${colsFor(cat.skills.length)}`}>
                    {cat.skills.map((skill, i) => (
                      <div key={skill.name} className="skill-cell" style={{ transitionDelay: `${i * 0.06}s` }}>
                        <Image
                            src={`/icons/${skill.slug}.svg`}
                            alt={skill.name}
                            width={28}
                            height={28}
                            className="w-7 h-7"
                            unoptimized
                          />
                        <span translate="no">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
