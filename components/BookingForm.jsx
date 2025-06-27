"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "@/app/BookingForm.css"; // Assuming you have a CSS file for styles

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
          ? "bg-success"
          : isCurrent
          ? "bg-warning"
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
              <h2 className="text-xl font-bold text-warning mb-4">
                Talk To Us About Your Event
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  disabled
                  value={celebName}
                  className="input input-bordered input-disabled w-full"
                />
                <input
                  type="date"
                  name="eventDate"
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
                <select
                  name="budget"
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option disabled selected>
                    Select Approximate Talent Budget
                  </option>
                  <option>$5,000 - $10,000</option>
                  <option>$10,000 - $25,000</option>
                  <option>$25,000+</option>
                </select>
                <select
                  name="eventType"
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option disabled selected>
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
                  className="input input-bordered w-full"
                />
                <textarea
                  name="description"
                  placeholder="Additional Event Info / Description"
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full col-span-full"
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
              <h2 className="text-xl font-bold text-warning mb-4">
                Tell us about Yourself or Organization
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="fullName"
                  placeholder="Full Name"
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
                <input
                  name="jobTitle"
                  placeholder="Job Title"
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
                <input
                  name="organization"
                  placeholder="Organization"
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
                <input
                  name="phone"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
                <input
                  name="address"
                  placeholder="Full Address"
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
                <input
                  name="airport"
                  placeholder="Nearest Airport"
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        {step > 0 && (
          <button
            type="button"
            onClick={handleBack}
            className="btn btn-neutral"
          >
            Back
          </button>
        )}
        {step < totalSteps - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className="btn btn-warning ml-auto"
          >
            Next
          </button>
        ) : (
          <button type="submit" className="btn btn-success ml-auto">
            Submit Booking Request
          </button>
        )}
      </div>

      {renderDots()}
    </form>
  );
}
