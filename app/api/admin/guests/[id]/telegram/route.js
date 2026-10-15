import { withErrors } from '@/lib/api';
import { renderCard } from '@/lib/card/render';
import { getBaseUrl, inviteUrl } from '@/lib/site';
import { getGuest, updateGuest } from '@/lib/store';
import { sendInvitation } from '@/lib/telegram';

export const POST = withErrors(async function POST(request, { params }) {
  const { id } = await params;
  const guest = await getGuest(id);
  if (!guest) return Response.json({ error: 'Topilmadi' }, { status: 404 });

  const url = inviteUrl(getBaseUrl(request), guest.id);
  const card = await renderCard({ name: guest.name, url, event: guest.event });
  const png = await card.arrayBuffer();

  await sendInvitation({ name: guest.name, url, png, event: guest.event });
  const updated = await updateGuest(id, { telegramSentAt: new Date().toISOString() });
  return Response.json({ guest: updated });
});
