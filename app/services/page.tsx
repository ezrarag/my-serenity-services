import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Home, ChefHat, Heart, Sparkles } from "lucide-react"

const services = [
  {
    id: "cleaning",
    title: "House Cleaning",
    price: "$60/hour",
    description: "Professional deep cleaning for your home including all rooms, bathrooms, and kitchen.",
    features: ["Deep cleaning", "Eco-friendly products", "Flexible scheduling", "Insured staff"],
    icon: Home,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "cooking",
    title: "Meal Preparation",
    price: "$50/hour",
    description: "Healthy meal prep and cooking services tailored to your dietary preferences.",
    features: ["Custom meal plans", "Fresh ingredients", "Dietary accommodations", "Weekly prep"],
    icon: ChefHat,
    color: "bg-green-100 text-green-600",
  },
  {
    id: "combo",
    title: "Cleaning + Cooking",
    price: "$75/hour",
    description: "Complete home care package combining cleaning and meal preparation services.",
    features: ["Best value", "Complete home care", "Time saving", "Coordinated service"],
    icon: Sparkles,
    color: "bg-purple-100 text-purple-600",
    popular: true,
  },
  {
    id: "massage-60",
    title: "Full Body Massage (60 min)",
    price: "$100",
    description: "Relaxing therapeutic massage to relieve stress and muscle tension.",
    features: ["60 minutes", "Full body", "Therapeutic oils", "Stress relief"],
    icon: Heart,
    color: "bg-pink-100 text-pink-600",
  },
  {
    id: "massage-30",
    title: "Express Massage (30 min)",
    price: "$50",
    description: "Quick relaxation massage perfect for busy schedules.",
    features: ["30 minutes", "Targeted areas", "Quick relief", "Flexible timing"],
    icon: Heart,
    color: "bg-orange-100 text-orange-600",
  },
]

export default function ServicesPage() {
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
              <h1 className="text-2xl font-bold text-orange-600">Our Services</h1>
              <p className="text-orange-500 text-sm">Professional cleaning and wellness services</p>
            </div>
          </div>
          <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
            <Link href="/booking">Book Now</Link>
          </Button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const IconComponent = service.icon
            return (
              <Card
                key={service.id}
                className={`relative bg-white/90 backdrop-blur-sm border-orange-200 hover:shadow-lg transition-shadow ${
                  service.popular ? "ring-2 ring-orange-400" : ""
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-bold text-orange-600">{service.price}</span>
                  </div>
                  <CardTitle className="text-xl text-gray-800">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                    <Link href={`/booking?service=${service.id}`}>Book This Service</Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
