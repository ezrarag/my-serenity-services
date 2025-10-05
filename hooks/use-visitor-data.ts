"use client"

import { useState, useEffect } from 'react'
import { setCookie, getCookie, deleteCookie, COOKIE_KEYS } from '@/lib/cookies'

interface VisitorData {
  id: string
  email?: string
  name?: string
  phone?: string
  address?: string
  cartItems: any[]
  lastVisit: string
  visitCount: number
  preferences: {
    notifications: boolean
    marketing: boolean
  }
}

export function useVisitorData() {
  const [visitorData, setVisitorData] = useState<VisitorData | null>(null)
  const [loading, setLoading] = useState(true)

  // Generate a unique visitor ID
  const generateVisitorId = (): string => {
    return 'visitor_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now()
  }

  // Get visitor ID from storage or generate new one
  const getVisitorId = (): string => {
    if (typeof window === 'undefined') return ''
    
    let visitorId = localStorage.getItem(COOKIE_KEYS.VISITOR_ID)
    if (!visitorId) {
      visitorId = generateVisitorId()
      localStorage.setItem(COOKIE_KEYS.VISITOR_ID, visitorId)
    }
    return visitorId
  }

  // Save visitor data to both localStorage and cookies
  const saveVisitorData = (data: Partial<VisitorData>, incrementVisitCount: boolean = false) => {
    if (typeof window === 'undefined') return

    const currentData = getVisitorDataFromStorage()
    const updatedData = {
      ...currentData,
      ...data,
      lastVisit: new Date().toISOString(),
      visitCount: incrementVisitCount ? (currentData?.visitCount || 0) + 1 : (currentData?.visitCount || 0)
    }

    // Save to localStorage
    localStorage.setItem(COOKIE_KEYS.VISITOR_DATA, JSON.stringify(updatedData))
    
    // Save to cookies as backup
    setCookie(COOKIE_KEYS.VISITOR_DATA, JSON.stringify(updatedData))
    
    setVisitorData(updatedData)
  }

  // Get visitor data from storage
  const getVisitorDataFromStorage = (): VisitorData | null => {
    if (typeof window === 'undefined') return null

    try {
      // Try localStorage first
      const localData = localStorage.getItem(COOKIE_KEYS.VISITOR_DATA)
      if (localData) {
        return JSON.parse(localData)
      }

      // Fallback to cookies
      const cookieData = getCookie(COOKIE_KEYS.VISITOR_DATA)
      if (cookieData) {
        return JSON.parse(cookieData)
      }
    } catch (error) {
      console.error('Error parsing visitor data:', error)
    }

    return null
  }

  // Initialize visitor data
  const initializeVisitorData = () => {
    if (typeof window === 'undefined') return

    const visitorId = getVisitorId()
    let data = getVisitorDataFromStorage()

    if (!data) {
      data = {
        id: visitorId,
        cartItems: [],
        lastVisit: new Date().toISOString(),
        visitCount: 1,
        preferences: {
          notifications: false,
          marketing: false
        }
      }
    } else {
      // Update visit count and last visit
      data.visitCount = (data.visitCount || 0) + 1
      data.lastVisit = new Date().toISOString()
    }

    saveVisitorData(data, true)
    setVisitorData(data)
    setLoading(false)
  }

  // Add item to cart
  const addToCart = (item: any) => {
    const currentData = getVisitorDataFromStorage()
    if (!currentData) return

    const existingItemIndex = currentData.cartItems.findIndex(
      cartItem => cartItem.id === item.id
    )

    if (existingItemIndex >= 0) {
      currentData.cartItems[existingItemIndex].quantity += item.quantity || 1
    } else {
      currentData.cartItems.push({ ...item, quantity: item.quantity || 1 })
    }

    saveVisitorData({ cartItems: currentData.cartItems })
  }

  // Remove item from cart
  const removeFromCart = (itemId: string) => {
    const currentData = getVisitorDataFromStorage()
    if (!currentData) return

    const updatedCartItems = currentData.cartItems.filter(
      item => item.id !== itemId
    )

    saveVisitorData({ cartItems: updatedCartItems })
  }

  // Update cart item quantity
  const updateCartItemQuantity = (itemId: string, quantity: number) => {
    const currentData = getVisitorDataFromStorage()
    if (!currentData) return

    const updatedCartItems = currentData.cartItems.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    )

    saveVisitorData({ cartItems: updatedCartItems })
  }

  // Clear cart
  const clearCart = () => {
    console.log('clearCart called, current visitorData:', visitorData)
    saveVisitorData({ cartItems: [] })
    console.log('clearCart completed')
  }

  // Update visitor profile
  const updateProfile = (profileData: Partial<VisitorData>) => {
    saveVisitorData(profileData)
  }

  // Get cart items
  const getCartItems = () => {
    return visitorData?.cartItems || []
  }

  // Get cart total
  const getCartTotal = () => {
    return (visitorData?.cartItems || []).reduce(
      (total, item) => total + (item.price * item.quantity), 
      0
    )
  }

  // Get cart item count
  const getCartItemCount = () => {
    return (visitorData?.cartItems || []).reduce(
      (total, item) => total + item.quantity, 
      0
    )
  }

  // Clear all visitor data
  const clearAllData = () => {
    if (typeof window === 'undefined') return

    localStorage.removeItem(COOKIE_KEYS.VISITOR_DATA)
    localStorage.removeItem(COOKIE_KEYS.VISITOR_ID)
    deleteCookie(COOKIE_KEYS.VISITOR_DATA)
    deleteCookie(COOKIE_KEYS.VISITOR_ID)
    
    setVisitorData(null)
  }

  // Initialize on mount
  useEffect(() => {
    initializeVisitorData()
  }, [])

  return {
    visitorData,
    loading,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    updateProfile,
    getCartItems,
    getCartTotal,
    getCartItemCount,
    saveVisitorData,
    clearAllData
  }
}
