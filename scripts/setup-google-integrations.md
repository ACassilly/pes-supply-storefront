# Google Integrations Setup for pes.supply

This runbook covers Google Search Console, Google Analytics 4, and Google Tag Manager wiring for pes.supply.

---

## 1. Google Search Console

### Verify ownership
1. Go to [Google Search Console](https://search.google.com/search-console/welcome)
2. Add property → URL prefix → `https://pes.supply`
3. Choose **HTML tag** verification method
4. Copy the `content` value from the meta tag, e.g.:
   ```
   <meta name="google-site-verification" content="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" />
   ```
5. Add to GitHub Secrets → `GOOGLE_SITE_VERIFICATION=XXXX...`
6. The `app/layout.tsx` already reads this and injects it into `<head>` via Next.js metadata API.
7. Click **Verify** in Search Console.

### Submit sitemap
1. After deploy: Search Console → Sitemaps → Add sitemap
2. Enter: `https://pes.supply/sitemap.xml`
3. Ensure `app/sitemap.ts` (or `sitemap.xml`) exists in the Next.js app — create if not.

---

## 2. Google Analytics 4 (GA4)

### Create property
1. Go to [analytics.google.com](https://analytics.google.com)
2. Admin → Create Property → `pes.supply`
3. Copy the **Measurement ID**: `G-XXXXXXXXXX`
4. Add to GitHub Secrets → `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX`
5. Add to Vercel project env vars (production + preview)
6. The `app/layout.tsx` GA4 `<Script>` block is already wired to `process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID`

---

## 3. Google Tag Manager (Optional)

1. [tagmanager.google.com](https://tagmanager.google.com) → Create account → Container for `pes.supply` (Web)
2. Copy Container ID: `GTM-XXXXXXX`
3. Add to GitHub Secrets → `NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX`
4. GTM can manage GA4, conversion tracking, and remarketing without further code changes.

---

## 4. Google Merchant Center (for product feeds)

1. [merchants.google.com](https://merchants.google.com) → Create account
2. Verify domain via Search Console (already done above)
3. Create a **product feed** pointing to `https://pes.supply/api/google-merchant-feed`
4. Wire the feed route in `app/api/google-merchant-feed/route.ts` — reads from Medusa product catalog.

---

## 5. Required GitHub Secrets

| Secret | Where to get it |
|--------|----------------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 Admin → Data Streams → Measurement ID |
| `GOOGLE_SITE_VERIFICATION` | Search Console verification meta tag content |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container ID (optional) |

---

## 6. Required Vercel Environment Variables

In [vercel.com/pesglobal/pes-supply/settings/environment-variables](https://vercel.com/pesglobal/pes-supply/settings/environment-variables):

```
NEXT_PUBLIC_GA_MEASUREMENT_ID = G-XXXXXXXXXX
GOOGLE_SITE_VERIFICATION       = XXXX...
NEXT_PUBLIC_MEDUSA_BACKEND_URL = https://api.pes.supply
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY = pk_...
COMMERCE_PROVIDER              = medusa
NEXT_PUBLIC_SITE_URL           = https://pes.supply
```
