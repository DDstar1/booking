"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "@/app/BookingForm.css";

export default function BookingForm({ celebName }) {
  const [formData, setFormData] = useState({
    eventDate: "",
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
  });

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const totalSteps = 2;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setDirection(1);
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/book_celeb_form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (result.success) {
        alert("Booking request sent successfully!");
      } else {
        alert(`Error: ${result.error || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const renderDots = () => (
    <div className="flex justify-center mt-6 space-x-2">
      {[...Array(totalSteps)].map((_, index) => {
        const isCompleted = index < step;
        const isCurrent = index === step;
        const bgColor = isCompleted
          ? "bg-green-500"
          : isCurrent
            ? "bg-yellow-500"
            : "bg-gray-400";
        return (
          <div key={index} className={`w-3 h-3 rounded-full ${bgColor}`}></div>
        );
      })}
    </div>
  );

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      position: "absolute",
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "relative",
    },
    exit: (dir) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      position: "absolute",
    }),
  };

  const inputClass =
    "w-full rounded-xl border border-gray-700 bg-gray-900 text-white placeholder:text-gray-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

  const selectClass = inputClass;
  const textareaClass = `${inputClass} min-h-[120px]`;

  return (
    <form
      onSubmit={handleSubmit}
      data-theme="light"
      className="w-full max-w-2xl mx-auto bg-base-200 p-6 rounded-xl shadow-md space-y-6 relative"
    >
      <div className="relative min-h-[300px]">
        <AnimatePresence custom={direction} mode="wait">
          {step === 0 && (
            <motion.div
              key="step1"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-xl font-bold text-yellow-500 mb-4">
                Talk To Us About Your Event
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  disabled
                  value={celebName}
                  className="w-full rounded-xl border border-gray-700 bg-gray-800 text-gray-400 px-4 py-2 opacity-80 cursor-not-allowed"
                />
                <input
                  type="date"
                  name="eventDate"
                  onChange={handleChange}
                  className={inputClass}
                />
                <select
                  name="budget"
                  onChange={handleChange}
                  className={selectClass}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Approximate Talent Budget
                  </option>
                  <option>$5,000 - $10,000</option>
                  <option>$10,000 - $25,000</option>
                  <option>$25,000+</option>
                </select>
                <select
                  name="eventType"
                  onChange={handleChange}
                  className={selectClass}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Event Type
                  </option>
                  <option>Corporate Event</option>
                  <option>Private Party</option>
                  <option>Product Launch</option>
                </select>
                <input
                  name="location"
                  placeholder="Event Location"
                  onChange={handleChange}
                  className={inputClass}
                />
                <textarea
                  name="description"
                  placeholder="Additional Event Info / Description"
                  onChange={handleChange}
                  className={`${textareaClass} col-span-full`}
                />
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step2"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-xl font-bold text-yellow-500 mb-4">
                Tell us about Yourself or Organization
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="fullName"
                  placeholder="Full Name"
                  onChange={handleChange}
                  className={inputClass}
                />
                <input
                  name="jobTitle"
                  placeholder="Job Title"
                  onChange={handleChange}
                  className={inputClass}
                />
                <input
                  name="organization"
                  placeholder="Organization"
                  onChange={handleChange}
                  className={inputClass}
                />
                <input
                  name="phone"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  className={inputClass}
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                  className={inputClass}
                />
                <input
                  name="address"
                  placeholder="Full Address"
                  onChange={handleChange}
                  className={inputClass}
                />
                <input
                  name="airport"
                  placeholder="Nearest Airport"
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-3 pt-4">
        {step > 0 && (
          <button
            type="button"
            onClick={handleBack}
            className="px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 rounded-lg font-medium transition-all duration-200 ease-in-out hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-black"
          >
            ← Back
          </button>
        )}
        {step < totalSteps - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 ease-in-out hover:shadow-lg hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black ml-auto"
          >
            Next →
          </button>
        ) : (
          <button
            type="submit"
            className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all duration-200 ease-in-out hover:shadow-lg hover:shadow-green-500/25 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black ml-auto"
          >
            Submit Booking Request
          </button>
        )}
      </div>
      {renderDots()}
    </form>
  );
}
