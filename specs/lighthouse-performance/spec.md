# Spec: Marketing site Lighthouse audit and fixes

- **Issue:** <task id, TBD>
- **Type:** enhancement
- **Status:** approved
- **Author:** Nasim

## Problem and goal

tryonar.net has no performance or quality budget. The site is fast on desktop,
but the two pages that sell the product (Home and Product Demo) are slow on
mobile because the hero image loads late. SEO also has gaps: there is no
sitemap, the robots.txt is invalid, and Pricing has the wrong canonical.

Goal: every key page meets the targets below on mobile and desktop. The look
and behaviour stay the same: hero try-on demos, the contact form, CTAs and the
language switcher.

## Baseline (production, 2026-10-21)

Lighthouse 12, headless Chrome, default throttling, one run per cell. The
HTML/JSON reports are attached to the task (they are 13 MB, so they are not
committed).

| Page             | Perf m / d | A11y | BP  | SEO | Mobile LCP | Mobile CLS | TBT    |
| ---------------- | ---------- | ---- | --- | --- | ---------- | ---------- | ------ |
| Home             | **59** / 83 | 95  | 100 | 92  | **10.1 s** | 0.016      | 10 ms  |
| Product Demo     | **68** / 83 | 96  | 100 | 92  | **7.4 s**  | 0          | 10 ms  |
| How it works     | 90 / **72** | 100 | 100 | 92  | 3.1 s      | 0.003      | 10 ms  |
| Pricing          | 91 / 93    | 96   | 100 | 85  | 3.2 s      | 0.036      | 10 ms  |
| User stories     | 92 / 95    | 94   | 100 | 92  | 3.1 s      | 0          | 10 ms  |
| Contact us       | 92 / 86    | 100  | 100 | 92  | 3.0 s      | 0.001      | 20 ms  |
| Privacy policy   | 92 / 93    | 100  | 100 | 92  | 3.0 s      | 0.02       | 10 ms  |
| Terms of service | 89 / 94    | 100  | 100 | 92  | 3.2 s      | 0.022      | 10 ms  |

(m = mobile, d = desktop.) The task names "About", "Features" and "Blog". Those
pages don't exist (`/about`, `/features` and `/blog` return 404), so the scope
is the 8 live pages in the English locale. FR/ES/NL use the same templates and
get one spot check each.

CLS and TBT already pass everywhere. The work is LCP, SEO, a few
accessibility items and page weight.

## Root causes found

1. **The hero LCP image is lazy-loaded.** On Home (`frame.webp`) and Product
   Demo (`interactive-demo/frame1.webp`), the LCP element is a `next/image`
   with `loading="lazy"`. It has no `priority`, and `sizes` is wrong, so a
   1920 px or 3840 px variant is requested for a 375 px phone frame. Lighthouse
   shows a 4.4 s load delay on Home.
2. **Google Fonts is loaded with `@import` in `globals.css`.** This is the only
   render-blocking request, and it adds an extra hop to two origins (the
   preconnect audit estimates 200–410 ms). Inter is also self-hosted
   (341 KB), so it is effectively loaded twice.
3. **Sanity GIFs on How it works.** The tab images in `ProductsDetailsTab` are
   animated GIFs (3.4 MB saving if served as video) and are oversized (2.8 MB
   saving). There is a 3.5 s render delay on desktop LCP from the tab's
   opacity transition.
4. **Heavy `public/` images.** `hero_image.png` is 2.6 MB,
   `ready-to-solve-image.png` 1.8 MB and `head1–4.jpg` 0.4–1.5 MB. Some are
   served through `<img>` (9 places), which bypasses optimisation.
5. **SEO.**
   - `/sitemap.xml` returns 404.
   - `robots.txt` is Cloudflare's managed file. Lighthouse fails it on every
     page because of the `Content-Signal` directive.
   - Pricing's Sanity `seo.canonicalUrl` points to the homepage.
6. **Accessibility.**
   - Colour contrast fails on 6 colours: `#8b5cf6`, `#998188` and `#FFA49B`
     eyebrows on Home and Product Demo, `#838383` on Pricing and User
     stories, and `#AA73E4` on User stories.
   - Heading order is wrong on User stories.
   - The tick icons on Home have alt text that repeats the text next to them.
7. **Not a problem:** compression (Brotli on), HTTPS/HSTS, console errors
   (none), CLS, TBT and caching (ISR 60 s with a Netlify edge hit).

## Acceptance criteria

**Targets (all 8 pages, production, median of 3 Lighthouse runs)**
- [ ] Performance ≥ 90 on desktop and ≥ 80 on mobile.
- [ ] Accessibility, Best Practices and SEO ≥ 90.
- [ ] Mobile LCP ≤ 2.5 s, CLS ≤ 0.1, TBT ≤ 200 ms.
- [ ] No render-blocking resources flagged. No console errors.

