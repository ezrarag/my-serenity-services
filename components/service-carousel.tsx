"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ServiceCard from "./service-card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const services = [
  {
    id: 0,
    title: "Meal Preparation",
    subtitle: "$50 / hour",
    img: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 1,
    title: "House Cleaning",
    subtitle: "$60 / hour",
    img: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 2,
    title: "Combo Package",
    subtitle: "$75 / hour",
    img: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 3,
    title: "Full-Body Massage",
    subtitle: "$100 / 60 min",
    img: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 4,
    title: "Express Massage",
    subtitle: "$50 / 30 min",
    img: "/placeholder.svg?height=400&width=400",
  },
]

export default function ServiceCarousel() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((current - 1 + services.length) % services.length)
  const next = () => setCurrent((current + 1) % services.length)
  const goTo = (idx: number) => setCurrent(idx)

  return (
    <section className="relative w-full flex flex-col items-center">
      {/* carousel wrapper */}
      <div className="relative flex items-center justify-center w-full max-w-5xl h-[500px]">
        {/* side cards */}
        <div className="absolute left-2 sm:left-8">
          <SideCard svc={services[(current - 1 + services.length) % services.length]} onClick={prev} />
        </div>
        <div className="absolute right-2 sm:right-8">
          <SideCard svc={services[(current + 1) % services.length]} onClick={next} />
        </div>

        {/* center (animated) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={services[current].id}
            layoutId={`card-${services[current].id}`}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className="z-20"
          >
            <ServiceCard svc={services[current]} size="lg" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* title / subtitle / button */}
      <div className="mt-6 text-center space-y-3">
        <h2 className="text-sm tracking-widest text-orange-600 uppercase">Service&nbsp;0{current + 1}</h2>
        <h1 className="text-4xl md:text-5xl font-bold text-orange-700">{services[current].title}</h1>
        <Button className="border-2 border-orange-600 rounded-full bg-transparent text-orange-600 hover:bg-orange-50 px-8 py-3">
          Book&nbsp;Now
        </Button>
      </div>

      {/* nav arrows bottom right (small/medium view) */}
      <div className="absolute bottom-6 right-6 flex space-x-2 md:hidden">
        <Button variant="ghost" size="icon" onClick={prev}>
          <ChevronLeft className="h-6 w-6 text-orange-600" />
        </Button>
        <Button variant="ghost" size="icon" onClick={next}>
          <ChevronRight className="h-6 w-6 text-orange-600" />
        </Button>
      </div>
    </section>
  )
}

function SideCard({
  svc,
  onClick,
}: {
  svc: (typeof services)[0]
  onClick: () => void
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="rounded-full overflow-hidden w-20 h-20 sm:w-28 sm:h-28 border-4 border-orange-200 shadow"
    >
      <img src={svc.img || "/placeholder.svg"} alt={svc.title} className="object-cover w-full h-full" />
    </motion.button>
  )
}
