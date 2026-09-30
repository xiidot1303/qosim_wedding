import { cookies } from 'next/headers';
import { SESSION_COOKIE, SESSION_MAX_AGE, checkPassword, createSession } from '@/lib/auth';

export async function POST(request) {
  if (!process.env.ADMIN_PASSWORD) {
    return Response.json({ error: 'ADMIN_PASSWORD .env faylida sozlanmagan' }, { status: 500 });
  }
  const { password } = await request.json().catch(() => ({}));
  if (!checkPassword(password || '')) {
    await new Promise((r) => setTimeout(r, 600));
    return Response.json({ error: 'Parol noto‘g‘ri' }, { status: 401 });
  }
  (await cookies()).set(SESSION_COOKIE, createSession(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });
  return Response.json({ ok: true });
}

export async function DELETE() {
  (await cookies()).delete(SESSION_COOKIE);
  return Response.json({ ok: true });
}
