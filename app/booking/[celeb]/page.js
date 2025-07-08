import { notFound } from "next/navigation";
import { use } from "react";
import celebrities from "@/utils/celebrities";
import BookingForm from "@/components/BookingForm";

export default function CelebPage({ params }) {
  const { celeb } = use(params);
  const celebData = celebrities.find((c) => c.id === celeb);

  if (!celebData) return notFound();

  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-4xl mt-14 mx-auto px-4 py-10 bg-black text-white min-h-screen">
        <div className="bg-gray-900/80 rounded-2xl shadow-xl overflow-hidden p-6 border border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Image */}
            <div className="flex justify-center md:justify-start">
              <img
                src={celebData.profileImage}
                alt={celebData.name}
                className="w-40 h-40 rounded-full border-4 border-blue-600 shadow-md object-cover"
              />
            </div>

            <div className="flex justify-evenly items-center w-full">
              {/* Info & Bio */}
              <div className="flex-1 text-center md:text-left space-y-2">
                <h1 className="text-2xl font-bold text-white">
                  {celebData.name}
                </h1>
                <p className="text-sm text-gray-400">{celebData.role}</p>

                {/* Rating */}
                <div className="flex justify-center md:justify-start text-yellow-400 text-lg">
                  ★★★★★
                </div>

                {/* Bio Info */}
                <div className="mt-2 text-sm space-y-1">
                  <p>
                    <span className="font-semibold text-gray-400">Born:</span>{" "}
                    <span className="text-gray-300">
                      {celebData.dob || "N/A"}
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
              </div>

              <div className="flex-1 text-sm text-gray-300 leading-relaxed md:ml-6">
                {celebData.bio}
              </div>
            </div>
          </div>

          {/* Fee Range */}
          <div className="mt-6 text-sm bg-gray-800/60 p-4 rounded-md border border-gray-700 text-gray-300">
            <p className="font-semibold text-white">Speaking/Appearance Fee:</p>
            <p className="whitespace-pre-line text-gray-300">
              {celebData.feeRange?.replace(/(REGULAR|VIP|VVIP)/g, "\n$1")}
            </p>
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start text-xs font-semibold">
            <span className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full transition-colors">
              {celebData.gender || "N/A"}
            </span>
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
