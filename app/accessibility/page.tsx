import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Accessibility Statement | PES Supply",
  description: "PES Supply is committed to making our website accessible to all users. Learn about our accessibility standards and how to report issues.",
}

export default function AccessibilityPage() {
  return (
    <main>
      <section className="border-b border-border bg-foreground">
        <div className="mx-auto max-w-7xl px-4 py-10 text-center">
          <h1 className="text-2xl font-bold text-background md:text-3xl">Accessibility Statement</h1>
          <p className="mt-2 text-sm text-background/60">Our commitment to an inclusive experience for all users.</p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="space-y-8">
          <section>
            <h2 className="text-lg font-bold text-foreground">Our Commitment</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">PES Supply (Portlandia Electric Supply, Inc.) is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply relevant accessibility standards to our website.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground">Standards We Follow</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA. These guidelines explain how to make web content more accessible to people with a wide array of disabilities including visual, auditory, physical, speech, cognitive, language, learning, and neurological.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground">What We Do</h2>
            <ul className="mt-2 flex flex-col gap-1.5 text-sm text-muted-foreground">
              <li>Use semantic HTML and ARIA landmarks for screen reader navigation</li>
              <li>Provide text alternatives for images and non-text content</li>
              <li>Ensure sufficient color contrast ratios throughout the site</li>
              <li>Support keyboard navigation for all interactive elements</li>
              <li>Provide skip-to-content links for efficient navigation</li>
              <li>Label all form fields and provide clear error messages</li>
              <li>Design responsive layouts that work across devices and zoom levels</li>
              <li>Use minimum 16px font sizes for readability</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground">Known Limitations</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">While we strive for full accessibility, some third-party content (manufacturer spec sheets, embedded videos, certain PDF documents) may not yet meet all WCAG 2.1 AA standards. We are working with our content providers to address these gaps.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground">Need Help?</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">If you experience any difficulty accessing any part of our website, or if you have suggestions for improving accessibility, please contact us. We take accessibility feedback seriously and will work to resolve issues promptly.</p>
            <div className="mt-4 rounded-lg border border-border bg-card p-4">
              <p className="text-sm font-semibold text-card-foreground">Contact our accessibility team:</p>
              <div className="mt-2 flex flex-col gap-1 text-sm text-muted-foreground">
                <p>Email: <a href="mailto:accessibility@portlandiaelectric.supply" className="font-semibold text-primary hover:underline">accessibility@portlandiaelectric.supply</a></p>
                <p>Phone: <a href="tel:8888760007" className="font-semibold text-primary hover:underline">(888) 876-0007</a></p>
                <p>Mail: 1507 Portland Ave, Louisville, KY 40203</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground">Alternative Access</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">If you are unable to access any content or complete a transaction online, our team is available by phone at <a href="tel:8888760007" className="font-semibold text-primary hover:underline">(888) 876-0007</a> Monday through Friday, 8 AM - 6 PM ET to assist you with any order, quote, or product information.</p>
          </section>
        </div>

        <div className="mt-10 flex gap-3">
          <Link href="/privacy" className="text-xs font-semibold text-primary hover:underline">Privacy Policy</Link>
          <Link href="/terms" className="text-xs font-semibold text-primary hover:underline">Terms of Service</Link>
          <Link href="/contact" className="text-xs font-semibold text-primary hover:underline">Contact Us</Link>
        </div>
      </div>
    </main>
  )
}
