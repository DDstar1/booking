// components/AddCelebritySection.js
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import slugify from "slugify";
import CollapsibleSection from "./CollapsibleSection";

export default function AddCelebritySection({
  uploading,
  setUploading,
  collapsibles,
  toggleSection,
  supabase,
  toast,
  fetchData,
}) {
  const [newCeleb, setNewCeleb] = useState({
    name: "",
    tags: [],
    fee_range: "",
    availability: "",
    years_active: "",
    known_for: "",
    audience: "",
    bio: "",
    featured: false,
  });

  const [newCelebImageFile, setNewCelebImageFile] = useState(null);
  const [tagInput, setTagInput] = useState("");
  const [social_links, setSocialLinks] = useState([]);

  const handleSocialLinkChange = (index, field, value) => {
    const updated = [...social_links];
    updated[index][field] = value;
    setSocialLinks(updated);
  };

  const removeSocialLink = (index) => {
    const updated = [...social_links];
    updated.splice(index, 1);
    setSocialLinks(updated);
  };

  const addCelebrity = async () => {
    if (!newCeleb.name || !newCelebImageFile) {
      return toast.error("Name and image are required");
    }

    setUploading(true);
    const fileName = uuidv4();
    const { error: uploadError } = await supabase.storage
      .from("celebrity-images")
      .upload(fileName, newCelebImageFile);

    if (uploadError) {
      toast.error("Image upload failed");
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from("celebrity-images")
      .getPublicUrl(fileName);

    const celebToInsert = {
      id: uuidv4(),
      slug: slugify(newCeleb.name, { lower: true }),
      name: newCeleb.name,
      tags: newCeleb.tags,
      image: data.publicUrl,
      profile_image: data.publicUrl,
      fee_range: newCeleb.fee_range,
      availability: newCeleb.availability,
      years_active: newCeleb.years_active,
      known_for: newCeleb.known_for,
      audience: newCeleb.audience,
      bio: newCeleb.bio,
      featured: newCeleb.featured,
      social_links: social_links,
    };

    const { error: insertError } = await supabase
      .from("celebrities")
      .insert([celebToInsert]);

    console.log("Inserting error:", insertError);

    if (insertError) {
      toast.error("Failed to add celebrity");
    } else {
      toast.success("Celebrity added");
      setNewCeleb({
        name: "",
        tags: [],
        fee_range: "",
        availability: "",
        years_active: "",
        known_for: "",
        audience: "",
        bio: "",
        featured: false,
      });
      setNewCelebImageFile(null);
      setTagInput("");
      setSocialLinks([]);
      fetchData();
    }

    setUploading(false);
  };

  return (
    <CollapsibleSection
      title="🌟 Add New Celebrity"
      isOpen={collapsibles.addCelebrity}
      onToggle={() => toggleSection("addCelebrity")}
      colorScheme="purple"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Celebrity Name *
            </label>
            <input
              type="text"
              value={newCeleb.name}
              onChange={(e) =>
                setNewCeleb({ ...newCeleb, name: e.target.value })
              }
              placeholder="Enter celebrity name"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>

          {/* Featured Checkbox */}
          <div className="col-span-1 md:col-span-2 flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              id="featured"
              checked={newCeleb.featured || false}
              onChange={(e) =>
                setNewCeleb((prev) => ({
                  ...prev,
                  featured: e.target.checked,
                }))
              }
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label
              htmlFor="featured"
              className="text-sm font-medium text-gray-700"
            >
              Mark as Featured
            </label>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Tags
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && tagInput.trim()) {
                    setNewCeleb((prev) => ({
                      ...prev,
                      tags: [...(prev.tags || []), tagInput.trim()],
                    }));
                    setTagInput("");
                  }
                }}
                placeholder="Type and press Enter"
                className="flex-1 px-4 py-2 border rounded-lg"
              />
              <button
                type="button"
                onClick={() => {
                  if (tagInput.trim()) {
                    setNewCeleb((prev) => ({
                      ...prev,
                      tags: [...(prev.tags || []), tagInput.trim()],
                    }));
                    setTagInput("");
                  }
                }}
                className="px-3 py-2 bg-purple-600 text-white rounded-lg"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {(newCeleb.tags || []).map((tag, index) => (
                <span
                  key={index}
                  className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() =>
                      setNewCeleb((prev) => ({
                        ...prev,
                        tags: prev.tags.filter((_, i) => i !== index),
                      }))
                    }
                    className="text-purple-500 hover:text-purple-800"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              label: "Fee Range",
              key: "fee_range",
              placeholder: "$5,000–$10,000",
            },
            {
              label: "Availability",
              key: "availability",
              placeholder: "e.g., Weekdays only",
            },
            {
              label: "Years Active",
              key: "years_active",
              placeholder: "2015–Present",
            },
            {
              label: "Known For",
              key: "known_for",
              placeholder: "e.g., Music, Acting",
            },
            {
              label: "Audience",
              key: "audience",
              placeholder: "e.g., 1.2M",
            },
          ].map(({ label, key, placeholder }) => (
            <div key={key} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {label}
              </label>
              <input
                type="text"
                value={newCeleb[key]}
                onChange={(e) =>
                  setNewCeleb((prev) => ({ ...prev, [key]: e.target.value }))
                }
                placeholder={placeholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              />
            </div>
          ))}
        </div>
        {/* Bio */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            rows={5}
            value={newCeleb.bio}
            onChange={(e) =>
              setNewCeleb((prev) => ({ ...prev, bio: e.target.value }))
            }
            placeholder="Write a short bio about the celebrity..."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none"
          ></textarea>
        </div>

        {/* Image Upload */}
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
              className="flex items-center justify-center w-full h-20 border-2 border-dashed border-purple-300 rounded-xl bg-purple-50 hover:bg-purple-100"
            >
              <div className="text-center">
                <div className="text-2xl mb-1">🖼️</div>
                <p className="text-purple-600 text-sm">
                  {newCelebImageFile
                    ? newCelebImageFile.name
                    : "Choose celebrity image"}
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Social Links
          </label>
          {social_links.map((link, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center"
            >
              <input
                type="text"
                placeholder="Platform (e.g. Instagram)"
                value={link.platform}
                onChange={(e) =>
                  handleSocialLinkChange(index, "platform", e.target.value)
                }
                className="px-4 py-2 border rounded-lg"
              />
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="URL"
                  value={link.url}
                  onChange={(e) =>
                    handleSocialLinkChange(index, "url", e.target.value)
                  }
                  className="flex-1 px-4 py-2 border rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeSocialLink(index)}
                  className="text-red-500 text-lg"
                >
                  &times;
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setSocialLinks([...social_links, { platform: "", url: "" }])
            }
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            + Add Social Link
          </button>
        </div>

        {/* Submit Button */}
        <button
          onClick={addCelebrity}
          disabled={uploading}
          className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium flex items-center justify-center disabled:opacity-50"
        >
          {uploading && (
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
          )}
          {uploading ? "Adding Celebrity..." : "Add Celebrity"}
        </button>
      </div>
    </CollapsibleSection>
  );
}
