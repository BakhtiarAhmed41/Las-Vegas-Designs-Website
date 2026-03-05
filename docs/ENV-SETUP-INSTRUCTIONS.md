# Environment setup

Create a file named **`.env.local`** in the **project root** (the folder that contains `package.json`), **not** inside `app/`.

**Important:** Next.js only loads `.env.local` from the project root. If the file is in `app/.env.local`, your credentials will not be loaded.

**How to create or fix:**
1. Open your project root folder (e.g. `LasVegasDesignsUSA-main` — same level as `package.json`, `app/`, `docs/`).
2. Create a new file there named `.env.local` (or copy/move it from `app/.env.local` into the root).
3. Paste the content from the "Content for .env.local" section below.
4. Save the file.
5. Restart the dev server (`npm run dev`).

**Security:** Do not commit `.env.local` or share it. It is already in `.gitignore`.

---

## Content for .env.local

Copy everything between the lines and fill in your values:

```
# Supabase – Database (PostgreSQL direct connection)
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.bmbmkamzzxxougtnfpwj.supabase.co:5432/postgres

# Supabase – Storage & Client
NEXT_PUBLIC_SUPABASE_URL=https://bmbmkamzzxxougtnfpwj.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Stripe (add when ready for payments)
# STRIPE_SECRET_KEY=
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
# STRIPE_WEBHOOK_SECRET=

# PayPal (add when ready for payments)
# PAYPAL_CLIENT_ID=
# PAYPAL_CLIENT_SECRET=
# PAYPAL_API_BASE=https://api-m.sandbox.paypal.com

# Cron keep-alive secret (optional, for Vercel cron)
# CRON_SECRET=any-random-secret-string
```

---

## Where to find your Supabase credentials

1. **DATABASE_URL** — Supabase Dashboard → Project Settings → Database → Connection string (URI).
   Replace `YOUR_PASSWORD` with the password you set when creating the project.

2. **NEXT_PUBLIC_SUPABASE_URL** — Supabase Dashboard → Project Settings → API → Project URL.

3. **SUPABASE_SERVICE_ROLE_KEY** — Supabase Dashboard → Project Settings → API → `service_role` key (secret).
   This key is needed for server-side operations like file uploads.

---

## Supabase Storage setup

Before uploading images, create a storage bucket:

1. Go to Supabase Dashboard → Storage.
2. Click **New bucket**.
3. Name it `designs`.
4. Check **Public bucket** (so images can be viewed without auth).
5. Click **Create bucket**.

---

## Running the database schema

After setting up `.env.local`, run the schema and seed SQL in the Supabase SQL Editor:

1. Go to Supabase Dashboard → SQL Editor.
2. Paste the contents of `scripts/schema.sql` and run it.
3. Paste the contents of `scripts/seed.sql` and run it.
