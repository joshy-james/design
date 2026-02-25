import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border/30 py-12 px-6 lg:px-12">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-medium">
          ORBITARA
        </span>
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-xs tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-xs tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            About
          </Link>
        </div>
        <span className="text-xs text-muted-foreground/50">
          {new Date().getFullYear()} All rights reserved.
        </span>
      </div>
    </footer>
  )
}
