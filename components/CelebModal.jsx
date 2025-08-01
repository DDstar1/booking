"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AnimatedLinkButton from "./AnimatedLinkButton";
import Image from "next/image";

const CelebModalWrapper = ({ celeb_data, origin, closeModal }) => {
  const router = useRouter();

  useEffect(() => {
    // Lock scroll
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    // Unlock scroll when component unmounts
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      // Ensure scroll is re-enabled on route change
      document.body.style.overflow = "";
    };

    window.addEventListener("beforeunload", handleRouteChange);
    router.events?.on?.("routeChangeStart", handleRouteChange); // Optional chaining just in case

    return () => {
      window.removeEventListener("beforeunload", handleRouteChange);
      router.events?.off?.("routeChangeStart", handleRouteChange);
    };
  }, [router]);

  return (
    <>
      {/* Overlay */}
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-60 "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeModal}
      />

      {/* Modal */}
      <motion.div
        className="fixed z-70 max-h-[100dvh]"
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
        {/* Modal Content */}
        <div className="relative w-full h-[100dvh] bg-black/60 rounded-2xl md:max-w-[400px] mx-auto overflow-hidden shadow-xl backdrop-blur-md">
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 w-8 h-8 bg-white text-black rounded-full text-base font-bold z-50"
          >
            ✕
          </button>

          {/* Header Section */}
          <div className="relative h-[45%]">
            <Image
              src={celeb_data.image}
              alt={celeb_data.name}
              fill
              className="object-cover object-top"
              sizes="100vw"
            />
            <div className="absolute w-full p-3 flex bg-gradient-to-b from-black/80 to-transparent items-center justify-between top-0 text-white">
              <div className="flex items-center space-x-3">
                <img
                  src={celeb_data.image}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <div>
                  <h2 className="font-semibold text-sm sm:text-base">
                    {celeb_data.name}
                  </h2>
                  <p className="text-xs text-gray-300">{celeb_data.role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ Main Body Content */}
          <div className="p-4 flex flex-col relative h-[55%] text-white space-y-4">
            <div className="flex-1 bg-gray-800/50 rounded-xl p-3 text-sm text-gray-300">
              <div className="flex justify-between items-center gap-4">
                <div className="flex flex-col gap-3 text-sm text-gray-300">
                  <div className="border-b border-gray-700 pb-2">
                    <span className="font-semibold text-white">Fee Range:</span>{" "}
                    {celeb_data.fee_range}
                  </div>
                  <div className="border-b border-gray-700 pb-2">
                    <span className="font-semibold text-white">
                      Availability:
                    </span>{" "}
                    {celeb_data.availability}
                  </div>
                  <div className="pb-2">
                    <span className="font-semibold text-white">
                      Years Active:
                    </span>{" "}
                    {celeb_data.years_active}
                  </div>
                </div>
                <div className="text-right space-y-2 font-semibold">
                  <div className="text-white">{celeb_data.audience}</div>
                  <div className="text-sm text-gray-400">Audience</div>
                </div>
              </div>
              <div className="border-t border-gray-700 mt-2 py-1">
                <span className="font-semibold text-white">Known For:</span>{" "}
                <span className="text-blue-400 hover:underline cursor-pointer">
                  {celeb_data.known_for}
                </span>
              </div>
            </div>

            <p className="text-sm h-3/4 overflow-scroll text-gray-300">
              {celeb_data.bio}
            </p>

            <AnimatedLinkButton
              className="w-full !rounded-4xl"
              href={`/booking/${celeb_data.id}`}
              text={"Request Booking ↗"}
            />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CelebModalWrapper;
