"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import Loader from "@/sections/Loader"
import Hero from "@/sections/Hero"
import About from "@/sections/About"
import Projects from "@/sections/Projects"

export default function Home() {
  const [showLoader, setShowLoader] = useState(true)

  return (
    <>
      <AnimatePresence>
        {showLoader && (
          <Loader key="loader" onComplete={() => setShowLoader(false)} />
        )}
      </AnimatePresence>

      <Hero isVisible={!showLoader} />
      <About />
      <Projects />
    </>
  )
}
