import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | PES Supply",
  description: "PES Supply terms of service, conditions of sale, and website usage agreement.",
}

export default function TermsPage() {
  return (
    <main>
      <section className="border-b border-border bg-foreground">
        <div className="mx-auto max-w-7xl px-4 py-10 text-center">
          <h1 className="text-2xl font-bold text-background md:text-3xl">Terms of Service</h1>
          <p className="mt-2 text-sm text-background/60">Last updated: March 1, 2026</p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="space-y-8">
          <section>
            <h2 className="text-lg font-bold text-foreground">1. Acceptance of Terms</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">By accessing or using the PES Supply website (pes.supply) or placing an order, you agree to be bound by these Terms of Service. If you are placing an order on behalf of a company, you represent that you have authority to bind that organization.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground">2. Account Registration</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">You must provide accurate, current information when creating an account. Business accounts may be subject to credit approval for Net-30 terms. You are responsible for maintaining the confidentiality of your login credentials and for all activity under your account.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground">3. Pricing & Payment</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">All prices are in US dollars and are subject to change without notice. Pro pricing is available to approved business accounts only. Quotes are valid for 30 days unless otherwise stated. We accept Visa, Mastercard, American Express, ACH, wire transfer, and approved Net-30 terms.</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Pallet and container pricing is quoted per project and may require 1-2 business days for vendor confirmation.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground">4. Orders & Shipping</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Orders placed by 2 PM ET are processed same day. Shipping methods, transit times, and freight thresholds are detailed on our <Link href="/shipping" className="font-semibold text-primary hover:underline">Shipping page</Link>. Title and risk of loss transfer to buyer upon delivery to the carrier. PES Supply is not liable for carrier delays, damage in transit, or force majeure events.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground">5. Returns & Warranties</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Returns are subject to our <Link href="/returns" className="font-semibold text-primary hover:underline">Return Policy</Link>. All products carry their original manufacturer warranty. PES Supply does not provide additional warranties beyond what the manufacturer offers. We are an authorized distributor for all brands we carry.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground">6. Limitation of Liability</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">PES Supply&apos;s total liability for any claim shall not exceed the purchase price of the product(s) at issue. We are not liable for indirect, incidental, special, or consequential damages including lost profits, business interruption, or installation costs.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground">7. Intellectual Property</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">All content on this website, including text, images, logos, and software, is owned by or licensed to Portlandia Electric Supply, Inc. You may not reproduce, distribute, or create derivative works without written permission.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground">8. Governing Law</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">These terms are governed by the laws of the Commonwealth of Kentucky. Any disputes shall be resolved in the state or federal courts located in Jefferson County, Kentucky.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground">9. Contact</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Portlandia Electric Supply, Inc.<br />
              1507 Portland Ave, Louisville, KY 40203<br />
              <a href="mailto:legal@portlandiaelectric.supply" className="font-semibold text-primary hover:underline">legal@portlandiaelectric.supply</a><br />
              <a href="tel:8888760007" className="font-semibold text-primary hover:underline">(888) 876-0007</a>
            </p>
          </section>
        </div>

        <div className="mt-10 flex gap-3">
          <Link href="/privacy" className="text-xs font-semibold text-primary hover:underline">Privacy Policy</Link>
          <Link href="/returns" className="text-xs font-semibold text-primary hover:underline">Return Policy</Link>
          <Link href="/contact" className="text-xs font-semibold text-primary hover:underline">Contact Us</Link>
        </div>
      </div>
    </main>
  )
}
