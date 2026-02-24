import { RotateCcw, XCircle, Clock, AlertTriangle, Phone, Mail, FileText } from "lucide-react"

const notEligible = [
  "Products ordered more than 30 days from order date.",
  "Returns due to defects or malfunctions -- these must be handled through the manufacturer's warranty process.",
  "Solar energy products, pumps, motors, electrical items, and transmissions (even when new). In rare cases, an exception may be allowed under a 40% restocking fee.",
  "Products that have been opened, installed, or used.",
]

const rmaSteps = [
  { step: "1", title: "Submit RMA Form", desc: "Submit a Return Merchandise Authorization form within 5 business days of receiving your order." },
  { step: "2", title: "Approval & Return Address", desc: "Once your RMA is approved, PES Supply will provide a return address. Products must be unopened and in original packaging." },
  { step: "3", title: "Ship Within 14 Days", desc: "Approved returns must be shipped within 14 calendar days or they will not be accepted. You are responsible for return shipping costs." },
  { step: "4", title: "Inspection & Refund", desc: "Upon receipt, items are inspected. A restocking fee of up to 40% may apply. Refunds are processed via the original payment method." },
]

export function ReturnsContent() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="border-b border-border bg-muted/30 py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4">
          <div className="flex items-center gap-3 text-primary">
            <RotateCcw className="h-8 w-8" />
            <span className="text-sm font-bold uppercase tracking-widest">Return Policy</span>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            Returns & RMA Process
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            PES Supply stands behind every product we sell. If you need to return an item, our RMA process ensures a clear, fair resolution. Please review the full policy below.
          </p>
        </div>
      </section>

      {/* Quick stats */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-5xl grid-cols-2 md:grid-cols-4">
          {[
            { icon: Clock, label: "Return Window", value: "30 Days" },
            { icon: FileText, label: "RMA Submission", value: "Within 5 Days" },
            { icon: RotateCcw, label: "Ship Back By", value: "14 Days" },
            { icon: AlertTriangle, label: "Restocking Fee", value: "Up to 40%" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center border-b border-r border-border px-4 py-6 last:border-r-0 md:border-b-0">
              <stat.icon className="h-6 w-6 text-primary" />
              <span className="mt-2 text-lg font-extrabold text-foreground">{stat.value}</span>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        {/* RMA steps */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground">How the RMA Process Works</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {rmaSteps.map((s) => (
              <div key={s.step} className="flex gap-4 rounded-xl border border-border p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  {s.step}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">{s.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Not eligible */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground">Items Not Eligible for Return</h2>
          <div className="mt-4 rounded-xl border border-border bg-muted/30 p-5">
            <ul className="space-y-3">
              {notEligible.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-sale" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Warranty */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground">Warranty Claims & Defective Products</h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              If the item returned is found to not be defective, a 40% restocking fee will be automatically applied. A refund cannot be issued or determined until the manufacturer has determined the cause and/or solution.
            </p>
            <p>
              PES Supply will process your return as a warranty claim only if you have contacted the manufacturer first. The product will be sent to the manufacturer or a third party for testing (at your cost if you choose to make the claim through us). A diagnostic test may be performed to determine the cause of the issue.
            </p>
            <p>
              Should the manufacturer direct you to handle the warranty claim through the seller, please complete the RMA Form and fill out all applicable information. Please ensure the issue is a genuine defect -- items that were installed incorrectly or damaged through use may not be eligible for a warranty claim.
            </p>
          </div>
        </section>

        {/* Refunds */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground">Refunds</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Refunds are processed using the original payment method. Processing time is typically 5 -- 10 business days after the returned item passes inspection. If you have questions about the refund process, contact us at{" "}
            <a href="mailto:connect@portlandiaelectric.supply" className="font-medium text-primary hover:underline">connect@portlandiaelectric.supply</a>.
          </p>
        </section>

        {/* Contact */}
        <section className="rounded-xl border border-border bg-muted/30 p-6 md:p-8">
          <h2 className="text-lg font-bold text-foreground">Need to Start a Return?</h2>
          <p className="mt-2 text-sm text-muted-foreground">Contact our team to request an RMA form or ask questions about the returns process.</p>
          <div className="mt-4 flex flex-wrap gap-4">
            <a href="tel:8888760007" className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground">
              <Phone className="h-4 w-4" /> (888) 876-0007
            </a>
            <a href="mailto:connect@portlandiaelectric.supply" className="flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground">
              <Mail className="h-4 w-4" /> connect@portlandiaelectric.supply
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
