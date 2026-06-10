"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import { useTheme } from "@/lib/useTheme"

const LIGHT  = "#FD802E"
const DARK   = "#233D4C"
const ACCENT = "#FACC15"

const FLIGHT_PATH =
  "M-92 17.713c154.32 237.253 348.7 486.913 585.407 466.93 137.542-17.257 247.733-123.595 279.259-239.307 27.368-100.43-21.323-229.59-140.017-241.76-118.693-12.172-208.268 98.897-231.122 199.803-34.673 151.333 12.324 312.301 125.096 429.074C639.395 749.225 815.268 819.528 995 819"

interface CardData {
  id: string
  label: string
  lines: string[]
  fontSize: string
  fontWeight: number
  pos: React.CSSProperties
  scrollReveal: [number, number]
  floatAmt: number
  floatDur: number
  mobileHide?: boolean
}

const CARDS: CardData[] = [
  {
    id: "role",
    label: "Role",
    lines: ["Frontend", "Engineer"],
    fontSize: "clamp(1.6rem, 2.8vw, 2.8rem)",
    fontWeight: 800,
    pos: { top: "8%", left: "3%" },
    scrollReveal: [0.04, 0.18],
    floatAmt: 14, floatDur: 3.4,
  },
  {
    id: "stack",
    label: "Stack",
    lines: ["React · Next.js", "TypeScript"],
    fontSize: "clamp(1rem, 1.8vw, 1.8rem)",
    fontWeight: 700,
    pos: { top: "7%", right: "4%" },
    scrollReveal: [0.08, 0.22],
    floatAmt: 10, floatDur: 2.9,
  },
  {
    id: "years",
    label: "Experience",
    lines: ["3+", "Years"],
    fontSize: "clamp(2.2rem, 4.2vw, 4.2rem)",
    fontWeight: 900,
    pos: { top: "40%", left: "2%" },
    scrollReveal: [0.12, 0.26],
    floatAmt: 16, floatDur: 3.8,
    mobileHide: true,
  },
  {
    id: "available",
    label: "Status",
    lines: ["Available", "Worldwide"],
    fontSize: "clamp(1.2rem, 2vw, 2rem)",
    fontWeight: 700,
    pos: { top: "38%", right: "2.5%" },
    scrollReveal: [0.16, 0.30],
    floatAmt: 12, floatDur: 3.2,
    mobileHide: true,
  },
  {
    id: "projects",
    label: "Projects",
    lines: ["15+", "Projects"],
    fontSize: "clamp(2rem, 3.8vw, 3.8rem)",
    fontWeight: 900,
    pos: { bottom: "20%", left: "2.5%" },
    scrollReveal: [0.20, 0.34],
    floatAmt: 13, floatDur: 3.6,
    mobileHide: true,
  },
  {
    id: "open",
    label: "Availability",
    lines: ["Open to", "Work"],
    fontSize: "clamp(1.4rem, 2.4vw, 2.4rem)",
    fontWeight: 800,
    pos: { bottom: "22%", right: "3%" },
    scrollReveal: [0.24, 0.38],
    floatAmt: 11, floatDur: 2.7,
    mobileHide: true,
  },
  {
    id: "motion",
    label: "Animation",
    lines: ["Framer", "Motion"],
    fontSize: "clamp(0.95rem, 1.65vw, 1.55rem)",
    fontWeight: 600,
    pos: { bottom: "8%", left: "9%" },
    scrollReveal: [0.28, 0.42],
    floatAmt: 9, floatDur: 2.5,
    mobileHide: true,
  },
  {
    id: "tailwind",
    label: "Styling",
    lines: ["Tailwind", "CSS"],
    fontSize: "clamp(0.95rem, 1.65vw, 1.55rem)",
    fontWeight: 600,
    pos: { bottom: "6%", right: "9%" },
    scrollReveal: [0.32, 0.46],
    floatAmt: 10, floatDur: 3.1,
    mobileHide: true,
  },
]

