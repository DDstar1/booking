"use client";
import { useState } from "react";
import { Map, Image as ImageIcon } from "lucide-react";

const MapToggleGallery = ({ iframeSrc, imageList = [] }) => {
  const [showMap, setShowMap] = useState(true);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-end mb-4">
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
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-4 overflow-y-auto h-full">
              {imageList.map((src, idx) => (
                <div
                  key={idx}
                  className="aspect-square w-full rounded-xl overflow-hidden border border-gray-600"
                >
                  <img
                    src={src}
                    alt={`Building ${idx + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MapToggleGallery;
