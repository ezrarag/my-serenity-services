"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Navigation } from "@/components/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone } from "lucide-react"

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedService, setSelectedService] = useState("")
  const [selectedTime, setSelectedTime] = useState("")

  const services = [
    { value: "cleaning", label: "House Cleaning - $60/hour", price: 60 },
    { value: "cooking", label: "Meal Preparation - $50/hour", price: 50 },
    { value: "combo", label: "Cooking + Cleaning Combo - $75/hour", price: 75 },
    { value: "massage-60", label: "Wellness Massage (60 min) - $100", price: 100 },
    { value: "massage-30", label: "Wellness Massage (30 min) - $50", price: 50 },
  ]

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900">
      <Navigation />

      {/* Contact Button */}
      <div className="absolute top-8 left-8 z-10">
        <div className="flex items-center gap-3">
          <Button
            asChild
            className="bg-blue-400 hover:bg-blue-500 text-slate-800 px-4 py-3 rounded-lg font-bold text-sm border-2 border-blue-500 flex items-center gap-2"
          >
            <Link href="/contact">
              <Phone className="w-4 h-4" />
              CONTACT@SERENITY.CO
            </Link>
          </Button>
        </div>

        <div className="mt-4 bg-slate-800/90 backdrop-blur-sm border-2 border-blue-400 rounded-lg p-4 max-w-[200px]">
          <div className="text-blue-300 font-bold text-lg mb-2">CONTACT</div>
          <div className="w-8 h-8 border-2 border-blue-400 rounded flex items-center justify-center mb-2">
            <Phone className="w-4 h-4 text-blue-400" />
          </div>
        </div>
      </div>

      {/* Main Brand Name */}
      <div className="text-center pt-20 mb-12">
        <h1 className="text-6xl md:text-8xl font-black text-blue-400 tracking-wider mb-4 drop-shadow-2xl">SERENITY</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-lavender-400 tracking-wide">BOOK YOUR SERVICE</h2>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-slate-800/80 backdrop-blur-sm border-2 border-blue-400/50">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-white">Schedule Your Appointment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <form className="space-y-6">
                {/* Service Selection */}
                <div className="space-y-2">
                  <Label htmlFor="service" className="text-lg font-semibold text-blue-300">
                    Select Service
                  </Label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger className="w-full p-4 text-lg border-blue-400/50 bg-slate-700 text-white">
                      <SelectValue placeholder="Choose your service..." />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-blue-400/50">
                      {services.map((service) => (
                        <SelectItem
                          key={service.value}
                          value={service.value}
                          className="text-lg p-3 text-white hover:bg-slate-700"
                        >
                          {service.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date and Time Selection */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label className="text-lg font-semibold text-blue-300">Select Date</Label>
                    <div className="flex justify-center">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border border-blue-400/50 bg-slate-700 text-white"
                        disabled={(date) => date < new Date()}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="time" className="text-lg font-semibold text-blue-300">
                        Select Time
                      </Label>
                      <Select value={selectedTime} onValueChange={setSelectedTime}>
                        <SelectTrigger className="w-full p-4 text-lg border-blue-400/50 bg-slate-700 text-white">
                          <SelectValue placeholder="Choose time..." />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-blue-400/50">
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time} className="text-lg p-3 text-white hover:bg-slate-700">
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-lg font-semibold text-blue-300">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          placeholder="Enter your full name"
                          className="p-4 text-lg border-blue-400/50 bg-slate-700 text-white placeholder:text-gray-400"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-lg font-semibold text-blue-300">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Enter your phone number"
                          className="p-4 text-lg border-blue-400/50 bg-slate-700 text-white placeholder:text-gray-400"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-lg font-semibold text-blue-300">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          className="p-4 text-lg border-blue-400/50 bg-slate-700 text-white placeholder:text-gray-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-lg font-semibold text-blue-300">
                    Service Address
                  </Label>
                  <Textarea
                    id="address"
                    placeholder="Enter the address where service will be provided"
                    className="p-4 text-lg border-blue-400/50 bg-slate-700 text-white placeholder:text-gray-400 min-h-[100px]"
                  />
                </div>

                {/* Special Requests */}
                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-lg font-semibold text-blue-300">
                    Special Requests or Notes (Optional)
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Any special instructions or requests..."
                    className="p-4 text-lg border-blue-400/50 bg-slate-700 text-white placeholder:text-gray-400 min-h-[100px]"
                  />
                </div>

                {/* Booking Summary */}
                {selectedService && selectedDate && selectedTime && (
                  <Card className="bg-lavender-500/20 border-lavender-400/50">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-4">Booking Summary</h3>
                      <div className="space-y-2 text-gray-300">
                        <p>
                          <strong>Service:</strong> {services.find((s) => s.value === selectedService)?.label}
                        </p>
                        <p>
                          <strong>Date:</strong> {selectedDate?.toLocaleDateString()}
                        </p>
                        <p>
                          <strong>Time:</strong> {selectedTime}
                        </p>
                        <p className="text-lg font-semibold text-lavender-400">
                          <strong>Price:</strong> ${services.find((s) => s.value === selectedService)?.price}
                          {selectedService.includes("massage") ? "" : "/hour"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Submit Button */}
                <div className="text-center pt-6">
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-lavender-500 hover:bg-lavender-600 text-white px-12 py-4 text-xl font-bold"
                  >
                    Confirm Booking
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center pb-12">
        <h2 className="text-4xl md:text-6xl font-black text-lavender-400 tracking-wider drop-shadow-2xl">WELLNESS</h2>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-lavender-400 rounded-full blur-3xl"></div>
      </div>
    </div>
  )
}
