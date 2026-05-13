# Shopify → Medusa Migration Checklist for pes.supply

## Phase 0: Shopify Data Export

### Products
- [ ] Shopify Admin → Products → Export → All products → CSV
- [ ] Shopify Admin → Products → Export → All variants → CSV  
- [ ] Download all product images (use bulk export app or API)
- [ ] Export product metafields (Shopify Admin API: `/admin/api/2024-10/metafields.json`)

### Collections
- [ ] Export all collections (smart + manual)
- [ ] Note collection rules for smart collections (will become Medusa product categories + tags)

### Customers
- [ ] Shopify Admin → Customers → Export → All customers → CSV
- [ ] Note: passwords cannot be exported — customers must reset on first login to Medusa

### Orders (historical)
- [ ] Shopify Admin → Orders → Export → All orders → CSV
- [ ] Export for Odoo order history import (scripts/fetch-odoo-products.js pattern)

### Discounts / Gift Cards
- [ ] Export discount codes
- [ ] Export gift card balances (manual re-issue in Medusa)

### Pages / Blog
- [ ] Export pages (About, FAQ, Policy pages)
- [ ] Export blog posts

### Theme Assets
- [ ] Download logo, favicon, brand assets
- [ ] Screenshot key pages for design reference

---

## Phase 1: Medusa Import

### Products
```bash
# From inside ~/medusa-pes-supply:
npx medusa product:import --file products.csv
# Or use Medusa Admin UI: http://localhost:9000/app → Products → Import
```

### Customers
- Import via Medusa Admin or REST API
- Send password-reset email blast after import

### URL Redirects
Already wired in `next.config.mjs`. Verify these Shopify → pes.supply redirects:

| Shopify URL pattern | Redirects to |
|--------------------|--------------|
| `/collections/*` | `/categories/*` |
| `/products/*` | `/products/*` |
| `/pages/about` | `/about` |
| `/pages/contact` | `/contact` |
| `/account` | `/account` |
| `/cart` | `/cart` |
| `/checkout` | `/checkout` |

---

## Phase 2: Verification

- [ ] All products visible in Medusa Admin
- [ ] Product images loading correctly
- [ ] Cart + checkout flow working end-to-end
- [ ] Customer login working
- [ ] Stripe payment processing working
- [ ] Odoo order sync working (SYNC_TO_ODOO=true)
- [ ] Google Merchant Center product feed live
- [ ] Search Console shows pes.supply indexed (not Shopify domain)

---

## Phase 3: Shopify Handoff

- [ ] Set up Shopify password protection (maintenance mode) during cutover
- [ ] Update Shopify custom domain to point to pes.supply (not the other way)
- [ ] Keep Shopify store active for 30 days as fallback
- [ ] Cancel Shopify subscription after 30-day verification window
