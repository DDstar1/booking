"use client";

import { useState, useEffect } from "react";
import { Calendar, Users, Award, ArrowRight, Play } from "lucide-react";
import celebrities from "@/utils/celebrities";
import CelebCard from "@/components/CelebCard";
import CelebrityModal from "@/components/CelebModal";
import { motion, AnimatePresence } from "framer-motion";

export default function CelebrityBookingLanding() {
  const [selectedCeleb, setSelectedCeleb] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const handleClick = (celeb, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setOrigin({
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    });
    setSelectedCeleb(celeb);
  };

  const closeModal = () => {
    setSelectedCeleb(null);
    setOrigin(null);
  };

  // ✅ Disable body scroll when modal is open
  // useEffect(() => {
  //   if (selectedCeleb) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "";
  //   }
  // }, [selectedCeleb]);

  const steps = [
    {
      title: "1. Browse & Select",
      description:
        "Browse our extensive catalog of verified celebrities and select the perfect talent for your event.",
      icon: <Users className="h-8 w-8 text-white" />,
    },
    {
      title: "2. Book & Confirm",
      description:
        "Submit your booking request with event details. We'll handle all negotiations and contracts.",
      icon: <Calendar className="h-8 w-8 text-white" />,
    },
    {
      title: "3. Enjoy Your Event",
      description:
        "Relax and enjoy your unforgettable event while we ensure everything runs smoothly.",
      icon: <Award className="h-8 w-8 text-white" />,
    },
  ];

  const testimonials = [
    {
      name: "Jessica Williams",
      company: "Tech Innovators Corp",
      text: "StarBook made our company retreat unforgettable. The celebrity speaker was perfect for our audience!",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616c056ca42?w=100&h=100&fit=crop&crop=face",
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
      {/* Hero Section */}
      <section
        className="relative pt-20 pb-32 overflow-hidden bg-cover md:bg-center "
        style={{
          backgroundImage: "url('/louis_ck.png')",
          backgroundPosition: "88% center",
        }}
      >
        {/* Gradient Overlay: Transparent to Black at Bottom */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2)_5%,rgba(0,0,0,1)_95%)]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
            Book <span className="text-blue-400">Celebrity</span> <br /> Talent
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Connect with A-list celebrities, speakers, and performers for your
            next unforgettable event
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
              Browse Celebrities <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="border-2 border-gray-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-800/50 transition-all duration-300 flex items-center justify-center">
              <Play className="mr-2 h-5 w-5" /> Watch Demo
            </button>
          </div>
          <div className="flex justify-center space-x-8 text-gray-400">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">1000+</div>
              <div className="text-sm">Celebrities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">50K+</div>
              <div className="text-sm">Events Booked</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">4.9★</div>
              <div className="text-sm">Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Celebrities */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <center>
            <h2 className="text-4xl font-bold text-white text-center mb-16  border-t-4 py-3 w-11/12 border-b-4 border-gray-600">
              Featured <span className="text-blue-400">Celebrities</span>
            </h2>
          </center>
          <div className="grid p-2 w-full gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
            {celebrities.map((celeb, index) => (
              <div
                key={index}
                onClick={(e) => handleClick(celeb, e)}
                className="cursor-pointer"
              >
                <CelebCard celeb={celeb} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            How It <span className="text-blue-400">Works</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-300 text-left">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            What Our <span className="text-blue-400">Clients Say</span>
          </h2>
          <div className="relative h-64">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-all duration-500 ${
                  i === currentTestimonial
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-full"
                }`}
              >
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 text-center border border-gray-700">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-16 h-16 rounded-full mx-auto mb-6 object-cover"
                  />
                  <p className="text-gray-300 text-lg mb-6 italic">
                    "{t.text}"
                  </p>
                  <h4 className="text-white font-bold">{t.name}</h4>
                  <p className="text-blue-400 text-sm">{t.company}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentTestimonial(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === currentTestimonial ? "bg-blue-400" : "bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-800/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Book Your Next{" "}
            <span className="text-blue-400">Celebrity</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of satisfied clients who've made their events
            unforgettable
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105">
              Start Booking Now
            </button>
            <button className="border-2 border-gray-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-800/50 transition-all duration-300">
              Speak to Our Team
            </button>
          </div>
        </div>
      </section>
      {/* AnimatePresence handles mount/unmount transitions */}
      <AnimatePresence>
        {selectedCeleb && origin && (
          <>
            {/* ✅ Blurred dark background overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            />

            {/* ✅ Modal that scales from the clicked card position */}
            <motion.div
              className="fixed z-50"
              initial={{
                top: origin.y,
                left: origin.x,
                width: origin.width,
                height: origin.height,
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                top: "50%",
                left: "50%",
                x: "-50%",
                y: "-50%",
                width: "100vw",
                height: "auto",
                opacity: 1,
                scale: 1,
                transition: { type: "spring", stiffness: 300, damping: 30 },
              }}
              exit={{
                top: origin.y,
                left: origin.x,
                width: origin.width,
                height: origin.height,
                opacity: 0,
                scale: 0.8,
                transition: { duration: 0.3 },
              }}
            >
              <div className="relative">
                <CelebrityModal celeb_data={selectedCeleb} />
                <button
                  onClick={closeModal}
                  className="absolute -top-10 w-7 h-7 right-2 bg-white text-black rounded-full text-sm font-bold z-50"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
