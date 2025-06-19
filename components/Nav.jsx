import { Star } from "lucide-react";

// Navigation Component
const Navigation = () => {
  return (
    <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Star className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">StarBook</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a
              href="#celebrities"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Browse
            </a>
            <a
              href="#how-it-works"
              className="text-gray-300 hover:text-white transition-colors"
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Reviews
            </a>
            <a
              href="#contact"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
            Book Now
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
