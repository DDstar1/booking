// pages/api/contact_assets.ts

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://dawexksmkjeubjhgchjt.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhd2V4a3Nta2pldWJqaGdjaGp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NTY5MDEsImV4cCI6MjA2NjMzMjkwMX0.7YGQOcTZPtZwvDAAZK-gDVBzQphIKjrUsD0OxH5iWjo"
);

export async function GET() {
  try {
    const { data: images, error: imgError } = await supabase
      .from("building_images")
      .select("url")
      .order("position", { ascending: true });

    if (imgError) throw imgError;

    const { data: setting, error: settingError } = await supabase
      .from("settings")
      .select("value")
      .eq("key", "map_url")
      .single();

    if (settingError) throw settingError;

    console.log(setting);
    console.log(images);

    return new Response(
      JSON.stringify({
        images: images.map((img) => img.url),
        mapUrl: setting.value,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("API Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to load contact assets" }),
      { status: 500 }
    );
  }
}
