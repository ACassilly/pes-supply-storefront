#!/bin/bash
# ============================================================
# PES-Stage Azure App Service — Node.js 22 Setup
# Run this ONCE to reconfigure PES-Stage from WordPress Docker
# to Node.js 22 runtime for Next.js deployment
# ============================================================
# Prerequisites: az cli logged in, correct subscription selected

RESOURCE_GROUP="migration"
APP_NAME="PES-Stage"
SUBSCRIPTION=$(az account show --query id -o tsv)

echo "==> Setting Node.js 22 LTS runtime on $APP_NAME"
az webapp config set \
  --resource-group $RESOURCE_GROUP \
  --name $APP_NAME \
  --linux-fx-version "NODE|22-lts" \
  --startup-file "startup.sh"

echo "==> Enabling HTTPS only"
az webapp update \
  --resource-group $RESOURCE_GROUP \
  --name $APP_NAME \
  --https-only true

echo "==> Setting app settings"
az webapp config appsettings set \
  --resource-group $RESOURCE_GROUP \
  --name $APP_NAME \
  --settings \
    COMMERCE_PROVIDER=medusa \
    NEXT_PUBLIC_SITE_URL=https://pes.supply \
    NODE_ENV=production \
    WEBSITE_NODE_DEFAULT_VERSION=22-lts \
    SCM_DO_BUILD_DURING_DEPLOYMENT=false

echo "==> Restarting app"
az webapp restart \
  --resource-group $RESOURCE_GROUP \
  --name $APP_NAME

echo ""
echo "✅ Done. Now go to Azure Portal → PES-Stage → Get publish profile"
echo "   and save it as GitHub secret AZURE_STAGING_PUBLISH_PROFILE"
echo ""
echo "   OR run:"
echo "   az webapp deployment list-publishing-profiles --name $APP_NAME --resource-group $RESOURCE_GROUP --xml"
