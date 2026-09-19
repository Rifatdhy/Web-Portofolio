# Portofolio — Rifat Dhiya Ul Lail

Situs portofolio pribadi: **Web, App & Network Engineer**. Monokrom, dark-only,
Bahasa Indonesia.

**Live:** [www.rifatdhy.my.id](https://www.rifatdhy.my.id)

## Stack

| Layer | Pilihan |
|-------|---------|
| Framework | Next.js 16 (App Router, Turbopack) + React 19 |
| Bahasa | TypeScript (strict) |
| Styling | Tailwind CSS v4 + token CSS di `src/app/globals.css` |
| Animasi | Motion (`motion/react`), Lenis untuk smooth scroll |
| Ikon | `@phosphor-icons/react` (SSR variant di server components) |
| Analytics | Vercel Analytics + Speed Insights |
| Test | Vitest (integritas data) |

## Menjalankan

Butuh Node.js 22 (lihat `.node-version`).

```bash
npm install
npm run dev        # http://localhost:3000
```

## Skrip

| Perintah | Fungsi |
|----------|--------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Jalankan hasil build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test` | Vitest |

CI (`.github/workflows/ci.yml`) menjalankan kelima langkah di atas secara
berurutan pada setiap push dan pull request ke `master`. Semua wajib hijau.

## Struktur

```
src/
├─ app/                  # App Router
│  ├─ page.tsx           # / — Hero → About → Experience → Projects → Skills → Contact
│  ├─ proyek/            # /proyek — daftar proyek + filter tech
│  ├─ cv/                # /cv — CV online
│  ├─ privacy/           # /privacy
│  ├─ opengraph-image.tsx, */opengraph-image.tsx   # OG card dinamis
│  ├─ apple-icon.tsx     # ikon iOS (generate via ImageResponse)
│  ├─ sitemap.ts, robots.ts
│  ├─ layout.tsx         # font, metadata, JSON-LD, background layer
│  └─ template.tsx       # animasi page-enter
├─ components/
│  ├─ layout/            # Footer, ProgressBar, BackToTop, SmoothScroll
│  ├─ sections/          # Hero, About, Experience, Projects, Skills, Contact
│  ├─ magic/             # Reveal, ProjectCard
│  └─ ui/                # BackgroundPixelStars, LiquidAmbient
└─ lib/
   ├─ constants.ts       # SITE, SOCIAL (URL, kontak, path CV)
   ├─ data.ts            # proyek, skill, pendidikan, pengalaman
   ├─ og.tsx             # renderer OG card bersama
   ├─ data.test.ts       # guard integritas data
   └─ useReducedMotionSafe.ts
```

## Menambah konten

**Proyek / skill / pengalaman** — sunting `src/lib/data.ts`. Guard test akan
gagal kalau:

- ikon skill tidak ada di `public/icons/<slug>.svg`
- `allTechs` tidak sama dengan gabungan `techs` seluruh proyek

Jadi tambahkan juga file SVG ikonnya, dan pastikan `allTechs` ikut diperbarui.

**Halaman baru** — tambahkan ke `pageLinks` di
`src/components/layout/Footer.tsx` **dan** ke `src/app/sitemap.ts`. Nav dihapus
pada Sep 2026; footer adalah satu-satunya jalur navigasi antar halaman.

**Tanggal `lastmod` sitemap** sengaja tidak diisi — lihat komentar di
`src/app/sitemap.ts` untuk alasannya (clone shallow membuat `git log -- <path>`
tidak dapat dipercaya).

**Gambar proyek** — belum dipakai. Kartu proyek memakai monogram fallback;
tambahkan field `image` di `Project` beserta gambarnya kalau screenshot sudah
tersedia.

## Dependabot

`minor`/`patch` dikelompokkan jadi satu PR mingguan. Tiga bump `major` sengaja
di-`ignore` di `.github/dependabot.yml` — bukan karena malas, tapi karena
ketiganya merusak:

- **`@types/node`** harus mengikuti major runtime di `.node-version` (22).
  Bump ke 26 membuat tipe mendeskripsikan API Node 26 yang tidak ada di
  runtime — `typecheck` hijau, produksi bisa gagal.
- **`eslint` 10** belum didukung `eslint-config-next@16`: plugin transitif
  `eslint-plugin-react@^7` masih memanggil `context.getFilename()` yang dihapus
  di ESLint 10, sehingga `npm run lint` mati dengan
  `contextOrFilename.getFilename is not a function`.
- **`typescript` 7** ditolak `typescript-eslint` yang dibundel
  `eslint-config-next`: `npm run lint` mati dengan
  `typescript-eslint does not support TS 7.0.` (pelacakan:
  `typescript-eslint/typescript-eslint#10940`).

Hapus entri `ignore` yang bersangkutan begitu runtime naik / dependensi hulu
mendukung versi barunya.

## Konvensi

- **Dark-only, zero accent color.** Hierarki dibawa tipografi, spacing, dan
  kontras. Detail lengkap di [`brand-guidelines.md`](brand-guidelines.md).
- **Reduced motion.** Animasi Motion selalu di-guard
  `useReducedMotionSafe()`; CSS reveal di-guard `prefers-reduced-motion`.
  Tidak ada animasi loop abadi pada elemen UI — hanya dua layer background.
- **Ikon di server component** pakai `@phosphor-icons/react/ssr`.
- **Domain produksi** ada di `SITE.url`. Harus host yang benar-benar melayani
  `200` — apex `rifatdhy.my.id` redirect 308 ke `www`, dan scraper tidak
  mengikuti redirect untuk `og:image`.
