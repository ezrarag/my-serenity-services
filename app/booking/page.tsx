"use client"
import { useState, useEffect } from "react"
import type React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { PaymentForm } from "@/components/payment-form"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ArrowLeft, CalendarIcon, Clock, AlertCircle, CheckCircle } from "lucide-react"
import { format } from "date-fns"
import { PricingModal } from "@/components/pricing-modal"
import { EnvStatus } from "@/components/env-status"
import { Alert, AlertDescription } from "@/components/ui/alert"

const services = [
  { id: "cleaning", name: "House Cleaning", price: "$60/hour" },
  { id: "cooking", name: "Meal Preparation", price: "$50/hour" },
  { id: "combo", name: "Cleaning + Cooking Combo", price: "$75/hour" },
  { id: "massage-60", name: "Full Body Massage (60 min)", price: "$100" },
  { id: "massage-30", name: "Express Massage (30 min)", price: "$50" },
]

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"]

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function BookingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedService, setSelectedService] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [showPayment, setShowPayment] = useState(false)
  const [paymentIntent, setPaymentIntent] = useState<any>(null)
  const [orderId, setOrderId] = useState<string>("")
  const [paymentIntentId, setPaymentIntentId] = useState<string>("")

  useEffect(() => {
    // Get order and payment data from URL parameters (when coming from checkout)
    const orderParam = searchParams.get('order')
    const paymentIntentParam = searchParams.get('payment_intent')
    
    if (orderParam) {
      setOrderId(orderParam)
    }
    if (paymentIntentParam) {
      setPaymentIntentId(paymentIntentParam)
    }
  }, [searchParams])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validateForm = () => {
    if (!selectedDate) {
      setError("Please select a date")
      return false
    }
    if (!selectedTime) {
      setError("Please select a time")
      return false
    }
    setError("")
    return true
  }

  const getServiceAmount = (serviceId: string) => {
    switch (serviceId) {
      case "cleaning":
        return 60
      case "cooking":
        return 50
      case "combo":
        return 75
      case "massage-60":
        return 100
      case "massage-30":
        return 50
      default:
        return 60
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      // Update order with scheduling information
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scheduledDate: selectedDate?.toISOString().split('T')[0],
          scheduledTime: selectedTime,
          notes: formData.notes,
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update order')
      }

      const orderData = await response.json()
      console.log('Order updated successfully:', orderData)

      // Redirect to success page
      router.push(`/success?payment_intent=${paymentIntentId}`)
    } catch (error) {
      console.error('Error updating order:', error)
      setError(error instanceof Error ? error.message : 'Failed to schedule your service. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
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
            <h1 className="text-3xl font-bold text-primary">Schedule Your Service</h1>
            <p className="text-primary">Choose your preferred date and time for your service</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* Environment Status (Development Only) */}
          {process.env.NODE_ENV === 'development' && <EnvStatus />}
          
          {/* Pricing Modal */}
          <div className="text-center">
            <PricingModal />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {orderId && paymentIntentId && (
            <Alert className="mb-6 border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Payment successful! Please schedule your service below.
              </AlertDescription>
            </Alert>
          )}
          
          <Card className="border-primary">
            <CardHeader>
              <CardTitle className="text-primary">Service Scheduling</CardTitle>
              <CardDescription>Choose your preferred date and time for your service</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Date Selection */}
                <div className="space-y-2">
                  <Label>Select Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Time Selection */}
                <div className="space-y-2">
                  <Label htmlFor="time">Select Time *</Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {time}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder="Any special requests or notes..."
                    rows={3}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/80 text-white py-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Schedule Service"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
