"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

const supabase = createClient(
  "https://dawexksmkjeubjhgchjt.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhd2V4a3Nta2pldWJqaGdjaGp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NTY5MDEsImV4cCI6MjA2NjMzMjkwMX0.7YGQOcTZPtZwvDAAZK-gDVBzQphIKjrUsD0OxH5iWjo"
);

const Spinner = () => (
  <div className="flex justify-center items-center">
    <span className="loading loading-spinner loading-lg text-primary" />
  </div>
);

export default function AdminPage() {
  const [mapUrl, setMapUrl] = useState("");
  const [images, setImages] = useState([]);
  const [celebs, setCelebs] = useState([]);
  const [newCeleb, setNewCeleb] = useState({
    name: "",
    role: "",
    image: "",
    bio: "",
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const { data: setting } = await supabase
      .from("settings")
      .select("value")
      .eq("key", "map_url")
      .single();
    setMapUrl(setting?.value || "");

    const { data: c } = await supabase.from("celebrities").select("*");
    setCelebs(c || []);
    setLoading(false);
  }

  async function handleMapSave() {
    await supabase.from("settings").upsert([{ key: "map_url", value: mapUrl }]);
    alert("Map URL saved!");
  }

  async function handleImageUpload(e) {
    const files = e.target.files;
    if (files.length + images.length > 4) return alert("Max 4 images");
    setUploading(true);

    const uploaded = [];
    for (let file of files) {
      const fileName = uuidv4();
      const { error } = await supabase.storage
        .from("buildings")
        .upload(fileName, file);
      if (error) {
        console.error(error);
        continue;
      }
      const { data: urlData } = supabase.storage
        .from("buildings")
        .getPublicUrl(fileName);
      uploaded.push(urlData.publicUrl);
    }

    setImages((prev) => [...prev, ...uploaded]);
    setUploading(false);
  }

  async function addCelebrity() {
    if (!newCeleb.name) return alert("Name is required");
    const { error } = await supabase.from("celebrities").insert([newCeleb]);
    if (!error) {
      fetchData();
      setNewCeleb({ name: "", role: "", image: "", bio: "" });
    }
  }

  async function removeCelebrity(id) {
    await supabase.from("celebrities").delete().eq("id", id);
    fetchData();
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-10 min-h-[80vh]">
      <h1 className="text-4xl font-bold text-center mb-4">Admin Panel</h1>

      {/* Building Images */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Building Images (max 4)</h2>
        <input
          type="file"
          multiple
          onChange={handleImageUpload}
          className="file-input file-input-bordered w-full max-w-xs"
        />
        {uploading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {images.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`Building ${idx}`}
                className="rounded-lg shadow"
              />
            ))}
          </div>
        )}
      </section>

      {/* Google Map Link */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Google Maps Iframe Link</h2>
        <textarea
          value={mapUrl}
          onChange={(e) => setMapUrl(e.target.value)}
          className="textarea textarea-bordered w-full"
        />
        <button
          className="btn btn-primary mt-2 transition hover:scale-105"
          onClick={handleMapSave}
        >
          Save Map URL
        </button>
      </section>

      {/* Celebrity List */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Manage Celebrities</h2>

        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-wrap gap-6">
            {celebs.map((celeb) => (
              <div
                key={celeb.id}
                className="card w-full md:w-1/2 lg:w-1/3 bg-base-100 shadow-md hover:shadow-lg transition"
              >
                <figure className="px-4 pt-4">
                  <img
                    src={celeb.image || "https://via.placeholder.com/150"}
                    alt={celeb.name}
                    className="rounded-xl h-40 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title">{celeb.name}</h3>
                  <p className="text-sm text-gray-600 italic">{celeb.role}</p>
                  <p className="text-sm mt-1">{celeb.bio}</p>
                  <div className="card-actions justify-end mt-2">
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => removeCelebrity(celeb.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add New Celebrity */}
        <div className="mt-8 space-y-3">
          <h3 className="font-bold text-lg">Add New Celebrity</h3>
          <input
            type="text"
            placeholder="Name"
            value={newCeleb.name}
            onChange={(e) => setNewCeleb({ ...newCeleb, name: e.target.value })}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Role"
            value={newCeleb.role}
            onChange={(e) => setNewCeleb({ ...newCeleb, role: e.target.value })}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newCeleb.image}
            onChange={(e) =>
              setNewCeleb({ ...newCeleb, image: e.target.value })
            }
            className="input input-bordered w-full"
          />
          <textarea
            placeholder="Bio"
            value={newCeleb.bio}
            onChange={(e) => setNewCeleb({ ...newCeleb, bio: e.target.value })}
            className="textarea textarea-bordered w-full"
          />
          <button
            className="btn btn-success mt-2 transition hover:scale-105"
            onClick={addCelebrity}
          >
            Add Celebrity
          </button>
        </div>
      </section>
    </div>
  );
}
