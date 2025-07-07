import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Star } from "lucide-react"

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Lead House Cleaner",
    experience: "8 years experience",
    specialties: ["Deep cleaning", "Eco-friendly products", "Organization"],
    image:
      "https://gfqhzuqckfxtzqawdcso.supabase.co/storage/v1/object/public/usethisfornow/myserenityservices/IMG_0042.png",
  },
  {
    name: "Maria Rodriguez",
    role: "Personal Chef",
    experience: "12 years experience",
    specialties: ["Meal prep", "Dietary restrictions", "International cuisine"],
    image:
      "https://gfqhzuqckfxtzqawdcso.supabase.co/storage/v1/object/public/usethisfornow/myserenityservices/IMG_1548.png",
  },
  {
    name: "David Chen",
    role: "Massage Therapist",
    experience: "10 years experience",
    specialties: ["Deep tissue", "Relaxation therapy", "Sports massage"],
    image:
      "https://gfqhzuqckfxtzqawdcso.supabase.co/storage/v1/object/public/usethisfornow/myserenityservices/IMG_4430.png",
  },
]

export default function TeamPage() {
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
            <h1 className="text-3xl font-bold text-orange-600">Our Team</h1>
            <p className="text-orange-500">Meet the professionals who make Serenity Services special</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Team Introduction */}
          <Card className="border-orange-200 mb-8">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-orange-600 mb-4">Experienced Professionals</h2>
              <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Our carefully selected team members are not just skilled professionals—they're passionate about helping
                you create a more comfortable, healthy, and balanced lifestyle. Each team member is fully trained,
                insured, and committed to delivering exceptional service.
              </p>
            </CardContent>
          </Card>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="border-orange-200 hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-orange-600">{member.name}</CardTitle>
                  <CardDescription className="text-orange-500 font-medium">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-orange-400" />
                      <span className="text-sm text-gray-600">{member.experience}</span>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Specialties:</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.specialties.map((specialty, idx) => (
                          <span key={idx} className="px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded-full">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Join Our Team CTA */}
          <Card className="border-orange-200 bg-orange-50 mt-12">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-orange-600 mb-4">Join Our Team</h2>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                Are you a skilled professional looking to join a team that values quality, care, and community? We're
                always looking for talented individuals to grow with us.
              </p>
              <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
                <Link href="/contact">Apply Now</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
