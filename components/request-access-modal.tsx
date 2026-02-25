"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useState } from "react"

interface RequestAccessModalProps {
  isOpen: boolean
  onClose: () => void
}

export function RequestAccessModal({ isOpen, onClose }: RequestAccessModalProps) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    lookingFor: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/request-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Something went wrong.")
      }

      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    onClose()
    // Reset state after animation completes
    setTimeout(() => {
      setSubmitted(false)
      setError("")
      setFormData({ name: "", email: "", phone: "", lookingFor: "" })
    }, 400)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[80] bg-background/70 backdrop-blur-md"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-[80] flex items-center justify-center px-6 pointer-events-none"
          >
            <div
              className="pointer-events-auto relative w-full max-w-lg rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] backdrop-blur-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-5 right-5 text-muted-foreground hover:text-foreground transition-colors duration-300"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <div className="p-8 md:p-10">
                {!submitted ? (
                  <>
                    <h2 className="text-2xl font-serif font-light tracking-tight text-foreground mb-2">
                      Request Access
                    </h2>
                    <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                      Join our curated community. We will reach out when your
                      next drop is ready.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                      <div>
                        <label className="block text-xs tracking-[0.1em] uppercase text-muted-foreground mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-[rgba(255,255,255,0.2)] transition-colors duration-300"
                          placeholder="Your full name"
                        />
                      </div>

                      <div>
                        <label className="block text-xs tracking-[0.1em] uppercase text-muted-foreground mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-[rgba(255,255,255,0.2)] transition-colors duration-300"
                          placeholder="you@email.com"
                        />
                      </div>

                      <div>
                        <label className="block text-xs tracking-[0.1em] uppercase text-muted-foreground mb-2">
                          Phone
                          <span className="text-muted-foreground/40 ml-1 normal-case tracking-normal">
                            (optional)
                          </span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-[rgba(255,255,255,0.2)] transition-colors duration-300"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>

                      <div>
                        <label className="block text-xs tracking-[0.1em] uppercase text-muted-foreground mb-2">
                          What are you looking for?
                        </label>
                        <textarea
                          name="lookingFor"
                          rows={3}
                          value={formData.lookingFor}
                          onChange={handleChange}
                          className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-[rgba(255,255,255,0.2)] transition-colors duration-300 resize-none"
                          placeholder="Rare watches, vintage fashion, limited editions..."
                        />
                      </div>

                      {error && (
                        <p className="text-sm text-red-400">{error}</p>
                      )}

                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: loading ? 1 : 1.02 }}
                        whileTap={{ scale: loading ? 1 : 0.98 }}
                        className="mt-2 w-full bg-foreground text-background py-3.5 rounded-full text-sm font-medium tracking-[0.1em] uppercase hover:bg-foreground/90 transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {loading ? "Submitting..." : "Join the Drop List"}
                      </motion.button>
                    </form>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8"
                  >
                    <h2 className="text-2xl font-serif font-light tracking-tight text-foreground mb-3">
                      You are on the list.
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                      A welcome email is on its way. You will receive updates on
                      new drops and site passwords when we go live.
                    </p>
                    <motion.button
                      onClick={handleClose}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-8 text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      Close
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
