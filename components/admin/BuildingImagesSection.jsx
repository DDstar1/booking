// components/BuildingImagesSection.js
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import CollapsibleSection from "./CollapsibleSection";

export default function BuildingImagesSection({
  images,
  setImages,
  uploading,
  setUploading,
  collapsibles,
  toggleSection,
  supabase,
  toast,
}) {
  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase
        .from("building_images")
        .select("url")
        .order("position");

      if (!error) setImages(data.map((img) => img.url));
    };

    fetchImages();
  }, [supabase, setImages]);

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (files.length + images.length > 4) {
      toast.error("Max 4 images allowed");
      return;
    }

    setUploading(true);
    const uploaded = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileName = uuidv4();

      const { error: uploadError } = await supabase.storage
        .from("building-images")
        .upload(fileName, file);

      if (uploadError) {
        toast.error("Upload error");
        continue;
      }

      const { data } = supabase.storage
        .from("building-images")
        .getPublicUrl(fileName);

      const publicUrl = data.publicUrl;

      // Insert image URL into the building_images table
      const { error: insertError } = await supabase
        .from("building_images")
        .insert([
          {
            url: publicUrl,
            alt_text: file.name,
            position: images.length + uploaded.length + 1,
          },
        ]);

      if (insertError) {
        toast.error("Database insert error");
        continue;
      }

      uploaded.push(publicUrl);
    }

    setImages((prev) => [...prev, ...uploaded]);
    setUploading(false);
  };

  const handleDeleteImage = async (url) => {
    const fileName = url.split("/").pop().split("?")[0];

    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from("buildings")
      .remove([fileName]);

    if (storageError) {
      toast.error("Storage delete error");
      return;
    }

    // Delete from DB
    const { error: dbError } = await supabase
      .from("building_images")
      .delete()
      .eq("url", url);

    if (dbError) {
      toast.error("Database delete error");
      return;
    }

    // Update UI
    setImages((prev) => prev.filter((img) => img !== url));
    toast.success("Image deleted");
  };

  return (
    <CollapsibleSection
      title="🏗 Building Images"
      isOpen={collapsibles.buildingImages}
      onToggle={() => toggleSection("buildingImages")}
      colorScheme="blue"
    >
      <div className="space-y-4">
        {/* Upload Area */}
        <div className="relative">
          <input
            type="file"
            multiple
            onChange={handleImageUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            id="building-images"
            disabled={uploading}
          />
          <label
            htmlFor="building-images"
            className="flex items-center justify-center w-full h-32 border-2 border-dashed border-blue-300 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer"
          >
            <div className="text-center">
              <div className="text-4xl mb-2">📸</div>
              <p className="text-blue-600 font-medium">
                {uploading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-blue-600 font-medium">
                      Uploading...
                    </span>
                  </div>
                ) : (
                  "Click to upload images"
                )}
              </p>
              <p className="text-sm text-gray-500">Max 4 images</p>
            </div>
          </label>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((url, idx) => (
            <div key={idx} className="relative group">
              <img
                src={url}
                alt={`Building ${idx + 1}`}
                className="rounded-xl h-40 w-full object-cover shadow-lg transition-transform group-hover:scale-105"
              />
              <button
                onClick={() => handleDeleteImage(url)}
                className="absolute top-2 right-2 bg-white text-red-500 hover:bg-red-100 rounded-full p-1 shadow transition"
                title="Delete image"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </CollapsibleSection>
  );
}
