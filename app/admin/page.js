"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence } from "framer-motion";
import EditCelebModal from "@/components/EditCelebModal"; // Import the modal component

const supabase = createClient(
  "https://dawexksmkjeubjhgchjt.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhd2V4a3Nta2pldWJqaGdjaGp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NTY5MDEsImV4cCI6MjA2NjMzMjkwMX0.7YGQOcTZPtZwvDAAZK-gDVBzQphIKjrUsD0OxH5iWjo"
);

export default function AdminPanel() {
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [mapUrl, setMapUrl] = useState("");
  const [images, setImages] = useState([]);
  const [celebs, setCelebs] = useState([]);
  const [newCeleb, setNewCeleb] = useState({
    name: "",
    role: "",
    bio: "",
  });
  const [newCelebImageFile, setNewCelebImageFile] = useState(null);
  const [editingCeleb, setEditingCeleb] = useState(null);
  const [modalOrigin, setModalOrigin] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [collapsibles, setCollapsibles] = useState({
    buildingImages: false,
    mapUrl: false,
    addCelebrity: true,
    listCelebrities: false,
  });

  const toggleSection = (key) => {
    setCollapsibles((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: setting } = await supabase
        .from("settings")
        .select("value")
        .eq("key", "map_url")
        .single();
      setMapUrl(setting?.value || "");

      const { data: c } = await supabase.from("celebrities").select("*");
      setCelebs(c || []);
    } catch (err) {
      toast.error("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (files.length + images.length > 4) {
      toast.error("Max 4 images allowed");
      return;
    }

    setUploading(true);
    const uploaded = [];

    for (let file of files) {
      const fileName = uuidv4();
      const { error } = await supabase.storage
        .from("buildings")
        .upload(fileName, file);
      if (error) {
        toast.error("Upload error");
        continue;
      }
      const { data } = supabase.storage
        .from("buildings")
        .getPublicUrl(fileName);
      uploaded.push(data.publicUrl);
    }

    setImages((prev) => [...prev, ...uploaded]);
    setUploading(false);
  };

  const handleMapSave = async () => {
    setUploading(true);
    await supabase.from("settings").upsert([{ key: "map_url", value: mapUrl }]);
    toast.success("Map URL saved");
    setUploading(false);
  };

  const addCelebrity = async () => {
    if (!newCeleb.name || !newCelebImageFile) {
      return toast.error("Name and image are required");
    }

    setUploading(true);
    const fileName = uuidv4();
    const { error: uploadError } = await supabase.storage
      .from("building-images")
      .upload(fileName, newCelebImageFile);

    if (uploadError) {
      toast.error("Image upload failed");
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from("building-images")
      .getPublicUrl(fileName);

    const celebToInsert = {
      ...newCeleb,
      image: data.publicUrl,
    };

    const { error: insertError } = await supabase
      .from("celebrities")
      .insert([celebToInsert]);

    if (insertError) {
      toast.error("Failed to add celebrity");
    } else {
      toast.success("Celebrity added");
      setNewCeleb({ name: "", role: "", bio: "" });
      setNewCelebImageFile(null);
      fetchData();
    }

    setUploading(false);
  };

  const removeCelebrity = async (id) => {
    await supabase.from("celebrities").delete().eq("id", id);
    fetchData();
  };

  const openEditModal = (celeb, buttonElement) => {
    const rect = buttonElement.getBoundingClientRect();
    setModalOrigin({
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    });
    setEditingCeleb(celeb);
  };

  const closeEditModal = () => {
    setEditingCeleb(null);
  };

  const handleSaveEdit = async (editData) => {
    if (!editingCeleb) return;

    setUploading(true);

    try {
      let updatedData = {
        name: editData.name,
        role: editData.role,
        bio: editData.bio,
      };

      // If there's a new image file, upload it
      if (editData.imageFile) {
        const fileName = uuidv4();
        const { error: uploadError } = await supabase.storage
          .from("building-images")
          .upload(fileName, editData.imageFile);

        if (uploadError) {
          toast.error("Image upload failed");
          setUploading(false);
          return;
        }

        const { data } = supabase.storage
          .from("building-images")
          .getPublicUrl(fileName);

        updatedData.image = data.publicUrl;
      }

      const { error } = await supabase
        .from("celebrities")
        .update(updatedData)
        .eq("id", editingCeleb.id);

      if (error) {
        toast.error("Failed to update celebrity");
      } else {
        toast.success("Celebrity updated");
        closeEditModal();
        fetchData();
      }
    } catch (err) {
      toast.error("An error occurred while updating");
    } finally {
      setUploading(false);
    }
  };
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen px-4 py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8 space-y-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Admin Panel
        </h1>

        {/* Building Images */}
        <section>
          <button
            onClick={() => toggleSection("buildingImages")}
            className="w-full text-left text-xl font-semibold mb-4 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 border border-blue-200"
          >
            🏗 Building Images {collapsibles.buildingImages ? "▲" : "▼"}
          </button>
          {collapsibles.buildingImages && (
            <div className="space-y-4 bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="relative">
                <input
                  type="file"
                  multiple
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  id="building-images"
                />
                <label
                  htmlFor="building-images"
                  className="flex items-center justify-center w-full h-32 border-2 border-dashed border-blue-300 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2">📸</div>
                    <p className="text-blue-600 font-medium">
                      Click to upload images
                    </p>
                    <p className="text-sm text-gray-500">Max 4 images</p>
                  </div>
                </label>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((url, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={url}
                      alt={`Building ${idx}`}
                      className="rounded-xl h-40 w-full object-cover shadow-lg transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-xl"></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Google Maps Iframe */}
        <section>
          <button
            onClick={() => toggleSection("mapUrl")}
            className="w-full text-left text-xl font-semibold mb-4 px-4 py-3 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-all duration-200 border border-green-200"
          >
            🗺 Google Maps Iframe {collapsibles.mapUrl ? "▲" : "▼"}
          </button>
          {collapsibles.mapUrl && (
            <div className="space-y-4 bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Map Embed URL
                </label>
                <textarea
                  value={mapUrl}
                  onChange={(e) => setMapUrl(e.target.value)}
                  placeholder="Paste your Google Maps embed URL here..."
                  className="w-full h-32 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white shadow-sm resize-none"
                />
              </div>
              <button
                onClick={handleMapSave}
                disabled={uploading}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {uploading && (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                )}
                {uploading ? "Saving..." : "Save Map URL"}
              </button>
            </div>
          )}
        </section>

        {/* Add Celebrity */}
        <section>
          <button
            onClick={() => toggleSection("addCelebrity")}
            className="w-full text-left text-xl font-semibold mb-4 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all duration-200 border border-purple-200"
          >
            🌟 Add New Celebrity {collapsibles.addCelebrity ? "▲" : "▼"}
          </button>
          {collapsibles.addCelebrity && (
            <div className="space-y-6 bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Celebrity Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter celebrity name"
                    value={newCeleb.name}
                    onChange={(e) =>
                      setNewCeleb({ ...newCeleb, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Role/Profession
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Actor, Musician, Influencer"
                    value={newCeleb.role}
                    onChange={(e) => {
                      setNewCeleb({ ...newCeleb, role: e.target.value });
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Celebrity Image *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    required
                    onChange={(e) => setNewCelebImageFile(e.target.files[0])}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id="celeb-image"
                  />
                  <label
                    htmlFor="celeb-image"
                    className="flex items-center justify-center w-full h-20 border-2 border-dashed border-purple-300 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors cursor-pointer"
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-1">🖼️</div>
                      <p className="text-purple-600 font-medium text-sm">
                        {newCelebImageFile
                          ? newCelebImageFile.name
                          : "Choose celebrity image"}
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Biography
                </label>
                <textarea
                  placeholder="Enter celebrity biography..."
                  value={newCeleb.bio}
                  onChange={(e) =>
                    setNewCeleb({ ...newCeleb, bio: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white shadow-sm resize-none"
                />
              </div>

              <button
                onClick={addCelebrity}
                disabled={uploading}
                className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {uploading && (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                )}
                {uploading ? "Adding Celebrity..." : "Add Celebrity"}
              </button>
            </div>
          )}
        </section>

        {/* Manage Celebrities */}
        <section>
          <button
            onClick={() => toggleSection("listCelebrities")}
            className="w-full text-left text-xl font-semibold mb-4 px-4 py-3 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 transition-all duration-200 border border-orange-200"
          >
            👥 Manage Celebrities {collapsibles.listCelebrities ? "▲" : "▼"}
          </button>
          {collapsibles.listCelebrities && (
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="overflow-x-auto">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading celebrities...</p>
                    </div>
                  </div>
                ) : celebs.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🎭</div>
                    <p className="text-gray-600 text-lg">
                      No celebrities added yet
                    </p>
                    <p className="text-gray-500 text-sm">
                      Add your first celebrity using the form above
                    </p>
                  </div>
                ) : (
                  <div className="flex gap-4 pb-4">
                    {celebs.map((celeb) => (
                      <div
                        key={celeb.id}
                        className="flex-shrink-0 w-80 bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200"
                      >
                        <div className="relative group mb-4">
                          <img
                            src={
                              celeb.image ||
                              "https://via.placeholder.com/300x200"
                            }
                            alt={celeb.name}
                            className="rounded-xl h-48 w-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded-xl"></div>
                        </div>

                        <h3 className="font-bold text-xl mb-2 text-gray-800">
                          {celeb.name}
                        </h3>
                        <p className="text-purple-600 font-medium mb-3 text-sm uppercase tracking-wide">
                          {celeb.role}
                        </p>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4 h-20 overflow-hidden">
                          {celeb.bio}
                        </p>

                        <div className="flex gap-3">
                          <button
                            onClick={(e) => openEditModal(celeb, e.target)}
                            className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium transition-all duration-200 text-sm shadow-md hover:shadow-lg"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => removeCelebrity(celeb.id)}
                            className="flex-1 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg font-medium transition-all duration-200 text-sm shadow-md hover:shadow-lg"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Edit Celebrity Modal */}
      <AnimatePresence>
        {editingCeleb && (
          <EditCelebModal
            celeb={editingCeleb}
            origin={modalOrigin}
            closeModal={closeEditModal}
            onSave={handleSaveEdit}
            uploading={uploading}
          />
        )}
      </AnimatePresence>

      <ToastContainer />
    </div>
  );
}
