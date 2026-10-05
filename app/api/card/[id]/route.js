import { renderCard } from '@/lib/card/render';
import { getGuest } from '@/lib/store';
import { getBaseUrl, inviteUrl } from '@/lib/site';

export async function GET(request, { params }) {
  const { id } = await params;
  const guest = await getGuest(id);
  if (!guest) return new Response('Not found', { status: 404 });

  const search = request.nextUrl.searchParams;
  const fileName = `${guest.name.replace(/[\\/:*?"<>|\u0000-\u001f]/g, '').trim() || 'taklifnoma'}.png`;

  return renderCard({
    name: guest.name,
    url: inviteUrl(getBaseUrl(request), guest.id),
    design: search.get('design'),
    headers: {
      'Cache-Control': 'no-store',
      ...(search.has('download') && {
        'Content-Disposition': `attachment; filename="taklifnoma.png"; filename*=UTF-8''${encodeURIComponent(fileName)}`,
      }),
    },
  });
}
