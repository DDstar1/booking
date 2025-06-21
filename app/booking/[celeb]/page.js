import { notFound } from "next/navigation";
import { use } from "react";
import celebrities from "@/utils/celebrities";
import BookingForm from "@/components/BookingForm";

export default function CelebPage({ params }) {
  const { celeb } = use(params);
  const celebData = celebrities.find((c) => c.id === celeb);

  if (!celebData) return notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          {/* Image */}
          <div className="flex justify-center md:justify-start">
            <img
              src={celebData.profileImage}
              alt={celebData.name}
              className="w-40 h-40 rounded-full border-4 border-white shadow-md object-cover"
            />
          </div>

          <div className="flex">
            {/* Info & Bio */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold text-indigo-900">
                {celebData.name}
              </h1>
              <p className="text-sm text-gray-500">{celebData.role}</p>

              {/* Rating */}
              <div className="flex justify-center md:justify-start mt-1 text-yellow-500 text-lg">
                ★★★★★
              </div>

              {/* Bio Info */}
              <div className="mt-3 text-sm space-y-1">
                <p>
                  <span className="font-semibold text-gray-600">Born:</span>{" "}
                  <span className="text-indigo-600">
                    {celebData.dob || "N/A"}
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-gray-600">Country:</span>{" "}
                  <span className="text-indigo-600">
                    {celebData.country || "N/A"}
                  </span>
                </p>
              </div>
            </div>
            <div className="mt-4 flex-1 text-sm text-gray-700 leading-relaxed">
              {celebData.bio}
            </div>
          </div>
        </div>

        {/* Fee Range */}
        <div className="mt-6 text-sm text-left bg-yellow-50 p-4 rounded-md border border-yellow-200">
          <p className="font-semibold text-gray-600">
            Speaking/Appearance Fee:
          </p>
          <p className="text-yellow-700 whitespace-pre-line">
            {celebData.feeRange?.replace(/(REGULAR|VIP|VVIP)/g, "\n$1")}
          </p>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start text-xs font-semibold">
          <span className="bg-yellow-400 text-white px-3 py-1 rounded-full">
            {celebData.gender || "N/A"}
          </span>
          <span className="bg-yellow-400 text-white px-3 py-1 rounded-full">
            {celebData.name}
          </span>
          <span className="bg-yellow-400 text-white px-3 py-1 rounded-full">
            Premium Star
          </span>
        </div>
      </div>

      {/* Booking Section */}
      <section className="mt-10 bg-gray-100 p-6 rounded-xl shadow-inner">
        <h3 className="text-xl font-semibold text-indigo-800 mb-3">
          Ready to Book {celebData.name}?
        </h3>
        <p className="text-gray-700 mb-4">
          Our booking team will guide you through the process for a smooth,
          impactful appearance.
        </p>
        <BookingForm celebName={celebData.name} />
      </section>
    </div>
  );
}
