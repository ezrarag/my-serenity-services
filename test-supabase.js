// Test script to verify Supabase connection and orders table
// Run this with: node test-supabase.js

const { createClient } = require('@supabase/supabase-js')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

async function testSupabaseConnection() {
  console.log('Testing Supabase connection...')
  
  // Check environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  console.log('Supabase URL:', supabaseUrl ? '✅ Set' : '❌ Missing')
  console.log('Service Role Key:', serviceRoleKey ? '✅ Set' : '❌ Missing')
  
  if (!supabaseUrl || !serviceRoleKey) {
    console.error('❌ Missing required environment variables')
    return
  }
  
  try {
    // Create Supabase client
    const supabase = createClient(supabaseUrl, serviceRoleKey)
    console.log('✅ Supabase client created successfully')
    
    // Test connection by fetching orders
    console.log('Testing orders table...')
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .limit(1)
    
    if (error) {
      console.error('❌ Error accessing orders table:', error)
      return
    }
    
    console.log('✅ Orders table accessible')
    console.log('Current orders count:', data?.length || 0)
    
    // Test inserting a sample order
    console.log('Testing order insertion...')
    const testOrder = {
      customer_name: 'Test User',
      customer_email: 'test@example.com',
      customer_phone: '555-123-4567',
      customer_address: '123 Test St',
      service_type: 'Test Service',
      amount: 99.99,
      payment_intent_id: 'test_pi_' + Date.now(),
      scheduled_date: new Date().toISOString().split('T')[0],
      scheduled_time: '14:00',
      notes: 'Test order from script',
      status: 'pending',
      payment_status: 'pending'
    }
    
    const { data: insertData, error: insertError } = await supabase
      .from('orders')
      .insert([testOrder])
      .select()
    
    if (insertError) {
      console.error('❌ Error inserting test order:', insertError)
      return
    }
    
    console.log('✅ Test order inserted successfully:', insertData[0])
    
    // Clean up test order
    const { error: deleteError } = await supabase
      .from('orders')
      .delete()
      .eq('payment_intent_id', testOrder.payment_intent_id)
    
    if (deleteError) {
      console.error('⚠️ Warning: Could not delete test order:', deleteError)
    } else {
      console.log('✅ Test order cleaned up')
    }
    
    console.log('🎉 All tests passed! Your Supabase setup is working correctly.')
    
  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

testSupabaseConnection() 