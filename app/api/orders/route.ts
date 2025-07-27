import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { customerDetails, service, amount, paymentIntentId, scheduledDate, scheduledTime } = await request.json()

    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          customer_name: customerDetails.name,
          customer_email: customerDetails.email,
          customer_phone: customerDetails.phone,
          customer_address: customerDetails.address,
          service_type: service,
          amount: amount,
          payment_intent_id: paymentIntentId,
          scheduled_date: scheduledDate,
          scheduled_time: scheduledTime,
          notes: customerDetails.notes || '',
          status: 'pending',
        },
      ])
      .select()

    if (error) {
      console.error('Error creating order:', error)
      return NextResponse.json(
        { error: 'Failed to create order' },
        { status: 500 }
      )
    }

    return NextResponse.json({ order: data[0] })
  } catch (error) {
    console.error('Error in order creation:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('customer_email', email)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching orders:', error)
      return NextResponse.json(
        { error: 'Failed to fetch orders' },
        { status: 500 }
      )
    }

    return NextResponse.json({ orders: data })
  } catch (error) {
    console.error('Error in order retrieval:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 