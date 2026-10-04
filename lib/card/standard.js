import { wedding } from '@/lib/config';
import { Qr, Text, fit } from './kit';

// The common vertical layout: guest → line → groom & bride → date → QR and/or
// venue + family. Each design only supplies positions and styles.
export function standard(s, { name, qr }) {
  const g = s.guest;
  return [
    <Text
      key="guest"
      top={g.top}
      height={g.h ?? 150}
      maxWidth={g.maxWidth ?? 740}
      style={{ lineHeight: 1.12, ...g.style, fontSize: fit(name, ...g.fit) }}
    >
      {g.upper ? name.toUpperCase() : name}
    </Text>,
    <Text key="line" top={s.line.top} height={s.line.h ?? 40} style={s.line.style}>
      {wedding.cardLine}
    </Text>,
    <Text key="groom" top={s.groom.top} height={s.groom.h} style={s.groom.style}>
      {s.caps ? wedding.groom.toUpperCase() : wedding.groom}
    </Text>,
    <Text key="amp" top={s.amp.top} height={s.amp.h} style={s.amp.style}>
      &amp;
    </Text>,
    <Text key="bride" top={s.bride.top} height={s.bride.h} style={s.bride.style}>
      {s.caps ? wedding.bride.toUpperCase() : wedding.bride}
    </Text>,
    <Text key="date" top={s.date.top} height={s.date.h ?? 60} style={s.date.style}>
      {wedding.dateShort}
    </Text>,
    s.qr && <Qr key="qr" src={qr} {...s.qr} />,
    s.venue && (
      <Text key="venue" top={s.venue.top} height={s.venue.h ?? 60} style={s.venue.style}>
        {s.venue.upper ? wedding.venue.name.toUpperCase() : wedding.venue.name}
      </Text>
    ),
    s.family && (
      <Text key="family" top={s.family.top} height={s.family.h ?? 80} style={s.family.style}>
        {wedding.family}
      </Text>
    ),
  ].filter(Boolean);
}
