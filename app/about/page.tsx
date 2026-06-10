"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useTheme } from "@/lib/useTheme"

const LIGHT = "#FD802E"
const DARK = "#233D4C"
const ACCENT = "#FACC15"

const SKILLS = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Node.js",
  "Figma",
  "REST APIs",
]

const EXPERIENCES = [
  {
    company: "Freelance",
    role: "Frontend Developer",
    period: "2023 – Present",
    bullets: [
      "Built performant, animated web apps for 15+ clients across SaaS, e-commerce, and agency verticals",
      "Delivered pixel-perfect UIs with sub-100ms interactions — consistently praised for attention to detail",
      "Reduced average client bounce rates by 40% through UX improvements and performance optimisations",
    ],
  },
  {
    company: "Digital Agency",
    role: "UI Engineer",
    period: "2022 – 2023",
    bullets: [
      "Led frontend development across 8 simultaneous client projects without missing a deadline",
      "Introduced a Framer Motion animation system that was adopted across the entire engineering team",
      "Cut design-to-code handoff time by 50% by building a shared Tailwind component library",
    ],
  },
  {
    company: "Tech Startup",
    role: "Junior Frontend Developer",
    period: "2021 – 2022",
    bullets: [
      "Shipped core product features at startup pace — moved fast without breaking things",
      "Collaborated daily with design to maintain visual consistency across every surface",
    ],
  },
]

const EDUCATION = {
  degree: "BSc Computer Science",
  institution: "University of Technology",
  period: "2018 – 2022",
  notes:
    "Algorithms & Data Structures · Human–Computer Interaction · Web Systems · Software Engineering",
}

// ─── Section reveal wrapper ────────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

