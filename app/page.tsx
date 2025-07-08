"use client"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { AudioWaveform, X } from "lucide-react"

interface ServiceCard {
  id: string
  title: string
  subtitle: string
  image: string
  color: string
}

const services: ServiceCard[] = [
  {
    id: "cleaning",
    title: "HOUSE CLEANING",
    subtitle: "Professional deep cleaning",
    image:
      "https://gfqhzuqckfxtzqawdcso.supabase.co/storage/v1/object/public/usethisfornow/myserenityservices/IMG_0042.png",
    color: "bg-blue-400",
  },
  {
    id: "cooking",
    title: "MEAL PREPARATION",
    subtitle: "Healthy meal prep services",
    image:
      "https://gfqhzuqckfxtzqawdcso.supabase.co/storage/v1/object/public/usethisfornow/myserenityservices/IMG_5529.JPG",
    color: "bg-orange-400",
  },
  {
    id: "combo",
    title: "CLEANING + COOKING",
    subtitle: "Complete home care package",
    image:
      "https://gfqhzuqckfxtzqawdcso.supabase.co/storage/v1/object/public/usethisfornow/myserenityservices/IMG_5511.JPG",
    color: "bg-green-400",
  },
  {
    id: "massage-60",
    title: "FULL BODY MASSAGE",
    subtitle: "60-minute therapeutic massage",
    image:
      "https://gfqhzuqckfxtzqawdcso.supabase.co/storage/v1/object/public/usethisfornow/myserenityservices/IMG_0042.png",
    color: "bg-purple-400",
  },
  {
    id: "massage-30",
    title: "EXPRESS MASSAGE",
    subtitle: "30-minute relaxation massage",
    image:
      "https://gfqhzuqckfxtzqawdcso.supabase.co/storage/v1/object/public/usethisfornow/myserenityservices/IMG_1548.png",
    color: "bg-pink-400",
  },
]

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(1)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const currentService = services[currentIndex]
  const prevService = services[currentIndex - 1] || services[services.length - 1]
  const nextService = services[currentIndex + 1] || services[0]

  const handleCardClick = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentIndex(currentIndex === 0 ? services.length - 1 : currentIndex - 1)
    } else {
      setCurrentIndex(currentIndex === services.length - 1 ? 0 : currentIndex + 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 relative overflow-hidden font-sans">
      {/* Top Left - Brand */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10">
        <div className="text-orange-500 text-sm font-medium mb-1">THE SERVICES</div>
        <h1 className="text-orange-600 text-xl md:text-2xl font-semibold leading-tight">SERENITY SERVICES</h1>
      </div>

      {/* Top Right - CTA matching screenshot */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8 z-10 flex items-center gap-4 md:gap-6">
        <div className="text-orange-500 text-sm font-medium">THE SERVICES</div>
        <Button
          asChild
          className="bg-white border-2 border-orange-400 text-orange-500 hover:bg-orange-50 px-6 md:px-8 py-2 md:py-3 rounded-full font-medium text-sm tracking-wide shadow-sm"
        >
          <Link href="/booking">START BOOKING</Link>
        </Button>
      </div>

      {/* Main Content Area - Full Viewport Width */}
      <div className="flex items-center justify-center min-h-screen w-full px-4 md:px-8">
        <div className="relative w-full max-w-7xl flex items-center justify-between">
          {/* Left Card - Previous Service */}
          <motion.div
            className="cursor-pointer z-20 flex-shrink-0"
            onClick={() => handleCardClick("prev")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.div
              className="w-20 h-20 md:w-28 md:h-28 rounded-full border-2 border-orange-300 bg-white shadow-lg overflow-hidden"
              layoutId={`card-${prevService.id}`}
            >
              <img
                src={prevService.image || "/placeholder.svg"}
                alt={prevService.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Center Card - Current Service */}
          <div className="text-center z-10 flex-1 mx-8 md:mx-16">
            <motion.div
              className="relative mb-6 md:mb-8"
              key={currentService.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <motion.div
                className="w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-orange-300 bg-white shadow-2xl mx-auto overflow-hidden"
                layoutId={`card-${currentService.id}`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="w-full h-full relative">
                  <motion.img
                    src={currentService.image}
                    alt={currentService.title}
                    className="w-full h-full object-cover"
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 2, -2, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                  {/* Animated SVG overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.svg
                      className="w-72 h-72 md:w-80 md:h-80"
                      viewBox="0 0 100 100"
                      fill="none"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="0.5"
                        strokeDasharray="10 5"
                      />
                    </motion.svg>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              key={`text-${currentService.id}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h2 className="text-orange-600 text-3xl md:text-4xl font-bold mb-3 md:mb-4 tracking-wide">
                {currentService.title}
              </h2>
              <p className="text-orange-500 text-base md:text-lg mb-6 md:mb-8 font-medium">{currentService.subtitle}</p>

              <Button
                asChild
                className="bg-white border-2 border-orange-400 text-orange-500 hover:bg-orange-50 px-6 md:px-8 py-2 md:py-3 rounded-full font-medium shadow-sm"
              >
                <Link href="/booking">BOOK NOW</Link>
              </Button>
            </motion.div>
          </div>

          {/* Right Card - Next Service */}
          <motion.div
            className="cursor-pointer z-20 flex-shrink-0"
            onClick={() => handleCardClick("next")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.div
              className="w-20 h-20 md:w-28 md:h-28 rounded-full border-2 border-orange-300 bg-white shadow-lg overflow-hidden"
              layoutId={`card-${nextService.id}`}
            >
              <img
                src={nextService.image || "/placeholder.svg"}
                alt={nextService.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Left - All Services */}
      <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-10">
        <Link
          href="/services"
          className="text-orange-500 text-sm font-medium hover:text-orange-600 flex items-center gap-2"
        >
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
            <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
            <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
          </div>
          ALL SERVICES
        </Link>
      </div>

      {/* Bottom Right - Notification/Chat Menu */}
      <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-30">
        <motion.button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-12 h-12 rounded-full bg-orange-500 text-white shadow-lg flex items-center justify-center hover:bg-orange-600 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <AudioWaveform className="w-6 h-6" />
        </motion.button>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl border border-orange-200 p-4 w-64"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800">Notifications</h3>
                <button onClick={() => setIsMenuOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="p-2 bg-orange-50 rounded">
                  <p className="font-medium">Welcome to Serenity!</p>
                  <p className="text-xs text-gray-500">Book your first service today</p>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <p className="font-medium">Chat Support</p>
                  <p className="text-xs text-gray-500">We're here to help 24/7</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Service Indicators - Centered */}
      <div className="absolute bottom-16 md:bottom-20 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
        {services.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              index === currentIndex ? "bg-orange-500" : "bg-orange-300"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          />
        ))}
      </div>
    </div>
  )
}
