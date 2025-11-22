import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import { readData, writeData } from '../../../lib/file-db';

export const dynamic = 'force-dynamic';

const FILENAME = 'galleries.json';
const MAX_PHOTOS = 15;
const GALLERY_UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'galleries');

const MIME_EXTENSION_MAP = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
};

async function ensureUploadDir() {
  await fs.mkdir(GALLERY_UPLOAD_DIR, { recursive: true });
}

function sanitizeBaseName(name = '') {
  const cleaned = name
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 48);
  return cleaned || 'photo';
}

function resolveExtension(file) {
  const original = file.name ? path.extname(file.name) : '';
  if (original) return original;
  const derived = MIME_EXTENSION_MAP[file.type];
  if (derived) return derived;
  if (file.type && file.type.includes('/')) {
    return `.${file.type.split('/')[1]}`;
  }
  return '.jpg';
}

async function savePhoto(file) {
  await ensureUploadDir();
  const baseName = sanitizeBaseName(file.name?.split('.').slice(0, -1).join('.') || file.name);
  const extension = resolveExtension(file);
  const uniqueName = `${baseName}-${Date.now()}-${randomUUID()}${extension}`;
  const filePath = path.join(GALLERY_UPLOAD_DIR, uniqueName);
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await fs.writeFile(filePath, buffer);

  return {
    id: `p_${randomUUID()}`,
    url: `/uploads/galleries/${uniqueName}`,
    altText: file.name || 'Gallery photo',
    size: buffer.byteLength,
    createdAt: new Date().toISOString(),
  };
}

function isFileLike(value) {
  return value && typeof value === 'object' && typeof value.arrayBuffer === 'function';
}

async function deletePhysicalFile(publicPath) {
  if (!publicPath) return;
  const normalized = publicPath.startsWith('/') ? publicPath.slice(1) : publicPath;
  const filePath = path.join(process.cwd(), 'public', normalized);
  try {
    await fs.unlink(filePath);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error(`Failed to remove file ${filePath}:`, error);
    }
  }
}

export async function GET() {
  try {
    const albums = await readData(FILENAME);
    return NextResponse.json(albums, { status: 200 });
  } catch (error) {
    console.error('GET /api/gallery failed:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const albumTitle = (formData.get('albumTitle') || '').toString().trim();
    const albumId = (formData.get('albumId') || '').toString().trim();
    const description = (formData.get('description') || '').toString();
    const files = formData
      .getAll('photos')
      .filter(isFileLike)
      .slice(0, MAX_PHOTOS);

    if (!albumTitle && !albumId) {
      return NextResponse.json(
        { message: 'Provide albumTitle for new albums or albumId to append photos.' },
        { status: 400 },
      );
    }

    let albums = await readData(FILENAME);
    if (!Array.isArray(albums)) {
      console.warn('Unexpected galleries payload, resetting to empty array.');
      albums = [];
    }
    const now = new Date().toISOString();

    if (albumId) {
      const index = albums.findIndex((album) => album.id === albumId);
      if (index === -1) {
        return NextResponse.json({ message: 'Album not found.' }, { status: 404 });
      }

      const album = albums[index];
      if (!Array.isArray(album.images)) {
        album.images = [];
      }
      const spaceRemaining = MAX_PHOTOS - album.images.length;
      if (spaceRemaining <= 0) {
        return NextResponse.json(
          { message: `Album already contains ${MAX_PHOTOS} photos.` },
          { status: 400 },
        );
      }

      const photosToSave = files.slice(0, spaceRemaining);
      const uploadedPhotos = await Promise.all(
        photosToSave.map(async (file) => {
          try {
            return await savePhoto(file);
          } catch (fileError) {
            console.error('Failed to save gallery photo:', fileError);
            throw fileError;
          }
        })
      );
      album.images = [...album.images, ...uploadedPhotos];
      album.updatedAt = now;

      albums[index] = album;
      await writeData(FILENAME, albums);
      return NextResponse.json(album, { status: 200 });
    }

    if (!albumTitle) {
      return NextResponse.json({ message: 'Album title is required.' }, { status: 400 });
    }

    const uploadedPhotos = files.length
      ? await Promise.all(
          files.map(async (file) => {
            try {
              return await savePhoto(file);
            } catch (fileError) {
              console.error('Failed to save gallery photo:', fileError);
              throw fileError;
            }
          })
        )
      : [];
    const newAlbum = {
      id: `g_${randomUUID()}`,
      albumTitle,
      description,
      images: uploadedPhotos,
      createdAt: now,
      updatedAt: now,
    };

    albums.push(newAlbum);
    await writeData(FILENAME, albums);
    return NextResponse.json(newAlbum, { status: 201 });
  } catch (error) {
    console.error('POST /api/gallery failed:', error);
    return NextResponse.json({
      message: 'Internal Server Error',
      detail: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const albumId = searchParams.get('albumId');
    const photoId = searchParams.get('photoId');

    if (!albumId) {
      return NextResponse.json({ message: 'albumId is required.' }, { status: 400 });
    }

    const albums = await readData(FILENAME);
    const albumIndex = albums.findIndex((album) => album.id === albumId);

    if (albumIndex === -1) {
      return NextResponse.json({ message: 'Album not found.' }, { status: 404 });
    }

    const album = albums[albumIndex];
    if (!Array.isArray(album.images)) {
      album.images = [];
    }

    if (photoId) {
      const photoIndex = album.images.findIndex((photo) => photo.id === photoId);
      if (photoIndex === -1) {
        return NextResponse.json({ message: 'Photo not found.' }, { status: 404 });
      }

      const [removedPhoto] = album.images.splice(photoIndex, 1);
      album.updatedAt = new Date().toISOString();
      albums[albumIndex] = album;
      await writeData(FILENAME, albums);
      await deletePhysicalFile(removedPhoto?.url);
      return NextResponse.json(album, { status: 200 });
    }

    // Delete the entire album
    await Promise.all(album.images.map((photo) => deletePhysicalFile(photo.url)));
    const nextAlbums = albums.filter((item) => item.id !== albumId);
    await writeData(FILENAME, nextAlbums);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('DELETE /api/gallery failed:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}