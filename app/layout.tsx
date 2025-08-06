import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Dancing_Script } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const dancingScript = Dancing_Script({ subsets: ["latin"], weight: ["400", "700"] })

export const metadata: Metadata = {
  title: "Serenity Services - Professional Cleaning & Wellness",
  description:
    "Professional cleaning, cooking, and wellness services for your home. Experience the perfect work-life balance with Serenity Services.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${dancingScript.variable}`}>{children}</body>
    </html>
  )
}
