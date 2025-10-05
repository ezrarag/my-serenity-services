"use client"

import { useState, useEffect } from 'react'
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth'
import { auth } from '@/lib/firebase'

export function useFirebaseAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check if Firebase is configured
    if (!auth) {
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
      setError(null)
    })

    return () => unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    if (!auth) {
      setError('Firebase not configured. Authentication disabled.')
      setLoading(false)
      return null
    }
    
    try {
      setError(null)
      setLoading(true)
      const result = await signInWithEmailAndPassword(auth, email, password)
      return result.user
    } catch (error: any) {
      setError(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string) => {
    if (!auth) {
      setError('Firebase not configured. Authentication disabled.')
      setLoading(false)
      return null
    }
    
    try {
      setError(null)
      setLoading(true)
      const result = await createUserWithEmailAndPassword(auth, email, password)
      return result.user
    } catch (error: any) {
      setError(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    if (!auth) {
      setError('Firebase not configured. Authentication disabled.')
      return
    }
    
    try {
      setError(null)
      await signOut(auth)
    } catch (error: any) {
      setError(error.message)
      throw error
    }
  }

  return {
    user,
    loading,
    error,
    signIn,
    signUp,
    logout
  }
}
