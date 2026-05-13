# PES Supply — Launch Checklist

**Core rule: `pes.supply` stays live and untouched until staging is fully validated.**

---

## Phase 0 — Staging-first mandate

- [ ] Never repoint `pes.supply` or `api.pes.supply` while staging is incomplete
- [ ] Never use live Stripe keys on an unfinished build
- [ ] Never change Shopify primary domain until production promotion is complete
- [ ] All pushes to `main` deploy to `staging.pes.supply` only
- [ ] Production requires a manual `workflow_dispatch` with `environment=production`

---

## Phase 1 — GitHub Secrets

```bash
bash scripts/setup-github-secrets.sh
gh secret list -R ACassilly/pes-supply-storefront
```

**Production secrets (22):**
```
VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID
AZURE_VM_HOST, AZURE_VM_USER, AZURE_VM_SSH_PRIVATE_KEY
NEXT_PUBLIC_MEDUSA_BACKEND_URL, NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY, NEXT_PUBLIC_MEDUSA_REGION
MEDUSA_ADMIN_API_KEY, MEDUSA_WEBHOOK_SECRET
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET
ODOO_URL, ODOO_DATABASE, ODOO_USERNAME, ODOO_API_KEY
CF_ZONE_ID, CF_API_TOKEN
GOOGLE_SITE_VERIFICATION, NEXT_PUBLIC_GA_MEASUREMENT_ID
NEXT_PUBLIC_SITE_URL, REVALIDATE_SECRET
```

**Staging secrets (9):**
```
STAGING_AZURE_VM_HOST, STAGING_AZURE_VM_USER, STAGING_AZURE_VM_SSH_PRIVATE_KEY
STAGING_NEXT_PUBLIC_MEDUSA_BACKEND_URL, STAGING_NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY, STAGING_NEXT_PUBLIC_MEDUSA_REGION
STAGING_NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STAGING_GOOGLE_SITE_VERIFICATION, STAGING_NEXT_PUBLIC_GA_MEASUREMENT_ID
```

---

## Phase 2 — Cloudflare DNS (staging additions only)

Do NOT modify existing `@`, `www`, or `api` records.

Add:
| Type | Name | Value | Proxy |
|------|------|-------|-------|
| CNAME | `staging` | `cname.vercel-dns.com` | ✅ Proxied |
| A | `api-staging` | `<STAGING_AZURE_VM_HOST>` | ✅ Proxied |

---

## Phase 3 — Azure VM provisioning (staging first)

```bash
# SSH into staging VM
ssh pesadmin@<STAGING_AZURE_VM_HOST>

# Install Node 22, pnpm, pm2, nginx, Redis, Postgres
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs postgresql redis-server nginx
npm i -g pnpm pm2

# Postgres (staging)
sudo -u postgres psql -c "CREATE USER medusa_staging WITH PASSWORD 'CHANGE_ME';"
sudo -u postgres psql -c "CREATE DATABASE medusa_pes_staging OWNER medusa_staging;"

# Scaffold Medusa (staging)
npx create-medusa-app@latest medusa-staging --no-browser
cd medusa-staging
# Fill in .env from medusa-backend/.env.template, use staging values
npx medusa migrations run
npx medusa user --email admin@staging.pes.supply --password CHANGE_ME

# Get staging publishable key
# Login to https://api-staging.pes.supply/app -> Settings -> API Keys
# Copy to GitHub Secret: STAGING_NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY

# PM2 staging
pm2 start npm --name pes-supply-staging -- start
pm2 save && pm2 startup
```

---

## Phase 4 — Staging validation

Run smoke tests:
```bash
bash scripts/staging-smoke-test.sh
```

Manual checklist:
- [ ] `https://staging.pes.supply` loads
- [ ] `https://staging.pes.supply/sitemap.xml` loads
- [ ] `https://staging.pes.supply/api/health` returns success
- [ ] `https://staging.pes.supply/api/google-merchant-feed` returns XML
- [ ] Product page loads with staging catalog
- [ ] Add to cart works
- [ ] Checkout: address → shipping options appear → Stripe Elements render in test mode
- [ ] Test order succeeds (Stripe test card `4242 4242 4242 4242`)
- [ ] Order appears in Medusa staging admin
- [ ] Webhooks and ISR revalidation succeed
- [ ] All `scripts/staging-smoke-test.sh` checks pass

---

## Phase 5 — Production promotion (manual dispatch only)

```bash
# GitHub Actions → Deploy pes.supply to Azure → Run workflow
# Environment: production
# This is the ONLY way to deploy to pes.supply
```

- [ ] Staging smoke tests all green
- [ ] Checkout tested end-to-end on staging
- [ ] Dispatch production deploy manually
- [ ] Confirm `https://pes.supply` health checks pass
- [ ] Submit sitemap to Search Console: `https://pes.supply/sitemap.xml`
- [ ] Verify GA4 events firing in Realtime view
- [ ] Verify Google Merchant Feed: `https://pes.supply/api/google-merchant-feed`

---

## Quick Reference — All URLs

| URL | Environment | What |
|-----|-------------|------|
| `https://pes.supply` | Production | Storefront |
| `https://staging.pes.supply` | Staging | Storefront |
| `https://api.pes.supply` | Production | Medusa backend |
| `https://api-staging.pes.supply` | Staging | Medusa backend |
| `https://pes.supply/api/health` | Production | Combined health check |
| `https://staging.pes.supply/api/health` | Staging | Combined health check |
| `https://pes.supply/sitemap.xml` | Production | Dynamic sitemap |
| `https://pes.supply/api/google-merchant-feed` | Production | Google Merchant XML |
| `https://pes.supply/api/revalidate` | Production | ISR cache bust |
