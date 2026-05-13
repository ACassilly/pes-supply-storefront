# Cloudflare DNS Setup for pes.supply

## Zone requirements

| Record | Type | Name | Value | Proxy |
|--------|------|------|-------|-------|
| Root | A | `pes.supply` | `<AZURE_VM_IP>` | ✅ Proxied |
| WWW redirect | CNAME | `www` | `pes.supply` | ✅ Proxied |
| API | A | `api` | `<AZURE_VM_IP>` | ✅ Proxied |
| ID portal | A | `id` | `<ODOO_VM_IP>` | ✅ Proxied |
| Mail | MX | `@` | `<mail provider>` | ❌ DNS only |
| SPF | TXT | `@` | `v=spf1 include:...` | ❌ DNS only |
| Google verify | TXT | `@` | `google-site-verification=...` | ❌ DNS only |

## SSL/TLS Settings

- Mode: **Full (strict)** — requires a valid cert on origin (Let's Encrypt via certbot or Vercel)
- Always Use HTTPS: **On**
- Minimum TLS Version: **1.2**
- Automatic HTTPS Rewrites: **On**
- HSTS: **On** (max-age 1 year, include subdomains)

## Page Rules / Cache Rules

1. `pes.supply/api/*` — Cache Level: **Bypass**
2. `pes.supply/_next/static/*` — Cache Level: **Cache Everything**, Edge TTL: **1 month**
3. `pes.supply/images/*` — Cache Level: **Cache Everything**, Edge TTL: **1 day**

## Firewall Rules

1. Block requests to `/admin*` not from known IPs (Medusa admin lockdown)
2. Rate limit: 100 req/min per IP on `/api/store/*`
3. Bot Fight Mode: **On**

## Required GitHub Secrets

| Secret | Value |
|--------|-------|
| `CF_ZONE_ID` | Cloudflare → pes.supply → Overview → Zone ID |
| `CF_API_TOKEN` | Cloudflare → My Profile → API Tokens → Create Token → Edit Zone DNS + Cache Purge |

## Vercel + Cloudflare co-existence

If using Vercel as primary host (with Cloudflare as CDN proxy):
1. In Vercel: Add custom domain `pes.supply`
2. In Cloudflare: Set the A/CNAME to Vercel's IP/hostname with **Proxy ON**
3. Set SSL/TLS to **Full** (not Full strict) since Vercel handles TLS
4. Disable Cloudflare Rocket Loader (breaks Next.js hydration)
5. Disable Cloudflare Mirage (breaks Next.js image optimization)
