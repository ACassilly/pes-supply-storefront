# PES Supply — GitHub Actions Secrets Reference

Set all secrets at:
**GitHub → Settings → Secrets and variables → Actions**

---

## Vercel (Fallback) — IDs already resolved

| Secret | Value / Notes |
|---|---|
| `VERCEL_ORG_ID` | `team_XQxmrDxKnJR8qGObDLGjZrY9` (hardcoded in workflow) |
| `VERCEL_PROJECT_ID` | `prj_RFHh7bl9ekSNk8LAA96sXPCJ5gjB` (hardcoded in workflow) |
| `VERCEL_TOKEN` | Perplexity MCP token — already active, add same value as secret |

Project: [alex-demo-pes-supply-vercel](https://vercel.com/team_XQxmrDxKnJR8qGObDLGjZrY9/alex-demo-pes-supply-vercel)

---

## Azure (Primary)

| Secret | How to get it |
|---|---|
| `AZURE_STAGING_APP_NAME` | Azure Portal → App Services → your staging app name |
| `AZURE_STAGING_PUBLISH_PROFILE` | Azure Portal → App Service → "Get publish profile" → paste full XML |
| `AZURE_PRODUCTION_APP_NAME` | Azure Portal → App Services → your production app name |
| `AZURE_PRODUCTION_PUBLISH_PROFILE` | Same for production slot |

---

## Medusa

| Secret | Notes |
|---|---|
| `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` | Production `pk_...` from Medusa admin |
| `STAGING_MEDUSA_PUBLISHABLE_KEY` | Staging `pk_...` |

---

## Stripe

| Secret | Notes |
|---|---|
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Production `pk_live_...` |
| `STAGING_STRIPE_PUBLISHABLE_KEY` | Staging `pk_test_...` |

---

## Google

| Secret | Notes |
|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Production `G-XXXXXXXXXX` |
| `STAGING_GA_MEASUREMENT_ID` | Staging GA4 property ID |
| `NEXT_PUBLIC_GTM_ID` | `GTM-XXXXXXX` — suppresses direct GA4 tag if set |
| `GOOGLE_SITE_VERIFICATION` | From Google Search Console HTML tag |

---

## Cloudflare

| Secret | Notes |
|---|---|
| `CLOUDFLARE_ZONE_ID` | Cloudflare dashboard → pes.supply → Zone ID |
| `CLOUDFLARE_API_TOKEN` | Needs Cache Purge permission on pes.supply zone |

---

## ISR Cache

| Secret | Notes |
|---|---|
| `REVALIDATE_SECRET` | Strong random string — Medusa webhooks use this to bust ISR cache |
