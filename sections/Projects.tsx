"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { projects } from "@/lib/content"
import { useTheme } from "@/lib/useTheme"

const LIGHT = "#F5F0E8"
const DARK = "#1A1A1A"
const ACCENT = "#E8453C"

type Project = (typeof projects)[number]

function ProjectCard({ project }: { project: Project }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="w-[70vw] md:w-[80vw] mr-6 md:mr-10 rounded-2xl overflow-hidden relative shrink-0"
      style={{ height: "80vh", backgroundColor: project.color, cursor: "pointer" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tech stack tag — top right */}
      <div
        style={{
          position: "absolute",
          top: "1.5rem",
          right: "1.5rem",
          padding: "0.375rem 0.75rem",
          borderRadius: "999px",
          border: "1px solid rgba(245,240,232,0.25)",
          color: LIGHT,
          fontSize: "0.75rem",
          fontWeight: 500,
          letterSpacing: "0.04em",
        }}
      >
        {project.tag}
      </div>

      {/* Project name — bottom left */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "2rem",
          color: LIGHT,
          fontSize: "clamp(2rem, 4vw, 3.5rem)",
          fontWeight: 700,
          lineHeight: 1.1,
        }}
      >
        {project.name}
      </div>

      {/* Hover overlay with CTA */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: isHovered ? "auto" : "none",
        }}
      >
        <a
          href={project.url}
          style={{
            color: LIGHT,
            fontSize: "0.9375rem",
            fontWeight: 500,
            padding: "0.75rem 1.75rem",
            border: "1px solid rgba(245,240,232,0.6)",
            borderRadius: "999px",
            textDecoration: "none",
          }}
        >
          View Project →
        </a>
      </motion.div>
    </div>
  )
}

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const [sectionTop, setSectionTop] = useState(0)
  const [sectionHeight, setSectionHeight] = useState(1)
  const [maxScroll, setMaxScroll] = useState(0)
  const [seeAllHovered, setSeeAllHovered] = useState(false)

  const { theme } = useTheme()
  const isDark = theme === "dark"
  const fg = isDark ? LIGHT : DARK

  const { scrollY } = useScroll()

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const measure = () => {
      setSectionTop(section.getBoundingClientRect().top + window.scrollY)
      setSectionHeight(section.offsetHeight)
      setMaxScroll(track.scrollWidth - window.innerWidth)
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

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxScroll])

  return (
    <div ref={sectionRef} style={{ height: "500vh", position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        <motion.div
          ref={trackRef}
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            x,
            willChange: "transform",
          }}
        >
          {/* Intro slide */}
          <div
            style={{
              width: "100vw",
              height: "100vh",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              paddingInline: "clamp(1.5rem, 5vw, 5rem)",
            }}
          >
            <div>
              <p
                style={{
                  color: fg,
                  fontSize: "0.75rem",
                  fontWeight: 300,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  opacity: 0.5,
                  marginBottom: "1.25rem",
                }}
              >
                Selected Work
              </p>
              <h2
                style={{
                  color: fg,
                  fontSize: "clamp(3rem, 6vw, 5.5rem)",
                  fontWeight: 700,
                  lineHeight: 1.05,
                }}
              >
                <div>Projects that</div>
                <div>speak for themselves</div>
              </h2>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginTop: "2rem",
                  color: fg,
                  opacity: 0.5,
                  fontSize: "0.875rem",
                }}
              >
                <span>→</span>
                <span>scroll to explore</span>
              </div>
            </div>
          </div>

          {/* Project cards */}
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}

          {/* See everything slide */}
          <div
            style={{
              width: "60vw",
              height: "100vh",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link
              href="/projects"
              onMouseEnter={() => setSeeAllHovered(true)}
              onMouseLeave={() => setSeeAllHovered(false)}
              style={{
                color: seeAllHovered ? ACCENT : fg,
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 700,
                textDecoration: "none",
                lineHeight: 1.1,
                transition: "color 0.3s",
              }}
            >
              See everything →
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
