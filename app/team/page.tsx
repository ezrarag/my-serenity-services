import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Star, Award, Clock, Heart } from "lucide-react"

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    image: "/placeholder.svg?height=300&width=300&text=Sarah",
    bio: "Sarah founded Serenity Services with a vision to bring professional hospitality standards to home care. With over 10 years of experience in luxury hospitality management, she ensures every client receives exceptional service.",
    specialties: ["Business Strategy", "Client Relations", "Quality Assurance"],
    experience: "10+ years",
    rating: 5.0,
  },
  {
    name: "Michael Chen",
    role: "Head of Operations",
    image: "/placeholder.svg?height=300&width=300&text=Michael",
    bio: "Michael oversees all operational aspects of our services, ensuring consistent quality and reliability. His background in logistics and team management keeps our operations running smoothly.",
    specialties: ["Operations Management", "Team Leadership", "Process Optimization"],
    experience: "8+ years",
    rating: 4.9,
  },
  {
    name: "Emma Rodriguez",
    role: "Lead Wellness Specialist",
    image: "/placeholder.svg?height=300&width=300&text=Emma",
    bio: "Emma is a licensed massage therapist specializing in therapeutic and relaxation techniques. She brings healing and wellness directly to your home with personalized care.",
    specialties: ["Therapeutic Massage", "Stress Relief", "Wellness Consultation"],
    experience: "7+ years",
    rating: 5.0,
  },
  {
    name: "David Kim",
    role: "Senior Cleaning Specialist",
    image: "/placeholder.svg?height=300&width=300&text=David",
    bio: "David leads our cleaning team with expertise in eco-friendly cleaning methods and attention to detail. He ensures every home receives thorough, professional care.",
    specialties: ["Deep Cleaning", "Eco-friendly Methods", "Detail Orientation"],
    experience: "6+ years",
    rating: 4.8,
  },
  {
    name: "Lisa Thompson",
    role: "Culinary Specialist",
    image: "/placeholder.svg?height=300&width=300&text=Lisa",
    bio: "Lisa brings professional culinary skills to meal preparation services. With training from culinary school and experience in healthy cooking, she creates nutritious, delicious meals.",
    specialties: ["Meal Preparation", "Nutritional Cooking", "Dietary Accommodations"],
    experience: "5+ years",
    rating: 4.9,
  },
  {
    name: "James Wilson",
    role: "Customer Success Manager",
    image: "/placeholder.svg?height=300&width=300&text=James",
    bio: "James ensures every client has an exceptional experience from booking to service completion. He handles scheduling, follow-ups, and ensures all client needs are met.",
    specialties: ["Customer Service", "Scheduling", "Client Communication"],
    experience: "4+ years",
    rating: 4.9,
  },
]

export default function TeamPage() {
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
              <h1 className="text-2xl font-bold text-orange-600">The Serenity Team</h1>
              <p className="text-orange-500 text-sm">Meet the professionals who serve you</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Experienced Professionals You Can Trust</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our team consists of carefully selected, trained, and certified professionals who are passionate about
            providing exceptional service. Each team member is background-checked, insured, and committed to your
            satisfaction.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="bg-white/90 backdrop-blur-sm border-orange-200 hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-orange-200"
                  />
                  <h3 className="font-bold text-gray-800 text-xl mb-1">{member.name}</h3>
                  <p className="text-orange-600 font-medium mb-2">{member.role}</p>

                  {/* Rating */}
                  <div className="flex items-center justify-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(member.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">({member.rating})</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.bio}</p>

                {/* Experience */}
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium text-gray-700">{member.experience} experience</span>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                    <Award className="w-4 h-4 text-orange-500" />
                    Specialties
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {member.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white/90 backdrop-blur-sm border border-orange-200 rounded-lg p-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-orange-500" />
            <h3 className="text-3xl font-bold text-gray-800">Ready to Meet Our Team?</h3>
          </div>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Book a service today and experience the difference our professional team makes. We're here to bring serenity
            and care to your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
              <Link href="/booking">Book Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-orange-400 text-orange-600 hover:bg-orange-50 px-8 py-3 bg-transparent"
            >
              <Link href="/contact">Contact Team</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
