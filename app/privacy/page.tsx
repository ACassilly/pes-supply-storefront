import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | PES Supply",
  description: "PES Supply privacy policy. How we collect, use, and protect your personal information.",
}

export default function PrivacyPage() {
  return (
    <main>
      <section className="border-b border-border bg-foreground">
        <div className="mx-auto max-w-7xl px-4 py-10 text-center">
          <h1 className="text-2xl font-bold text-background md:text-3xl">Privacy Policy</h1>
          <p className="mt-2 text-sm text-background/60">Last updated: March 1, 2026</p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="prose-sm prose-neutral max-w-none space-y-8">
          <section>
            <h2 className="text-lg font-bold text-foreground">1. Information We Collect</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Portlandia Electric Supply, Inc. d/b/a PES Supply (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects information you provide directly when you create an account, place an order, request a quote, or contact us. This includes your name, email address, phone number, company name, shipping and billing addresses, and payment information.</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">We also automatically collect usage data including IP address, browser type, device information, pages visited, and referring URLs through cookies and similar technologies.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground">2. How We Use Your Information</h2>
            <ul className="mt-2 flex flex-col gap-1.5 text-sm text-muted-foreground">
              <li>Process and fulfill your orders and quotes</li>
              <li>Communicate about your account, orders, and shipments</li>
              <li>Assign and manage your dedicated account representative</li>
              <li>Provide Pro pricing and Net-30 terms for qualified accounts</li>
              <li>Send newsletters, product updates, and promotional offers (with opt-out)</li>
              <li>Improve our website, products, and services</li>
              <li>Comply with legal obligations and prevent fraud</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground">3. Information Sharing</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">We do not sell your personal information. We share information only with service providers necessary to operate our business: payment processors, shipping carriers (including Portlandia Logistics), email platforms, and analytics providers. All service providers are contractually bound to protect your data.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground">4. Data Security</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">We implement industry-standard security measures including SSL encryption, secure payment processing, access controls, and regular security audits. Payment information is tokenized and never stored on our servers.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground">5. Cookies</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">We use essential cookies to operate our website (cart, session), performance cookies to understand usage patterns, and optional marketing cookies for relevant advertising. You can manage cookie preferences through your browser settings.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground">6. Your Rights</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">You may access, correct, or delete your personal information at any time by contacting us or logging into your account. California residents have additional rights under the CCPA. To exercise any rights, email <a href="mailto:privacy@portlandiaelectric.supply" className="font-semibold text-primary hover:underline">privacy@portlandiaelectric.supply</a>.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground">7. Children&apos;s Privacy</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Our services are not directed to individuals under 18. We do not knowingly collect information from minors.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground">8. Changes to This Policy</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">We may update this policy from time to time. Changes will be posted on this page with an updated effective date. Continued use of our services constitutes acceptance of the updated policy.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground">9. Contact Us</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Portlandia Electric Supply, Inc.<br />
              1507 Portland Ave, Louisville, KY 40203<br />
              <a href="mailto:privacy@portlandiaelectric.supply" className="font-semibold text-primary hover:underline">privacy@portlandiaelectric.supply</a><br />
              <a href="tel:8888760007" className="font-semibold text-primary hover:underline">(888) 876-0007</a>
            </p>
          </section>
        </div>

        <div className="mt-10 flex gap-3">
          <Link href="/terms" className="text-xs font-semibold text-primary hover:underline">Terms of Service</Link>
          <Link href="/accessibility" className="text-xs font-semibold text-primary hover:underline">Accessibility Statement</Link>
          <Link href="/contact" className="text-xs font-semibold text-primary hover:underline">Contact Us</Link>
        </div>
      </div>
    </main>
  )
}
