# Portfolio Hardening & Case Studies Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Harden the `master` portfolio for production, restore measured scroll performance, improve accessibility and recruiter conversion, and add statically generated project case-study pages.

**Architecture:** Keep `src/lib/data.ts` as the single source of truth. Add typed project slugs and optional case-study facts, render detail pages from `src/app/proyek/[slug]`, and share metadata/OG helpers. Keep client JavaScript limited to actual interactions while retaining static HTML, native fallback behavior, and the existing monochrome visual system.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS v4, Motion, Lenis, Vitest, Playwright, axe, Lighthouse.

**Spec:** `docs/superpowers/specs/2026-10-28-portfolio-hardening-and-case-studies-design.md`

## Global Constraints

- Work only on `master`; do not merge the abandoned performance branch.
- Keep the existing Indonesian-first, dark-only, zero-accent visual identity.
- Keep the app static; no CMS, database, authentication, or contact backend.
- Do not add a blog, custom cursor, visitor counter, light mode, or unrelated product features.
- Do not invent project results, work dates, metrics, or technical claims.
- Preserve the existing CV PDF, social URLs, project repository URLs, and production domain.
- All animations must respect `prefers-reduced-motion`; animation changes must remain transform/opacity-friendly.
- `backdrop-filter` is limited to large cards; no permanent `will-change`; ambient blur stays at the measured low value; orb keyframes animate transforms only.
- All interactive targets remain at least 44px and all external links retain `noopener noreferrer`.

## Review Focus

- Missing Playwright dependencies must fail clearly before E2E, then pass after `npm ci`; test in Task 1.
- A project slug that is unknown, duplicated, or malformed must never render the wrong project; test in Task 2 and Task 5.
- Reduced-motion users must not receive role rotation or continuous ambient animation; test in Task 4.
- A direct project URL must have unique metadata, OG image, sitemap entry, one H1, and a useful 404 for an unknown slug; test in Task 5 and Task 6.
- A mobile keyboard/touch user must retain focus, target size, URL filter state, and no horizontal overflow; test in Task 4 and Task 7.

---

### Task 1: Restore the complete local verification toolchain

**Files:**
- Modify: `package-lock.json` only if `npm ci` updates it consistently with `package.json`
- Inspect/modify: `.github/workflows/ci.yml`, `.github/workflows/lighthouse.yml`, `playwright.config.ts`, `vitest.config.mts`
- Test: existing `e2e/*.spec.ts`, `src/**/*.test.{ts,tsx}`

**Interfaces:**
- Consumes: current package manifests and CI configuration.
- Produces: a clean local install and documented commands for lint, typecheck, unit tests, E2E, audit, and build.

- [ ] **Step 1: Install the declared dependencies.**

  Run:

  ```bash
  npm ci
  ```

  Expected: Playwright and axe packages are installed from the existing lockfile; do not add a replacement dependency.

- [ ] **Step 2: Run the current checks and record failures.**

  ```bash
  npm run lint
  npm run typecheck
  npm run test
  npm run build
  npm audit --audit-level=high
  ```

  Expected: failures, if any, identify real implementation/configuration issues rather than missing modules.

- [ ] **Step 3: Run the existing browser suites after the production build.**

  ```bash
  npm run test:e2e
  ```

  Expected: portfolio, accessibility, and security tests execute against the configured production server.

- [ ] **Step 4: Fix only configuration or source issues revealed by these checks.**

  Keep CI strict: do not exclude `e2e`, disable TypeScript checks, or weaken audit/security assertions to obtain a green result.

- [ ] **Step 5: Commit the verified foundation.**

  ```bash
  git add package-lock.json .github playwright.config.ts vitest.config.mts src e2e
  git commit -m "test: restore complete portfolio verification"
  ```

### Task 2: Make project data typed, validated, and case-study ready

**Files:**
- Modify: `src/lib/data.ts`
- Modify: `src/lib/data.test.ts`
- Modify: `src/lib/metadata.ts` only if metadata needs a project description helper
- Test: `src/lib/data.test.ts`

**Interfaces:**
- Consumes: existing `projects`, `allTechs`, and asset files in `public/projects`.
- Produces: `Project.slug`, `Project.contribution`, `Project.year`, `Project.status`, optional `Project.challenge`, `Project.solution`, `Project.highlights`, and a lookup function `getProjectBySlug(slug: string): Project | undefined`.

