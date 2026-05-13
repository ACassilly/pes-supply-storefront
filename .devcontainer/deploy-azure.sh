#!/usr/bin/env bash
# ============================================================================
# deploy-azure.sh — Deploy pes.supply from Codespace to Azure App Service
#
# Usage:
#   deploy-azure staging     → builds + deploys to staging.pes.supply
#   deploy-azure production  → builds + deploys to pes.supply (requires confirm)
#
# Prerequisites (handled by Codespace setup.sh):
#   - Azure CLI installed + `az login` completed
#   - .env.local populated with real values
#   - AZURE_RESOURCE_GROUP, AZURE_STAGING_APP, AZURE_PRODUCTION_APP set
#     (add to ~/.bashrc or Codespace secrets)
# ============================================================================
set -euo pipefail

ENV=${1:-staging}
RG=${AZURE_RESOURCE_GROUP:-pes-supply-rg}
STAGING_APP=${AZURE_STAGING_APP:-pes-supply-staging}
PROD_APP=${AZURE_PRODUCTION_APP:-pes-supply-production}
VERCEL_TOKEN=${VERCEL_TOKEN:-""}
VERCEL_ORG=${VERCEL_ORG_ID:-""}
VERCEL_PROJECT=${VERCEL_PROJECT_ID:-""}

# ── colours
GREEN="\033[0;32m"; YELLOW="\033[1;33m"; RED="\033[0;31m"; NC="\033[0m"
info()  { echo -e "${GREEN}[deploy]${NC} $*"; }
warn()  { echo -e "${YELLOW}[warn]${NC}   $*"; }
error() { echo -e "${RED}[error]${NC}  $*"; exit 1; }

# ── validate env
[[ "$ENV" == "staging" || "$ENV" == "production" ]] || error "Usage: deploy-azure [staging|production]"

if [[ "$ENV" == "production" ]]; then
  warn "\u26a0\ufe0f  You are deploying to PRODUCTION (pes.supply). Are you sure? [y/N]"
  read -r confirm
  [[ "$confirm" =~ ^[Yy]$ ]] || { info "Aborted."; exit 0; }
fi

# ── check az login
if ! az account show &>/dev/null; then
  info "Not logged in to Azure. Launching az login..."
  az login --use-device-code
fi

APP_NAME=$([[ "$ENV" == "production" ]] && echo "$PROD_APP" || echo "$STAGING_APP")
SITE_URL=$([[ "$ENV" == "production" ]] && echo "https://pes.supply" || echo "https://staging.pes.supply")

info "Target: $APP_NAME ($SITE_URL)"

# ── load correct env vars
ENV_FILE=".env.local"
[[ -f ".env.$ENV" ]] && ENV_FILE=".env.$ENV"
info "Loading env from $ENV_FILE"
set -a; source "$ENV_FILE"; set +a

# Override site URL for the target environment
export NEXT_PUBLIC_SITE_URL="$SITE_URL"
export NEXT_PUBLIC_MEDUSA_BACKEND_URL=$([[ "$ENV" == "production" ]] && echo "https://api.pes.supply" || echo "https://api-staging.pes.supply")
export COMMERCE_PROVIDER=medusa

# ── build
info "Building Next.js for $ENV..."
pnpm install --no-frozen-lockfile
pnpm build

# ── package for Azure Web App (zip deploy)
info "Packaging artifact..."
ZIP_FILE="/tmp/pes-supply-$ENV-$(date +%Y%m%d%H%M%S).zip"
zip -r "$ZIP_FILE" \
  .next \
  public \
  package.json \
  pnpm-lock.yaml \
  next.config.mjs \
  node_modules \
  --exclude '*.map' \
  --exclude '.next/cache/*' \
  > /dev/null
info "Artifact: $ZIP_FILE ($(du -sh $ZIP_FILE | cut -f1))"

# ── deploy to Azure App Service
info "Deploying to Azure App Service: $APP_NAME..."
if az webapp deploy \
  --resource-group "$RG" \
  --name "$APP_NAME" \
  --src-path "$ZIP_FILE" \
  --type zip \
  --async false; then

  # ── set app settings on Azure
  info "Syncing environment variables to Azure App Service..."
  az webapp config appsettings set \
    --resource-group "$RG" \
    --name "$APP_NAME" \
    --settings \
      NODE_ENV=production \
      NEXT_PUBLIC_SITE_URL="$NEXT_PUBLIC_SITE_URL" \
      NEXT_PUBLIC_MEDUSA_BACKEND_URL="$NEXT_PUBLIC_MEDUSA_BACKEND_URL" \
      NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY="${NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY:-}" \
      COMMERCE_PROVIDER=medusa \
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:-}" \
      NEXT_PUBLIC_GA_MEASUREMENT_ID="${NEXT_PUBLIC_GA_MEASUREMENT_ID:-}" \
      REVALIDATE_SECRET="${REVALIDATE_SECRET:-}" \
    > /dev/null

  # ── restart
  info "Restarting App Service..."
  az webapp restart --resource-group "$RG" --name "$APP_NAME"

  # ── health check
  info "Waiting for health check at $SITE_URL/api/health..."
  sleep 20
  ATTEMPTS=0
  until curl -sf "$SITE_URL/api/health" > /dev/null || [[ $ATTEMPTS -ge 10 ]]; do
    ATTEMPTS=$((ATTEMPTS+1))
    warn "Health check attempt $ATTEMPTS/10 failed, retrying in 10s..."
    sleep 10
  done

  if curl -sf "$SITE_URL/api/health" > /dev/null; then
    info "\u2705 Azure deployment succeeded! $SITE_URL is live."
    rm -f "$ZIP_FILE"
    exit 0
  else
    warn "Azure health check failed after 10 attempts."
    warn "Activating Vercel fallback..."
  fi

else
  warn "Azure webapp deploy command failed."
  warn "Activating Vercel fallback..."
fi

# ============================================================
# VERCEL FALLBACK — only reaches here if Azure failed
# ============================================================
if [[ -z "$VERCEL_TOKEN" || -z "$VERCEL_ORG" || -z "$VERCEL_PROJECT" ]]; then
  error "Azure deploy failed AND Vercel fallback secrets not set (VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID). Add them to Codespace secrets."
fi

info "\ud83d\udfe1 Deploying to Vercel as fallback..."

if [[ "$ENV" == "production" ]]; then
  VERCEL_ENV_FLAG="--prod"
  VERCEL_PULL_ENV="production"
else
  VERCEL_ENV_FLAG=""
  VERCEL_PULL_ENV="preview"
fi

pnpm dlx vercel pull --yes --environment="$VERCEL_PULL_ENV" --token="$VERCEL_TOKEN"
pnpm dlx vercel build $VERCEL_ENV_FLAG --token="$VERCEL_TOKEN"
pnpm dlx vercel deploy --prebuilt $VERCEL_ENV_FLAG --token="$VERCEL_TOKEN"

info "\ud83d\udfe1 Vercel fallback deployed for $ENV."
info "Note: $SITE_URL will serve from Vercel until Azure is restored."
rm -f "$ZIP_FILE"
