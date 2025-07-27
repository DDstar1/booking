"use client";

import { use } from "react";
import celebrities from "@/utils/celebrities";
import BookingForm from "@/components/BookingForm";
import Bio from "@/components/Bio";

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";

export default function CelebPage() {
  const { celeb } = useParams();
  const [celebData, setCelebData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error404, setError404] = useState(false);

  useEffect(() => {
    const fetchCeleb = async () => {
      try {
        const res = await fetch(`/api/get_celebrities`);

        if (!res.ok) throw new Error("Failed to fetch celebrities");

        const allCelebs = await res.json();
        const selectedCeleb = allCelebs.find(
          (c) => c.id === celeb || c.slug === celeb
        );

        if (!selectedCeleb) {
          setError404(true);
          return;
        }

        setCelebData(selectedCeleb);
      } catch (err) {
        console.error("Error loading celeb:", err);
        setError404(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCeleb();
  }, [celeb]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error404 || !celebData) {
    return notFound();
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-4xl mt-14 mx-auto px-4 py-10 bg-black text-white min-h-screen">
        <div className="bg-gray-900/80 rounded-2xl shadow-xl overflow-hidden p-6 border border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Image */}
            <div className="flex justify-center md:justify-start">
              <img
                src={celebData.image}
                alt={celebData.name}
                className="w-40 h-40 rounded-full border-4 border-blue-600 shadow-md object-cover"
              />
            </div>

            <div className="flex justify-evenly items-center w-full">
              {/* Info & Bio */}
              <div className="flex-1 text-center md:text-left space-y-2">
                <div className="flex justify-evenly items-center">
                  <h1 className="text-2xl font-bold text-white">
                    {celebData.name}
                    <div className="flex text-center justify-center text-yellow-400 text-lg">
                      ★★★★★
                    </div>
                  </h1>
                  <div>
                    <div className="mt-2 text-sm space-y-1">
                      <p className="text-sm text-gray-400">{celebData.role}</p>
                      <p>
                        <span className="font-semibold text-gray-400">
                          Age:
                        </span>{" "}
                        <span className="text-gray-300">
                          {celebData.age || "N/A"}
                        </span>
                      </p>
                      <p>
                        <span className="font-semibold text-gray-400">
                          Gender:
                        </span>{" "}
                        <span className="text-gray-300">
                          {celebData.gender || "N/A"}
                        </span>
                      </p>
                      <p>
                        <span className="font-semibold text-gray-400">
                          Country:
                        </span>{" "}
                        <span className="text-gray-300">
                          {celebData.country || "N/A"}
                        </span>
                      </p>
                    </div>
                    {/* Bio Info */}
                  </div>
                </div>
                <div className="flex-1 text-center flex-col items-center text-sm text-gray-300 leading-relaxed md:ml-6">
                  <Bio bio={celebData.bio} />
                </div>
              </div>
            </div>
          </div>

          {/* Fee Range */}
          <div className="mt-6 text-sm bg-gray-800/60 p-4 rounded-md border border-gray-700 text-gray-300">
            <p className="font-semibold text-white">Speaking/Appearance Fee:</p>
            <p className="whitespace-pre-line text-gray-300">
              {celebData.fee_range?.replace(/(REGULAR|VIP|VVIP)/g, "\n$1")}
            </p>
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start text-xs font-semibold">
            <span className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full transition-colors">
              {celebData.name}
            </span>
            <span className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full transition-colors">
              Premium Star
            </span>
          </div>
        </div>

        {/* Booking Section */}
        <section className="mt-10 bg-gray-900/60 p-6 rounded-xl shadow-inner border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-3">
            Ready to Book {celebData.name}?
          </h3>
          <p className="text-gray-300 mb-4">
            Our booking team will guide you through the process for a smooth,
            impactful appearance.
          </p>
          <BookingForm celebName={celebData.name} />
        </section>
      </div>
    </div>
  );
}
