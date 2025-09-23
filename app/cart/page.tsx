"use client"
import { useState, useEffect, Suspense, useRef } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Minus, Trash2, ShoppingCart, CreditCard, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useVisitorData } from "@/hooks/use-visitor-data"

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
  const [currentSlide, setCurrentSlide] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  
  // Use visitor data hook for persistent cart management
  const { 
    cartItems: cartItems, 
    addToCart, 
    removeFromCart, 
    updateCartItemQuantity, 
    clearCart,
    getCartTotal,
    getCartItemCount,
    loading: visitorDataLoading 
  } = useVisitorData()
  
  // Ensure cartItems is always an array
  const safeCartItems = cartItems || []
  
  // Transform values for animations
  const scrollLineHeight = useTransform(scrollY, [0, 300], [0, 100])

  useEffect(() => {
    // Get service from URL parameter (when coming from hamburger menu)
    const serviceId = searchParams.get('service')
    
    if (serviceId && !visitorDataLoading) {
      const service = services.find(s => s.id === serviceId)
      if (service) {
        addToCart({
          id: service.id,
          title: service.title,
          price: service.price,
          quantity: 1,
          duration: service.duration
        })
      }
    }
  }, [searchParams, visitorDataLoading, addToCart])

  // Auto-scroll carousel every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(services.length / 3))
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  const handleAddToCart = (service: any) => {
    addToCart({
      id: service.id,
      title: service.title,
      price: service.price,
      quantity: 1,
      duration: service.duration
    })
  }

  const handleRemoveFromCart = (serviceId: string) => {
    removeFromCart(serviceId)
  }

  const handleUpdateQuantity = (serviceId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(serviceId)
    } else {
      updateCartItemQuantity(serviceId, newQuantity)
    }
  }

  const getTotalPrice = () => {
    return getCartTotal()
  }

  const getTotalItems = () => {
    return getCartItemCount()
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(services.length / 3))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(services.length / 3)) % Math.ceil(services.length / 3))
  }

  const handleCheckout = () => {
    if (safeCartItems.length === 0) return
    
    // Encode cart data for checkout
    const cartData = encodeURIComponent(JSON.stringify(safeCartItems))
    window.location.href = `/checkout?cart=${cartData}`
  }

  if (visitorDataLoading) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-amber-800">Loading your cart...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-amber-600 hover:text-amber-700">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-3xl font-light text-gray-900">Your Cart</h1>
                <p className="text-gray-600">Review and manage your selected services</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-amber-600">{getTotalItems()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Price</p>
                <p className="text-2xl font-bold text-amber-600">${getTotalPrice()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-amber-600" />
                  Cart Items ({getTotalItems()})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {safeCartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                    <p className="text-gray-600 mb-4">Add some services to get started</p>
                    <Button asChild>
                      <Link href="/services">Browse Services</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.title}</h4>
                          <p className="text-sm text-gray-600">{item.duration}</p>
                          <p className="text-lg font-bold text-amber-600">${item.price}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border rounded-lg">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="px-4 py-1 text-center min-w-[3rem]">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Services Carousel */}
            <Card>
              <CardHeader>
                <CardTitle>More Services</CardTitle>
                <CardDescription>Discover additional services to enhance your experience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="flex gap-4 overflow-hidden" ref={carouselRef}>
                    {services.map((service, index) => (
                      <motion.div
                        key={service.id}
                        className="flex-shrink-0 w-80"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="h-full">
                          <CardContent className="p-6">
                            <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                            <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-2xl font-bold text-amber-600">${service.price}</p>
                                <p className="text-sm text-gray-500">{service.duration}</p>
                              </div>
                              <Button 
                                onClick={() => handleAddToCart(service)}
                                className="bg-amber-600 hover:bg-amber-700"
                              >
                                Add to Cart
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Carousel Navigation */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 bg-white shadow-lg"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 bg-white shadow-lg"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Checkout Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.title} x {item.quantity}</span>
                      <span>${item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${getTotalPrice()}</span>
                  </div>
                </div>

                <Button 
                  onClick={handleCheckout}
                  disabled={safeCartItems.length === 0}
                  className="w-full bg-amber-600 hover:bg-amber-700"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Proceed to Checkout
                </Button>

                <Button 
                  onClick={clearCart}
                  variant="outline"
                  disabled={safeCartItems.length === 0}
                  className="w-full"
                >
                  Clear Cart
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CartPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-amber-800">Loading...</p>
        </div>
      </div>
    }>
      <CartContent />
    </Suspense>
  )
} 