"use client";

import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  CheckCircle,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        eventType: "",
        message: "",
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section
        className="relative pt-20 pb-16 bg-cover bg-center"
        style={{ backgroundImage: "url('/assisant.jpg')" }}
      >
        {/* Optional Gradient Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.4)_10%,rgba(0,0,0,1)_90%)] pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Get In <span className="text-blue-400">Touch</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Ready to book your celebrity talent?
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700">
              <h2 className="text-3xl font-bold mb-6">
                Book Your <span className="text-blue-400">Celebrity</span>
              </h2>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-gray-300">
                    We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-400 focus:outline-none"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-400 focus:outline-none"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-400 focus:outline-none"
                        placeholder="Your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">
                        Event Type
                      </label>
                      <select
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleInputChange}
                        className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-400 focus:outline-none"
                        required
                      >
                        <option value="">Select event type</option>
                        <option value="corporate">Corporate Event</option>
                        <option value="wedding">Wedding</option>
                        <option value="birthday">Birthday Party</option>
                        <option value="conference">Conference</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="5"
                      className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-400 focus:outline-none resize-none"
                      placeholder="Tell us about your event..."
                      required
                    ></textarea>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                  >
                    Send Message <Send className="ml-2 h-5 w-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold">
                Contact <span className="text-blue-400">Information</span>
              </h2>

              <div className="space-y-6">
                <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-600 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1">
                        Address
                      </h3>
                      <p className="text-gray-300">
                        123A Hughes Estate, Monita, Avrk,
                        <br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-600 p-3 rounded-full">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1">
                        Phone
                      </h3>
                      <p className="text-gray-300">+1 (555) 123-STAR</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-600 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1">
                        Email
                      </h3>
                      <p className="text-gray-300">bookings@starbook.com</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-600 p-3 rounded-full">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1">
                        Hours
                      </h3>
                      <div className="text-gray-300 space-y-1">
                        <p>Mon-Fri: 9AM - 7PM</p>
                        <p>Sat: 10AM - 5PM</p>
                        <p>Sun: 12PM - 4PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative h-96 rounded-2xl overflow-hidden border border-gray-700">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11655.503600234755!2d-79.3642093202399!3d43.086104320393694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d34cc67db54b1b%3A0x39c9ba49817d78a0!2sOntario%20Stallions%20for%20the%20Ontario%20Horseman%20Incentive!5e0!3m2!1sen!2sng!4v1750591743146!5m2!1sen!2sng"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Make Your Event{" "}
            <span className="text-blue-400">Legendary</span>?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
              <MessageCircle className="mr-2 h-5 w-5" />
              Start Live Chat
            </button>
            <button className="border-2 border-gray-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-800/50 transition-all duration-300">
              Browse Celebrities
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
