import type { Metadata } from "next"
import { QuoteForm } from "@/components/quote-form"

export const metadata: Metadata = {
  title: "Request a Quote | PES Supply",
  description: "Get custom pricing for bulk orders. Provide item details and quantities to receive your preferred rates within 1 business day.",
}

export default function QuotePage() {
  return <QuoteForm />
}
