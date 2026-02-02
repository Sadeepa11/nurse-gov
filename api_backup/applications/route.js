import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import { readData, writeData } from '../../../lib/file-db';

export const dynamic = 'force-dynamic';

const FILENAME = 'applications.json';
const APPLICATION_UPLOAD_DIR = path.join(process.cwd(), 'public', 'applications', 'uploads');
const MIME_EXTENSION_MAP = {
  'application/pdf': '.pdf',
  'application/msword': '.doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  'image/jpeg': '.jpg',
  'image/png': '.png',
};

const normalizeString = (value) => {
  if (typeof value !== 'string') {
    return '';
  }
  return value.trim();
};

const parseStatus = (value, fallback = '') => {
  const normalized = normalizeString(value).toLowerCase();
  if (normalized === 'active' || normalized === 'archived') {
    return normalized;
  }
  return fallback;
};

async function ensureUploadDir() {
  await fs.mkdir(APPLICATION_UPLOAD_DIR, { recursive: true });
}

function sanitizeBaseName(name = '') {
  const cleaned = name
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 48);
  return cleaned || 'application-file';
}

function resolveExtension(file) {
  const original = file.name ? path.extname(file.name) : '';
  if (original) return original;
  const derived = MIME_EXTENSION_MAP[file.type];
  if (derived) return derived;
  if (file.type && file.type.includes('/')) {
    return `.${file.type.split('/')[1]}`;
  }
  return '.pdf';
}

async function saveFile(file) {
  await ensureUploadDir();
  const baseName = sanitizeBaseName(
    file.name?.split('.').slice(0, -1).join('.') || file.name || 'application-file',
  );
  const extension = resolveExtension(file);
  const uniqueName = `${baseName}-${Date.now()}-${randomUUID()}${extension}`;
  const filePath = path.join(APPLICATION_UPLOAD_DIR, uniqueName);
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await fs.writeFile(filePath, buffer);

  return {
    url: `/applications/uploads/${uniqueName}`,
    size: buffer.byteLength,
  };
}

function isFileLike(value) {
  return value && typeof value === 'object' && typeof value.arrayBuffer === 'function';
}

async function deletePhysicalFile(publicPath) {
  if (!publicPath) return;
  const normalized = publicPath.startsWith('/') ? publicPath.slice(1) : publicPath;
  if (!normalized.startsWith('applications/uploads/')) return;
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
  const file = formData.get('file');
  return { fields, file: isFileLike(file) ? file : null };
}

export async function GET() {
  try {
    const items = await readData(FILENAME);
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error('GET /api/applications failed:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { fields, file } = await parsePayload(request);
    const title = normalizeString(fields?.title);
    const description = normalizeString(fields?.description);
    let fileUrl = normalizeString(fields?.fileUrl);
    const status = parseStatus(fields?.status, 'active');

    if (file) {
      const saved = await saveFile(file);
      fileUrl = saved.url;
    }

    if (!title || !fileUrl) {
      return NextResponse.json(
        { message: 'Title and fileUrl are required.' },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    const items = await readData(FILENAME);
    const newItem = {
      id: `app_${randomUUID()}`,
      title,
      description,
      fileUrl,
      status,
      createdAt: now,
      updatedAt: now,
    };

    items.push(newItem);
    await writeData(FILENAME, items);
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error('POST /api/applications failed:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { fields, file } = await parsePayload(request);
    const id = normalizeString(fields?.id);

    if (!id) {
      return NextResponse.json({ message: 'Application id is required.' }, { status: 400 });
    }

    const items = await readData(FILENAME);
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) {
      return NextResponse.json({ message: 'Application not found.' }, { status: 404 });
    }

    const now = new Date().toISOString();
    const currentItem = items[index];
    const previousFileUrl = currentItem.fileUrl || '';
    let previousFileRemoved = false;
    let nextFileUrl = previousFileUrl;
    const removeFileFlag = normalizeString(fields?.removeFile).toLowerCase();
    const shouldRemoveFile = removeFileFlag === 'true' || removeFileFlag === '1';

    if (file) {
      const saved = await saveFile(file);
      if (previousFileUrl && previousFileUrl !== saved.url) {
        await deletePhysicalFile(previousFileUrl);
        previousFileRemoved = true;
      }
      nextFileUrl = saved.url;
    } else if (shouldRemoveFile) {
      if (previousFileUrl) {
        await deletePhysicalFile(previousFileUrl);
        previousFileRemoved = true;
      }
      nextFileUrl = '';
    }

    const candidateUrl = normalizeString(fields?.fileUrl);
    if (candidateUrl) {
      if (!previousFileRemoved && candidateUrl !== previousFileUrl && previousFileUrl) {
        await deletePhysicalFile(previousFileUrl);
        previousFileRemoved = true;
      }
      nextFileUrl = candidateUrl;
    }

    if (!nextFileUrl) {
      return NextResponse.json(
        { message: 'An application must include a fileUrl or uploaded file.' },
        { status: 400 },
      );
    }

    const updatedItem = {
      ...currentItem,
      title: normalizeString(fields?.title) || currentItem.title,
      description: normalizeString(fields?.description) || currentItem.description,
      fileUrl: nextFileUrl,
      status: parseStatus(fields?.status, currentItem.status) || currentItem.status,
      updatedAt: now,
    };

    items[index] = updatedItem;
    await writeData(FILENAME, items);
    return NextResponse.json(updatedItem, { status: 200 });
  } catch (error) {
    console.error('PUT /api/applications failed:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Application id is required.' }, { status: 400 });
    }

    const items = await readData(FILENAME);
    const index = items.findIndex((item) => item.id === id);

    if (index === -1) {
      return NextResponse.json({ message: 'Application not found.' }, { status: 404 });
    }

    const targetItem = items[index];
    if (targetItem?.fileUrl) {
      await deletePhysicalFile(targetItem.fileUrl);
    }

    const nextItems = items.filter((item) => item.id !== id);

    await writeData(FILENAME, nextItems);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('DELETE /api/applications failed:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
