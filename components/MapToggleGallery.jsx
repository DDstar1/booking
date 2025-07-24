"use client";
import { useState } from "react";
import { Map, Image as ImageIcon } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCube, Pagination } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

const MapToggleGallery = ({ iframeSrc, imageList = [] }) => {
  const [showMap, setShowMap] = useState(true);

  return (
    <section className="py-16">
      <div
        className={`mx-auto px-4 transition-all duration-500 ${
          showMap ? "max-w-full" : "max-w-xl"
        }`}
      >
        <div className="flex justify-between mb-4">
          <h2 className="text-3xl font-semibold text-white">
            Location & <span className="text-blue-400">Gallery</span>
          </h2>
          <button
            onClick={() => setShowMap((prev) => !prev)}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 text-sm hover:bg-gray-100 transition"
          >
            {showMap ? (
              <ImageIcon className="w-4 h-4" />
            ) : (
              <Map className="w-4 h-4" />
            )}
            {showMap ? "View Photos" : "View Map"}
          </button>
        </div>

        <div className="relative h-96 rounded-2xl overflow-hidden border border-gray-700 bg-black">
          {showMap ? (
            <iframe
              src={iframeSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          ) : (
            <Swiper
              effect="cube"
              grabCursor={true}
              cubeEffect={{
                shadow: true,
                slideShadows: true,
                shadowOffset: 20,
                shadowScale: 0.94,
              }}
              pagination={{ clickable: true }}
              modules={[EffectCube, Pagination]}
              className="w-full h-full"
            >
              {imageList.map((src, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    src={src}
                    alt={`Building ${idx + 1}`}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
};

export default MapToggleGallery;
