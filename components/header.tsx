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
  { name: "SERVICES", href: "/services" },
  { name: "CART", href: "/cart" },
  { name: "DASHBOARD", href: "/dashboard" },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const handleMakeAppointment = () => {
    const phoneNumber = "313-629-7791"
    
    // Try to open FaceTime first
    const facetimeUrl = `facetime://${phoneNumber}`
    
    // Fallback to regular phone call if FaceTime fails
    const phoneUrl = `tel:${phoneNumber}`
    
    // Show notification to user
    if (navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad') || navigator.userAgent.includes('Mac')) {
      // For Apple devices, try FaceTime first
      window.location.href = facetimeUrl
      
      // Fallback after a short delay
      setTimeout(() => {
        window.location.href = phoneUrl
      }, 1000)
    } else {
      // For other devices, try phone call
      window.location.href = phoneUrl
    }
    
    // Show browser notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Opening FaceTime Call', {
        body: `Calling ${phoneNumber}`,
        icon: '/placeholder-logo.png'
      })
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('Opening FaceTime Call', {
            body: `Calling ${phoneNumber}`,
            icon: '/placeholder-logo.png'
          })
        }
      })
    }
  }

  const handleWhatsAppCall = () => {
    const phoneNumber = "313-629-7791"
    const message = "Hi! I'd like to schedule a service with Serenity Services."
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    
    window.open(whatsappUrl, '_blank')
    
    // Show browser notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Opening WhatsApp', {
        body: `Opening WhatsApp chat with ${phoneNumber}`,
        icon: '/placeholder-logo.png'
      })
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('Opening WhatsApp', {
            body: `Opening WhatsApp chat with ${phoneNumber}`,
            icon: '/placeholder-logo.png'
          })
        }
      })
    }
  }

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
            
          </Link>
        </div>

        {/* Right - CTA Button */}
        <div className="flex items-center">
          <Button
            onClick={handleMakeAppointment}
            className="bg-transparent text-white hover:text-gray-200 px-4 py-2 border-none font-medium text-sm tracking-wide"
          >
            MAKE AN APPOINTMENT
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
            className="fixed inset-0 z-50 flex"
            style={{ backgroundColor: '#C9BEE2' }}
          >
            {/* Header */}
            <div className="absolute top-0 left-0 w-full flex items-center justify-between px-6 py-4">
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="hover:opacity-70 transition-opacity"
                style={{ color: '#284C67' }}
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="text-2xl font-light tracking-wide" style={{ color: '#284C67' }}>
                
              </div>
              
              <Button
                onClick={handleMakeAppointment}
                className="bg-transparent hover:opacity-70 px-4 py-2 border-none font-medium text-sm tracking-wide transition-opacity"
                style={{ color: '#284C67' }}
              >
                MAKE AN APPOINTMENT
              </Button>
            </div>

            {/* Menu Content */}
            <div className="flex w-full h-full pt-20">
              {/* Left Panel */}
              <div className="w-1/2 p-12 flex flex-col justify-between">
                <div>
                  <h2 className="text-4xl font-light mb-8" style={{ color: '#284C67' }}>MENU</h2>
                  
                  {/* Social Links */}
                  <div className="mb-12">
                    <Link href="#" className="hover:opacity-70 transition-opacity block mb-2" style={{ color: '#284C67' }}>
                      <Facebook className="w-5 h-5 inline mr-2" />
                      FACEBOOK
                    </Link>
                    <Link href="https://www.instagram.com/serenityservicesga?igsh=MTMwdTZjbXRiamUxMQ==" className="hover:opacity-70 transition-opacity block" style={{ color: '#284C67' }}>
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
                        className="hover:opacity-70 transition-opacity block mb-4"
                        style={{ color: '#284C67' }}
                      >
                        / {item.name}
                      </Link>
                    ))}
                  </div>

                  {/* Booking Options */}
                  <div className="mb-12">
                    <h3 className="text-lg font-medium mb-4" style={{ color: '#284C67' }}>FOR BOOKING</h3>
                    <button 
                      onClick={handleWhatsAppCall}
                      className="hover:opacity-70 transition-opacity block mb-2 w-full text-left"
                      style={{ color: '#284C67' }}
                    >
                      <MessageCircle className="w-4 h-4 inline mr-2" />
                      / SCHEDULE VIA WHATSAPP
                    </button>
                    <button 
                      onClick={handleMakeAppointment}
                      className="hover:opacity-70 transition-opacity block w-full text-left"
                      style={{ color: '#284C67' }}
                    >
                      <Phone className="w-4 h-4 inline mr-2" />
                      / SCHEDULE VIA CALL
                    </button>
                  </div>
                </div>

                {/* Contact Button */}
                <div className="flex items-center gap-4">
                  <Button 
                    onClick={() => setIsMenuOpen(false)}
                    className="bg-gray-200 text-black hover:bg-gray-300 px-6 py-3 rounded-none"
                  >
                    BOOK NOW
                  </Button>
                  <Button 
                    asChild
                    className="bg-gray-200 text-black hover:bg-gray-300 px-6 py-3 rounded-none"
                  >
                    <Link href="/contact">CONTACT US</Link>
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
                            <div className="text-sm font-light" style={{ color: '#284C67' }}>{service.id}</div>
                            <div className="text-lg font-medium" style={{ color: '#284C67' }}>{service.name}</div>
                            <div className="text-gray-400 text-sm">{service.category}</div>
                          </div>
                          <ArrowUpRight className="w-4 h-4" style={{ color: '#284C67' }} />
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
