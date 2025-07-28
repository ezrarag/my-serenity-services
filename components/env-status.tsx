"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

export function EnvStatus() {
  const [envStatus, setEnvStatus] = useState<{
    stripe: boolean
    supabase: boolean
    allConfigured: boolean
  }>({
    stripe: false,
    supabase: false,
    allConfigured: false
  })

  useEffect(() => {
    // Check if environment variables are available
    const checkEnv = async () => {
      try {
        // Test Stripe configuration
        const stripeResponse = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: 100,
            service: 'test',
            customerDetails: { name: 'test', email: 'test@test.com', phone: '', address: '', notes: '' }
          })
        })

        // Test Supabase configuration - include email parameter
        const supabaseResponse = await fetch('/api/orders?email=test@test.com')

        setEnvStatus({
          stripe: stripeResponse.status !== 500,
          supabase: supabaseResponse.status !== 500,
          allConfigured: stripeResponse.status !== 500 && supabaseResponse.status !== 500
        })
      } catch (error) {
        console.error('Environment check failed:', error)
        setEnvStatus({
          stripe: false,
          supabase: false,
          allConfigured: false
        })
      }
    }

    // Only run in development
    if (process.env.NODE_ENV === 'development') {
      checkEnv()
    }
  }, [])

  // Don't render anything in production or during build
  if (process.env.NODE_ENV === 'production' || typeof window === 'undefined') {
    return null
  }

  return (
    <Card className="mb-4 border-orange-200 bg-orange-50">
      <CardHeader>
        <CardTitle className="text-sm">Environment Status</CardTitle>
        <CardDescription>Configuration check for development</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm">Stripe Configuration:</span>
          <Badge variant={envStatus.stripe ? "default" : "destructive"}>
            {envStatus.stripe ? (
              <>
                <CheckCircle className="w-3 h-3 mr-1" />
                Configured
              </>
            ) : (
              <>
                <XCircle className="w-3 h-3 mr-1" />
                Missing
              </>
            )}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Supabase Configuration:</span>
          <Badge variant={envStatus.supabase ? "default" : "destructive"}>
            {envStatus.supabase ? (
              <>
                <CheckCircle className="w-3 h-3 mr-1" />
                Configured
              </>
            ) : (
              <>
                <XCircle className="w-3 h-3 mr-1" />
                Missing
              </>
            )}
          </Badge>
        </div>
        <div className="mt-2 p-2 bg-yellow-100 rounded text-xs">
          <AlertCircle className="w-3 h-3 inline mr-1" />
          Set up your environment variables in <code>.env.local</code> to enable payments
        </div>
      </CardContent>
    </Card>
  )
} 