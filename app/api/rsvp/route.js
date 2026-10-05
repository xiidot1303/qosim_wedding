import { getGuest, updateGuest } from '@/lib/store';
import { withErrors } from '@/lib/api';

export const POST = withErrors(async function POST(request) {
  const { id, answer } = await request.json().catch(() => ({}));
  if (!['yes', 'no'].includes(answer) || !(await getGuest(id))) {
    return Response.json({ error: 'Bad request' }, { status: 400 });
  }
  await updateGuest(id, { rsvp: answer, rsvpAt: new Date().toISOString() });
  return Response.json({ ok: true });
});
