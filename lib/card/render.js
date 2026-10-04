import { ImageResponse } from 'next/og';
import QRCode from 'qrcode';
import { wedding } from '@/lib/config';
import { designsA } from './designs-a';
import { designsB } from './designs-b';
import { designsC } from './designs-c';
import { designsD } from './designs-d';
import { designsE } from './designs-e';
import { loadFonts } from './fonts';
import { Card, H, Layer, W } from './kit';
import { standard } from './standard';

export const designs = [...designsA, ...designsB, ...designsC, ...designsD, ...designsE].map((d, i) => ({ ...d, id: i + 1 }));

export const getDesign = (id) => designs.find((d) => d.id === Number(id)) || designs.find((d) => d.id === wedding.cardDesign) || designs[0];

export async function renderCard({ name, url, design, headers }) {
  const d = getDesign(design);
  // Designs without qrColors don't print a QR code.
  const qr = d.qrColors && (await QRCode.toDataURL(url, { errorCorrectionLevel: 'M', margin: 0, width: 600, color: d.qrColors }));
  const ctx = { name, qr };
  return new ImageResponse(
    (
      <Card bg={d.bg} color={d.color} font={d.font ?? 'Cormorant'}>
        {d.under}
        <Layer src={d.layer} />
        {d.custom ? d.custom(ctx) : standard(d.spec, ctx)}
      </Card>
    ),
    { width: W, height: H, fonts: await loadFonts(d.fonts), headers }
  );
}