- [ ] **Step 1: Add failing data integrity tests.**

  Add tests that assert:

  ```ts
  expect(projects.every((project) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug))).toBe(true);
  expect(new Set(projects.map((project) => project.slug)).size).toBe(projects.length);
  expect(projects.every((project) => project.image && existsSync(resolve(process.cwd(), "public", project.image.slice(1))))).toBe(true);
  expect(getProjectBySlug("clash-soccer")?.title).toBe("Clash.Soccer");
  expect(getProjectBySlug("does-not-exist")).toBeUndefined();
  ```

- [ ] **Step 2: Run the focused test to confirm the new assertions fail.**

  ```bash
  npx vitest run src/lib/data.test.ts
  ```

  Expected: FAIL because the current model has no slug/lookup contract.

- [ ] **Step 3: Extend the data types and add factual fields.**

  Use a narrow status union:

  ```ts
  export type ProjectStatus = "Selesai" | "Eksperimen" | "Aktif";
  ```

  Add a stable slug and only facts supported by the current project descriptions. Optional challenge/solution/highlights may be omitted rather than filled with invented claims.

- [ ] **Step 4: Implement the lookup helper and update every project.**

  ```ts
  export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find((project) => project.slug === slug);
  }
  ```

  Set `year`, `status`, and `contribution` only where they are known; otherwise use the neutral status supported by the existing portfolio context and omit unsupported narrative fields.

- [ ] **Step 5: Run all data tests and commit.**

  ```bash
  npm run test -- src/lib/data.test.ts
  git add src/lib/data.ts src/lib/data.test.ts src/lib/metadata.ts
  git commit -m "feat: add validated project case study data"
  ```

### Task 3: Restore the measured visual performance budget

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/components/ui/LiquidAmbient.tsx` if visibility pause behavior requires a small source change
- Test: `scripts/check-lighthouse.mjs` and the production browser suite where applicable

**Interfaces:**
- Consumes: existing component class names and reduced-motion media rules.
- Produces: CSS with no permanent `will-change`, large-card-only backdrop blur, low-cost ambient blobs, transform-only orb animation, and unchanged visual tokens.

- [ ] **Step 1: Add a static performance guard script or extend the existing Lighthouse check.**

  Assert the built/source CSS does not contain `will-change`, `blur(100px)`, or orb keyframes that animate `border-radius`. The guard must report the file and offending token.

- [ ] **Step 2: Run the guard to capture the current failure.**

  ```bash
  node scripts/check-lighthouse.mjs --help
  ```

  If the existing script has no static mode, add a focused Node check under `scripts/check-performance-budget.mjs` and run it against `src/app/globals.css`.

- [ ] **Step 3: Update CSS without changing the palette or component API.**

  Apply these exact rules:

  ```css
  .liquid-orb { filter: blur(24px); }
  /* no will-change declarations */
  /* no backdrop-filter on .skill-cell, .social-link, .badge, .filter-pill */
  ```

  Keep `backdrop-filter` on `.edu-card`, `.project-card`, `.contact-card`, and `.cv-card`; animate orb `transform` only and preserve reduced-transparency fallbacks.

- [ ] **Step 4: Run static guard, lint, and build.**

  ```bash
  node scripts/check-performance-budget.mjs
  npm run lint
  npm run build
  ```

- [ ] **Step 5: Commit the performance changes.**

  ```bash
  git add src/app/globals.css src/components/ui/LiquidAmbient.tsx scripts/check-performance-budget.mjs
  git commit -m "perf: restore measured visual performance budget"
  ```

### Task 4: Improve Hero motion, CTA, focus, and category naming

**Files:**
- Modify: `src/components/sections/Hero.tsx`
- Modify: `src/components/sections/About.tsx`
- Modify: `src/components/sections/Skills.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/components/layout/SmoothScroll.tsx`
- Modify: `src/components/sections/Hero.test.tsx`, `src/components/sections/Skills.test.tsx`

**Interfaces:**
- Consumes: `SITE.cvPath`, `projects.length`, `useReducedMotionSafe`, current hash navigation, and skill category data.
- Produces: professional role labels, reduced-motion-safe rotator, CV CTA, data-derived project count, neutral category class names, and native skip-link behavior.

- [ ] **Step 1: Add failing tests for the user-visible contracts.**

  Assert Hero renders a CV link, role text, and a reduced-motion-safe static role contract; assert Skills renders no `pastel-*` class; assert About derives its project count from `projects.length`.

- [ ] **Step 2: Run the focused tests to verify the new assertions fail.**

  ```bash
  npx vitest run src/components/sections/Hero.test.tsx src/components/sections/Skills.test.tsx
  ```

- [ ] **Step 3: Update Hero behavior and CTA.**

  Use:

  ```ts
  const roles = ["Web & App Developer", "Network Engineer", "IT Support"];
  if (reduce) return;
  setInterval(..., 2600);
  ```

  Add a `Link` to `SITE.cvPath` with `download`, preserving the existing primary project CTA and contact CTA hierarchy.

- [ ] **Step 4: Derive the project statistic and normalize skill category styling.**

  Import `projects` in `About.tsx` and use `` `${projects.length}` ``. Replace the `pastel-*` array and CSS selectors with a neutral `.badge-category` class or the existing `.badge` class without stale color names.

- [ ] **Step 5: Preserve native skip-link behavior and cleanup Lenis.**

  Keep `#main-content` excluded from smooth-scroll interception and delete `window.lenis` only when it still points to the destroyed instance. Verify reduced motion uses native scroll behavior.

