"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Navigation() {
  return (
    <div className="absolute top-8 right-8 z-20">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-slate-900 hover:bg-slate-800 text-blue-300 px-8 py-12 rounded-lg font-black text-2xl border-2 border-slate-700 min-w-[140px] shadow-2xl">
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl tracking-wider">MENU</span>
              <ChevronDown className="w-6 h-6" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80 bg-slate-900 border-slate-700 text-blue-300 p-4 shadow-2xl">
          <DropdownMenuItem
            asChild
            className="hover:bg-slate-800 hover:text-blue-200 cursor-pointer p-4 rounded-lg mb-2"
          >
            <Link href="/" className="text-xl font-bold tracking-wide">
              WELCOME
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className="hover:bg-slate-800 hover:text-blue-200 cursor-pointer p-4 rounded-lg mb-2"
          >
            <Link href="/about" className="text-xl font-bold tracking-wide">
              WHO ARE WE ?
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className="hover:bg-slate-800 hover:text-blue-200 cursor-pointer p-4 rounded-lg mb-2"
          >
            <Link href="/services" className="text-xl font-bold tracking-wide">
              OUR SERVICES
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className="hover:bg-slate-800 hover:text-blue-200 cursor-pointer p-4 rounded-lg mb-2"
          >
            <Link href="/booking" className="text-xl font-bold tracking-wide">
              YOUR BOOKING WITH US
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className="hover:bg-slate-800 hover:text-blue-200 cursor-pointer p-4 rounded-lg mb-2"
          >
            <Link href="/team" className="text-xl font-bold tracking-wide">
              THE SERENITY TEAM
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="hover:bg-slate-800 hover:text-blue-200 cursor-pointer p-4 rounded-lg">
            <Link href="/contact" className="text-xl font-bold tracking-wide">
              JOIN US
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
