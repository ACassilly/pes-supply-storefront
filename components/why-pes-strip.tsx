import { CheckCircle2, X, Minus } from "lucide-react"

type Cell = "yes" | "no" | "partial"

const features = [
  { label: "Authorized distributor (full OEM warranty)", pes: "yes" as Cell, grainger: "yes" as Cell, zoro: "no" as Cell, amazon: "no" as Cell },
  { label: "In-house logistics (Portlandia Logistics)", pes: "yes" as Cell, grainger: "yes" as Cell, zoro: "no" as Cell, amazon: "no" as Cell },
  { label: "BABA compliance documentation", pes: "yes" as Cell, grainger: "partial" as Cell, zoro: "no" as Cell, amazon: "no" as Cell },
  { label: "Installer lead generation (Power Link)", pes: "yes" as Cell, grainger: "no" as Cell, zoro: "no" as Cell, amazon: "no" as Cell },
  { label: "Net-30 terms, no minimum", pes: "yes" as Cell, grainger: "yes" as Cell, zoro: "partial" as Cell, amazon: "no" as Cell },
  { label: "Named account rep", pes: "yes" as Cell, grainger: "yes" as Cell, zoro: "no" as Cell, amazon: "no" as Cell },
  { label: "No marketplace risk (counterfeit/grey market)", pes: "yes" as Cell, grainger: "yes" as Cell, zoro: "partial" as Cell, amazon: "no" as Cell },
  { label: "Quick-order from PO paste", pes: "yes" as Cell, grainger: "no" as Cell, zoro: "no" as Cell, amazon: "no" as Cell },
  { label: "Global sourcing (PES Global)", pes: "yes" as Cell, grainger: "partial" as Cell, zoro: "no" as Cell, amazon: "partial" as Cell },
  { label: "Solar + electrical + HVAC in one order", pes: "yes" as Cell, grainger: "partial" as Cell, zoro: "partial" as Cell, amazon: "partial" as Cell },
]

function CellIcon({ v }: { v: Cell }) {
  if (v === "yes") return <CheckCircle2 className="h-4 w-4 text-primary" />
  if (v === "no") return <X className="h-4 w-4 text-muted-foreground/40" />
  return <Minus className="h-4 w-4 text-accent" />
}

export function WhyPesStrip() {
  return (
    <section className="py-8 md:py-12" aria-label="Why PES comparison">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-1 text-center text-xl font-bold text-foreground md:text-2xl">Why PES?</h2>
        <p className="mb-6 text-center text-sm text-muted-foreground">
          Not all distributors are equal. Here{"'"}s how PES Supply compares.
        </p>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground">Feature</th>
                <th className="px-3 py-3 text-center text-xs font-bold text-primary">PES Supply</th>
                <th className="px-3 py-3 text-center text-xs font-semibold text-muted-foreground">Grainger</th>
                <th className="px-3 py-3 text-center text-xs font-semibold text-muted-foreground">Zoro</th>
                <th className="px-3 py-3 text-center text-xs font-semibold text-muted-foreground">Amazon</th>
              </tr>
            </thead>
            <tbody>
              {features.map((f, i) => (
                <tr key={f.label} className={`border-b border-border ${i % 2 === 0 ? "bg-card" : "bg-muted/20"}`}>
                  <td className="px-4 py-3 text-xs font-medium text-card-foreground">{f.label}</td>
                  <td className="px-3 py-3 text-center"><div className="flex justify-center"><CellIcon v={f.pes} /></div></td>
                  <td className="px-3 py-3 text-center"><div className="flex justify-center"><CellIcon v={f.grainger} /></div></td>
                  <td className="px-3 py-3 text-center"><div className="flex justify-center"><CellIcon v={f.zoro} /></div></td>
                  <td className="px-3 py-3 text-center"><div className="flex justify-center"><CellIcon v={f.amazon} /></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-center gap-5 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-primary" /> Full support</span>
          <span className="flex items-center gap-1"><Minus className="h-3 w-3 text-accent" /> Limited / varies</span>
          <span className="flex items-center gap-1"><X className="h-3 w-3 text-muted-foreground/40" /> Not available</span>
        </div>
      </div>
    </section>
  )
}
