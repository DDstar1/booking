"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Optional: style the calendar

export default function BookingForm({ celebName }) {
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Request sent for ${celebName} on ${date.toDateString()}!`);
    // Here you’d post the request to your backend
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 w-full bg-gray-800/30 rounded-xl p-6 text-left space-y-6 shadow-lg"
    >
      <h3 className="text-xl font-bold text-white">
        Book {celebName} for your event
      </h3>
      <p className="text-sm text-gray-300">
        Submit your email and preferred date. Our team will review your request
        and follow up shortly.
      </p>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-300 block mb-1">Your Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-black border border-gray-600 text-white"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300 block mb-1">
            Preferred Date
          </label>
          <div className="bg-black border border-gray-600 p-2 rounded-md">
            <Calendar
              onChange={setDate}
              value={date}
              className="text-black rounded"
              tileClassName="!text-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full text-white font-semibold w-full"
        >
          Submit Request
        </button>
      </div>
    </form>
  );
}
