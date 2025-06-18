import React from "react";

function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-sm w-full bg-black/60 rounded-3xl overflow-hidden shadow-xl backdrop-blur-md">
        <div className="relative">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Celebrity"
            className="w-full h-80 object-cover"
          />

          {/* Celebrity Info Overlay */}
          <div className="absolute w-full p-1 pb-6 flex bg-gradient-to-b from-black/80 to-transparent items-center justify-between top-0 text-white">
            <div className="flex items-center space-x-2">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <div>
                <h2 className="font-semibold">Justin Bieber</h2>
                <p className="text-sm text-gray-300">Celebrity | Entertainer</p>
              </div>
            </div>
            <button className="bg-white h-fit text-black px-4 py-2 rounded-full text-sm font-semibold">
              Contact
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 text-white space-y-4">
          {/* Booking Info */}
          <div className="bg-gray-800/50 rounded-xl p-3 text-sm text-gray-300">
            {/* Top Two Columns */}
            <div className="flex justify-between gap-4">
              <div className="flex flex-col gap-3 text-sm text-gray-300">
                <div className="border-b border-gray-700 pb-2">
                  <span className="font-semibold text-white">Fee Range:</span>{" "}
                  Please Contact
                </div>
                <div className="border-b border-gray-700 pb-2">
                  <span className="font-semibold text-white">
                    Availability:
                  </span>{" "}
                  Please Contact
                </div>
                <div className="pb-2">
                  <span className="font-semibold text-white">
                    Years Active:
                  </span>{" "}
                  Early 2000s–Present
                </div>
              </div>

              <div className="text-right space-y-2 font-semibold">
                <div className="text-white">507.0K</div>
                <div className="text-sm text-gray-400">Scrobbles</div>
                <div className="text-white">41.2K</div>
                <div className="text-sm text-gray-400">Audience</div>
              </div>
            </div>

            {/* Known For (below the 2-column layout) */}
            <div className="border-t border-gray-700  mt-2 py-1">
              <span className="font-semibold text-white">Known For:</span>{" "}
              <span className="text-blue-400 hover:underline cursor-pointer">
                Pop Culture, Music, Fashion, Public Appearances
              </span>
            </div>
          </div>

          {/* Bio */}
          <p className="text-sm text-gray-300">
            Justin Bieber is an internationally recognized celebrity known for
            his impact on music, fashion, and pop culture. With a massive
            fanbase and global reach, he is available for select bookings,
            appearances, and brand collaborations.
          </p>

          {/* Booking Buttons */}
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
    </div>
  );
}

export default Page;
