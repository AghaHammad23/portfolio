"use client"

import { useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { BsMoon, BsSun } from "react-icons/bs"
import { useTheme } from "@/lib/useTheme"

const LIGHT = "#FD802E"
const DARK = "#233D4C"

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact Us", href: "/contact" },
]

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { x: -60, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
}

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === "dark"

  // Lines must contrast with whatever is behind the button.
  // Closed: behind is the page (light/dark). Open: behind is the overlay (inverted).
  const closedLine = isDark ? LIGHT : DARK
  const openLine = isDark ? DARK : LIGHT
  const lineColor = isOpen ? openLine : closedLine

  // Overlay and text colors (overlay bg is always the inverse of the page)
  const overlayBg = isDark ? LIGHT : DARK
  const textColor = isDark ? DARK : LIGHT
  const hoverBg = isDark ? DARK : LIGHT
  const hoverText = isDark ? LIGHT : DARK
  const borderColor = isDark ? "rgba(26,26,26,0.15)" : "rgba(245,240,232,0.15)"

  return (
    <>
      {/* ——— Hamburger button ——— */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="fixed top-6 right-6 z-50 flex flex-col justify-center gap-[6px] p-2 cursor-pointer"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <motion.span
          className="block h-[2px] w-7 origin-center"
          animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0, backgroundColor: lineColor }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="block h-[2px] w-7"
          animate={{ opacity: isOpen ? 0 : 1, backgroundColor: lineColor }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="block h-[2px] w-7 origin-center"
          animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0, backgroundColor: lineColor }}
          transition={{ duration: 0.3 }}
        />
      </button>

      {/* ——— Full-screen overlay ——— */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex flex-col"
            style={{ backgroundColor: overlayBg }}
          >
            {/* Nav list */}
            <motion.ul
              variants={listVariants}
              initial="hidden"
              animate="visible"
              className="flex-1 flex flex-col justify-center"
            >
              {NAV_ITEMS.map(({ label, href }) => (
                <motion.li
                  key={label}
                  variants={itemVariants}
                  onHoverStart={() => setHoveredItem(label)}
                  onHoverEnd={() => setHoveredItem(null)}
                >
                  <Link
                    href={href}
                    onClick={() => setIsOpen(false)}
                    style={{
                      display: "block",
                      paddingInline: "clamp(2rem, 5vw, 5rem)",
                      paddingBlock: "clamp(0.6rem, 1.5vw, 1.2rem)",
                      borderBottom: `1px solid ${borderColor}`,
                      color: hoveredItem === label ? hoverText : textColor,
                      backgroundColor: hoveredItem === label ? hoverBg : "transparent",
                      transition: "background-color 0.2s, color 0.2s",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "clamp(2.5rem, 6vw, 5rem)",
                        fontWeight: 700,
                        lineHeight: 1.1,
                        display: "block",
                      }}
                    >
                      {label}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            {/* Theme toggle — bottom left */}
            <div style={{ padding: "clamp(1.5rem, 3vw, 3rem)" }}>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 text-sm font-medium cursor-pointer"
                style={{
                  color: textColor,
                  opacity: 0.8,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
              >
                {isDark ? <BsSun size={18} /> : <BsMoon size={18} />}
                <span>{isDark ? "Light" : "Dark"}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
