"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion"
import { useTheme } from "@/lib/useTheme"

const LIGHT = "#F5F0E8"
const DARK = "#1A1A1A"

export default function Hero({ isVisible }: { isVisible: boolean }) {
  const sectionRef = useRef<HTMLElement>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  // Photo scroll effects
  const photoBlurRaw = useTransform(scrollYProgress, [0, 0.5], [0, 20])
  const photoFilter = useMotionTemplate`blur(${photoBlurRaw}px)`
  const photoY = useTransform(scrollYProgress, [0, 0.5], [0, 180])
  // Clamped to [0, 0.4] so opacity hits 0 and stays there
  const photoOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])

  // Name opacity — faint at rest, fully revealed as photo departs
  const nameOpacity = useTransform(scrollYProgress, [0, 0.4], [0.15, 1])

  // Name fill — transparent → solid color as photo scrolls away
  const nameColorStart = isDark ? "rgba(245,240,232,0)" : "rgba(26,26,26,0)"
  const nameColorEnd = isDark ? "rgba(245,240,232,1)" : "rgba(26,26,26,1)"
  const nameColor = useTransform(scrollYProgress, [0.1, 0.5], [nameColorStart, nameColorEnd])

  // Stroke fades out as fill comes in
  const strokeRgb = isDark ? "245,240,232" : "26,26,26"
  const strokeAlpha = useTransform(scrollYProgress, [0.1, 0.5], [1, 0])
  const nameStroke = useMotionTemplate`1px rgba(${strokeRgb},${strokeAlpha})`

  return (
    <section ref={sectionRef} style={{ height: "300vh", position: "relative" }}>
      {/* Sticky viewport — clips the overflowing name text */}
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>

        {/* Entrance wrapper — name + photo fade in together after loader */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          style={{ position: "absolute", inset: 0 }}
        >

          {/* Background ghost name */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              overflow: "hidden",
            }}
          >
            <motion.h1
              style={{
                opacity: nameOpacity,
                color: nameColor,
                WebkitTextStroke: nameStroke,
                width: "100%",
                textAlign: "center",
                fontSize: "clamp(6rem, 15vw, 14rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 0.9,
                userSelect: "none",
              }}
            >
              <div>AGHA HAMMAD</div>
              <div>AHMED</div>
            </motion.h1>
          </div>

          {/* Portrait photo — sits in front, scrolls away */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "52%",
              transform: "translate(-50%, -50%)",
              zIndex: 10,
            }}
          >
            <motion.div style={{ filter: photoFilter, y: photoY, opacity: photoOpacity }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/profile.png"
                alt="Agha Hammad Ahmed"
                className="w-70 md:w-95 aspect-3/4 rounded-sm object-cover"
              />
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  )
}
