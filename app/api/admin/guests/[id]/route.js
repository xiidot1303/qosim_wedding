import { cleanName, deleteGuest, updateGuest } from '@/lib/store';
import { withErrors } from '@/lib/api';

export const PATCH = withErrors(async function PATCH(request, { params }) {
  const { id } = await params;
  const { name } = await request.json().catch(() => ({}));
  const clean = cleanName(name);
  if (!clean) return Response.json({ error: 'Ism bo‘sh' }, { status: 400 });
  const guest = await updateGuest(id, { name: clean });
  if (!guest) return Response.json({ error: 'Topilmadi' }, { status: 404 });
  return Response.json({ guest });
});

export const DELETE = withErrors(async function DELETE(_request, { params }) {
  const { id } = await params;
  const ok = await deleteGuest(id);
  return Response.json({ ok }, { status: ok ? 200 : 404 });
});
