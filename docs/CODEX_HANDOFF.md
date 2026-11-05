# Codex handoff — 2026-11-04

Use this together with `AGENTS.md` and `docs/PRODUCT_DECISIONS.md`. It is a status snapshot, not
an instruction to implement every remaining item at once. Confirm the current `main` branch and
open PRs before starting a new task.

## Verified repository state

At review, `main` was `142f976` (merged PR #15). The local clone had an old
`feature/project-setup` checkout, so this handoff was prepared from the latest fetched `main`.

| Area | Current implementation |
| --- | --- |
| Foundation | Next.js App Router, TypeScript, Tailwind, shared layout, navigation and footer. |
| Public pages | Homepage, courses and details, tracks and details, instructors, interest form, contact, about, and FAQ. |
| Approved content | One Software Testing course, one Software Testing track, and Ahmed Sayed Ahmed's instructor profile. Seven other track names are displayed as planned directions. |
| Forms | `POST /api/leads` and `POST /api/contact` validate and persist through service/repository layers. `docs/DATABASE.md` records successful live Supabase submissions on 2026-09-29; reverify the target environment for any new deployment. |
| Search and localization | Metadata, sitemap, robots, Arabic and English routes, localized content and right-to-left Arabic layout. |
| Visuals | Phase 13 permanent dark design is in the code. The later Ernst name, logo asset and selected palette have not been applied. |

The old conversation's Phase 3–5 empty-state reports predate the approved content merged in PR
#13. Likewise, Phase 6 is no longer merely proposed: its code and a live persistence check are
recorded in the repository. Follow the current source and deployment evidence, not old prompts.

## Decisions still awaiting implementation or evidence

1. **Brand alignment:** plan and implement a focused Ernst rename and visual update using
   `PRODUCT_DECISIONS.md`. Inventory shared config, Arabic/English dictionaries, metadata, favicon,
   page copy and screenshots. Obtain the approved logo asset before using it. Review contrast,
   mobile/desktop layouts and SEO; do not silently change the canonical domain.
2. **Track content:** seven planned directions need approved descriptions, career goals, skills,
   sequence, tools and relationships. Until then, do not link their cards to nonexistent detail
   records. Validate published records through the existing repository/service conventions.
3. **Content completeness:** add further courses, instructors, authentic testimonials, dates,
   contact/social channels or FAQs only when the relevant content is approved. There is already
   an FAQ page; inspect it before proposing new FAQ work.
4. **Deployment:** `docs/DEPLOYMENT.md` contains a pre-change production audit and post-deployment
   checklist. The latest localization and later brand work require independent verification on
   the deployed site; a local build alone is not deployment evidence.

## Working in Codex

Open this repository itself as the workspace. Start from updated `main`; use a dedicated branch
or worktree for each focused task. Read `AGENTS.md`, `PRODUCT_DECISIONS.md`, and the relevant
feature, architecture and UI docs. Inspect code and PR state before assuming a phase is pending.
Keep approved content separate from synthetic test fixtures. Run the relevant `pnpm` checks and
report what was actually verified. Do not paste secrets into prompts.
