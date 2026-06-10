"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { FiStar } from "react-icons/fi"
import { useTheme } from "@/lib/useTheme"

const LIGHT = "#FD802E"
const DARK = "#233D4C"
const ACCENT = "#FACC15"

const SMALL_CARDS = [
  {
    quote:
      "The attention to detail is insane. Every animation, every hover state — nothing was an afterthought.",
    author: "Marcus Webb",
    role: "CTO, Stackflow",
  },
  {
    quote:
      "Delivered ahead of schedule and the site performs perfectly on every device. Rare combination.",
    author: "Priya Nair",
    role: "Product Lead, Forge",
  },
  {
    quote:
      "I've worked with a lot of developers. Hammad is the first one who genuinely cared about the end result.",
    author: "James Okafor",
    role: "CEO, Meridian",
  },
]

function TestimonialCard({
  quote,
  author,
  role,
  delay,
  isInView,
  isDark,
}: {
  quote: string
  author: string
  role: string
  delay: number
  isInView: boolean
  isDark: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)
  // Card bg is opposite of page bg
  const fg = isDark ? DARK : LIGHT
  const cardBg = isDark ? LIGHT : DARK
  const defaultBorder = isDark ? "rgba(35,61,76,0.2)" : "rgba(253,128,46,0.2)"

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: cardBg,
        border: `1px solid ${isHovered ? ACCENT : defaultBorder}`,
        borderRadius: "0.75rem",
        padding: "2rem 2.5rem",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.3s, transform 0.3s",
        transform: isHovered ? "translateY(-4px)" : "translateY(0px)",
      }}
    >
      {/* 5 stars */}
      <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1.25rem" }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <FiStar
            key={i}
            size={14}
            style={{ color: ACCENT, fill: ACCENT }}
          />
        ))}
      </div>

      {/* Quote */}
      <p
        style={{
          color: fg,
          fontSize: "0.95rem",
          lineHeight: 1.7,
          opacity: 0.8,
          flex: 1,
        }}
      >
        {quote}
      </p>

      {/* Author */}
      <div style={{ marginTop: "1.5rem" }}>
        <p style={{ color: fg, fontWeight: 600, fontSize: "0.9375rem" }}>{author}</p>
        <p style={{ color: fg, opacity: 0.5, fontSize: "0.85rem", marginTop: "0.2rem" }}>{role}</p>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const isInView = useInView(sectionRef as React.RefObject<Element>, { once: true, margin: "-80px" })

  const fg = isDark ? LIGHT : DARK
  const sectionBg = isDark ? DARK : LIGHT

  return (
    <section
      ref={sectionRef}
      className="w-full py-32 md:py-40"
      style={{
        paddingInline: "clamp(1.5rem, 5vw, 5rem)",
        backgroundColor: sectionBg,
      }}
    >
      {/* Section label */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 0.5, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          color: fg,
          fontSize: "0.75rem",
          fontWeight: 300,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          marginBottom: "1rem",
        }}
      >
        Kind Words
      </motion.p>

      {/* Large opening quote mark */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.8 } : { opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          color: ACCENT,
          fontSize: "clamp(6rem, 12vw, 10rem)",
          fontWeight: 800,
          lineHeight: 0.8,
          marginBottom: "1.5rem",
          userSelect: "none",
        }}
      >
        "
      </motion.div>

      {/* Featured quote */}
      <div style={{ maxWidth: "800px", marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
        <motion.blockquote
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          style={{
            color: fg,
            fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
            fontWeight: 300,
            lineHeight: 1.5,
            marginBottom: "2rem",
          }}
        >
          Working with Hammad was the best decision we made for our product. He didn't just build
          what we asked — he made it better than we imagined.
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
        >
          <p style={{ color: fg, fontWeight: 600, fontSize: "1rem" }}>
            — Sarah Chen,{" "}
            <span style={{ opacity: 0.5, fontWeight: 400 }}>Founder at Luminary</span>
          </p>
        </motion.div>
      </div>

      {/* Three smaller cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SMALL_CARDS.map(({ quote, author, role }, i) => (
          <TestimonialCard
            key={author}
            quote={quote}
            author={author}
            role={role}
            delay={0.4 + i * 0.1}
            isInView={isInView}
            isDark={isDark}
          />
        ))}
      </div>
    </section>
  )
}
