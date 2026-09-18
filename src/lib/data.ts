export interface Project {
  title: string;
  description: string;
  href: string;
  techs: string[];
  demo?: string;
  image?: string;
}

export interface Education {
  school: string;
  degree: string;
  period: string;
  info?: string;
}

export interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
}

export const about = "Mahasiswa S1 Teknik Informatika di Jakarta Global University dengan latar belakang Teknik Komputer dan Jaringan. Berpengalaman mengembangkan aplikasi web menggunakan React.js, Laravel, PHP, JavaScript, Tailwind CSS, dan MySQL melalui proyek akademik maupun personal. Familiar dengan jaringan komputer meliputi TCP/IP, LAN & WAN, routing dan switching, VLAN, DHCP, DNS, NAT, dan MikroTik RouterOS, serta lingkungan Linux dan troubleshooting IT. Memadukan kemampuan software development dengan networking dan IT support untuk membangun solusi teknologi yang praktis.";

export const education: Education[] = [
  {
    school: "Jakarta Global University",
    degree: "S1 Teknik Informatika",
    period: "2024 - Sekarang",
    info: "IPK 3.48/4.00 · Struktur Data & Algoritma, Rekayasa Perangkat Lunak, Sistem Basis Data, Jaringan Komputer, Pemrograman Web",
  },
  {
    school: "SMK Negeri 3 Depok",
    degree: "Teknik Komputer dan Jaringan",
    period: "2020 - 2023",
    info: "Infrastruktur Jaringan, Administrasi Linux & Server, Konfigurasi Router & Switch, Dasar Keamanan Jaringan",
  },
];

export const experiences: Experience[] = [
  {
    company: "World Cup Qualifier",
    position: "Ticketing & Helpdesk Volunteer",
    period: "-",
    description: "Memberikan bantuan teknis on-site untuk operasional tiket digital: membantu akses, pembuatan, dan pengelolaan tiket, troubleshooting masalah dasar, memandu pengguna, serta berkoordinasi dengan tim menjaga kelancaran acara."
  },
  {
    company: "BAPENDA Provinsi DKI Jakarta",
    position: "Administrative Staff Intern",
    period: "Jan 2023 - Mar 2023",
    description: "Menjaga dan memverifikasi 500 catatan data wajib pajak untuk akurasi data, membantu pengorganisasian dokumen resmi dan laporan administrasi, memperbarui database, serta mendukung operasional kantor harian."
  },
  {
    company: "Komisi Pemilihan Umum",
    position: "Anggota KPPS",
    period: "-",
    description: "Memverifikasi identitas pemilih dan dokumen pemilu saat proses pemungutan suara, membantu pemeriksaan dan penghitungan suara, memastikan prosedur sesuai peraturan resmi, serta menyusun laporan secara akurat dan tepat waktu."
  }
]

export const projects: Project[] = [
  {
    title: "Clash.Soccer",
    description: "Website berita sepak bola responsif dengan komponen UI reusable, dicapai menggunakan React.js dan Tailwind CSS untuk desktop maupun mobile-first.",
    href: "https://github.com/Rifatdhy/Clash-Soccer",
    techs: ["React", "TailwindCSS", "JavaScript"],
  },
  {
    title: "ECO RANGERS",
    description: "Aplikasi web tentang kesadaran lingkungan dan gaya hidup berkelanjutan dengan fitur inti dibangun menggunakan PHP dan MySQL serta antarmuka responsif.",
    href: "https://github.com/Rifatdhy/ECO-RANGERS",
    techs: ["PHP", "MySQL", "HTML5", "CSS", "JavaScript"],
  },
  {
    title: "FINN BUDDY",
    description: "Aplikasi mobile cross-platform yang dibangun dengan Flutter dan Dart, dengan komponen UI reusable, layout responsif untuk berbagai ukuran layar, dan navigasi yang intuitif.",
    href: "https://github.com/Rifatdhy/FINN-BUDDY",
    techs: ["Flutter", "Dart"],
  },
  {
    title: "NodeVault",
    description: "P2P file sharing dan music streaming terdesentralisasi. Setiap laptop menjadi peer yang menyimpan filenya sendiri. Backend Java SE, frontend vanilla HTML/CSS/JS.",
    href: "https://github.com/Rifatdhy/NodeVault",
    techs: ["Java", "HTML5", "CSS", "JavaScript"],
  },
  {
    title: "TODO-List",
    description: "Aplikasi pencatat tugas harian berbasis web, dibangun dengan React, TypeScript, Vite, dan Tailwind CSS.",
    href: "https://github.com/Rifatdhy/TODO-List",
    techs: ["React", "TypeScript", "Vite", "TailwindCSS"],
  },
];

export const allTechs = [
  "HTML5",
  "CSS",
  "JavaScript",
  "React",
  "TailwindCSS",
  "PHP",
  "MySQL",
  "Java",
  "TypeScript",
  "Vite",
  "Flutter",
  "Dart",
];

export const skillCategories = [
  {
    name: "Programming & Frontend",
    skills: [
      { name: "JavaScript", slug: "javascript" },
      { name: "TypeScript", slug: "typescript" },
      { name: "React", slug: "react" },
      { name: "Next.js", slug: "nextjs" },
      { name: "Tailwind CSS", slug: "tailwindcss" },
      { name: "Bootstrap", slug: "bootstrap" },
      { name: "HTML5", slug: "html5" },
      { name: "CSS3", slug: "css" },
      { name: "Flutter", slug: "flutter" },
      { name: "Dart", slug: "dart" },
    ],
  },
  {
    name: "Backend & Database",
    skills: [
      { name: "Laravel", slug: "laravel" },
      { name: "Node.js", slug: "nodejs" },
      { name: "Java", slug: "openjdk" },
      { name: "PHP", slug: "php" },
      { name: "PostgreSQL", slug: "postgresql" },
      { name: "Python", slug: "python" },
      { name: "MySQL", slug: "mysql" },
      { name: "REST API", slug: "insomnia" },
    ],
  },
  {
    name: "Networking",
    skills: [
      { name: "Cisco", slug: "cisco" },
      { name: "MikroTik", slug: "mikrotik" },
      { name: "Ubuntu", slug: "ubuntu" },
      { name: "Linux", slug: "linux" },
    ],
  },
  {
    name: "Tools",
    skills: [
      { name: "Git", slug: "git" },
      { name: "GitHub", slug: "github" },
      { name: "Docker", slug: "docker" },
      { name: "Express", slug: "express" },
      { name: "Prisma", slug: "prisma" },
      { name: "Postman", slug: "postman" },
      { name: "VS Code", slug: "vscode" },
      { name: "Winbox", slug: "winbox" },
    ],
  },
];
