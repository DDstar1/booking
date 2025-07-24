// components/AdminPanel.js
"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid";

import BuildingImagesSection from "@/components/admin/BuildingImagesSection";
import MapUrlSection from "@/components/admin/MapUrlSection";
import AddCelebritySection from "@/components/admin/AddCelebritySection";
import ManageCelebritiesSection from "@/components/admin/ManageCelebritiesSection";
import EditCelebModal from "@/components/admin/EditCelebModal";

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

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen px-4 py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8 space-y-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text ">
          Admin Panel
        </h1>

        <BuildingImagesSection
          images={images}
          setImages={setImages}
          uploading={uploading}
          setUploading={setUploading}
          collapsibles={collapsibles}
          toggleSection={toggleSection}
          supabase={supabase}
          toast={toast}
        />

        <MapUrlSection
          mapUrl={mapUrl}
          setMapUrl={setMapUrl}
          uploading={uploading}
          setUploading={setUploading}
          collapsibles={collapsibles}
          toggleSection={toggleSection}
          supabase={supabase}
          toast={toast}
        />

        <AddCelebritySection
          uploading={uploading}
          setUploading={setUploading}
          collapsibles={collapsibles}
          toggleSection={toggleSection}
          supabase={supabase}
          toast={toast}
          fetchData={fetchData}
        />

        <ManageCelebritiesSection
          celebs={celebs}
          loading={loading}
          collapsibles={collapsibles}
          toggleSection={toggleSection}
          openEditModal={openEditModal}
          supabase={supabase}
          fetchData={fetchData}
        />
      </div>

      {/* Edit Celebrity Modal */}
      <AnimatePresence>
        {editingCeleb && (
          <EditCelebModal
            celeb={editingCeleb}
            origin={modalOrigin}
            closeModal={closeEditModal}
            onSave={(editData) =>
              handleSaveEdit(
                editData,
                editingCeleb,
                supabase,
                toast,
                setUploading,
                closeEditModal,
                fetchData
              )
            }
            uploading={uploading}
          />
        )}
      </AnimatePresence>

      <ToastContainer />
    </div>
  );
}

// Helper function for saving edits

const handleSaveEdit = async (
  editData,
  editingCeleb,
  supabase,
  toast,
  setUploading,
  closeEditModal,
  fetchData
) => {
  if (!editingCeleb) return;

  setUploading(true);

  try {
    const { imageFile, ...updatedData } = editData;

    // If there's a new image file, handle deletion and upload
    if (editData.imageFile) {
      // 1. Delete old image (if it exists and is from this bucket)
      if (editingCeleb.image) {
        try {
          const urlParts = editingCeleb.image.split("/");
          const oldFileName = urlParts[urlParts.length - 1];

          const { error: deleteError } = await supabase.storage
            .from("celebrity-images")
            .remove([oldFileName]);

          if (deleteError) {
            console.warn("Failed to delete old image:", deleteError.message);
          }
        } catch (e) {
          console.warn("Error extracting old filename:", e);
        }
      }

      // 2. Upload new image
      const fileName = uuidv4();
      const { error: uploadError } = await supabase.storage
        .from("celebrity-images")
        .upload(fileName, editData.imageFile);

      if (uploadError) {
        toast.error("Image upload failed");
        setUploading(false);
        return;
      }

      const { data } = supabase.storage
        .from("celebrity-images")
        .getPublicUrl(fileName);

      updatedData.image = data.publicUrl;
    }

    // Update DB record
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
    console.log(err);
  } finally {
    setUploading(false);
  }
};
