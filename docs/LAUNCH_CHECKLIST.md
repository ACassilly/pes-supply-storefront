# PES Supply — Launch Checklist

Work through each section in order. Every item has a direct link or exact command.

---

## Phase 0 — Shopify Export (do first, before anything goes live)

- [ ] Export Products CSV: Shopify Admin → Products → Export → All products → CSV for Excel
- [ ] Export Customers CSV: Customers → Export → All customers
- [ ] Export Orders CSV: Orders → Export → All orders
- [ ] Download theme assets: Online Store → Themes → Actions → Download theme file
- [ ] Screenshot all active redirects: Online Store → Navigation → URL Redirects
- [ ] Note Shopify domain DNS TTL before cutover

---

## Phase 1 — GitHub Secrets

Run the automated setup script (requires `gh` CLI):
```bash
bash scripts/setup-github-secrets.sh
```

Verify all set:
```bash
gh secret list -R ACassilly/pes-supply-storefront
```

Required secrets (21 total):
```
VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID
AZURE_VM_HOST, AZURE_VM_SSH_PRIVATE_KEY
NEXT_PUBLIC_MEDUSA_BACKEND_URL, NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
MEDUSA_ADMIN_API_KEY, MEDUSA_WEBHOOK_SECRET
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET
ODOO_URL, ODOO_DATABASE, ODOO_USERNAME, ODOO_API_KEY
CF_ZONE_ID, CF_API_TOKEN
GOOGLE_SITE_VERIFICATION, NEXT_PUBLIC_GA_MEASUREMENT_ID
NEXT_PUBLIC_SITE_URL, REVALIDATE_SECRET
```

---

## Phase 2 — Azure VM Provisioning

```bash
# 1. SSH into VM
ssh pesadmin@<AZURE_VM_HOST>

# 2. Install Node 22, pnpm, pm2, nginx, Redis, Postgres
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs postgresql redis-server nginx
npm i -g pnpm pm2

# 3. Postgres setup
sudo -u postgres psql -c "CREATE USER medusa_user WITH PASSWORD 'CHANGE_ME';"
sudo -u postgres psql -c "CREATE DATABASE medusa_pes_supply OWNER medusa_user;"
sudo -u postgres psql -c "CREATE DATABASE odoo_pes_supply OWNER odoo_user;"

# 4. Clone and deploy storefront
git clone https://github.com/ACassilly/pes-supply-storefront /var/www/pes-supply
cd /var/www/pes-supply && pnpm install && pnpm build

# 5. Scaffold Medusa
cd /home/pesadmin
npx create-medusa-app@latest medusa-pes-supply --no-browser
cd medusa-pes-supply
cp /var/www/pes-supply/medusa-backend/medusa-config.ts .
cp /var/www/pes-supply/medusa-backend/.env.template .env
# Fill in .env values
npx medusa migrations run
npx medusa seed  # optional
npx medusa user --email admin@pes.supply --password CHANGE_ME

# 6. Get publishable key
# Login to https://api.pes.supply/app -> Settings -> API Keys -> Create publishable key
# Copy value -> add to GitHub Secrets as NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY

# 7. Nginx
sudo cp /var/www/pes-supply/scripts/nginx-pes-supply.conf /etc/nginx/sites-available/pes-supply
sudo ln -s /etc/nginx/sites-available/pes-supply /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# 8. PM2
pm2 start /var/www/pes-supply/scripts/pm2-ecosystem.config.js
pm2 save && pm2 startup
```

---

## Phase 3 — Vercel Project Linkage

```bash
# In Codespace or locally:
bash scripts/setup-vercel-link.sh

# Then update GitHub Secrets with real IDs:
gh secret set VERCEL_ORG_ID -R ACassilly/pes-supply-storefront
gh secret set VERCEL_PROJECT_ID -R ACassilly/pes-supply-storefront
```

---

## Phase 4 — Cloudflare DNS

In Cloudflare dashboard for **pes.supply**:

