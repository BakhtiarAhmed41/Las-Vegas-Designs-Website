# Environment setup

Create a file named **`.env.local`** in the **project root** (the folder that contains `package.json`), **not** inside `app/`.

**Important:** Next.js only loads `.env.local` from the project root. If the file is in `app/.env.local`, your credentials will not be loaded and you will see errors like "Cloudinary credentials not configured".

**How to create or fix:**
1. Open your project root folder (e.g. `LasVegasDesignsUSA-main` — same level as `package.json`, `app/`, `docs/`).
2. Create a new file there named `.env.local` (or copy/move it from `app/.env.local` into the root).
3. Paste the content from the "Content for .env.local" section below.
4. Save the file.
5. Restart the dev server (`npm run dev`).

**Security:** Do not commit `.env.local` or share it. It is already in `.gitignore`.

---

## Content for .env.local

Copy everything between the lines (replace if you already have .env.local):

```
# Database
DATABASE_URL=mysql://root:@localhost:3306/lasvegasdesigns

# Upload: Cloudinary
UPLOAD_PROVIDER=cloudinary
CLOUDINARY_CLOUD_NAME=dix5qxlah
CLOUDINARY_API_KEY=447576963832976
CLOUDINARY_API_SECRET=7IUcU7azT0RmF62HeaZwtZrCQUU

# Stripe (add when ready for payments)
# STRIPE_SECRET_KEY=
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
# STRIPE_WEBHOOK_SECRET=

# PayPal (add when ready for payments)
# PAYPAL_CLIENT_ID=
# PAYPAL_CLIENT_SECRET=
# PAYPAL_API_BASE=https://api-m.sandbox.paypal.com
```

---

## If MySQL password is not empty

If your MySQL `root` user has a password, use:

```
DATABASE_URL=mysql://root:YOUR_PASSWORD@localhost:3306/lasvegasdesigns
```

Replace `YOUR_PASSWORD` with your actual password. If the password contains special characters, URL-encode them (e.g. `@` → `%40`, `#` → `%23`).
