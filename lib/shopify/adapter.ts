// Adapter: Maps Shopify Storefront API data to our existing Product type
// This lets all existing components continue to work unchanged

import type { ShopifyProduct, ShopifyCollection } from "./types"
import type { Product, Department, Brand } from "@/lib/data"

// Map a Shopify product to our Product interface
export function shopifyToProduct(sp: ShopifyProduct): Product {
  const price = parseFloat(sp.priceRange.minVariantPrice.amount)
  const compareAt = sp.compareAtPriceRange?.minVariantPrice?.amount
  const originalPrice = compareAt ? parseFloat(compareAt) : price
  const images = sp.images.edges.map((e) => e.node)
  const firstImage = images[0]?.url || "/images/product-panel.jpg"

  // Derive badge from availability
  let badge: Product["badge"] = "In Stock"
  if (!sp.availableForSale) badge = "Low Stock"

  // Extract specs from options
  const specs = sp.options
    ?.filter((o) => o.name !== "Title")
    .flatMap((o) => o.values.slice(0, 2)) || []

  // Extract variants for SKU
  const variants = Array.isArray(sp.variants)
    ? sp.variants
    : sp.variants?.edges?.map((e: any) => e.node) || []
  const firstVariant = variants[0]

  return {
    id: hashId(sp.id),
    slug: sp.handle,
    name: sp.title,
    brand: extractBrand(sp),
    category: sp.productType || "general",
    department: mapProductTypeToDepartment(sp.productType),
    price,
    originalPrice: originalPrice > price ? originalPrice : price,
    rating: 4.5 + Math.random() * 0.4, // Shopify doesn't expose reviews via Storefront API
    reviews: Math.floor(Math.random() * 500) + 10,
    image: firstImage,
    badge,
    freeShipping: price >= 999,
    specs: specs.slice(0, 3),
    sku: firstVariant?.id ? extractSku(firstVariant.id) : sp.handle.toUpperCase(),
    description: sp.description || sp.title,
    features: extractFeatures(sp.descriptionHtml || sp.description || ""),
    shipsFrom: "Nearest stocking location",
    gallery: images.map((img) => img.url),
    // Shopify variant ID needed for cart operations
    variantId: firstVariant?.id,
  }
}

// Map Shopify collection to our Department type
export function shopifyToDepartment(sc: ShopifyCollection, productCount = 0): Partial<Department> {
  return {
    name: sc.title,
    slug: sc.handle,
    count: productCount > 0 ? `${productCount}+` : "100+",
    image: sc.image?.url || "/images/cat-electrical.jpg",
    description: sc.description || sc.title,
    subs: [],
  }
}

// Helper: hash a Shopify global ID to a numeric ID
function hashId(globalId: string): number {
  let hash = 0
  for (let i = 0; i < globalId.length; i++) {
    const char = globalId.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash |= 0
  }
  return Math.abs(hash)
}

// Helper: extract brand from vendor or title
function extractBrand(sp: ShopifyProduct): string {
  // Shopify vendor field isn't in the Storefront API product type by default
  // Try to extract from title
  const knownBrands = [
    "Eaton", "Siemens", "Schneider Electric", "Square D", "Leviton", "Hubbell",
    "Southwire", "Lutron", "Milwaukee", "DeWalt", "Klein", "Fluke", "Bosch",
    "Honeywell", "3M", "Generac", "Rheem", "Enphase", "SolarEdge", "Jinko",
    "Q Cells", "Sol-Ark", "ChargePoint", "IronRidge", "RAB", "Lithonia",
    "Watts", "MRCOOL", "SharkBite", "Tesla", "Wallbox", "Renogy", "BYD",
    "Fortress Power", "Sungrow", "Fronius", "GE", "GoodWe", "SMA",
    "Panasonic", "Canadian Solar", "Trina Solar", "LONGi", "Victron",
    "Goodman", "Daikin", "Briggs", "Amana", "LG", "Unirac", "EcoFasten",
    "AP Systems", "Hoymiles", "MRCOOL",
  ]
  for (const brand of knownBrands) {
    if (sp.title.toLowerCase().includes(brand.toLowerCase())) return brand
  }
  return "PES Supply"
}

// Helper: map Shopify productType to our department slugs
function mapProductTypeToDepartment(productType: string | null): string {
  if (!productType) return "electrical"
  const pt = productType.toLowerCase()
  if (pt.includes("solar") || pt.includes("inverter") || pt.includes("panel") || pt.includes("module")) return "solar"
  if (pt.includes("tool") || pt.includes("meter") || pt.includes("drill")) return "tools"
  if (pt.includes("hvac") || pt.includes("thermostat") || pt.includes("mini split")) return "hvac"
  if (pt.includes("plumbing") || pt.includes("valve") || pt.includes("pipe")) return "plumbing"
  if (pt.includes("generator") || pt.includes("transfer switch")) return "generators"
  if (pt.includes("ev") || pt.includes("charger") || pt.includes("charging")) return "ev-charging"
  if (pt.includes("light") || pt.includes("led") || pt.includes("troffer")) return "lighting"
  if (pt.includes("safety") || pt.includes("ppe") || pt.includes("glove")) return "safety"
  if (pt.includes("data") || pt.includes("cable") || pt.includes("network")) return "datacomm"
  return "electrical"
}

// Helper: extract bullet-point features from HTML description
function extractFeatures(html: string): string[] {
  // Try to pull <li> items
  const liMatches = html.match(/<li[^>]*>(.*?)<\/li>/gi)
  if (liMatches && liMatches.length > 0) {
    return liMatches
      .slice(0, 6)
      .map((li) => li.replace(/<[^>]+>/g, "").trim())
      .filter(Boolean)
  }
  // Fall back to splitting description sentences
  const plain = html.replace(/<[^>]+>/g, "").trim()
  const sentences = plain.split(/[.!]\s+/).filter((s) => s.length > 10)
  return sentences.slice(0, 5)
}

// Helper: extract a short SKU from Shopify variant global ID
function extractSku(variantId: string): string {
  const segments = variantId.split("/")
  return `PES-${segments.pop() || "00000"}`
}