export default function AboutPage() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const fg = isDark ? LIGHT : DARK
  const pageBg = isDark ? DARK : LIGHT
  const borderColor = isDark ? "rgba(245,240,232,0.08)" : "rgba(26,26,26,0.08)"
  const mutedBorder = isDark ? "rgba(245,240,232,0.12)" : "rgba(26,26,26,0.12)"

  const [contactHovered, setContactHovered] = useState(false)

  return (
    <main style={{ backgroundColor: pageBg, minHeight: "100vh", color: fg }}>

      {/* ── Cover photo ───────────────────────────────────────────────── */}
      <div
        className="w-full h-[200px] md:h-[300px]"
        style={{
          background: `linear-gradient(160deg, ${ACCENT} 0%, rgba(140,20,15,0.55) 60%, rgba(26,26,26,0.3) 100%)`,
        }}
      />

      {/* ── Profile section ───────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          paddingTop: "70px",
          paddingInline: "clamp(2rem, 5vw, 5rem)",
          paddingBottom: "2.5rem",
          borderBottom: `1px solid ${borderColor}`,
        }}
      >
        {/* Avatar — overlaps cover */}
        <div
          style={{
            position: "absolute",
            top: "-50px",
            left: "clamp(2rem, 5vw, 5rem)",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            border: `4px solid ${pageBg}`,
            overflow: "hidden",
            zIndex: 10,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/profile.png"
            alt="Agha Hammad Ahmed"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Name + headline row */}
        <div className="flex flex-col md:flex-row md:items-end md:gap-8">
          {/* Spacer for avatar on desktop */}
          <div className="hidden md:block" style={{ width: "120px", flexShrink: 0 }} />

          {/* Text + button */}
          <div>
            <h1
              style={{
                color: fg,
                fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                fontWeight: 700,
                lineHeight: 1.15,
                marginBottom: "0.4rem",
              }}
            >
              Agha Hammad Ahmed
            </h1>
            <p style={{ color: fg, opacity: 0.7, fontSize: "1rem", marginBottom: "0.3rem" }}>
              Frontend Developer &amp; UI Engineer
            </p>
            <p style={{ color: fg, opacity: 0.45, fontSize: "0.875rem", marginBottom: "1.5rem" }}>
              Remote · Available worldwide
            </p>

            <button
              onMouseEnter={() => setContactHovered(true)}
              onMouseLeave={() => setContactHovered(false)}
              style={{
                display: "inline-block",
                padding: "0.5rem 1.25rem",
                border: `1px solid ${ACCENT}`,
                borderRadius: "999px",
                color: contactHovered ? "#fff" : ACCENT,
                backgroundColor: contactHovered ? ACCENT : "transparent",
                fontSize: "0.875rem",
                fontWeight: 500,
                cursor: "pointer",
                transition: "background-color 0.25s, color 0.25s",
                fontFamily: "inherit",
              }}
            >
              <Link
                href="/#contact"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Contact
              </Link>
            </button>
          </div>
        </div>
      </div>

      {/* ── Main content ──────────────────────────────────────────────── */}
      <div
        style={{
          paddingInline: "clamp(2rem, 5vw, 5rem)",
          paddingBlock: "clamp(3rem, 6vw, 5rem)",
          maxWidth: "900px",
        }}
      >

        {/* About ──────────────────────────────────────────────────────── */}
        <Reveal>
          <section style={{ marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
            <SectionLabel fg={fg}>About</SectionLabel>

            <p
              style={{
                color: fg,
                opacity: 0.75,
                lineHeight: 1.85,
                fontSize: "1.0625rem",
                marginBottom: "2.5rem",
                maxWidth: "680px",
              }}
            >
              I'm a frontend developer who cares deeply about the gap between
              design and engineering. I don't just build interfaces — I build
              experiences that feel alive. Every hover state, every transition,
              every micro-interaction is intentional. I've spent the last few
              years working with clients who want their products to stand out, and
              consistently delivering work that does exactly that.
            </p>

            {/* Skills */}
            <p
              style={{
                color: fg,
                fontSize: "0.75rem",
                fontWeight: 300,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                opacity: 0.5,
                marginBottom: "1rem",
              }}
            >
              What I Work With
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem" }}>
              {SKILLS.map((skill) => (
                <span
                  key={skill}
                  style={{
                    padding: "0.375rem 0.875rem",
                    border: `1px solid ${mutedBorder}`,
                    borderRadius: "999px",
                    color: fg,
                    fontSize: "0.875rem",
                    letterSpacing: "0.01em",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Experience ─────────────────────────────────────────────────── */}
        <Reveal delay={0.05}>
          <section style={{ marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
            <SectionLabel fg={fg}>Experience</SectionLabel>

            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {EXPERIENCES.map((exp, i) => (
                <ExperienceItem
                  key={exp.company}
                  exp={exp}
                  isLast={i === EXPERIENCES.length - 1}
                  fg={fg}
                  borderColor={borderColor}
                  isDark={isDark}
                />
              ))}
            </div>
          </section>
        </Reveal>

        {/* Education ──────────────────────────────────────────────────── */}
        <Reveal delay={0.1}>
          <section>
            <SectionLabel fg={fg}>Education</SectionLabel>

            <div
              style={{
                display: "flex",
                gap: "1.5rem",
                alignItems: "flex-start",
              }}
            >
              {/* Timeline dot */}
              <div style={{ flexShrink: 0, paddingTop: "0.35rem" }}>
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: ACCENT,
                  }}
                />
              </div>

              <div>
                <p style={{ color: fg, fontWeight: 600, fontSize: "1.0625rem" }}>
                  {EDUCATION.degree}
                </p>
                <p style={{ color: fg, opacity: 0.6, fontSize: "0.9375rem", marginTop: "0.2rem" }}>
                  {EDUCATION.institution}
                </p>
                <p
                  style={{
                    color: fg,
                    opacity: 0.4,
                    fontSize: "0.8125rem",
                    marginTop: "0.25rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  {EDUCATION.period}
                </p>
                <p style={{ color: fg, opacity: 0.55, fontSize: "0.875rem", lineHeight: 1.7 }}>
                  {EDUCATION.notes}
                </p>
              </div>
            </div>
          </section>
        </Reveal>

      </div>
    </main>
  )
}

// ─── Sub-components ────────────────────────────────────────────────────────

function SectionLabel({ fg, children }: { fg: string; children: React.ReactNode }) {
  return (
    <p
      style={{
        color: fg,
        fontSize: "0.75rem",
        fontWeight: 300,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        opacity: 0.5,
        marginBottom: "1.5rem",
      }}
    >
      {children}
    </p>
  )
}

function ExperienceItem({
  exp,
  isLast,
  fg,
  borderColor,
  isDark,
}: {
  exp: (typeof EXPERIENCES)[number]
  isLast: boolean
  fg: string
  borderColor: string
  isDark: boolean
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "1.5rem",
        paddingBottom: isLast ? 0 : "2.5rem",
        position: "relative",
      }}
    >
      {/* Timeline line + dot */}
      <div
        style={{
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "0.35rem",
        }}
      >
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: ACCENT,
            flexShrink: 0,
          }}
        />
        {!isLast && (
          <div
            style={{
              flex: 1,
              width: "1px",
              backgroundColor: borderColor,
              marginTop: "0.5rem",
            }}
          />
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, paddingBottom: isLast ? 0 : "0.5rem" }}>
        <div
          className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between"
          style={{ marginBottom: "0.25rem" }}
        >
          <p style={{ color: fg, fontWeight: 600, fontSize: "1.0625rem" }}>{exp.role}</p>
          <p style={{ color: fg, opacity: 0.4, fontSize: "0.8125rem", flexShrink: 0 }}>
            {exp.period}
          </p>
        </div>
        <p style={{ color: fg, opacity: 0.55, fontSize: "0.9375rem", marginBottom: "0.875rem" }}>
          {exp.company}
        </p>
        <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {exp.bullets.map((b) => (
            <li
              key={b}
              style={{
                color: fg,
                opacity: 0.65,
                fontSize: "0.9375rem",
                lineHeight: 1.7,
                paddingLeft: "1rem",
                position: "relative",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  top: "0.6em",
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  backgroundColor: fg,
                  opacity: 0.4,
                  display: "inline-block",
                }}
              />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
