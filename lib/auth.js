import { createHmac, timingSafeEqual } from 'node:crypto';

export const SESSION_COOKIE = 'admin_session';
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

const secret = () => process.env.SESSION_SECRET || `wedding:${process.env.ADMIN_PASSWORD || ''}`;
const sign = (value) => createHmac('sha256', secret()).update(value).digest('base64url');

function safeEqual(a, b) {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && timingSafeEqual(x, y);
}

export function checkPassword(password) {
  const expected = process.env.ADMIN_PASSWORD;
  return Boolean(expected) && safeEqual(password, expected);
}

export function createSession() {
  const expires = String(Date.now() + SESSION_MAX_AGE * 1000);
  return `${expires}.${sign(expires)}`;
}

export function verifySession(token) {
  if (!token || !process.env.ADMIN_PASSWORD) return false;
  const [expires, sig] = token.split('.');
  if (!expires || !sig || !safeEqual(sig, sign(expires))) return false;
  return Number(expires) > Date.now();
}
