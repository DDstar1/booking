import React from "react";
import Link from "next/link";

const CelebrityModal = ({ celeb_data }) => {
  console.log("Celebrity Data:", celeb_data);
  return (
    <div className="w-screen  bg-black/60 rounded-3xl overflow-hidden shadow-xl backdrop-blur-md">
      <div className="relative">
        <img
          src={celeb_data.image}
          alt={celeb_data.name}
          className="w-full h-80 object-cover"
        />

        {/* Overlay */}
        <div className="absolute w-full p-1 pb-6 flex bg-gradient-to-b from-black/80 to-transparent items-center justify-between top-0 text-white">
          <div className="flex items-center space-x-2">
            <img
              src={celeb_data.profileImage}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <div>
              <h2 className="font-semibold">{celeb_data.name}</h2>
              <p className="text-sm text-gray-300">{celeb_data.role}</p>
            </div>
          </div>
          <button className="bg-white h-fit text-black px-4 py-2 rounded-full text-sm font-semibold">
            Contact
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 text-white space-y-4">
        {/* Info Section */}
        <div className="bg-gray-800/50 rounded-xl p-3 text-sm text-gray-300">
          <div className="flex justify-between items-center gap-4">
            <div className="flex flex-col gap-3 text-sm text-gray-300">
              <div className="border-b border-gray-700 pb-2">
                <span className="font-semibold text-white">Fee Range:</span>{" "}
                {celeb_data.feeRange}
              </div>
              <div className="border-b border-gray-700 pb-2">
                <span className="font-semibold text-white">Availability:</span>{" "}
                {celeb_data.availability}
              </div>
              <div className="pb-2">
                <span className="font-semibold text-white">Years Active:</span>{" "}
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

        {/* Bio */}
        <p className="text-sm text-gray-300">{celeb_data.bio}</p>

        {/* Buttons */}
        <div className="flex justify-between gap-4">
          <Link href={`/booking/${celeb_data.id}`} className="flex-1">
            <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-xl font-semibold text-sm">
              Request Booking ↗
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CelebrityModal;
