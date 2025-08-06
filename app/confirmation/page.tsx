"use client"
import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  ArrowLeft, 
  CheckCircle, 
  CalendarIcon, 
  Clock, 
  User, 
  MapPin, 
  CreditCard,
  ExternalLink,
  Home,
  AlertCircle
} from "lucide-react"
import { format } from "date-fns"

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"]

interface OrderDetails {
  id: string
  customerDetails: {
    name: string
    email: string
    phone: string
    address: string
    notes?: string
  }
  cartItems: Array<{
    id: string
    title: string
    price: number
    quantity: number
    duration: string
  }>
  amount: number
  paymentIntentId: string
  scheduledDate?: string
  scheduledTime?: string
  status: string
  createdAt: string
}

function ConfirmationContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState(false)

  useEffect(() => {
    const orderId = searchParams.get('order')
    const paymentIntentId = searchParams.get('payment_intent')

    if (orderId && paymentIntentId) {
      fetchOrderDetails(orderId)
    } else {
      setError('Missing order information')
      setLoading(false)
    }
  }, [searchParams])

  const fetchOrderDetails = async (orderId: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch order details')
      }
      const data = await response.json()
      setOrderDetails(data)
      
      // Set existing scheduled date/time if available
      if (data.scheduledDate) {
        setSelectedDate(new Date(data.scheduledDate))
      }
      if (data.scheduledTime) {
        setSelectedTime(data.scheduledTime)
      }
    } catch (error) {
      console.error('Error fetching order details:', error)
      setError('Failed to load order details')
    } finally {
      setLoading(false)
    }
  }

  const handleScheduleUpdate = async () => {
    if (!orderDetails || !selectedDate || !selectedTime) {
      setError('Please select both date and time')
      return
    }

    setIsUpdating(true)
    setError("")

    try {
      const response = await fetch(`/api/orders/${orderDetails.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scheduledDate: selectedDate.toISOString().split('T')[0],
          scheduledTime: selectedTime,
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update schedule')
      }

      const updatedOrder = await response.json()
      setOrderDetails(updatedOrder)
      setUpdateSuccess(true)
      
      // Clear success message after 3 seconds
      setTimeout(() => setUpdateSuccess(false), 3000)
    } catch (error) {
      console.error('Error updating schedule:', error)
      setError(error instanceof Error ? error.message : 'Failed to update schedule')
    } finally {
      setIsUpdating(false)
    }
  }

  const getTotalItems = () => {
    return orderDetails?.cartItems.reduce((total, item) => total + item.quantity, 0) || 0
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Loading confirmation...</p>
        </div>
      </div>
    )
  }

  if (error && !orderDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="text-center py-12">
                <div className="text-red-500 mb-4">
                  <AlertCircle className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Error Loading Order</h3>
                <p className="text-gray-600 mb-6">{error}</p>
                <Button asChild>
                  <Link href="/">
                    Return Home
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (!orderDetails) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button asChild variant="ghost" size="icon">
            <Link href="/">
              <Home className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-primary">Order Confirmation</h1>
            <p className="text-primary">Thank you for your purchase!</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Success Alert */}
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Payment successful! Your order has been confirmed.
            </AlertDescription>
          </Alert>

          {updateSuccess && (
            <Alert className="mb-6 border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Schedule updated successfully!
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Details */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Order Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Order ID:</span>
                    <span className="font-mono text-sm">{orderDetails.id}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Status:</span>
                    <span className="text-green-600 font-semibold">Paid</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Amount:</span>
                    <span className="font-semibold">${orderDetails.amount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Items:</span>
                    <span className="text-sm">{getTotalItems()} service{getTotalItems() !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Date:</span>
                    <span className="text-sm">{format(new Date(orderDetails.createdAt), 'PPP')}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">Name:</span>
                    <p className="font-medium">{orderDetails.customerDetails.name}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Email:</span>
                    <p className="font-medium">{orderDetails.customerDetails.email}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Phone:</span>
                    <p className="font-medium">{orderDetails.customerDetails.phone}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Address:</span>
                    <p className="font-medium">{orderDetails.customerDetails.address}</p>
                  </div>
                  {orderDetails.customerDetails.notes && (
                    <div>
                      <span className="text-sm text-gray-600">Notes:</span>
                      <p className="font-medium">{orderDetails.customerDetails.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Services */}
              <Card>
                <CardHeader>
                  <CardTitle>Services Ordered</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {orderDetails.cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.duration}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${item.price * item.quantity}</p>
                        <p className="text-sm text-gray-600">${item.price} each</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Scheduling Section */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5" />
                    Service Scheduling
                  </CardTitle>
                  <CardDescription>
                    {orderDetails.scheduledDate && orderDetails.scheduledTime 
                      ? "Your service is scheduled for:" 
                      : "Please select your preferred date and time"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {orderDetails.scheduledDate && orderDetails.scheduledTime ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="font-semibold">Scheduled!</span>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <CalendarIcon className="w-4 h-4 text-green-600" />
                          <span className="font-semibold text-green-800">
                            {format(new Date(orderDetails.scheduledDate), 'EEEE, MMMM do, yyyy')}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-green-600" />
                          <span className="text-green-800">{orderDetails.scheduledTime}</span>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setSelectedDate(undefined)
                          setSelectedTime("")
                        }}
                        className="w-full"
                      >
                        Reschedule
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Date Selection */}
                      <div className="space-y-2">
                        <Label>Select Date *</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar 
                              mode="single" 
                              selected={selectedDate} 
                              onSelect={setSelectedDate} 
                              initialFocus 
                              disabled={(date) => date < new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* Time Selection */}
                      <div className="space-y-2">
                        <Label>Select Time *</Label>
                        <Select value={selectedTime} onValueChange={setSelectedTime}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4" />
                                  {time}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <Button 
                        onClick={handleScheduleUpdate}
                        disabled={!selectedDate || !selectedTime || isUpdating}
                        className="w-full"
                      >
                        {isUpdating ? "Updating..." : "Schedule Service"}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Dashboard Access */}
              <Card>
                <CardHeader>
                  <CardTitle>Manage Your Order</CardTitle>
                  <CardDescription>
                    View your order history and manage upcoming appointments
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button asChild className="w-full">
                    <Link href="/dashboard">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Go to Dashboard
                    </Link>
                  </Button>
                  
                  <div className="text-sm text-gray-600 space-y-2">
                    <p>• View order history</p>
                    <p>• Manage appointments</p>
                    <p>• Update contact information</p>
                    <p>• Download receipts</p>
                  </div>
                </CardContent>
              </Card>

              {/* Next Steps */}
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-900">What's Next?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div>
                      <p className="font-semibold text-blue-900">Confirm Schedule</p>
                      <p className="text-sm text-blue-800">Select your preferred date and time above</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div>
                      <p className="font-semibold text-blue-900">Receive Confirmation</p>
                      <p className="text-sm text-blue-800">We'll send you a confirmation email</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div>
                      <p className="font-semibold text-blue-900">Enjoy Your Service</p>
                      <p className="text-sm text-blue-800">Our team will arrive at your scheduled time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Loading confirmation...</p>
        </div>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  )
} 