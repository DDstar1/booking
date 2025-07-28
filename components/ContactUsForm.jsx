"use client";

import { useState } from "react";
import { CheckCircle, Send } from "lucide-react";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 👈 Prevent native reload

    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact_us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send");

      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission failed:", error);
      alert("There was an error sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-2">Full Name</label>
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
              <label className="block text-gray-300 mb-2">Event Type</label>
              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleInputChange}
                className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-400 focus:outline-none"
                required
              >
                <option value="">Select event type</option>
                <option value="corporate">Corporate Event</option>
                <option value="wedding">Concert</option>
                <option value="birthday">Screen time</option>
                <option value="conference">Meet and greet</option>
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
              rows={5}
              className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-400 focus:outline-none resize-none"
              placeholder="Tell us about your event..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform flex items-center justify-center ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:scale-105"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                  ></path>
                </svg>
                Sending...
              </>
            ) : (
              <>
                Send Message <Send className="ml-2 h-5 w-5" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
