# Current product decisions

This file carries decisions made after the original Academy v1 documents. It does not claim that
every decision has already been implemented. Check the code before describing the live site.

## Brand and voice

- The approved public brand name is **Ernst**. `Academy` was a temporary name in the early
  documentation and implementation. The product remains a practical software and programming
  academy for students, graduates, and people changing careers, with a focus on projects, reviewed
  work, and preparation for a first job. Do not promise guaranteed employment.
- The tone is confident, modern, friendly, and approachable to beginners, with light humor where
  it fits. Arabic copy should sound natural to an Egyptian audience; retain familiar English
  technical terms when clearer.
- The approved visual direction is a simple **Ernst** wordmark with a subtle arrow motif. The
  repository does not yet contain an approved production logo asset. Do not reconstruct an exact
  logo from this description alone; request the approved asset when implementing it.
- The later selected brand palette is primary `#0B2E6B`, secondary `#10C981`, accent `#0B7BFF`,
  dark background `#071A33`, neutral `#E5E7EB`, and white `#FFFFFF`. These are brand reference
  colors. The site currently uses a different permanent dark token set from Phase 13. A dedicated
  design update should map this palette to semantic tokens, check contrast and states, and review
  responsive screenshots before replacing the current values.
- Public marketing video direction: avoid background music. This does not require a website media
  feature.

## Product and content

- Arabic is the default public language; English is also supported. Routes use `/ar` and `/en`,
  with legacy unprefixed public URLs redirecting to Arabic. Preserve equivalent navigation,
  localized content and metadata, and right-to-left layout for Arabic.
- The eight planned track directions are in `src/config/learning-tracks.ts`. A planned name is not
  a published detail record. The Software Testing track is published; the other seven directions
  still need approved details before their cards can open detail pages.
- The published Software Testing Fundamentals course is a four-month program with the currently
  recorded price of 7,500 EGP, and Ahmed Sayed Ahmed is its published instructor. The repository's
  validated content records and translations hold the exact current public wording. Check them
  before changing or repeating claims about curriculum, availability, or enrollment.
- Registration is an expression of interest. No LMS, payment, student account, or guaranteed
  enrollment is part of the current v1 scope.
- Do not fabricate testimonials, start dates, contact details, social links, or credentials. Use
  approved records and assets before publishing them.

## Technology and operations

- Keep the documented Next.js, TypeScript, Tailwind, Supabase, and test stack. Secrets remain in
  ignored local or deployment environment settings. Never include a Supabase secret in a prompt,
  source file, issue, or PR.
- `https://e2eacademy.vercel.app` is the current canonical origin in configuration and deployment
  docs. A brand/domain change requires its own deployment and SEO review; this file does not
  approve a new production domain.
