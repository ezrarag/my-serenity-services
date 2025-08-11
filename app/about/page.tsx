"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Play, Pause, Star, Quote, ArrowRight, Heart, Shield, Users, Award } from "lucide-react"
import Header from "@/components/header"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Regular Client",
    text: "Serenity Services transformed my home and my life. Their attention to detail is incredible, and I finally have time to focus on what matters most.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Business Owner",
    text: "The professional cleaning service exceeded my expectations. My office space has never looked better, and the team is incredibly reliable.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Busy Parent",
    text: "The meal preparation service is a game-changer. Healthy, delicious meals that save me hours in the kitchen every week.",
    rating: 5
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Wellness Enthusiast",
    text: "The massage therapy sessions are pure bliss. Professional, relaxing, and exactly what I need to unwind after a stressful week.",
    rating: 5
  }
]

const features = [
  {
    icon: Heart,
    title: "Personalized Care",
    description: "Every service is tailored to your specific needs and preferences"
  },
  {
    icon: Shield,
    title: "Trusted Professionals",
    description: "All team members are background-checked and fully insured"
  },
  {
    icon: Users,
    title: "Community Focused",
    description: "Supporting local families and building lasting relationships"
  },
  {
    icon: Award,
    title: "Quality Guaranteed",
    description: "We stand behind every service with our satisfaction guarantee"
  }
]

export default function AboutPage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const handleVideoToggle = () => {
    setIsVideoPlaying(!isVideoPlaying)
  }

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://xsdmcedkxpzfmfkkkgnd.supabase.co/storage/v1/object/public/landing//pexels-liliana-drew-9462144%202.jpg)`,
            }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-6">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl font-light mb-8 leading-tight"
            >
              It's Never Just<br />
              Been About<br />
              <span className="font-medium">Cleaning</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl font-light mb-12 max-w-3xl mx-auto"
            >
              A multi-service haven where every detail is crafted to enhance your home and wellness
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild size="lg" className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg">
                <Link href="/services">Explore Services</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg">
                <Link href="/contact">Get In Touch</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-light text-gray-900 mb-8"
              >
                ROOTED IN YOUR TRUST, we FLOURISH
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-lg md:text-xl text-gray-700 leading-relaxed mb-12 max-w-3xl mx-auto"
              >
                What began with simple house cleaning has grown into a comprehensive home care and wellness company, 
                one that's shaped with dedication, powered by innovation, and perfected through meticulous attention to detail.
              </motion.p>

              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto"
              >
                Since opening our doors in Georgia in 2020, we've grown into a service that offers more than just cleaning. 
                Today, we bring together comprehensive home care, wellness services, and a philosophy shaped by personal 
                attention and exceptional quality.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl font-light text-gray-900 mb-4"
                >
                  MEET the BRAIN BEHIND the SERVICE
                </motion.h2>
                
                <motion.p 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-xl text-gray-600 italic"
                >
                  "True quality lives in what's rarely noticed."
                </motion.p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center lg:text-left"
                >
                  <h3 className="text-3xl font-medium text-gray-900 mb-6">MEET OUR CHIEF EXECUTIVE</h3>
                  
                  <h4 className="text-4xl font-light text-gray-800 mb-6">Serenity</h4>
                  
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Serenity, our visionary leader, pioneered the comprehensive home care approach in Georgia and continues 
                    to revolutionize the industry. She believes quality service is deeply personal.
                  </p>
                  
                  <p className="text-lg text-gray-700 leading-relaxed mb-8">
                    Through her vision, Serenity Services was built to honor every home, every detail, and every need with 
                    calm precision and thoughtful attention. Her mission is to empower and elevate the home care industry 
                    to reach new standards of excellence.
                  </p>

                  <Button asChild size="lg" className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-4">
                    <Link href="/team">Meet Our Team</Link>
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-24 h-24 bg-amber-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <Heart className="w-12 h-12 text-amber-600" />
                        </div>
                        <p className="text-amber-700 font-medium">Serenity Services</p>
                        <p className="text-amber-600 text-sm">Leadership Team</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Video Play Button Overlay */}
                  <button
                    onClick={handleVideoToggle}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                  >
                    {isVideoPlaying ? (
                      <Pause className="w-8 h-8 text-gray-800" />
                    ) : (
                      <Play className="w-8 h-8 text-gray-800 ml-1" />
                    )}
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-light mb-8"
              >
                "Quality and Beyond: Curated in Every Detail"
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-xl text-gray-300 leading-relaxed mb-12"
              >
                Complete your home care routine with our carefully curated services and attention to detail.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg">
                  <Link href="/services">Check out our services</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-4xl font-light text-gray-900 text-center mb-16"
              >
                Features
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <feature.icon className="w-8 h-8 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-4xl font-light text-gray-900 text-center mb-16"
              >
                Serenity, Through Their Eyes
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-lg text-gray-600 text-center mb-12"
              >
                Our clients love us! Find out why they trust us
              </motion.p>

              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonial}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                  >
                    <div className="mb-8">
                      <Quote className="w-12 h-12 text-amber-400 mx-auto mb-6" />
                      <p className="text-xl text-gray-700 leading-relaxed mb-6 max-w-3xl mx-auto">
                        "{testimonials[currentTestimonial].text}"
                      </p>
                      <div className="flex justify-center mb-4">
                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                        ))}
                      </div>
                      <h4 className="text-lg font-medium text-gray-900">{testimonials[currentTestimonial].name}</h4>
                      <p className="text-gray-600">{testimonials[currentTestimonial].role}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex justify-center gap-4">
                  <button
                    onClick={prevTestimonial}
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors"
                  >
                    <ArrowRight className="w-5 h-5 text-gray-600 rotate-180" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors"
                  >
                    <ArrowRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Dots */}
                <div className="flex justify-center mt-6 gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentTestimonial ? 'bg-amber-500' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-light mb-8"
              >
                We're Just a Message Away
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-xl text-gray-300 mb-12"
              >
                Ready to experience the Serenity difference? Let's start your journey to a cleaner, more organized home.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg">
                  <Link href="/booking">Schedule an Appointment</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg">
                  <Link href="/contact">Chat with Consultant</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