**Images and media**
- [ ] The hero LCP image on Home and Product Demo uses `priority` (eager plus
      `fetchpriority=high`) and a `sizes` that matches its rendered width.
- [ ] Every other image below the fold stays lazy. Every `next/image` has
      width and height, or `fill` with a sized parent.
- [ ] The 9 raw `<img>` uses move to `next/image`, unless they are decorative
      SVGs. `public/` rasters over 300 KB are re-encoded to WebP or AVIF at
      their displayed size, and the originals are removed if nothing else
      references them.
- [ ] How it works: the tab media gets an explicit width. Animated GIFs are
      served as MP4/WebM (muted, `playsinline`, autoplay, loop) with a poster.
      **Open question 1.**

**Fonts and JS**
- [ ] Sora and Inter load via `next/font/google`. Next self-hosts the fonts
      at build time, preloads them and uses `display: swap`. The CSS
      `@import`, the duplicate `Inter.woff2` `@font-face` and the dead file are
      removed. Circular Std stays self-hosted with `font-display: swap` and
      gets a preload.
- [ ] Unused JS: client components that only show static content become
      server components, where that doesn't change behaviour. This is a
      best-effort cut of the ~100 KB flagged, not a target.

**SEO**
- [ ] `src/app/sitemap.ts` generates every published page slug from Sanity.
      Each URL is localised and includes `hreflang` alternates for languages
      that have a translation, so it matches `buildPageMetadata`.
- [ ] `/sitemap.xml` and `/robots.txt` skip the locale proxy. The `matcher`
      already excludes paths with a dot, so this needs a test.
- [ ] robots.txt passes Lighthouse and still blocks AI training crawlers.
      **Open question 2.**
- [ ] Pricing canonical fixed in Sanity (content edit, no code). A unit test
      checks that `buildPageMetadata` makes a canonical that is self-referential
      by default.
- [ ] Every page has a unique title and description and Open Graph tags. A
      script lists them from Sanity and the result goes in the PR.

**Accessibility**
- [ ] All flagged text meets WCAG AA contrast (4.5:1, or 3:1 for large text).
      **Open question 3.**
- [ ] User stories headings run in order with no skipped levels. Decorative
      tick icons use `alt=""`.

**No regressions**
- [ ] Hero makeup demos, the before/after slider, the contact form, the
      language switcher and CTAs behave as before. Checked by hand in Chrome,
      Safari and Firefox, and on iOS Safari and Android Chrome.
- [ ] `pnpm test`, lint and build pass. `apps/web/package-lock.json` stays in
      sync if a dependency changes. None is expected, because `next/font` is
      built in.

## Delivery: 4 PRs, each under ~400 LOC, all targeting `develop`

1. **perf: hero LCP and fonts.** Hero `priority`/`sizes`, `next/font`, and
   re-encoded `public/` images. This is the biggest win: Home and Product
   Demo mobile.
2. **perf: How it works media.** GIFs to video and image sizing.
3. **fix(seo): sitemap, robots, canonical.**
4. **fix(a11y): contrast, heading order, alt text.**

After each merge, run Lighthouse on staging (tryonar-staging.netlify.app).
After `develop → master`, a final production run goes in this spec as an
"After" table, and the before/after summary goes on the task.

## Open questions (need your call)

1. **How it works GIFs** are Sanity content. Should editors re-upload them as
   MP4 (a schema field for video, plus a code fallback to the GIF)? Or should
   I convert them once and upload them myself?
2. **robots.txt** is Cloudflare's "Managed robots.txt", and Lighthouse rejects
   its `Content-Signal` line. Option A: turn that setting off in Cloudflare
   and ship our own `robots.ts`, which keeps the same AI-crawler blocks
   without the `Content-Signal` line. Option B: keep Cloudflare's file and
   accept SEO ≈ 92 (that still passes ≥ 90). I recommend A. It needs someone
   with Cloudflare access.
3. **Contrast fixes change colours slightly.** For example, eyebrow purple
   `#8b5cf6` becomes about `#7c3aed`, grey `#838383` becomes about `#707070`,
   and the coral `#FFA49B` label needs a darker tone or a darker background.
   This conflicts with "visual design unchanged". Should I go ahead with the
   nearest AA-passing shades?

## Out of scope

- Building the About, Features or Blog pages.
- Moving hosting off Netlify, or changing the Cloudflare setup beyond
  robots.txt.
- Analytics or chat widgets. The site loads no third-party scripts today.
