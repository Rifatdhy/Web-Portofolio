"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";
import { education } from "@/lib/data";
import { SITE } from "@/lib/constants";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { Reveal } from "../magic/Reveal";

function StatNum({ value }: { value: string }) {
  const reduce = useReducedMotionSafe();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView || reduce) return;
    const match = value.match(/^(\d+)(.*)$/);
    if (!match) return;
    const target = Number(match[1]);
    const suffix = match[2];
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span
      ref={ref}
      className="block font-display text-3xl md:text-4xl font-bold tracking-tight tabular-nums text-[var(--color-text-primary)]"
    >
      {value}
    </span>
  );
}

export function About() {
  const items = [
    { num: "2+", label: "Tahun Eksplorasi Web" },
    { num: "5", label: "Project Publik" },
    { num: "S1", label: "Teknik Informatika" },
  ];

  return (
    <section id="tentang" className="pt-20 pb-36 md:pt-24 md:pb-40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-5">
            <Reveal>
              <div className="flex flex-col gap-2">
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-balance">
                  Siapa di balik layar.
                </h2>
                <p
                  className="text-sm mt-6 leading-relaxed font-mono"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {SITE.location} &middot; {SITE.major}
                  <br />
                  Angkatan {SITE.batch}
                </p>
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-7">
            <Reveal>
              <div className="grid grid-cols-3 divide-x divide-[var(--color-border)] border-y border-[var(--color-border)] py-8 mb-12">
                {items.map((stat) => (
                  <div key={stat.label} className="px-4 first:pl-0">
                    <StatNum value={stat.num} />
                    <span className="block mt-1 text-xs text-secondary">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="max-w-prose">
              <p
                className="mt-6 leading-relaxed"
                style={{ color: "var(--color-text-primary)" }}
              >
                Halo, saya Rifat — mahasiswa S1 Teknik Informatika di Jakarta
                Global University dengan latar belakang Teknik Komputer dan
                Jaringan. Saya membangun aplikasi sekaligus memahami
                infrastruktur di baliknya: dari kode frontend sampai
                konektivitas jaringan.
              </p>
            </Reveal>

            <Reveal className="max-w-prose">
              <p className="mt-4 leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                Di sisi software, saya bekerja di ekosistem
                JavaScript/TypeScript — React dan Next.js untuk antarmuka
                yang responsif, Tailwind CSS untuk UI yang konsisten, serta
                Laravel (PHP/MySQL) dan Node.js untuk REST API, pengelolaan database,
                dan integrasi frontend-backend. Saya juga berpengalaman
                membangun aplikasi desktop dengan Java dan aplikasi mobile
                dengan Flutter.
              </p>
            </Reveal>

            <Reveal className="max-w-prose">
              <p className="mt-4 leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                Di sisi infrastruktur, saya memahami TCP/IP, LAN & WAN,
                routing dan switching, VLAN, DHCP, DNS, dan NAT, terbiasa
                konfigurasi jaringan dengan MikroTik RouterOS dan Cisco,
                serta troubleshooting perangkat, konektivitas, dan
                administrasi sistem Linux. Workflow saya didukung Git dan
                GitHub, dengan MySQL dan PostgreSQL untuk data serta
                eksplorasi Docker menuju pengembangan yang lebih
                terstruktur dan scalable.
              </p>
            </Reveal>

            <Reveal className="max-w-prose">
              <p className="mt-4 leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                Saya senang mempelajari teknologi baru lewat proyek akademik
                maupun personal — saat ini fokus memperdalam TypeScript,
                full-stack modern, UI/UX, serta cloud dan deployment, agar
                aplikasi yang saya buat tidak hanya berfungsi dengan baik,
                tetapi juga nyaman dipakai.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-10 md:gap-16 mt-24 md:mt-32">
          <div className="md:col-span-5">
            <Reveal>
              <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
                Pendidikan.
              </h3>
              <div className="section-divider" />
            </Reveal>
          </div>
          <div className="md:col-span-7">
            <div className="edu-timeline">
              {education.map((edu) => (
                <Reveal key={edu.school} className="edu-item">
                  <div className="edu-dot" />
                  <div className="edu-card">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="font-display text-lg font-bold">
                          {edu.school}
                        </h4>
                        <p
                          className="text-sm font-medium mt-0.5"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          {edu.period}
                        </p>
                        <p
                          className="leading-relaxed mt-1"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          {edu.degree}
                        </p>
                        {edu.info && (
                          <p
                            className="text-sm mt-2"
                            style={{ color: "var(--color-text-muted)" }}
                          >
                            {edu.info}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        </div>
    </section>
  );
}
