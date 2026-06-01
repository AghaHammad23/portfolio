import type { Metadata } from "next"
import "./globals.css"
import LenisProvider from "@/components/layout/LenisProvider"
import HamburgerMenu from "@/components/layout/HamburgerMenu"

export const metadata: Metadata = {
  title: "Agha Hammad Ahmed",
  description: "Portfolio",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <HamburgerMenu />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  )
}
