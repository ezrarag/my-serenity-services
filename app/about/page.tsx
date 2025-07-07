import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Heart, Shield, Star, Users, Phone } from "lucide-react"

export default function AboutPage() {
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
        <h2 className="text-2xl md:text-3xl font-bold text-lavender-400 tracking-wide">WHO ARE WE?</h2>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Our Story */}
          <Card className="bg-slate-800/80 backdrop-blur-sm border-2 border-blue-400/50">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                Founded with a passion for creating peaceful, clean environments, Serenity Cleaning & Wellness combines
                professional cleaning services with therapeutic wellness treatments. We believe that a clean home and a
                relaxed mind go hand in hand.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Our team consists of certified cleaning professionals and licensed massage therapists who are dedicated
                to providing exceptional service with attention to detail and care for your well-being.
              </p>
            </CardContent>
          </Card>

          {/* Our Values */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-slate-800/80 backdrop-blur-sm border-2 border-blue-400/50">
              <CardContent className="p-6 text-center">
                <div className="bg-blue-400/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Trusted & Reliable</h3>
                <p className="text-gray-300">
                  All our team members are background-checked, insured, and trained to the highest standards.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/80 backdrop-blur-sm border-2 border-lavender-400/50">
              <CardContent className="p-6 text-center">
                <div className="bg-lavender-400/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-lavender-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Care & Compassion</h3>
                <p className="text-gray-300">
                  We treat every home and client with the utmost care and respect, as if it were our own family.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/80 backdrop-blur-sm border-2 border-lavender-400/50">
              <CardContent className="p-6 text-center">
                <div className="bg-lavender-400/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Star className="w-8 h-8 text-lavender-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Excellence</h3>
                <p className="text-gray-300">
                  We strive for perfection in every service, ensuring your complete satisfaction every time.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/80 backdrop-blur-sm border-2 border-blue-400/50">
              <CardContent className="p-6 text-center">
                <div className="bg-blue-400/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Community Focused</h3>
                <p className="text-gray-300">
                  We're proud to serve our local community and build lasting relationships with our clients.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-blue-500/80 to-lavender-500/80 backdrop-blur-sm border-2 border-blue-400/50">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-4 text-white">Ready to Experience Serenity?</h2>
                <p className="text-xl mb-6 text-gray-200">Let us bring peace and cleanliness to your home today.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 font-bold">
                    <Link href="/services">View Our Services</Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 bg-transparent font-bold"
                  >
                    <Link href="/booking">Book Now</Link>
                  </Button>
                </div>
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
