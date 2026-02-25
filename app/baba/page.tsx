import type { Metadata } from "next"
import { BabaContent } from "@/components/baba-content"

export const metadata: Metadata = {
  title: "BABA Compliance | Build America, Buy America | PES Supply",
  description: "PES Supply offers BABA-compliant electrical, solar, and infrastructure products for government-funded projects. Certified documentation for every order.",
}

export default function BabaPage() {
  return <BabaContent />
}
