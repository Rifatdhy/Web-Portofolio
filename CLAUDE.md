# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 16 (App Router, Turbopack) + React 19 + TypeScript strict portfolio site for Rifat Dhiya Ul Lail. Bahasa Indonesia. Monokrom ala Apple dengan system SF stack, dark-only. Zero accent color.

## Common Commands

*   `npm run dev`: Development server.
*   `npm run build`: Production build.
*   `npm run start`: Production server.
*   `npm run lint`: ESLint (flat config, `eslint-config-next@16`).
*   `npm run typecheck`: `next typegen && tsc --noEmit`.
*   `npm run test`: Vitest (unit/komponen; hanya `src/**/*.test.{ts,tsx}`).
*   `npm run test:e2e`: Playwright + axe (Chromium; build production saat `CI=1`).
*   `npm run test:e2e:ui`: Playwright UI mode.

CI (`.github/workflows/ci.yml`): job **verify** = lint → typecheck → test →
`npm audit --audit-level=high` → build; job **e2e** = build → Playwright.
`.github/workflows/lighthouse.yml` menjalankan `npx lighthouse@12.8.2` dan
`scripts/check-lighthouse.mjs` (performance 80, a11y 95, best-practices 95,
SEO 95). Jangan tambahkan `@lhci/cli` — rantai transitifnya rentan.

## High-level Code Architecture

*   **`src/app`**: App Router. `/`, `/proyek`, `/cv`, `/privacy`, OG image dinamis, `robots.ts`, `sitemap.ts`, `error.tsx`, dan `api/csp-report/route.ts` (penerima laporan CSP). `template.tsx` animasi page-enter. Halaman `/`, `/proyek`, `/cv`, `/privacy` tetap server components; hanya island interaktif yang `"use client"`.
*   **`src/components/layout`**: Footer, FooterNav, ProgressBar, BackToTop, BackLink, SmoothScroll.
*   **`src/components/sections`**: Hero (client), About (server + `StatNum` client), Experience, Projects, Skills (server), Contact (server).
*   **`src/components/magic`**: Reveal (IntersectionObserver), ProjectCard, StatNum.
*   **`src/components/ui`**: zona komponen copy-paste third-party (shadcn-style), saat ini: BackgroundPixelStars, LiquidAmbient.
*   **`src/lib`**: `constants.ts` (SITE/SOCIAL), `data.ts` (projects/skills/education + path gambar), `useReducedMotionSafe.ts`.
*   **`public`**: ikon brand per skill (SVG, plus PNG resmi Winbox), `projects/` (cover monokrom), favicon, CV PDF.
*   **`e2e`**: spec Playwright untuk konten, filter URL, overflow mobile, axe WCAG, dan endpoint CSP. **`scripts/check-lighthouse.mjs`**: budget Lighthouse.

## Konvensi Penting

*   Icons: `@phosphor-icons/react` untuk client components, **`@phosphor-icons/react/ssr`** untuk server components (Footer, Contact, not-found, cv, privacy).
*   Animasi Motion selalu guard `useReducedMotionSafe()`; CSS reveal, liquid ambient, dan hover transform guard `prefers-reduced-motion`. Pengecualian: rotator role hero sengaja tetap berjalan saat reduced motion (keputusan produk); parallax glow hero tetap statis.
*   Smooth scroll memakai Lenis yang di-import dinamis setelah idle. Fokus hash dipindah ke target (`tabindex="-1"`) lewat click/hashchange observer, termasuk saat reduced motion. Next's `Link` memanggil `preventDefault`, jadi jangan filter listener dengan `event.defaultPrevented`. Skip link `#main-content` sengaja dibiarkan native; klik modifier dan non-primary button tidak dicegat.
*   Filter proyek di `/proyek` membaca `?tech=` lewat `useSearchParams` dan menulis lewat `router.push(..., { scroll: false })`. Nilai invalid = `Semua`. `page.tsx` membungkus filter dengan `Suspense` + fallback grid server-rendered agar tetap statis dan SEO-friendly.
*   Lint rule `react-hooks/set-state-in-effect` aktif — jangan setState langsung di body `useEffect`; setState hanya di callback subscription/event.
*   Data proyek/skill di `src/lib/data.ts`; guard test memastikan ikon skill ada (default `<slug>.svg`, override lewat field `icon`), `allTechs` = union techs, dan setiap `image` ada di `public/projects`.
*   Link eksternal `target="_blank"` wajib `rel="noopener noreferrer"` + hint "(dibuka di tab baru)" di accessible name tanpa menghilangkan teks terlihat.
*   Domain produksi: `https://www.rifatdhy.my.id` (`SITE.url` di `constants.ts`) — dipakai metadata, sitemap, robots.
*   Security headers ada di `vercel.json` (CSP enforcing + reporting, HSTS, COOP/CORP); `X-Powered-By` dimatikan di `next.config.mjs`.
*   `next-env.d.ts` di-generate Next dan di-ignore Git; `typecheck` memanggil `next typegen` lebih dulu.
*   Branding: lihat `brand-guidelines.md` (v3 monokrom Apple). Desain: `docs/superpowers/specs/`.
*   Tipografi: system SF stack di `--font-display` / `--font-body` / `--font-mono` (`globals.css`). Jangan tambahkan `next/font` atau host SF Pro sendiri — lisensi Apple melarang distribusi file font. Palet: pure black `#000000`, card `#1c1c1e`, border `#2c2c2e`, hover border `#48484a`, muted `#86868b`.
*   Starfield kontinu di semua section: section transparan + hairline `.section-divider`; card/badge memakai surface translusen dengan border hairline.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
