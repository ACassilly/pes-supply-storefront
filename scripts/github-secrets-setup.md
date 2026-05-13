# GitHub Secrets Setup for pes.supply

Go to: https://github.com/ACassilly/pes-supply-storefront/settings/secrets/actions

## Required Secrets (deploy will fail without these)

| Secret Name | Value | Where to get it |
|-------------|-------|----------------|
| `AZURE_VM_HOST` | IP or hostname of Azure VM | Azure Portal → VM → Overview → Public IP |
| `AZURE_VM_USER` | `pesadmin` | Default set in workflow |
| `AZURE_VM_SSH_PRIVATE_KEY` | Private key matching VM's authorized_keys | Generate with `ssh-keygen -t ed25519` |
| `NEXT_PUBLIC_MEDUSA_BACKEND_URL` | `https://api.pes.supply` | Your Medusa backend URL |
| `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` | `pk_...` | Medusa Admin → Settings → API Keys |
| `COMMERCE_PROVIDER` | `medusa` | Always medusa for production |

## Vercel Secrets (for Vercel deploy workflows)

| Secret Name | Value | Where to get it |
|-------------|-------|----------------|
| `VERCEL_TOKEN` | Vercel API token | vercel.com/account/tokens |
| `VERCEL_ORG_ID` | Team/org ID | vercel.com/pesglobal/settings |
| `VERCEL_PROJECT_ID` | Project ID | vercel.com/pesglobal/pes-supply/settings |

## Cloudflare Secrets

| Secret Name | Value | Where to get it |
|-------------|-------|----------------|
| `CF_ZONE_ID` | pes.supply zone ID | Cloudflare → pes.supply → Overview → Zone ID |
| `CF_API_TOKEN` | API token with Zone:Cache Purge | Cloudflare → My Profile → API Tokens |

## Google Secrets

| Secret Name | Value | Where to get it |
|-------------|-------|----------------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-XXXXXXXXXX` | GA4 Admin → Data Streams |
| `GOOGLE_SITE_VERIFICATION` | Verification token | Google Search Console |

## Odoo Secrets

| Secret Name | Value | Where to get it |
|-------------|-------|----------------|
| `ODOO_API_KEY` | Odoo user API key | Odoo → Settings → Technical → API Keys |

## Stripe Secrets

| Secret Name | Value | Where to get it |
|-------------|-------|----------------|
| `STRIPE_SECRET_KEY` | `sk_live_...` | Stripe Dashboard → API Keys |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | Stripe Dashboard → Webhooks |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_live_...` | Stripe Dashboard → API Keys |

---

## Quick setup (copy-paste into terminal)

```bash
# Install GitHub CLI first: brew install gh

gh secret set AZURE_VM_HOST --repo ACassilly/pes-supply-storefront
gh secret set AZURE_VM_SSH_PRIVATE_KEY --repo ACassilly/pes-supply-storefront < ~/.ssh/pes_supply_deploy
gh secret set NEXT_PUBLIC_MEDUSA_BACKEND_URL --repo ACassilly/pes-supply-storefront
gh secret set NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY --repo ACassilly/pes-supply-storefront
gh secret set VERCEL_TOKEN --repo ACassilly/pes-supply-storefront
gh secret set VERCEL_ORG_ID --repo ACassilly/pes-supply-storefront
gh secret set VERCEL_PROJECT_ID --repo ACassilly/pes-supply-storefront
gh secret set CF_ZONE_ID --repo ACassilly/pes-supply-storefront
gh secret set CF_API_TOKEN --repo ACassilly/pes-supply-storefront
gh secret set NEXT_PUBLIC_GA_MEASUREMENT_ID --repo ACassilly/pes-supply-storefront
gh secret set STRIPE_SECRET_KEY --repo ACassilly/pes-supply-storefront
gh secret set STRIPE_WEBHOOK_SECRET --repo ACassilly/pes-supply-storefront
```
