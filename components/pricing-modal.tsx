"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, CreditCard } from "lucide-react"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const pricingPlans = [
  {
    id: "full-package",
    name: "Full Package",
    description: "Deep clean + Cook + Massage",
    price: 600,
    features: [
      "Deep cleaning for entire home",
      "Professional meal preparation",
      "60-minute therapeutic massage",
      "All cleaning supplies included",
      "Professional service guarantee"
    ],
    popular: true
  },
  {
    id: "deep-clean-3plus",
    name: "Deep Clean (3+ rooms)",
    description: "Comprehensive deep cleaning",
    price: 400,
    features: [
      "Deep cleaning for 3+ room homes",
      "Kitchen and bathroom sanitization",
      "Floor and surface cleaning",
      "Window and mirror cleaning",
      "Professional cleaning supplies"
    ]
  },
  {
    id: "basic-clean-3plus",
    name: "Basic Clean (3+ rooms)",
    description: "Standard cleaning service",
    price: 200,
    features: [
      "Basic cleaning for 3+ room homes",
      "Surface cleaning and dusting",
      "Vacuum and mop floors",
      "Bathroom cleaning",
      "Kitchen cleaning"
    ]
  },
  {
    id: "2bed-deep",
    name: "2 Bedroom Deep Clean",
    description: "Deep cleaning for 2 bedroom homes",
    price: 200,
    features: [
      "Deep cleaning for 2 bedroom homes",
      "Kitchen and bathroom sanitization",
      "Floor and surface cleaning",
      "Window and mirror cleaning",
      "Professional cleaning supplies"
    ]
  },
  {
    id: "2bed-basic",
    name: "2 Bedroom Basic Clean",
    description: "Standard cleaning for 2 bedroom homes",
    price: 150,
    features: [
      "Basic cleaning for 2 bedroom homes",
      "Surface cleaning and dusting",
      "Vacuum and mop floors",
      "Bathroom cleaning",
      "Kitchen cleaning"
    ]
  },
  {
    id: "1bed-deep",
    name: "1 Bedroom Deep Clean",
    description: "Deep cleaning for 1 bedroom apartments",
    price: 150,
    features: [
      "Deep cleaning for 1 bedroom apartments",
      "Kitchen and bathroom sanitization",
      "Floor and surface cleaning",
      "Window and mirror cleaning",
      "Professional cleaning supplies"
    ]
  },
  {
    id: "1bed-basic",
    name: "1 Bedroom Basic Clean",
    description: "Standard cleaning for 1 bedroom apartments",
    price: 125,
    features: [
      "Basic cleaning for 1 bedroom apartments",
      "Surface cleaning and dusting",
      "Vacuum and mop floors",
      "Bathroom cleaning",
      "Kitchen cleaning"
    ]
  }
]

export function PricingModal() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handlePayment = async (plan: typeof pricingPlans[0]) => {
    setIsLoading(true)
    try {
      // Create payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: plan.price,
          service: plan.id,
          customerDetails: {
            name: "Customer Name", // This would come from a form
            email: "customer@email.com", // This would come from a form
            phone: "", // This would come from a form
            address: "", // This would come from a form
            notes: "", // This would come from a form
          }
        }),
      })

      const { clientSecret } = await response.json()

      // Redirect to Stripe Checkout
      const stripe = await stripePromise
      if (stripe) {
        const { error } = await stripe.confirmPayment({
          clientSecret,
          confirmParams: {
            return_url: `${window.location.origin}/success`,
          },
        })

        if (error) {
          console.error('Payment error:', error)
        }
      }
    } catch (error) {
      console.error('Payment processing error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/80 text-white">
          <CreditCard className="w-4 h-4 mr-2" />
          View Pricing & Book
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Our Services & Pricing</DialogTitle>
          <DialogDescription className="text-center">
            Choose the perfect service package for your needs. All prices include professional service and supplies.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {pricingPlans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative cursor-pointer transition-all hover:shadow-lg ${
                selectedPlan === plan.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <Badge className="absolute -top-2 -right-2 bg-primary text-white">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              )}
              <CardHeader>
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="text-3xl font-bold text-primary">
                  ${plan.price}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full mt-4 bg-primary hover:bg-primary/80"
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePayment(plan)
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Book Now"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
} 