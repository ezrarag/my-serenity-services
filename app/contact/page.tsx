import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Navigation } from "@/components/navigation"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900">
      <Navigation />

      {/* Back to Home Button */}
      <div className="absolute top-8 left-8 z-10">
        <div className="flex items-center gap-3">
          <Button
            asChild
            className="bg-blue-400 hover:bg-blue-500 text-slate-800 px-4 py-3 rounded-lg font-bold text-sm border-2 border-blue-500 flex items-center gap-2"
          >
            <Link href="/">
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
        <h2 className="text-2xl md:text-3xl font-bold text-lavender-400 tracking-wide">CONTACT US</h2>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-slate-800/80 backdrop-blur-sm border-2 border-blue-400/50">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Get In Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-400/20 p-3 rounded-full">
                    <Phone className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Phone</h3>
                    <p className="text-gray-300">(555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-lavender-400/20 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-lavender-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Email</h3>
                    <p className="text-gray-300">info@serenitycleaningwellness.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-blue-400/20 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Service Area</h3>
                    <p className="text-gray-300">Greater Metropolitan Area</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-lavender-400/20 p-3 rounded-full">
                    <Clock className="w-6 h-6 text-lavender-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Hours</h3>
                    <p className="text-gray-300">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-300">Sunday: By appointment only</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="bg-slate-800/80 backdrop-blur-sm border-2 border-blue-400/50">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-blue-300">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="Enter your first name"
                      className="border-blue-400/50 bg-slate-700 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-blue-300">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Enter your last name"
                      className="border-blue-400/50 bg-slate-700 text-white placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-blue-300">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="border-blue-400/50 bg-slate-700 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-blue-300">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    className="border-blue-400/50 bg-slate-700 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-blue-300">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    placeholder="What is this regarding?"
                    className="border-blue-400/50 bg-slate-700 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-blue-300">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us how we can help you..."
                    className="border-blue-400/50 bg-slate-700 text-white placeholder:text-gray-400 min-h-[120px]"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-lavender-500 hover:bg-lavender-600 text-white py-3 text-lg font-bold"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
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
