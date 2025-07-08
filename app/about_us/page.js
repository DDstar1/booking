import Link from "next/link";
export default function AboutPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <div
        className="relative bg-cover  flex flex-col items-center justify-center min-h-[400px]"
        style={{
          backgroundImage: "url('/band.jpg')",
          backgroundPosition: "center 30%",
        }}
      >
        {/* Optional Gradient Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.1)_10%,rgba(0,0,0,1)_90%)] pointer-events-none"></div>

        <div className="absolute flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl font-bold text-white">About Us</h1>
            <p className="text-4xl text-blue-600 font-signature mt-2">
              Celebrity Booking Experts
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-12">
        {/* Intro */}
        <section>
          <center>
            <h2 className="text-2xl text-center font-semibold w-fit text-white border-b-2 border-dashed border-b-gray-500 pb-2 mb-6">
              Who We Are
            </h2>
          </center>
          <h3 className="text-xl font-semibold text-gray-300 mb-6">
            Providing You With A Seamless Booking Experience
          </h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            We are a celebrity booking agency like no other. Established in 2001
            with a team of celebrity experts, we're one of the most respected
            celebrity booking agencies in the business.
          </p>
          <p className="text-gray-300 leading-relaxed mb-6">
            For over 20 years, we have been helping clients build their brands
            and increase profits through the use of celebrities and influencers
            — matching talent with PR marketing, advertising campaigns, and
            special events for both corporate and non-profit clients.
          </p>
          <Link href="/list">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 ease-in-out hover:shadow-lg hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black">
              Book Now!!!
            </button>
          </Link>
        </section>

        {/* How We Operate */}
        <section>
          <center>
            <h2 className="text-2xl text-center font-semibold w-fit text-white border-b-2 border-dashed border-b-gray-500 pb-2 mb-6">
              Our Approach
            </h2>
          </center>
          <p className="text-gray-300 leading-relaxed mb-4">
            We leverage our strong insider relationships and direct access to
            thousands of celebrities from film, television, music, sports,
            fashion, social media, and beyond — in addition to experts and
            influencers across many industries.
          </p>
          <p className="text-gray-300 leading-relaxed">
            We do not represent the talent — we represent YOU, our client, and
            protect your best interests. We are celebrity specialists, and our
            total focus is to make booking a celebrity easy – and we work
            tirelessly to handle all talent procurement, negotiations, and
            logistics on your behalf.
          </p>
        </section>

        {/* Additional Features Section */}
        <section>
          <center>
            {" "}
            <h2 className="text-2xl text-center font-semibold w-fit text-white border-b-2 border-dashed border-b-gray-500 pb-2 mb-6">
              What Sets Us Apart
            </h2>
          </center>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Expert Team
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Over 20 years of experience in celebrity booking and event
                management.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Direct Access
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Strong relationships with thousands of celebrities across all
                industries.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Client-Focused
              </h3>
              <p className="text-gray-300 leading-relaxed">
                We represent your interests and work to get you the best deals.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Full Service
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Complete handling of negotiations, logistics, and event
                coordination.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
