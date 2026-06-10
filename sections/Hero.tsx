"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useTheme } from "@/lib/useTheme"

const LIGHT  = "#FD802E"
const DARK   = "#233D4C"
const ACCENT = "#FACC15"

// Text slides up from behind an invisible baseline — the "printing press" reveal.
// Parent clips overflow so text is invisible until it crosses the threshold.
function MaskReveal({
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
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default function Hero({ isVisible }: { isVisible: boolean }) {
  const sectionRef    = useRef<HTMLElement>(null)
  const { theme }     = useTheme()
  const isDark        = theme === "dark"

  const [sectionTop, setSectionTop]             = useState(0)
  const [sectionHeight, setSectionHeight]       = useState(1)
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

  // Left word drifts left, right word drifts right as page scrolls
  const hamX         = useTransform(scrollYProgress, [0, 0.5], [0, -40])
  const madX         = useTransform(scrollYProgress, [0, 0.5], [0,  40])
  const photoScale   = useTransform(scrollYProgress, [0, 0.6], [1, 1.08])
  const photoOpacity = useTransform(scrollYProgress, [0.28, 0.68], [1, 0])
  const heroOpacity  = useTransform(scrollYProgress, [0,    0.45], [1, 0])

  const fg         = isDark ? LIGHT : DARK
  const pageBg     = isDark ? DARK  : LIGHT
  const borderLine = isDark ? "rgba(245,240,232,0.09)"  : "rgba(26,26,26,0.09)"
  const borderMid  = isDark ? "rgba(245,240,232,0.12)"  : "rgba(26,26,26,0.12)"
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

  

        {/* ── Central composition ──────────────────────────────── */}
        <motion.div style={{ flex: 1, minHeight: 0, opacity: heroOpacity }}>

          {/* DESKTOP: HAM | portrait | MAD — name wraps around the portrait */}
          <div
            className="hidden md:flex"
            style={{
              height: "100%",
              alignItems: "center",
              paddingInline: "clamp(1.5rem, 4.5vw, 4.5rem)",
            }}
          >

            {/* ── Left: "HAM" ── */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "flex-start",
                position: "relative",
                zIndex: 1,
              }}
            >
              {/* "Agha" — editorial label above the word */}
              <MaskReveal delay={0.1} isVisible={isVisible}>
                <div style={{
                  fontSize: "clamp(0.6rem, 1vw, 0.85rem)",
                  fontWeight: 300,
                  letterSpacing: "0.45em",
                  textTransform: "uppercase",
                  color: muteText,
                  marginBottom: "0.15em",
                }}>
                  Agha
                </div>
              </MaskReveal>

              {/* HAM — slides in from left */}
              <motion.div style={{ x: hamX }}>
                <motion.div
                  initial={{ x: "-100px", opacity: 0 }}
                  animate={isVisible ? { x: "0px", opacity: 1 } : { x: "-100px", opacity: 0 }}
                  transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: 0.26 }}
                >
                  <div style={{
                    fontSize: "clamp(5rem, 17vw, 19.5rem)",
                    fontWeight: 900,
                    lineHeight: 0.82,
                    letterSpacing: "-0.04em",
                    color: fg,
                    userSelect: "none",
                  }}>
                    HAM
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* ── Center: portrait photo — z-index 2, slightly overlaps both words ── */}
            <motion.div
              {...fadeIn(0.16)}
              style={{
                flexShrink: 0,
                width: "clamp(140px, 19vw, 270px)",
                alignSelf: "stretch",
                position: "relative",
                overflow: "hidden",
                zIndex: 2,
                marginInline: "-2.5vw",  // overlaps the inner edges of HAM and MAD
                marginTop: "clamp(0.5rem, 1.5vw, 1.5rem)",
              }}
            >
              {/* Bottom gradient — photo bleeds into page bg */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "35%",
                background: `linear-gradient(to bottom, transparent, ${pageBg})`,
                zIndex: 3, pointerEvents: "none",
              }} />
              <motion.div
                style={{ scale: photoScale, opacity: photoOpacity, height: "100%", willChange: "transform, opacity" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/profile.png"
                  alt="Agha Hammad Ahmed"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
                />
              </motion.div>
            </motion.div>

            {/* ── Right: "MAD" (outlined) ── */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                position: "relative",
                zIndex: 1,
              }}
            >
              {/* MAD — slides in from right, outlined treatment */}
              <motion.div style={{ x: madX }}>
                <motion.div
                  initial={{ x: "100px", opacity: 0 }}
                  animate={isVisible ? { x: "0px", opacity: 1 } : { x: "100px", opacity: 0 }}
                  transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: 0.26 }}
                >
                  <div style={{
                    fontSize: "clamp(5rem, 17vw, 19.5rem)",
                    fontWeight: 900,
                    lineHeight: 0.82,
                    letterSpacing: "-0.04em",
                    color: "transparent",
                    WebkitTextStroke: `max(1.5px, 0.13vw) ${fg}`,
                    userSelect: "none",
                  }}>
                    MAD
                  </div>
                </motion.div>
              </motion.div>

              {/* "Ahmed" — editorial label below the word */}
              <MaskReveal delay={0.1} isVisible={isVisible}>
                <div style={{
                  fontSize: "clamp(0.6rem, 1vw, 0.85rem)",
                  fontWeight: 300,
                  letterSpacing: "0.45em",
                  textTransform: "uppercase",
                  color: muteText,
                  marginTop: "0.15em",
                  textAlign: "right",
                }}>
                  Ahmed
                </div>
              </MaskReveal>
            </div>

          </div>

          {/* MOBILE: stacked portrait + full name */}
          <div
            className="flex flex-col md:hidden"
            style={{ height: "100%", paddingInline: "clamp(1.25rem, 4vw, 3rem)" }}
          >
            <motion.div
              {...fadeIn(0.12)}
              style={{ flex: "0 0 44%", position: "relative", overflow: "hidden" }}
            >
              <motion.div style={{ opacity: photoOpacity, height: "100%" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/profile.png"
                  alt="Agha Hammad Ahmed"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
                />
              </motion.div>
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "40%",
                background: `linear-gradient(to bottom, transparent, ${pageBg})`,
                zIndex: 2, pointerEvents: "none",
              }} />
            </motion.div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <MaskReveal delay={0.2} isVisible={isVisible}>
                <div style={{ fontSize: "0.58rem", fontWeight: 300, letterSpacing: "0.45em", textTransform: "uppercase", color: muteText, marginBottom: "0.5rem" }}>
                  Agha · Ahmed
                </div>
              </MaskReveal>
              <MaskReveal delay={0.32} isVisible={isVisible}>
                <div style={{
                  fontSize: "clamp(4.5rem, 17vw, 7rem)",
                  fontWeight: 900, lineHeight: 0.85,
                  letterSpacing: "-0.04em", color: fg,
                }}>
                  HAMMAD
                </div>
              </MaskReveal>
            </div>
          </div>

        </motion.div>

        {/* ── Bottom editorial bar ─────────────────────────────── */}
        <motion.div
          {...fadeIn(0.85)}
          style={{
            flexShrink: 0,
            borderTop: `1px solid ${borderLine}`,
          }}
        >
          <div
            className="flex flex-col md:flex-row"
            style={{ paddingInline: "clamp(1.5rem, 4.5vw, 4.5rem)" }}
          >

            {/* Zone 1: Role — desktop only */}
            <div
              className="hidden md:block"
              style={{
                paddingBlock: "1.1rem",
                paddingRight: "clamp(1.5rem, 3vw, 3rem)",
                flexShrink: 0,
                borderRight: `1px solid ${borderLine}`,
              }}
            >
              <div style={{ fontSize: "0.53rem", fontWeight: 400, letterSpacing: "0.28em", textTransform: "uppercase", color: muteText, marginBottom: "0.3rem" }}>
                Role
              </div>
              <div style={{ fontSize: "0.875rem", fontWeight: 600, color: fg, letterSpacing: "-0.01em" }}>
                Frontend Engineer
              </div>
            </div>

            {/* Zone 2: Statement — desktop only */}
            <div
              className="hidden md:block"
              style={{
                flex: 1,
                paddingBlock: "1.1rem",
                paddingInline: "clamp(1.5rem, 3vw, 3rem)",
                borderRight: `1px solid ${borderLine}`,
              }}
            >
              <div style={{ fontSize: "0.53rem", fontWeight: 400, letterSpacing: "0.28em", textTransform: "uppercase", color: muteText, marginBottom: "0.3rem" }}>
                Focus
              </div>
              <div style={{ fontSize: "0.875rem", color: fg, opacity: 0.5, lineHeight: 1.55, maxWidth: "440px" }}>
                Building web interfaces where every interaction feels intentional — where engineering and design become the same thing.
              </div>
            </div>

            {/* Zone 3: CTAs */}
            <div style={{
              paddingBlock: "1.1rem",
              paddingLeft: "clamp(1.5rem, 3vw, 3rem)",
              display: "flex", alignItems: "center",
              gap: "0.75rem", flexShrink: 0,
            }}>
              <a
                href="#projects"
                onMouseEnter={() => setPrimaryHovered(true)}
                onMouseLeave={() => setPrimaryHovered(false)}
                style={{
                  display: "inline-flex", alignItems: "center",
                  padding: "0.7rem 1.5rem",
                  backgroundColor: primaryHovered ? ACCENT : fg,
                  color: primaryHovered ? "#fff" : pageBg,
                  fontSize: "0.67rem", fontWeight: 600, borderRadius: 0,
                  textDecoration: "none", letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  transition: "background-color 0.22s, color 0.22s",
                  whiteSpace: "nowrap",
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
                  padding: "0.7rem 1.5rem",
                  backgroundColor: "transparent",
                  color: secondaryHovered ? ACCENT : fg,
                  border: `1px solid ${secondaryHovered ? ACCENT : borderMid}`,
                  fontSize: "0.67rem", fontWeight: 500, borderRadius: 0,
                  textDecoration: "none", letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  transition: "color 0.22s, border-color 0.22s",
                  whiteSpace: "nowrap",
                }}
              >
                Get In Touch
              </a>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}
