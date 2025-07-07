import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Home, ChefHat, Heart, Sparkles, Phone } from "lucide-react"

export default function ServicesPage() {
  const services = [
    {
      icon: <Home className="w-8 h-8" />,
      title: "House Cleaning",
      price: "$60/hour",
      description: "Professional deep cleaning for your entire home",
      features: ["Deep cleaning", "Bathroom sanitization", "Kitchen cleaning", "Dusting & vacuuming"],
    },
    {
      icon: <ChefHat className="w-8 h-8" />,
      title: "Meal Preparation",
      price: "$50/hour",
      description: "Healthy meal prep and cooking services",
      features: ["Menu planning", "Grocery shopping", "Meal preparation", "Kitchen cleanup"],
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Cooking + Cleaning Combo",
      price: "$75/hour",
      description: "Complete home service package",
      features: ["Meal preparation", "Kitchen cleaning", "Dining area cleanup", "Best value option"],
      popular: true,
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Wellness Massage - 60 minutes",
      price: "$100",
      description: "Full body therapeutic massage session",
      features: ["Full body massage", "Relaxation techniques", "Stress relief", "60 minutes duration"],
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Wellness Massage - 30 minutes",
      price: "$50",
      description: "Express massage for quick relaxation",
      features: ["Targeted massage", "Quick stress relief", "Perfect for busy schedules", "30 minutes duration"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900">
      <Navigation />

      {/* Contact Button - matching homepage style */}
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
        <h2 className="text-2xl md:text-3xl font-bold text-lavender-400 tracking-wide">OUR SERVICES</h2>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`relative bg-slate-800/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 border-2 ${
                service.popular ? "border-lavender-400" : "border-blue-400/50"
              }`}
            >
              {service.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-lavender-500 text-white font-bold">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center pb-4">
                <div
                  className={`mx-auto mb-4 p-3 rounded-full ${
                    service.popular ? "bg-lavender-400/20 text-lavender-400" : "bg-blue-400/20 text-blue-400"
                  }`}
                >
                  {service.icon}
                </div>
                <CardTitle className="text-xl text-white">{service.title}</CardTitle>
                <div className={`text-3xl font-bold ${service.popular ? "text-lavender-400" : "text-blue-400"}`}>
                  {service.price}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-300">
                      <div
                        className={`w-2 h-2 rounded-full mr-3 ${service.popular ? "bg-lavender-400" : "bg-blue-400"}`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-lavender-500 hover:bg-lavender-600 text-white px-8 py-4 text-lg font-bold"
          >
            <Link href="/booking">Book Your Service</Link>
          </Button>
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
