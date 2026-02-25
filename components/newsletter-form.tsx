"use client"

import { useState } from "react"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  if (submitted) {
    return (
      <p className="text-xs font-medium text-primary">You are in. Watch your inbox.</p>
    )
  }

  return (
    <form className="flex w-full max-w-sm items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="email"
        required
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-9 min-w-0 flex-1 rounded-md border border-background/20 bg-background/5 px-3 text-xs text-background placeholder:text-background/30 focus:border-primary focus:outline-none"
      />
      <button type="submit" className="h-9 shrink-0 rounded-md bg-primary px-4 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
        Subscribe
      </button>
    </form>
  )
}
