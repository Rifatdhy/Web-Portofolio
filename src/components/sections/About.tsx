"use client";

import { education } from "@/lib/data";
import { SITE } from "@/lib/constants";
import { Reveal } from "../magic/Reveal";

export function About() {
  const items = [
    { num: "2+", label: "Tahun Eksplorasi Web" },
    { num: "5", label: "Project Publik" },
    { num: "S1", label: "Teknik Informatika" },
  ];

  return (
    <section id="tentang" className="pt-20 pb-36 md:pt-24 md:pb-40 section-rule">
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
                    <span className="block font-display text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-text-primary)]">
                      {stat.num}
                    </span>
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
                Halo, saya Rifat, mahasiswa S1 Teknik Informatika di Jakarta
                Global University dengan latar belakang Teknik Komputer dan
                Jaringan. Saya memiliki ketertarikan pada software development
                dan infrastruktur teknologi, dengan pengalaman mengembangkan
                aplikasi sekaligus memahami bagaimana sistem dan jaringan di
                baliknya bekerja.
              </p>
            </Reveal>

            <Reveal className="max-w-prose">
              <p className="mt-4 leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                Di bidang software development, saya berfokus pada
                pengembangan aplikasi web dan terus memperdalam ekosistem
                JavaScript/TypeScript. Saya terbiasa menggunakan React dan
                Next.js untuk membangun antarmuka web yang responsif dan
                modern, serta Tailwind CSS untuk pengembangan UI yang
                konsisten dan efisien. Untuk kebutuhan backend, saya memiliki
                pengalaman menggunakan Laravel dan Node.js, termasuk membangun
                REST API, mengelola database, serta mengintegrasikan frontend
                dengan layanan backend. Saya juga memiliki pengalaman
                mengembangkan aplikasi desktop menggunakan Java dan aplikasi
                mobile.
              </p>
            </Reveal>

            <Reveal className="max-w-prose">
              <p className="mt-4 leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                Selain pengembangan aplikasi, saya memiliki dasar yang kuat di
                bidang jaringan komputer dan IT infrastructure. Dengan latar
                belakang Teknik Komputer dan Jaringan, saya memahami konsep
                routing, switching, TCP/IP, serta konfigurasi dan administrasi
                jaringan menggunakan MikroTik dan Cisco. Saya juga terbiasa
                melakukan troubleshooting perangkat, konektivitas jaringan,
                serta administrasi sistem berbasis Linux.
              </p>
            </Reveal>

            <Reveal className="max-w-prose">
              <p className="mt-4 leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                Dalam proses pengembangan, saya menggunakan Git dan GitHub
                untuk version control serta memahami workflow pengembangan dan
                deployment aplikasi. Saya juga mulai mendalami Docker, database
                seperti MySQL dan PostgreSQL, serta praktik pengembangan
                aplikasi yang lebih terstruktur dan scalable.
              </p>
            </Reveal>

            <Reveal className="max-w-prose">
              <p className="mt-4 leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                Saya memiliki rasa ingin tahu yang tinggi dan senang
                mempelajari teknologi baru melalui proyek akademik maupun
                personal. Saat ini, saya terus meningkatkan kemampuan di bidang
                TypeScript, modern full-stack development, UI/UX, cloud dan
                deployment, serta eksplorasi berbagai tools dan teknologi yang
                dapat menghasilkan aplikasi yang tidak hanya berfungsi dengan
                baik, tetapi juga memiliki pengalaman pengguna yang optimal.
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
