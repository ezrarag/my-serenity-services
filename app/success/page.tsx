"use client"
import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"

function SuccessContent() {
  const searchParams = useSearchParams()
  const [paymentStatus, setPaymentStatus] = useState<"loading" | "success" | "failed">("loading")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const payment_intent = searchParams.get('payment_intent')
    const payment_intent_client_secret = searchParams.get('payment_intent_client_secret')
    
    console.log('Success page loaded with:', { payment_intent, payment_intent_client_secret })
    
    if (payment_intent) {
      verifyPayment(payment_intent)
    } else {
      setPaymentStatus("failed")
      setError("No payment intent found")
    }
  }, [searchParams])

  const verifyPayment = async (paymentIntentId: string) => {
    try {
      const response = await fetch(`/api/verify-payment?payment_intent=${paymentIntentId}`)
      const data = await response.json()
      
      if (data.success) {
        setPaymentStatus("success")
        // Create order after successful payment verification
        await createOrder(paymentIntentId, data.paymentIntent)
      } else {
        setPaymentStatus("failed")
        setError(data.error || "Payment verification failed")
      }
    } catch (error) {
      console.error('Payment verification error:', error)
      setPaymentStatus("failed")
      setError("Failed to verify payment")
    }
  }

  const createOrder = async (paymentIntentId: string, paymentIntent: any) => {
    try {
      console.log('Creating order with payment intent:', paymentIntent)
      
      // Extract customer details from metadata
      const customerDetails = {
        name: paymentIntent.metadata?.customer_name || 'Unknown',
        email: paymentIntent.metadata?.customer_email || 'unknown@example.com',
        phone: paymentIntent.metadata?.customer_phone || '',
        address: paymentIntent.metadata?.customer_address || '',
        notes: paymentIntent.metadata?.notes || ''
      }
      
      const service_type = paymentIntent.metadata?.service_type || 'unknown'
      const amount = (paymentIntent.amount / 100) || 0
      const scheduled_date = paymentIntent.metadata?.scheduled_date || new Date().toISOString().split('T')[0]
      const scheduled_time = paymentIntent.metadata?.scheduled_time || '12:00'
      
      console.log('Extracted customer details:', customerDetails)
      console.log('Service type:', service_type)
      console.log('Amount:', amount)
      
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
      
      console.log('User creation response:', userResponse.status)
      
      if (!userResponse.ok) {
        console.error('Failed to create/update user')
      }
      
      // Then create the order
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerDetails,
          service: service_type,
          amount,
          paymentIntentId,
          scheduledDate: scheduled_date,
          scheduledTime: scheduled_time
        })
      })
      
      console.log('Order creation response:', orderResponse.status)
      
      if (!orderResponse.ok) {
        console.error('Failed to create order')
      }
      
    } catch (error) {
      console.error('Order creation error:', error)
    }
  }

  if (paymentStatus === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <Loader2 className="w-12 h-12 text-green-600 mx-auto mb-4 animate-spin" />
            <h2 className="text-xl font-semibold mb-2">Processing Payment</h2>
            <p className="text-gray-600">Please wait while we verify your payment...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (paymentStatus === "failed") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Payment Failed</h2>
            <p className="text-gray-600 mb-6">{error || "Something went wrong with your payment."}</p>
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/booking">Try Again</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/">Return Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="text-center py-8">
          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <CardTitle className="text-2xl mb-2">Payment Successful!</CardTitle>
          <p className="text-gray-600 mb-6">
            Thank you for your booking. We've received your payment and will contact you soon to confirm your appointment details.
          </p>
          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/booking">Book Another Service</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <Loader2 className="w-12 h-12 text-green-600 mx-auto mb-4 animate-spin" />
            <h2 className="text-xl font-semibold mb-2">Loading...</h2>
            <p className="text-gray-600">Please wait...</p>
          </CardContent>
        </Card>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
} 