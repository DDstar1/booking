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

import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  "https://dawexksmkjeubjhgchjt.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhd2V4a3Nta2pldWJqaGdjaGp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NTY5MDEsImV4cCI6MjA2NjMzMjkwMX0.7YGQOcTZPtZwvDAAZK-gDVBzQphIKjrUsD0OxH5iWjo"
);

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

  // Fetch featured celebrities from Supabase
  useEffect(() => {
    const fetchCelebrities = async () => {
      const { data, error } = await supabase
        .from("celebrities")
        .select("*")
        .eq("featured", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching celebrities:", error);
      } else {
        setFeaturedCelebs(data);
      }

      setLoading(false);
    };

    fetchCelebrities();
  }, []);

  return (
    <LampContainer>
      <section id="featured_celebrities" className="py-12 relative z-20">
        <div className="max-w-[90vw] mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-5 text-white">
            Featured <span className="text-blue-400">Celebrities</span>
          </h2>

          <div className="relative pt-8">
            <ShinyUnderline />
          </div>

          {loading ? (
            <p className="text-center text-gray-400 mt-10">Loading...</p>
          ) : featuredCelebs.length === 0 ? (
            <p className="text-center text-gray-400 mt-10">
              No featured celebrities found.
            </p>
          ) : (
            <Swiper
              effect="cards"
              grabCursor={true}
              modules={[EffectCards]}
              className="w-[85%] max-w-sm mx-auto"
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
      </section>

      <AnimatePresence>
        {selectedCeleb && origin && (
          <CelebModalWrapper
            celeb_data={selectedCeleb}
            origin={origin}
            closeModal={closeModal}
          />
        )}
      </AnimatePresence>
    </LampContainer>
  );
}
