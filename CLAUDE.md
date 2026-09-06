# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 16 (App Router, Turbopack) + React 19 + TypeScript strict portfolio site for Rifat Dhiya Ul Lail. Bahasa Indonesia. Monokrom Apple-like, dark-only. Zero accent color.

## Common Commands

*   `npm run dev`: Development server.
*   `npm run build`: Production build.
*   `npm run start`: Production server.
*   `npm run lint`: ESLint (flat config, `eslint-config-next@16`).
*   `npm run typecheck`: `tsc --noEmit`.
*   `npm run test`: Vitest (`src/lib/data.test.ts` — data integrity).

CI (`.github/workflows/ci.yml`): lint → typecheck → test → `npm audit --audit-level=high` → build. Semua wajib hijau.

## High-level Code Architecture

*   **`src/app`**: App Router. `/`, `/proyek`, `/cv`, `/privacy`, OG image dinamis, `robots.ts`, `sitemap.ts`. `template.tsx` animasi page-enter.
*   **`src/components/layout`**: Footer, ProgressBar.
*   **`src/components/sections`**: Hero, About, Projects, Skills, Contact.
*   **`src/components/magic`**: Reveal (IntersectionObserver), ProjectCard.
*   **`src/components/ui`**: zona komponen copy-paste third-party (shadcn-style), saat ini: background-pixel-stars.
*   **`src/lib`**: `constants.ts` (SITE/SOCIAL), `data.ts` (projects/skills/education), `useReducedMotionSafe.ts`.
*   **`public`**: icons SVG per skill, favicon, CV PDF.

## Konvensi Penting

*   Icons: `@phosphor-icons/react` untuk client components, **`@phosphor-icons/react/ssr`** untuk server components (Footer, not-found, cv, privacy).
*   Animasi Motion selalu guard `useReducedMotionSafe()`; CSS reveal guard `prefers-reduced-motion`.
*   Lint rule `react-hooks/set-state-in-effect` aktif — jangan setState langsung di body `useEffect`; setState hanya di callback subscription/event.
*   Data proyek/skill di `src/lib/data.ts`; guard test memastikan ikon skill ada di `public/icons` dan `allTechs` = union techs proyek.
*   Domain produksi: `https://rifatdhy.my.id` (`SITE.url` di `constants.ts`) — dipakai metadata, sitemap, robots.
*   Branding: lihat `brand-guidelines.md` (v2 monokrom). Desain: `docs/superpowers/specs/`.
*   Starfield kontinu di semua section: section transparan + hairline `.section-rule`; hanya card/badge solid.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
