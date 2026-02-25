"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useMediaQuery } from "@/hooks/use-media-query"

type Layer = "foreground" | "mid" | "background"

interface FloatingItemData {
  src: string
  alt: string
  top: string
  left: string
  w: number
  layer: Layer
  rotate: number
  /** Minimum breakpoint to show this item: "mobile" | "tablet" | "desktop" */
  minBp: "mobile" | "tablet" | "desktop"
}

const layerStyles: Record<Layer, { opacity: number; blurMin: number; blurMax: number; scaleMin: number; scaleMax: number; zMin: number; zMax: number }> = {
  foreground: { opacity: 0.78, blurMin: 0, blurMax: 1, scaleMin: 1.0, scaleMax: 1.05, zMin: 30, zMax: 40 },
  mid:        { opacity: 0.6,  blurMin: 2, blurMax: 4, scaleMin: 0.92, scaleMax: 0.98, zMin: 20, zMax: 29 },
  background: { opacity: 0.35, blurMin: 6, blurMax: 10, scaleMin: 0.85, scaleMax: 0.92, zMin: 10, zMax: 19 },
}

// Seeded pseudo-random per index for consistent values
function seeded(i: number, min: number, max: number) {
  const t = ((i * 7 + 3) % 11) / 10
  return min + t * (max - min)
}

// ── DESKTOP: all 12 items ─────────────────────────────────────────
const itemsDesktop: FloatingItemData[] = [
  // TOP-LEFT CLUSTER
  { src: "/images/item-1.jpg",  alt: "Cartier Tank watch",       top: "6%",  left: "5%",  w: 160, layer: "mid",        rotate: -4, minBp: "mobile" },
  { src: "/images/item-2.jpg",  alt: "Designer handbag",         top: "14%", left: "17%", w: 120, layer: "background", rotate: 5,  minBp: "desktop" },
  { src: "/images/item-3.jpg",  alt: "Rare sneakers",            top: "2%",  left: "24%", w: 140, layer: "foreground", rotate: 2,  minBp: "mobile" },

  // TOP-RIGHT CLUSTER
  { src: "/images/item-4.jpg",  alt: "Diamond ring",             top: "5%",  left: "76%", w: 150, layer: "mid",        rotate: 3,  minBp: "mobile" },
  { src: "/images/item-5.jpg",  alt: "Couture jacket",           top: "16%", left: "88%", w: 120, layer: "background", rotate: -5, minBp: "desktop" },
  { src: "/images/item-6.jpg",  alt: "Collectible Bearbrick",    top: "10%", left: "64%", w: 170, layer: "foreground", rotate: -2, minBp: "tablet" },

  // MID EDGES
  { src: "/images/item-7.jpg",  alt: "Rare succulent",           top: "46%", left: "3%",  w: 170, layer: "foreground", rotate: 4,  minBp: "mobile" },
  { src: "/images/item-8.jpg",  alt: "Rolex Submariner",         top: "44%", left: "85%", w: 160, layer: "mid",        rotate: -3, minBp: "mobile" },

  // BOTTOM-LEFT CLUSTER
  { src: "/images/item-9.jpg",  alt: "KAWS art toy",             top: "76%", left: "8%",  w: 170, layer: "mid",        rotate: 2,  minBp: "mobile" },
  { src: "/images/item-10.jpg", alt: "Bonsai tree",              top: "84%", left: "24%", w: 130, layer: "background", rotate: -4, minBp: "tablet" },

  // BOTTOM-RIGHT CLUSTER
  { src: "/images/item-11.jpg", alt: "Satin bomber jacket",      top: "78%", left: "70%", w: 180, layer: "foreground", rotate: -2, minBp: "mobile" },
  { src: "/images/item-12.jpg", alt: "Audemars Piguet watch",    top: "85%", left: "87%", w: 130, layer: "background", rotate: 5,  minBp: "tablet" },
]

