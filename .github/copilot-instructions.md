# GitHub Copilot Instructions — pes-supply-storefront

## Project Overview

This is the **PES Supply** e-commerce storefront — a Next.js 16 application powering **pes.supply**.

- **Framework:** Next.js 16 (App Router) with React 19
- **Styling:** Tailwind CSS v4 + shadcn/ui component library
- **Commerce backend:** Medusa v2 (self-hosted at `api.pes.supply`)
- **Payments:** Stripe
- **Analytics:** Google Analytics 4 + Google Tag Manager + Vercel Analytics + Vercel Speed Insights
- **Package manager:** pnpm (always use `pnpm`, never `npm` or `yarn`)
- **TypeScript:** Strict mode enabled

---

## Architecture

### Directory Structure

```
.
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout (GA4, GTM, Vercel Analytics, Speed Insights)
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Global styles (Tailwind base)
│   ├── shop/                   # Product browsing
│   │   ├── page.tsx            # All products listing
│   │   ├── categories/         # Category pages
│   │   └── products/[handle]/  # Product detail pages
│   ├── checkout/               # Checkout flow
│   ├── account/                # Customer account + order history
│   └── api/                    # API routes
│       ├── health/             # Health check endpoint
│       ├── revalidate/         # ISR on-demand revalidation
│       └── sitemap/            # Dynamic XML sitemap
├── components/                 # Shared React components
│   └── ui/                     # shadcn/ui primitives
├── lib/                        # Utility functions and API clients
├── public/                     # Static assets
├── .github/
│   └── workflows/              # CI/CD GitHub Actions
│       ├── deploy-pes-supply.yml     # Main deploy (Azure primary → Vercel fallback)
│       ├── vercel-production.yml     # Vercel production deploy
│       ├── vercel-preview.yml        # Vercel preview deploy (PRs)
│       └── cloudflare-purge.yml      # CDN cache purge post-deploy
└── vercel.json                 # Vercel project config
```

### Deployment Architecture

```
GitHub push to main
        │
        ▼
   GitHub Actions (deploy-pes-supply.yml)
        │
        ├─── Build (Node 22, pnpm 9)
        │
        ├─── Azure App Service PRIMARY (PES-Stage / production)
        │         │
        │         └─── Health check /api/health
        │                   │
        │                   └─── FAIL → Vercel Fallback
        │
        └─── Smoke Tests
```

- **Primary host:** Azure App Service (`PES-Stage` for staging)
- **Fallback host:** Vercel (`prj_RFHh7bl9ekSNk8LAA96sXPCJ5gjB` / `team_XQxmrDxKnJR8qGObDLGjZrY9`)
- **CDN:** Cloudflare (cache purged after every successful deploy)
- **Domain:** `pes.supply` (production), `staging.pes.supply` (staging)

---

## Environment Variables

### Required at build time (injected via GitHub Secrets in CI)

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Full URL of site (e.g. `https://pes.supply`) |
| `NEXT_PUBLIC_MEDUSA_BACKEND_URL` | Medusa API base URL (e.g. `https://api.pes.supply`) |
| `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` | Medusa publishable API key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (`pk_live_...` or `pk_test_...`) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 ID (`G-XXXXXXXXXX`) |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container ID (`GTM-XXXXXX`) |
| `GOOGLE_SITE_VERIFICATION` | Google Search Console verification token |
| `REVALIDATE_SECRET` | Secret token to protect `/api/revalidate` endpoint |
| `COMMERCE_PROVIDER` | Always `medusa` |

### GitHub Secrets (must be set at `Settings → Secrets → Actions`)

**All environments:**
- `VERCEL_TOKEN` — Vercel personal access token
- `REVALIDATE_SECRET` — Random hex string
- `NEXT_PUBLIC_GTM_ID` — GTM container ID
- `GOOGLE_SITE_VERIFICATION` — Search Console token

**Production:**
- `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `AZURE_PRODUCTION_APP_NAME`
- `AZURE_PRODUCTION_PUBLISH_PROFILE`

**Staging:**
- `STAGING_MEDUSA_PUBLISHABLE_KEY`
- `STAGING_STRIPE_PUBLISHABLE_KEY`
- `STAGING_GA_MEASUREMENT_ID`
- `AZURE_STAGING_PUBLISH_PROFILE`

**Cloudflare:**
- `CLOUDFLARE_ZONE_ID`
- `CLOUDFLARE_API_TOKEN`

### Local development (`.env.local` — never commit this file)

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=your_medusa_publishable_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXX
REVALIDATE_SECRET=local-dev-secret
COMMERCE_PROVIDER=medusa
```

---

## Coding Standards

### TypeScript

- **Always use TypeScript** — no `.js` files in `app/` or `lib/`
- Prefer explicit types over `any`
- Use `interface` for object shapes, `type` for unions/aliases
- All API response types must be defined — never use untyped `fetch` responses

```typescript
// ✅ Good
interface Product {
  id: string
  title: string
  handle: string
  thumbnail: string | null
  variants: ProductVariant[]
}

// ❌ Bad
const product: any = await fetchProduct(handle)
```

### React / Next.js

- **App Router only** — never use `pages/` directory patterns
- Prefer **Server Components** by default; only add `"use client"` when you need interactivity, browser APIs, or React hooks
- Use `loading.tsx` and `error.tsx` for route-level loading/error states
- Use `next/image` for all images — never raw `<img>` tags
- Use `next/link` for all internal navigation — never raw `<a>` tags
- Metadata must be exported from each page using Next.js `generateMetadata()` or the `metadata` export

```typescript
// ✅ Server Component (default)
export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await getProduct(params.handle)
  return <ProductDetail product={product} />
}

// ✅ Client Component (only when needed)
"use client"
import { useState } from "react"
export function AddToCartButton({ variantId }: { variantId: string }) {
  const [loading, setLoading] = useState(false)
  // ...
}
```

