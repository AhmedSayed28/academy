# Academy Database

Academy uses PostgreSQL through Supabase. Database changes are stored as ordered SQL files in
`supabase/migrations`. The application must never report a lead or contact message as submitted
unless Supabase has accepted the write.

## Public catalog content

Phase 11 approved course, track, and instructor content is not database-backed. It follows the
existing validated repository-source convention so launch content can be reviewed in source control.
Synthetic environment-driven fixtures remain isolated from those production records. No catalog
content migration, CMS, or admin data model is introduced by this phase.

## Lead persistence setup

1. Install or run the Supabase CLI and authenticate with `supabase login`.
2. Link this repository to the Academy project:

   ```bash
   supabase link --project-ref vnngyxhhhvrrrtgbkzup
   ```

3. Inspect remote migration history with `supabase migration list`.
4. Preview the pending migration without changing the database:

   ```bash
   supabase db push --dry-run
   ```

5. Review the dry-run output, then apply the same pending migration once with:

   ```bash
   supabase db push
   ```

   Do not also run the migration in the SQL Editor.

6. In Supabase, open **Project Settings → API Keys** and copy the project URL and secret key.
7. Copy `.env.example` to `.env.local` and set:

   ```text
   SUPABASE_URL=https://vnngyxhhhvrrrtgbkzup.supabase.co
   SUPABASE_SECRET_KEY=your-secret-key
   ```

8. Restart the Next.js development server after changing environment variables.
9. Submit the register-interest form and verify that exactly one row appears in
   **Table Editor → leads**.

Both environment variables are server-only and are shared by `POST /api/leads` and
`POST /api/contact`. Never rename them with a `NEXT_PUBLIC_` prefix, expose
the secret key to browser code, paste credentials into documentation, or commit `.env.local`.
The migration enables row-level security and gives neither `anon` nor `authenticated` direct table
access; the route handler is the public boundary and sends the `sb_secret_` key only in Supabase's
`apikey` header. It is not sent as a bearer token.

## Leads table

`public.leads` stores the normalized name, email, optional phone, optional message, creation time,
and a client-generated `submission_id`. The unique submission ID makes a retried request
idempotent, while the repository's merge-on-conflict behavior ensures edited details replace an
earlier payload before a retry can report success. The form also locks during an active request to
prevent accidental duplicate clicks. No course, track, enrollment, price, or schedule is recorded
by this general-interest flow.

If the Supabase variables are missing or persistence fails, `POST /api/leads` returns a safe
`PERSISTENCE_ERROR` response and the UI asks the visitor to try again. There is no in-memory or
local production fallback.

## Live verification

On September 29, 2026, project `vnngyxhhhvrrrtgbkzup` was linked and inspected with Supabase CLI
2.118.0. The dry run listed only `202609290001_create_leads.sql`; that migration was then applied
once through `supabase db push`. Local and remote migration history matched afterward, and
`public.leads` was present with no rows before verification.

A clearly marked synthetic lead was submitted through the rendered `/register-interest` form. The
route returned HTTP 201 after persistence, and a server-side query by that submission ID returned
exactly one row whose stored fields matched the submitted payload. No credentials or submitted
field values are recorded in this document.

## Contact messages table

`public.contact_messages` stores the normalized full name, email, optional phone, free-text subject,
message, creation time, and a client-generated `submission_id`. Database length constraints mirror
the shared Zod schema. The unique submission ID makes a retried request idempotent, while the
repository's merge-on-conflict behavior ensures edited details replace an uncertain earlier payload
before a retry can report success.

Row-level security is enabled. As with `public.leads`, all table privileges are revoked from `anon`
and `authenticated`; `POST /api/contact` is the public boundary and uses the server-only secret key
only in Supabase's `apikey` header. The key is never sent to the browser or used as a bearer token.

If the Supabase variables are missing or persistence fails, `POST /api/contact` returns a safe
`PERSISTENCE_ERROR` response. Invalid payloads return `VALIDATION_ERROR`, and no invalid input
reaches persistence. No email provider, notification, authentication, or admin workflow is part of
this feature.

## Contact live verification

On September 29, 2026, the linked project reference was confirmed as
`vnngyxhhhvrrrtgbkzup` with Supabase CLI 2.118.0. Migration history showed the leads migration as
already applied. `supabase db push --dry-run` listed only
`202609290002_create_contact_messages.sql`; that migration was applied once with `supabase db push`,
and local and remote migration histories matched afterward.

One clearly marked synthetic message was submitted through the rendered `/contact` form. The route
reported success only after persistence, and a server-side lookup by its submission ID returned
exactly one row whose fields matched the expected normalized payload. No credential or submitted
field values are recorded in this document.
