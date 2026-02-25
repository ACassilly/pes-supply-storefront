import type { Metadata } from "next"
import { ContactContent } from "@/components/contact-content"

export const metadata: Metadata = {
  title: "Contact Us | PES Supply",
  description: "Get in touch with PES Supply. Call, email, or chat with our team for product questions, order support, quotes, and Pro account help.",
}

export default function ContactPage() {
  return <ContactContent />
}
