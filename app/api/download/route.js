import { NextResponse } from "next/server";
import { query } from "@/lib/db";

function getFilename(url, title, fallback = "design") {
  try {
    const pathname = new URL(url).pathname;
    const part = pathname.split("/").pop();
    if (part && part.includes(".")) return decodeURIComponent(part);
  } catch {}
  const safe = (title || fallback).replace(/[^a-z0-9]/gi, "-").toLowerCase();
  return `${safe}.zip`;
}

async function streamFile(fileUrl, filename) {
  const response = await fetch(fileUrl, { cache: "no-store" });
  if (!response.ok) {
    return NextResponse.json({ error: "Failed to fetch file" }, { status: 502 });
  }
  const contentType = response.headers.get("content-type") || "application/octet-stream";
  return new NextResponse(response.body, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    const designId = searchParams.get("design_id");

    if (designId && !token) {
      const rows = await query(
        "SELECT id, main_preview_url, technical_attributes, title FROM designs WHERE id = ? AND status = 'published' AND is_free = true",
        [designId]
      );
      const design = rows?.[0];
      if (!design) return NextResponse.json({ error: "Not found" }, { status: 404 });

      let tech = design.technical_attributes;
      if (tech != null && typeof tech === "string") {
        try { tech = JSON.parse(tech); } catch { tech = null; }
      }

      const downloadUrl = (tech && tech.download_url) || design.main_preview_url;
      if (!downloadUrl) {
        return NextResponse.json({ message: "No file URL for this design yet." }, { status: 200 });
      }

      const filename = getFilename(downloadUrl, design.title);
      return streamFile(downloadUrl, filename);
    }

    if (!token) {
      return NextResponse.json({ error: "Token or design_id required" }, { status: 400 });
    }

    const rows = await query(
      `SELECT od.id, od.design_id, od.expires_at, d.main_preview_url, d.technical_attributes, d.title
       FROM order_downloads od
       INNER JOIN orders o ON o.id = od.order_id AND o.status = 'paid'
       LEFT JOIN designs d ON d.id = od.design_id
       WHERE od.token = ? AND od.expires_at > NOW()`,
      [token]
    );
    const row = rows?.[0];
    if (!row) {
      return NextResponse.json({ error: "Invalid or expired download link" }, { status: 404 });
    }

    let tech = row.technical_attributes;
    if (tech != null && typeof tech === "string") {
      try { tech = JSON.parse(tech); } catch { tech = null; }
    }

    const downloadUrl = (tech && tech.download_url) || row.main_preview_url;
    if (!downloadUrl) {
      return NextResponse.json({
        message: "Download link valid. Design file URL not yet configured.",
        design_title: row.title,
      });
    }

    const filename = getFilename(downloadUrl, row.title);
    return streamFile(downloadUrl, filename);
  } catch (err) {
    console.error("GET /api/download error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
