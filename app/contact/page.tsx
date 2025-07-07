import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Phone, Mail, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button asChild variant="ghost" size="icon">
            <Link href="/">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-orange-600">Contact Us</h1>
            <p className="text-orange-500">Get in touch with Serenity Services</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="text-orange-600">Get In Touch</CardTitle>
              <CardDescription>We're here to help with all your service needs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-gray-600">(555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">contact@serenity.co</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="font-medium">Service Area</p>
                  <p className="text-gray-600">Greater Metropolitan Area</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="font-medium">Hours</p>
                  <p className="text-gray-600">Mon-Fri: 8AM-6PM</p>
                  <p className="text-gray-600">Sat-Sun: 9AM-5PM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="text-orange-600">Quick Actions</CardTitle>
              <CardDescription>Ready to get started?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                <Link href="/booking">Book a Service</Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full border-orange-400 text-orange-600 hover:bg-orange-50 bg-transparent"
              >
                <Link href="/services">View All Services</Link>
              </Button>

              <div className="pt-4 border-t border-orange-200">
                <h3 className="font-semibold text-orange-600 mb-2">Emergency Services</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Need immediate assistance? We offer emergency cleaning and wellness services.
                </p>
                <Button variant="outline" className="w-full border-red-400 text-red-600 hover:bg-red-50 bg-transparent">
                  Emergency Contact
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
