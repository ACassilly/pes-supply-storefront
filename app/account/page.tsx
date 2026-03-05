"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Loader2, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FormData { email: string; password: string }
interface RegisterData { name: string; email: string; password: string; confirm: string }

export default function AccountPage() {
  const [mode, setMode] = useState<"signin" | "register">("signin")
  const [form, setForm] = useState<FormData>({ email: "", password: "" })
  const [reg, setReg] = useState<RegisterData>({ name: "", email: "", password: "", confirm: "" })
  const [showPw, setShowPw] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState("")

  function handleSignIn(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    if (!form.email || !form.password) { setError("Please fill in all fields."); return }
    setSubmitting(true)
    setTimeout(() => { setSubmitting(false); setDone(true) }, 1200)
  }

  function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    if (!reg.name || !reg.email || !reg.password) { setError("Please fill in all required fields."); return }
    if (reg.password !== reg.confirm) { setError("Passwords do not match."); return }
    if (reg.password.length < 8) { setError("Password must be at least 8 characters."); return }
    setSubmitting(true)
    setTimeout(() => { setSubmitting(false); setDone(true) }, 1200)
  }

  if (done) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4 py-16">
        <div className="flex max-w-sm flex-col items-center text-center">
          <CheckCircle2 className="h-12 w-12 text-primary" />
          <h1 className="mt-4 text-xl font-bold text-foreground">{mode === "signin" ? "Welcome Back" : "Account Created"}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "signin"
              ? "You are now signed in. Your dashboard is loading."
              : "Check your email to verify your account. A PES rep will reach out within 1 business day for Pro Account applications."
            }
          </p>
          <div className="mt-6 flex gap-3">
            <Button asChild size="sm"><Link href="/departments">Shop Now <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link></Button>
            <Button asChild variant="outline" size="sm"><Link href="/quote">Request a Quote</Link></Button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="py-10 md:py-16">
      {/* Hero */}
      <section className="border-b border-border bg-foreground">
        <div className="mx-auto max-w-7xl px-4 py-10 text-center">
          <h1 className="text-2xl font-bold text-background md:text-3xl">My Account</h1>
          <p className="mt-2 text-sm text-background/60">Sign in to access Pro pricing, order history, saved lists, and your dedicated account manager.</p>
        </div>
      </section>

      <div className="mx-auto max-w-md px-4 py-10">
        {/* Tabs */}
        <div className="mb-6 flex gap-2">
          <button onClick={() => { setMode("signin"); setError("") }} className={`flex-1 rounded-lg border px-4 py-3 text-center text-sm font-semibold transition-colors ${mode === "signin" ? "border-primary bg-primary/5 text-primary" : "border-border bg-card text-muted-foreground hover:border-primary/30"}`}>
            Sign In
          </button>
          <button onClick={() => { setMode("register"); setError("") }} className={`flex-1 rounded-lg border px-4 py-3 text-center text-sm font-semibold transition-colors ${mode === "register" ? "border-primary bg-primary/5 text-primary" : "border-border bg-card text-muted-foreground hover:border-primary/30"}`}>
            Create Account
          </button>
        </div>

        {error && <p className="mb-4 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs text-destructive">{error}</p>}

        {mode === "signin" ? (
          <form onSubmit={handleSignIn} className="flex flex-col gap-4">
            <div>
              <label htmlFor="signin-email" className="mb-1 block text-xs font-semibold text-foreground">Email Address</label>
              <input id="signin-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label htmlFor="signin-pw" className="mb-1 block text-xs font-semibold text-foreground">Password</label>
              <div className="relative">
                <input id="signin-pw" type={showPw ? "text" : "password"} required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Enter your password" className="w-full rounded-lg border border-input bg-background px-3 py-2.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label={showPw ? "Hide password" : "Show password"}>
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-muted-foreground">
                <input type="checkbox" className="rounded border-input" /> Remember me
              </label>
              <button type="button" className="font-semibold text-primary hover:underline">Forgot password?</button>
            </div>
            <Button type="submit" disabled={submitting} className="w-full gap-2">
              {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Signing in...</> : "Sign In"}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <div>
              <label htmlFor="reg-name" className="mb-1 block text-xs font-semibold text-foreground">Full Name *</label>
              <input id="reg-name" type="text" required value={reg.name} onChange={(e) => setReg({ ...reg, name: e.target.value })} placeholder="John Smith" className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label htmlFor="reg-email" className="mb-1 block text-xs font-semibold text-foreground">Email Address *</label>
              <input id="reg-email" type="email" required value={reg.email} onChange={(e) => setReg({ ...reg, email: e.target.value })} placeholder="you@company.com" className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label htmlFor="reg-pw" className="mb-1 block text-xs font-semibold text-foreground">Password *</label>
              <input id="reg-pw" type="password" required value={reg.password} onChange={(e) => setReg({ ...reg, password: e.target.value })} placeholder="Min 8 characters" className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label htmlFor="reg-confirm" className="mb-1 block text-xs font-semibold text-foreground">Confirm Password *</label>
              <input id="reg-confirm" type="password" required value={reg.confirm} onChange={(e) => setReg({ ...reg, confirm: e.target.value })} placeholder="Confirm your password" className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <Button type="submit" disabled={submitting} className="w-full gap-2">
              {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Creating account...</> : "Create Account"}
            </Button>
            <p className="text-center text-[10px] text-muted-foreground">
              By creating an account you agree to our <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
            </p>
          </form>
        )}

        {/* Quick links */}
        <div className="mt-8 rounded-lg border border-border bg-muted/30 p-4">
          <p className="mb-3 text-xs font-semibold text-foreground">Looking for something else?</p>
          <div className="flex flex-col gap-2">
            <Link href="/pro" className="text-xs font-semibold text-primary hover:underline">Open a Pro Account (trade pricing + Net-30 terms)</Link>
            <Link href="/powerlink" className="text-xs font-semibold text-primary hover:underline">Join the Power Link Installer Network</Link>
            <Link href="/quote" className="text-xs font-semibold text-primary hover:underline">Request a Quote</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
