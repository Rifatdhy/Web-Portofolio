# Design Spec — Rifat Dhiya Ul Lail Portfolio v2

> Revisi: fitur blog, testimoni, contact form/API, visitor counter, dan custom cursor dihapus (Juni 2026). Palet di-update ke monokrom Apple-like. Light mode + theme toggle dihapus — dark-only (Sep 2026).

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
| Fonts | next/font (Outfit, DM Sans, JetBrains Mono) |
| Test | Vitest (`npm test`), data integrity |
| CI | GitHub Actions: lint → typecheck → test → audit → build |

## Color Tokens (Apple-like Monochrome, zero accent, dark-only)

| Token | Value |
|-------|-------|
| --color-surface | #0b0b0d |
| --color-surface-alt | #141418 |
| --color-surface-card | #15151a |
| --color-border | #26262c |
| --color-border-hover | #3a3a42 |
| --color-text-primary | #f5f5f7 |
| --color-text-secondary | #a1a1a6 |
| --color-text-muted | #8a8a91 |

CTA primer menggunakan warna inverted: bg `--color-text-primary`, teks `--color-surface`.

## Route Structure
| Route | File | Konten |
|-------|------|--------|
| `/` | app/page.tsx | Hero → About → Projects → Skills → Contact |
| `/proyek` | app/proyek/page.tsx | Full project list + filter tech |
| `/cv` | app/cv/page.tsx | Online CV + contact cards + ringkasan |
| `/privacy` | app/privacy/page.tsx | Kebijakan privasi (tanpa form) |
| `404` | app/not-found.tsx | Halaman tidak ditemukan |

Sitemap hanya memuat URL halaman nyata (tanpa fragment `#`).

## Homepage Sections
1. Hero — staggered word reveal + role rotator + CTA
2. About — split layout + stat + narasi + education timeline
3. Projects — grid 2 kolom + tech filter bar (client-side `useState`)
4. Skills — grid per kategori + cell stagger via IntersectionObserver
5. Contact — contact cards (WhatsApp, Email, CV, GitHub) + social links
6. Footer

## Motion
- Page enter (template): opacity/translateY, 0.35s
- Scroll reveal: opacity/translateY/blur stagger, 0.55s
- Hover cards: translateY(-2px s.d. -4px), 0.3s
- Hover buttons: translate + arrow shift, 0.2–0.3s
- Active press: scale(0.97), 0.15s
- prefers-reduced-motion / `useReducedMotionSafe`: collapse to static

## Data Flow
- Projects: static array `src/lib/data.ts`
- Skills: static array + local SVG
- Filter proyek: client-side `useState`
- Kontak: deep link WhatsApp / Gmail compose (tanpa backend form)

## Brand Assets to Preserve
- Monogram "RD" (warm gray `#787774`, `public/favicon.svg`)
- CV PDF (`public/assets/CV Rifat.pdf`)
- Existing project data dan deskripsi
- Local skill icons
