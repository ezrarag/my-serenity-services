// Cookie utility functions for visitor data persistence

export const COOKIE_KEYS = {
  VISITOR_DATA: 'serenity_visitor_data',
  VISITOR_ID: 'serenity_visitor_id',
  CART_ITEMS: 'serenity_cart_items',
  USER_PREFERENCES: 'serenity_user_preferences'
} as const

export const COOKIE_OPTIONS = {
  path: '/',
  maxAge: 60 * 60 * 24 * 365, // 1 year
  sameSite: 'Lax' as const,
  secure: process.env.NODE_ENV === 'production'
}

/**
 * Set a cookie with the given name, value, and options
 */
export function setCookie(name: string, value: string, options: Partial<typeof COOKIE_OPTIONS> = {}) {
  if (typeof document === 'undefined') return

  const cookieOptions = { ...COOKIE_OPTIONS, ...options }
  let cookieString = `${name}=${encodeURIComponent(value)}`

  if (cookieOptions.path) cookieString += `; path=${cookieOptions.path}`
  if (cookieOptions.maxAge) cookieString += `; max-age=${cookieOptions.maxAge}`
  if (cookieOptions.sameSite) cookieString += `; SameSite=${cookieOptions.sameSite}`
  if (cookieOptions.secure) cookieString += '; Secure'

  document.cookie = cookieString
}

/**
 * Get a cookie value by name
 */
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null

  const cookies = document.cookie.split(';')
  const cookie = cookies.find(c => c.trim().startsWith(`${name}=`))
  
  if (cookie) {
    return decodeURIComponent(cookie.split('=')[1])
  }
  
  return null
}

/**
 * Delete a cookie by setting it to expire in the past
 */
export function deleteCookie(name: string, path = '/') {
  if (typeof document === 'undefined') return

  document.cookie = `${name}=; path=${path}; expires=Thu, 01 Jan 1970 00:00:00 GMT`
}

/**
 * Check if cookies are enabled in the browser
 */
export function areCookiesEnabled(): boolean {
  if (typeof document === 'undefined') return false

  try {
    const testCookie = 'serenity_test_cookie'
    setCookie(testCookie, 'test', { maxAge: 60 })
    const exists = getCookie(testCookie) === 'test'
    deleteCookie(testCookie)
    return exists
  } catch {
    return false
  }
}

/**
 * Get all cookies as an object
 */
export function getAllCookies(): Record<string, string> {
  if (typeof document === 'undefined') return {}

  const cookies: Record<string, string> = {}
  const cookieArray = document.cookie.split(';')

  cookieArray.forEach(cookie => {
    const [name, value] = cookie.trim().split('=')
    if (name && value) {
      cookies[name] = decodeURIComponent(value)
    }
  })

  return cookies
}

/**
 * Clear all Serenity-related cookies
 */
export function clearSerenityCookies() {
  Object.values(COOKIE_KEYS).forEach(key => {
    deleteCookie(key)
  })
}