// ── TABLET overrides (10 items: hide 2 background) ───────────────
const itemsTablet: FloatingItemData[] = itemsDesktop
  .filter((item) => item.minBp !== "desktop")
  .map((item) => ({
    ...item,
    w: Math.round(item.w * 0.9),
  }))

// ── MOBILE overrides (8 items: hide 4 bg/tab) ────────────────────
const itemsMobile: FloatingItemData[] = itemsDesktop
  .filter((item) => item.minBp === "mobile")
  .map((item) => {
    // Reposition for mobile: push items further to edges & away from top-center nav
    // Mobile: push top items below the fixed navbar (~80px) and avoid hero headline center
    const mobileOverrides: Record<string, { top: string; left: string }> = {
      "/images/item-1.jpg":  { top: "12%", left: "2%" },
      "/images/item-3.jpg":  { top: "10%", left: "70%" },
      "/images/item-4.jpg":  { top: "22%", left: "78%" },
      "/images/item-7.jpg":  { top: "52%", left: "1%" },
      "/images/item-8.jpg":  { top: "50%", left: "80%" },
      "/images/item-9.jpg":  { top: "82%", left: "4%" },
      "/images/item-11.jpg": { top: "80%", left: "66%" },
    }
    const override = mobileOverrides[item.src]
    return {
      ...item,
      ...(override || {}),
      w: Math.round(item.w * 0.65),
    }
  })

function FloatingItem({
  item,
  index,
  mouseX,
  mouseY,
}: {
  item: FloatingItemData
  index: number
  mouseX: number
  mouseY: number
}) {
  const ls = layerStyles[item.layer]
  const blur = seeded(index, ls.blurMin, ls.blurMax)
  const scale = seeded(index, ls.scaleMin, ls.scaleMax)
  const zIndex = Math.round(seeded(index, ls.zMin, ls.zMax))

  // Deeper layers get stronger parallax (move more = further away feel)
  const parallaxMultiplier = item.layer === "background" ? 22 : item.layer === "mid" ? 14 : 6
  const px = mouseX * parallaxMultiplier
  const py = mouseY * parallaxMultiplier

  // Drift: randomised per item
  const driftY = 6 + (index % 5) * 2     // 6–14px
  const driftX = 2 + (index % 4) * 2     // 2–8px
  const driftDuration = 8 + (index % 5) * 2 // 8–16s

  const aspectRatio = item.w > 160 ? 1.25 : 1.3
  const h = Math.round(item.w * aspectRatio)

  return (
    <motion.div
      initial={{ opacity: 0, scale: scale * 0.8 }}
      animate={{
        opacity: ls.opacity,
        scale,
        x: px,
        y: py,
      }}
      transition={{
        opacity: { duration: 1.6, delay: index * 0.15 },
        scale: { duration: 1.6, delay: index * 0.15 },
        x: { type: "spring", stiffness: 20, damping: 28 },
        y: { type: "spring", stiffness: 20, damping: 28 },
      }}
      className="absolute"
      style={{
        top: item.top,
        left: item.left,
        filter: `blur(${blur}px)`,
        zIndex,
        transform: `rotate(${item.rotate}deg)`,
      }}
    >
      <motion.div
        animate={{
          y: [0, -driftY, 0],
          x: [0, driftX, 0],
        }}
        transition={{
          duration: driftDuration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="rounded-xl overflow-hidden shadow-2xl shadow-black/50">
          <Image
            src={item.src}
            alt={item.alt}
            width={item.w}
            height={h}
            className="object-cover rounded-xl"
            style={{ width: item.w, height: h }}
            loading="lazy"
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

export function FloatingItems() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const isTablet = useMediaQuery("(min-width: 640px)")

  const items = isDesktop ? itemsDesktop : isTablet ? itemsTablet : itemsMobile

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMouse({ x, y })
  }, [])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [handleMouseMove])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map((item, i) => (
        <FloatingItem
          key={item.src}
          item={item}
          index={i}
          mouseX={mouse.x}
          mouseY={mouse.y}
        />
      ))}
    </div>
  )
}
