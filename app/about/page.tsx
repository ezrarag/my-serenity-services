import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Heart, Shield, Star, Users } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Care & Compassion",
    description: "We treat every home and client with the utmost care and respect.",
  },
  {
    icon: Shield,
    title: "Trust & Reliability",
    description: "Fully insured and bonded professionals you can depend on.",
  },
  {
    icon: Star,
    title: "Quality Excellence",
    description: "We maintain the highest standards in all our services.",
  },
  {
    icon: Users,
    title: "Personal Touch",
    description: "Customized services tailored to your unique needs.",
  },
]

const team = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    image: "/placeholder.svg?height=200&width=200&text=Sarah",
    bio: "With 10+ years in hospitality, Sarah founded Serenity Services to bring professional care to every home.",
  },
  {
    name: "Michael Chen",
    role: "Head of Operations",
    image: "/placeholder.svg?height=200&width=200&text=Michael",
    bio: "Michael ensures our team delivers consistent, high-quality service across all locations.",
  },
  {
    name: "Emma Rodriguez",
    role: "Wellness Specialist",
    image: "/placeholder.svg?height=200&width=200&text=Emma",
    bio: "Licensed massage therapist with expertise in therapeutic and relaxation techniques.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 font-manrope">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-orange-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/" className="text-orange-600 hover:text-orange-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-orange-600">About Us</h1>
              <p className="text-orange-500 text-sm">Learn about our story and values</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Bringing Serenity to Your Home</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            At Serenity Services, we believe that everyone deserves a clean, comfortable home and moments of wellness in
            their busy lives. Founded in 2020, we've been dedicated to providing exceptional cleaning and wellness
            services that give you more time for what matters most.
          </p>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-12">Our Values</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <Card key={index} className="bg-white/90 backdrop-blur-sm border-orange-200 text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-orange-600" />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">{value.title}</h4>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-12">Meet Our Team</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="bg-white/90 backdrop-blur-sm border-orange-200">
                <CardContent className="p-6 text-center">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h4 className="font-semibold text-gray-800 text-lg mb-1">{member.name}</h4>
                  <p className="text-orange-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white/90 backdrop-blur-sm border border-orange-200 rounded-lg p-12">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Ready to Experience Serenity?</h3>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied customers who trust us with their home care and wellness needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
              <Link href="/booking">Book a Service</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-orange-400 text-orange-600 hover:bg-orange-50 px-8 py-3 bg-transparent"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
