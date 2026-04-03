/**
 * Uploads a file to the public `designs` bucket via a signed URL (browser → Supabase).
 * Avoids Vercel's ~4.5 MB serverless request body limit.
 *
 * Uses fetch() with a raw body instead of supabase-js uploadToSignedUrl(File), which
 * sends multipart/form-data and can append cacheControl as the string "undefined" if
 * options are incomplete.
 */
export async function uploadFileToDesignsBucket(file) {
  const signRes = await fetch("/api/upload/sign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fileName: file.name,
      contentType: file.type || undefined,
    }),
  });
  const payload = await signRes.json().catch(() => ({}));
  if (!signRes.ok) {
    throw new Error(payload.error || "Failed to prepare upload");
  }
  const { path, signedUrl, publicUrl } = payload;
  if (!path || !signedUrl || !publicUrl) {
    throw new Error("Invalid upload sign response");
  }

  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!anon) {
    throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is not set");
  }

  const contentType = file.type || "application/octet-stream";
  const buffer = await file.arrayBuffer();

  const putRes = await fetch(signedUrl, {
    method: "PUT",
    headers: {
      apikey: anon,
      Authorization: `Bearer ${anon}`,
      "Content-Type": contentType,
      "Cache-Control": "max-age=3600",
      "x-upsert": "false",
    },
    body: buffer,
  });

  if (!putRes.ok) {
    const errText = await putRes.text().catch(() => "");
    throw new Error(errText || `Upload failed (${putRes.status})`);
  }

  return { url: publicUrl, key: path };
}
