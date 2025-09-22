"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ArrowRight, Calendar, Phone, Mail } from "lucide-react"
import Header from "@/components/header"

const services = [
  {
    id: "cleaning",
    title: "House Cleaning",
    // description: "Professional deep cleaning services that transform your space. Every detail is attended to with care, ensuring a pristine environment that promotes peace and tranquility.",
    price: "$60/hour",
    image: "https://firebasestorage.googleapis.com/v0/b/readyaimgo-clients-temp.firebasestorage.app/o/serenity-services%2Fcleaning-service-pexels-tima-miroshnichenko-6195885.jpg?alt=media&token=63ebf99a-7cfb-473f-a205-c1f00a6f5dc2",
    video: "https://xsdmcedkxpzfmfkkkgnd.supabase.co/storage/v1/object/public/landing/services/4109221-uhd_2160_4096_25fps.mp4"
  },
  {
    id: "cooking",
    title: "Meal Preparation",
    // description: "Nutritious and delicious meals prepared with fresh ingredients. Our culinary experts craft balanced dishes that nourish both body and soul.",
    price: "$50/hour",
    image: "https://firebasestorage.googleapis.com/v0/b/readyaimgo-clients-temp.firebasestorage.app/o/serenity-services%2Fmeal-pexels-ivan-samkov-8951085.jpg?alt=media&token=63836b99-eb98-4dc8-89d3-b76109e4d4b3",
    video: "https://xsdmcedkxpzfmfkkkgnd.supabase.co/storage/v1/object/public/landing/services/11566289-hd_1080_1920_24fps.mp4"
  },
  {
    id: "combo",
    title: "Cleaning + Cooking Combo",
    // description: "Complete home care package that addresses both your space and nourishment needs. A harmonious blend of cleanliness and culinary excellence.",
    price: "$75/hour",
    image: "https://firebasestorage.googleapis.com/v0/b/readyaimgo-clients-temp.firebasestorage.app/o/serenity-services%2Fhouse-cleaning-pexels-karolina-grabowska-4239110.jpg?alt=media&token=393cb928-f032-4cd5-b75e-cbc4fa91a49f",
    video: "https://xsdmcedkxpzfmfkkkgnd.supabase.co/storage/v1/object/public/landing/services/12367941_1080_1920_30fps.mp4"
  },
  {
    id: "massage-60",
    title: "Full Body Massage",
    // description: "60-minute therapeutic massage designed to release tension and restore balance. Experience true relaxation through skilled hands and mindful techniques.",
    price: "$150",
    image: "https://firebasestorage.googleapis.com/v0/b/readyaimgo-clients-temp.firebasestorage.app/o/serenity-services%2Ffull-body-pexels-tima-miroshnichenko-6187264.jpg?alt=media&token=2449d083-a1a4-4fc2-acb5-184878b0dcbd",
    video: "https://xsdmcedkxpzfmfkkkgnd.supabase.co/storage/v1/object/public/landing/services/6187091-uhd_2160_3840_25fps.mp4"
  },
  {
    id: "massage-30",
    title: "Express Massage",
    // description: "30-minute relaxation massage for those moments when you need a quick escape. Efficient yet effective treatment for immediate relief.",
    price: "$50",
    image: "https://firebasestorage.googleapis.com/v0/b/readyaimgo-clients-temp.firebasestorage.app/o/serenity-services%2Fmassage-2-pexels-cottonbro-3997993.jpg?alt=media&token=a7b18466-7c50-40f8-b9ef-4a3ac484311b",
    video: "https://xsdmcedkxpzfmfkkkgnd.supabase.co/storage/v1/object/public/landing/services/20393299-uhd_2160_3840_50fps.mp4"
  }
]

export default function HomePage() {
  const [currentService, setCurrentService] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div 
            className="fixed inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/readyaimgo-clients-temp.firebasestorage.app/o/serenity-services%2Fwindow%20-%20pexels-karolina-grabowska-4239146.jpg?alt=media&token=a9ecf3df-c01a-4799-9f2b-ab371bc90efc)`,
            }}
          >
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20">
            <div className="text-center max-w-4xl mx-auto px-6">
              <h1 className="text-6xl md:text-8xl font-light mb-8 leading-tight">
                serenity in every detail
              </h1>
              
              {/* Quote Area */}
              <div className="mb-12">
                <blockquote className="text-xl md:text-2xl font-light italic mb-4">
                  "Where cleanliness meets godliness"
                </blockquote>
                <p className="text-lg text-gray-200">Discover the art of mindful cleaning</p>
              </div>
              
              {/* Scroll Indicator */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="text-center">
                  <p className="text-sm font-light mb-2">SCROLL TO EXPLORE</p>
                  <div className="w-px h-8 bg-white mx-auto animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Gradient Overlay for smooth transition */}
          {/* <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FEFBEB] to-transparent z-10"></div> */}
        </section>

        {/* Services Section */}
        <section className="relative py-20 bg-transparent z-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative group cursor-pointer"
                >
                  <div className="relative w-80 h-96 md:w-96 md:h-[500px] transform rotate-3 hover:rotate-0 transition-transform duration-500">
                    {/* Image Background */}
                    <div 
                      className="absolute inset-0 w-full h-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${service.image})`,
                      }}
                    ></div>
                    
                    {/* Video Fallback */}
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
                    <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                      <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
                      {/* <p className="text-sm mb-4 opacity-90">{service.description}</p> */}
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-medium">{service.price}</span>
                        <Button asChild variant="ghost" className="text-white hover:text-gray-200">
                          <Link href={`/cart?service=${service.id}`}>Book Now</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
