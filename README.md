# Academy

Academy is a practical technology education platform. This repository currently contains only the project foundation; product features will be implemented in focused follow-up work.

## Local development

Use Node.js 20.9+ and pnpm. From the repository root:

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000>. Copy `.env.example` to `.env.local` when an integration requires configuration; no credentials are needed for the current scaffold.

## Checks

```bash
pnpm lint
pnpm test
pnpm build
```

`pnpm test:e2e` validates the global responsive layout, navigation behavior, and homepage experience. See `AGENTS.md` and `docs/` for engineering and product requirements.
