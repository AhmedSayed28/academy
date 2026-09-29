# Academy Database

Academy uses PostgreSQL through Supabase. Database changes are stored as ordered SQL files in
`supabase/migrations`. The application must never report a lead as submitted unless Supabase has
accepted the write.

## Lead persistence setup

1. Create or select a Supabase project.
2. Open the project's SQL Editor.
3. Copy and run the complete contents of
   `supabase/migrations/202609290001_create_leads.sql`.
4. In Supabase, open **Project Settings → API** and copy the project URL and service-role key.
5. Copy `.env.example` to `.env.local` and set:

   ```text
   SUPABASE_URL=https://your-project-ref.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

6. Restart the Next.js development server after changing environment variables.
7. Submit the register-interest form and verify that exactly one row appears in
   **Table Editor → leads**.

For CLI-managed environments, link the local repository to the intended Supabase project and run
`supabase db push` instead of using the SQL Editor. Confirm the target project before applying the
migration.

Both environment variables are server-only. Never rename them with a `NEXT_PUBLIC_` prefix, expose
the service-role key to browser code, paste credentials into documentation, or commit `.env.local`.
The migration enables row-level security and gives neither `anon` nor `authenticated` direct table
access; the route handler is the public boundary and writes with the server-side service role.

## Leads table

`public.leads` stores the normalized name, email, optional phone, optional message, creation time,
and a client-generated `submission_id`. The unique submission ID makes a retried request
idempotent, while the form also locks during an active request to prevent accidental duplicate
clicks. No course, track, enrollment, price, or schedule is recorded by this general-interest flow.

If the Supabase variables are missing or persistence fails, `POST /api/leads` returns a safe
`PERSISTENCE_ERROR` response and the UI asks the visitor to try again. There is no in-memory or
local production fallback.
