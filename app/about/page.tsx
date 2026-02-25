"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CTAButton } from "@/components/cta-button"
import { RequestAccessModal } from "@/components/request-access-modal"
import { SectionReveal, RevealItem } from "@/components/section-reveal"

export default function AboutPage() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <main className="bg-background min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-24 px-6 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <SectionReveal>
            <RevealItem>
              <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-light tracking-[-0.02em] text-foreground leading-[0.88] uppercase">
                <span className="italic">Curating</span>
                <br />
                the Rare.
              </h1>
            </RevealItem>
            <RevealItem>
              <p className="mt-8 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
                Orbitara exists at the intersection of obsession and access. We
                source what others cannot find, for those who refuse to settle.
                Every item we present has been vetted, authenticated, and
                selected for its rarity and cultural weight.
              </p>
            </RevealItem>
          </SectionReveal>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-6 lg:mx-12 border-t border-border/20" />

      {/* What We Do */}
      <section className="py-24 px-6 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <SectionReveal>
            <RevealItem>
              <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                What We Do
              </span>
            </RevealItem>
            <RevealItem>
              <h2 className="mt-6 text-3xl md:text-5xl font-serif font-normal tracking-[-0.01em] text-foreground leading-[1.1]">
                Private sourcing for the
                <br className="hidden md:block" /> discerning few.
              </h2>
            </RevealItem>
            <RevealItem>
              <div className="mt-8 flex flex-col gap-6">
                <p className="text-muted-foreground leading-relaxed">
                  We operate a closed-door personal shopping model. No storefront. No
                  catalog. Each drop is a curated release of hand-selected rare items
                  sourced from private collections, auction houses, and trusted
                  networks worldwide.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  From vintage haute couture to limited-edition timepieces, from
                  unreleased sneakers to museum-grade collectibles, we find what
                  doesn't come to market. Discretion is foundational. Every
                  acquisition is handled with absolute confidentiality.
                </p>
              </div>
            </RevealItem>
          </SectionReveal>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-6 lg:mx-12 border-t border-border/20" />

      {/* Our Clients */}
      <section className="py-24 px-6 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <SectionReveal>
            <RevealItem>
              <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                Our Clients
              </span>
            </RevealItem>
            <RevealItem>
              <h2 className="mt-6 text-3xl md:text-5xl font-serif font-normal tracking-[-0.01em] text-foreground leading-[1.1]">
                Built for those who
                <br className="hidden md:block" /> already have everything.
              </h2>
            </RevealItem>
            <RevealItem>
              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col gap-3">
                  <div className="w-8 h-px bg-foreground/20" />
                  <h3 className="text-sm font-medium tracking-[0.1em] uppercase text-foreground">
                    Collectors
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    High-net-worth individuals with refined taste and an eye for
                    investment-grade rarities.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="w-8 h-px bg-foreground/20" />
                  <h3 className="text-sm font-medium tracking-[0.1em] uppercase text-foreground">
                    Fashion Insiders
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Stylists, creative directors, and tastemakers who shape
                    culture and demand the exceptional.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="w-8 h-px bg-foreground/20" />
                  <h3 className="text-sm font-medium tracking-[0.1em] uppercase text-foreground">
                    Cultural Tastemakers
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Artists, musicians, and visionaries who collect not just
                    objects, but meaning.
                  </p>
                </div>
              </div>
            </RevealItem>
          </SectionReveal>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-6 lg:mx-12 border-t border-border/20" />

      {/* CTA */}
      <section className="py-32 px-6 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <SectionReveal className="flex flex-col items-center">
            <RevealItem>
              <h2 className="text-3xl md:text-6xl font-serif font-normal tracking-[-0.01em] text-foreground leading-[1.1]">
                Ready to acquire the exceptional?
              </h2>
            </RevealItem>
            <RevealItem>
              <p className="mt-4 text-muted-foreground text-sm md:text-base">
                Join our private community and be first to know.
              </p>
            </RevealItem>
            <RevealItem>
              <div className="mt-10">
                <CTAButton label="Request Access" onClick={() => setModalOpen(true)} />
              </div>
            </RevealItem>
          </SectionReveal>
        </div>
      </section>

      <Footer />

      <RequestAccessModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  )
}
