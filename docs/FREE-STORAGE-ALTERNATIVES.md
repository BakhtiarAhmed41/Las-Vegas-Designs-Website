# Free Image Storage (No Credit Card) – Alternatives to R2

R2 requires a card. These options are **free**, **no credit card** to sign up, and **scalable** when you need more.

---

## Comparison

| Service        | Free tier        | Card required? | Scalable? | Best for              |
|----------------|------------------|----------------|-----------|------------------------|
| **Cloudinary** | Credits (storage + bandwidth + transforms) | **No** | Yes (paid plans) | Images, CDN, transforms |
| **Uploadthing**| 2 GB storage     | **No**         | Yes ($10/mo for 100GB) | Simple upload API       |
| **Supabase Storage** | 1 GB storage, 2 GB egress/mo | Usually no* | Yes | If you already use Supabase |

*Supabase free tier typically does not require a card; verify at signup.

---

## 1. Cloudinary (recommended)

- **Sign up:** https://cloudinary.com/users/register/free (email, Google, or GitHub – no card).
- **Free plan:** Credit-based (storage, bandwidth, transformations). Enough for thousands of small images if you stay within limits.
- **Scalable:** Paid plans when you grow.
- **CDN:** Global delivery.
- **Setup:** Get `Cloud name`, `API Key`, and `API Secret` from Dashboard. The app uses these in the upload API.

**Env vars (see below):** `UPLOAD_PROVIDER=cloudinary`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.

---

## 2. Uploadthing

- **Sign up:** https://uploadthing.com (no card).
- **Free plan:** 2 GB total storage, unlimited uploads/downloads.
- **Scalable:** Paid plans (e.g. 100 GB for $10/mo).
- **Setup:** Create an app, get token. Can be integrated via their SDK or REST API.

To use Uploadthing instead of Cloudinary, you’d add an upload route that uses their API (or SDK) and point the add-design form to it.

---

## 3. Supabase Storage

- **Sign up:** https://supabase.com (free tier usually no card).
- **Free plan:** 1 GB storage, 2 GB egress/month.
- **Scalable:** Paid when you need more.
- **Setup:** Create project → Storage → create bucket; use Supabase client or REST API to upload.

Best if you already use (or plan to use) Supabase for other features.

---

## This project: Cloudinary support

The app supports **two** upload backends:

1. **R2** (current) – set `UPLOAD_PROVIDER=r2` and R2 env vars.
2. **Cloudinary** – set `UPLOAD_PROVIDER=cloudinary` and Cloudinary env vars.

No code change needed; only env vars. See `.env.local` example in the repo or below.

### Cloudinary env vars

```env
UPLOAD_PROVIDER=cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Get these from: Cloudinary Dashboard → **Settings** (gear) → **Access keys**.

### Quick Cloudinary setup

1. Register at https://cloudinary.com/users/register/free (no card).
2. In the Dashboard, note **Cloud name**, **API Key**, **API Secret**.
3. Add the four env vars above to `.env.local`.
4. Restart the dev server. Uploads from the Design Library add form will go to Cloudinary and return a URL stored in MySQL.