### Styling

- **Tailwind CSS v4 only** — no inline styles, no CSS modules unless absolutely necessary
- Use `cn()` from `lib/utils` to merge class names conditionally (combines `clsx` + `tailwind-merge`)
- Use shadcn/ui components from `components/ui/` for all UI primitives (Button, Input, Dialog, etc.)
- Follow the existing design system — don't introduce new color tokens or spacing scales

```typescript
// ✅ Good
import { cn } from "@/lib/utils"
<div className={cn("flex items-center gap-4", isActive && "bg-primary text-primary-foreground")}>

// ❌ Bad
<div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
```

### Components

- One component per file
- File name matches component name (PascalCase for components, kebab-case for pages/routes)
- Props interface defined above the component
- Default export for page components, named export for shared components

```typescript
// components/product-card.tsx
interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  // ...
}
```

### API / Data Fetching

- All Medusa API calls go through `lib/medusa.ts` (the Medusa JS SDK client)
- Use `@medusajs/js-sdk` — never raw `fetch` to Medusa endpoints
- Stripe operations use `@stripe/stripe-js` on client, Stripe Node SDK on server
- Cache strategy: use Next.js `fetch` cache options (`{ next: { revalidate: 3600 } }`) for product data
- Never expose secret keys — only `NEXT_PUBLIC_` vars are safe on the client

```typescript
// ✅ Good — server-side data fetch
import { sdk } from "@/lib/medusa"
const { products } = await sdk.store.product.list({ limit: 12 })

// ❌ Bad — direct fetch with no typing
const res = await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/products`)
```

---

## Medusa Integration

- Medusa v2 backend runs at `https://api.pes.supply` (production) and `https://api-staging.pes.supply` (staging)
- Publishable key is required for all storefront API calls — passed as `x-publishable-api-key` header via the SDK
- Key Medusa entities used: `Product`, `ProductVariant`, `Cart`, `Order`, `Customer`, `Region`, `ShippingOption`
- Cart is stored in a cookie (`_medusa_cart_id`) — use `cookies()` from `next/headers` in server components
- Always handle region selection — prices are region-specific

```typescript
// lib/medusa.ts
import Medusa from "@medusajs/js-sdk"

export const sdk = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL!,
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY!,
})
```

---

## Stripe Integration

- Use Stripe Elements via `@stripe/react-stripe-js` for the payment form in checkout
- Payment Intent is created server-side via a Next.js API route — never on the client
- Always use `pk_live_` keys in production and `pk_test_` in staging/local
- Webhook handling (if added) must verify Stripe signatures using `STRIPE_WEBHOOK_SECRET`

---

## SEO

- Every page must have `<title>`, `<meta name="description">`, and Open Graph tags via Next.js `generateMetadata()`
- `app/sitemap.ts` generates a dynamic sitemap including all product and category handles
- `app/robots.ts` controls crawler access
- Google Search Console verification is injected in `app/layout.tsx` via `GOOGLE_SITE_VERIFICATION`
- Structured data (JSON-LD) for Product and BreadcrumbList should be included on product detail pages

---

## Performance

- All product images must use `next/image` with explicit `width` and `height` (or `fill` with a sized container)
- Use `loading="lazy"` for below-the-fold images; `priority` only for hero/LCP images
- Static pages (homepage, categories) use ISR with `revalidate: 3600` (1 hour)
- Product detail pages use `generateStaticParams()` to pre-render at build time
- The `/api/revalidate` endpoint accepts a `secret` query param matching `REVALIDATE_SECRET` to trigger on-demand revalidation from Medusa webhooks

---

## Testing & Quality

- Run `pnpm build` before pushing — never push code that fails to build
- TypeScript errors are blocking — fix all `tsc` errors before committing
- The smoke test script (`scripts/staging-smoke-test.sh`) runs automatically after every staging deploy
- Test critical paths manually: homepage → category → product → add to cart → checkout

---

## Git Workflow

- **`main`** branch = staging deploy (auto on every push)
- **Production deploy** = manual `workflow_dispatch` from GitHub Actions UI with `environment: production`
- Branch naming: `feat/description`, `fix/description`, `chore/description`
- Commit message format: `type: short description` (e.g. `feat: add wishlist button`, `fix: cart quantity update`)
- Never commit `.env.local`, `node_modules/`, or `.next/`

---

## Common Tasks

### Add a new page

```bash
# Create the file
touch app/[route]/page.tsx

# Add metadata export
export const metadata = {
  title: "Page Title | PES Supply",
  description: "Page description",
}

# Default export the page component
export default function NewPage() {
  return <div>...</div>
}
```

### Add a new shadcn/ui component

```bash
pnpm dlx shadcn@latest add [component-name]
```

### Run locally

```bash
pnpm install
cp .env.example .env.local  # fill in your values
pnpm dev
```

### Trigger a production deploy

Go to: **Actions → Deploy pes.supply → Run workflow → environment: production**

### Manually trigger Vercel-only deploy

```bash
pnpm dlx vercel --prod
```

---

## Do Not

- ❌ Do not use `npm` or `yarn` — always `pnpm`
- ❌ Do not add `"use client"` to server components that don't need it
- ❌ Do not use `pages/` directory — App Router only
- ❌ Do not expose `STRIPE_SECRET_KEY`, `MEDUSA_ADMIN_*`, or any non-`NEXT_PUBLIC_` secret in client code
- ❌ Do not bypass TypeScript with `// @ts-ignore` — fix the types
- ❌ Do not inline styles — use Tailwind classes
- ❌ Do not commit lockfile changes without running `pnpm install` locally first
- ❌ Do not push directly to `main` without verifying `pnpm build` passes locally
