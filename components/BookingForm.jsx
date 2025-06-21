"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
  const [direction, setDirection] = useState(0); // 1 = next, -1 = back

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted form:", formData);
  };

  const renderDots = () => (
    <div className="flex justify-center mt-6 space-x-2">
      {[...Array(totalSteps)].map((_, index) => {
        const isCompleted = index < step;
        const isCurrent = index === step;
        const bgColor = isCompleted
          ? "bg-green-500"
          : isCurrent
          ? "bg-yellow-400"
          : "bg-gray-600";
        return (
          <div
            key={index}
            className={`w-4 h-4 rounded-full ${bgColor} transition`}
          ></div>
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

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full mt-8 space-y-6 bg-gray-900 p-6 rounded-xl shadow-lg overflow-hidden"
    >
      <div className="relative h-fit transition-all duration-75 min-h-[300px]">
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
              <h2 className="text-xl font-semibold text-yellow-400 mb-4">
                Talk To Us About Your Event
              </h2>
              <div className="space-y-4">
                <input
                  disabled
                  value={celebName}
                  className="w-full p-2 rounded bg-gray-800 text-gray-400"
                />
                <input
                  type="date"
                  name="eventDate"
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-800 text-white"
                />
                <select
                  name="budget"
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-800 text-white"
                >
                  <option value="">Select Approximate Talent Budget</option>
                  <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                  <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                  <option value="$25,000+">$25,000+</option>
                </select>
                <select
                  name="eventType"
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-800 text-white"
                >
                  <option value="">Select Event Type</option>
                  <option value="Corporate Event">Corporate Event</option>
                  <option value="Private Party">Private Party</option>
                  <option value="Product Launch">Product Launch</option>
                </select>
                <input
                  name="location"
                  placeholder="Event Location"
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-800 text-white"
                />
                <textarea
                  name="description"
                  placeholder="Additional Event Info / Description"
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-800 text-white"
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
              <h2 className="text-xl font-semibold text-yellow-400 mb-4">
                Tell us about Yourself Or Organisation
              </h2>
              <div className="space-y-4">
                <input
                  name="fullName"
                  placeholder="Full Name"
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-800 text-white"
                />
                <input
                  name="jobTitle"
                  placeholder="Job Title"
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-800 text-white"
                />
                <input
                  name="organization"
                  placeholder="Organization"
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-800 text-white"
                />
                <input
                  name="phone"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-800 text-white"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-800 text-white"
                />
                <input
                  name="address"
                  placeholder="Full Home Address"
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-800 text-white"
                />
                <input
                  name="airport"
                  placeholder="Nearest Airport"
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-800 text-white"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        {step > 0 && (
          <button
            type="button"
            onClick={handleBack}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            Back
          </button>
        )}
        {step < totalSteps - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className="ml-auto px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="ml-auto px-4 py-2 bg-green-500 hover:bg-green-600 text-black font-semibold rounded"
          >
            Submit Booking Request
          </button>
        )}
      </div>

      {renderDots()}
    </form>
  );
}
