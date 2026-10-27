# Portofolio — Rifat Dhiya Ul Lail

Situs portofolio pribadi: **Web, App & Network Engineer**. Monokrom ala Apple,
dark-only, Bahasa Indonesia.

**Live:** [www.rifatdhy.my.id](https://www.rifatdhy.my.id)

## Stack

| Layer | Pilihan |
|-------|---------|
| Framework | Next.js 16 (App Router, Turbopack) + React 19 |
| Bahasa | TypeScript (strict) |
| Styling | Tailwind CSS v4 + token CSS di `src/app/globals.css` |
| Tipografi | System SF stack (`-apple-system`/SF Pro di Apple, Segoe UI/Roboto di OS lain) — tanpa webfont |
| Animasi | Motion (`motion/react`), Lenis untuk smooth scroll |
| Ikon | `@phosphor-icons/react` (SSR variant di server components) |
| Analytics | Vercel Analytics + Speed Insights |
| Test | Vitest (unit/komponen), Playwright + axe (E2E & WCAG) |

## Menjalankan

Butuh Node.js 22 (lihat `.node-version` / `.nvmrc`).

```bash
npm install
npx playwright install chromium   # sekali, untuk E2E lokal
npm run dev                       # http://localhost:3000
```

## Skrip

| Perintah | Fungsi |
|----------|--------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Jalankan hasil build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `next typegen && tsc --noEmit` |
| `npm run test` | Vitest (unit/komponen) |
| `npm run test:e2e` | Playwright + axe (butuh build untuk mode CI) |
| `npm run test:e2e:ui` | Playwright UI mode |

CI (`.github/workflows/ci.yml`) menjalankan dua job pada setiap push dan pull
request ke `master`:

1. **verify** — lint → typecheck → test → `npm audit --audit-level=high` →
   build.
2. **e2e** — install Chromium → build → Playwright (termasuk axe WCAG A/AA).

Gate audit mencakup dependensi dev. `@lhci/cli` sengaja tidak dipakai karena
menarik rantai `basic-ftp`/`extract-zip`/`tmp`/`uuid` yang rentan; Lighthouse
hanya dijalankan di workflow terpisah. Override `zod` di `package.json` menjaga
rantai tooling ESLint tetap memakai versi patch terbaru.

**Lighthouse** (`.github/workflows/lighthouse.yml`, manual atau push ke
`master`) membangun situs, menjalankan `lighthouse@12.8.2` lewat `npx`, lalu
memeriksa budget di `scripts/check-lighthouse.mjs`: performance ≥ 80,
accessibility ≥ 95, best-practices ≥ 95, SEO ≥ 95. Untuk menjalankan lokal:

```bash
npm run build
npm run start
# terminal lain — arahkan CHROME_PATH ke Chrome/Chromium yang tersedia
npx lighthouse@12.8.2 http://127.0.0.1:3000 --output=json \
  --output-path=./lighthouse.json --only-categories=performance,accessibility,best-practices,seo
node scripts/check-lighthouse.mjs
```

`lighthouse.json` adalah artifact lokal/CI dan tidak di-commit.

## Struktur

```
src/
├─ app/                  # App Router
│  ├─ page.tsx           # / — Hero → About → Experience → Projects → Skills → Contact
│  ├─ proyek/            # /proyek — daftar proyek + filter tech
│  ├─ cv/                # /cv — CV online
│  ├─ privacy/           # /privacy
│  ├─ api/csp-report/    # endpoint laporan CSP (legacy + Reporting API)
│  ├─ opengraph-image.tsx, */opengraph-image.tsx   # OG card dinamis
│  ├─ apple-icon.tsx     # ikon iOS (generate via ImageResponse)
│  ├─ sitemap.ts, robots.ts
│  ├─ layout.tsx         # metadata, JSON-LD, background layer
│  ├─ error.tsx          # error boundary route-level
│  └─ template.tsx       # animasi page-enter
├─ components/
│  ├─ layout/            # Footer, FooterNav, ProgressBar, BackToTop, BackLink, SmoothScroll
│  ├─ sections/          # Hero, About, Experience, Projects, Skills, Contact
│  ├─ magic/             # Reveal, ProjectCard, StatNum
│  └─ ui/                # BackgroundPixelStars, LiquidAmbient
└─ lib/
   ├─ constants.ts       # SITE, SOCIAL (URL, kontak, path CV)
   ├─ data.ts            # proyek, skill, pendidikan, pengalaman
   ├─ og.tsx             # renderer OG card bersama
   ├─ data.test.ts       # guard integritas data + gambar proyek
   └─ useReducedMotionSafe.ts

e2e/                     # Playwright: konten, filter URL, mobile overflow,
                         # axe WCAG, dan endpoint laporan CSP
scripts/check-lighthouse.mjs
public/projects/         # cover proyek monokrom (900×506 / 1200×750)
```

## Menambah konten

**Proyek / skill / pengalaman** — sunting `src/lib/data.ts`. Guard test akan
gagal kalau:

- ikon skill tidak ada di `public/icons/` (default `<slug>.svg`, atau nama file di field `icon`)
- `allTechs` tidak sama dengan gabungan `techs` seluruh proyek
- field `image` menunjuk file yang tidak ada di `public/projects/`

Jadi tambahkan juga file ikonnya, dan pastikan `allTechs` ikut diperbarui.

**Halaman baru** — tambahkan ke `pageLinks` di
`src/components/layout/FooterNav.tsx` **dan** ke `src/app/sitemap.ts`. Nav dihapus
pada Sep 2026; footer adalah satu-satunya jalur navigasi antar halaman.

**Tanggal `lastmod` sitemap** sengaja tidak diisi — lihat komentar di
`src/app/sitemap.ts` untuk alasannya (clone shallow membuat `git log -- <path>`
tidak dapat dipercaya).

**Gambar proyek** — isi `image` di `Project` dengan path `/projects/<slug>.png`.
Semua cover diperlakukan sebagai artwork monokrom: screenshot berwarna
dikonversi ke grayscale + di-invert agar menyatu dengan surface gelap. Rasio
16:9, lebar 900–1200px, PNG teroptimasi (< 100 KB). Kartu otomatis memakai
`next/image`; kalau `image` kosong, monogram fallback yang tampil. Alt text
dibuat dari judul proyek, jadi jangan menduplikasi deskripsi di nama file.

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
  kontras. Palet Apple dark (pure black + elevated neutral) dan detail lengkap
  ada di [`brand-guidelines.md`](brand-guidelines.md).
- **Tipografi system-native.** Gunakan `--font-display` / `--font-body` /
  `--font-mono` dari `globals.css`. Jangan menambahkan `next/font` atau
  mem-bundle SF Pro: lisensi Apple tidak mengizinkan distribusi file font, dan
  system stack sudah memberi SF di perangkat Apple.
- **Reduced motion.** Animasi Motion selalu di-guard
  `useReducedMotionSafe()`; CSS reveal, liquid ambient, dan hover transform
  di-guard `prefers-reduced-motion`. Tidak ada animasi loop abadi pada elemen
  UI — hanya dua layer background. Pengecualian: rotator role di hero sengaja
  tetap berjalan meski reduced motion aktif (keputusan produk); parallax glow
  hero tetap statis.
- **Navigasi hash.** Lenis di-import dinamis setelah browser idle. Setelah
  lompat ke `#section`, fokus keyboard dipindahkan ke target (`tabindex="-1"`)
  tanpa mengubah posisi scroll; ini juga berlaku saat reduced motion aktif dan
  saat deep link/back-forward. Skip link `#main-content` tidak dicegat; klik
  modifier dan non-primary button dibiarkan native.
- **Filter proyek** disimpan di URL (`/proyek?tech=React`) supaya bisa
  di-bookmark/di-share dan back/forward bekerja. Nilai tak dikenal jatuh ke
  `Semua`. `ProjectFilter` dibungkus `Suspense` dengan fallback server-rendered
  berisi seluruh grid, jadi HTML statis tetap lengkap untuk crawler dan no-JS.
- **Link eksternal** yang membuka tab baru memakai `rel="noopener noreferrer"`
  dan menyertakan hint "(dibuka di tab baru)" di accessible name. Jangan pakai
  `aria-label` yang menghilangkan teks terlihat — axe
  `label-content-name-mismatch` akan gagal.
- **Ikon di server component** pakai `@phosphor-icons/react/ssr`.
- **Domain produksi** ada di `SITE.url`. Harus host yang benar-benar melayani
  `200` — apex `rifatdhy.my.id` redirect 308 ke `www`, dan scraper tidak
  mengikuti redirect untuk `og:image`.
- **Security headers** ada di `vercel.json`: CSP enforcing, HSTS, COOP/CORP,
  `X-Permitted-Cross-Domain-Policies`, dan `Reporting-Endpoints`. Pelanggaran
  CSP dikirim ke `/api/csp-report`; endpoint hanya mencatat directive, blocked
  URI, dan path dokumen (tanpa query string), dengan batas payload 64 KB.
- **`next-env.d.ts`** di-generate oleh Next dan di-ignore Git. Jalankan
  `npm run typecheck` (memanggil `next typegen` lebih dulu); jangan commit file
  tersebut.
