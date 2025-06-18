"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CelebCard from "@/components/CelebCard";
import CelebrityModal from "@/components/CelebModal";
import celebrities from "@/utils/celebrities";

export default function Home() {
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

  // ✅ Disable body scroll when modal is open
  useEffect(() => {
    if (selectedCeleb) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedCeleb]);

  return (
    <div className="min-h-screen bg-gray-300 relative overflow-hidden">
      <center>
        <h1 className="text-white text-4xl font-bold text-center border-t-4 py-3 w-11/12 border-b-4 border-white">
          Celebrity Booking
        </h1>
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
                <CelebrityModal {...selectedCeleb} />
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
