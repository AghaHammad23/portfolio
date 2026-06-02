"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useTheme } from "@/lib/useTheme"

const LIGHT  = "#F5F0E8"
const DARK   = "#1A1A1A"
const ACCENT = "#E8453C"

const DISCIPLINES = [
  "AI Automation",
  "n8n Workflows",
  "AI Agents",
  "Web Development",
  "UI Design",
]

// ─── Curtain / printing-press text reveal ─────────────────────────────────
// Parent must clip overflow; child slides up from below the mask line.
function SlideReveal({
  children,
  delay,
  isVisible,
}: {
  children: React.ReactNode
  delay: number
  isVisible: boolean
}) {
  return (
    <div style={{ overflow: "hidden" }}>
      <motion.div
        initial={{ y: "110%" }}
        animate={isVisible ? { y: "0%" } : { y: "110%" }}
        transition={{ duration: 0.92, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}

// ─── Hero ──────────────────────────────────────────────────────────────────
export default function Hero({ isVisible }: { isVisible: boolean }) {
  const sectionRef = useRef<HTMLElement>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const [sectionTop, setSectionTop]       = useState(0)
  const [sectionHeight, setSectionHeight] = useState(1)
  const [primaryHovered, setPrimaryHovered]     = useState(false)
  const [secondaryHovered, setSecondaryHovered] = useState(false)

  const { scrollY } = useScroll()

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const measure = () => {
      setSectionTop(el.getBoundingClientRect().top + window.scrollY)
      setSectionHeight(el.offsetHeight)
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  const scrollYProgress = useTransform(
    scrollY,
    [sectionTop, sectionTop + sectionHeight],
    [0, 1]
  )

  // Scroll-driven exit — left content fades first, photo lingers
  const leftOpacity  = useTransform(scrollYProgress, [0, 0.38], [1, 0])
  const photoY       = useTransform(scrollYProgress, [0, 0.8],  [0, 70])
  const photoOpacity = useTransform(scrollYProgress, [0.38, 0.78], [1, 0])

  const fg         = isDark ? LIGHT : DARK
  const pageBg     = isDark ? DARK  : LIGHT
  const borderLine = isDark ? "rgba(245,240,232,0.09)"  : "rgba(26,26,26,0.09)"
  const borderMid  = isDark ? "rgba(245,240,232,0.13)"  : "rgba(26,26,26,0.13)"
  const muteText   = isDark ? "rgba(245,240,232,0.32)"  : "rgba(26,26,26,0.32)"

  const fadeIn = (delay: number) => ({
    initial:    { opacity: 0 },
    animate:    isVisible ? { opacity: 1 } : { opacity: 0 },
    transition: { duration: 0.7, ease: "easeOut" as const, delay },
  })

  return (
    <section ref={sectionRef} style={{ height: "160vh", position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          backgroundColor: pageBg,
          display: "flex",
          flexDirection: "column",
        }}
      >

        {/* ── Top info bar ─────────────────────────────────────────── */}
        <motion.div
          {...fadeIn(0.05)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingInline: "clamp(1.5rem, 4.5vw, 4.5rem)",
            height: "52px",
            flexShrink: 0,
            borderBottom: `1px solid ${borderLine}`,
          }}
        >
         
          <span className="hidden md:block" style={{
            fontSize: "2rem", fontWeight: 200,
            letterSpacing: "0.18em", color: ACCENT, textTransform: "uppercase",
          }}>
            Agha Hammad Ahmed
          </span>
         
        </motion.div>

        {/* ── Main two-column grid ─────────────────────────────────── */}
        <div
          className="flex flex-col md:flex-row"
          style={{ flex: 1, minHeight: 0, position: "relative" }}
        >

          {/* ── Left: editorial text content ── */}
          <motion.div
            className="order-2 md:order-1 flex-1 md:flex-none md:w-1/2 flex flex-col justify-center relative"
            style={{
              opacity: leftOpacity,
              paddingInline: "clamp(1.5rem, 4.5vw, 4.5rem)",
              paddingBlock: "clamp(1.5rem, 3vh, 3rem)",
            }}
          >
            {/* Vertical divider — desktop only */}
            <div
              className="hidden md:block absolute top-0 right-0 bottom-0"
              style={{ width: "1px", backgroundColor: borderMid, zIndex: 1 }}
            />

            {/* Discipline label */}
            <motion.div {...fadeIn(0.2)} style={{ marginBottom: "1.75rem" }}>
              <span style={{
                fontSize: "0.57rem", fontWeight: 500,
                letterSpacing: "0.32em", color: ACCENT, textTransform: "uppercase",
              }}>
                Web Development
              </span>
            </motion.div>

            {/* ── Headline: three typographic treatments ── */}
            <div>
      

              {/* SYSTEMS — outlined in accent stroke */}
              <SlideReveal delay={0.44} isVisible={isVisible}>
                <div style={{
                  fontSize: "clamp(3rem, 8.5vw, 9.75rem)",
                  fontWeight: 900, lineHeight: 0.875,
                  letterSpacing: "-0.04em",
                  color: "transparent",
                  WebkitTextStroke: `max(1.5px, 0.18vw) ${ACCENT}`,
                }}>
                  Frontend
                </div>
              </SlideReveal>

              {/* ARCHITECT — ghost, thin weight, creates 3rd hierarchy level */}
              <SlideReveal delay={0.56} isVisible={isVisible}>
                <div style={{
                  fontSize: "clamp(3rem, 8.5vw, 9.75rem)",
                  fontWeight: 300, lineHeight: 0.875,
                  letterSpacing: "-0.04em",
                  color: LIGHT, opacity: 0.13,
                }}>
                   Developer
                </div>
              </SlideReveal>
            </div>

            {/* Ruled divider — draws left to right */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.72 }}
              style={{
                height: "1px",
                backgroundColor: borderMid,
                marginBlock: "clamp(1.25rem, 3vh, 2rem)",
                transformOrigin: "left center",
              }}
            />

            {/* Statement */}
            <motion.p
              {...fadeIn(0.82)}
              style={{
                color: fg, opacity: 0.48,
                fontSize: "clamp(0.875rem, 1.05vw, 1rem)",
                lineHeight: 1.85, maxWidth: "400px",
                marginBottom: "clamp(1.5rem, 3vh, 2.25rem)",
              }}
            >
              I engineer AI-powered systems and digital products — from
              intelligent automation workflows to precision-crafted web
              experiences.
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...fadeIn(0.94)}
              style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}
            >
              <a
                href="#projects"
                onMouseEnter={() => setPrimaryHovered(true)}
                onMouseLeave={() => setPrimaryHovered(false)}
                style={{
                  display: "inline-flex", alignItems: "center",
                  padding: "0.75rem 1.75rem",
                  backgroundColor: primaryHovered ? ACCENT : fg,
                  color: primaryHovered ? "#fff" : pageBg,
                  fontSize: "0.67rem", fontWeight: 600, borderRadius: 0,
                  textDecoration: "none", letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  transition: "background-color 0.22s, color 0.22s",
                  border: "1px solid transparent",
                }}
              >
                View Work
              </a>
              <a
                href="#contact"
                onMouseEnter={() => setSecondaryHovered(true)}
                onMouseLeave={() => setSecondaryHovered(false)}
                style={{
                  display: "inline-flex", alignItems: "center",
                  padding: "0.75rem 1.75rem",
                  backgroundColor: "transparent",
                  color: secondaryHovered ? ACCENT : fg,
                  border: `1px solid ${secondaryHovered ? ACCENT : borderMid}`,
                  fontSize: "0.67rem", fontWeight: 500, borderRadius: 0,
                  textDecoration: "none", letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  transition: "color 0.22s, border-color 0.22s",
                }}
              >
                Get In Touch
              </a>
            </motion.div>
          </motion.div>

          {/* ── Right: portrait photo ── */}
          <div
            className="order-1 md:order-2 shrink-0 h-[42vh] md:h-auto md:w-1/2 relative overflow-hidden"
          >
            {/* Bottom gradient — bleeds photo into page bg */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: "50%",
              background: `linear-gradient(to bottom, transparent, ${pageBg})`,
              zIndex: 2, pointerEvents: "none",
            }} />

            <motion.div {...fadeIn(0.1)} style={{ height: "100%" }}>
              <motion.div style={{ y: photoY, opacity: photoOpacity, height: "100%", willChange: "transform, opacity" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/profile.png"
                  alt="Agha Hammad Ahmed"
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "cover", objectPosition: "center top",
                  }}
                />
              </motion.div>
            </motion.div>
          </div>

        </div>

        {/* ── Bottom disciplines strip ──────────────────────────────── */}
        <motion.div
          {...fadeIn(1.05)}
          className="hidden md:flex"
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: "48px",
            flexShrink: 0,
            borderTop: `1px solid ${borderLine}`,
            overflow: "hidden",
          }}
        >
          {DISCIPLINES.map((d, i) => (
            <span key={d} style={{ display: "flex", alignItems: "center" }}>
              <span style={{
                fontSize: "0.57rem", fontWeight: 500,
                letterSpacing: "0.22em", color: muteText, textTransform: "uppercase",
                paddingInline: "clamp(0.75rem, 2vw, 2.25rem)",
                whiteSpace: "nowrap",
              }}>
                {d}
              </span>
              {i < DISCIPLINES.length - 1 && (
                <span style={{ color: ACCENT, fontSize: "0.4rem", opacity: 0.45 }}>◆</span>
              )}
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
