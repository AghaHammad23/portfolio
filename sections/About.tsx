"use client"

import { useRef, useState } from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useInView,
} from "framer-motion"
import { FiCode, FiLayers, FiCompass, FiArrowRight } from "react-icons/fi"
import { useTheme } from "@/lib/useTheme"

const LIGHT = "#FD802E"
const DARK = "#233D4C"
const ACCENT = "#FACC15"

const CARDS = [
  {
    title: "The Craft",
    body: "I write code the way designers think — every spacing decision, every transition, every hover state is intentional.",
    Icon: FiCode,
    isCTA: false,
  },
  {
    title: "The Stack",
    body: "Next.js, React, TypeScript, Tailwind. I live in the frontend but I speak the backend's language.",
    Icon: FiLayers,
    isCTA: false,
  },
  {
    title: "The Approach",
    body: "I don't ship templates. Every project starts with why before how.",
    Icon: FiCompass,
    isCTA: false,
  },
  {
    title: "Let's Work",
    body: "Open to freelance projects and full-time roles. If you have a vision, I have the execution.",
    Icon: FiArrowRight,
    isCTA: true,
  },
]

const cardContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

interface TiltCardProps {
  title: string
  body: string
  Icon: React.ComponentType<{ size?: number | string }>
  isDark: boolean
  isCTA: boolean
}

function TiltCard({ title, body, Icon, isDark, isCTA }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Raw motion values → springs for smooth, subtle tilt
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const rotateXSpring = useSpring(rotateX, { stiffness: 100, damping: 20 })
  const rotateYSpring = useSpring(rotateY, { stiffness: 100, damping: 20 })

  // Shine position tracks cursor
  const shinePosX = useMotionValue(50)
  const shinePosY = useMotionValue(50)
  const shineBackground = useMotionTemplate`radial-gradient(circle at ${shinePosX}% ${shinePosY}%, rgba(255,255,255,0.06), transparent 70%)`

  // Card bg is the OPPOSITE of the page bg; text on the card mirrors that inversion
  const fg = isDark ? DARK : LIGHT
  const defaultBg = isDark ? LIGHT : DARK
  const ctaHoverBg = isDark ? "rgba(35,61,76,0.15)" : "rgba(253,128,46,0.15)"
  const defaultBorder = isDark ? "rgba(35,61,76,0.25)" : "rgba(253,128,46,0.25)"

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const cardCenterX = rect.left + rect.width / 2
    const cardCenterY = rect.top + rect.height / 2
    rotateY.set((e.clientX - cardCenterX) / 25)
    rotateX.set((e.clientY - cardCenterY) / 25)
    shinePosX.set(((e.clientX - rect.left) / rect.width) * 100)
    shinePosY.set(((e.clientY - rect.top) / rect.height) * 100)
  }

  function handleMouseLeave() {
    rotateX.set(0)
    rotateY.set(0)
    shinePosX.set(50)
    shinePosY.set(50)
    setIsHovered(false)
  }

  const textColor = isCTA && isHovered ? ACCENT : fg
  const bodyOpacity = isCTA && isHovered ? 0.8 : 0.65

  return (
    <div style={{ perspective: "1000px" }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovered(true)}
        initial={{ borderColor: defaultBorder, backgroundColor: defaultBg }}
        animate={{
          borderColor: isHovered ? ACCENT : defaultBorder,
          backgroundColor: isCTA && isHovered ? ctaHoverBg : defaultBg,
        }}
        transition={{ duration: 0.3 }}
        style={{
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          borderWidth: "1px",
          borderStyle: "solid",
          borderRadius: "0.75rem",
          padding: "2.5rem",
          minHeight: "280px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
          cursor: isCTA ? "pointer" : "default",
        }}
      >
        {/* Mouse-following shine overlay */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            background: shineBackground,
            borderRadius: "inherit",
            pointerEvents: "none",
          }}
        />

        {/* Icon — scale + x via FM, color via CSS (FM can't reliably animate SVG currentColor) */}
        <motion.div
          animate={{
            scale: isHovered ? 1.2 : 1,
          }}
          transition={{ duration: 0.2 }}
          style={{
            color: isHovered ? ACCENT : fg,
            transition: "color 0.2s",
            display: "inline-flex",
          }}
        >
          <Icon size={24} />
        </motion.div>

        {/* Title + body */}
        <div>
          <h3
            style={{
              color: textColor,
              fontSize: "1.25rem",
              fontWeight: 700,
              marginBottom: "0.75rem",
              transition: "color 0.3s ease",
            }}
          >
            {title}
          </h3>
          <p
            style={{
              color: textColor,
              opacity: bodyOpacity,
              fontSize: "0.9375rem",
              lineHeight: 1.7,
              transition: "color 0.3s ease, opacity 0.3s ease",
            }}
          >
            {body}
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const isInView = useInView(sectionRef as React.RefObject<Element>, { once: true, margin: "-100px" })

  const fg = isDark ? LIGHT : DARK

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
        About Me
      </motion.p>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        style={{
          color: fg,
          fontSize: "clamp(2.5rem, 5vw, 4rem)",
          fontWeight: 700,
          lineHeight: 1.1,
          maxWidth: "600px",
          marginBottom: "clamp(2.5rem, 5vw, 4rem)",
        }}
      >
        A developer who obsesses over details
      </motion.h2>

      {/* Card grid */}
      <motion.div
        variants={cardContainerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
      >
        {CARDS.map(({ title, body, Icon, isCTA }) => (
          <motion.div key={title} variants={cardVariants}>
            <TiltCard
              title={title}
              body={body}
              Icon={Icon}
              isDark={isDark}
              isCTA={isCTA}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
