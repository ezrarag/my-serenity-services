"use client"
import { useState, useEffect, Suspense, useRef } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Minus, Trash2, ShoppingCart, CreditCard, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"

const services = [
  {
    id: "cleaning",
    title: "House Cleaning",
    description: "Professional deep cleaning services that transform your space. Every detail is attended to with care, ensuring a pristine environment that promotes peace and tranquility.",
    price: 60,
    duration: "1 hour"
  },
  {
    id: "cooking",
    title: "Meal Preparation",
    description: "Nutritious and delicious meals prepared with fresh ingredients. Our culinary experts craft balanced dishes that nourish both body and soul.",
    price: 50,
    duration: "1 hour"
  },
  {
    id: "combo",
    title: "Cleaning + Cooking Combo",
    description: "Complete home care package that addresses both your space and nourishment needs. A harmonious blend of cleanliness and culinary excellence.",
    price: 75,
    duration: "1 hour"
  },
  {
    id: "massage-60",
    title: "Full Body Massage",
    description: "60-minute therapeutic massage designed to release tension and restore balance. Experience true relaxation through skilled hands and mindful techniques.",
    price: 100,
    duration: "60 minutes"
  },
  {
    id: "massage-30",
    title: "Express Massage",
    description: "30-minute relaxation massage for those moments when you need a quick escape. Efficient yet effective treatment for immediate relief.",
    price: 50,
    duration: "30 minutes"
  }
]

interface CartItem {
  id: string
  title: string
  price: number
  quantity: number
  duration: string
}

function CartContent() {
  const searchParams = useSearchParams()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  
  // Transform values for animations
  const scrollLineHeight = useTransform(scrollY, [0, 300], [0, 100])

  useEffect(() => {
    // Get service from URL parameter (when coming from hamburger menu)
    const serviceId = searchParams.get('service')
    
    if (serviceId) {
      const service = services.find(s => s.id === serviceId)
      if (service) {
        setCartItems([{
          id: service.id,
          title: service.title,
          price: service.price,
          quantity: 1,
          duration: service.duration
        }])
      }
    }
    
    setLoading(false)
  }, [searchParams])

  // Auto-scroll carousel every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(services.length / 3))
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  const addToCart = (service: any) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === service.id)
      if (existingItem) {
        return prev.map(item =>
          item.id === service.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prev, {
          id: service.id,
          title: service.title,
          price: service.price,
          quantity: 1,
          duration: service.duration
        }]
      }
    })
  }

  const removeFromCart = (serviceId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== serviceId))
  }

  const updateQuantity = (serviceId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(serviceId)
      return
    }
    
    setCartItems(prev => prev.map(item =>
      item.id === serviceId
        ? { ...item, quantity: newQuantity }
        : item
    ))
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(services.length / 3))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(services.length / 3)) % Math.ceil(services.length / 3))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Loading cart...</p>
        </div>
      </div>
    )
  }

  const firstItem = cartItems[0]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-40 bg-black/10 backdrop-blur-sm">
        <Button asChild variant="ghost" size="icon" className="text-white">
          <Link href="/">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div className="text-white text-2xl font-light tracking-wide">
          SERENITY
        </div>
        <div></div>
      </div>

      {/* Main Content - Single Section Design */}
      <div className="flex h-screen">
        {/* Left Panel - Text Content */}
        <div className="w-1/2 bg-[#8B4513] relative flex items-center justify-center p-12">
          <div className="text-white max-w-md">
            {/* Service ID */}
            <div className="mb-8">
              <div className="border border-white px-4 py-2 inline-block text-sm font-light">
                001 {firstItem ? firstItem.title.toUpperCase().replace(/\s+/g, '') : 'SERVICE'}
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-6xl font-light mb-8 leading-tight">
              {firstItem ? firstItem.title : 'Service'}
            </h1>

            {/* Scroll Indicator */}
            <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
              <div className="text-white text-sm font-light mb-4">SCROLL</div>
              <motion.div 
                className="w-px bg-white"
                style={{ height: scrollLineHeight }}
              ></motion.div>
            </div>

            {/* Description */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Add More Services</h2>
              <p className="text-lg opacity-90">
                Select additional services for your appointment to create a complete experience tailored to your needs.
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel - Image and Order Summary */}
        <div className="w-1/2 relative overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://xsdmcedkxpzfmfkkkgnd.supabase.co/storage/v1/object/public/landing//pexels-liliana-drew-9462144%202.jpg)`,
            }}
          >
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          {/* Order Summary Card */}
          <div className="absolute top-1/2 right-8 transform -translate-y-1/2 w-80">
            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.title} x{item.quantity}</span>
                      <span>${item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Total ({getTotalItems()} items)</span>
                    <span>${getTotalPrice()}</span>
                  </div>
                </div>

                <Button 
                  asChild 
                  className="w-full bg-black text-white hover:bg-gray-800" 
                  disabled={cartItems.length === 0}
                >
                  <Link href={`/checkout?cart=${JSON.stringify(cartItems)}`}>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Proceed to Checkout
                  </Link>
                </Button>

                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full"
                >
                  <Link href="/">
                    Continue Shopping
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Services Section - Matching EVER Design */}
      <section className="min-h-screen bg-[#FEFBEB] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-[#8B4513] mb-4">EXPERIENCE THE SERVICE</h2>
              <h1 className="text-6xl font-light text-[#8B4513]">SERVICE OPTIONS</h1>
            </div>

            {/* Carousel Container */}
            <div className="relative">
              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300"
              >
                <ChevronLeft className="w-6 h-6 text-[#8B4513]" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300"
              >
                <ChevronRight className="w-6 h-6 text-[#8B4513]" />
              </button>

              {/* Carousel */}
              <div className="overflow-hidden">
                <motion.div
                  ref={carouselRef}
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${currentSlide * 100}%)`,
                  }}
                >
                  {Array.from({ length: Math.ceil(services.length / 3) }, (_, slideIndex) => (
                    <div key={slideIndex} className="flex-shrink-0 w-full">
                      <div className="grid grid-cols-3 gap-8">
                        {services.slice(slideIndex * 3, slideIndex * 3 + 3).map((service, index) => (
                          <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group cursor-pointer"
                          >
                            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                              {/* Service ID */}
                              <div className="mb-4">
                                <div className="text-[#8B4513] text-sm font-light">
                                  {String(slideIndex * 3 + index + 1).padStart(3, '0')} SERENITY
                                </div>
                                <div className="border-b-2 border-dashed border-[#8B4513] w-16 mt-1"></div>
                              </div>

                              {/* Service Title */}
                              <h3 className="text-2xl font-semibold text-[#8B4513] mb-4">
                                {service.title}
                              </h3>

                              {/* Service Description */}
                              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                                {service.description}
                              </p>

                              {/* Service Image Placeholder */}
                              <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                                <div className="text-gray-500 text-sm">Service Image</div>
                              </div>

                              {/* Add to Cart Button */}
                              <Button
                                onClick={() => addToCart(service)}
                                disabled={cartItems.some(item => item.id === service.id)}
                                className="w-full bg-[#8B4513] text-white hover:bg-[#A0522D] transition-colors duration-300"
                              >
                                {cartItems.some(item => item.id === service.id) ? 'Added to Cart' : 'Add to Cart'}
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: Math.ceil(services.length / 3) }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentSlide === index ? 'bg-[#8B4513]' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function CartPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Loading cart...</p>
        </div>
      </div>
    }>
      <CartContent />
    </Suspense>
  )
} 