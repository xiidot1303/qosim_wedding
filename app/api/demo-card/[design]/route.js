import { cleanName } from '@/lib/store';
import { renderCard } from '@/lib/card/render';
import { getBaseUrl } from '@/lib/site';

// Sample cards for /demo — no guest data involved; the QR points at the home page.
export async function GET(request, { params }) {
  const { design } = await params;
  const name = cleanName(request.nextUrl.searchParams.get('name')) || 'Shahzod Karimov';
  return renderCard({
    name,
    url: `${getBaseUrl(request)}/`,
    design,
    headers: { 'Cache-Control': 'no-store' },
  });
}
