"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { FiMail, FiLinkedin, FiGithub } from "react-icons/fi"
import { useTheme } from "@/lib/useTheme"

const LIGHT = "#FD802E"
const DARK = "#233D4C"
const ACCENT = "#FACC15"

const PROJECT_TYPES = ["Website Redesign", "New Project", "Landing Page", "Web App", "Other"]

const CONTACT_LINKS = [
  { Icon: FiMail, label: "hammad@email.com", href: "mailto:hammad@email.com" },
  { Icon: FiLinkedin, label: "linkedin.com/in/hammad", href: "#" },
  { Icon: FiGithub, label: "github.com/hammad", href: "#" },
]

function ContactLink({
  Icon,
  label,
  href,
  isDark,
  delay,
  isInView,
  borderColor,
}: {
  Icon: React.ComponentType<{ size?: number }>
  label: string
  href: string
  isDark: boolean
  delay: number
  isInView: boolean
  borderColor: string
}) {
  const [isHovered, setIsHovered] = useState(false)
  const fg = isDark ? LIGHT : DARK

  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "0.75rem 0",
        borderBottom: `1px solid ${borderColor}`,
        textDecoration: "none",
        color: isHovered ? ACCENT : fg,
        transition: "color 0.2s",
      }}
    >
      <motion.span
        animate={{ x: isHovered ? 4 : 0 }}
        transition={{ duration: 0.2 }}
        style={{ display: "inline-flex", flexShrink: 0 }}
      >
        <Icon size={16} />
      </motion.span>
      <span style={{ fontSize: "0.9375rem" }}>{label}</span>
    </motion.a>
  )
}

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const isInView = useInView(sectionRef as React.RefObject<Element>, { once: true, margin: "-80px" })

  const fg = isDark ? LIGHT : DARK
  const borderColor = isDark ? "rgba(245,240,232,0.08)" : "rgba(26,26,26,0.08)"
  const inputBorderIdle = isDark ? "rgba(245,240,232,0.2)" : "rgba(26,26,26,0.2)"
  const btnBg = isDark ? LIGHT : DARK
  const btnFg = isDark ? DARK : LIGHT

  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" })
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [btnHovered, setBtnHovered] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setForm({ name: "", email: "", type: "", message: "" })
    }, 3000)
  }

  const borderFor = (name: string) =>
    focusedField === name ? ACCENT : inputBorderIdle

  const inputBase: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    padding: "0.75rem 0",
    fontSize: "1rem",
    color: fg,
    outline: "none",
    fontFamily: "inherit",
  }

  const labelBase: React.CSSProperties = {
    color: fg,
    fontSize: "0.75rem",
    fontWeight: 300,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    opacity: 0.5,
    display: "block",
    marginBottom: "0.5rem",
  }

  const fieldDelay = (i: number) => 0.2 + i * 0.08

  return (
    <section
      ref={sectionRef}
      className="w-full py-32 md:py-40"
      style={{ paddingInline: "clamp(1.5rem, 5vw, 5rem)" }}
    >
      <style>{`
        .c-input::placeholder { opacity: 0.3; color: inherit; }
        @keyframes badge-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
      `}</style>

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
        Get In Touch
      </motion.p>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        style={{
          fontSize: "clamp(2.5rem, 5vw, 4rem)",
          fontWeight: 700,
          lineHeight: 1.1,
          marginBottom: "clamp(3rem, 6vw, 5rem)",
        }}
      >
        <div style={{ color: fg }}>Let's build something</div>
        <div style={{ color: ACCENT }}>worth remembering.</div>
      </motion.h2>

      {/* Two-column layout */}
      <div className="flex flex-col md:flex-row gap-16 md:gap-24">

        {/* Left: Form ~60% */}
        <form onSubmit={handleSubmit} style={{ flex: "3 1 0%", minWidth: 0 }}>
          <div className="flex flex-col gap-8">

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: fieldDelay(0) }}
            >
              <label style={labelBase}>Name</label>
              <input
                type="text"
                className="c-input"
                placeholder="Your name"
                value={form.name}
                required
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                style={{
                  ...inputBase,
                  borderBottom: `1px solid ${borderFor("name")}`,
                  transition: "border-color 0.3s",
                }}
              />
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: fieldDelay(1) }}
            >
              <label style={labelBase}>Email</label>
              <input
                type="email"
                className="c-input"
                placeholder="your@email.com"
                value={form.email}
                required
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                style={{
                  ...inputBase,
                  borderBottom: `1px solid ${borderFor("email")}`,
                  transition: "border-color 0.3s",
                }}
              />
            </motion.div>

            {/* Project Type */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: fieldDelay(2) }}
            >
              <label style={labelBase}>Project Type</label>
              <div style={{ position: "relative" }}>
                <select
                  className="c-input"
                  value={form.type}
                  onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                  onFocus={() => setFocusedField("type")}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    ...inputBase,
                    borderBottom: `1px solid ${borderFor("type")}`,
                    transition: "border-color 0.3s",
                    appearance: "none",
                    cursor: "pointer",
                    paddingRight: "1.5rem",
                  }}
                >
                  <option value="" disabled>Select one</option>
                  {PROJECT_TYPES.map(t => (
                    <option
                      key={t}
                      value={t}
                      style={{ background: isDark ? DARK : LIGHT, color: fg }}
                    >
                      {t}
                    </option>
                  ))}
                </select>
                <span
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                    color: fg,
                    opacity: 0.4,
                    fontSize: "0.7rem",
                    lineHeight: 1,
                  }}
                >
                  ↓
                </span>
              </div>
            </motion.div>

            {/* Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: fieldDelay(3) }}
            >
              <label style={labelBase}>Message</label>
              <textarea
                className="c-input"
                placeholder="Tell me about your project..."
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                style={{
                  ...inputBase,
                  borderBottom: `1px solid ${borderFor("message")}`,
                  transition: "border-color 0.3s",
                  resize: "none",
                  minHeight: "120px",
                  display: "block",
                }}
              />
            </motion.div>

            {/* Submit */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: fieldDelay(4) }}
            >
              <button
                type="submit"
                disabled={submitted}
                onMouseEnter={() => setBtnHovered(true)}
                onMouseLeave={() => setBtnHovered(false)}
                style={{
                  width: "100%",
                  backgroundColor: submitted || btnHovered ? ACCENT : btnBg,
                  color: submitted || btnHovered ? "#ffffff" : btnFg,
                  padding: "1rem 2rem",
                  fontSize: "1rem",
                  fontWeight: 600,
                  border: "none",
                  borderRadius: 0,
                  cursor: submitted ? "default" : "pointer",
                  transition: "background-color 0.3s, color 0.3s",
                  fontFamily: "inherit",
                  letterSpacing: "0.02em",
                }}
              >
                {submitted ? "Message Sent ✓" : "Send Message →"}
              </button>
            </motion.div>

          </div>
        </form>

        {/* Right: Contact info ~40% */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          style={{ flex: "2 1 0%", minWidth: 0, paddingTop: "0.25rem" }}
        >
          <p
            style={{
              color: fg,
              opacity: 0.6,
              lineHeight: 1.8,
              fontSize: "1rem",
              marginBottom: "2.5rem",
            }}
          >
            Have a project in mind or just want to talk?{" "}
            Fill out the form or reach out directly.
          </p>

          <div>
            {CONTACT_LINKS.map(({ Icon, label, href }, i) => (
              <ContactLink
                key={label}
                Icon={Icon}
                label={label}
                href={href}
                isDark={isDark}
                delay={0.4 + i * 0.08}
                isInView={isInView}
                borderColor={borderColor}
              />
            ))}
          </div>

          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.65, ease: "easeOut" }}
            style={{ marginTop: "2rem" }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                border: `1px solid ${isDark ? "rgba(245,240,232,0.15)" : "rgba(26,26,26,0.15)"}`,
                padding: "0.5rem 1rem",
                borderRadius: "999px",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#4CAF50",
                  display: "inline-block",
                  flexShrink: 0,
                  animation: "badge-pulse 2s ease-in-out infinite",
                }}
              />
              <span style={{ color: fg, fontSize: "0.85rem", opacity: 0.7 }}>
                Available for work
              </span>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
