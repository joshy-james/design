"use client"

import { motion } from "framer-motion"

interface CTAButtonProps {
  label: string
  onClick?: () => void
  variant?: "primary" | "outline"
  className?: string
}

export function CTAButton({ label, onClick, variant = "primary", className = "" }: CTAButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`
        text-sm font-medium tracking-[0.15em] uppercase rounded-full transition-all duration-300
        ${variant === "primary"
          ? "bg-foreground text-background px-8 py-3.5 hover:bg-foreground/90"
          : "border border-[rgba(255,255,255,0.15)] text-foreground px-8 py-3.5 hover:bg-[rgba(255,255,255,0.05)]"
        }
        ${className}
      `}
    >
      {label}
    </motion.button>
  )
}
