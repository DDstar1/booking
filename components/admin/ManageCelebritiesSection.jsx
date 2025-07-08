// components/ManageCelebritiesSection.js
import CollapsibleSection from "./CollapsibleSection";

export default function ManageCelebritiesSection({
  celebs,
  loading,
  collapsibles,
  toggleSection,
  openEditModal,
  supabase,
  fetchData,
}) {
  const removeCelebrity = async (id) => {
    await supabase.from("celebrities").delete().eq("id", id);
    fetchData();
  };

  return (
    <CollapsibleSection
      title="👥 Manage Celebrities"
      isOpen={collapsibles.listCelebrities}
      onToggle={() => toggleSection("listCelebrities")}
      colorScheme="orange"
    >
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
            <p className="text-gray-600 text-lg">No celebrities added yet</p>
            <p className="text-gray-500 text-sm">
              Add your first celebrity using the form above
            </p>
          </div>
        ) : (
          <div className="flex gap-4 pb-4 overflow-x-auto">
            {celebs.map((celeb) => (
              <div
                key={celeb.id}
                className="flex-shrink-0 w-80 bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200"
              >
                <div className="relative group mb-4">
                  <img
                    src={
                      celeb.profile_image ||
                      "https://via.placeholder.com/300x200"
                    }
                    alt={celeb.name}
                    className="rounded-xl h-48 w-full object-cover"
                  />
                  {celeb.featured && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 text-xs rounded-full shadow">
                      🌟 Featured
                    </div>
                  )}
                </div>

                <h3 className="font-bold text-xl mb-2 text-gray-800">
                  {celeb.name}
                </h3>

                <p className="text-gray-500 text-sm mb-1">
                  <strong>Fee:</strong> {celeb.fee_range || "N/A"}
                </p>
                <p className="text-gray-500 text-sm mb-1">
                  <strong>Years Active:</strong> {celeb.years_active || "N/A"}
                </p>
                <p className="text-gray-500 text-sm mb-1">
                  <strong>Availability:</strong> {celeb.availability || "N/A"}
                </p>
                <p className="text-gray-500 text-sm mb-1">
                  <strong>Known For:</strong> {celeb.known_for || "N/A"}
                </p>
                <p className="text-gray-500 text-sm mb-1">
                  <strong>Audience:</strong> {celeb.audience || "N/A"}
                </p>
                <p className="text-gray-500 text-sm mb-1">
                  <strong>Phone:</strong> {celeb.phone || "N/A"}
                </p>
                <p className="text-gray-500 text-sm mb-1">
                  <strong>Website:</strong>{" "}
                  {celeb.website ? (
                    <a
                      href={celeb.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Visit
                    </a>
                  ) : (
                    "N/A"
                  )}
                </p>

                <p className="text-gray-600 text-sm leading-relaxed mb-4 h-20 overflow-hidden">
                  {celeb.bio}
                </p>

                {/* Tags */}
                {celeb.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 text-xs text-white mb-3">
                    {celeb.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-purple-500 px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

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
    </CollapsibleSection>
  );
}
