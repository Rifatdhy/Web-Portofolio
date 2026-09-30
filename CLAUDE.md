# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio for Rifat Dhiya Ul Lail — Next.js 16 (App Router, Turbopack) + React 19 + TypeScript strict. All user-facing copy is Bahasa Indonesia. Dark-only, monochrome Apple-like, **zero accent color**: hierarchy comes from typography, spacing, and contrast. Production: `https://www.rifatdhy.my.id`.

## Common Commands

*   `npm run dev`: Development server (Node 22, per `.node-version`).
*   `npm run build`: Production build.
*   `npm run start`: Serve the production build.
*   `npm run lint`: ESLint (flat config, `eslint-config-next@16`).
*   `npm run typecheck`: `tsc --noEmit`.
*   `npm run test`: Vitest one-shot (`src/lib/data.test.ts` — data integrity).
*   Single test: `npx vitest run src/lib/data.test.ts -t "allTechs"`. Watch mode: `npx vitest`.

CI (`.github/workflows/ci.yml`): lint → typecheck → test → `npm audit --audit-level=high` → build, on every push/PR to `master`. All five must stay green.

## Architecture

**Layout shell.** `src/app/layout.tsx` mounts, in z-order: `ProgressBar`, `BackToTop`, `BackgroundPixelStars` (fixed `z-[1]`), `LiquidAmbient` (fixed `z-[2]`), then `<SmoothScroll><main class="relative z-10">…</main><Footer/></SmoothScroll>`, then Vercel Analytics/Speed Insights. The z-index scale is documented at the top of `globals.css`. Both `main` and `footer` need their own `relative z-10`: the two background layers are positioned with positive z-index, so they paint above any non-positioned content — a `footer` without it renders under the orbs. Fonts (Outfit, DM Sans, JetBrains Mono) are `next/font` CSS variables wired into Tailwind v4 `@theme` tokens — adding a font means touching both `layout.tsx` and `globals.css`. A `<noscript>` block forces `.scroll-reveal`/`.skill-cell` visible so the page is never blank without JS.

**Homepage composition.** `src/app/page.tsx` imports `Hero` eagerly and `dynamic()`-imports every below-the-fold section with SSR left on purpose — crawlers and first paint need the full HTML, so don't turn these into client-only. `template.tsx` (client) skips its page-enter animation on the hydration mount (module flag + `sessionStorage`) and under reduced motion so LCP isn't blocked; client-side navigations still animate.

**Content pipeline.** All copy lives in `src/lib/data.ts` (projects, skills, education, experiences, `about`/`aboutParagraphs`) and `src/lib/constants.ts` (`SITE`, `SOCIAL`). `src/lib/data.test.ts` guards: every skill `slug` has `public/icons/<slug>.svg`; `allTechs` equals the union of project `techs`; project titles are unique with `http(s)` hrefs; `SITE.cvPath` resolves to a real file under `public/`. Add a skill/tech → add the SVG and update `allTechs` in the same change.

**SEO/metadata.** Canonical is declared per page, never on the root layout (a layout-level canonical makes every page claim the homepage). OG images are generated per route (`src/app/**/opengraph-image.tsx`), all delegating to `renderOgImage` in `src/lib/og.tsx`; `apple-icon.tsx` renders the "RD" monogram. `sitemap.ts` deliberately omits `lastModified` (shallow clones make `git log -- <path>` report the deploy date — see its comment). `SITE.url` must be the host that actually serves 200: the apex domain 308-redirects to `www`, and scrapers don't follow redirects for `og:image`.

**Navigation.** The nav bar was removed (Sep 2026); `pageLinks` in `src/components/layout/Footer.tsx` is the only cross-page navigation. A new page must be added there **and** to `sitemap.ts`.

