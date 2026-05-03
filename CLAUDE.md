# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Frontend (root)

```bash
pnpm dev          # Start Next.js dev server (port 3001 by default)
pnpm build        # Production build
pnpm lint         # ESLint
```

### Backend (`cd backend`)

```bash
pnpm start:dev    # NestJS dev server with watch (port 3000)
pnpm build        # Compile TypeScript
pnpm start:prod   # Run compiled dist/main
pnpm lint         # ESLint + Prettier fix
pnpm test         # Jest unit tests
pnpm test:e2e     # End-to-end tests
pnpm test:cov     # Coverage report
```

### Database (inside `backend/`)

```bash
npx prisma migrate dev    # Create and apply a new migration
npx prisma db push        # Push schema changes without migration file
npx prisma studio         # Open Prisma Studio GUI
npx prisma generate       # Regenerate Prisma client (output: src/generated/prisma)
```

## Architecture

### Monorepo layout

- `/` — Next.js 16 frontend (App Router, TypeScript, Tailwind CSS 4, Framer Motion)
- `/backend` — NestJS 11 API (TypeScript, Prisma 7, PostgreSQL via Neon)
- `pnpm-workspace.yaml` — workspace root

### Frontend request flow

All API calls go through `src/utils/fetchWithAuth.ts`, which attaches the JWT Bearer token. Services in `src/services/` (`userService`, `sessionService`, `coachService`, `exerciseService`) wrap these calls and always target `${process.env.NEXT_PUBLIC_API_URL}/`.

Auth state lives in `src/context/AuthContext.tsx` — token + decoded role + userId stored in `sessionStorage`. JWT payload shape: `{ sub: number, email: string, role: string }`. The `isLoading` flag must be checked before any role-based rendering to avoid flash of unauthenticated content.

### Backend structure

Each domain is a self-contained NestJS module: `auth`, `users`, `coaches`, `sessions`, `exercises`, `stripe`. `PrismaService` is provided globally at `AppModule` level and injected into each service.

Route protection uses two decorators together:

- `@UseGuards(JwtAuthGuard)` — verifies JWT
- `@UseGuards(RolesGuard)` + `@Roles('coach')` — enforces role

JWT tokens expire in 7 days. Secret comes from `JWT_SECRET` env var (falls back to `'secret'` in dev — never use in prod).

### Database schema key relationships

- `User` has role `"client"` or `"coach"`. A user with role `"coach"` also has a `Coach` record linked via `Coach.userId`.
- `Coach` → has many `User` clients (via `CoachClients` relation), many `Exercise` (coach-specific), one `Subscription`, one `StripeConnect`.
- `Session` belongs to a `User`, contains many `SessionExercise` join records (with `sets`, `reps`, `weight`).
- `Exercise` can be global (`coachId: null`) or coach-specific.

### Stripe integration

Two separate Stripe features:

1. **Subscriptions** — coaches pay for platform plans (`starter`/`pro`/`elite`). Tracked in `Subscription` model.
2. **Stripe Connect** — coaches receive payouts. Tracked in `StripeConnect` model (`onboardingComplete`, `payoutsEnabled`).

### Image sources

`next.config.ts` allows remote images only from `images.unsplash.com`. Local images are served from `/assets/` and `/icons/`.
