import { Star, Phone, Mail, MapPin } from "lucide-react";

// Footer Component
const Footer = () => {
  return (
    <footer
      id="contact"
      className="bg-black/80 backdrop-blur-sm py-12 border-t border-gray-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Star className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold text-white">StarBook</span>
            </div>
            <p className="text-gray-400">
              The premier platform for booking celebrity talent for your events.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Celebrity Booking</li>
              <li>Event Planning</li>
              <li>Talent Management</li>
              <li>Contract Negotiation</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Musicians</li>
              <li>Comedians</li>
              <li>Speakers</li>
              <li>Actors</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>hello@starbook.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Los Angeles, CA</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 StarBook. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
