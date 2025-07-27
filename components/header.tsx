"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full flex items-center justify-between px-8 py-4 z-40 bg-rose-50/60 backdrop-blur">
      {/* top-left */}
      <Link href="/" className="text-2xl font-semibold tracking-wide text-primary font-dancing-script">
        Serenity Services
      </Link>

      {/* top-right block matching screenshot */}
      <div className="flex items-center space-x-8">
        <span className="text-primary font-semibold">THE&nbsp;SERVICES</span>
        <Button
          variant="outline"
          className="rounded-full border-2 border-primary text-primary hover:bg-secondary px-8 py-3 h-auto bg-transparent"
        >
          START&nbsp;BOOKING
        </Button>
      </div>
    </header>
  )
}
