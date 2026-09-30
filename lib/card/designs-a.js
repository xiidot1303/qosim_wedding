import { wedding } from '@/lib/config';
import { Qr, Text, brackets, diamond, fit, hline, leaf, r1, sparkle, sprig, star8, svgUrl } from './kit';

const caps = (size, spacing, extra) => ({ fontSize: size, letterSpacing: spacing, textTransform: 'uppercase', ...extra });

/* 1 ─ Ravoq: Samarkand arch, olive sprigs, script names */
const ravoq = (() => {
  const GOLD = '#b59a74';
  const SOFT = '#d6c6aa';
  const FILL = '#fdfbf7';
  const layer = svgUrl(`
    <rect x="44" y="44" width="1112" height="1712" fill="none" stroke="${SOFT}" stroke-width="1.5"/>
    <rect x="56" y="56" width="1088" height="1688" fill="none" stroke="${SOFT}" stroke-width=".8"/>
    ${[[50, 50], [1150, 50], [50, 1750], [1150, 1750]].map(([x, y]) => diamond(x, y, 7, GOLD)).join('')}
    <path d="M130 1700 V560 C130 330 400 200 600 130 C800 200 1070 330 1070 560 V1700 Z" fill="${FILL}" stroke="${GOLD}" stroke-width="2"/>
    <path d="M148 1682 V566 C148 346 410 220 600 152 C790 220 1052 346 1052 566 V1682 Z" fill="none" stroke="${GOLD}" stroke-width=".8"/>
    ${star8(600, 134, 24, GOLD, FILL)}
    ${diamond(130, 1700, 6, GOLD)}${diamond(1070, 1700, 6, GOLD)}
    ${hline(520, 585, 498, GOLD)}${hline(615, 680, 498, GOLD)}${diamond(600, 498, 6, GOLD)}
    ${hline(300, 400, 1172, GOLD)}${hline(800, 900, 1172, GOLD)}${diamond(300, 1172, 3.5, GOLD)}${diamond(900, 1172, 3.5, GOLD)}
    <g transform="translate(548 842)">${sprig(GOLD, GOLD)}</g>
    <g transform="translate(652 842) scale(-1 1)">${sprig(GOLD, GOLD)}</g>
    ${brackets(453, 1296, 294, 34, GOLD)}
  `);
  return {
    name: 'Ravoq',
    fonts: ['Great Vibes', 'Cormorant', 'Montserrat'],
    bg: 'radial-gradient(ellipse at 50% 45%, #f8f3ea 0%, #efe7da 100%)',
    color: '#2a2724',
    layer,
    qrColors: { dark: '#2a2724', light: FILL },
    spec: {
      guest: { top: 290, h: 190, maxWidth: 680, fit: [96, 56, 14], style: { fontStyle: 'italic' } },
      line: { top: 530, style: caps(22, 3.5, { fontFamily: 'Montserrat', color: '#8a8176' }) },
      groom: { top: 600, h: 215, style: { fontFamily: 'Great Vibes', fontSize: 172 } },
      amp: { top: 784, h: 100, style: { fontSize: 96, fontStyle: 'italic', fontWeight: 300, color: GOLD } },
      bride: { top: 858, h: 190, style: { fontFamily: 'Great Vibes', fontSize: 150 } },
      date: { top: 1146, h: 52, style: { fontSize: 46, fontWeight: 500, letterSpacing: 8 } },
      qr: { x: 475, y: 1318, size: 250 },
    },
  };
})();

