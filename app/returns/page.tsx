import { ReturnsContent } from "@/components/returns-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Return Policy",
  description: "PES Supply return and RMA policy. 30-day return window, RMA form required within 5 business days, restocking fees may apply.",
}

export default function ReturnsPage() {
  return <ReturnsContent />
}
