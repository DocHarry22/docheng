# DoCHEng

DoCHEng is a Next.js landing site for the DoCHEng product ecosystem, with a waitlist capture flow for early access.

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
```

## Environment

Copy `.env.example` to `.env.local` and configure:

- `NEXT_PUBLIC_SITE_URL`: canonical public origin for metadata and origin validation
- `WAITLIST_ALLOWED_ORIGINS`: optional comma-separated trusted origins for the waitlist form
- `WAITLIST_FILE_PATH`: explicit server-side CSV path for waitlist persistence in production

In development, the waitlist API falls back to `./data/waitlist.csv`. In production, `WAITLIST_FILE_PATH` must be set or the API will reject submissions.

## Deployment notes

- The app serves only static marketing pages plus the waitlist API route.
- Security headers are configured in `next.config.ts`.
- The default font stack is local/system-based so CI and offline builds do not depend on Google Fonts.
