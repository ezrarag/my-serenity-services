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
    console.log('Users API: POST request received')
    
    if (!supabase) {
      console.error('Users API: Supabase client not initialized')
      return NextResponse.json(
        { error: 'Database is not configured' },
        { status: 500 }
      )
    }

    const requestBody = await request.json()
    console.log('Users API: Request body:', requestBody)

    const { email, name, phone, address } = requestBody

    // Validate required fields
    if (!email || !name) {
      console.error('Users API: Missing required fields')
      return NextResponse.json(
        { error: 'Missing required fields: email and name' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (existingUser) {
      // Update existing user
      console.log('Users API: Updating existing user:', email)
      const { data, error } = await supabase
        .from('users')
        .update({
          name,
          phone: phone || existingUser.phone,
          address: address || existingUser.address,
          updated_at: new Date().toISOString()
        })
        .eq('email', email)
        .select()

      if (error) {
        console.error('Users API: Error updating user:', error)
        return NextResponse.json(
          { error: 'Failed to update user', details: error.message },
          { status: 500 }
        )
      }

      console.log('Users API: User updated successfully:', data)
      return NextResponse.json({ user: data[0] })
    } else {
      // Create new user
      console.log('Users API: Creating new user:', email)
      const { data, error } = await supabase
        .from('users')
        .insert([{
          email,
          name,
          phone: phone || '',
          address: address || ''
        }])
        .select()

      if (error) {
        console.error('Users API: Error creating user:', error)
        return NextResponse.json(
          { error: 'Failed to create user', details: error.message },
          { status: 500 }
        )
      }

      console.log('Users API: User created successfully:', data)
      return NextResponse.json({ user: data[0] })
    }
  } catch (error) {
    console.error('Users API: Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log('Users API: GET request received')
    
    if (!supabase) {
      console.error('Users API: Supabase client not initialized')
      return NextResponse.json(
        { error: 'Database is not configured' },
        { status: 500 }
      )
    }

    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      console.error('Users API: No email parameter provided')
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      )
    }

    console.log('Users API: Fetching user for email:', email)

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (error) {
      console.error('Users API: Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch user', details: error.message },
        { status: 500 }
      )
    }

    console.log('Users API: User fetched successfully:', data)
    return NextResponse.json({ user: data })
  } catch (error) {
    console.error('Users API: Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
} 