**Styling.** Tailwind v4 plus design tokens and component classes in `src/app/globals.css` (`.btn`, `.badge`, `.project-card`, `.skill-cell`, `.contact-card`, `.edu-card`, `.cv-card`, `.filter-pill`, `.social-link`, `.scroll-reveal`). Cards and badges are solid liquid-glass surfaces; sections stay transparent so the two background layers read through. `brand-guidelines.md` is the branding source of truth (v2 monochrome), `PRODUCT.md` holds voice/anti-references, `docs/superpowers/specs/` the design spec. Two non-obvious rules: (1) write only the **unprefixed** `backdrop-filter` — Lightning CSS auto-adds `-webkit-` for the Safari targets, and hand-writing both makes it collapse the pair to the last one, silently killing the glass in every non-WebKit browser; (2) `.liquid-orb`'s `blur(24px)` is a measured performance ceiling, not a style choice — `blur(90px)` cost ~35fps of scroll on phone and desktop, and `will-change` on the orbs made it worse (see the comment in `globals.css`). Which surfaces may carry `backdrop-filter` at all is a performance budget — see the **Performance budget** bullet under Conventions and Gotchas.

## Conventions and Gotchas

*   **Reduced motion.** Every Motion animation guards `useReducedMotionSafe()`; CSS reveals are guarded by `prefers-reduced-motion` in `globals.css`. The hook is intentionally not motion's `useReducedMotion()` — it subscribes to the media query via `useSyncExternalStore`, returns `false` on the first client render to match SSR, then re-reads after hydration. Read its doc comment before changing it.
*   **Only two continuous animations exist**: `BackgroundPixelStars` (canvas) and `LiquidAmbient` (pure CSS keyframes). Both collapse under reduced motion and are wrapped in `memo(..., () => true)` so re-renders never restart them; the starfield also defers its canvas init to `requestIdleCallback` so it doesn't compete with hydration/LCP. Don't add looping animations to UI elements.
*   **Icons.** `@phosphor-icons/react/ssr` in server components (Footer, `/cv`); `@phosphor-icons/react` in client components. Skill icons are local SVGs rendered through `next/image` with `unoptimized`.
*   **`react-hooks/set-state-in-effect` is on.** Don't `setState` directly in an effect body — do it in subscription/event callbacks (`Hero`, `SmoothScroll`, and `useReducedMotionSafe` show the patterns).
*   **Scroll plumbing.** `SmoothScroll` (Lenis) initializes on idle, intercepts `#hash` / `/#hash` anchor clicks, and publishes the instance as `window.lenis`; `BackToTop` uses it when present and falls back to native `window.scrollTo`.
*   **`Reveal`** starts elements at `opacity: 0` via `.scroll-reveal` and adds `.visible` from an IntersectionObserver — the transition itself lives in CSS. Anything that hides content must also handle no-JS and reduced motion.
*   **Performance budget (measured, keep it that way).** Three rules came out of a scroll/load profiling pass — treat them as budgets, not style preferences. (1) `backdrop-filter` lives **only on the big cards** (`.project-card`, `.edu-card`, `.contact-card`, `.cv-card`); small surfaces (`.badge`, `.filter-pill`, `.skill-cell`, `.social-link`) deliberately have none — each blur surface costs a composited layer plus a backdrop re-sample per scroll frame, and a pixel-diff proved removing it from the small ones is invisible (73 blur layers on the home page → 14). (2) **No `will-change` anywhere** — the 52 permanent promotions it used to create (30 skill icons + 22 reveals) bought nothing; the transitions promote their own element for the duration. (3) `LiquidAmbient` keyframes are **transform-only** — animating `border-radius` is a paint animation that re-rasterizes three blurred 450–700px blobs every frame; the old morph vs the static radius diffed at max 3/255. Combined effect measured on a 4s scroll at 4× CPU throttle: main-thread task time 2.3s → 1.5s, layouts 95 → 21, layout duration 84ms → 14ms. Re-check with `node /tmp/audit-run/cpumetrics.mjs` (needs `npm run start` on :3102) before adding blur or promotion back.
*   **Deploy/config.** `vercel.json` sets `cleanUrls` and security headers; `next.config.mjs` pins the Turbopack root and `outputFileTracingRoot` to the project directory. Dependabot (`.github/dependabot.yml`) groups minor/patch bumps weekly; major bumps of `@types/node`, `eslint`, and `typescript` are ignored on purpose — rationale in `README.md` and the config comments.
*   **`.agents/`, `.opencode/`, `skills-lock.json`** are vendored agent tooling, git-ignored, and not part of the app.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
