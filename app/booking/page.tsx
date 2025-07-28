"use client"
import { useState, useEffect } from "react"
import type React from "react"
import { useRouter } from "next/navigation"
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
import { ArrowLeft, CalendarIcon, Clock, AlertCircle } from "lucide-react"
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

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validateForm = () => {
    if (!selectedService) {
      setError("Please select a service")
      return false
    }
    if (!selectedDate) {
      setError("Please select a date")
      return false
    }
    if (!selectedTime) {
      setError("Please select a time")
      return false
    }
    if (!formData.name.trim()) {
      setError("Please enter your name")
      return false
    }
    if (!formData.email.trim()) {
      setError("Please enter your email")
      return false
    }
    if (!formData.phone.trim()) {
      setError("Please enter your phone number")
      return false
    }
    if (!formData.address.trim()) {
      setError("Please enter your address")
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
      // Create payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: getServiceAmount(selectedService),
          service: selectedService,
          customerDetails: formData,
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create payment intent')
      }

      const data = await response.json()
      
      console.log('Payment intent response:', data) // Debug log
      
      // Check if we have a valid clientSecret
      if (!data.clientSecret) {
        console.error('No clientSecret in response:', data) // Debug log
        throw new Error('Invalid payment intent response')
      }
      
      console.log('Setting payment intent with clientSecret:', data.clientSecret) // Debug log
      setPaymentIntent(data)
      setShowPayment(true)
    } catch (error) {
      console.error('Error creating payment intent:', error)
      setError(error instanceof Error ? error.message : 'Failed to initialize payment. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    try {
      console.log('Payment successful, creating order with paymentIntentId:', paymentIntentId)
      
      // Save order to database
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerDetails: formData,
          service: selectedService,
          amount: getServiceAmount(selectedService),
          paymentIntentId: paymentIntentId,
          scheduledDate: selectedDate?.toISOString().split('T')[0],
          scheduledTime: selectedTime,
        })
      })

      console.log('Order API response status:', orderResponse.status)

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json()
        console.error('Order creation failed:', errorData)
        throw new Error(`Failed to save order: ${errorData.error || 'Unknown error'}`)
      }

      const orderData = await orderResponse.json()
      console.log('Order created successfully:', orderData)

      // Redirect to success page
      router.push(`/success?payment_intent=${paymentIntentId}`)
    } catch (error) {
      console.error('Error saving order:', error)
      setError(error instanceof Error ? error.message : 'Payment successful but failed to save order. Please contact support.')
    }
  }

  if (showPayment && paymentIntent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setShowPayment(false)}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-primary">Complete Payment</h1>
              <p className="text-primary">Secure payment powered by Stripe</p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="border-primary">
              <CardHeader>
                <CardTitle className="text-primary">Payment Details</CardTitle>
                <CardDescription>
                  Amount: ${getServiceAmount(selectedService)} - {services.find(s => s.id === selectedService)?.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Elements stripe={stripePromise} options={{ clientSecret: paymentIntent.clientSecret }}>
                  <PaymentForm 
                    clientSecret={paymentIntent.clientSecret}
                    onSuccess={handlePaymentSuccess}
                    onError={(error) => setError(error)}
                  />
                </Elements>
              </CardContent>
            </Card>
          </div>
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
            <h1 className="text-3xl font-bold text-primary">Book a Service</h1>
            <p className="text-primary">Schedule your appointment with Serenity Services</p>
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
          
          <Card className="border-primary">
            <CardHeader>
              <CardTitle className="text-primary">Service Booking</CardTitle>
              <CardDescription>Fill out the form below to schedule your service</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Service Selection */}
                <div className="space-y-2">
                  <Label htmlFor="service">Select Service *</Label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.name} - {service.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

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

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Service Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Where should we provide the service?"
                    required
                  />
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
                  {isSubmitting ? "Processing..." : "Proceed to Payment"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
