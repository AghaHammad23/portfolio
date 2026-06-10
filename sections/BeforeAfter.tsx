"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { FiX, FiCheck } from "react-icons/fi"
import { useTheme } from "@/lib/useTheme"

const LIGHT = "#FD802E"
const DARK = "#233D4C"
const RED = "#FACC15"
const GREEN = "#4CAF50"

const BEFORE_ITEMS = [
  "Generic templates that look like everyone else",
  "Slow load times and janky interactions",
  "Copy-pasted components with no soul",
  "Developer hands it off, designer confused",
  "Forgettable. Scrolled past.",
]

const AFTER_ITEMS = [
  "A site that looks like it cost 10x more",
  "Buttery smooth, sub-second interactions",
  "Every component crafted for your brand",
  "Design and dev in one brain, zero handoff",
  "Remembered. Shared. Bookmarked.",
]

interface ListItemProps {
  text: string
  isLeft: boolean
  delay: number
  isInView: boolean
  accentColor: string
  borderColor: string
  fg: string
  Icon: React.ComponentType<{ size?: number | string }>
}

function ListItem({ text, isLeft, delay, isInView, accentColor, borderColor, fg, Icon }: ListItemProps) {
  const [isHovered, setIsHovered] = useState(false)

  const hoverBg = accentColor === RED ? "rgba(232,69,60,0.04)" : "rgba(76,175,80,0.04)"

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -30 : 30 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "0.75rem",
        padding: "1.25rem 0.5rem",
        borderBottom: `1px solid ${borderColor}`,
        backgroundColor: isHovered ? hoverBg : "transparent",
        transition: "background-color 0.2s",
        borderRadius: "0.25rem 0.25rem 0 0",
      }}
    >
      <motion.span
        animate={{ scale: isHovered ? 1.2 : 1 }}
        transition={{ duration: 0.2 }}
        style={{ color: accentColor, flexShrink: 0, marginTop: "0.2rem", display: "inline-flex" }}
      >
        <Icon size={15} />
      </motion.span>
      <span
        style={{
          color: fg,
          fontSize: "1rem",
          lineHeight: 1.7,
          opacity: isHovered ? 1 : (isLeft ? 0.6 : 1),
          transition: "opacity 0.2s",
        }}
      >
        {text}
      </span>
    </motion.div>
  )
}

export default function BeforeAfter() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const isInView = useInView(sectionRef as React.RefObject<Element>, { once: true, margin: "-80px" })

  const fg = isDark ? LIGHT : DARK
  const pageBg = isDark ? DARK : LIGHT
  const borderColor = isDark ? "rgba(245,240,232,0.08)" : "rgba(26,26,26,0.08)"
  const columnLineColor = isDark ? "rgba(245,240,232,0.15)" : "rgba(26,26,26,0.15)"
  const dividerColor = isDark ? "rgba(245,240,232,0.1)" : "rgba(26,26,26,0.1)"
  const vsBorderColor = isDark ? "rgba(245,240,232,0.2)" : "rgba(26,26,26,0.2)"

  return (
    <section
      ref={sectionRef}
      className="w-full py-32 md:py-40"
      style={{ paddingInline: "clamp(1.5rem, 5vw, 5rem)" }}
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
          marginBottom: "1.25rem",
        }}
      >
        The Difference
      </motion.p>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        style={{
          color: fg,
          fontSize: "clamp(2.5rem, 5vw, 4rem)",
          fontWeight: 700,
          lineHeight: 1.1,
          marginBottom: "clamp(3rem, 6vw, 5rem)",
        }}
      >
        <div>Working with me</div>
        <div>changes things</div>
      </motion.h2>

      {/* Columns grid */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">

        {/* Left: Before */}
        <div>
          <p
            style={{
              color: fg,
              opacity: 0.4,
              fontSize: "0.75rem",
              fontWeight: 300,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "2rem",
            }}
          >
            Before
          </p>
          <div >
            {BEFORE_ITEMS.map((text, i) => (
              <ListItem
                key={text}
                text={text}
                isLeft={true}
                delay={i * 0.08}
                isInView={isInView}
                accentColor={RED}
                borderColor={borderColor}
                fg={fg}
                Icon={FiX}
              />
            ))}
          </div>
        </div>

        {/* Right: After */}
        <div>
          <p
            style={{
              color: fg,
              opacity: 0.4,
              fontSize: "0.75rem",
              fontWeight: 300,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "2rem",
            }}
          >
            After
          </p>
          <div>
            {AFTER_ITEMS.map((text, i) => (
              <ListItem
                key={text}
                text={text}
                isLeft={false}
                delay={0.2 + i * 0.08}
                isInView={isInView}
                accentColor={GREEN}
                borderColor={borderColor}
                fg={fg}
                Icon={FiCheck}
              />
            ))}
          </div>
        </div>

        {/* VS divider — desktop only, centered in the gap */}
        <div
          className="hidden md:flex absolute inset-y-0 left-1/2 -translate-x-1/2 flex-col items-center"
          style={{ width: "1px" }}
        >
          <div style={{ flex: 1, width: "1px", backgroundColor: dividerColor }} />
          <div
            style={{
              flexShrink: 0,
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "999px",
              border: `1px solid ${vsBorderColor}`,
              backgroundColor: pageBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.65rem",
              fontWeight: 600,
              color: fg,
              letterSpacing: "0.05em",
            }}
          >
            VS
          </div>
          <div style={{ flex: 1, width: "1px", backgroundColor: dividerColor }} />
        </div>

      </div>
    </section>
  )
}
