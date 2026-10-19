import { cleanName, deleteGuest, updateGuest } from '@/lib/store';
import { withErrors } from '@/lib/api';
import { EVENT_KEYS } from '@/lib/config';

export const PATCH = withErrors(async function PATCH(request, { params }) {
  const { id } = await params;
  // Body: { name } to rename and/or { event } to move the guest (same link).
  const { name, event } = await request.json().catch(() => ({}));
  const patch = {};
  if (name !== undefined) {
    patch.name = cleanName(name);
    if (!patch.name) return Response.json({ error: 'Ism bo‘sh' }, { status: 400 });
  }
  if (event !== undefined) {
    if (!EVENT_KEYS.includes(event)) return Response.json({ error: 'Noma’lum tadbir' }, { status: 400 });
    patch.event = event;
  }
  const guest = await updateGuest(id, patch);
  if (!guest) return Response.json({ error: 'Topilmadi' }, { status: 404 });
  return Response.json({ guest });
});

export const DELETE = withErrors(async function DELETE(_request, { params }) {
  const { id } = await params;
  const ok = await deleteGuest(id);
  return Response.json({ ok }, { status: ok ? 200 : 404 });
});
