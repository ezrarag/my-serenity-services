# Serenity Services - Setup Guide

## 🚀 Quick Start

This guide will help you set up the payment system and database for Serenity Services.

## 📋 Prerequisites

- Node.js 18+ and pnpm installed
- Stripe account (free tier available)
- Supabase account (free tier available)

## 🔧 Environment Setup

1. **Copy the environment template:**
   ```bash
   cp env.example .env.local
   ```

2. **Fill in your environment variables in `.env.local`:**
   ```env
   # Stripe Configuration
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

## 💳 Stripe Setup

1. **Create a Stripe account:**
   - Go to [stripe.com](https://stripe.com) and sign up
   - Complete your account verification

2. **Get your API keys:**
   - Go to Dashboard → Developers → API keys
   - Copy your **Publishable key** and **Secret key**
   - Update your `.env.local` file

3. **Test the integration:**
   - Use Stripe's test card numbers for testing
   - Test card: `4242 4242 4242 4242`
   - Any future expiry date and any 3-digit CVC

## 🗄️ Supabase Setup

1. **Create a Supabase project:**
   - Go to [supabase.com](https://supabase.com) and sign up
   - Create a new project

2. **Get your project credentials:**
   - Go to Settings → API
   - Copy your **Project URL** and **anon public** key
   - Go to Settings → API → Project API keys
   - Copy your **service_role** key (keep this secret!)

3. **Set up the database:**
   - Go to SQL Editor in your Supabase dashboard
   - Copy and paste the contents of `supabase-schema.sql`
   - Run the SQL to create the orders table

4. **Update your environment variables:**
   - Replace the placeholder values in `.env.local`

## 🏃‍♂️ Running the Application

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Start the development server:**
   ```bash
   pnpm dev
   ```

3. **Test the payment flow:**
   - Go to `/booking` page
   - Click "View Pricing & Book"
   - Select a service and click "Book Now"
   - Use test card: `4242 4242 4242 4242`

## 📊 Pricing Structure

The following pricing has been implemented:

| Service | Price | Description |
|---------|-------|-------------|
| Full Package | $600 | Deep clean + Cook + Massage |
| Deep Clean (3+ rooms) | $400 | Comprehensive deep cleaning |
| Basic Clean (3+ rooms) | $200 | Standard cleaning service |
| 2 Bedroom Deep Clean | $200 | Deep cleaning for 2 bedroom homes |
| 2 Bedroom Basic Clean | $150 | Standard cleaning for 2 bedroom homes |
| 1 Bedroom Deep Clean | $150 | Deep cleaning for 1 bedroom apartments |
| 1 Bedroom Basic Clean | $125 | Standard cleaning for 1 bedroom apartments |

## 🔍 Testing

1. **Payment Testing:**
   - Use Stripe test cards
   - Check payment success page at `/success`
   - Verify orders in Supabase dashboard

2. **Order Management:**
   - Orders are stored in Supabase `orders` table
   - Payment status is tracked
   - Order status can be updated

## 🚨 Important Notes

- **Never commit your `.env.local` file** - it contains sensitive keys
- **Use test keys for development** - switch to live keys for production
- **Backup your Supabase data** regularly
- **Monitor Stripe webhooks** for production (not implemented yet)

## 🔄 Next Steps

1. Set up Stripe webhooks for production
2. Implement customer portal for order tracking
3. Create admin dashboard for order management
4. Add email notifications
5. Implement user authentication

## 🆘 Troubleshooting

**Payment not working?**
- Check your Stripe API keys are correct
- Verify your environment variables are loaded
- Check browser console for errors

**Database errors?**
- Verify Supabase connection
- Check your service role key has proper permissions
- Ensure the orders table was created correctly

**Need help?**
- Check the TODO.md file for current status
- Review the API routes in `/app/api/`
- Test with Stripe's test mode first 