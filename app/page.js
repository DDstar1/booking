"use client";

import { useState, useEffect } from "react";
import { Calendar, Users, Award, ArrowRight, Play } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/BackgroundBeam";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import HowItWorks from "@/components/HowItWorks";

import { LampDemo } from "@/components/Featured_celebs";
import { HoverBorderGradient } from "@/components/ui/HoverBorderGradient";
import { SparklesCore } from "@/components/ui/SparklesCore";
import ShinyUnderline from "@/components/ShinyUnderline";

export default function CelebrityBookingLanding() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const steps = [
    {
      title: "1. Browse & Select",
      description:
        "Explore our exclusive catalog of verified stars—speakers, musicians, icons—just a click away.",
      icon: <Users className="h-8 w-8 text-white" />,
    },
    {
      title: "2. Book & Confirm",
      description:
        "Send your request. We'll handle contracts, logistics, and all the behind-the-scenes magic.",
      icon: <Calendar className="h-8 w-8 text-white" />,
    },
    {
      title: "3. Enjoy Your Event",
      description:
        "Sit back and enjoy the spotlight—we ensure every detail shines on your big day.",
      icon: <Award className="h-8 w-8 text-white" />,
    },
  ];

  const testimonials = [
    {
      name: "Jessica Williams",
      company: "Tech Innovators Corp",
      text: "StarBook made our company retreat unforgettable. The celebrity speaker was perfect for our audience!",

      image:
        "https://i.pinimg.com/1200x/54/e3/ce/54e3ce9dbbac4504a9985b8deafa18fa.jpg",
    },
    {
      name: "Robert Chen",
      company: "Global Events LLC",
      text: "Professional service from start to finish. Our clients were thrilled with the entertainment!",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Maria Garcia",
      company: "Luxury Weddings",
      text: "They helped us book the perfect artist for a high-profile wedding. Exceeded all expectations!",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen w-screen overflow-hidden bg-black">
      {/* HERO */}
      <section
        className="relative pt-24 h-screen pb-32 overflow-hidden bg-cover md:bg-center"
        style={{
          backgroundImage: "url('/louis_ck.png')",
          backgroundPosition: "88% center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight tracking-tight font-display"
          >
            Book <span className="text-blue-400 font-extrabold">Celebrity</span>{" "}
            Talent
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto font-sans font-light leading-relaxed"
          >
            Secure iconic talent for unforgettable moments—corporate, personal,
            or once-in-a-lifetime events.
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link href="/list">
              <center>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all transform flex items-center justify-center font-sans tracking-wide">
                  Browse Celebrities <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </center>
            </Link>
          </motion.div>
          <motion.div
            className="flex justify-center space-x-8 text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {[
              { label: "Celebrities", value: "1000+" },
              { label: "Events Booked", value: "50K+" },
              { label: "Rating", value: "4.9★" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl font-bold text-white font-display tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm font-sans font-medium tracking-wide uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        <img
          className="w-screen absolute h-auto bottom-full left-0 object-cover"
          src="/bubble-side-divider.svg"
        />
      </section>

      {/* FEATURED CELEBRITIES */}
      <LampDemo />

      {/* HOW IT WORKS */}
      <HowItWorks />

      {/* TESTIMONIALS */}
      <section className="relative py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 font-display tracking-tight">
            What Our <span className="text-blue-400">Clients Say</span>
          </h2>
          <div className="relative pt-8">
            <div className="w-full h-40 absolute top-0">
              {/* Gradients */}
              <ShinyUnderline />

              {/* Core component */}
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={1200}
                className="w-full h-full"
                particleColor="#FFFFFF"
              />

              {/* Radial Gradient to prevent sharp edges */}
              <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
            </div>
          </div>
          <div className="relative h-72 mt-12">
            <AnimatePresence>
              {testimonials.map(
                (t, i) =>
                  i === currentTestimonial && (
                    <motion.div
                      key={i}
                      className="absolute inset-0"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 0.8, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 text-center border border-gray-700">
                        <img
                          src={t.image}
                          alt={t.name}
                          className="w-16 h-16 rounded-full mx-auto mb-6 object-cover"
                        />
                        <p className="text-gray-300 text-lg mb-6 italic font-sans leading-relaxed">
                          "{t.text}"
                        </p>
                        <h4 className="text-white font-bold font-display text-lg">
                          {t.name}
                        </h4>
                        <p className="text-blue-400 text-sm font-sans font-medium tracking-wide">
                          {t.company}
                        </p>
                      </div>
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentTestimonial(i)}
                className={`w-3 h-3 z-20 rounded-full transition-all ${
                  i === currentTestimonial ? "bg-blue-400" : "bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 font-montserrat bg-gray-800/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display tracking-tight">
            Ready to Book Your Next{" "}
            <span className="text-blue-400">Celebrity</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8 font-sans font-light leading-relaxed max-w-2xl mx-auto">
            Join thousands of clients who've made their moments iconic with our
            talent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/list">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-transform transform hover:scale-105 font-sans tracking-wide">
                Start Booking Now
              </button>
            </Link>
            <button className="border-2 border-gray-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-800/50 font-sans tracking-wide">
              Speak to Our Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