/* 2 ─ Minimal: hairline frame, light serif */
const minimal = (() => {
  const ACCENT = '#b59a74';
  const layer = svgUrl(`
    <rect x="56" y="56" width="1088" height="1688" fill="none" stroke="#ddd4c6" stroke-width="1.5"/>
    ${hline(568, 632, 440, ACCENT)}
    ${hline(318, 388, 1135, ACCENT)}${hline(812, 882, 1135, ACCENT)}
  `);
  return {
    name: 'Minimal',
    fonts: ['Cormorant', 'Montserrat'],
    bg: '#faf8f4',
    color: '#2a2724',
    layer,
    qrColors: { dark: '#2a2724', light: '#faf8f4' },
    spec: {
      guest: { top: 190, h: 200, maxWidth: 940, fit: [112, 64, 16], style: { fontStyle: 'italic' } },
      line: { top: 470, style: caps(25, 4, { fontFamily: 'Montserrat', color: '#8a8176' }) },
      groom: { top: 600, h: 180, style: { fontSize: 158, fontWeight: 300 } },
      amp: { top: 770, h: 110, style: { fontSize: 96, fontWeight: 300, fontStyle: 'italic', color: ACCENT } },
      bride: { top: 870, h: 180, style: { fontSize: 158, fontWeight: 300 } },
      date: { top: 1110, h: 50, style: { fontFamily: 'Montserrat', fontSize: 34, letterSpacing: 10 } },
      qr: { x: 468, y: 1330, size: 264 },
    },
  };
})();

/* 3 ─ Art Deco: dark, gold fans, geometric caps */
const deco = (() => {
  const G = '#d4b273';
  let fanTop = '';
  for (let a = 190, k = 0; a <= 350; a += 10, k++) {
    const t = (a * Math.PI) / 180;
    const r2 = k % 2 ? 110 : 150;
    fanTop += `<line x1="${r1(600 + Math.cos(t) * 40)}" y1="${r1(250 + Math.sin(t) * 40)}" x2="${r1(600 + Math.cos(t) * r2)}" y2="${r1(250 + Math.sin(t) * r2)}"/>`;
  }
  let fanBottom = '';
  for (let a = 200, k = 0; a <= 340; a += 20, k++) {
    const t = (a * Math.PI) / 180;
    const r2 = k % 2 ? 34 : 48;
    fanBottom += `<line x1="${r1(600 + Math.cos(t) * 16)}" y1="${r1(1640 + Math.sin(t) * 16)}" x2="${r1(600 + Math.cos(t) * r2)}" y2="${r1(1640 + Math.sin(t) * r2)}"/>`;
  }
  const layer = svgUrl(`
    <g fill="none" stroke="${G}">
      <path d="M110 60 H1090 L1140 110 V1690 L1090 1740 H110 L60 1690 V110 Z" stroke-width="2"/>
      <path d="M124 78 H1076 L1122 124 V1676 L1076 1722 H124 L78 1676 V124 Z" stroke-width=".8"/>
      <g stroke-width="1.6">${fanTop}</g>
      <path d="M450 250 A150 150 0 0 1 750 250" stroke-width=".8"/>
      <path d="M200 250 H440 M760 250 H1000" stroke-width="1.2"/>
      <g stroke-width="1.4">${fanBottom}</g>
      <path d="M380 1640 H560 M640 1640 H820" stroke-width="1.2"/>
      <path d="M420 735 H540 M660 735 H780" stroke-width="1.2"/>
    </g>
    <path d="M572 250 A28 28 0 0 1 628 250 Z" fill="${G}"/>
    <path d="M588 1640 A12 12 0 0 0 612 1640 Z" fill="${G}"/>
    ${diamond(60, 900, 9, G)}${diamond(1140, 900, 9, G)}
    ${diamond(330, 1010, 6, G)}${diamond(870, 1010, 6, G)}
    ${diamond(200, 250, 5, G)}${diamond(1000, 250, 5, G)}
  `);
  return {
    name: 'Art Deco',
    fonts: ['Poiret One', 'Josefin', 'Montserrat', 'Cormorant'],
    bg: 'radial-gradient(ellipse at 50% 30%, #262930 0%, #131519 60%, #0b0c0f 100%)',
    color: '#efe4c8',
    layer,
    qrColors: { dark: '#131519', light: '#f4ead3' },
    spec: {
      guest: { top: 300, h: 150, fit: [72, 48, 14], style: { fontFamily: 'Montserrat', fontWeight: 300, letterSpacing: 3 } },
      line: { top: 470, style: caps(22, 7, { fontFamily: 'Josefin', color: G }) },
      caps: true,
      groom: { top: 560, h: 130, style: { fontFamily: 'Poiret One', fontSize: 104, letterSpacing: 12, color: G } },
      amp: { top: 700, h: 70, style: { fontSize: 64, fontStyle: 'italic', color: G } },
      bride: { top: 780, h: 130, style: { fontFamily: 'Poiret One', fontSize: 86, letterSpacing: 10, color: G } },
      date: { top: 980, h: 60, style: { fontFamily: 'Josefin', fontWeight: 300, fontSize: 44, letterSpacing: 14 } },
      qr: { x: 485, y: 1190, size: 230, plate: { bg: '#f4ead3', pad: 22, border: `2px solid ${G}` } },
    },
  };
})();

