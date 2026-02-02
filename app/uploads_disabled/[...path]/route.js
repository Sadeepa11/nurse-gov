import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export const dynamic = "force-dynamic";

const BASE_UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

const MIME_TYPE_MAP = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".bmp": "image/bmp",
  ".tiff": "image/tiff",
  ".tif": "image/tiff",
  ".heic": "image/heic",
  ".heif": "image/heif",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".txt": "text/plain",
};

const sanitizeSegments = (segments) => {
  if (!segments) return [];
  const list = Array.isArray(segments) ? segments : [segments];
  return list.filter((segment) => segment && segment !== "." && segment !== "..");
};

export async function GET(_request, { params }) {
  const safeSegments = sanitizeSegments(params?.path);
  if (!safeSegments.length) {
    return NextResponse.json({ message: "File not specified." }, { status: 400 });
  }

  const filePath = path.join(BASE_UPLOAD_DIR, ...safeSegments);

  try {
    const stat = await fs.stat(filePath);
    if (!stat.isFile()) {
      return NextResponse.json({ message: "File not found." }, { status: 404 });
    }

    const fileBuffer = await fs.readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPE_MAP[ext] || "application/octet-stream";

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": fileBuffer.length.toString(),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    if (error.code === "ENOENT") {
      return NextResponse.json({ message: "File not found." }, { status: 404 });
    }

    console.error("GET /uploads failed:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
