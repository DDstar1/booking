import { LampContainer } from "./ui/Lamp";
import { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";

import celebrities from "@/utils/celebrities";
import CelebCard from "@/components/CelebCard";
import CelebModalWrapper from "@/components/CelebModal";
import ShinyUnderline from "./ShinyUnderline";

export function LampDemo() {
  const [selectedCeleb, setSelectedCeleb] = useState(null);
  const [origin, setOrigin] = useState(null);

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

  return (
    // Inside your component:
    <>
      {" "}
      <LampContainer>
        <section id="featured_celebrities" className="py-12 relative z-10">
          <div className="max-w-[90vw]  mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-5 text-white">
              Featured <span className="text-blue-400">Celebrities</span>
            </h2>

            {/* Static Gradient Underline */}
            <div className="relative pt-8">
              <ShinyUnderline />
            </div>

            <Swiper
              effect="cards"
              grabCursor={true}
              modules={[EffectCards]}
              className="w-[85%] max-w-sm mx-auto"
            >
              {celebrities.map((celeb, index) => (
                <SwiperSlide key={index} onClick={(e) => handleClick(celeb, e)}>
                  <div className="relative rounded-2xl overflow-hidden">
                    {/* Optional: Add subtle glow on each card if desired */}
                    <CelebCard celeb={celeb} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      </LampContainer>
      <AnimatePresence>
        {selectedCeleb && origin && (
          <CelebModalWrapper
            celeb_data={selectedCeleb}
            origin={origin}
            closeModal={closeModal}
          />
        )}
      </AnimatePresence>
    </>
  );
}
