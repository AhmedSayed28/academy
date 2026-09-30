# Deployment and SEO readiness

## Canonical production origin

Academy's canonical public origin is:

```text
https://e2eacademy.vercel.app
```

`NEXT_PUBLIC_APP_URL` is required and validated as an absolute HTTP(S) origin. It must not contain
a path, query string, fragment, or credentials. Use the production value above for both Vercel
Production and Preview deployments. This keeps canonical links, Open Graph URLs, `robots.txt`,
and `sitemap.xml` stable when a preview is rendered on a temporary Vercel hostname.

Local builds and development servers also require this variable. Start from `.env.example` and
keep real secret values in ignored local files or the Vercel environment settings.

## Required Vercel environment variables

| Variable | Visibility | Recommended Vercel targets | Purpose |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_APP_URL` | Browser-visible | Production and Preview | Canonical public origin; use the production URL in both targets. |
| `SUPABASE_URL` | Server-only | Production and Preview when forms are exercised | Supabase project endpoint used by form persistence. |
| `SUPABASE_SECRET_KEY` | Secret, server-only | Production and Preview when forms are exercised | Supabase credential used by server repositories. Mark it sensitive and never prefix it with `NEXT_PUBLIC_`. |

Do not place secret values in Git, build logs, browser bundles, issue text, or pull-request text.
Changing Vercel environment variables does not update an existing deployment: redeploy the
intended `main` commit after settings change.

## Production branch verification

On 2026-09-29, the GitHub deployment history reported the Vercel **Production** environment on
the exact current `main` commit (`1c4989d3a66d2f4289241b98a49d35ac6749c429`). The preceding
Production record likewise followed the preceding merged `main` commit. This confirms the active
Git integration is deploying merged `main` commits to Production. The Vercel dashboard's branch
setting was not directly accessible during this verification; confirm it remains `main` before
changing repository or Vercel Git settings.

## Search indexing behavior

Production serves an allow policy for public routes, blocks `/api/`, and advertises the canonical
sitemap. Preview deployments receive three layers of protection:

1. Vercel applies `X-Robots-Tag: noindex` to preview and outdated production deployments.
2. The application emits non-indexing root metadata when `VERCEL_ENV=preview`.
3. The preview `/robots.txt` disallows `/`.

The preview still uses the production URL for canonical references. During the 2026-09-29 audit,
the current preview URL was protected by Vercel Authentication and returned the Vercel login
surface to anonymous requests. That protection prevents anonymous crawler access, but it also
blocked direct inspection of the application's preview HTML and headers. The application-layer
preview behavior is therefore covered locally by automated tests; recheck a bypass-authorized or
temporarily accessible preview if direct response verification is required.

## Pre-change production audit

The following describes the deployment that existed before the SEO branch was merged or deployed:

- Home, Courses, Tracks, Instructors, About, Contact, FAQ, and Register Interest returned HTTP 200.
- Primary and footer navigation pointed to the implemented public routes.
- Page titles were present; the homepage title did not yet use the new shared default format.
- No audited public page emitted a canonical link.
- `/robots.txt` and `/sitemap.xml` both returned the application 404 response.
- An unknown path returned HTTP 404 with non-indexing metadata.

Do not treat local validation of this branch as a production deployment check. After this branch
is reviewed and merged, verify the deployed response independently.

## Post-deployment checklist

1. Confirm the Vercel Production Branch is `main`.
2. Configure the three required environment variables for the intended scopes without exposing
   their values.
3. Redeploy the merged `main` commit if any environment setting was added or changed.
4. Verify all public routes return the expected status and navigation.
5. Verify unique page titles, absolute production canonicals, Open Graph metadata, and Twitter
   metadata in deployed HTML.
6. Verify `/robots.txt` allows public paths, excludes `/api/`, and references the production
   sitemap.
7. Verify `/sitemap.xml` contains only implemented static routes and published detail records.
8. Verify an unknown path returns HTTP 404 and remains non-indexable.
9. Verify a preview uses production canonicals and remains non-indexable, using an authorized
   request if Deployment Protection is enabled.

## Localized route deployment checks

After the localization release:

1. Confirm `/` redirects permanently to `/ar` without inspecting browser language.
2. Confirm every supported legacy unprefixed public path redirects to the equivalent Arabic path.
3. Confirm `/ar` and `/en` pages render the correct `lang` and `dir` values and the language switch preserves the current page.
4. Confirm `/api/leads` and `/api/contact` remain unprefixed and accept submissions from both locales.
5. Confirm localized pages emit self-referencing production canonicals, reciprocal `ar` and `en` hreflang links, and an Arabic `x-default`.
6. Confirm the sitemap contains only valid localized canonical URLs and excludes redirected legacy URLs.
7. Confirm invalid locale prefixes and unknown localized content return HTTP 404.
8. Confirm the bundled Arabic and Latin fonts load from application assets in the production build.
