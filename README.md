# Academy

Academy is a practical technology education platform. The public experience includes the homepage, course catalog, documented learning-track directions, an instructor directory ready for approved profiles, and a general-interest form backed by Supabase.

## Local development

Use Node.js 20.9+ and pnpm. From the repository root:

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000>. The public content pages need no credentials. Lead submission requires server-only Supabase configuration and the database migration described in [`docs/DATABASE.md`](docs/DATABASE.md). Copy `.env.example` to `.env.local` and never commit real credentials.

## Checks

```bash
pnpm lint
pnpm test
pnpm build
```

`pnpm test:e2e` validates the global responsive layout, navigation behavior, homepage, course, learning-track, instructor, and register-interest experiences. See `AGENTS.md` and `docs/` for engineering and product requirements.
