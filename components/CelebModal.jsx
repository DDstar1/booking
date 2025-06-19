import React from "react";

const CelebrityModal = ({
  name,
  role,
  image,
  profileImage,
  feeRange,
  availability,
  yearsActive,
  knownFor,
  scrobbles,
  audience,
  bio,
}) => {
  return (
    <div className="w-screen  bg-black/60 rounded-3xl overflow-hidden shadow-xl backdrop-blur-md">
      <div className="relative">
        <img src={image} alt={name} className="w-full h-80 object-cover" />

        {/* Overlay */}
        <div className="absolute w-full p-1 pb-6 flex bg-gradient-to-b from-black/80 to-transparent items-center justify-between top-0 text-white">
          <div className="flex items-center space-x-2">
            <img
              src={profileImage}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <div>
              <h2 className="font-semibold">{name}</h2>
              <p className="text-sm text-gray-300">{role}</p>
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
                {feeRange}
              </div>
              <div className="border-b border-gray-700 pb-2">
                <span className="font-semibold text-white">Availability:</span>{" "}
                {availability}
              </div>
              <div className="pb-2">
                <span className="font-semibold text-white">Years Active:</span>{" "}
                {yearsActive}
              </div>
            </div>

            <div className="text-right space-y-2 font-semibold">
              <div className="text-white">{audience}</div>
              <div className="text-sm text-gray-400">Audience</div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-2 py-1">
            <span className="font-semibold text-white">Known For:</span>{" "}
            <span className="text-blue-400 hover:underline cursor-pointer">
              {knownFor}
            </span>
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm text-gray-300">{bio}</p>

        {/* Buttons */}
        <div className="flex justify-between gap-4">
          <button className="flex-1 bg-white text-black py-2 rounded-xl font-semibold text-sm">
            Request Booking ↗
          </button>
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded-xl font-semibold text-sm">
            Check Availability ↗
          </button>
        </div>
      </div>
    </div>
  );
};

export default CelebrityModal;
