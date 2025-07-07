"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full flex items-center justify-between px-8 py-4 z-40 bg-rose-50/60 backdrop-blur">
      {/* top-left */}
      <Link href="/" className="text-2xl font-semibold tracking-wide text-orange-600">
        Serenity&nbsp;Services
      </Link>

      {/* top-right block matching screenshot */}
      <div className="flex items-center space-x-8">
        <span className="text-orange-600 font-semibold">THE&nbsp;SERVICES</span>
        <Button
          variant="outline"
          className="rounded-full border-2 border-orange-600 text-orange-600 hover:bg-orange-50 px-8 py-3 h-auto bg-transparent"
        >
          START&nbsp;BOOKING
        </Button>
      </div>
    </header>
  )
}
