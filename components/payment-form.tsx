"use client"

import { useState } from "react"
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"

interface PaymentFormProps {
  clientSecret: string
  onSuccess: (paymentIntentId: string) => void
  onError: (error: string) => void
}

export function PaymentForm({ clientSecret, onSuccess, onError }: PaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState("")

  // Debug logging
  console.log('PaymentForm received clientSecret:', clientSecret)

  // Check if clientSecret is valid
  if (!clientSecret) {
    console.error('PaymentForm: No clientSecret provided')
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-4">Invalid payment configuration</div>
        <Button onClick={() => onError("Payment configuration error")}>
          Try Again
        </Button>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      setError("Stripe has not loaded yet. Please try again.")
      return
    }

    setIsProcessing(true)
    setError("")

    try {
      const { error: submitError } = await elements.submit()
      if (submitError) {
        setError(submitError.message || "Payment failed")
        onError(submitError.message || "Payment failed")
        return
      }

      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/success`,
        },
      })

      if (confirmError) {
        setError(confirmError.message || "Payment failed")
        onError(confirmError.message || "Payment failed")
      } else {
        // Payment succeeded - call our callback
        console.log('Payment confirmed successfully, calling onSuccess callback')
        const paymentIntent = await stripe.retrievePaymentIntent(clientSecret)
        if (paymentIntent.paymentIntent) {
          console.log('Payment intent retrieved:', paymentIntent.paymentIntent.id)
          onSuccess(paymentIntent.paymentIntent.id)
        } else {
          console.error('Failed to retrieve payment intent')
          onError('Payment succeeded but failed to retrieve payment details')
        }
      }
    } catch (error) {
      console.error("Payment error:", error)
      setError("An unexpected error occurred. Please try again.")
      onError("An unexpected error occurred. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <PaymentElement />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={!stripe || isProcessing}
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Processing Payment...
          </>
        ) : (
          "Pay Now"
        )}
      </Button>

      <div className="text-xs text-muted-foreground text-center">
        Your payment is secured by Stripe. We never store your card details.
      </div>
    </form>
  )
} 