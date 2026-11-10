# DECISIONS.md — delivery-food-grocery

Documented judgment calls (per the delivery-platform contract §0 rule 1).

1. **No database at build time.** Real Postgres/OpenAI/Paystack/Mapbox are unavailable for the
   build, and `next build` must stay green, so every page renders from **typed fixtures**
   (`src/data/*`). Prisma schema is present and validates; `prisma/seed.ts` is a runnable,
   self-contained seed (no `@/` alias so `tsx` can execute it) that only runs when a real
   `DATABASE_URL` is configured. AI tools operate on the same fixtures, so the chat is real.

2. **hand-authored shadcn-style UI, not the interactive CLI.** `components/ui/*` is a small
   set (Button, Card, Input, Textarea, Badge, Skeleton, Checkbox, Select) built with Tailwind +
   clsx + tailwind-merge, themed to ShadowSpark's cyberpunk neon. Avoids create-next-app /
   shadcn init drift under automation and keeps the build deterministic.

3. **ESLint 8 + eslint-config-next (legacy `.eslintrc.json`)** so `pnpm lint` runs `next lint`
   non-interactively (ESLint 9 flat config breaks it).

4. **Auth is not wired for the build.** The contract allows it; a full NextAuth integration
   would risk `next build` failing without credentials. `NEXT_AUTH_SECRET` is reserved and the
   app uses fixture-based customer identity (`currentCustomer`) for UI gating. Note as a
   future-work item.

5. **Paystack checkout is gated behind `PAYSTACK_SECRET_KEY`.** `POST /api/paystack/init`
   returns a hosted authorization_url only when configured; otherwise checkout falls back to
   demo mode (clears cart → tracking page) and shows a clear one-line note. No card data ever
   touches this server — Paystack handles it.

6. **Mapbox is a static-placeholder fallback.** `MapPlaceholder` renders a stylized neon map
   with the same component API; a real map activates when `NEXT_PUBLIC_MAPBOX_TOKEN` is set.

7. **Real-LLM swap is one env var.** `src/lib/agent.ts` picks `createOpenAILLM` over `MockLLM`
   purely from `OPENAI_API_KEY`, so no code changes are needed to go live.

8. **`searchParams`/`params` are typed as Promises** (Next 15 App Router async contract) to
   satisfy the build's PageProps check.

9. **Rebuild the shared SDK before a fresh consumer install.** The vertical imports
   `delivery-ai-agents-common` via `file:../…`; its built `dist/` must exist (it does in the
   delivered workspace). If you edit the SDK, rebuild it or consumers silently link the old
   surface.
