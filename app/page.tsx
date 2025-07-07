import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Phone } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 relative overflow-hidden">
      <Navigation />

      {/* Contact Button - Top Left (matching screenshot style) */}
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

      {/* Main Brand Name - Center */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center">
        <h1 className="text-8xl md:text-9xl font-black text-blue-400 tracking-wider mb-4 drop-shadow-2xl">SERENITY</h1>
      </div>

      {/* Video Placeholder - Center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full max-w-4xl mx-auto px-8">
          {/* Video Container */}
          <div className="relative aspect-video bg-black/20 backdrop-blur-sm rounded-2xl overflow-hidden border-2 border-blue-400/30">
            <video className="w-full h-full object-cover opacity-60" autoPlay muted loop playsInline>
              <source src="/placeholder-video.mp4" type="video/mp4" />
            </video>

            {/* Video Placeholder Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-lavender-900/40 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-20 h-20 border-4 border-white rounded-full flex items-center justify-center mb-4 mx-auto">
                  <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                </div>
                <p className="text-xl font-semibold">Watch Our Services</p>
              </div>
            </div>
          </div>

          {/* Floating Service Images */}
          <div className="absolute -left-20 top-1/4 w-32 h-32 bg-white/10 backdrop-blur-sm rounded-full border-2 border-lavender-400/50 flex items-center justify-center">
            <img
              src="/placeholder.svg?height=80&width=80&text=Cleaning"
              alt="Cleaning service"
              className="w-16 h-16 rounded-full opacity-80"
            />
          </div>

          <div className="absolute -right-20 top-1/3 w-40 h-40 bg-white/10 backdrop-blur-sm rounded-full border-2 border-blue-400/50 flex items-center justify-center">
            <img
              src="/placeholder.svg?height=100&width=100&text=Massage"
              alt="Massage service"
              className="w-20 h-20 rounded-full opacity-80"
            />
          </div>
        </div>
      </div>

      {/* Bottom Text Overlay - matching "STRASBOURG" style */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10">
        <h2 className="text-6xl md:text-8xl font-black text-lavender-400 tracking-wider drop-shadow-2xl">WELLNESS</h2>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-lavender-400 rounded-full blur-3xl"></div>
      </div>
    </div>
  )
}