- [ ] **Step 6: Raise touch targets and run focused tests.**

  Keep `.filter-pill { min-height: 44px; }`, run the focused tests, lint, and typecheck.

- [ ] **Step 7: Commit the interaction/accessibility changes.**

  ```bash
  git add src/components/sections/Hero.tsx src/components/sections/About.tsx src/components/sections/Skills.tsx src/components/layout/SmoothScroll.tsx src/app/globals.css src/components/sections/*.test.tsx
  git commit -m "feat: improve portfolio interactions and accessibility"
  ```

### Task 5: Build statically generated project case-study pages

**Files:**
- Create: `src/app/proyek/[slug]/page.tsx`
- Create: `src/app/proyek/[slug]/opengraph-image.tsx`
- Create: `src/components/projects/ProjectDetail.tsx` if the route needs a focused presentational component
- Create: `src/components/layout/BackLink.tsx` only if the existing component cannot serve the route
- Modify: `src/components/magic/ProjectCard.tsx`
- Modify: `src/app/proyek/page.tsx`
- Test: `src/lib/data.test.ts`, `src/app/proyek/ProjectFilter.test.tsx`, and a new route/content test if the Vitest setup supports it

**Interfaces:**
- Consumes: `Project`, `getProjectBySlug`, `projects`, `SITE`, `SOCIAL`, and `renderOgImage`.
- Produces: static routes for every project slug, `generateStaticParams`, `generateMetadata`, an accessible detail article, and card links to detail routes.

- [ ] **Step 1: Add failing lookup and route contract tests.**

  Assert every project slug maps to a route, every card exposes a detail link, and an unknown slug resolves to the 404 path rather than a project.

- [ ] **Step 2: Implement the route shell.**

  Use:

  ```ts
  export function generateStaticParams() {
    return projects.map(({ slug }) => ({ slug }));
  }
  ```

  Resolve with `getProjectBySlug(params.slug)`, call `notFound()` when absent, and render exactly one `h1`.

- [ ] **Step 3: Implement metadata and accessible content.**

  Use `buildPageMetadata` with `/proyek/${project.slug}`. Render image with `fill`, explicit `sizes`, and meaningful alt text; render optional sections only when their values exist; include technologies, status/year, contribution, repository, demo, and a back link.

- [ ] **Step 4: Add the project OG image and card detail links.**

  Make the OG route use `renderOgImage({ title: project.title, subtitle: project.description, footer: SITE.name })` and make cards link to the detail page while keeping external demo/repository actions.

- [ ] **Step 5: Run route tests and build.**

  ```bash
  npm run test
  npm run build
  ```

