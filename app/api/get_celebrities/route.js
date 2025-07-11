// /pages/api/celebrities/[slug].ts
import { createClient } from "@supabase/supabase-js"; // update to your actual path

const supabase = createClient(
  "https://dawexksmkjeubjhgchjt.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhd2V4a3Nta2pldWJqaGdjaGp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NTY5MDEsImV4cCI6MjA2NjMzMjkwMX0.7YGQOcTZPtZwvDAAZK-gDVBzQphIKjrUsD0OxH5iWjo"
);

export async function GET(request) {
  const { data, error } = await supabase.from("celebrities").select("*");

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
