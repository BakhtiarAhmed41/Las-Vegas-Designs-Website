import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

const UPLOAD_PROVIDER = process.env.UPLOAD_PROVIDER || "cloudinary";
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET = process.env.R2_BUCKET || "design-library";
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL;

function getR2Client() {
  if (!R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
    throw new Error("R2 credentials not configured");
  }
  const endpoint = R2_ACCOUNT_ID
    ? `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`
    : process.env.R2_ENDPOINT;
  return new S3Client({
    region: "auto",
    endpoint,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
    forcePathStyle: true,
  });
}

async function uploadToCloudinary(file, buffer) {
  const mimeType = file.type || "image/png";
  const dataUri = `data:${mimeType};base64,${buffer.toString("base64")}`;
  const result = await cloudinary.uploader.upload(dataUri, {
    folder: "designs",
    resource_type: "image",
    use_filename: true,
    unique_filename: true,
  });
  if (!result?.secure_url) throw new Error("No URL returned from Cloudinary");
  return { url: result.secure_url, key: result.public_id };
}

async function uploadToR2(file, buffer) {
  const ext = path.extname(file.name) || ".png";
  const key = `designs/${uuidv4()}${ext}`;
  const client = getR2Client();
  await client.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: file.type || "image/png",
    })
  );
  let url;
  if (R2_PUBLIC_URL) {
    const base = R2_PUBLIC_URL.replace(/\/$/, "");
    url = `${base}/${key}`;
  } else if (R2_ACCOUNT_ID) {
    url = `https://pub-${R2_ACCOUNT_ID}.r2.dev/${key}`;
  } else {
    url = `${process.env.R2_ENDPOINT || ""}/${R2_BUCKET}/${key}`;
  }
  return { url, key };
}

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

    const provider = (UPLOAD_PROVIDER || "cloudinary").toLowerCase();
    let result;

    if (provider === "cloudinary") {
      if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
        return NextResponse.json(
          { error: "Cloudinary credentials not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET." },
          { status: 500 }
        );
      }
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
      result = await uploadToCloudinary(file, buffer);
    } else {
      result = await uploadToR2(file, buffer);
    }

    return NextResponse.json({ url: result.url, key: result.key });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: err.message || "Upload failed" },
      { status: 500 }
    );
  }
}
