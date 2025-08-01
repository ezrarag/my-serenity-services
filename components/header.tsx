"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ArrowUpRight, Facebook, Instagram, Phone, MessageCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const services = [
  { id: "cleaning", name: "HOUSE CLEANING", category: "SERENITY CLEAN", cartId: "cleaning" },
  { id: "cooking", name: "MEAL PREPARATION", category: "SERENITY COOK", cartId: "cooking" },
  { id: "combo", name: "CLEANING + COOKING COMBO", category: "SERENITY COMBO", cartId: "combo" },
  { id: "massage-60", name: "FULL BODY MASSAGE", category: "SERENITY MASSAGE", cartId: "massage-60" },
  { id: "massage-30", name: "EXPRESS MASSAGE", category: "SERENITY EXPRESS", cartId: "massage-30" },
  { id: "006", name: "DEEP CLEANING", category: "SERENITY DEEP", cartId: "cleaning" },
  { id: "007", name: "WEEKLY MAINTENANCE", category: "SERENITY WEEKLY", cartId: "cleaning" },
  { id: "008", name: "SPECIAL OCCASION CLEANING", category: "SERENITY SPECIAL", cartId: "cleaning" },
]

const navigation = [
  { name: "OUR STORY", href: "/about" },
  { name: "JOURNAL", href: "/blog" },
  { name: "LOCATION", href: "/location" },
  { name: "SERVICES", href: "/services" },
  { name: "DASHBOARD", href: "/dashboard" },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <>
      <header className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-40 bg-black/10 backdrop-blur-sm">
        {/* Left - Hamburger Menu */}
        <div className="flex items-center">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Center - Brand */}
        <div className="flex items-center">
          <Link href="/" className="text-white text-2xl font-light tracking-wide">
            SERENITY
          </Link>
        </div>

        {/* Right - CTA Button */}
        <div className="flex items-center">
          <Button
            asChild
            className="bg-transparent text-white hover:text-gray-200 px-4 py-2 border-none font-medium text-sm tracking-wide"
          >
            <Link href="/booking">MAKE AN APPOINTMENT</Link>
          </Button>
        </div>
      </header>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex"
          >
            {/* Header */}
            <div className="absolute top-0 left-0 w-full flex items-center justify-between px-6 py-4">
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="text-white text-2xl font-light tracking-wide">
                SERENITY
              </div>
              
              <Button
                asChild
                className="bg-transparent text-white hover:text-gray-200 px-4 py-2 border-none font-medium text-sm tracking-wide"
              >
                <Link href="/booking">MAKE AN APPOINTMENT</Link>
              </Button>
            </div>

            {/* Menu Content */}
            <div className="flex w-full h-full pt-20">
              {/* Left Panel */}
              <div className="w-1/2 p-12 flex flex-col justify-between">
                <div>
                  <h2 className="text-white text-4xl font-light mb-8">MENU</h2>
                  
                  {/* Social Links */}
                  <div className="mb-12">
                    <Link href="#" className="text-white hover:text-gray-300 transition-colors block mb-2">
                      <Facebook className="w-5 h-5 inline mr-2" />
                      FACEBOOK
                    </Link>
                    <Link href="#" className="text-white hover:text-gray-300 transition-colors block">
                      <Instagram className="w-5 h-5 inline mr-2" />
                      INSTAGRAM
                    </Link>
                  </div>

                  {/* Navigation */}
                  <div className="mb-12">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-white hover:text-gray-300 transition-colors block mb-4"
                      >
                        / {item.name}
                      </Link>
                    ))}
                  </div>

                  {/* Booking Options */}
                  <div className="mb-12">
                    <h3 className="text-white text-lg font-medium mb-4">FOR BOOKING</h3>
                    <Link href="#" className="text-white hover:text-gray-300 transition-colors block mb-2">
                      <MessageCircle className="w-4 h-4 inline mr-2" />
                      / SCHEDULE VIA WHATSAPP
                    </Link>
                    <Link href="#" className="text-white hover:text-gray-300 transition-colors block">
                      <Phone className="w-4 h-4 inline mr-2" />
                      / SCHEDULE VIA CALL
                    </Link>
                  </div>
                </div>

                {/* Contact Button */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-12 bg-gray-200 rounded"></div>
                  <Button className="bg-gray-200 text-black hover:bg-gray-300 px-6 py-3 rounded-none">
                    CONTACT US
                  </Button>
                </div>
              </div>

              {/* Right Panel - Services */}
              <div className="w-1/2 p-12 border-l border-gray-800">
                <div className="space-y-1">
                  {services.map((service) => (
                    <Link
                      key={service.id}
                      href={`/cart?service=${service.cartId}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <motion.div
                        className={`py-4 border-b border-gray-800 cursor-pointer transition-all duration-300 ${
                          hoveredItem && hoveredItem !== service.id ? 'opacity-30' : 'opacity-100'
                        }`}
                        onMouseEnter={() => setHoveredItem(service.id)}
                        onMouseLeave={() => setHoveredItem(null)}
                        whileHover={{ x: 10 }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-white text-sm font-light">{service.id}</div>
                            <div className="text-white text-lg font-medium">{service.name}</div>
                            <div className="text-gray-400 text-sm">{service.category}</div>
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-white" />
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
