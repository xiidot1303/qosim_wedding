import { wedding } from '@/lib/config';

const stamp = (d) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

export function GET() {
  const start = new Date(wedding.date);
  const end = new Date(start.getTime() + 5 * 60 * 60 * 1000);
  const { venue } = wedding;
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//wedding//invite//UZ',
    'BEGIN:VEVENT',
    `UID:wedding-${stamp(start)}@invite`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${wedding.groom} & ${wedding.bride} — nikoh to‘yi`,
    `LOCATION:${venue.name}\\, ${venue.city}`,
    `GEO:${venue.lat};${venue.lng}`,
    `DESCRIPTION:${venue.google}`,
    'BEGIN:VALARM',
    'TRIGGER:-PT3H',
    'ACTION:DISPLAY',
    'DESCRIPTION:To‘y',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  return new Response(ics, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="toy.ics"',
    },
  });
}
