# ShadowSpark Cyberfood — Food & Grocery Delivery (Nigeria)

Cyberpunk-neon food &amp; grocery delivery for Nigeria. Restaurant &amp; grocery ordering with a
working AI assistant — prices in ₦, delivery zones across Lagos, Abuja and Port Harcourt.

Part of the ShadowSpark delivery-platform suite (see `../delivery-ai-agents-common`).

## Stack

Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS 3 · ESLint 8 · Prisma 5 · pnpm.

## Features

- **Landing** — hero, featured restaurants, category grid, delivery zones.
- **Browse** — filter by cuisine, delivery time, rating, min order; sort; search.
- **Menu** — per-restaurant categories, ₦ prices, dietary tags (halal / vegetarian / gluten-free), add-to-cart.
- **Cart** — quantities, promo codes (`SPARK10`, `FRESH20`), delivery time-slot selection.
- **Checkout** — address autocomplete (mock), Paystack or cash, order review.
- **Track** — live status timeline (Placed → Confirmed → Preparing → En route → Delivered), driver, ETA, map.
- **Dashboard** — order history + reorder.
- **AI assistant** (floating widget, every page) — order status, diet filters, reschedule,
  returns, and "talk to a human" handoff. Built on the shared `delivery-ai-agents-common` SDK.

## Quick start

```bash
pnpm install
cp .env.example .env          # fill in what you need
pnpm dev                      # http://localhost:3000
```

## AI assistant — how it works

`src/app/api/chat/route.ts` assembles an agent from the shared SDK
(`createAgent` + vertical tools wired to the typed fixtures). **With no API key it uses the
rule-based `MockLLM`** and genuinely answers intents against the seed/data fixtures —
order status, reschedule, dietary filtering, "which restaurants deliver here", returns, and
human handoff. Setting `OPENAI_API_KEY` (+ optional `OPENAI_BASE_URL` for OpenRouter)
swaps in the real LLM in one line, in `src/lib/agent.ts`.

## Database

`prisma/schema.prisma` (Restaurant, MenuItem, Category, Customer, Order, OrderItem,
DeliveryZone, Driver, Address, Payment) validates with `pnpm db:validate`. The Next.js
**build never connects to a database** — all pages render from typed fixtures in
`src/data/*` so the app runs with zero infra. To use the real backend:

```bash
pnpm db:generate            # prisma generate
pnpm db:seed                # needs a reachable DATABASE_URL
```

## Env vars (see `.env.example`)

| Var | Purpose |
|---|---|
| `DATABASE_URL` | Postgres/Neon — for prisma generate/seed only |
| `OPENAI_API_KEY` | Real LLM for `/api/chat` (optional; MockLLM fallback otherwise) |
| `OPENAI_BASE_URL` / `OPENAI_MODEL` | OpenRouter/self-host swap |
| `PAYSTACK_SECRET_KEY` | Enables live Paystack checkout redirects |
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | Client-side Paystack presence |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Live maps (static placeholder without it) |
| `NEXT_AUTH_SECRET` | Reserved for future auth |

## Gates

```bash
pnpm tsc --noEmit && pnpm lint && pnpm build
```

## License
MIT — ShadowSpark Technologies, Owerri, Nigeria.
