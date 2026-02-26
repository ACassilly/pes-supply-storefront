"use client"

import { useState } from "react"
import { MessageCircle, X, Send, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<{ from: "user" | "agent"; text: string }[]>([
    { from: "agent", text: "Hey! Need help finding a product or getting a quote? Our team is standing by." },
  ])

  function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!message.trim()) return
    setMessages(prev => [...prev, { from: "user", text: message }])
    setMessage("")
    setTimeout(() => {
      setMessages(prev => [...prev, {
        from: "agent",
        text: "Thanks for reaching out! A PES team member will respond shortly. For immediate help, call us at (888) 876-0007.",
      }])
    }, 1200)
  }

  return (
    <div className="fixed bottom-5 right-5 z-[9990]">
      {open ? (
        <div className="flex h-[420px] w-[340px] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between bg-primary px-4 py-3">
            <div>
              <p className="text-sm font-bold text-primary-foreground">PES Supply</p>
              <p className="text-[10px] text-primary-foreground/70">Typically replies in minutes</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-primary-foreground/70 hover:text-primary-foreground" aria-label="Close chat">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-3">
            {messages.map((msg, i) => (
              <div key={i} className={`max-w-[85%] rounded-lg px-3 py-2 text-xs leading-relaxed ${msg.from === "agent" ? "self-start bg-muted text-card-foreground" : "self-end bg-primary text-primary-foreground"}`}>
                {msg.text}
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div className="flex gap-1.5 border-t border-border px-3 py-2">
            {["Get a quote", "Track an order", "Talk to a rep"].map((action) => (
              <button
                key={action}
                onClick={() => {
                  setMessages(prev => [...prev, { from: "user", text: action }])
                  setTimeout(() => {
                    setMessages(prev => [...prev, { from: "agent", text: "Got it -- a team member will jump in shortly to help with that." }])
                  }, 1000)
                }}
                className="rounded-full border border-border px-2.5 py-1 text-[10px] font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {action}
              </button>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-border px-3 py-2.5">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="h-8 flex-1 rounded-md border border-border bg-background px-3 text-xs outline-none focus:border-primary"
            />
            <button type="submit" className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90" aria-label="Send">
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>

          {/* Call fallback */}
          <div className="flex items-center justify-center gap-1.5 border-t border-border bg-muted/50 py-2 text-[10px] text-muted-foreground">
            <Phone className="h-3 w-3" /> Prefer to call? <a href="tel:8888760007" className="font-semibold text-primary hover:underline">(888) 876-0007</a>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg transition-transform hover:scale-105"
          aria-label="Open live chat"
        >
          <MessageCircle className="h-6 w-6 text-primary-foreground" />
        </button>
      )}
    </div>
  )
}
