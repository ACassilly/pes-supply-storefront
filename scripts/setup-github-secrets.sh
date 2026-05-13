#!/usr/bin/env bash
# ============================================================
# GitHub Secrets Setup for ACassilly/pes-supply-storefront
# Prerequisites: gh CLI authenticated (gh auth login)
# Usage: bash scripts/setup-github-secrets.sh
# ============================================================
set -euo pipefail

REPO="ACassilly/pes-supply-storefront"

echo "Setting GitHub Secrets for $REPO"
echo "You will be prompted for each value. Press Enter to skip."
echo ""

set_secret() {
  local name="$1"
  local prompt="$2"
  printf "%s: " "$prompt"
  read -rs value
  echo ""
  if [[ -n "$value" ]]; then
    echo -n "$value" | gh secret set "$name" -R "$REPO" --body "-"
    echo "  ✅ $name set"
  else
    echo "  ⏭  $name skipped"
  fi
}

echo "=== Vercel ==="
set_secret VERCEL_TOKEN         "Vercel API token (https://vercel.com/account/tokens)"
set_secret VERCEL_ORG_ID        "Vercel Org/Team ID (vercel teams ls or .vercel/project.json)"
set_secret VERCEL_PROJECT_ID    "Vercel Project ID (.vercel/project.json after vercel link)"

echo ""
echo "=== Azure VM ==="
set_secret AZURE_VM_HOST            "Azure VM public IP or hostname"
set_secret AZURE_VM_SSH_PRIVATE_KEY "SSH private key (paste full PEM including headers)"

echo ""
echo "=== Medusa ==="
set_secret NEXT_PUBLIC_MEDUSA_BACKEND_URL    "Medusa backend URL (https://api.pes.supply)"
set_secret NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY "Medusa publishable API key (from Medusa admin)"
set_secret MEDUSA_ADMIN_API_KEY              "Medusa admin API key"
set_secret MEDUSA_WEBHOOK_SECRET             "Medusa webhook secret (random 32-char string)"

echo ""
echo "=== Stripe ==="
set_secret NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY "Stripe publishable key (pk_live_...)"
set_secret STRIPE_SECRET_KEY                  "Stripe secret key (sk_live_...)"
set_secret STRIPE_WEBHOOK_SECRET              "Stripe webhook secret (whsec_...)"

echo ""
echo "=== Odoo ==="
set_secret ODOO_URL      "Odoo URL (https://odoo.pes.supply)"
set_secret ODOO_DATABASE "Odoo database name"
set_secret ODOO_USERNAME "Odoo username (admin)"
set_secret ODOO_API_KEY  "Odoo API key"

echo ""
echo "=== Cloudflare ==="
set_secret CF_ZONE_ID   "Cloudflare Zone ID (pes.supply zone, from Cloudflare dashboard)"
set_secret CF_API_TOKEN "Cloudflare API token (Zone:Cache Purge + DNS:Edit)"

echo ""
echo "=== Google ==="
set_secret GOOGLE_SITE_VERIFICATION  "Google Search Console verification token"
set_secret NEXT_PUBLIC_GA_MEASUREMENT_ID "Google Analytics 4 measurement ID (G-XXXXXXXXXX)"

echo ""
echo "=== Misc ==="
set_secret NEXT_PUBLIC_SITE_URL "Site URL (https://pes.supply)"
set_secret REVALIDATE_SECRET    "ISR revalidation secret (random 32-char string)"

echo ""
echo "🎉 Done! Run: gh secret list -R $REPO"
