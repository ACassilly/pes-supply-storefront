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
set_secret VERCEL_ORG_ID        "Vercel Org ID (team_XQxmrDxKnJR8qGObDLGjZrY9)"
set_secret VERCEL_PROJECT_ID    "Vercel Project ID (after vercel link in repo)"

echo ""
echo "=== Production Azure VM ==="
set_secret AZURE_VM_HOST            "Production Azure VM IP or hostname"
set_secret AZURE_VM_USER            "Production Azure VM SSH user (default pesadmin)"
set_secret AZURE_VM_SSH_PRIVATE_KEY "Production SSH private key (full PEM)"

echo ""
echo "=== Staging Azure VM ==="
set_secret STAGING_AZURE_VM_HOST            "Staging Azure VM IP or hostname"
set_secret STAGING_AZURE_VM_USER            "Staging Azure VM SSH user (default pesadmin)"
set_secret STAGING_AZURE_VM_SSH_PRIVATE_KEY "Staging SSH private key (full PEM)"

echo ""
echo "=== Production Medusa ==="
set_secret NEXT_PUBLIC_MEDUSA_BACKEND_URL     "Production Medusa URL (https://api.pes.supply)"
set_secret NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY "Production Medusa publishable key"
set_secret NEXT_PUBLIC_MEDUSA_REGION          "Production Medusa region (us)"
set_secret MEDUSA_ADMIN_API_KEY               "Production Medusa admin API key"
set_secret MEDUSA_WEBHOOK_SECRET              "Production Medusa webhook secret"

echo ""
echo "=== Staging Medusa ==="
set_secret STAGING_NEXT_PUBLIC_MEDUSA_BACKEND_URL     "Staging Medusa URL (https://api-staging.pes.supply)"
set_secret STAGING_NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY "Staging Medusa publishable key"
set_secret STAGING_NEXT_PUBLIC_MEDUSA_REGION          "Staging Medusa region (us)"

echo ""
echo "=== Production Stripe ==="
set_secret NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY "Production Stripe pk_live_..."
set_secret STRIPE_SECRET_KEY                  "Production Stripe sk_live_..."
set_secret STRIPE_WEBHOOK_SECRET              "Production Stripe whsec_..."

echo ""
echo "=== Staging Stripe (test mode) ==="
set_secret STAGING_NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY "Staging Stripe pk_test_..."

echo ""
echo "=== Production Odoo ==="
set_secret ODOO_URL      "Odoo URL"
set_secret ODOO_DATABASE "Odoo database"
set_secret ODOO_USERNAME "Odoo username"
set_secret ODOO_API_KEY  "Odoo API key"

echo ""
echo "=== Cloudflare ==="
set_secret CF_ZONE_ID   "Cloudflare Zone ID for pes.supply"
set_secret CF_API_TOKEN "Cloudflare API token (Zone:Cache Purge + DNS:Edit)"

echo ""
echo "=== Production Google ==="
set_secret GOOGLE_SITE_VERIFICATION      "Production Google Search Console token"
set_secret NEXT_PUBLIC_GA_MEASUREMENT_ID "Production GA4 ID (G-XXXXXXXXXX)"

echo ""
echo "=== Staging Google ==="
set_secret STAGING_GOOGLE_SITE_VERIFICATION      "Staging Search Console token"
set_secret STAGING_NEXT_PUBLIC_GA_MEASUREMENT_ID "Staging GA4 ID"

echo ""
echo "=== Misc ==="
set_secret NEXT_PUBLIC_SITE_URL "Production site URL (https://pes.supply)"
set_secret REVALIDATE_SECRET    "ISR revalidation secret (random 32-char string)"

echo ""
echo "🎉 Done! Run: gh secret list -R $REPO"
