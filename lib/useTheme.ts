"use client"

import { useEffect, useState } from "react"

type Theme = "light" | "dark"

const THEME_EVENT = "theme-change"

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light")

  // Initialize from localStorage and apply class on mount
  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null
    const initial: Theme = stored === "dark" ? "dark" : "light"
    setTheme(initial)
    document.documentElement.classList.toggle("dark", initial === "dark")
  }, [])

  // Sync with every other useTheme instance in the tree
  useEffect(() => {
    const handler = (e: Event) => {
      setTheme((e as CustomEvent<Theme>).detail)
    }
    window.addEventListener(THEME_EVENT, handler)
    return () => window.removeEventListener(THEME_EVENT, handler)
  }, [])

  function toggleTheme() {
    const next: Theme = theme === "light" ? "dark" : "light"
    setTheme(next)
    localStorage.setItem("theme", next)
    document.documentElement.classList.toggle("dark", next === "dark")
    // Broadcast to all other useTheme instances
    window.dispatchEvent(new CustomEvent<Theme>(THEME_EVENT, { detail: next }))
  }

  return { theme, toggleTheme }
}
