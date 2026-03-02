"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, FileDown, ExternalLink, Package, AlertTriangle } from "lucide-react"
import type { Product, KitItem, ProductDocument } from "@/lib/data"

interface Props {
  product: Product
}

type TabId = "description" | "specs" | "kit-contents" | "documents" | "warranty" | "shipping"

export function ProductTabs({ product }: Props) {
  const isKit = product.type === "kit"

  const tabs: { id: TabId; label: string }[] = [
    { id: "description", label: "Description" },
    { id: "specs", label: "Specifications" },
    ...(isKit && product.includes?.length ? [{ id: "kit-contents" as TabId, label: `Kit Contents (${product.includes.length})` }] : []),
    ...(product.documents?.length ? [{ id: "documents" as TabId, label: `Documents (${product.documents.length})` }] : []),
    { id: "warranty", label: "Warranty" },
    { id: "shipping", label: "Shipping" },
  ]

  const [activeTab, setActiveTab] = useState<TabId>("description")

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-0 overflow-x-auto border-b border-border" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`shrink-0 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="py-6">
        {activeTab === "description" && <DescriptionTab product={product} />}
        {activeTab === "specs" && <SpecsTab product={product} />}
        {activeTab === "kit-contents" && <KitContentsTab items={product.includes || []} />}
        {activeTab === "documents" && <DocumentsTab documents={product.documents || []} />}
        {activeTab === "warranty" && <WarrantyTab product={product} />}
        {activeTab === "shipping" && <ShippingTab product={product} />}
      </div>
    </div>
  )
}

