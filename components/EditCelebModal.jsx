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
    role: celeb?.role || "",
    bio: celeb?.bio || "",
  });
  const [newImageFile, setNewImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(celeb?.image || "");

  useEffect(() => {
    // Lock scroll
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    // Unlock scroll when component unmounts
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!editingData.name.trim()) {
      toast.error("Name is required");
      return;
    }

    onSave({
      ...editingData,
      imageFile: newImageFile,
    });
  };

  const handleInputChange = (field, value) => {
    setEditingData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <>
      {/* Overlay */}
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeModal}
      />

      {/* Modal */}
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
        {/* Modal Content */}
        <div className="relative w-full bg-black/60 rounded-2xl md:max-w-[500px] mx-auto overflow-hidden shadow-xl backdrop-blur-md">
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 w-8 h-8 bg-white text-black rounded-full text-base font-bold z-50"
          >
            ✕
          </button>

          {/* Header Section with Image Preview */}
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

          {/* Edit Form */}
          <div className="p-4 text-white space-y-4">
            {/* Image Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white">
                Update Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
            </div>

            {/* Name Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white">
                Name *
              </label>
              <input
                type="text"
                value={editingData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter celebrity name"
              />
            </div>

            {/* Role Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white">
                Role
              </label>
              <input
                type="text"
                value={editingData.role}
                onChange={(e) => handleInputChange("role", e.target.value)}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Actor, Musician, Influencer"
              />
            </div>

            {/* Bio Textarea */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white">
                Biography
              </label>
              <textarea
                value={editingData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                rows={4}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Enter celebrity biography..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between gap-4 pt-4">
              <button
                onClick={closeModal}
                className="flex-1 bg-gray-600 hover:bg-gray-700 py-2 rounded-xl font-semibold text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={uploading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded-xl font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
