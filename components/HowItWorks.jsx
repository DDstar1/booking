"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { BackgroundBeams } from "@/components/ui/BackgroundBeam";
import ShinyUnderline from "@/components/ShinyUnderline";

// Replace with your actual icons
import { Star, Calendar, Users } from "lucide-react";

const steps = [
  {
    title: "Browse Talent",
    description: "Explore a curated list of celebrities fit for your event.",
    icon: <Star className="text-white w-8 h-8" />,
  },
  {
    title: "Send Request",
    description: "Fill in your event details and send a booking inquiry.",
    icon: <Calendar className="text-white w-8 h-8" />,
  },
  {
    title: "Confirm & Book",
    description: "Receive confirmation and finalize your booking seamlessly.",
    icon: <Users className="text-white w-8 h-8" />,
  },
];

export default function HowItWorksSection() {
  return (
    <section className="relative md:min-h-screen py-32 bg-black/40 overflow-hidden z-10">
      <BackgroundBeams className="pointer-events-none z-0" />

      <div className="relative max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-8 font-display tracking-tight">
          How It <span className="text-blue-400">Works</span>
        </h2>
        <div className="relative pt-8">
          <ShinyUnderline />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-16">
          {steps.map((step, i) => (
            <div
              key={i}
              className="text-center bg-gray-900/50 rounded-xl p-8 border border-gray-700 transition-transform duration-300 hover:scale-[1.03]"
            >
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4 font-display tracking-tight">
                {step.title}
              </h3>
              <p className="text-gray-300 font-sans leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedStepCard({ step }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      controls.start({ scale: 1, opacity: 1 });
    } else {
      controls.start({ scale: 0.92, opacity: 0.6 });
    }
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial={{ scale: 0.92, opacity: 0.6 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="text-center bg-gray-900/50 rounded-xl p-8 border border-gray-700 shadow-lg transition-transform"
    >
      <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
        {step.icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-4 font-display tracking-tight">
        {step.title}
      </h3>
      <p className="text-gray-300 font-sans leading-relaxed">
        {step.description}
      </p>
    </motion.div>
  );
}
