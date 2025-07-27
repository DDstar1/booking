// src/components/BookingForm.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Send } from "lucide-react";

const initialFormData = {
  startDate: "",
  endDate: "",
  budget: "",
  eventType: "",
  location: "",
  description: "",
  fullName: "",
  jobTitle: "",
  organization: "",
  phone: "",
  email: "",
  address: "",
  airport: "",
};

export default function BookingForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showError = (msg) => {
    setError(msg);
    setTimeout(() => setError(""), 5000);
  };

  const handleNext = () => {
    const { startDate, endDate, budget, eventType, location, description } =
      formData;
    if (
      !startDate ||
      !endDate ||
      !budget ||
      !eventType ||
      !location ||
      !description
    ) {
      showError("Please fill in all the required fields before continuing.");
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, jobTitle, organization, phone, email, address, airport } =
      formData;
    if (
      !fullName ||
      !jobTitle ||
      !organization ||
      !phone ||
      !email ||
      !address ||
      !airport
    ) {
      showError("Please fill in all the required fields before submitting.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/book_celeb_form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsSubmitted(true);
      } else {
        showError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      showError("Submission failed. Try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const requiredStep2Fields = [
    "fullName",
    "jobTitle",
    "organization",
    "phone",
    "email",
    "address",
    "airport",
  ];
  const isSubmitDisabled = requiredStep2Fields.some(
    (field) => !formData[field]?.trim()
  );

  return (
    <div className=" p-6">
      <div className="max-w-4xl mx-auto">
        {/* Floating label styles */}
        <style>{`
          .floating-label {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            background: #111827;
            padding: 0 10px;
            color: #9ca3af;
            pointer-events: none;
            transition: all 0.2s ease-in-out;
            font-size: 14px;
            border-radius: 60px;
          }
          .floating-input:focus + .floating-label,
          .floating-input:not(:placeholder-shown) + .floating-label {
            top: 0;
            transform: translateY(-50%) scale(0.9);
            color: #3b82f6;
            font-size: 12px;
          }
          .floating-textarea + .floating-label {
            top: 24px;
          }
          .floating-textarea:focus + .floating-label,
          .floating-textarea:not(:placeholder-shown) + .floating-label {
            top: 0;
            transform: translateY(-50%) scale(0.9);
            font-size: 12px;
            color: #3b82f6;
          }
        `}</style>

        {isSubmitted ? (
          <div className="text-center py-12">
            <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">
              Booking Request Sent!
            </h3>
            <p className="text-gray-300">
              We'll get back to you within 24 hours
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["startDate", "endDate"].map((field) => (
                  <div key={field} className="relative">
                    <input
                      type="date"
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      placeholder=" "
                      className="floating-input w-full rounded-xl border border-gray-700 bg-gray-900 text-white px-4 py-3 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <label className="floating-label">
                      {field === "startDate" ? "Start Date" : "End Date"}
                    </label>
                  </div>
                ))}

                {["budget", "eventType", "location"].map((field) => (
                  <div key={field} className="relative">
                    {field === "budget" ? (
                      <>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="floating-input w-full rounded-xl border pl-6 border-gray-700 bg-gray-900 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="" disabled hidden>
                            Select your budget
                          </option>
                          <option value="5k – 10k">5k – 10k</option>
                          <option value="10k – 50k">10k – 50k</option>
                          <option value="50k – 250k">50k – 250k</option>
                          <option value="250k+">250k+</option>
                        </select>
                        <label className="floating-label">Budget</label>
                      </>
                    ) : (
                      <>
                        <input
                          type="text"
                          name={field}
                          value={formData[field]}
                          onChange={handleChange}
                          placeholder=" "
                          className="floating-input w-full rounded-xl border border-gray-700 bg-gray-900 text-white px-4 py-3 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <label className="floating-label capitalize">
                          {field}
                        </label>
                      </>
                    )}
                  </div>
                ))}

                <div className="md:col-span-2 relative">
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder=" "
                    className="floating-textarea floating-input w-full rounded-xl border border-gray-700 bg-gray-900 text-white px-4 py-3 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={4}
                  />
                  <label className="floating-label">Event Description</label>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {requiredStep2Fields.map((field) => (
                  <div key={field} className="relative">
                    <input
                      type={
                        field === "email"
                          ? "email"
                          : field === "phone"
                            ? "tel"
                            : "text"
                      }
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      placeholder=" "
                      className="floating-input w-full rounded-xl border border-gray-700 bg-gray-900 text-white px-4 py-3 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <label className="floating-label capitalize">
                      {field.replace(/([A-Z])/g, " $1")}
                    </label>
                  </div>
                ))}
              </div>
            )}
            {error && (
              <motion.div
                key={error}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: [0, -5, 5, -5, 5, 0], opacity: 1 }}
                exit={{ x: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-red-500 font-medium text-sm text-center mt-4 p-3 bg-red-900/20 rounded-lg border border-red-500/30"
              >
                {error}
              </motion.div>
            )}
            <div className="flex justify-between gap-2 pt-4">
              {step > 0 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2 text-sm font-medium bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Back
                </button>
              )}

              {step < 1 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="ml-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200"
                >
                  Next
                </button>
              )}

              {step === 1 && (
                <button
                  type="submit"
                  disabled={isSubmitDisabled || isSubmitting}
                  className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ease-in-out ml-auto flex items-center ${
                    isSubmitDisabled || isSubmitting
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 text-white hover:shadow-lg hover:shadow-green-500/25 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black"
                  }`}
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
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                        />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
