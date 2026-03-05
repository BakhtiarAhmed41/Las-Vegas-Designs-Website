import pg from "pg";
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const envContent = readFileSync(join(root, ".env.local"), "utf8");
for (const line of envContent.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eqIdx = trimmed.indexOf("=");
  if (eqIdx === -1) continue;
  const key = trimmed.slice(0, eqIdx).trim();
  const val = trimmed.slice(eqIdx + 1).trim();
  if (!process.env[key]) process.env[key] = val;
}

const DATABASE_URL = process.env.DATABASE_URL;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!DATABASE_URL || !SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing env vars. Make sure .env.local is loaded.");
  process.exit(1);
}

async function runSQL() {
  const pool = new pg.Pool({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  console.log("Running schema.sql ...");
  const schema = readFileSync(join(__dirname, "schema.sql"), "utf8");
  await pool.query(schema);
  console.log("  schema OK");

  console.log("Running seed.sql ...");
  const seed = readFileSync(join(__dirname, "seed.sql"), "utf8");
  await pool.query(seed);
  console.log("  seed OK");

  const { rows } = await pool.query("SELECT COUNT(*) AS n FROM main_categories");
  console.log(`  Verification: ${rows[0].n} main categories in database`);

  await pool.end();
}

async function createBucket() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  console.log("Creating storage bucket 'designs' ...");
  const { data: existing } = await supabase.storage.listBuckets();
  const found = existing?.find((b) => b.name === "designs");
  if (found) {
    console.log("  Bucket 'designs' already exists");
  } else {
    const { error } = await supabase.storage.createBucket("designs", {
      public: true,
      fileSizeLimit: 10 * 1024 * 1024,
    });
    if (error) {
      console.error("  Bucket creation error:", error.message);
    } else {
      console.log("  Bucket 'designs' created (public, 10 MB limit)");
    }
  }
}

try {
  await runSQL();
  await createBucket();
  console.log("\nSetup complete!");
} catch (err) {
  console.error("Setup failed:", err.message);
  process.exit(1);
}
