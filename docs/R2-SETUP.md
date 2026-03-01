# Cloudflare R2 Setup Guide (Design Library)

R2 stores your design preview images (Main preview, Stitchout, Mockup). The app uploads via the API and saves only the URL in MySQL.

---

## Step 1: Create an R2 bucket

1. Log in to **Cloudflare Dashboard**: https://dash.cloudflare.com
2. In the left sidebar, go to **R2 Object Storage** (under "Workers & Pages" or "Storage").
3. Click **Create bucket**.
4. **Bucket name:** e.g. `design-library` (lowercase, no spaces).
5. **Location:** leave as "Automatic" (or pick a region if you prefer).
6. Click **Create bucket**.

---

## Step 2: Get your Account ID

1. In the R2 section, look at the right-hand panel or the **Overview** page.
2. Find **Account ID** (e.g. `a1b2c3d4e5f6...`).
3. Copy it — you’ll use it as `R2_ACCOUNT_ID`.

---

## Step 3: Create R2 API tokens

1. In the left sidebar, click **R2 Object Storage** → **Manage R2 API Tokens** (or go to **Overview** and use "Manage R2 API Tokens").
2. Click **Create API token**.
3. **Token name:** e.g. `LasVegasDesigns-Upload`.
4. **Permissions:** choose **Object Read & Write** (so the app can upload and list).
5. **Specify bucket:** either "Apply to specific buckets only" and select your bucket, or "Apply to all buckets" (simpler).
6. Click **Create API Token**.
7. Copy and save:
   - **Access Key ID** → `R2_ACCESS_KEY_ID`
   - **Secret Access Key** → `R2_SECRET_ACCESS_KEY`  
   (You won’t see the secret again.)

---

## Step 4: Make the bucket publicly readable (for image URLs)

Your app stores image URLs that the browser loads. Those URLs must be public (or use signed URLs; here we use public for simplicity).

**Option A: R2 public bucket (easiest)**

1. Open your bucket → **Settings**.
2. Find **Public access** (or "Allow public access").
3. Enable **Public read** (or "Allow public access to the bucket").
4. Save.
5. Note the **Public bucket URL** (e.g. `https://pub-<ACCOUNT_ID>.r2.dev` or a custom subdomain).  
   This is your **base URL** for object links.

**Option B: Custom domain**

1. In bucket **Settings**, under **Public access**, add a **Custom domain** (e.g. `images.yourdomain.com`).
2. Cloudflare will show a CNAME target; add that CNAME in your DNS.
3. After DNS propagates, your public URL is `https://images.yourdomain.com`.

Your **R2_PUBLIC_URL** is:

- Option A: `https://pub-<ACCOUNT_ID>.r2.dev` (no trailing slash), **or**
- Option B: `https://images.yourdomain.com`

The app builds image URLs as: `R2_PUBLIC_URL + "/" + object_key`  
(e.g. `https://pub-xxx.r2.dev/designs/abc-123.png`).

---

## Step 5: Add env vars to your project

Create or edit `.env.local` in the project root:

```env
# R2 (Cloudflare)
R2_ACCOUNT_ID=your_account_id_from_step_2
R2_ACCESS_KEY_ID=your_access_key_from_step_3
R2_SECRET_ACCESS_KEY=your_secret_key_from_step_3
R2_BUCKET=design-library
R2_PUBLIC_URL=https://pub-your_account_id.r2.dev
```

- **R2_ACCOUNT_ID:** from Step 2.
- **R2_ACCESS_KEY_ID** / **R2_SECRET_ACCESS_KEY:** from Step 3.
- **R2_BUCKET:** exact bucket name from Step 1.
- **R2_PUBLIC_URL:** from Step 4 (no trailing slash).  
  If you use a custom domain, use that (e.g. `https://images.yourdomain.com`).

Restart your Next.js dev server after changing env vars.

---

## Step 6: (Optional) Allow Next.js to load R2 images

If R2 images are on a different host (e.g. `pub-xxx.r2.dev`), add that host in `next.config` so `next/image` doesn’t block them.

In `next.config.mjs` (or `next.config.js`), add under the existing config:

```js
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'pub-*.r2.dev',
      pathname: '/**',
    },
    {
      protocol: 'https',
      hostname: 'images.yourdomain.com',  // if you use custom domain
      pathname: '/**',
    },
  ],
},
```

(If your R2 URL uses a custom domain only, you can list just that hostname.)

---

## Quick checklist

- [ ] Bucket created (e.g. `design-library`).
- [ ] Account ID copied → `R2_ACCOUNT_ID`.
- [ ] API token created with Read & Write → `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`.
- [ ] Public access enabled and public URL noted → `R2_PUBLIC_URL`.
- [ ] `.env.local` updated and dev server restarted.
- [ ] (Optional) `next.config` updated for `next/image` if you use R2 hostname.

---

## Testing

1. Start the app: `npm run dev`.
2. Go to **Design Library** → **Add design** (e.g. `/design-library/add`).
3. Fill required fields and upload an image in **Main preview**.
4. If R2 is set up correctly, the upload succeeds and you see "Uploaded"; after saving, the design appears with that image.

If upload fails, check the browser Network tab and server logs for the error message; usually it’s a wrong credential or `R2_PUBLIC_URL` / bucket name.