function DescriptionTab({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-bold text-foreground">Key Features</h3>
        <ul className="flex flex-col gap-2">
          {product.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
              {f}
            </li>
          ))}
        </ul>
      </div>
      {product.type === "kit" && (
        <div className="rounded-lg border border-accent/30 bg-accent/5 px-4 py-3">
          <div className="flex items-start gap-2">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <div>
              <p className="text-sm font-semibold text-accent">Kit does not include</p>
              <p className="mt-1 text-xs text-muted-foreground">Batteries, conduit, wire, disconnects, monitoring, or permitting. These can be quoted separately through your account rep.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function SpecsTab({ product }: { product: Product }) {
  const rows: [string, string | undefined][] = [
    ["SKU", product.sku],
    ["Brand", product.brand],
    ["Type", product.type === "kit" ? "Kit / Bundle" : "Individual Part"],
    ["UPC", product.upc],
    ["Weight", product.weight],
    ["Dimensions", product.dimensions],
    ["Country of Origin", product.countryOfOrigin],
    ["Lead Time", product.leadTime],
    ["Min Order Qty", product.minOrderQty?.toString()],
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full text-sm">
          <tbody>
            {rows.filter(([, v]) => v).map(([label, value], i) => (
              <tr key={label} className={i % 2 === 0 ? "bg-muted/30" : "bg-card"}>
                <td className="px-4 py-2.5 font-semibold text-foreground">{label}</td>
                <td className="px-4 py-2.5 text-muted-foreground">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {product.certifications && product.certifications.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-bold text-foreground">Certifications</h3>
          <div className="flex flex-wrap gap-2">
            {product.certifications.map((cert) => (
              <span key={cert} className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">{cert}</span>
            ))}
          </div>
        </div>
      )}

      {product.specs.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-bold text-foreground">Quick Specs</h3>
          <div className="flex flex-wrap gap-2">
            {product.specs.map((s) => (
              <span key={s} className="rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-card-foreground">{s}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function KitContentsTab({ items }: { items: KitItem[] }) {
  return (
    <div>
      <p className="mb-4 text-sm text-muted-foreground">This kit includes the following components. Click any linked item to view its individual product page.</p>
      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-2.5 text-left font-semibold text-foreground">Component</th>
              <th className="px-4 py-2.5 text-left font-semibold text-foreground">SKU</th>
              <th className="px-4 py-2.5 text-center font-semibold text-foreground">Qty</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={item.sku} className={`border-b border-border last:border-0 ${i % 2 === 0 ? "bg-card" : "bg-muted/20"}`}>
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 shrink-0 text-muted-foreground" />
                    {item.slug ? (
                      <Link href={`/products/${item.slug}`} className="font-medium text-primary hover:underline">{item.name}</Link>
                    ) : (
                      <span className="text-card-foreground">{item.name}</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{item.sku}</td>
                <td className="px-4 py-2.5 text-center font-bold text-foreground">{item.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Need to swap a component? Contact your account rep for a custom kit configuration.</p>
    </div>
  )
}

function DocumentsTab({ documents }: { documents: ProductDocument[] }) {
  const typeIcons: Record<string, string> = {
    datasheet: "PDF",
    "install-guide": "PDF",
    warranty: "PDF",
    "spec-sheet": "PDF",
    certificate: "PDF",
  }

  return (
    <div>
      <p className="mb-4 text-sm text-muted-foreground">Download product documentation, spec sheets, and compliance certificates.</p>
      <div className="flex flex-col gap-2">
        {documents.map((doc) => (
          <a
            key={doc.label}
            href={doc.url}
            className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 transition-colors hover:border-primary/30 hover:bg-muted/50"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
              <FileDown className="h-5 w-5 text-destructive" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-card-foreground">{doc.label}</p>
              <p className="text-xs text-muted-foreground">{typeIcons[doc.type] || "PDF"} Document</p>
            </div>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </a>
        ))}
      </div>
    </div>
  )
}

function WarrantyTab({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border border-border bg-card px-4 py-4">
        <h3 className="text-sm font-bold text-foreground">Warranty Coverage</h3>
        <p className="mt-2 text-sm text-muted-foreground">{product.warranty || "Standard manufacturer warranty applies. Contact PES Supply for details."}</p>
      </div>
      <div className="rounded-lg border border-border bg-card px-4 py-4">
        <h3 className="text-sm font-bold text-foreground">Returns</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Items may be returned within 30 days of delivery in original, unopened packaging. Freight returns are subject to a restocking fee plus return shipping costs.
          Contact us for an RMA number before returning any product. Installed, modified, or custom-ordered products cannot be returned.
        </p>
      </div>
      <div className="rounded-lg border border-border bg-card px-4 py-4">
        <h3 className="text-sm font-bold text-foreground">Damage Claims</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Inspect all deliveries upon receipt and note any damage on the BOL before signing. Contact us within 48 hours with your order number, signed BOL, and photos.
          For concealed damage, notify us within 7 days.
        </p>
      </div>
    </div>
  )
}

function ShippingTab({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border border-border bg-card px-4 py-4">
        <h3 className="text-sm font-bold text-foreground">Estimated Lead Time</h3>
        <p className="mt-2 text-sm text-muted-foreground">{product.leadTime || "1-2 business days for in-stock items."}</p>
      </div>
      {product.weight && (
        <div className="rounded-lg border border-border bg-card px-4 py-4">
          <h3 className="text-sm font-bold text-foreground">Shipping Method</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {parseInt(product.weight) > 150
              ? "This item ships via LTL freight. Liftgate service available for $75-$125. Residential delivery incurs a carrier surcharge."
              : "This item ships via UPS or FedEx Ground parcel."}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Weight: {product.weight} | Dimensions: {product.dimensions || "N/A"}</p>
        </div>
      )}
      <div className="rounded-lg border border-border bg-card px-4 py-4">
        <h3 className="text-sm font-bold text-foreground">Free Freight</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {product.freeShipping
            ? "This item qualifies for free freight to commercial addresses."
            : product.price >= 999
              ? "This item qualifies for free freight on orders $999+."
              : "Free freight on qualifying orders over $999. Calculated shipping rate applied at checkout for orders under $999."
          }
        </p>
      </div>
      {product.type === "kit" && (
        <div className="rounded-lg border border-accent/20 bg-accent/5 px-4 py-3">
          <p className="text-xs font-medium text-accent">
            <strong>Kit shipments may arrive in multiple packages</strong> from different locations. You will receive separate tracking numbers for each shipment.
            Inspect all packages against the packing list before signing.
          </p>
        </div>
      )}
    </div>
  )
}
