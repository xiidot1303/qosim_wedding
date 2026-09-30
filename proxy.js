import { NextResponse } from 'next/server';
import { SESSION_COOKIE, verifySession } from '@/lib/auth';

const PUBLIC = ['/admin/login', '/api/admin/login'];

export function proxy(request) {
  const { pathname } = request.nextUrl;
  if (PUBLIC.includes(pathname)) return NextResponse.next();
  if (verifySession(request.cookies.get(SESSION_COOKIE)?.value)) return NextResponse.next();

  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.redirect(new URL('/admin/login', request.url));
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*', '/api/card/:path*'],
};
