"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

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
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeModal}
      />

      {/* Modal */}
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
        {/* Modal Content */}
        <div className="relative w-full bg-black/60 rounded-2xl overflow-hidden shadow-xl backdrop-blur-md">
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 w-8 h-8 bg-white text-black rounded-full text-base font-bold z-50"
          >
            ✕
          </button>

          {/* Header Section */}
          <div className="relative">
            <img
              src={celeb_data.image}
              alt={celeb_data.name}
              className="w-full h-48 sm:h-72 object-cover"
            />
            <div className="absolute w-full p-3 flex bg-gradient-to-b from-black/80 to-transparent items-center justify-between top-0 text-white">
              <div className="flex items-center space-x-3">
                <img
                  src={celeb_data.profileImage}
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
          <div className="p-4 text-white space-y-4">
            <div className="bg-gray-800/50 rounded-xl p-3 text-sm text-gray-300">
              <div className="flex justify-between items-center gap-4">
                <div className="flex flex-col gap-3 text-sm text-gray-300">
                  <div className="border-b border-gray-700 pb-2">
                    <span className="font-semibold text-white">Fee Range:</span>{" "}
                    {celeb_data.feeRange}
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
                    {celeb_data.yearsActive}
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
                  {celeb_data.knownFor}
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-300">{celeb_data.bio}</p>

            <div className="flex justify-between gap-4">
              <Link href={`/booking/${celeb_data.id}`} className="flex-1">
                <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-xl font-semibold text-sm">
                  Request Booking ↗
                </button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CelebModalWrapper;
