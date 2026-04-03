import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";
import path from "path";

const BUCKET = "designs";

function safeExtension(fileName) {
  const ext = path.extname(path.basename(fileName || "")).toLowerCase();
  if (!ext || ext.length > 12) return ".bin";
  if (!/^\.[a-z0-9._-]+$/.test(ext)) return ".bin";
  return ext;
}

export async function POST(request) {
  try {
    let body = {};
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "JSON body required" }, { status: 400 });
    }

    const fileName = typeof body.fileName === "string" ? body.fileName : "";
    const ext = safeExtension(fileName);
    const objectPath = `designs/${uuidv4()}${ext}`;

    const supabase = getSupabase();
    const { data, error } = await supabase.storage.from(BUCKET).createSignedUploadUrl(objectPath);

    if (error) throw error;
    if (!data?.path || !data?.token || !data?.signedUrl) {
      throw new Error("Signed upload URL was not returned");
    }

    const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(data.path);

    return NextResponse.json({
      path: data.path,
      token: data.token,
      signedUrl: data.signedUrl,
      publicUrl: urlData.publicUrl,
    });
  } catch (err) {
    console.error("POST /api/upload/sign error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create upload URL" },
      { status: 500 }
    );
  }
}
