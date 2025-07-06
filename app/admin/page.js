"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [editingCelebId, setEditingCelebId] = useState(null);
  const [editingCelebData, setEditingCelebData] = useState({
    name: "",
    role: "",
    bio: "",
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

  const saveEditedCelebrity = async () => {
    if (!editingCelebId) return;

    const { error } = await supabase
      .from("celebrities")
      .update(editingCelebData)
      .eq("id", editingCelebId);

    if (error) {
      toast.error("Failed to update celebrity");
    } else {
      toast.success("Celebrity updated");
      setEditingCelebId(null);
      setEditingCelebData({ name: "", role: "", bio: "" });
      fetchData();
    }
  };

  return (
    <div className="bg-gray-100 px-4 py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-8 space-y-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Admin Panel
        </h1>

        {/* Building Images */}
        <section>
          <button
            onClick={() => toggleSection("buildingImages")}
            className="w-full text-left text-lg font-semibold mb-2"
          >
            🏗 Building Images {collapsibles.buildingImages ? "▲" : "▼"}
          </button>
          {collapsibles.buildingImages && (
            <div className="space-y-3">
              <input
                type="file"
                multiple
                onChange={handleImageUpload}
                className="file-input file-input-bordered w-full max-w-sm"
              />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {images.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`Building ${idx}`}
                    className="rounded-xl h-40 w-full object-cover shadow"
                  />
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Google Maps Iframe */}
        <section>
          <button
            onClick={() => toggleSection("mapUrl")}
            className="w-full text-left text-lg font-semibold mb-2"
          >
            🗺 Google Maps Iframe {collapsibles.mapUrl ? "▲" : "▼"}
          </button>
          {collapsibles.mapUrl && (
            <div>
              <textarea
                value={mapUrl}
                onChange={(e) => setMapUrl(e.target.value)}
                className="textarea textarea-bordered w-full"
              />
              <button
                onClick={handleMapSave}
                disabled={uploading}
                className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center disabled:opacity-50"
              >
                {uploading && (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
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
            className="w-full text-left text-lg font-semibold mb-2"
          >
            🌟 Add New Celebrity {collapsibles.addCelebrity ? "▲" : "▼"}
          </button>
          {collapsibles.addCelebrity && (
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                value={newCeleb.name}
                onChange={(e) =>
                  setNewCeleb({ ...newCeleb, name: e.target.value })
                }
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="Role"
                value={newCeleb.role}
                onChange={(e) => {
                  setNewCeleb({ ...newCeleb, role: e.target.value });
                }}
                className="input input-bordered w-full"
              />
              <input
                type="file"
                required
                onChange={(e) => setNewCelebImageFile(e.target.files[0])}
                className="file-input file-input-bordered w-full"
              />
              <textarea
                placeholder="Bio"
                value={newCeleb.bio}
                onChange={(e) =>
                  setNewCeleb({ ...newCeleb, bio: e.target.value })
                }
                className="textarea textarea-bordered w-full"
              />
              <button
                onClick={addCelebrity}
                disabled={uploading}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center disabled:opacity-50"
              >
                {uploading && (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                )}
                {uploading ? "Adding..." : "Add Celebrity"}
              </button>
            </div>
          )}
        </section>

        {/* Manage Celebrities */}
        <section>
          <button
            onClick={() => toggleSection("listCelebrities")}
            className="w-full text-left text-lg font-semibold mb-2"
          >
            👥 Manage Celebrities {collapsibles.listCelebrities ? "▲" : "▼"}
          </button>
          {collapsibles.listCelebrities && (
            <div className="overflow-x-auto whitespace-nowrap py-2">
              {loading ? (
                <p>Loading...</p>
              ) : (
                celebs.map((celeb) => (
                  <div
                    key={celeb.id}
                    className="inline-block w-72 bg-gray-50 rounded-xl p-4 m-2 shadow-md align-top"
                  >
                    <img
                      src={celeb.image || "https://via.placeholder.com/150"}
                      alt={celeb.name}
                      className="rounded-xl h-40 w-full object-cover"
                    />

                    {editingCelebId === celeb.id ? (
                      <>
                        <input
                          type="text"
                          className="input input-sm w-full mt-2"
                          value={editingCelebData.name}
                          onChange={(e) =>
                            setEditingCelebData({
                              ...editingCelebData,
                              name: e.target.value,
                            })
                          }
                        />
                        <input
                          type="text"
                          className="input input-sm w-full mt-1"
                          value={editingCelebData.role}
                          onChange={(e) =>
                            setEditingCelebData({
                              ...editingCelebData,
                              role: e.target.value,
                            })
                          }
                        />
                        <textarea
                          className="textarea textarea-sm w-full mt-1 h-20"
                          value={editingCelebData.bio}
                          onChange={(e) =>
                            setEditingCelebData({
                              ...editingCelebData,
                              bio: e.target.value,
                            })
                          }
                        />
                        <div className="flex justify-between mt-2">
                          <button
                            onClick={saveEditedCelebrity}
                            className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingCelebId(null)}
                            className="px-3 py-1 bg-gray-400 hover:bg-gray-500 text-white rounded-md text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <h3 className="font-bold text-lg mt-2">{celeb.name}</h3>
                        <p className="italic text-sm text-gray-600">
                          {celeb.role}
                        </p>
                        <p className="text-sm text-gray-700 h-24 overflow-hidden text-ellipsis text-wrap">
                          {celeb.bio}
                        </p>
                        <div className="flex justify-between mt-2">
                          <button
                            onClick={() => {
                              setEditingCelebId(celeb.id);
                              setEditingCelebData({
                                name: celeb.name,
                                role: celeb.role,
                                bio: celeb.bio,
                              });
                            }}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => removeCelebrity(celeb.id)}
                            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </section>
      </div>
      <ToastContainer />
    </div>
  );
}
