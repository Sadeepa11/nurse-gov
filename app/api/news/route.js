import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import { readData, writeData } from '../../../lib/file-db';

export const dynamic = 'force-dynamic';

const FILENAME = 'news-events.json';
const VALID_TYPES = new Set(['news', 'event']);
const NEWS_UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'news');
const MIME_EXTENSION_MAP = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
};

const normalizeString = (value) => (typeof value === 'string' ? value.trim() : '');

const normalizeType = (value) => {
  const normalized = normalizeString(value).toLowerCase();
  return VALID_TYPES.has(normalized) ? normalized : 'news';
};

async function ensureUploadDir() {
  await fs.mkdir(NEWS_UPLOAD_DIR, { recursive: true });
}

function sanitizeBaseName(name = '') {
  const cleaned = name
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 48);
  return cleaned || 'news-image';
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

async function saveImage(file) {
  await ensureUploadDir();
  const baseName = sanitizeBaseName(
    file.name?.split('.').slice(0, -1).join('.') || file.name || 'news-image',
  );
  const extension = resolveExtension(file);
  const uniqueName = `${baseName}-${Date.now()}-${randomUUID()}${extension}`;
  const filePath = path.join(NEWS_UPLOAD_DIR, uniqueName);
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await fs.writeFile(filePath, buffer);

  return {
    url: `/uploads/news/${uniqueName}`,
    size: buffer.byteLength,
  };
}

function isFileLike(value) {
  return value && typeof value === 'object' && typeof value.arrayBuffer === 'function';
}

async function deletePhysicalFile(publicPath) {
  if (!publicPath) return;
  const normalized = publicPath.startsWith('/') ? publicPath.slice(1) : publicPath;
  if (!normalized.startsWith('uploads/news/')) return;
  const filePath = path.join(process.cwd(), 'public', normalized);
  try {
    await fs.unlink(filePath);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error(`Failed to remove file ${filePath}:`, error);
    }
  }
}

async function parsePayload(request) {
  const contentType = request.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return { fields: await request.json(), file: null };
  }

  const formData = await request.formData();
  const fields = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === 'string') {
      fields[key] = value;
    }
  }
  const file = formData.get('image');
  return { fields, file: isFileLike(file) ? file : null };
}

export async function GET() {
  try {
    const items = await readData(FILENAME);
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error('GET /api/news failed:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { fields, file } = await parsePayload(request);
    const title = normalizeString(fields?.title);
    const description = normalizeString(fields?.description);
    if (!title || !description) {
      return NextResponse.json(
        { message: 'Title and description are required.' },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    const items = await readData(FILENAME);
    let imageUrl = normalizeString(fields?.imageUrl);

    if (file) {
      const saved = await saveImage(file);
      imageUrl = saved.url;
    }

    const newEntry = {
      id: `ne_${Date.now()}`,
      createdAt: now,
      updatedAt: now,
      title,
      description,
      type: normalizeType(fields?.type),
      imageUrl,
    };

    items.push(newEntry);
    await writeData(FILENAME, items);
    return NextResponse.json(newEntry, { status: 201 });
  } catch (error) {
    console.error('POST /api/news failed:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const { fields, file } = await parsePayload(request);
    const id = normalizeString(fields?.id);
    if (!id) {
      return NextResponse.json(
        { message: 'Item id is required.' },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    const items = await readData(FILENAME);
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) {
      return NextResponse.json({ message: 'Item not found.' }, { status: 404 });
    }

    const currentItem = items[index];
    let nextImageUrl = currentItem.imageUrl || '';
    const removeImageFlag = normalizeString(fields?.removeImage).toLowerCase();
    const shouldRemoveImage = removeImageFlag === 'true' || removeImageFlag === '1';

    if (file) {
      const saved = await saveImage(file);
      if (nextImageUrl && nextImageUrl !== saved.url) {
        await deletePhysicalFile(nextImageUrl);
      }
      nextImageUrl = saved.url;
    } else if (shouldRemoveImage) {
      if (nextImageUrl) {
        await deletePhysicalFile(nextImageUrl);
      }
      nextImageUrl = '';
    } else if (Object.prototype.hasOwnProperty.call(fields, 'imageUrl')) {
      const normalizedUrl = normalizeString(fields.imageUrl);
      if (normalizedUrl && normalizedUrl !== nextImageUrl && nextImageUrl.startsWith('/uploads/news/')) {
        await deletePhysicalFile(nextImageUrl);
      }
      nextImageUrl = normalizedUrl || nextImageUrl;
    }

    const updatedItem = {
      ...currentItem,
      title: normalizeString(fields.title) || currentItem.title,
      description: normalizeString(fields.description) || currentItem.description,
      type: fields.type ? normalizeType(fields.type) : currentItem.type,
      imageUrl: nextImageUrl,
      updatedAt: now,
    };

    items[index] = updatedItem;
    await writeData(FILENAME, items);
    return NextResponse.json(updatedItem, { status: 200 });
  } catch (error) {
    console.error('PUT /api/news failed:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = normalizeString(searchParams.get('id'));
    if (!id) {
      return NextResponse.json(
        { message: 'Item id is required.' },
        { status: 400 }
      );
    }

    const items = await readData(FILENAME);
    const targetIndex = items.findIndex((item) => item.id === id);

    if (targetIndex === -1) {
      return NextResponse.json({ message: 'Item not found.' }, { status: 404 });
    }

    const targetItem = items[targetIndex];
    if (targetItem?.imageUrl) {
      await deletePhysicalFile(targetItem.imageUrl);
    }

    const nextItems = items.filter((item) => item.id !== id);

    await writeData(FILENAME, nextItems);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('DELETE /api/news failed:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}