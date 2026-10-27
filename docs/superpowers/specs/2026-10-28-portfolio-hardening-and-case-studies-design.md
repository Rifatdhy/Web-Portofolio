# Design Spec — Portfolio Hardening & Project Case Studies

## Status

Approved implementation direction. This spec defines the complete scope for
the `master` branch work after the user approved the four-phase roadmap.

## Goal

Make the portfolio more credible to recruiters and safer to evolve without
weakening its existing dark monochrome identity or measured performance
budget. The work covers CI readiness, accessibility, runtime performance,
content modeling, project case-study pages, SEO, and production verification.

## Constraints and non-goals

- Work only on `master`; do not merge the abandoned performance branch.
- Keep the existing Indonesian-first, dark-only, zero-accent visual identity.
- Keep the app static; no CMS, database, authentication, or contact backend.
- Do not add a blog, custom cursor, visitor counter, light mode, or unrelated
  product features.
- Do not invent project results, work dates, metrics, or technical claims.
- Preserve the existing CV PDF, social URLs, project repository URLs, and
  production domain.
- All animations must respect `prefers-reduced-motion`; animation changes must
  remain transform/opacity-friendly.

## Success criteria

1. `npm ci`, lint, typecheck, unit tests, E2E tests, production build, and the
   configured dependency audit pass locally or any environment limitation is
   documented explicitly.
2. Homepage and project listing remain statically rendered and usable without
   JavaScript.
3. Project filter state remains shareable through `?tech=` and accessible by
   keyboard.
4. Ambient effects use the measured performance budget: no permanent
   `will-change`, no large blur regression, and no paint-heavy orb morphing.
5. Reduced-motion users see no role-rotation or continuous decorative motion.
6. Every project has validated image, slug, metadata, and links.
7. Project case-study routes are statically generated, discoverable in the
   sitemap, and have route-specific metadata and OG images.
8. Skip link, focus behavior, external links, target sizes, and mobile layout
   remain accessible.
9. Security headers and CSP continue to work with Next.js, analytics,
   Speed Insights, fonts, JSON-LD, images, and generated OG assets.

## Architecture

### Content model

Extend `Project` in `src/lib/data.ts` with a stable `slug`, `contribution`,
`year`, `status`, and optional case-study fields. The model must distinguish
facts already present in the portfolio from optional narrative fields. Use a
typed status union and avoid rendering empty optional sections.

Create a lookup helper or derive a validated map for `[slug]` route generation.
The existing `projects` array remains the single source of truth for cards,
filters, CV content, detail pages, metadata, and sitemap entries.

Project asset tests must validate every configured image and custom skill icon.
Project slugs must be unique, URL-safe, and resolve to exactly one project.

### Route structure

Add `src/app/proyek/[slug]/page.tsx` with:

- `generateStaticParams()` from the project data;
- `notFound()` for unknown slugs;
- route metadata built through the existing metadata helper;
- a semantic article with one `h1`;
- project image using `next/image` with explicit responsive sizing;
- contribution, technology, year/status, and optional case-study sections;
- repository/demo links with safe external-link semantics;
- accessible back link to `/proyek`;
- JSON-LD appropriate for a software/creative work when facts exist.

Add a route OG image that uses the shared renderer and the project title,
summary, and site name. Add all generated routes to `sitemap.ts`.

### Homepage

- Keep the Hero H1 static for LCP.
- Add a CV CTA without moving recruiter access to the footer only.
- Use professional role labels and stop the role rotator for reduced motion.
- Use `projects.length` or a derived value for project count statistics.
- Keep the tagline concise and integrated into the existing hierarchy.

### Performance and motion

Port only the performance-safe rules from the previous performance work:

- `backdrop-filter` only on large cards;
- no permanent `will-change` declarations;
- ambient orb blur capped at the measured low value;
- orb keyframes animate transforms only;
- no new continuous UI animations;
- third-party analytics remain non-blocking;
- below-fold optimizations may be added only if they do not break reveal,
  anchor focus, or static HTML.

Keep Lenis dynamically imported after idle. Preserve native behavior for the
skip link and clear the global Lenis reference during cleanup.

### Accessibility

- Maintain the existing skip link and focusable `main` target.
- Preserve live filter announcements and URL-synchronized filter state.
- Keep minimum interactive target size at 44px.
- Ensure all meaningful images have useful alt text; decorative images use
  empty alt text.
- Ensure all external links expose a useful accessible name and retain
  `noopener noreferrer`.
- Test reduced motion, keyboard navigation, mobile overflow, heading order,
  and icon-only controls through Playwright/axe.

### SEO and security

- Use route-specific title, description, canonical, OG URL, and OG image.
- Keep homepage metadata in the root/page composition without making every
  route claim the homepage URL.
- Add project detail URLs to sitemap; do not add fragments.
- Preserve escaped JSON-LD output.
- Keep HSTS, CSP, reporting endpoint, frame protection, referrer policy, and
  cross-origin headers. Validate them in production build and E2E security
  tests.

## Implementation phases

1. **Foundation:** install declared dependencies with `npm ci`; run and fix
   typecheck/lint/test/build; verify E2E and audit commands; add focused tests
   for content and metadata gaps.
2. **Performance/accessibility:** port CSS budgets, reduce motion role behavior,
   cleanup Lenis, improve CTA and focus/target behavior, and validate mobile.
3. **Content:** extend project data, add project count derivation, normalize
   category naming, add tagline/CTA, and improve only fact-supported copy.
4. **Case studies/SEO:** add static detail route, metadata, OG image, JSON-LD,
   sitemap entries, navigation, and route tests.
5. **Verification:** run all required commands, inspect production HTML/headers,
   and report any environment-only limitation separately from code failures.

## Testing strategy

- Existing Vitest tests remain green.
- Add unit tests for project slug uniqueness, asset existence, detail lookup,
  and metadata generation.
- Add/extend component tests for filter query state, Hero reduced motion
  behavior, and project links.
- Run Playwright portfolio, accessibility, and security suites after a
  production build.
- Run the configured Lighthouse check when its browser/runtime prerequisites
  are available.
- Test `/`, `/proyek`, `/proyek?tech=React`, every generated project route,
  `/cv`, `/privacy`, and a missing project slug.

## Error handling

- Unknown project slugs use `notFound()` and the existing 404 experience.
- Missing optional project narrative does not render an empty heading or card.
- Failed optional dynamic Lenis import falls back to native scrolling.
- Asset and data mistakes fail tests before deployment.
- CSP violations are reported without weakening the policy silently.

## Review checklist

- No unresolved placeholder copy or invented facts.
- No route is missing from footer/sitemap where it should be discoverable.
- No case-study route has duplicate H1 or invalid heading hierarchy.
- No performance budget rule is reintroduced accidentally.
- No new dependency is added unless an existing declared tool cannot provide
  the required behavior.
- `git diff` contains only this scope and generated artifacts intentionally
  produced by the Next.js version in use.
