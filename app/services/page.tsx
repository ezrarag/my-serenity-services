import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

const services = [
  {
    title: "House Cleaning",
    price: "$60/hour",
    description: "Professional deep cleaning for your home including all rooms, bathrooms, and kitchen.",
    features: ["Deep cleaning", "All rooms included", "Eco-friendly products", "Flexible scheduling"],
    image:
      "https://gfqhzuqckfxtzqawdcso.supabase.co/storage/v1/object/public/usethisfornow/myserenityservices/IMG_0042.png",
  },
  {
    title: "Meal Preparation",
    price: "$50/hour",
    description: "Healthy meal prep and cooking services tailored to your dietary preferences.",
    features: ["Custom meal planning", "Fresh ingredients", "Dietary accommodations", "Weekly prep available"],
    image:
      "https://gfqhzuqckfxtzqawdcso.supabase.co/storage/v1/object/public/usethisfornow/myserenityservices/IMG_1548.png",
  },
  {
    title: "Cleaning + Cooking Combo",
    price: "$75/hour",
    description: "Complete home care package combining our cleaning and cooking services.",
    features: ["House cleaning", "Meal preparation", "Time efficient", "Best value package"],
    image:
      "https://gfqhzuqckfxtzqawdcso.supabase.co/storage/v1/object/public/usethisfornow/myserenityservices/IMG_4430.png",
  },
  {
    title: "Full Body Massage",
    price: "$100 for 60 minutes",
    description: "Therapeutic full-body massage to help you relax and rejuvenate.",
    features: ["60-minute session", "Professional therapist", "Relaxing environment", "Stress relief"],
    image:
      "https://gfqhzuqckfxtzqawdcso.supabase.co/storage/v1/object/public/usethisfornow/myserenityservices/IMG_0042.png",
  },
  {
    title: "Express Massage",
    price: "$50 for 30 minutes",
    description: "Quick relaxation massage perfect for busy schedules.",
    features: ["30-minute session", "Targeted relief", "Quick booking", "Affordable option"],
    image:
      "https://gfqhzuqckfxtzqawdcso.supabase.co/storage/v1/object/public/usethisfornow/myserenityservices/IMG_1548.png",
  },
]

export default function ServicesPage() {
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
            <h1 className="text-3xl font-bold text-orange-600">Our Services</h1>
            <p className="text-orange-500">Professional cleaning and wellness services</p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="border-orange-200 hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-orange-600">{service.title}</CardTitle>
                <CardDescription className="text-orange-500 font-semibold text-lg">{service.price}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-1 mb-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-500 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                  <Link href="/booking">Book This Service</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
