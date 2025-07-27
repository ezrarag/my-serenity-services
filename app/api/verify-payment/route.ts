import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

// Check if environment variables are available
if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('STRIPE_SECRET_KEY is not set')
}

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.warn('Supabase environment variables are not set')
}

const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-06-30.basil',
    })
  : null

const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  ? createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )
  : null

export async function GET(request: NextRequest) {
  try {
    if (!stripe || !supabase) {
      return NextResponse.json(
        { error: 'Payment system is not configured' },
        { status: 500 }
      )
    }

    const { searchParams } = new URL(request.url)
    const paymentIntentId = searchParams.get('payment_intent')

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: 'Payment intent ID is required' },
        { status: 400 }
      )
    }

    // Retrieve the payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    if (paymentIntent.status === 'succeeded') {
      // Update order status in Supabase
      const { data, error } = await supabase
        .from('orders')
        .update({ 
          status: 'confirmed',
          payment_status: 'paid',
          updated_at: new Date().toISOString()
        })
        .eq('payment_intent_id', paymentIntentId)
        .select()

      if (error) {
        console.error('Error updating order:', error)
        return NextResponse.json(
          { error: 'Failed to update order status' },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        order: data[0],
        paymentStatus: paymentIntent.status
      })
    } else {
      return NextResponse.json({
        success: false,
        paymentStatus: paymentIntent.status,
        error: 'Payment not completed'
      })
    }
  } catch (error) {
    console.error('Error verifying payment:', error)
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    )
  }
} 