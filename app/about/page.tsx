import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Heart, Shield, Star, Users } from "lucide-react"

export default function AboutPage() {
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
            <h1 className="text-3xl font-bold text-orange-600">About Serenity Services</h1>
            <p className="text-orange-500">Your trusted partner in home care and wellness</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <Card className="border-orange-200">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-orange-600 mb-4">Our Mission</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  At Serenity Services, we believe everyone deserves a clean, comfortable home and time to focus on what
                  matters most. Our professional team provides exceptional cleaning, cooking, and wellness services to
                  help you achieve the perfect work-life balance.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-orange-200 text-center">
              <CardContent className="p-6">
                <Heart className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                <h3 className="font-semibold text-orange-600 mb-2">Care</h3>
                <p className="text-sm text-gray-600">We treat your home with the same care we'd give our own</p>
              </CardContent>
            </Card>

            <Card className="border-orange-200 text-center">
              <CardContent className="p-6">
                <Shield className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                <h3 className="font-semibold text-orange-600 mb-2">Trust</h3>
                <p className="text-sm text-gray-600">Fully insured and background-checked professionals</p>
              </CardContent>
            </Card>

            <Card className="border-orange-200 text-center">
              <CardContent className="p-6">
                <Star className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                <h3 className="font-semibold text-orange-600 mb-2">Quality</h3>
                <p className="text-sm text-gray-600">Exceptional service standards in everything we do</p>
              </CardContent>
            </Card>

            <Card className="border-orange-200 text-center">
              <CardContent className="p-6">
                <Users className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                <h3 className="font-semibold text-orange-600 mb-2">Community</h3>
                <p className="text-sm text-gray-600">Supporting local families and businesses</p>
              </CardContent>
            </Card>
          </div>

          {/* Services Overview */}
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="text-orange-600">What We Offer</CardTitle>
              <CardDescription>Comprehensive home care and wellness services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-orange-600 mb-2">Home Services</h3>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Professional house cleaning</li>
                    <li>• Meal preparation and cooking</li>
                    <li>• Combination packages</li>
                    <li>• Regular maintenance schedules</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-orange-600 mb-2">Wellness Services</h3>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Therapeutic massage therapy</li>
                    <li>• Express relaxation sessions</li>
                    <li>• Stress relief treatments</li>
                    <li>• Flexible scheduling options</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-orange-600 mb-4">Ready to Experience Serenity?</h2>
              <p className="text-gray-700 mb-6">
                Join hundreds of satisfied customers who trust us with their home care needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
                  <Link href="/booking">Book Your First Service</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-orange-400 text-orange-600 hover:bg-orange-100 bg-transparent"
                >
                  <Link href="/contact">Get In Touch</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
