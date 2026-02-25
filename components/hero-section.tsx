"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FloatingItems } from "@/components/floating-items"
import { CTAButton } from "@/components/cta-button"
import { RequestAccessModal } from "@/components/request-access-modal"

export function HeroSection() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0">
        {/* Floating background items */}
        <FloatingItems />

        {/* Radial vignette — soft center glow for text readability */}
        <div
          className="absolute inset-0 pointer-events-none z-[45]"
          style={{
            background:
              "radial-gradient(ellipse 40% 36% at 50% 50%, rgba(11,11,13,0.92) 0%, rgba(11,11,13,0.5) 50%, transparent 100%)",
          }}
        />

        {/* Center content — z-50 to sit above floating items (z-40 max) and vignette (z-45) */}
        <div className="relative z-50 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h1 className="font-serif text-7xl md:text-[9rem] lg:text-[11rem] font-light tracking-[-0.02em] text-foreground leading-[0.85] uppercase">
              <span className="block">New Drops</span>
              <span className="block mt-2 md:mt-4 text-5xl md:text-7xl lg:text-8xl italic font-light tracking-[0.04em] text-foreground/80">Coming Soon</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-10 text-xs md:text-sm text-foreground/40 tracking-[0.3em] uppercase max-w-md mx-auto leading-relaxed font-sans"
          >
            Discover. Search. Acquire the exceptional.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-10"
          >
            <CTAButton label="Request Access" onClick={() => setModalOpen(true)} />
          </motion.div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[45] pointer-events-none" />

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-foreground/30"
          />
        </motion.div>
      </section>

      <RequestAccessModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
