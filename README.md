# DoCHEng

DoCHEng is a Next.js marketing site plus a lightweight authenticated workspace for the DoCHEng product ecosystem, with a waitlist capture flow and protected engineering calculators.

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
```

## Environment

Configure `.env.local` with:

- `NEXT_PUBLIC_SITE_URL`: canonical public origin for metadata and origin validation
- `WAITLIST_ALLOWED_ORIGINS`: optional comma-separated trusted origins for the waitlist form
- `WAITLIST_FILE_PATH`: explicit server-side CSV path for waitlist persistence in production
- `SESSION_SECRET`: required in production to sign auth sessions; omitted locally a development fallback is used

In development, the waitlist API falls back to `./data/waitlist.csv`. In production, `WAITLIST_FILE_PATH` must be set or the API will reject submissions.
Registered users are stored in `./data/users.json` by default.

## Authenticated routes

- `/auth/login` and `/auth/register` provide email/password authentication
- `/dashboard` is a protected workspace with role-aware access summaries
- `/calculators` and `/calculators/[slug]` provide protected engineering calculators

## Deployment notes

- The app serves marketing pages, auth routes, protected dashboard/calculator pages, and the waitlist/auth API routes.
- Security headers are configured in `next.config.ts`.
- The default font stack is local/system-based so CI and offline builds do not depend on Google Fonts.
