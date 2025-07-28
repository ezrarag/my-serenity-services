import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Check if Supabase environment variables are available
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.warn('Supabase environment variables are not set')
}

const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  ? createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )
  : null

export async function POST(request: NextRequest) {
  try {
    console.log('Orders API: POST request received')
    
    if (!supabase) {
      console.error('Orders API: Supabase client not initialized')
      return NextResponse.json(
        { error: 'Database is not configured' },
        { status: 500 }
      )
    }

    const requestBody = await request.json()
    console.log('Orders API: Request body:', requestBody)

    const { customerDetails, service, amount, paymentIntentId, scheduledDate, scheduledTime } = requestBody

    // Validate required fields
    if (!customerDetails?.name || !customerDetails?.email || !customerDetails?.address) {
      console.error('Orders API: Missing required fields')
      return NextResponse.json(
        { error: 'Missing required fields: name, email, or address' },
        { status: 400 }
      )
    }

    const orderData = {
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
    }

    console.log('Orders API: Attempting to insert order:', orderData)

    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select()

    if (error) {
      console.error('Orders API: Database error:', error)
      return NextResponse.json(
        { error: 'Failed to create order', details: error.message },
        { status: 500 }
      )
    }

    console.log('Orders API: Order created successfully:', data)
    return NextResponse.json({ order: data[0] })
  } catch (error) {
    console.error('Orders API: Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log('Orders API: GET request received')
    
    if (!supabase) {
      console.error('Orders API: Supabase client not initialized')
      return NextResponse.json(
        { error: 'Database is not configured' },
        { status: 500 }
      )
    }

    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      console.error('Orders API: No email parameter provided')
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      )
    }

    console.log('Orders API: Fetching orders for email:', email)

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('customer_email', email)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Orders API: Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch orders', details: error.message },
        { status: 500 }
      )
    }

    console.log('Orders API: Orders fetched successfully:', data?.length || 0, 'orders')
    return NextResponse.json({ orders: data })
  } catch (error) {
    console.error('Orders API: Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
} 