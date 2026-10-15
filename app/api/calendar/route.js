import { getEvent } from '@/lib/config';

const stamp = (d) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

// ?event=toy (default) or ?event=nahor
export function GET(request) {
  const ev = getEvent(request.nextUrl.searchParams.get('event'));
  const start = new Date(ev.date);
  const end = new Date(start.getTime() + (ev.key === 'nahor' ? 3 : 5) * 60 * 60 * 1000);
  const { venue } = ev;
  const title = ev.title ? `${ev.title} — ${ev.groom} & ${ev.bride}` : `${ev.groom} & ${ev.bride} — nikoh to‘yi`;
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//wedding//invite//UZ',
    'BEGIN:VEVENT',
    `UID:${ev.key}-${stamp(start)}@invite`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${title}`,
    `LOCATION:${venue.name}\\, ${venue.address || venue.city}`,
    `GEO:${venue.lat};${venue.lng}`,
    `DESCRIPTION:${venue.yandex}`,
    'BEGIN:VALARM',
    'TRIGGER:-PT3H',
    'ACTION:DISPLAY',
    `DESCRIPTION:${ev.title || 'To‘y'}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  return new Response(ics, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${ev.key}.ics"`,
    },
  });
}
