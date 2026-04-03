import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";
import path from "path";

/** Proxies file bytes through this server (Vercel ~4.5 MB body limit). Prefer POST /api/upload/sign + client upload for larger files. */
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") || formData.get("image");
    if (!file || typeof file === "string") {
      return NextResponse.json(
        { error: "No file provided. Use field name 'file' or 'image'." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const ext = path.extname(file.name) || ".png";
    const key = `designs/${uuidv4()}${ext}`;

    const supabase = getSupabase();
    const { error } = await supabase.storage
      .from("designs")
      .upload(key, buffer, {
        contentType: file.type || "image/png",
        upsert: false,
      });

    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from("designs")
      .getPublicUrl(key);

    return NextResponse.json({ url: urlData.publicUrl, key });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: err.message || "Upload failed" },
      { status: 500 }
    );
  }
}
