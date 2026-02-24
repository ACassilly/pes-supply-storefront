import { ShippingContent } from "@/components/shipping-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: "PES Supply shipping policy -- free freight on orders over $999, same-day shipping on orders by 2 PM ET, insured shipments via FedEx, UPS, and freight carriers.",
}

export default function ShippingPage() {
  return <ShippingContent />
}
