import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

// Check if Stripe key is available
if (!process.env.STRIPE_SECRET_KEY) {
  console.error('Stripe secret key is not set')
}

const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-06-30.basil',
    })
  : null

export async function POST(request: NextRequest) {
  try {
    console.log('Payment Intent API: POST request received')
    
    if (!stripe) {
      console.error('Payment Intent API: Stripe not configured')
      return NextResponse.json(
        { error: 'Stripe is not configured' },
        { status: 500 }
      )
    }

    const { amount, service, customerDetails } = await request.json()
    console.log('Payment Intent API: Creating payment intent for amount:', amount, 'service:', service)

    // Create structured metadata for organization
    const metadata = {
      site: 'serenityservices', // Your site identifier
      client_id: 'serenity_001', // Internal client ID
      service_type: service,
      customer_email: customerDetails.email,
      customer_name: customerDetails.name,
      customer_phone: customerDetails.phone || '',
      customer_address: customerDetails.address || '',
      notes: customerDetails.notes || '',
      scheduled_date: new Date().toISOString().split('T')[0],
      scheduled_time: '12:00', // Default time, will be updated by booking form
      environment: process.env.NODE_ENV || 'development'
    }

    console.log('Payment Intent API: Creating payment intent with metadata:', metadata)

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      metadata: metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    })

    console.log('Payment Intent API: Payment intent created successfully:', paymentIntent.id)
    
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    })
  } catch (error) {
    console.error('Payment Intent API: Error creating payment intent:', error)
    return NextResponse.json(
      { error: 'Failed to create payment intent', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
} 