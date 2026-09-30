// Public origin used inside QR codes. Set SITE_URL in production so printed
// cards point at the real domain, not whatever host the admin happens to use.
export function getBaseUrl(request) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/+$/, '');
  const h = request.headers;
  const host = h.get('x-forwarded-host') || h.get('host');
  const proto = h.get('x-forwarded-proto') || new URL(request.url).protocol.replace(':', '');
  return `${proto}://${host}`;
}

export const inviteUrl = (base, id) => `${base}/i/${id}`;
