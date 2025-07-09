"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function EditCelebModal({
  celeb,
  origin,
  closeModal,
  onSave,
  uploading = false,
}) {
  const [editingData, setEditingData] = useState({
    name: celeb?.name || "",
    bio: celeb?.bio || "",
    fee_range: celeb?.fee_range || "",
    years_active: celeb?.years_active || "",
    availability: celeb?.availability || "",
    known_for: celeb?.known_for || "",
    audience: celeb?.audience || "",
    tags: celeb?.tags?.join(", ") || "",
    featured: celeb?.featured || false,
  });

  const [newImageFile, setNewImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(celeb?.image || "");

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field, value) => {
    if (field === "featured") {
      console.log(
        "Featured status changed:",
        editingData.featured,
        "to",
        value
      );
    }
    setEditingData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (!editingData.name.trim()) {
      toast.error("Name is required");
      return;
    }

    onSave({
      ...editingData,
      tags: editingData.tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0),
      imageFile: newImageFile,
    });
  };

  return (
    <>
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeModal}
      />

      <motion.div
        className="fixed z-70"
        initial={{
          top: origin.y,
          left: origin.x,
          width: origin.width,
          height: origin.height,
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
          width: "100vw",
          height: "auto",
          opacity: 1,
          scale: 1,
          transition: { type: "spring", stiffness: 300, damping: 30 },
        }}
        exit={{
          top: origin.y,
          left: origin.x,
          width: origin.width,
          height: origin.height,
          opacity: 0,
          scale: 0.8,
          transition: { duration: 0.3 },
        }}
      >
        <div className="relative w-full bg-black/60 rounded-2xl md:max-w-[550px] mx-auto overflow-hidden shadow-xl backdrop-blur-md">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 w-8 h-8 bg-white text-black rounded-full text-base font-bold z-50"
          >
            ✕
          </button>

          <div className="relative">
            <img
              src={imagePreview || "https://via.placeholder.com/400x200"}
              alt={editingData.name || "Celebrity"}
              className="w-full h-48 object-cover"
            />
            <div className="absolute w-full p-3 flex bg-gradient-to-b from-black/80 to-transparent items-center justify-between top-0 text-white">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-600 flex items-center justify-center">
                  <span className="text-xs">📝</span>
                </div>
                <div>
                  <h2 className="font-semibold text-sm sm:text-base">
                    Edit Celebrity
                  </h2>
                  <p className="text-xs text-gray-300">Update information</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-4 text-white space-y-4 max-h-[80vh] overflow-y-auto">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold">
                Update Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
            </div>

            {/* Inputs */}
            {[
              { label: "Name *", key: "name", placeholder: "Celebrity name" },

              {
                label: "Fee Range",
                key: "fee_range",
                placeholder: "$1000 - $5000",
              },
              {
                label: "Years Active",
                key: "years_active",
                placeholder: "e.g. 2010 - present",
              },
              {
                label: "Availability",
                key: "availability",
                placeholder: "Weekdays, Weekends...",
              },
              {
                label: "Known For",
                key: "known_for",
                placeholder: "TV show, song, etc.",
              },
              {
                label: "Audience",
                key: "audience",
                placeholder: "Kids, Teens, General",
              },

              {
                label: "Tags (comma separated)",
                key: "tags",
                placeholder: "funny, singer, athlete",
              },
            ].map(({ label, key, placeholder }) => (
              <div key={key}>
                <label className="block text-sm font-semibold">{label}</label>
                <input
                  type="text"
                  value={editingData[key]}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={placeholder}
                />
              </div>
            ))}

            {/* Bio */}
            <div>
              <label className="block text-sm font-semibold">Biography</label>
              <textarea
                value={editingData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Enter celebrity biography..."
              />
            </div>

            {/* Featured Checkbox */}
            <div className="flex items-center space-x-2">
              <input
                id="featured"
                type="checkbox"
                checked={editingData.featured}
                onChange={(e) =>
                  handleInputChange("featured", e.target.checked)
                }
                className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
              <label htmlFor="featured" className="text-sm font-medium">
                Mark as Featured
              </label>
            </div>

            {/* Buttons */}
            <div className="flex justify-between gap-4 pt-4">
              <button
                onClick={closeModal}
                className="flex-1 bg-gray-600 hover:bg-gray-700 py-2 rounded-xl font-semibold text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={uploading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded-xl font-semibold text-sm flex items-center justify-center disabled:opacity-50"
              >
                {uploading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
