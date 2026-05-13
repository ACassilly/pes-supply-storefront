#!/usr/bin/env bash
# =============================================================================
# PES Supply — Seed GitHub Actions secrets from Codespace
# Run once inside Codespace: bash .devcontainer/seed-secrets.sh
# Requires: gh CLI (pre-installed in GitHub Codespaces)
# =============================================================================
set -euo pipefail

REPO="ACassilly/pes-supply-storefront"

echo "🔐 Seeding GitHub Actions secrets for $REPO"

# Vercel — IDs are not sensitive, token is read from CODESPACE_SECRET
gh secret set VERCEL_ORG_ID  --repo "$REPO" --body "team_XQxmrDxKnJR8qGObDLGjZrY9"
gh secret set VERCEL_PROJECT_ID --repo "$REPO" --body "prj_RFHh7bl9ekSNk8LAA96sXPCJ5gjB"

# VERCEL_TOKEN — set from env var (add to Codespace secrets in repo settings)
# Settings → Secrets and variables → Codespaces → New secret → VERCEL_TOKEN
if [[ -n "${VERCEL_TOKEN:-}" ]]; then
  gh secret set VERCEL_TOKEN --repo "$REPO" --body "$VERCEL_TOKEN"
  echo "✅ VERCEL_TOKEN set from environment"
else
  echo "⚠️  VERCEL_TOKEN not found in environment — set it as a Codespace secret"
fi

echo ""
echo "📋 Remaining secrets (paste values when prompted):"

prompt_secret() {
  local name=$1
  read -rsp "$name: " V
  echo
  gh secret set "$name" --repo "$REPO" --body "$V"
  echo "✅ $name set"
}

prompt_secret AZURE_STAGING_APP_NAME
prompt_secret AZURE_STAGING_PUBLISH_PROFILE
prompt_secret AZURE_PRODUCTION_APP_NAME
prompt_secret AZURE_PRODUCTION_PUBLISH_PROFILE
prompt_secret NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
prompt_secret STAGING_MEDUSA_PUBLISHABLE_KEY
prompt_secret NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
prompt_secret STAGING_STRIPE_PUBLISHABLE_KEY
prompt_secret NEXT_PUBLIC_GA_MEASUREMENT_ID
prompt_secret STAGING_GA_MEASUREMENT_ID
prompt_secret NEXT_PUBLIC_GTM_ID
prompt_secret GOOGLE_SITE_VERIFICATION
prompt_secret CLOUDFLARE_ZONE_ID
prompt_secret CLOUDFLARE_API_TOKEN
prompt_secret REVALIDATE_SECRET

echo ""
echo "🚀 All secrets seeded. Triggering deploy..."
gh workflow run deploy-pes-supply.yml --repo "$REPO"
echo "✅ Deploy triggered — watch at: https://github.com/$REPO/actions"
