import { NextResponse } from 'next/server';
import { createHash, randomUUID } from 'crypto';
import { readData } from '../../../../lib/file-db';

export const dynamic = 'force-dynamic';

const FILENAME = 'admin-users.json';

const normalizeString = (value) => (typeof value === 'string' ? value.trim() : '');

const normalizeEmail = (value) => normalizeString(value).toLowerCase();

const hashPassword = (value) => createHash('sha256').update(value).digest('hex');

export async function POST(request) {
  try {
    const payload = await request.json();
    const email = normalizeEmail(payload?.email);
    const password = normalizeString(payload?.password);

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required.' },
        { status: 400 },
      );
    }

    const users = await readData(FILENAME);
    const matchingUser = users.find(
      (user) => normalizeEmail(user?.email) === email,
    );

    if (!matchingUser) {
      return NextResponse.json(
        { message: 'Invalid credentials.' },
        { status: 401 },
      );
    }

    const hashed = hashPassword(password);
    if (hashed !== normalizeString(matchingUser.passwordHash)) {
      return NextResponse.json(
        { message: 'Invalid credentials.' },
        { status: 401 },
      );
    }

    const session = {
      id: matchingUser.id,
      email: matchingUser.email,
      role: matchingUser.role || 'admin',
      issuedAt: new Date().toISOString(),
      token: randomUUID(),
    };

    return NextResponse.json(session, { status: 200 });
  } catch (error) {
    console.error('POST /api/admin/login failed:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
