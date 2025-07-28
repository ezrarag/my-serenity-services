"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Home, Calendar, Mail } from "lucide-react"

function SuccessContent() {
  const searchParams = useSearchParams()
  const [paymentStatus, setPaymentStatus] = useState<string>("loading")
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const paymentIntent = searchParams.get("payment_intent")
    const paymentIntentClientSecret = searchParams.get("payment_intent_client_secret")

    console.log('Success page: useEffect triggered')
    console.log('Success page: payment_intent from URL:', paymentIntent)
    console.log('Success page: payment_intent_client_secret from URL:', paymentIntentClientSecret)

    if (paymentIntent) {
      // First verify payment status
      verifyPayment(paymentIntent)
    } else {
      console.log('Success page: No payment_intent found in URL')
      setPaymentStatus("error")
      setError("No payment information found")
    }
  }, [searchParams])

  const verifyPayment = async (paymentIntentId: string) => {
    try {
      console.log('Success page: Verifying payment:', paymentIntentId)
      
      const response = await fetch(`/api/verify-payment?payment_intent=${paymentIntentId}`)
      const data = await response.json()
      
      if (data.success) {
        console.log('Success page: Payment verified, creating order')
        setPaymentStatus("success")
        
        // Create order in database
        await createOrder(paymentIntentId, data.paymentIntent)
      } else {
        setPaymentStatus("failed")
        setError("Payment verification failed")
      }
    } catch (error) {
      console.error("Error verifying payment:", error)
      setPaymentStatus("error")
      setError("Failed to verify payment")
    }
  }

  const createOrder = async (paymentIntentId: string, paymentIntent: any) => {
    try {
      console.log('Success page: Creating order for payment:', paymentIntentId)
      console.log('Success page: Payment intent metadata:', paymentIntent.metadata)
      
      // Extract customer details from payment intent metadata
      const metadata = paymentIntent.metadata
      const customerDetails = {
        name: metadata.customer_name || 'Unknown Customer',
        email: metadata.customer_email || 'unknown@example.com',
        phone: metadata.customer_phone || '',
        address: metadata.customer_address || 'Address not provided',
        notes: metadata.notes || ''
      }

      console.log('Success page: Extracted customer details:', customerDetails)

      // First, create/update user record
      const userResponse = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: customerDetails.email,
          name: customerDetails.name,
          phone: customerDetails.phone,
          address: customerDetails.address
        })
      })

      console.log('Success page: User API response status:', userResponse.status)

      if (!userResponse.ok) {
        const userErrorData = await userResponse.json()
        console.error('Success page: User creation failed:', userErrorData)
        // Continue with order creation even if user creation fails
      } else {
        const userData = await userResponse.json()
        console.log('Success page: User created/updated successfully:', userData)
      }

      // Then create the order
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerDetails: customerDetails,
          service: metadata.service_type || 'Unknown Service',
          amount: paymentIntent.amount / 100, // Convert from cents
          paymentIntentId: paymentIntentId,
          scheduledDate: metadata.scheduled_date || new Date().toISOString().split('T')[0],
          scheduledTime: metadata.scheduled_time || '12:00',
        })
      })

      console.log('Success page: Order API response status:', orderResponse.status)

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json()
        console.error('Success page: Order creation failed:', errorData)
        setError(`Payment successful but failed to save order: ${errorData.error || 'Unknown error'}`)
        return
      }

      const orderData = await orderResponse.json()
      console.log('Success page: Order created successfully:', orderData)
      setOrderDetails(orderData.order)
      
    } catch (error) {
      console.error('Success page: Error creating order:', error)
      setError('Payment successful but failed to save order. Please contact support.')
    }
  }

  if (paymentStatus === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary to-primary/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-primary">Verifying your payment...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary to-primary/30">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="border-primary">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              </div>
              <CardTitle className="text-3xl font-bold text-primary">
                Payment Successful!
              </CardTitle>
              <CardDescription className="text-lg">
                Thank you for choosing Serenity Services. Your booking has been confirmed.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {orderDetails && (
                <div className="bg-secondary/50 rounded-lg p-6 space-y-4">
                  <h3 className="font-semibold text-primary">Order Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    <div>
                      <p className="text-sm text-muted-foreground">Service</p>
                      <p className="font-medium">{orderDetails.service_type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Amount</p>
                      <p className="font-medium">${orderDetails.amount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium">{orderDetails.scheduled_date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Time</p>
                      <p className="font-medium">{orderDetails.scheduled_time}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>You'll receive a confirmation email shortly</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>We'll contact you 24 hours before your appointment</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild className="flex-1">
                  <Link href="/dashboard">
                    <Home className="w-4 h-4 mr-2" />
                    Go to Dashboard
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link href="/booking">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Another Service
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary to-primary/30 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-primary">Loading...</p>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SuccessContent />
    </Suspense>
  )
} 