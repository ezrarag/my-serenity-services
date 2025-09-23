"use client"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { ChevronDown, ArrowRight, Calendar, Phone, Mail, ChevronLeft, ChevronRight } from "lucide-react"
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
    image: "https://firebasestorage.googleapis.com/v0/b/beam-home.firebasestorage.app/o/delirare%2Fmassage-therapist-hands.jpeg?alt=media&token=2fd1fd5c-cc1a-41b1-ad0e-fd6353e5157d",
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
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroBlur = useTransform(scrollYProgress, [0, 0.5], [0, 10])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100])
  
  // Background overlay for scroll darkening
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 0.8])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />
      
      <main>
        {/* Hero Section */}
        <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div 
            className="fixed inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/readyaimgo-clients-temp.firebasestorage.app/o/serenity-services%2Fwindow%20-%20pexels-karolina-grabowska-4239146.jpg?alt=media&token=a9ecf3df-c01a-4799-9f2b-ab371bc90efc)`,
            }}
          >
            <div className="absolute inset-0 bg-black/20"></div>
            {/* Scroll-based overlay */}
            <motion.div 
              className="absolute inset-0"
              style={{ 
                backgroundColor: '#154058',
                opacity: overlayOpacity
              }}
            />
          </div>

          {/* Hero Content */}
          <motion.div 
            className="absolute inset-0 flex flex-col items-center justify-center text-white z-20"
            style={{ 
              opacity: heroOpacity,
              filter: `blur(${heroBlur}px)`,
              y: heroY
            }}
          >
              <div className="text-center max-w-4xl mx-auto px-6">
                <h1 className="text-6xl md:text-8xl mb-8 leading-tight" style={{ 
                  fontFamily: "var(--font-dancing-script), 'Great Vibes', 'Allura', cursive",
                  fontWeight: 400,
                  fontStyle: 'normal'
                }}>
                  serenity services
                </h1>
              
              {/* Quote Area */}
              <div className="mb-12">
                <blockquote className="text-xl md:text-2xl font-light italic mb-4">
                  "Cleaning with care, cooking with love."
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
          </motion.div>

          {/* Gradient Overlay for smooth transition */}
          {/* <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FEFBEB] to-transparent z-10"></div> */}
        </section>

        {/* Services Section */}
        <section ref={servicesRef} className="relative py-20 bg-transparent z-10">
          <div className="container mx-auto px-4">
            <div className="flex justify-center">
              <div className="relative">
                {/* Navigation Arrows */}
                <div className="absolute -left-16 top-1/2 transform -translate-y-1/2 z-20">
                  <button
                    onClick={() => setActiveCardIndex((prev) => (prev > 0 ? prev - 1 : services.length - 1))}
                    className="p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-700" />
                  </button>
                </div>
                <div className="absolute -right-16 top-1/2 transform -translate-y-1/2 z-20">
                  <button
                    onClick={() => setActiveCardIndex((prev) => (prev < services.length - 1 ? prev + 1 : 0))}
                    className="p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-700" />
                  </button>
                </div>

                {/* Stacked Cards */}
                <div className="relative w-96 h-[500px]">
                  {services.map((service, index) => {
                    const isHovered = hoveredCard === service.id
                    const isActive = index === activeCardIndex
                    const isBehind = hoveredCard && hoveredCard !== service.id
                    const springX = useSpring(0, { stiffness: 150, damping: 15 })
                    const springY = useSpring(0, { stiffness: 150, damping: 15 })
                    const springScale = useSpring(1, { stiffness: 150, damping: 15 })
                    const springRotate = useSpring(3, { stiffness: 150, damping: 15 })
                    
                    // Mouse attraction effect
                    useEffect(() => {
                      if (isHovered) {
                        const cardElement = document.getElementById(`card-${service.id}`)
                        if (cardElement) {
                          const rect = cardElement.getBoundingClientRect()
                          const cardCenterX = rect.left + rect.width / 2
                          const cardCenterY = rect.top + rect.height / 2
                          
                          const deltaX = (mousePosition.x - cardCenterX) * 0.1
                          const deltaY = (mousePosition.y - cardCenterY) * 0.1
                          
                          springX.set(deltaX)
                          springY.set(deltaY)
                          springScale.set(1.05)
                          springRotate.set(0)
                        }
                      } else if (isBehind) {
                        springX.set(0)
                        springY.set(0)
                        springScale.set(0.85)
                        springRotate.set(3)
                      } else if (isActive) {
                        springX.set(0)
                        springY.set(-20)
                        springScale.set(1.02)
                        springRotate.set(0)
                      } else {
                        springX.set(0)
                        springY.set(0)
                        springScale.set(0.9)
                        springRotate.set(3)
                      }
                    }, [mousePosition, isHovered, isBehind, isActive, service.id])

                    return (
                      <motion.div
                        key={service.id}
                        id={`card-${service.id}`}
                        initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="absolute inset-0 group cursor-pointer"
                        style={{
                          x: springX,
                          y: springY,
                          scale: springScale,
                          rotate: springRotate,
                          zIndex: isActive ? 10 : (isHovered ? 15 : services.length - index),
                          opacity: isBehind ? 0.3 : (isActive ? 1 : 0.7)
                        }}
                        onMouseEnter={() => setHoveredCard(service.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                        onClick={() => setActiveCardIndex(index)}
                        whileHover={{ 
                          transition: { duration: 0.3 }
                        }}
                      >
                        <div className="relative w-full h-full">
                          {/* Image Background */}
                          <div 
                            className="absolute inset-0 w-full h-full bg-cover bg-center rounded-lg"
                            style={{
                              backgroundImage: `url(${service.image})`,
                            }}
                          ></div>
                          
                          {/* Video Fallback */}
                          <video
                            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"
                            autoPlay
                            loop
                            muted
                            playsInline
                          >
                            <source src={service.video} type="video/mp4" />
                          </video>
                          
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300 rounded-lg"></div>
                          
                          {/* Content */}
                          <div className="absolute inset-0 flex flex-col justify-end p-8 text-white rounded-lg">
                            <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-medium">{service.price}</span>
                              <Button asChild variant="ghost" className="text-white hover:text-gray-200">
                                <Link href={`/cart?service=${service.id}`}>Book Now</Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Card Indicators */}
                <div className="flex justify-center mt-8 space-x-2">
                  {services.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveCardIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === activeCardIndex ? 'bg-gray-700' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