- [ ] **Step 6: Commit the case-study routes.**

  ```bash
  git add src/app/proyek src/components/magic/ProjectCard.tsx src/components/projects src/components/layout/BackLink.tsx src/lib
  git commit -m "feat: add project case study pages"
  ```

### Task 6: Complete SEO, sitemap, and structured data coverage

**Files:**
- Modify: `src/app/sitemap.ts`
- Modify: `src/lib/metadata.ts`
- Modify: `src/app/layout.tsx` only if shared metadata needs correction
- Modify: `src/app/privacy/page.tsx` and `src/app/privacy/opengraph-image.tsx` if route metadata is incomplete
- Create/modify: metadata tests under `src/lib/metadata.test.ts`

**Interfaces:**
- Consumes: `SITE`, `projects`, `getProjectBySlug`, project route metadata, and existing OG renderer.
- Produces: unique page metadata, project sitemap entries, and valid structured data without homepage URL inheritance.

- [ ] **Step 1: Add failing metadata and sitemap assertions.**

  Assert each project URL appears in sitemap, each route metadata has its own canonical/OG URL, and no subpage metadata uses `SITE.url` as its page URL.

- [ ] **Step 2: Implement project sitemap entries and route metadata.**

  Add `${SITE.url}/proyek/${project.slug}` with monthly frequency and a lower priority than the project index. Keep fragments out of sitemap URLs.

- [ ] **Step 3: Add SoftwareSourceCode/CreativeWork JSON-LD to detail pages.**

  Include only known fields: name, description, URL, image, programming language/technology, code repository, and creator. Escape `<` in JSON serialization as the root layout already does.

- [ ] **Step 4: Run metadata tests and inspect rendered HTML.**

  ```bash
  npm run test -- src/lib/metadata.test.ts
  npm run build
  npm run start -- -p 3100
  curl -s http://localhost:3100/proyek/clash-soccer
  ```

  Verify title, description, canonical, OG image, JSON-LD, and one H1.

- [ ] **Step 5: Commit SEO coverage.**

  ```bash
  git add src/app/sitemap.ts src/app/layout.tsx src/app/privacy src/lib/metadata.ts src/lib/metadata.test.ts src/app/proyek
  git commit -m "feat: complete project SEO metadata"
  ```

### Task 7: Run full production and browser verification

**Files:**
- Modify: `e2e/portfolio.spec.ts`, `e2e/accessibility.spec.ts`, `e2e/security.spec.ts` only for assertions required by the new routes/behavior
- Modify: `scripts/check-lighthouse.mjs` only when route coverage or thresholds need explicit support
- Modify: `.github/workflows/ci.yml` only if a declared test command is missing

**Interfaces:**
- Consumes: all prior route, content, accessibility, security, and performance contracts.
- Produces: final evidence for all required checks and a clean working tree except intentional test artifacts.

- [ ] **Step 1: Extend E2E coverage for case-study and mobile behavior.**

  Test `/proyek/clash-soccer`, all project detail links, an unknown slug returning 404, `?tech=React`, keyboard focus on filters/skip link, reduced-motion mode, and `document.documentElement.scrollWidth <= innerWidth` at mobile viewport.

- [ ] **Step 2: Run the complete verification sequence.**

  ```bash
  npm ci
  npm run lint
  npm run typecheck
  npm run test
  npm run test:e2e
  npm audit --audit-level=high
  npm run build
  ```

- [ ] **Step 3: Inspect production response headers and metadata.**

  ```bash
  npm run start -- -p 3100
  curl -sI http://localhost:3100/
  curl -sI http://localhost:3100/proyek/clash-soccer
  curl -s http://localhost:3100/sitemap.xml
  ```

  Verify security headers, project URLs in sitemap, route-specific canonical/OG values, and no CSP errors in the browser console.

- [ ] **Step 4: Run Lighthouse checks when browser prerequisites are available.**

  ```bash
  npm run lighthouse
  ```

  If the repository uses a different script name, run the command declared in `.github/workflows/lighthouse.yml`; report missing browser/runtime prerequisites separately from app failures.

- [ ] **Step 5: Review the final diff and commit only source/test changes.**

  ```bash
  git diff --check
  git status --short
  git log --oneline -8
  ```

  Confirm no generated build directory, credentials, or unrelated files are staged.