// Renders one card: outer motion.div handles scroll reveal,
// inner motion.div handles the continuous float — two separate transforms.
function FloatingCard({
  card,
  scrollYProgress,
  isDark,
}: {
  card: CardData
  scrollYProgress: MotionValue<number>
  isDark: boolean
}) {
  // Cards use the opposite colour to the page background
  const cardBg  = isDark ? LIGHT : DARK
  const cardFg  = isDark ? DARK  : LIGHT
  // ACCENT label: visible on charcoal (light-mode card); subdued on orange (dark-mode card)
  const labelColor = isDark ? "rgba(35,61,76,0.55)" : ACCENT

  const opacity = useTransform(scrollYProgress, card.scrollReveal, [0, 1])
  const entryY  = useTransform(scrollYProgress, card.scrollReveal, [28, 0])

  return (
    <motion.div
      className={card.mobileHide ? "hidden md:block" : undefined}
      style={{
        position: "absolute",
        ...card.pos,
        opacity,
        y: entryY,
        zIndex: 5,
        willChange: "transform, opacity",
      }}
    >
      {/* Separate inner element for the perpetual float — no transform conflict */}
      <motion.div
        animate={{ y: [0, -card.floatAmt, 0] }}
        transition={{ duration: card.floatDur, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          style={{
            padding: "clamp(0.8rem, 1.4vw, 1.3rem) clamp(1rem, 1.8vw, 1.7rem)",
            backgroundColor: cardBg,
            border: `1px solid ${isDark ? "rgba(35,61,76,0.2)" : "rgba(253,128,46,0.18)"}`,
            borderRadius: "0.9rem",
            boxShadow: isDark
              ? "0 10px 40px rgba(0,0,0,0.3)"
              : "0 10px 40px rgba(35,61,76,0.15)",
          }}
        >
          <p
            style={{
              fontSize: "0.55rem",
              fontWeight: 400,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: labelColor,
              marginBottom: "0.4rem",
            }}
          >
            {card.label}
          </p>
          {card.lines.map((line, i) => (
            <p
              key={i}
              style={{
                fontSize: card.fontSize,
                fontWeight: card.fontWeight,
                color: cardFg,
                lineHeight: 1.0,
                letterSpacing: card.fontWeight >= 800 ? "-0.035em" : "-0.01em",
                marginTop: i > 0 ? "0.05em" : 0,
              }}
            >
              {line}
            </p>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const fg = isDark ? LIGHT : DARK
  const bg = isDark ? DARK  : LIGHT

  const wrapRef  = useRef<HTMLElement>(null)
  const pathRef  = useRef<SVGPathElement>(null)
  const planeRef = useRef<SVGGElement>(null)

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  })

  useEffect(() => {
    const path = pathRef.current
    if (!path) return
    const move = (p: number) => {
      const plane = planeRef.current
      if (!plane) return
      const total = path.getTotalLength()
      const len   = p * total
      const cur   = path.getPointAtLength(len)
      const prev  = path.getPointAtLength(Math.max(0, len - 1))
      const angle = Math.atan2(cur.y - prev.y, cur.x - prev.x) * (180 / Math.PI)
      plane.setAttribute("transform", `translate(${cur.x}, ${cur.y}) rotate(${angle})`)
    }
    move(0)
    return scrollYProgress.on("change", move)
  }, [scrollYProgress])

  return (
    <section ref={wrapRef} style={{ height: "250vh", position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          backgroundColor: bg,
          overflow: "hidden",
        }}
      >
        {/* ── Flight path + plane SVG ─────────────────────────────────── */}
        <svg
          viewBox="-92 0 1087 822"
          preserveAspectRatio="xMidYMid meet"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1 }}
        >
          {/* Invisible path — only used for getPointAtLength measurements */}
          <path ref={pathRef} d={FLIGHT_PATH} fill="none" stroke="none" />

          {/* Trail that draws itself on scroll */}
          <motion.path
            d={FLIGHT_PATH}
            fill="none"
            stroke={ACCENT}
            strokeWidth="3"
            strokeLinecap="round"
            style={{ pathLength: scrollYProgress }}
          />

          {/* Paper plane — moved by direct setAttribute, zero re-renders */}
          <g ref={planeRef}>
            <path d="M28 0 L-20 -14 L-12 0 L-20 14 Z" fill={fg} />
            <path d="M-12 0 L-20 14 L-6 20 Z" fill={fg} fillOpacity="0.4" />
          </g>
        </svg>

        {/* ── Floating detail cards ────────────────────────────────────── */}
        {CARDS.map(card => (
          <FloatingCard
            key={card.id}
            card={card}
            scrollYProgress={scrollYProgress}
            isDark={isDark}
          />
        ))}

        {/* ── Center: portrait + name ───────────────────────────────────── */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "clamp(0.75rem, 1.5vw, 1.2rem)",
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            style={{
              width: "clamp(110px, 13vw, 185px)",
              height: "clamp(110px, 13vw, 185px)",
              borderRadius: "50%",
              overflow: "hidden",
              border: `3px solid ${ACCENT}`,
              boxShadow: `0 0 0 6px ${bg}, 0 0 0 8px ${ACCENT}55`,
              flexShrink: 0,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/profile.png"
              alt="Agha Hammad Ahmed"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
            />
          </motion.div>

          {/* Name — three mask-reveal lines */}
          {["AGHA", "HAMMAD", "AHMED"].map((word, i) => (
            <div key={word} style={{ overflow: "hidden", lineHeight: 1 }}>
              <motion.div
                initial={{ y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 + i * 0.08 }}
                style={{
                  color: i === 1 ? fg : "transparent",
                  fontSize: i === 1
                    ? "clamp(2.8rem, 6vw, 6.5rem)"
                    : "clamp(1.1rem, 2.2vw, 2.4rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  WebkitTextStroke: i !== 1 ? `max(1.5px, 0.1vw) ${fg}` : undefined,
                  lineHeight: i === 1 ? 0.88 : 1,
                  paddingBottom: i === 1 ? "0.05em" : 0,
                }}
              >
                {word}
              </motion.div>
            </div>
          ))}

          {/* Role tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.45, y: 0 }}
            transition={{ duration: 0.6, delay: 0.72, ease: "easeOut" }}
            style={{
              color: fg,
              fontSize: "clamp(0.6rem, 1vw, 0.8rem)",
              fontWeight: 300,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              marginTop: "0.25rem",
            }}
          >
            Frontend Engineer · Available Worldwide
          </motion.p>
        </div>
      </div>
    </section>
  )
}
