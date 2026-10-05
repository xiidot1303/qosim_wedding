import { addGuests, listGuests } from '@/lib/store';
import { getBaseUrl } from '@/lib/site';
import { withErrors } from '@/lib/api';

export const GET = withErrors(async function GET(request) {
  return Response.json({ guests: await listGuests(), baseUrl: getBaseUrl(request) });
});

// Body: { names: ["Ali Valiyev", "Madina opa", ...] }
export const POST = withErrors(async function POST(request) {
  const { names } = await request.json().catch(() => ({}));
  if (!Array.isArray(names)) {
    return Response.json({ error: 'names massiv bo‘lishi kerak' }, { status: 400 });
  }
  const added = await addGuests(names.slice(0, 2000));
  return Response.json({ added });
});
