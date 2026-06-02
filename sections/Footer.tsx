"use client"

import Link from "next/link"
import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { FiGithub, FiLinkedin, FiMail, FiInstagram, FiTwitter } from "react-icons/fi"
import { useTheme } from "@/lib/useTheme"

const LIGHT = "#F5F0E8"
const DARK = "#1A1A1A"
const ACCENT = "#E8453C"

const NAV_LINKS = [
  { label: "Work", href: "/#projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
  { label: "Projects", href: "/projects" },
]

const SOCIAL_LINKS = [
  { Icon: FiGithub, href: "#", label: "GitHub" },
  { Icon: FiLinkedin, href: "#", label: "LinkedIn" },
  { Icon: FiTwitter, href: "#", label: "X" },
]

function SocialLink({ Icon, href, label, fg }: { Icon: any; href: string; label: string; fg: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex items-center justify-center w-10 h-10 rounded-[10px] transition-all duration-300 group"
      style={{ border: `1px solid transparent` }}
    >
      <Icon 
        size={18} 
        style={{ 
          color: fg, 
          opacity: 0.6,
          transition: "all 0.3s ease" 
        }} 
        className="group-hover:scale-110 group-hover:opacity-100 group-hover:!text-[#E8453C]"
      />
    </a>
  )
}

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const isInView = useInView(sectionRef as React.RefObject<Element>, { once: true, margin: "-80px" })

  const fg = isDark ? LIGHT : DARK
  const bg = isDark ? DARK : LIGHT
  const borderColor = isDark ? "rgba(245,240,232,0.08)" : "rgba(26,26,26,0.08)"
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full"
      style={{
        background: bg,
        borderTop: `1px solid ${borderColor}`,
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* TOP STRIP: Email & Socials */}
      <div
        className="flex flex-col items-center text-center md:flex-row md:justify-between md:items-center md:text-left"
        style={{
          padding: '24px clamp(1.5rem, 5vw, 5rem)',
          borderBottom: `1px solid ${borderColor}`,
          gap: '24px',
        }}
      >
        {/* EMAIL */}
        <a
          href="mailto:hammad@email.com"
          className="flex items-center group"
          style={{ gap: '12px', textDecoration: 'none' }}
        >
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              border: `1px solid ${borderColor}`,
              color: ACCENT,
              transition: 'all 0.3s ease',
            }}
            className="group-hover:bg-[#E8453C] group-hover:text-white"
          >
            <FiMail size={16} />
          </span>
          <span
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: fg,
              letterSpacing: '-0.01em',
            }}
          >
            hammad@email.com
          </span>
        </a>

        {/* SOCIALS */}
        <div className="flex items-center gap-2">
          <span
            style={{
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: fg,
              opacity: 0.4,
              marginRight: '8px',
            }}
          >
            Connect
          </span>
          {SOCIAL_LINKS.map((s) => (
            <SocialLink key={s.label} {...s} fg={fg} />
          ))}
        </div>
      </div>

      {/* BIG CENTER WORDMARK: Outlined Name */}
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: 'clamp(40px, 8vw, 80px) 0',
          borderBottom: `1px solid ${borderColor}`,
        }}
      >
        <div className="flex justify-center items-center w-full">
          <h2
            style={{
              fontSize: 'clamp(2.5rem, 12vw, 8.5rem)',
              fontWeight: 900,
              lineHeight: 0.9,
              textAlign: 'center',
              color: 'transparent',
              WebkitTextStroke: `1.5px ${ACCENT}`,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              userSelect: 'none',
              opacity: 0.9,
            }}
          >
            Agha Hammad Ahmed
          </h2>
        </div>
      </div>

      {/* BOTTOM BAR: Navigation & Copyright */}
      <div
        className="flex flex-col items-center text-center md:flex-row md:justify-between md:items-center md:text-left"
        style={{
          padding: '24px clamp(1.5rem, 5vw, 5rem)',
          gap: '20px',
        }}
      >
        {/* BRAND STATUS */}
        <div className="flex items-center gap-3">
          <span
            style={{
              width: '8px',
              height: '8px',
              background: ACCENT,
              borderRadius: '50%',
              boxShadow: `0 0 10px ${ACCENT}`,
            }}
          />
          <span style={{ fontSize: '13px', fontWeight: 700, color: fg }}>
            Available for new projects
          </span>
        </div>

        {/* FOOTER NAV */}
        <nav className="flex flex-wrap items-center justify-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              style={{
                fontSize: '12px',
                fontWeight: 500,
                color: fg,
                opacity: 0.5,
                textDecoration: 'none',
                letterSpacing: '0.05em',
                transition: 'opacity 0.2s',
              }}
              className="hover:!opacity-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* COPYRIGHT */}
        <span
          style={{
            fontSize: '12px',
            fontWeight: 400,
            color: fg,
            opacity: 0.4,
          }}
        >
          © {currentYear} — Designed with ❤️
        </span>
      </div>
    </motion.footer>
  )
}