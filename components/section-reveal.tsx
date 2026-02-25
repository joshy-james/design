"use client"

import { motion } from "framer-motion"

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
}

interface SectionRevealProps {
  children: React.ReactNode
  className?: string
}

export function SectionReveal({ children, className = "" }: SectionRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({ children, className = "" }: SectionRevealProps) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  )
}