| Type | Name | Value | Proxy |
|------|------|-------|-------|
| CNAME | `@` (pes.supply) | `cname.vercel-dns.com` | ✅ Proxied |
| CNAME | `www` | `cname.vercel-dns.com` | ✅ Proxied |
| A | `api` | `<AZURE_VM_HOST>` | ✅ Proxied |
| TXT | `@` | Google site verification | ❌ DNS only |

SSL/TLS: Set to **Full (strict)** in Cloudflare SSL settings.

---

## Phase 5 — Stripe Setup

1. [Stripe Dashboard](https://dashboard.stripe.com) → Developers → API keys → copy live keys
2. Webhooks → Add endpoint: `https://api.pes.supply/webhooks/stripe`
   - Events: `payment_intent.succeeded`, `payment_intent.payment_failed`, `charge.refunded`
3. Copy `whsec_...` → GitHub Secret `STRIPE_WEBHOOK_SECRET`
4. Medusa admin → Settings → Payment Providers → Enable Stripe → Add region (US)

---

## Phase 6 — Google Products

| Product | Action |
|---------|--------|
| Search Console | Add property `https://pes.supply` → verify via meta tag (auto-wired from `GOOGLE_SITE_VERIFICATION`) |
| Analytics 4 | Create property → copy `G-XXXXXXXX` → `NEXT_PUBLIC_GA_MEASUREMENT_ID` |
| Merchant Center | Add store `https://pes.supply` → Products → Feeds → Add feed URL: `https://pes.supply/api/google-merchant-feed` → Scheduled fetch daily |
| Tag Manager | Optional — GA4 tag already fires natively via `app/layout.tsx` |

---

## Phase 7 — Odoo Sync

1. Ensure Odoo is running and accessible at `ODOO_URL`
2. Set `SYNC_TO_ODOO=true` and `USE_ODOO_INVENTORY=true` in all env files
3. First manual sync:
   ```bash
   cd /var/www/pes-supply
   npx tsx scripts/odoo-medusa-sync.ts
   ```
4. Confirm PM2 sync cron is running: `pm2 logs pes-supply-sync`

---

## Phase 8 — Shopify DNS Cutover

1. Confirm `https://pes.supply` is returning 200 on Vercel/Azure
2. In Shopify: Online Store → Domains → Remove `pes.supply` as primary
3. In Cloudflare: Update A/CNAME to point to Vercel (already done in Phase 4)
4. Wait for TTL propagation (usually < 5 min with Cloudflare)
5. Verify redirects: `curl -I https://pes.supply/products/OLD_HANDLE` → should 301 to new URL
6. Submit sitemap to Google Search Console: `https://pes.supply/sitemap.xml`

---

## Phase 9 — Final Smoke Tests

- [ ] `https://pes.supply` loads, no 500s
- [ ] `https://api.pes.supply/health` returns `{"status":"ok"}`
- [ ] `https://pes.supply/api/health` returns Medusa + Odoo status
- [ ] Product page loads with correct price
- [ ] Add to cart works
- [ ] Checkout: address → shipping options appear → Stripe card field renders
- [ ] Test order with Stripe test card `4242 4242 4242 4242`
- [ ] Order appears in Medusa admin
- [ ] Order pushed to Odoo sale.order
- [ ] ISR revalidation fires after product update
- [ ] GA4 events firing (check Realtime report)
- [ ] Google Merchant Feed: `https://pes.supply/api/google-merchant-feed` returns XML
- [ ] Sitemap: `https://pes.supply/sitemap.xml` includes products
- [ ] Cloudflare cache purge GitHub Action triggers on deploy

---

## Quick Reference — Key URLs

| URL | What |
|-----|------|
| `https://pes.supply` | Storefront |
| `https://api.pes.supply/app` | Medusa admin (localhost only) |
| `https://api.pes.supply/health` | Medusa health |
| `https://pes.supply/api/health` | Combined health check |
| `https://pes.supply/api/google-merchant-feed` | Google Merchant XML feed |
| `https://pes.supply/sitemap.xml` | Dynamic sitemap |
| `https://pes.supply/api/revalidate` | ISR cache bust (POST) |
| `https://pes.supply/api/webhooks/medusa` | Medusa webhook receiver |
