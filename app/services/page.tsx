"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

const services = [
  { title: "House Cleaning" },
  { title: "Meal Preparation" },
  { title: "Cleaning + Cooking Combo" },
  { title: "Full Body Massage" },
  { title: "Express Massage" },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary to-primary/30 flex flex-col items-center justify-center">
      <div className="w-full max-w-5xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6, type: "spring" }}
              className="bg-white rounded-xl shadow flex items-center justify-center min-h-[180px] md:min-h-[240px] border border-primary"
            >
              <span className="text-5xl md:text-7xl font-bold text-primary font-dancing-script text-center w-full">
                {service.title}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
