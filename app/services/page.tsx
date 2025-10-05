"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ShoppingCart } from "lucide-react"
import { motion } from "framer-motion"
import Header from "@/components/header"

const services = [
  { 
    id: "cleaning",
    title: "House Cleaning",
    description: "Professional deep cleaning services",
    price: "$60/hour",
    image: "https://firebasestorage.googleapis.com/v0/b/readyaimgo-clients-temp.firebasestorage.app/o/serenity-services%2Fcleaning-service-pexels-tima-miroshnichenko-6195885.jpg?alt=media&token=63ebf99a-7cfb-473f-a205-c1f00a6f5dc2",
    video: "https://xsdmcedkxpzfmfkkkgnd.supabase.co/storage/v1/object/public/landing/services/4109221-uhd_2160_4096_25fps.mp4"
  },
  { 
    id: "cooking",
    title: "Meal Preparation", 
    description: "Nutritious and delicious meals prepared with fresh ingredients",
    price: "$50/hour",
    image: "https://firebasestorage.googleapis.com/v0/b/readyaimgo-clients-temp.firebasestorage.app/o/serenity-services%2Fmeal-pexels-ivan-samkov-8951085.jpg?alt=media&token=63836b99-eb98-4dc8-89d3-b76109e4d4b3",
    video: "https://xsdmcedkxpzfmfkkkgnd.supabase.co/storage/v1/object/public/landing/services/11566289-hd_1080_1920_24fps.mp4"
  },
  { 
    id: "combo",
    title: "Cleaning + Cooking Combo",
    description: "Complete home care package",
    price: "$75/hour",
    image: "https://firebasestorage.googleapis.com/v0/b/readyaimgo-clients-temp.firebasestorage.app/o/serenity-services%2Fhouse-cleaning-pexels-karolina-grabowska-4239110.jpg?alt=media&token=393cb928-f032-4cd5-b75e-cbc4fa91a49f",
    video: "https://xsdmcedkxpzfmfkkkgnd.supabase.co/storage/v1/object/public/landing/services/12367941_1080_1920_30fps.mp4"
  },
  { 
    id: "massage-60",
    title: "Full Body Massage",
    description: "60-minute therapeutic massage",
    price: "$150",
    image: "https://firebasestorage.googleapis.com/v0/b/beam-home.firebasestorage.app/o/delirare%2Fmassage-therapist-hands.jpeg?alt=media&token=2fd1fd5c-cc1a-41b1-ad0e-fd6353e5157d",
    video: "https://xsdmcedkxpzfmfkkkgnd.supabase.co/storage/v1/object/public/landing/services/6187091-uhd_2160_3840_25fps.mp4"
  },
  { 
    id: "massage-30",
    title: "Express Massage",
    description: "30-minute relaxation massage",
    price: "$50",
    image: "https://firebasestorage.googleapis.com/v0/b/readyaimgo-clients-temp.firebasestorage.app/o/serenity-services%2Fmassage-2-pexels-cottonbro-3997993.jpg?alt=media&token=a7b18466-7c50-40f8-b9ef-4a3ac484311b",
    video: "https://xsdmcedkxpzfmfkkkgnd.supabase.co/storage/v1/object/public/landing/services/20393299-uhd_2160_3840_50fps.mp4"
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-amber-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12 pt-24">
        <div className="mb-8">
          <Link href="/" className="text-amber-600 hover:text-amber-700 mb-4 inline-flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-light text-gray-900 mb-2">Our Services</h1>
          <p className="text-gray-600">Choose from our range of professional services</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Services Cards */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6, type: "spring" }}
                className="group cursor-pointer"
              >
                <div className="relative w-full h-80 bg-cover bg-center rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  {/* Image Background */}
                  <div 
                    className="absolute inset-0 w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${service.image})`,
                    }}
                  ></div>
                  
                  {/* Video on Hover */}
                  <video
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src={service.video} type="video/mp4" />
                  </video>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300"></div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-sm text-gray-200 mb-4 opacity-90">{service.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium">{service.price}</span>
                      <Button asChild variant="ghost" className="text-white hover:text-gray-200 hover:bg-white/10">
                        <Link href={`/cart?service=${service.id}`} className="flex items-center">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Book Now
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Auset Introduction */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
              className="sticky top-24"
            >
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="mb-6">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/readyaimgo-clients-temp.firebasestorage.app/o/serenity-services%2Fserenity.png?alt=media&token=3c49bd8d-00d8-46e3-9884-5b1e5ffc1291"
                    alt="Serenity Services Logo"
                    className="w-full max-w-[200px] mx-auto mb-4 rounded-lg"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Hi, I'm Auset</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Welcome to Serenity Services! I'm here to help you create a peaceful, clean, and nourishing environment in your home. 
                    Whether you need professional cleaning, meal preparation, or a relaxing massage, we're committed to bringing serenity to your space.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <Button asChild className="w-full bg-amber-600 hover:bg-amber-700">
                    <Link href="/contact">Get In Touch</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/about">Learn More</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
