"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import { useTheme } from "@/lib/useTheme"

const LIGHT = "#F5F0E8"
const DARK = "#1A1A1A"

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const lineVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
}

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const curtain = useAnimation()
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const bg = isDark ? DARK : LIGHT
  const fg = isDark ? LIGHT : DARK
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    let cancelled = false
    const timer = setTimeout(async () => {
      if (cancelled) return
      await curtain.start({
        y: "-100vh",
        transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
      })
      if (!cancelled) onCompleteRef.current()
    }, 2800)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [curtain])

  return (
    <motion.div
      animate={curtain}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: bg }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center"
      >
        {/* "est. 2024" label */}
        <motion.div variants={lineVariants}>
          <p
            style={{
              color: fg,
              fontWeight: 300,
              letterSpacing: "0.25em",
              fontSize: "0.7rem",
              textTransform: "uppercase",
              marginBottom: "1.25rem",
              opacity: 0.55,
            }}
          >
            est. 2024
          </p>
        </motion.div>

        {/* Line 1 */}
        <motion.div variants={lineVariants}>
          <span
            style={{
              color: fg,
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              display: "block",
              textAlign: "center",
            }}
          >
            i build things
          </span>
        </motion.div>

        {/* Line 2 + animated underline */}
        <motion.div
          variants={lineVariants}
          style={{ position: "relative", display: "inline-block" }}
        >
          <span
            style={{
              color: fg,
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              display: "block",
              textAlign: "center",
            }}
          >
            that feel alive
          </span>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeInOut" }}
            style={{
              position: "absolute",
              bottom: -6,
              left: 0,
              right: 0,
              height: 2,
              backgroundColor: fg,
              transformOrigin: "left",
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
