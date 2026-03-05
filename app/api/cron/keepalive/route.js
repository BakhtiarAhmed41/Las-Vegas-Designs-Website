import { NextResponse } from "next/server";
import { query } from "@/lib/db";

/**
 * GET /api/cron/keepalive
 * Run a trivial DB query to keep the database connection warm.
 * Call this every ~10–14 minutes via Vercel Cron or an external cron (e.g. cron-job.org).
 * Requires CRON_SECRET in env to prevent public abuse.
 */
export async function GET(request) {
  const authHeader = request.headers.get("authorization");
  const secret = process.env.CRON_SECRET;
  if (secret && authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await query("SELECT 1");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Keepalive error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
