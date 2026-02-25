import type { Metadata } from "next"
import { BulkDiscountContent } from "@/components/bulk-discount-content"

export const metadata: Metadata = {
  title: "Bulk Discounts | PES Supply",
  description: "Volume pricing on 40,000+ products. Buy more, save more -- automatic tiered discounts on every order. Free freight on pallet quantities.",
}

export default function BulkPage() {
  return <BulkDiscountContent />
}
