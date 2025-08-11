"use client"

import { useVisitorData } from "@/hooks/use-visitor-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trash2, User, ShoppingCart, Calendar, Eye } from "lucide-react"

export function VisitorDataDisplay() {
  const { 
    visitorData, 
    loading, 
    clearAllData, 
    getCartItems, 
    getCartTotal, 
    getCartItemCount 
  } = useVisitorData()

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-center text-gray-600">Loading visitor data...</p>
        </CardContent>
      </Card>
    )
  }

  if (!visitorData) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No visitor data found</h3>
          <p className="text-gray-600">Start browsing services to create your profile</p>
        </CardContent>
      </Card>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      {/* Visitor Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Visitor Profile
          </CardTitle>
          <CardDescription>
            Your persistent profile data (saved in cookies and localStorage)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Visitor ID</label>
              <p className="text-sm text-gray-900 font-mono bg-gray-100 p-2 rounded mt-1">
                {visitorData.id}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Visit Count</label>
              <p className="text-2xl font-bold text-primary">{visitorData.visitCount}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Last Visit</label>
              <p className="text-sm text-gray-900">{formatDate(visitorData.lastVisit)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Data Persistence</label>
              <div className="flex gap-2 mt-1">
                <Badge variant="secondary">localStorage</Badge>
                <Badge variant="secondary">Cookies</Badge>
              </div>
            </div>
          </div>

          {visitorData.name && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Name</label>
                <p className="text-sm text-gray-900">{visitorData.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <p className="text-sm text-gray-900">{visitorData.email}</p>
              </div>
            </div>
          )}

          {visitorData.phone && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Phone</label>
                <p className="text-sm text-gray-900">{visitorData.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Address</label>
                <p className="text-sm text-gray-900">{visitorData.address}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Cart Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Cart Summary
          </CardTitle>
          <CardDescription>
            Your persistent cart items across sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {getCartItemCount() === 0 ? (
            <div className="text-center py-6">
              <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">No items in cart</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Items:</span>
                <Badge variant="outline">{getCartItemCount()}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Value:</span>
                <span className="text-lg font-bold text-primary">
                  ${getCartTotal()}
                </span>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Cart Items:</label>
                {getCartItems().map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded">
                    <span>{item.title} x {item.quantity}</span>
                    <span className="font-medium">${item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Preferences
          </CardTitle>
          <CardDescription>
            Your saved preferences and settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Notifications</span>
              <Badge variant={visitorData.preferences.notifications ? "default" : "secondary"}>
                {visitorData.preferences.notifications ? "Enabled" : "Disabled"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Marketing</span>
              <Badge variant={visitorData.preferences.marketing ? "default" : "secondary"}>
                {visitorData.preferences.marketing ? "Enabled" : "Disabled"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>
            Manage your visitor data and privacy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button 
              onClick={clearAllData}
              variant="destructive"
              className="w-full"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All Data
            </Button>
            <p className="text-xs text-gray-500 text-center">
              This will remove all your saved data, cart items, and preferences.
              This action cannot be undone.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
