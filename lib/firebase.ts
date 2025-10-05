import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Check if Firebase config is available
const hasFirebaseConfig = process.env.NEXT_PUBLIC_FIREBASE_API_KEY && 
                         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID

let app: any = null
let auth: any = null
let db: any = null

if (hasFirebaseConfig) {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
  }

  // Initialize Firebase
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
  
  // Initialize Firebase Authentication and get a reference to the service
  auth = getAuth(app)
  
  // Initialize Cloud Firestore and get a reference to the service
  db = getFirestore(app)
} else {
  console.warn('Firebase configuration not found. Authentication features will be disabled.')
}

export { auth, db }
export default app
