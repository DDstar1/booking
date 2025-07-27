"use client";

import { LampContainer } from "./ui/Lamp";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";

import CelebCard from "@/components/CelebCard";
import CelebModalWrapper from "@/components/CelebModal";
import ShinyUnderline from "./ShinyUnderline";

export function LampDemo() {
  const [selectedCeleb, setSelectedCeleb] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [featuredCelebs, setFeaturedCelebs] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // Fetch featured celebrities from custom API route
  useEffect(() => {
    const fetchCelebrities = async () => {
      try {
        const res = await fetch("/api/get_celebrities");
        const data = await res.json();

        const featured = data.filter((celeb) => celeb.featured);
        setFeaturedCelebs(featured);
      } catch (err) {
        console.error("Error fetching celebrities:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCelebrities();
  }, []);

  return (
    <>
      <LampContainer>
        <section id="featured_celebrities" className="py-12 relative z-70">
          <div className="max-w-[90vw] mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-5 text-white">
              Featured <span className="text-blue-400">Celebrities</span>
            </h2>

            <div className="relative pt-8">
              <ShinyUnderline />
            </div>

            <div className="w-[85%] max-w-sm mx-auto min-h-[400px] flex items-center justify-center">
              {loading ? (
                <div className="flex flex-col items-center justify-center text-gray-400">
                  <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mb-2"></div>
                </div>
              ) : featuredCelebs.length === 0 ? (
                <p className="text-center text-gray-400">
                  No featured celebrities found.
                </p>
              ) : (
                <Swiper
                  effect="cards"
                  grabCursor={true}
                  modules={[EffectCards]}
                  className="w-full"
                >
                  {featuredCelebs.map((celeb) => (
                    <SwiperSlide
                      key={celeb.id}
                      onClick={(e) => handleClick(celeb, e)}
                    >
                      <div className="relative rounded-2xl overflow-hidden">
                        <CelebCard celeb={celeb} />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
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
