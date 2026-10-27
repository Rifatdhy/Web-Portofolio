# Design Spec — Rifat Dhiya Ul Lail Portfolio v2

> Revisi: fitur blog, testimoni, contact form/API, visitor counter, dan custom cursor dihapus (Juni 2026). Palet di-update ke monokrom Apple dark: pure black `#000000`, elevated neutral `#1c1c1e`, dan system SF stack tanpa webfont (Okt 2026). Light mode + theme toggle dihapus — dark-only (Sep 2026).

## Overview
Portfolio Next.js 16 (App Router) dengan palet monokrom Apple-like dark-only, halaman CV online, halaman daftar proyek dengan filter, dan analytics.

## Design Read
Portfolio developer untuk recruiter technical & freelance client, dengan bahasa monokrom tanpa accent color — hierarki dibawa oleh tipografi, spacing, dan kontras.

## Tech Stack
| Layer | Pilihan |
|-------|---------|
| Framework | Next.js 16 + TypeScript (strict) |
| Styling | Tailwind CSS v4 (+ CSS custom `globals.css`) |
| Animation | Motion (`motion/react`), guarded `useReducedMotionSafe()` |
| Icons | @phosphor-icons/react |
| Skill icons | Local SVG `public/icons/*.svg` |
| Analytics | Vercel Analytics + Speed Insights |
| Theme | Dark-only, tanpa toggle |
| Fonts | System SF stack (`-apple-system`, SF Pro, Segoe UI/Roboto fallback) — tanpa `next/font` atau webfont |
| Test | Vitest (unit/komponen), Playwright + axe (E2E, WCAG A/AA) |
| CI | GitHub Actions: verify (lint → typecheck → test → audit → build) + e2e; Lighthouse workflow terpisah |

## Color Tokens (Apple-like Monochrome, zero accent, dark-only)

| Token | Value |
|-------|-------|
| --color-surface | #000000 |
| --color-surface-alt | #1c1c1e |
| --color-surface-card | #1c1c1e |
| --color-border | #2c2c2e |
| --color-border-hover | #48484a |
| --color-text-primary | #f5f5f7 |
| --color-text-secondary | #a1a1a6 |
| --color-text-muted | #86868b |

CTA primer menggunakan warna inverted: bg `--color-text-primary`, teks `--color-surface`.

## Typography

- Display/headline: `-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", "Segoe UI", Roboto, Arial, sans-serif`.
- Body: `-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", "Segoe UI", Roboto, Arial, sans-serif`.
- Mono/code: `ui-monospace, "SF Mono", SFMono-Regular, Menlo, Monaco, "Cascadia Code", "Roboto Mono", Consolas, monospace`.
- Body 17px, line-height 1.65, letter-spacing `-0.01em`; heading tracking `-0.022em` sampai `-0.035em`.
- SF Pro tidak di-host sendiri karena lisensi Apple; perangkat non-Apple memakai fallback system (Segoe UI/Roboto).

## Route Structure
| Route | File | Konten |
|-------|------|--------|
| `/` | app/page.tsx | Hero → About → Experience → Projects → Skills → Contact |
| `/proyek` | app/proyek/page.tsx (+ `ProjectFilter.tsx`) | Full project list + filter tech |
| `/cv` | app/cv/page.tsx | Online CV + contact cards + ringkasan |
| `/privacy` | app/privacy/page.tsx | Kebijakan privasi (tanpa form) |
| `404` | app/not-found.tsx | Halaman tidak ditemukan |
| `500` | app/error.tsx, app/global-error.tsx | Error boundary route-level & root |
| `/api/csp-report` | app/api/csp-report/route.ts | Penerima laporan CSP (dynamic) |

Sitemap memuat `/`, `/proyek`, `/cv`, `/privacy` — tanpa fragment `#`.

**Akses antar halaman:** nav dihapus (Sep 2026); link ke Beranda, `/proyek`,
`/cv`, dan `/privacy` disediakan lewat `<nav>` di Footer. Halaman baru harus
ditambahkan ke `pageLinks` di `FooterNav.tsx` **dan** ke `sitemap.ts`.

## Homepage Sections
1. Hero — nama statis (LCP) + role rotator + CTA
2. About — split layout + stat + narasi (dari `aboutParagraphs`) + education timeline
3. Experience — timeline pengalaman (volunteer/internship)
4. Projects — grid 2 kolom kartu proyek (cover monokrom 16:9 + fallback monogram)
5. Skills — grid per kategori + cell stagger via IntersectionObserver
6. Contact — contact cards (WhatsApp, Email, CV, GitHub) + social links
7. Footer — copyright + nav halaman + social links

Filter tech hanya ada di `/proyek` (bukan di homepage).

## Motion
- Page enter (template): opacity/translateY, 0.35s
- Scroll reveal: opacity/translateY stagger, 0.55s
- Hover cards: translateY(-2px s.d. -4px), 0.3s
- Hover buttons: translate + arrow shift, 0.2–0.3s
- Active press: scale(0.97), 0.15s
- prefers-reduced-motion / `useReducedMotionSafe`: collapse to static, dengan pengecualian rotator role hero yang tetap berjalan
- Lenis smooth scroll di-import dinamis setelah idle; skip link `#main-content`
  memakai perilaku native dan klik modifier tidak dicegat

## Data Flow
- Projects: static array `src/lib/data.ts` (+ path cover di `public/projects`)
- Skills: static array + local SVG
- Filter proyek: state di URL `?tech=<nama>`; `useSearchParams` membaca,
  `router.push(..., { scroll: false })` menulis. Nilai tak dikenal → `Semua`.
  `Suspense` fallback berisi grid lengkap yang di-render server, sehingga
  halaman tetap statis, crawlable, dan berfungsi tanpa JS.
- Kontak: deep link WhatsApp / Gmail compose (tanpa backend form)

## Navigation & Focus
- Klik hash (`#section` atau `/#section`) memindahkan fokus ke target dengan
  `tabindex="-1"` tanpa mengubah posisi scroll.
- Berlaku untuk reduced motion (Lenis tidak aktif), deep link awal,
  `hashchange`, dan back/forward. Next `Link` memanggil `preventDefault`, jadi
  listener fokus tidak boleh membuang event tersebut.
- Skip link `#main-content` tetap native.

## Security, SEO & Observability
- CSP enforcing + `report-uri`/`report-to` di `vercel.json`; laporan masuk ke
  `/api/csp-report`, dibatasi 64 KB dan hanya mencatat directive/blocked
  URI/path dokumen tanpa query string.
- Header tambahan: HSTS, COOP, CORP, `X-Permitted-Cross-Domain-Policies`,
  `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`.
- JSON-LD `Person` memuat deskripsi, email, kota, bahasa, dan `knowsAbout`;
  `<` di-escape sebelum di-inject.
- OG image dinamis per route; canonical per halaman (bukan di layout).
- E2E memeriksa konten, filter URL, overflow mobile, axe, dan endpoint CSP.
  Lighthouse budget: performance 80, a11y 95, best-practices 95, SEO 95.

## Brand Assets to Preserve
- Monogram "RD" (warm gray `#787774`, `public/favicon.svg`)
- CV PDF (`public/assets/CV Rifat.pdf`)
- Existing project data dan deskripsi
- Local skill icons
