import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// );

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET() {
  const { data, error } = await supabase.from("celebrities").select("tags");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Extract and flatten tags
  const allTags = data
    .flatMap((celeb) => celeb.tags || [])
    .map((tag) => tag.trim());

  // Deduplicate and sort
  const uniqueTags = Array.from(new Set(allTags)).sort();

  return NextResponse.json({ tags: uniqueTags });
}
