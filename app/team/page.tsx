import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Phone } from "lucide-react"

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Lead Cleaning Specialist",
      experience: "8 years experience",
      image: "/placeholder.svg?height=200&width=200&text=Sarah",
    },
    {
      name: "Michael Chen",
      role: "Licensed Massage Therapist",
      experience: "6 years experience",
      image: "/placeholder.svg?height=200&width=200&text=Michael",
    },
    {
      name: "Emma Rodriguez",
      role: "Culinary Specialist",
      experience: "5 years experience",
      image: "/placeholder.svg?height=200&width=200&text=Emma",
    },
    {
      name: "David Thompson",
      role: "Wellness Coordinator",
      experience: "7 years experience",
      image: "/placeholder.svg?height=200&width=200&text=David",
    },
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
        <h2 className="text-2xl md:text-3xl font-bold text-lavender-400 tracking-wide">THE SERENITY TEAM</h2>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Meet our dedicated team of professionals who are committed to bringing you the highest quality cleaning
              and wellness services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="bg-slate-800/80 backdrop-blur-sm border-2 border-blue-400/50 hover:border-lavender-400/50 transition-colors"
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto border-4 border-blue-400/50"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-lavender-400 font-semibold mb-2">{member.role}</p>
                  <p className="text-gray-300 text-sm">{member.experience}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Card className="bg-gradient-to-r from-blue-500/80 to-lavender-500/80 backdrop-blur-sm border-2 border-blue-400/50">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-4 text-white">Join Our Team</h2>
                <p className="text-xl mb-6 text-gray-200">
                  We're always looking for passionate professionals to join our growing team.
                </p>
                <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 font-bold">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
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