/* 4 ─ Botanika: eucalyptus corners, sage palette */
const botanika = (() => {
  const SAGE = '#8a9c80';
  const DEEP = '#4f5f49';
  function euc(p0, c, p1, n, size, style) {
    let s = `<path d="M${p0[0]} ${p0[1]} Q${c[0]} ${c[1]} ${p1[0]} ${p1[1]}" fill="none" stroke="${DEEP}" stroke-width="1.6" stroke-opacity=".7"/>`;
    for (let i = 1; i <= n; i++) {
      const t = i / (n + 1);
      const x = (1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * c[0] + t * t * p1[0];
      const y = (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * c[1] + t * t * p1[1];
      const dx = 2 * (1 - t) * (c[0] - p0[0]) + 2 * t * (p1[0] - c[0]);
      const dy = 2 * (1 - t) * (c[1] - p0[1]) + 2 * t * (p1[1] - c[1]);
      const len = Math.hypot(dx, dy);
      const side = i % 2 ? 1 : -1;
      const sz = size * (1 - t * 0.45);
      const nx = (-dy / len) * side * sz * 0.95;
      const ny = (dx / len) * side * sz * 0.95;
      const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
      s += `<ellipse cx="${r1(x + nx)}" cy="${r1(y + ny)}" rx="${r1(sz)}" ry="${r1(sz * 0.78)}" transform="rotate(${r1(ang)} ${r1(x + nx)} ${r1(y + ny)})" ${style}/>`;
    }
    return s;
  }
  const cluster = `
    ${euc([-10, 270], [170, 190], [440, 60], 9, 30, `fill="${SAGE}" fill-opacity=".55"`)}
    ${euc([150, -10], [180, 190], [70, 430], 7, 26, `fill="none" stroke="${DEEP}" stroke-width="1.4"`)}
    ${euc([0, 120], [120, 60], [260, -10], 5, 20, `fill="${SAGE}" fill-opacity=".35"`)}
  `;
  const layer = svgUrl(`
    <g>${cluster}</g>
    <g transform="rotate(180 600 900)">${cluster}</g>
    ${hline(520, 580, 542, SAGE)}${hline(620, 680, 542, SAGE)}
    ${leaf(600, 542, 22, -130, SAGE)}${leaf(600, 542, 22, -50, SAGE)}
    ${hline(290, 380, 1155, SAGE)}${hline(820, 910, 1155, SAGE)}
  `);
  return {
    name: 'Botanika',
    fonts: ['Allura', 'Cormorant', 'Montserrat'],
    bg: '#f6f5ef',
    color: '#37433a',
    layer,
    qrColors: { dark: '#37433a', light: '#f6f5ef' },
    spec: {
      guest: { top: 360, h: 150, fit: [84, 56, 14], style: { fontStyle: 'italic', color: DEEP } },
      line: { top: 575, style: caps(21, 5, { fontFamily: 'Montserrat', color: '#6f8467' }) },
      groom: { top: 640, h: 190, style: { fontFamily: 'Allura', fontSize: 168 } },
      amp: { top: 820, h: 90, style: { fontSize: 80, fontStyle: 'italic', fontWeight: 300, color: SAGE } },
      bride: { top: 895, h: 190, style: { fontFamily: 'Allura', fontSize: 158 } },
      date: { top: 1125, h: 60, style: { fontSize: 46, fontWeight: 500, letterSpacing: 8, color: DEEP } },
      qr: { x: 482, y: 1275, size: 236 },
    },
  };
})();

/* 5 ─ Monogram: editorial black & white, giant faint initials */
const monogram = (() => {
  const layer = svgUrl(`
    ${hline(100, 1100, 150, '#151515', 2)}${hline(100, 1100, 162, '#151515', 0.8)}
    ${hline(100, 1100, 1638, '#151515', 0.8)}${hline(100, 1100, 1650, '#151515', 2)}
    <path d="M600 985 V1025" stroke="#151515" stroke-width="1.2"/>
  `);
  const giant = (ch, top, left) => (
    <div
      key={ch}
      style={{
        position: 'absolute',
        top,
        left,
        display: 'flex',
        fontFamily: 'Bodoni',
        fontStyle: 'italic',
        fontSize: 1100,
        lineHeight: 1,
        color: 'rgba(0,0,0,0.045)',
      }}
    >
      {ch}
    </div>
  );
  return {
    name: 'Monogram',
    fonts: ['Bodoni', 'Playfair', 'Montserrat'],
    bg: '#fbfaf8',
    color: '#151515',
    layer,
    under: [giant(wedding.groom[0], -60, -120), giant(wedding.bride[0], 640, 520)],
    qrColors: { dark: '#151515', light: '#fbfaf8' },
    spec: {
      guest: { top: 225, h: 150, fit: [86, 56, 15], style: { fontStyle: 'italic' } },
      line: { top: 405, style: caps(18, 8, { fontFamily: 'Montserrat', fontWeight: 500, color: '#6d6d6d' }) },
      groom: { top: 510, h: 180, style: { fontFamily: 'Bodoni', fontSize: 150 } },
      amp: { top: 680, h: 120, style: { fontFamily: 'Bodoni', fontStyle: 'italic', fontSize: 110 } },
      bride: { top: 790, h: 180, style: { fontFamily: 'Bodoni', fontSize: 122 } },
      date: { top: 1040, h: 60, style: { fontFamily: 'Montserrat', fontWeight: 500, fontSize: 30, letterSpacing: 16 } },
      qr: { x: 480, y: 1250, size: 240 },
    },
  };
})();

/* 6 ─ Zamonaviy: asymmetric editorial, terracotta arch, big date */
const zamonaviy = (() => {
  const T = '#b4532a';
  const layer = svgUrl(
    `
    ${hline(110, 1090, 150, '#1d1b19', 1.5)}${hline(110, 1090, 1680, '#1d1b19', 1.5)}
    <path d="M790 1640 V1400 A170 170 0 0 1 1130 1400 V1640 Z" fill="url(#peach)"/>
    <path d="M772 1622 V1392 A170 170 0 0 1 1112 1392 V1622" fill="none" stroke="${T}" stroke-width="1.4"/>
  `,
    `<linearGradient id="peach" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ecd3c2"/><stop offset="1" stop-color="#e0b89e"/></linearGradient>`
  );
  const [day, month, year] = wedding.dateShort.split(' · ');
  return {
    name: 'Zamonaviy',
    fonts: ['Playfair', 'Cormorant', 'Montserrat'],
    bg: '#f4f0ea',
    color: '#1d1b19',
    layer,
    qrColors: { dark: '#1d1b19', light: '#f7f3ee' },
    custom: ({ name, qr }) => [
      <Text key="g" top={195} left={110} width={980} height={140} align="left" style={{ fontStyle: 'italic', fontSize: fit(name, 92, 58, 16), lineHeight: 1.1 }}>
        {name}
      </Text>,
      <Text key="l" top={345} left={110} width={980} height={40} align="left" style={caps(21, 5, { fontFamily: 'Montserrat', fontWeight: 500, color: T })}>
        {wedding.cardLine}
      </Text>,
      <Text key="n1" top={450} left={104} width={1000} height={200} align="left" style={{ fontFamily: 'Playfair', fontSize: 168, letterSpacing: -2 }}>
        {wedding.groom}
      </Text>,
      <Text key="n2" top={650} left={104} width={1000} height={180} align="left" style={{ fontFamily: 'Playfair', fontSize: 124, letterSpacing: -1 }}>
        <span style={{ color: T, fontStyle: 'italic', marginRight: 28 }}>&amp;</span>
        <span>{wedding.bride}</span>
      </Text>,
      <Text key="d" top={1150} left={98} width={700} height={290} align="left" style={{ fontFamily: 'Playfair', fontSize: 250, color: T, letterSpacing: -6 }}>
        {`${day}.${month}`}
      </Text>,
      <Text key="y" top={1450} left={116} width={600} height={50} align="left" style={{ fontFamily: 'Montserrat', fontWeight: 500, fontSize: 40, letterSpacing: 16 }}>
        {year}
      </Text>,
      <Qr key="q" src={qr} x={845} y={1395} size={230} plate={{ bg: '#f7f3ee', pad: 14 }} />,
    ],
  };
})();

/* 7 ─ Suzana: embroidered medallions, red & indigo */
const suzana = (() => {
  function med(cx, cy, r) {
    let pet = '';
    let d1 = '';
    let d2 = '';
    let inner = '';
    for (let i = 0; i < 12; i++) pet += `<ellipse cx="0" cy="${r1(-r * 1.06)}" rx="${r1(r * 0.1)}" ry="${r1(r * 0.17)}" transform="rotate(${i * 30})" fill="#3f6d4e"/>`;
    for (let i = 0; i < 16; i++) {
      const a = (i * 22.5 * Math.PI) / 180;
      d1 += `<circle cx="${r1(Math.cos(a) * r * 0.925)}" cy="${r1(Math.sin(a) * r * 0.925)}" r="${r1(r * 0.04)}" fill="#d39b35"/>`;
      d2 += `<circle cx="${r1(Math.cos(a + 0.2) * r * 0.785)}" cy="${r1(Math.sin(a + 0.2) * r * 0.785)}" r="${r1(r * 0.035)}" fill="#a51f2d"/>`;
    }
    for (let i = 0; i < 8; i++) inner += `<ellipse cx="0" cy="${r1(-r * 0.42)}" rx="${r1(r * 0.13)}" ry="${r1(r * 0.24)}" transform="rotate(${i * 45})" fill="#d39b35"/>`;
    return `<g transform="translate(${cx} ${cy})">${pet}<circle r="${r}" fill="#a51f2d"/>${d1}<circle r="${r1(r * 0.85)}" fill="#f5ecdc"/>${d2}<circle r="${r1(r * 0.72)}" fill="#27305e"/>${inner}<circle r="${r1(r * 0.26)}" fill="#a51f2d"/><circle r="${r1(r * 0.15)}" fill="#f5ecdc"/><circle r="${r1(r * 0.06)}" fill="#27305e"/></g>`;
  }
  let chain = '';
  for (let x = 72; x <= 1128; x += 39) chain += `<circle cx="${x}" cy="72" r="5"/><circle cx="${x}" cy="1728" r="5"/>`;
  for (let y = 111; y <= 1689; y += 39) chain += `<circle cx="72" cy="${y}" r="5"/><circle cx="1128" cy="${y}" r="5"/>`;
  const layer = svgUrl(`
    <rect x="30" y="30" width="1140" height="1740" fill="none" stroke="#a51f2d" stroke-width="9"/>
    <rect x="54" y="54" width="1092" height="1692" fill="none" stroke="#27305e" stroke-width="3"/>
    <g fill="#d39b35">${chain}</g>
    ${med(600, 0, 170)}${med(0, 0, 140)}${med(1200, 0, 140)}
    ${med(600, 1800, 170)}${med(0, 1800, 140)}${med(1200, 1800, 140)}
    ${med(0, 900, 90)}${med(1200, 900, 90)}
    ${diamond(600, 1110, 7, '#a51f2d')}${hline(480, 580, 1110, '#3f6d4e', 1.5)}${hline(620, 720, 1110, '#3f6d4e', 1.5)}
  `);
  return {
    name: 'Suzana',
    fonts: ['Alex Brush', 'Cormorant', 'Montserrat'],
    bg: 'radial-gradient(ellipse at 50% 50%, #fbf5e9, #f5ecdc 65%, #eee0c8)',
    color: '#27305e',
    layer,
    qrColors: { dark: '#27305e', light: '#f6eee0' },
    spec: {
      guest: { top: 290, h: 150, fit: [84, 56, 14], style: { fontStyle: 'italic' } },
      line: { top: 465, style: caps(21, 5, { fontFamily: 'Montserrat', fontWeight: 500, color: '#a51f2d' }) },
      groom: { top: 535, h: 195, style: { fontFamily: 'Alex Brush', fontSize: 164, color: '#a51f2d' } },
      amp: { top: 715, h: 90, style: { fontFamily: 'Alex Brush', fontSize: 96, color: '#3f6d4e' } },
      bride: { top: 790, h: 195, style: { fontFamily: 'Alex Brush', fontSize: 150, color: '#a51f2d' } },
      date: { top: 1010, h: 60, style: caps(50, 10, { fontWeight: 500 }) },
      qr: { x: 485, y: 1195, size: 230, plate: { bg: '#f6eee0', pad: 16, border: '2px solid #a51f2d' } },
    },
  };
})();

/* 8 ─ Zumrad: emerald night, gold sparkles */
const zumrad = (() => {
  const G = '#d8b872';
  const spark = [
    [180, 200, 16, 0.9], [260, 290, 8, 0.6], [1010, 180, 14, 0.85], [940, 300, 7, 0.5], [120, 420, 6, 0.5],
    [1080, 440, 9, 0.6], [150, 1560, 12, 0.8], [260, 1650, 7, 0.5], [1050, 1600, 16, 0.9], [960, 1500, 8, 0.6],
    [1100, 1300, 6, 0.5], [110, 1250, 7, 0.5], [600, 150, 10, 0.9],
  ];
  const layer = svgUrl(`
    <rect x="60" y="60" width="1080" height="1680" fill="none" stroke="${G}" stroke-width="1.5"/>
    <rect x="74" y="74" width="1052" height="1652" fill="none" stroke="${G}" stroke-width=".7"/>
    ${[[60, 60], [1140, 60], [60, 1740], [1140, 1740]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="26" fill="none" stroke="${G}" stroke-width="1.2"/><circle cx="${x}" cy="${y}" r="6" fill="${G}"/>`).join('')}
    ${spark.map(([x, y, s, o]) => sparkle(x, y, s, G, o)).join('')}
    ${hline(520, 588, 525, G)}${hline(612, 680, 525, G)}<circle cx="600" cy="525" r="4" fill="${G}"/>
  `);
  return {
    name: 'Zumrad',
    fonts: ['Italiana', 'Great Vibes', 'Cormorant', 'Montserrat'],
    bg: 'linear-gradient(160deg, #15503f 0%, #0b2c24 100%)',
    color: '#f1e6c8',
    layer,
    qrColors: { dark: '#0f3d33', light: '#f5eedc' },
    spec: {
      guest: { top: 270, h: 150, fit: [84, 56, 14], style: { fontStyle: 'italic' } },
      line: { top: 445, style: caps(21, 6, { fontFamily: 'Montserrat', color: G }) },
      groom: { top: 570, h: 180, style: { fontFamily: 'Italiana', fontSize: 150 } },
      amp: { top: 740, h: 110, style: { fontFamily: 'Great Vibes', fontSize: 100, color: G } },
      bride: { top: 840, h: 180, style: { fontFamily: 'Italiana', fontSize: 138 } },
      date: { top: 1075, h: 70, style: { fontFamily: 'Italiana', fontSize: 56, letterSpacing: 12, color: G } },
      qr: { x: 485, y: 1250, size: 230, plate: { bg: '#f5eedc', pad: 20, radius: 16 } },
    },
  };
})();

/* 9 ─ Pushti: blush watercolour washes */
const pushti = (() => {
  const blob = (cx, cy, rx, ry, fill, o) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" fill-opacity="${o}" filter="url(#wash)"/>`;
  const layer = svgUrl(
    `
    ${blob(120, 160, 320, 230, '#f0bfb3', 0.55)}${blob(360, 40, 200, 140, '#f6d5c6', 0.7)}${blob(40, 430, 170, 210, '#e5c0d3', 0.5)}
    ${blob(1090, 1650, 340, 240, '#f0bfb3', 0.55)}${blob(860, 1780, 220, 140, '#f3d0c0', 0.7)}${blob(1180, 1380, 170, 210, '#dcc8e6', 0.5)}
    <circle cx="190" cy="200" r="150" fill="none" stroke="#c69a88" stroke-width="1.4"/>
    <circle cx="1010" cy="1600" r="150" fill="none" stroke="#c69a88" stroke-width="1.4"/>
    ${sparkle(345, 330, 12, '#c69a88')}${sparkle(860, 1470, 12, '#c69a88')}
    ${hline(240, 330, 1155, '#c69a88')}${hline(870, 960, 1155, '#c69a88')}
  `,
    `<filter id="wash" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="38"/></filter>`
  );
  return {
    name: 'Pushti akvarel',
    fonts: ['Parisienne', 'Cormorant', 'Montserrat'],
    bg: '#fcf6f3',
    color: '#7a4b4b',
    layer,
    qrColors: { dark: '#6b3f3f', light: '#fcf6f3' },
    spec: {
      guest: { top: 380, h: 150, fit: [84, 56, 14], style: { fontStyle: 'italic' } },
      line: { top: 555, style: caps(21, 5, { fontFamily: 'Montserrat', color: '#b07a6e' }) },
      groom: { top: 625, h: 195, style: { fontFamily: 'Parisienne', fontSize: 150 } },
      amp: { top: 805, h: 90, style: { fontFamily: 'Parisienne', fontSize: 90, color: '#b07a6e' } },
      bride: { top: 880, h: 195, style: { fontFamily: 'Parisienne', fontSize: 132 } },
      date: { top: 1130, h: 50, style: { fontFamily: 'Montserrat', fontWeight: 300, fontSize: 36, letterSpacing: 14 } },
      qr: { x: 485, y: 1270, size: 230 },
    },
  };
})();

/* 10 ─ Girih: Samarkand tile bands, lapis & turquoise */
const girih = (() => {
  const LAPIS = '#1d3b6e';
  const TURQ = '#2a8c8f';
  const GOLD = '#d9b25f';
  const band = (y) => {
    let s = `<rect x="0" y="${y}" width="1200" height="190" fill="${LAPIS}"/>`;
    for (let x = 0; x <= 1200; x += 120) {
      s += star8(x, y + 95, 30, '#faf6ec', TURQ, GOLD);
      s += diamond(x + 60, y + 95, 11, GOLD);
      s += diamond(x + 60, y + 30, 5, TURQ) + diamond(x + 60, y + 160, 5, TURQ);
    }
    return s;
  };
  const layer = svgUrl(`
    ${band(0)}${band(1610)}
    ${hline(0, 1200, 198, GOLD, 3)}${hline(0, 1200, 1602, GOLD, 3)}
    <path d="M70 240 V1560 M1130 240 V1560" stroke="${LAPIS}" stroke-width=".9"/>
    ${hline(470, 575, 1105, TURQ)}${hline(625, 730, 1105, TURQ)}
    ${star8(600, 1105, 13, LAPIS, '#faf6ec', TURQ)}
  `);
  return {
    name: 'Girih',
    fonts: ['Marcellus', 'Great Vibes', 'Cormorant', 'Montserrat'],
    bg: '#faf6ec',
    color: LAPIS,
    layer,
    qrColors: { dark: LAPIS, light: '#faf6ec' },
    spec: {
      guest: { top: 280, h: 150, fit: [84, 56, 14], style: { fontStyle: 'italic' } },
      line: { top: 455, style: caps(20, 6, { fontFamily: 'Montserrat', fontWeight: 500, color: TURQ }) },
      caps: true,
      groom: { top: 555, h: 130, style: { fontFamily: 'Marcellus', fontSize: 104, letterSpacing: 8 } },
      amp: { top: 690, h: 100, style: { fontFamily: 'Great Vibes', fontSize: 100, color: '#b88a2c' } },
      bride: { top: 785, h: 130, style: { fontFamily: 'Marcellus', fontSize: 88, letterSpacing: 6 } },
      date: { top: 990, h: 60, style: { fontFamily: 'Marcellus', fontSize: 48, letterSpacing: 10, color: TURQ } },
      qr: { x: 485, y: 1235, size: 230 },
    },
  };
})();

export const designsA = [ravoq, minimal, deco, botanika, monogram, zamonaviy, suzana, zumrad, pushti, girih];
