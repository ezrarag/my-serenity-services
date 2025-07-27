"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Home, Calendar, Mail } from "lucide-react"

function SuccessContent() {
  const searchParams = useSearchParams()
  const [paymentStatus, setPaymentStatus] = useState<string>("")
  const [orderDetails, setOrderDetails] = useState<any>(null)

  useEffect(() => {
    const paymentIntent = searchParams.get("payment_intent")
    const paymentIntentClientSecret = searchParams.get("payment_intent_client_secret")

    if (paymentIntent) {
      // Verify payment status with your backend
      verifyPayment(paymentIntent)
    }
  }, [searchParams])

  const verifyPayment = async (paymentIntentId: string) => {
    try {
      const response = await fetch(`/api/verify-payment?payment_intent=${paymentIntentId}`)
      const data = await response.json()
      
      if (data.success) {
        setPaymentStatus("success")
        setOrderDetails(data.order)
      } else {
        setPaymentStatus("failed")
      }
    } catch (error) {
      console.error("Error verifying payment:", error)
      setPaymentStatus("error")
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
                  <Link href="/">
                    <Home className="w-4 h-4 mr-2" />
                    Return Home
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