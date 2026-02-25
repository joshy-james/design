"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { RequestAccessModal } from "@/components/request-access-modal"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  return (
    <>
      {/* ── Navbar bar ── z-[60] — above hero content (z-50) & floating items (z-10–40) */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
          scrolled
            ? "bg-background/60 backdrop-blur-xl border-b border-border/30"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex items-center justify-between px-6 py-5 lg:px-12">
          {/* Left: Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="text-foreground text-sm font-bold tracking-[0.3em] uppercase">
              ORBITARA
            </span>
          </Link>

          {/* Right: Nav links + Sign Up (desktop) */}
          <div className="hidden md:flex items-center gap-10">
            <Link
              href="/"
              className={`text-xs tracking-[0.15em] uppercase transition-colors duration-300 ${
                pathname === "/"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Shop With Us
            </Link>
            <Link
              href="/about"
              className={`text-xs tracking-[0.15em] uppercase transition-colors duration-300 ${
                pathname === "/about"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              About Us
            </Link>
            <button
              onClick={() => setModalOpen(true)}
              className="text-xs tracking-[0.15em] uppercase bg-foreground text-background px-5 py-2.5 rounded-full hover:bg-foreground/90 transition-all duration-300"
            >
              Sign Up
            </button>
          </div>

          {/* Mobile hamburger — same z as nav */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-foreground relative z-[70]"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={22} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={22} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile fullscreen menu ── z-[65] — above nav bar (z-[60]), below close btn (z-[70]) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-[65] bg-background/98 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            {/* Nav links with staggered entrance */}
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
                hidden: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
              }}
              className="flex flex-col items-center gap-8"
            >
              {[
                { href: "/", label: "Shop With Us" },
                { href: "/about", label: "About Us" },
              ].map((link) => (
                <motion.div
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <Link
                    href={link.href}
                    className={`text-2xl font-serif font-light tracking-[0.1em] uppercase transition-colors duration-300 ${
                      pathname === link.href
                        ? "text-foreground"
                        : "text-foreground/60 hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="mt-6"
              >
                <button
                  onClick={() => {
                    setMobileOpen(false)
                    // Small delay so menu closes before modal opens
                    setTimeout(() => setModalOpen(true), 300)
                  }}
                  className="text-sm tracking-[0.15em] uppercase bg-foreground text-background px-8 py-3.5 rounded-full hover:bg-foreground/90 transition-all duration-300"
                >
                  Sign Up
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Modal ── z-[80] managed internally */}
      <RequestAccessModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
