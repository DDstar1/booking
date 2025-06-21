export default function AboutPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <div
        className="relative h-72 bg-cover bg-center"
        style={{ backgroundImage: "url('/band.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl font-bold">About Our</h1>
            <p className="text-4xl text-yellow-400 font-signature mt-2">
              Celebrity Booking
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-10">
        {/* Intro */}
        <section>
          <h2 className="text-2xl font-semibold text-yellow-400 mb-2">
            Book Hollywood Stars
          </h2>
          <h3 className="text-xl font-semibold text-white mb-4">
            Providing You With A Seamless Booking Experience
          </h3>
          <p className="text-gray-300 leading-relaxed">
            A celebrity booking agency like no other. Established in 2001 with a
            team of celebrity experts, it's one of the most respected celebrity
            booking agencies in the business.
          </p>
          <p className="text-gray-300 mt-4">
            We have been helping clients build their brands and increase profits
            through the use of celebrities and influencers for over 20 years —
            matching talent with PR marketing, advertising campaigns, and
            special events for both corporate and non-profit clients.
          </p>
          <p className="text-yellow-400 font-signature text-2xl mt-6">
            Book Now!!!
          </p>
        </section>

        {/* How We Operate */}
        <section>
          <h2 className="text-2xl font-semibold text-yellow-400 mb-2">
            How We Operate
          </h2>
          <p className="text-gray-300 leading-relaxed">
            We leverage our strong insider relationships and direct access to
            thousands of celebrities from film, television, music, sports,
            fashion, social media, and beyond — in addition to experts and
            influencers across many industries.
          </p>
          <p className="text-gray-300 mt-4">
            We do not represent the talent — we represent YOU, our client, and
            protect your best interests. We are celebrity specialists, and our
            total focus is to make booking a celebrity easy – and we work
            tirelessly to handle all talent procurement, negotiations, and
            logistics on your behalf.
          </p>
        </section>
      </div>
    </div>
  );
}
