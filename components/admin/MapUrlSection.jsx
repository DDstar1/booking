// components/MapUrlSection.js
import CollapsibleSection from "./CollapsibleSection";

export default function MapUrlSection({
  mapUrl,
  setMapUrl,
  uploading,
  setUploading,
  collapsibles,
  toggleSection,
  supabase,
  toast,
}) {
  const handleMapSave = async () => {
    setUploading(true);
    await supabase.from("settings").upsert([{ key: "map_url", value: mapUrl }]);
    toast.success("Map URL saved");
    setUploading(false);
  };

  return (
    <CollapsibleSection
      title="🗺 Google Maps Iframe"
      isOpen={collapsibles.mapUrl}
      onToggle={() => toggleSection("mapUrl")}
      colorScheme="green"
    >
      <div className="space-y-4">
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
    </CollapsibleSection>
  );
}
