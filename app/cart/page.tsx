"use client"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Minus, Trash2, ShoppingCart, CreditCard } from "lucide-react"

const services = [
  {
    id: "cleaning",
    title: "House Cleaning",
    description: "Professional deep cleaning services that transform your space.",
    price: 60,
    duration: "1 hour"
  },
  {
    id: "cooking",
    title: "Meal Preparation",
    description: "Nutritious and delicious meals prepared with fresh ingredients.",
    price: 50,
    duration: "1 hour"
  },
  {
    id: "combo",
    title: "Cleaning + Cooking Combo",
    description: "Complete home care package that addresses both your space and nourishment needs.",
    price: 75,
    duration: "1 hour"
  },
  {
    id: "massage-60",
    title: "Full Body Massage",
    description: "60-minute therapeutic massage designed to release tension and restore balance.",
    price: 100,
    duration: "60 minutes"
  },
  {
    id: "massage-30",
    title: "Express Massage",
    description: "30-minute relaxation massage for those moments when you need a quick escape.",
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

export default function CartPage() {
  const searchParams = useSearchParams()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Loading cart...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button asChild variant="ghost" size="icon">
            <Link href="/">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-primary">Your Cart</h1>
            <p className="text-primary">Review your selected services</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {cartItems.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                  <p className="text-gray-600 mb-6">Add some services to get started</p>
                  <Button asChild>
                    <Link href="/">
                      Browse Services
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                          <p className="text-gray-600 text-sm mb-2">{item.duration}</p>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold">${item.price * item.quantity}</p>
                          <p className="text-sm text-gray-600">${item.price} each</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Add More Services */}
            {cartItems.length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Add More Services</CardTitle>
                  <CardDescription>Select additional services for your appointment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((service) => (
                      <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">{service.title}</h4>
                          <p className="text-sm text-gray-600">{service.duration}</p>
                          <p className="text-sm font-medium">${service.price}</p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => addToCart(service)}
                          disabled={cartItems.some(item => item.id === service.id)}
                        >
                          {cartItems.some(item => item.id === service.id) ? 'Added' : 'Add'}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
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
                  className="w-full" 
                  disabled={cartItems.length === 0}
                >
                  <Link href={`/booking?cart=${JSON.stringify(cartItems)}`}>
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
    </div>
  )
} 