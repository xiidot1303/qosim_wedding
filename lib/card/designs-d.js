/* eslint-disable @next/next/no-img-element -- Satori renders plain <img> only */
// Modern & graphic designs.
import { wedding } from '@/lib/config';
import { Qr, Text, fit, hline, r1, sparkle, svgUrl } from './kit';

const caps = (size, spacing, extra) => ({ fontSize: size, letterSpacing: spacing, textTransform: 'uppercase', ...extra });

// Deterministic pseudo-random numbers so every render of a design is identical.
function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

// Small standalone SVG (tape strips etc. that must sit above HTML content).
const miniSvg = (w, h, inner, defs = '') =>
  `data:image/svg+xml;base64,${Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs>${defs}</defs>${inner}</svg>`
  ).toString('base64')}`;

const Img = ({ src, x, y, w, h, style }) => (
  <img src={src} width={w} height={h} alt="" style={{ position: 'absolute', left: x, top: y, ...style }} />
);

const [DAY, MONTH, YEAR] = wedding.dateShort.split(' · ');

/* 31 ─ Bauhaus: primary geometry on a strict grid */
const bauhaus = (() => {
  const PAPER = '#efe9dd';
  const MUST = '#dda73b';
  const BRICK = '#b8452e';
  const BLUE = '#1f3b6d';
  const INK = '#1a1a1a';
  const layer = svgUrl(`
    <rect x="60" y="60" width="540" height="270" fill="${BLUE}"/>
    <path d="M195 330 A135 135 0 0 1 465 330 Z" fill="${MUST}"/>
    <path d="M600 330 V60 A270 270 0 0 1 870 330 Z" fill="${BRICK}"/>
    <circle cx="1005" cy="195" r="100" fill="${INK}"/>
    <circle cx="195" cy="465" r="135" fill="${MUST}"/>
    <rect x="330" y="330" width="270" height="270" fill="${INK}"/>
    <circle cx="465" cy="465" r="62" fill="${PAPER}"/>
    <rect x="600" y="330" width="540" height="270" fill="${BRICK}"/>
    <path d="M735 330 A135 135 0 0 0 1005 330 Z" fill="${BLUE}"/>
    <rect x="60" y="836" width="1080" height="8" fill="${INK}"/>
    <rect x="60" y="1470" width="270" height="270" fill="${BLUE}"/>
    <rect x="330" y="1470" width="270" height="270" fill="${MUST}"/>
    <rect x="600" y="1470" width="270" height="270" fill="${BRICK}"/>
    <rect x="870" y="1470" width="270" height="270" fill="none" stroke="${INK}" stroke-width="4"/>
    <rect x="60" y="1440" width="1080" height="4" fill="${INK}"/>
  `);
  const num = { fontFamily: 'Bebas', color: PAPER, lineHeight: 1 };
  return {
    name: 'Bauhaus',
    fonts: ['Bebas', 'Montserrat'],
    bg: PAPER,
    color: INK,
    font: 'Montserrat',
    layer,
    qrColors: { dark: INK, light: PAPER },
    custom: ({ name, qr }) => [
      <Text key="g" top={640} left={60} width={1080} height={130} align="left" style={{ fontWeight: 500, fontSize: fit(name, 66, 40, 18), lineHeight: 1.1 }}>
        {name}
      </Text>,
      <Text key="l" top={775} left={60} width={1080} height={40} align="left" style={caps(21, 4, { fontWeight: 500, color: BRICK })}>
        {wedding.cardLine}
      </Text>,
      <Text key="n1" top={870} left={54} width={1090} height={260} align="left" style={{ fontFamily: 'Bebas', fontSize: 270, lineHeight: 1 }}>
        <span>{wedding.groom.toUpperCase()}</span>
        <span style={{ color: BRICK, marginLeft: 30 }}>&amp;</span>
      </Text>,
      <Text key="n2" top={1140} left={54} width={1090} height={260} align="left" style={{ fontFamily: 'Bebas', fontSize: 228, lineHeight: 1, color: BLUE }}>
        {wedding.bride.toUpperCase()}
      </Text>,
      <Text key="d" top={1470} left={60} width={270} height={270} style={{ ...num, fontSize: 200 }}>
        {DAY}
      </Text>,
      <Text key="m" top={1470} left={330} width={270} height={270} style={{ ...num, fontSize: 200, color: INK }}>
        {MONTH}
      </Text>,
      <Text key="y" top={1470} left={600} width={270} height={270} style={{ ...num, fontSize: 130 }}>
        {YEAR}
      </Text>,
      <Qr key="q" src={qr} x={892} y={1492} size={226} />,
    ],
  };
})();

/* 32 ─ Terrazzo: speckled stone chips around a clean white panel */
const terrazzo = (() => {
  const TERRA = '#c26a4a';
  const SAGE = '#8c9e80';
  const rand = rng(32);
  const palette = ['#c9785a', '#c9785a', '#9fb093', '#9fb093', '#e9b8a8', '#e9b8a8', '#e9b8a8', '#3b3a38', '#d8b98f', '#f6e4d8'];
  let chips = '';
  for (let i = 0; i < 2600; i++) {
    const x = rand() * 1240 - 20;
    const y = rand() * 1840 - 20;
    const r = 3 + rand() ** 2.4 * 30;
    const fill = palette[Math.floor(rand() * palette.length)];
    if (x > 110 + r && x < 1090 - r && y > 150 + r && y < 1650 - r) continue;
    const n = 4 + Math.floor(rand() * 4);
    const rot = rand() * Math.PI * 2;
    let d = '';
    for (let k = 0; k < n; k++) {
      const a = rot + (k / n) * Math.PI * 2 + (rand() - 0.5) * 0.9;
      const rr = r * (0.55 + rand() * 0.45);
      d += `${k ? 'L' : 'M'}${r1(x + Math.cos(a) * rr)} ${r1(y + Math.sin(a) * rr * (0.7 + rand() * 0.3))}`;
    }
    chips += `<path d="${d}Z" fill="${fill}"/>`;
  }
  const layer = svgUrl(
    `
    ${chips}
    <rect x="116" y="162" width="980" height="1500" rx="40" fill="#5a4a40" fill-opacity=".22" filter="url(#sh)"/>
    <rect x="110" y="150" width="980" height="1500" rx="40" fill="#fffdf9"/>
    <path d="M552 1054 l14 -10 l12 6 l-4 13 l-16 2Z" fill="${TERRA}"/>
    <path d="M592 1046 l10 -3 l8 9 l-8 9 l-11 -4Z" fill="${SAGE}"/>
    <path d="M626 1050 l12 -4 l6 10 l-12 7Z" fill="#e9b8a8"/>
    ${hline(330, 520, 1054, '#d9cfc4', 1.5)}${hline(680, 870, 1054, '#d9cfc4', 1.5)}
  `,
    `<filter id="sh" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="14"/></filter>`
  );
  return {
    name: 'Terrazzo',
    fonts: ['DM Serif', 'Playfair', 'Montserrat'],
    bg: '#f4eee7',
    color: '#34302d',
    layer,
    qrColors: { dark: '#34302d', light: '#fffdf9' },
    spec: {
      guest: { top: 320, h: 150, maxWidth: 820, fit: [88, 56, 15], style: { fontFamily: 'Cormorant', fontStyle: 'italic' } },
      line: { top: 495, style: caps(19, 5, { fontFamily: 'Montserrat', fontWeight: 500, color: TERRA }) },
      groom: { top: 590, h: 175, style: { fontFamily: 'DM Serif', fontSize: 148, letterSpacing: -1 } },
      amp: { top: 755, h: 105, style: { fontFamily: 'DM Serif', fontStyle: 'italic', fontSize: 100, color: SAGE } },
      bride: { top: 845, h: 175, style: { fontFamily: 'DM Serif', fontSize: 126, letterSpacing: -1 } },
      date: { top: 1100, h: 60, style: { fontFamily: 'Montserrat', fontWeight: 500, fontSize: 36, letterSpacing: 12 } },
      qr: { x: 480, y: 1270, size: 240 },
    },
  };
})();

/* 33 ─ Aurora: glowing gradient mesh behind a frosted-glass card */
const aurora = (() => {
  const blobs = `
    <rect width="1200" height="1800" fill="#ece3f7"/>
    <ellipse cx="180" cy="260" rx="440" ry="380" fill="#7b5cff"/>
    <ellipse cx="760" cy="80" rx="330" ry="220" fill="#ffd68a"/>
    <ellipse cx="1120" cy="560" rx="420" ry="400" fill="#ff9f80"/>
    <ellipse cx="560" cy="980" rx="380" ry="320" fill="#c3a6ff"/>
    <ellipse cx="160" cy="1400" rx="460" ry="420" fill="#3fd6cf"/>
    <ellipse cx="1080" cy="1540" rx="420" ry="380" fill="#ff78b4"/>
    <ellipse cx="620" cy="1820" rx="360" ry="220" fill="#7fb4ff"/>
  `;
  const panel = 'M176 170 H1024 A56 56 0 0 1 1080 226 V1574 A56 56 0 0 1 1024 1630 H176 A56 56 0 0 1 120 1574 V226 A56 56 0 0 1 176 170 Z';
  const layer = svgUrl(
    `
    <g filter="url(#mesh)">${blobs}</g>
    <path d="${panel}" fill="#2a1f4f" fill-opacity=".10" transform="translate(0 16)" filter="url(#drop)"/>
    <g clip-path="url(#glass)"><g filter="url(#frost)">${blobs}</g></g>
    <path d="${panel}" fill="url(#sheen)"/>
    <path d="${panel}" fill="none" stroke="#ffffff" stroke-opacity=".8" stroke-width="2.5"/>
    ${sparkle(960, 100, 16, '#ffffff', 0.9)}${sparkle(1030, 72, 8, '#ffffff', 0.7)}
    ${sparkle(165, 1712, 14, '#ffffff', 0.9)}${sparkle(238, 1692, 7, '#ffffff', 0.7)}
    ${hline(520, 580, 1080, '#6b4fd8', 1.5)}${hline(620, 680, 1080, '#6b4fd8', 1.5)}<circle cx="600" cy="1080" r="4" fill="#ff7a59"/>
  `,
    `<filter id="mesh" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="110"/></filter>
     <filter id="frost" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="170"/></filter>
     <filter id="drop" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="30"/></filter>
     <clipPath id="glass"><path d="${panel}"/></clipPath>
     <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".62"/><stop offset=".5" stop-color="#ffffff" stop-opacity=".48"/><stop offset="1" stop-color="#ffffff" stop-opacity=".56"/></linearGradient>`
  );
  return {
    name: 'Aurora',
    fonts: ['Fraunces', 'Montserrat'],
    bg: '#ece3f7',
    color: '#2a1f4f',
    font: 'Montserrat',
    layer,
    qrColors: { dark: '#2a1f4f', light: '#ffffff' },
    spec: {
      guest: { top: 285, h: 150, maxWidth: 800, fit: [66, 42, 16], style: { fontWeight: 400 } },
      line: { top: 465, style: caps(19, 5, { fontWeight: 500, color: '#6b4fd8' }) },
      groom: { top: 560, h: 175, style: { fontFamily: 'Fraunces', fontWeight: 600, fontSize: 140, letterSpacing: -3 } },
      amp: { top: 725, h: 110, style: { fontFamily: 'Fraunces', fontStyle: 'italic', fontSize: 104, color: '#ff6f61' } },
      bride: { top: 820, h: 175, style: { fontFamily: 'Fraunces', fontWeight: 600, fontSize: 116, letterSpacing: -3 } },
      date: { top: 1115, h: 60, style: { fontWeight: 500, fontSize: 36, letterSpacing: 14 } },
      qr: { x: 480, y: 1260, size: 240, plate: { bg: '#ffffff', pad: 24, radius: 28 } },
    },
  };
})();

/* 34 ─ Bir chiziq: one continuous ink line drawing two rings */
const birchiziq = (() => {
  const INK = '#1d1d1f';
  const y = 790;
  const R = 128;
  const ring = (cx) => `H${cx} A${R} ${R} 0 0 1 ${cx} ${y - 2 * R} A${R} ${R} 0 0 1 ${cx} ${y}`;
  const heart = (x) => `H${x} C${x + 18} ${y - 30} ${x + 70} ${y - 66} ${x + 60} ${y - 104} C${x + 52} ${y - 132} ${x + 18} ${y - 128} ${x} ${y - 98} C${x - 18} ${y - 128} ${x - 52} ${y - 132} ${x - 60} ${y - 104} C${x - 70} ${y - 66} ${x - 18} ${y - 30} ${x} ${y}`;
  const path = `M100 ${y - 30} C150 ${y - 30} 170 ${y} 230 ${y} H250 C305 ${y} 318 ${y - 66} 286 ${y - 66} C254 ${y - 66} 262 ${y} 340 ${y} ${ring(520)} ${ring(680)} ${heart(930)} H990 C1040 ${y} 1060 ${y + 24} 1100 ${y + 24}`;
  const layer = svgUrl(`
    <path d="${path}" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  `);
  return {
    name: 'Bir chiziq',
    fonts: ['Josefin', 'Cormorant', 'Montserrat'],
    bg: '#fbfaf7',
    color: INK,
    layer,
    qrColors: { dark: INK, light: '#fbfaf7' },
    spec: {
      guest: { top: 220, h: 150, fit: [84, 56, 14], style: { fontStyle: 'italic' } },
      line: { top: 400, style: caps(19, 6, { fontFamily: 'Montserrat', color: '#8a8a8a' }) },
      caps: true,
      groom: { top: 870, h: 120, style: { fontFamily: 'Josefin', fontWeight: 300, fontSize: 96, letterSpacing: 22, paddingLeft: 22 } },
      amp: { top: 985, h: 90, style: { fontSize: 76, fontStyle: 'italic', fontWeight: 300, color: '#8a8a8a' } },
      bride: { top: 1070, h: 120, style: { fontFamily: 'Josefin', fontWeight: 300, fontSize: 80, letterSpacing: 18, paddingLeft: 18 } },
      date: { top: 1255, h: 50, style: { fontFamily: 'Montserrat', fontWeight: 300, fontSize: 30, letterSpacing: 16, paddingLeft: 16 } },
      qr: { x: 490, y: 1390, size: 220 },
    },
  };
})();

/* 35 ─ Polaroid: instant photo taped onto kraft paper */
const polaroid = (() => {
  const PX = 180;
  const PY = 150;
  const PW = 840;
  const PH = 1010;
  const ROT = -3;
  const cx = PX + PW / 2;
  const cy = PY + PH / 2;
  const rand = rng(35);
  let specks = '';
  for (let i = 0; i < 900; i++) {
    const light = rand() < 0.35;
    specks += `<circle cx="${r1(rand() * 1200)}" cy="${r1(rand() * 1800)}" r="${r1(0.6 + rand() * 1.6)}" fill="${light ? '#f3dfbf' : '#7a5634'}" fill-opacity="${r1(0.15 + rand() * 0.3)}"/>`;
  }
  for (let i = 0; i < 160; i++) {
    const x = rand() * 1200;
    const yy = rand() * 1800;
    const a = rand() * Math.PI;
    const l = 8 + rand() * 18;
    specks += `<path d="M${r1(x)} ${r1(yy)} l${r1(Math.cos(a) * l)} ${r1(Math.sin(a) * l)}" stroke="#6d4b2c" stroke-opacity=".18" stroke-width="1"/>`;
  }
  const ph = { x: PX + 50, y: PY + 50, w: PW - 100, h: 730 };
  const photo = `
    <rect x="${ph.x}" y="${ph.y}" width="${ph.w}" height="${ph.h}" fill="url(#sky)"/>
    <g clip-path="url(#photo)">
      <circle cx="${ph.x + 540}" cy="${ph.y + 520}" r="120" fill="#fff4e3" fill-opacity=".8"/>
      <path d="M${ph.x} ${ph.y + 600} C${ph.x + 200} ${ph.y + 540} ${ph.x + 420} ${ph.y + 620} ${ph.x + ph.w} ${ph.y + 560} V${ph.y + ph.h} H${ph.x}Z" fill="#e6b7b4" fill-opacity=".9"/>
      <path d="M${ph.x} ${ph.y + 660} C${ph.x + 260} ${ph.y + 610} ${ph.x + 500} ${ph.y + 690} ${ph.x + ph.w} ${ph.y + 640} V${ph.y + ph.h} H${ph.x}Z" fill="#c99aa9"/>
      ${sparkle(ph.x + 110, ph.y + 120, 16, '#ffffff', 0.85)}${sparkle(ph.x + 640, ph.y + 90, 11, '#ffffff', 0.8)}${sparkle(ph.x + 600, ph.y + 250, 7, '#ffffff', 0.7)}
    </g>
    <rect x="${ph.x}" y="${ph.y}" width="${ph.w}" height="${ph.h}" fill="none" stroke="#000" stroke-opacity=".06" stroke-width="2"/>
  `;
  const tape = (x, y, a, fill, stripe) => `<g transform="translate(${x} ${y}) rotate(${a})">
      <rect x="-95" y="-26" width="190" height="52" fill="${fill}" fill-opacity=".78"/>
      ${[-70, -40, -10, 20, 50, 80].map((sx) => `<path d="M${sx} -26 l-18 52" stroke="${stripe}" stroke-opacity=".55" stroke-width="9"/>`).join('')}
    </g>`;
  const layer = svgUrl(
    `
    ${specks}
    <g transform="rotate(${ROT} ${cx} ${cy})">
      <rect x="${PX + 6}" y="${PY + 18}" width="${PW}" height="${PH}" fill="#3a2410" fill-opacity=".35" filter="url(#sh)"/>
      <rect x="${PX}" y="${PY}" width="${PW}" height="${PH}" fill="#fdfcf8"/>
      ${photo}
      ${tape(PX + 20, PY + 20, -38, '#f3c6cf', '#ffffff')}
      ${tape(PX + PW - 20, PY + 20, 38, '#bfe3d4', '#ffffff')}
    </g>
  `,
    `<filter id="sh" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="16"/></filter>
     <clipPath id="photo"><rect x="${ph.x}" y="${ph.y}" width="${ph.w}" height="${ph.h}"/></clipPath>
     <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfd6ea"/><stop offset=".55" stop-color="#f4d3cf"/><stop offset="1" stop-color="#f8e2cf"/></linearGradient>`
  );
  const noteTape = miniSvg(
    200,
    60,
    `<g transform="rotate(-4 100 30)"><rect x="12" y="12" width="176" height="36" fill="#f6dd8f" fill-opacity=".8"/>${[30, 60, 90, 120, 150].map((x) => `<circle cx="${x}" cy="30" r="5" fill="#ffffff" fill-opacity=".7"/>`).join('')}</g>`
  );
  const glow = '0 1px 3px rgba(100,50,80,0.35), 0 2px 16px rgba(100,50,80,0.45)';
  return {
    name: 'Polaroid',
    fonts: ['Dancing', 'Caveat', 'Plex Mono'],
    bg: 'radial-gradient(ellipse at 40% 35%, #d8b88f 0%, #c49d70 60%, #b28a5e 100%)',
    color: '#3a2a1c',
    font: 'Caveat',
    layer,
    qrColors: { dark: '#2d2620', light: '#ffffff' },
    custom: ({ name, qr }) => [
      <div key="p" style={{ position: 'absolute', left: PX, top: PY, width: PW, height: PH, display: 'flex', transform: `rotate(${ROT}deg)` }}>
        <Text top={170} left={50} width={PW - 100} height={190} style={{ fontFamily: 'Dancing', fontSize: 140, color: '#ffffff', textShadow: glow }}>
          {wedding.groom}
        </Text>
        <Text top={345} left={50} width={PW - 100} height={90} style={{ fontFamily: 'Dancing', fontSize: 80, color: '#ffffff', textShadow: glow }}>
          &amp;
        </Text>
        <Text top={425} left={50} width={PW - 100} height={170} style={{ fontFamily: 'Dancing', fontSize: 118, color: '#ffffff', textShadow: glow }}>
          {wedding.bride}
        </Text>
        <Text top={706} left={390} width={380} height={50} align="right" style={{ fontFamily: 'Plex Mono', fontWeight: 500, fontSize: 36, letterSpacing: 2, color: '#ff7a1f', textShadow: '0 0 4px rgba(255,110,20,0.9), 0 0 10px rgba(255,140,40,0.6)' }}>
          {`${DAY} ${MONTH} ${YEAR}`}
        </Text>
        <Text top={800} left={50} width={PW - 100} height={190} maxWidth={700} style={{ fontSize: fit(name, 78, 54, 16), lineHeight: 1.05, color: '#2b2b3a' }}>
          {name}
        </Text>
      </div>,
      <Text key="l" top={1215} height={70} style={{ fontSize: 52, color: '#3a2a1c' }}>
        {wedding.cardLine}
      </Text>,
      <Qr key="q" src={qr} x={480} y={1390} size={240} plate={{ bg: '#ffffff', pad: 28 }} />,
      <Img key="t" src={noteTape} x={500} y={1332} w={200} h={60} />,
    ],
  };
})();

/* 36 ─ Chipta: a wedding ticket with tear-off stub */
const chipta = (() => {
  const NAVY = '#1c2b45';
  const CORAL = '#e2604a';
  const SUN = '#f0b44c';
  const PAPER = '#fbf5ea';
  const L = 90;
  const R = 1110;
  const T = 80;
  const B = 1720;
  const PY = 1290;
  const rr = 30;
  const n = 36;
  const shape = `M${L + rr} ${T} H${R - rr} A${rr} ${rr} 0 0 1 ${R} ${T + rr} V${PY - n} A${n} ${n} 0 0 0 ${R} ${PY + n} V${B - rr} A${rr} ${rr} 0 0 1 ${R - rr} ${B} H${L + rr} A${rr} ${rr} 0 0 1 ${L} ${B - rr} V${PY + n} A${n} ${n} 0 0 0 ${L} ${PY - n} V${T + rr} A${rr} ${rr} 0 0 1 ${L + rr} ${T} Z`;
  const rand = rng(36);
  let bars = '';
  for (let x = 470; x < 1050; ) {
    const w = [3, 3, 5, 7, 10][Math.floor(rand() * 5)];
    bars += `<rect x="${x}" y="1390" width="${w}" height="190" fill="${NAVY}"/>`;
    x += w + [4, 6, 8, 11][Math.floor(rand() * 4)];
  }
  let perf = '';
  for (let x = L + n + 18; x <= R - n - 14; x += 24) perf += `<circle cx="${x}" cy="${PY}" r="5"/>`;
  let dots = '';
  for (let yy = 40; yy < 1800; yy += 48) for (let x = 24 + ((yy / 48) % 2) * 24; x < 1200; x += 48) dots += `<circle cx="${x}" cy="${yy}" r="2.2"/>`;
  const box = (x, w) => `<rect x="${x}" y="1030" width="${w}" height="170" rx="14" fill="none" stroke="${NAVY}" stroke-width="3"/>`;
  const layer = svgUrl(
    `
    <g fill="#ffffff" fill-opacity=".06">${dots}</g>
    <path d="${shape}" fill="#000" fill-opacity=".45" transform="translate(0 14)" filter="url(#sh)"/>
    <path d="${shape}" fill="${PAPER}"/>
    <g clip-path="url(#tk)">
      <rect x="0" y="0" width="1200" height="250" fill="${CORAL}"/>
      <rect x="0" y="250" width="1200" height="10" fill="${SUN}"/>
      <rect x="0" y="1690" width="1200" height="30" fill="${CORAL}"/>
      <rect x="0" y="1680" width="1200" height="10" fill="${SUN}"/>
    </g>
    <path d="M150 435 H1050" stroke="${NAVY}" stroke-opacity=".25" stroke-width="2"/>
    <circle cx="165" cy="735" r="13" fill="none" stroke="${NAVY}" stroke-width="4"/>
    <circle cx="1035" cy="735" r="13" fill="${NAVY}"/>
    <path d="M190 735 H530 M670 735 H1010" stroke="${NAVY}" stroke-width="4" stroke-dasharray="2 14" stroke-linecap="round"/>
    <circle cx="600" cy="735" r="58" fill="${CORAL}"/>
    ${box(150, 250)}${box(425, 250)}${box(700, 350)}
    <g fill="${NAVY}" fill-opacity=".45">${perf}</g>
    ${bars}
    <path d="M470 1612 H1050" stroke="${NAVY}" stroke-width="3"/>
    <path d="M470 1630 H760" stroke="${CORAL}" stroke-width="6"/>
  `,
    `<filter id="sh" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="18"/></filter>
     <clipPath id="tk"><path d="${shape}"/></clipPath>`
  );
  const mono = { fontFamily: 'Plex Mono', fontWeight: 500 };
  return {
    name: 'Chipta',
    fonts: ['Abril', 'Plex Mono', 'Montserrat'],
    bg: 'linear-gradient(160deg, #26395c 0%, #16223a 100%)',
    color: NAVY,
    font: 'Plex Mono',
    layer,
    qrColors: { dark: NAVY, light: PAPER },
    custom: ({ name, qr }) => [
      <Text key="l" top={130} left={L} width={R - L} height={80} maxWidth={880} style={caps(24, 3, { ...mono, color: PAPER, lineHeight: 1.3 })}>
        {wedding.cardLine}
      </Text>,
      <Text key="g" top={290} left={150} width={900} height={130} align="left" style={{ ...mono, fontSize: fit(name, 60, 40, 16), lineHeight: 1.12 }}>
        {name}
      </Text>,
      <Text key="n1" top={475} left={150} width={900} height={190} align="left" style={{ fontFamily: 'Abril', fontSize: 150 }}>
        {wedding.groom}
      </Text>,
      <Text key="a" top={690} left={542} width={116} height={90} style={{ fontFamily: 'Abril', fontSize: 72, color: PAPER }}>
        &amp;
      </Text>,
      <Text key="n2" top={795} left={150} width={900} height={190} align="right" style={{ fontFamily: 'Abril', fontSize: 132 }}>
        {wedding.bride}
      </Text>,
      <Text key="d" top={1030} left={150} width={250} height={170} style={{ ...mono, fontSize: 104 }}>
        {DAY}
      </Text>,
      <Text key="m" top={1030} left={425} width={250} height={170} style={{ ...mono, fontSize: 104 }}>
        {MONTH}
      </Text>,
      <Text key="y" top={1030} left={700} width={350} height={170} style={{ ...mono, fontSize: 104, color: CORAL }}>
        {YEAR}
      </Text>,
      <Qr key="q" src={qr} x={150} y={1370} size={250} />,
    ],
  };
})();

/* 37 ─ Gazeta: vintage newspaper front page */
const gazeta = (() => {
  const INK = '#1f1d1a';
  const BAR = '#bdb5a5';
  const rand = rng(37);
  // Grey bars that read as set type in a column.
  function column(x, w, y0, y1, head = false) {
    let s = '';
    let y = y0;
    if (head) {
      s += `<rect x="${x}" y="${y}" width="${r1(w * 0.9)}" height="18" fill="${INK}" fill-opacity=".75"/><rect x="${x}" y="${y + 28}" width="${r1(w * 0.6)}" height="18" fill="${INK}" fill-opacity=".75"/>`;
      y += 72;
    }
    let left = 5 + Math.floor(rand() * 7);
    let indent = 0;
    while (y + 9 <= y1) {
      const last = left === 0;
      const len = last ? w * (0.3 + rand() * 0.5) : w;
      s += `<rect x="${x + indent}" y="${y}" width="${r1(len - indent)}" height="9" fill="${BAR}"/>`;
      indent = 0;
      y += 21;
      if (last) {
        y += 10;
        left = 5 + Math.floor(rand() * 8);
        indent = 24;
      } else left -= 1;
    }
    return s;
  }
  let halftone = '';
  for (let yy = 950; yy < 1370; yy += 14) {
    for (let x = 448; x < 1112; x += 14) {
      const d = Math.hypot(x - 780, yy - 1160) / 420;
      const r = Math.min(5.6, 1 + d * 4.2);
      halftone += `<circle cx="${x}" cy="${yy}" r="${r1(r)}"/>`;
    }
  }
  let grain = '';
  for (let i = 0; i < 700; i++) grain += `<circle cx="${r1(rand() * 1200)}" cy="${r1(rand() * 1800)}" r="${r1(0.5 + rand())}" fill="#6b5f4a" fill-opacity="${r1(0.08 + rand() * 0.18)}"/>`;
  const ear = (x) => `<rect x="${x}" y="98" width="200" height="56" fill="none" stroke="${INK}" stroke-width="1.5"/>
    <rect x="${x + 16}" y="112" width="168" height="8" fill="${BAR}"/><rect x="${x + 16}" y="126" width="140" height="8" fill="${BAR}"/><rect x="${x + 16}" y="140" width="100" height="6" fill="${BAR}"/>`;
  const layer = svgUrl(`
    ${grain}
    ${hline(70, 1130, 72, INK, 6)}${hline(70, 1130, 84, INK, 1.4)}
    ${ear(80)}${ear(920)}
    ${hline(70, 1130, 170, INK, 1.4)}${hline(70, 1130, 180, INK, 4)}
    ${hline(70, 1130, 696, INK, 1.4)}
    ${hline(70, 1130, 900, INK, 4)}${hline(70, 1130, 910, INK, 1.4)}
    <path d="M430 940 V1720 M790 1400 V1720" stroke="${INK}" stroke-width="1"/>
    ${column(80, 330, 945, 1720, true)}
    <rect x="448" y="945" width="664" height="430" fill="#e7e0d0" stroke="${INK}" stroke-width="1.5"/>
    <g fill="${INK}" fill-opacity=".32" clip-path="url(#ph)">${halftone}</g>
    ${column(448, 324, 1405, 1720, true)}
    ${column(808, 304, 1405, 1720)}
    ${hline(70, 1130, 1740, INK, 1.4)}${hline(70, 1130, 1750, INK, 4)}
  `, `<clipPath id="ph"><rect x="449" y="946" width="662" height="428"/></clipPath>`);
  return {
    name: 'Gazeta',
    fonts: ['Fraktur', 'Old Standard', 'Playfair'],
    bg: 'radial-gradient(ellipse at 50% 40%, #f3eee2 0%, #e9e1cf 100%)',
    color: INK,
    font: 'Old Standard',
    layer,
    qrColors: { dark: INK, light: '#f7f3ea' },
    custom: ({ name, qr }) => [
      <Text key="d" top={98} left={300} width={600} height={60} style={{ fontSize: 34, letterSpacing: 8 }}>
        {wedding.dateShort}
      </Text>,
      <Text key="n1" top={190} height={230} style={{ fontFamily: 'Fraktur', fontSize: 200, lineHeight: 1 }}>
        {wedding.groom}
      </Text>,
      <Text key="a" top={405} height={80} style={{ fontStyle: 'italic', fontSize: 70, lineHeight: 1 }}>
        &amp;
      </Text>,
      <Text key="n2" top={470} height={210} style={{ fontFamily: 'Fraktur', fontSize: 172, lineHeight: 1 }}>
        {wedding.bride}
      </Text>,
      <Text key="g" top={712} height={120} maxWidth={1000} style={{ fontFamily: 'Cormorant', fontStyle: 'italic', fontSize: fit(name, 80, 48, 18), lineHeight: 1.1 }}>
        {name}
      </Text>,
      <Text key="l" top={840} height={44} style={caps(22, 5)}>
        {wedding.cardLine}
      </Text>,
      <Qr key="q" src={qr} x={660} y={1040} size={240} plate={{ bg: '#f7f3ea', pad: 20, border: `1.5px solid ${INK}` }} />,
    ],
  };
})();

/* 38 ─ Neon: glowing tubes on a dark brick wall */
const neon = (() => {
  const PINK = '#ff4fa3';
  const CYAN = '#3fe0ff';
  const rand = rng(38);
  let bricks = '';
  for (let row = 0, y = -20; y < 1800; row++, y += 72) {
    for (let x = row % 2 ? -90 : 0; x < 1200; x += 180) {
      const v = Math.floor(rand() * 4);
      const fill = ['#2c2220', '#33271f', '#2a211f', '#3a2b24'][v];
      bricks += `<rect x="${x + 3}" y="${y + 3}" width="174" height="66" rx="3" fill="${fill}"/>`;
    }
  }
  const heart = 'M0 96 C-44 60 -150 -6 -150 -78 C-150 -138 -96 -166 -56 -152 C-26 -142 -8 -116 0 -96 C8 -116 26 -142 56 -152 C96 -166 150 -138 150 -78 C150 -6 44 60 0 96 Z';
  const tube = (d, color, core, t = '') => `<g ${t}>
      <path d="${d}" fill="none" stroke="${color}" stroke-width="26" stroke-opacity=".55" filter="url(#g2)"/>
      <path d="${d}" fill="none" stroke="${color}" stroke-width="12" filter="url(#g1)"/>
      <path d="${d}" fill="none" stroke="${core}" stroke-width="5" stroke-linecap="round"/>
    </g>`;
  const frame = 'M468 1368 H732 A26 26 0 0 1 758 1394 V1666 A26 26 0 0 1 732 1692 H468 A26 26 0 0 1 442 1666 V1394 A26 26 0 0 1 468 1368 Z';
  const layer = svgUrl(
    `
    <rect width="1200" height="1800" fill="#120e0d"/>
    ${bricks}
    <rect width="1200" height="1800" fill="url(#spill)"/>
    <rect width="1200" height="1800" fill="url(#vig)"/>
    ${tube(heart, PINK, '#ffe0f0', 'transform="translate(600 300) scale(1.05)"')}
    ${tube(frame, CYAN, '#e3fbff')}
  `,
    `<filter id="g1" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="6"/></filter>
     <filter id="g2" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="22"/></filter>
     <radialGradient id="spill" cx=".5" cy=".38" r=".6"><stop offset="0" stop-color="#ff3d9a" stop-opacity=".22"/><stop offset=".6" stop-color="#6a2d7a" stop-opacity=".08"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
     <radialGradient id="vig" cx=".5" cy=".5" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".7"/></radialGradient>`
  );
  const glow = (c) => `0 0 3px #ffffff, 0 0 8px ${c}, 0 0 16px ${c}, 0 0 30px ${c}`;
  return {
    name: 'Neon',
    fonts: ['Pacifico', 'Monoton', 'Montserrat'],
    bg: '#120e0d',
    color: '#ffffff',
    font: 'Montserrat',
    layer,
    qrColors: { dark: '#16101a', light: '#fbf7fa' },
    custom: ({ name, qr }) => [
      <Text key="g" top={470} height={150} maxWidth={900} style={{ fontFamily: 'Pacifico', fontSize: fit(name, 64, 44, 17), lineHeight: 1.3, color: '#effcff', textShadow: glow(CYAN) }}>
        {name}
      </Text>,
      <Text key="l" top={640} height={44} style={caps(19, 5, { fontWeight: 500, color: '#f6e9f1', textShadow: '0 0 12px rgba(255,79,163,0.8)' })}>
        {wedding.cardLine}
      </Text>,
      <Text key="n1" top={700} height={230} style={{ fontFamily: 'Pacifico', fontSize: 132, color: '#fff0f8', textShadow: glow(PINK) }}>
        {wedding.groom}
      </Text>,
      <Text key="a" top={905} height={110} style={{ fontFamily: 'Pacifico', fontSize: 76, color: '#fff8de', textShadow: glow('#ffc93f') }}>
        &amp;
      </Text>,
      <Text key="n2" top={990} height={210} style={{ fontFamily: 'Pacifico', fontSize: 112, color: '#fff0f8', textShadow: glow(PINK) }}>
        {wedding.bride}
      </Text>,
      <Text key="d" top={1225} height={110} style={{ fontFamily: 'Monoton', fontSize: 70, letterSpacing: 4, color: '#effcff', textShadow: glow(CYAN) }}>
        {`${DAY}.${MONTH}.${YEAR}`}
      </Text>,
      <Qr key="q" src={qr} x={480} y={1410} size={240} plate={{ bg: '#fbf7fa', pad: 18, radius: 14 }} />,
    ],
  };
})();

/* 39 ─ Memphis: playful 80s shapes, squiggles and confetti */
const memphis = (() => {
  const INK = '#1b1b1b';
  const PINK = '#f7a8c4';
  const MINT = '#8fd6c3';
  const YEL = '#ffd166';
  const LILAC = '#b9a6f2';
  const BLUE = '#6fb3f2';
  const dotGrid = (x, y, cols, rows, gap, r, fill) => {
    let s = '';
    for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) s += `<circle cx="${x + i * gap}" cy="${y + j * gap}" r="${r}" fill="${fill}"/>`;
    return s;
  };
  const squiggle = (x, y, n, amp, step, stroke, w = 8) => {
    let d = `M${x} ${y}`;
    for (let i = 0; i < n; i++) d += ` q${step / 2} ${i % 2 ? amp : -amp} ${step} 0`;
    return `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round"/>`;
  };
  const zigzag = (x, y, n, h, step, stroke, w = 8) => {
    let d = `M${x} ${y}`;
    for (let i = 0; i < n; i++) d += ` l${step} ${i % 2 ? h : -h}`;
    return `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
  };
  const zigzagV = (x, y, n, h, step, stroke, w = 8) => {
    let d = `M${x} ${y}`;
    for (let i = 0; i < n; i++) d += ` l${i % 2 ? h : -h} ${step}`;
    return `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
  };
  const confetti = [
    [110, 820, 30, PINK], [1100, 790, -25, BLUE], [95, 1140, 60, YEL], [1100, 1060, 15, MINT], [1085, 1380, -50, PINK], [105, 1420, 20, LILAC],
    [470, 110, 40, BLUE], [720, 250, -30, PINK], [300, 1690, 25, MINT], [880, 1560, -40, YEL],
  ]
    .map(([x, y, a, c]) => `<rect x="${x - 22}" y="${y - 6}" width="44" height="12" rx="6" fill="${c}" transform="rotate(${a} ${x} ${y})"/>`)
    .join('');
  const layer = svgUrl(`
    ${dotGrid(250, 90, 7, 4, 26, 4, INK)}
    <circle cx="170" cy="190" r="100" fill="${PINK}"/>
    <path d="M70 190 A100 100 0 0 1 270 190" fill="none" stroke="${INK}" stroke-width="7" transform="translate(14 14)"/>
    ${squiggle(520, 180, 5, 34, 60, INK)}
    <path d="M985 90 L1110 290 L860 290 Z" fill="${YEL}"/>
    <path d="M985 90 L1110 290 L860 290 Z" fill="none" stroke="${INK}" stroke-width="7" stroke-linejoin="round" transform="translate(-16 12)"/>
    ${zigzagV(96, 470, 12, 36, 24, MINT, 10)}
    ${dotGrid(1080, 520, 2, 8, 26, 4.5, INK)}
    <circle cx="1122" cy="1250" r="40" fill="none" stroke="${INK}" stroke-width="7"/>
    <circle cx="1134" cy="1238" r="40" fill="${LILAC}" fill-opacity=".85"/>
    <path d="M60 1800 V1570 A230 230 0 0 1 290 1800 Z" fill="${BLUE}"/>
    ${dotGrid(360, 1600, 6, 5, 26, 4, INK)}
    ${squiggle(540, 1650, 5, 30, 56, PINK, 10)}
    <path d="M870 1650 l90 0 l-45 -80 Z" fill="none" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
    <rect x="1010" y="1600" width="120" height="120" fill="${MINT}"/>
    ${zigzag(1020, 1640, 4, 26, 26, INK, 6)}
    ${confetti}
    <rect x="168" y="358" width="900" height="1150" rx="28" fill="${INK}"/>
    <rect x="150" y="340" width="900" height="1150" rx="28" fill="#ffffff" stroke="${INK}" stroke-width="7"/>
    <circle cx="600" cy="832" r="56" fill="${YEL}" stroke="${INK}" stroke-width="6"/>
    ${squiggle(420, 1115, 6, 14, 60, PINK, 7)}
  `);
  return {
    name: 'Memphis',
    fonts: ['Unbounded', 'Montserrat'],
    bg: '#fff5e8',
    color: INK,
    font: 'Unbounded',
    layer,
    qrColors: { dark: INK, light: '#ffffff' },
    custom: ({ name, qr }) => [
      <Text key="g" top={400} left={150} width={900} height={140} maxWidth={780} style={{ fontFamily: 'Montserrat', fontWeight: 500, fontSize: fit(name, 62, 38, 16), lineHeight: 1.15 }}>
        {name}
      </Text>,
      <Text key="l" top={550} left={150} width={900} height={40} style={caps(17, 3, { fontFamily: 'Montserrat', fontWeight: 500, color: '#6a6a6a' })}>
        {wedding.cardLine}
      </Text>,
      <Text key="n1" top={620} left={150} width={900} height={150} style={{ fontWeight: 700, fontSize: 100, letterSpacing: -2, textShadow: `6px 6px 0 ${PINK}` }}>
        {wedding.groom}
      </Text>,
      <Text key="a" top={782} left={544} width={112} height={100} style={{ fontWeight: 700, fontSize: 60 }}>
        &amp;
      </Text>,
      <Text key="n2" top={895} left={150} width={900} height={140} style={{ fontWeight: 700, fontSize: 80, letterSpacing: -2, textShadow: `6px 6px 0 ${MINT}` }}>
        {wedding.bride}
      </Text>,
      <Text key="d" top={1040} left={150} width={900} height={60} style={{ fontSize: 38, letterSpacing: 6 }}>
        {wedding.dateShort}
      </Text>,
      <Qr key="q" src={qr} x={480} y={1170} size={240} />,
    ],
  };
})();

/* 40 ─ Qog'oz: layered paper-cut waves */
const qogoz = (() => {
  const TXT = '#3d4470';
  const tones = ['#e6e8f5', '#cfd4ec', '#b4bce0', '#959fcf', '#7680b8', '#5b649c'];
  // A soft wave across the full width, filled down to the bottom edge.
  const wave = (y, amp, phase, fill) => {
    const step = 300;
    let x = -300 + Math.round(phase * 110);
    let d = `M-300 ${y} H${x}`;
    for (let i = 0; x < 1500; i++, x += step) {
      const dy = (i % 2 ? amp : -amp) * (1 + 0.3 * Math.sin(i * 1.7 + phase));
      d += ` C${r1(x + step * 0.35)} ${r1(y + dy)} ${r1(x + step * 0.65)} ${r1(y + dy)} ${x + step} ${y}`;
    }
    return `<path d="${d} V1900 H-300 Z" fill="${fill}" filter="url(#sh)"/>`;
  };
  const top = (y, amp, phase, fill) => `<g transform="rotate(180 600 900)">${wave(1800 - y, amp, phase, fill)}</g>`;
  const layer = svgUrl(
    `
    ${top(110, 26, 1.3, '#dfe2f2')}${top(60, 22, 0.4, '#cdd2ea')}
    <circle cx="600" cy="1370" r="170" fill="#f6c9b0" filter="url(#sh)"/>
    ${wave(1300, 50, 0.2, tones[0])}
    ${wave(1380, 46, 1.1, tones[1])}
    ${wave(1460, 52, 2.0, tones[2])}
    ${wave(1545, 44, 0.7, tones[3])}
    ${wave(1630, 48, 1.6, tones[4])}
    ${wave(1720, 40, 2.4, tones[5])}
    ${hline(250, 350, 1075, '#959fcf', 1.5)}${hline(850, 950, 1075, '#959fcf', 1.5)}
    <rect x="462" y="1428" width="284" height="284" rx="20" fill="#2c3160" fill-opacity=".3" filter="url(#blur)"/>
  `,
    `<filter id="sh" filterUnits="userSpaceOnUse" x="-100" y="-100" width="1400" height="2000"><feGaussianBlur in="SourceAlpha" stdDeviation="12"/><feOffset dy="-8"/><feComponentTransfer><feFuncA type="linear" slope=".35"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
     <filter id="blur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="10"/></filter>`
  );
  return {
    name: 'Qog‘oz',
    fonts: ['Playball', 'Prata', 'Josefin'],
    bg: 'linear-gradient(180deg, #f5f1f7 0%, #fbf3ee 100%)',
    color: TXT,
    font: 'Prata',
    layer,
    qrColors: { dark: TXT, light: '#ffffff' },
    spec: {
      guest: { top: 230, h: 150, fit: [80, 52, 15], style: { fontFamily: 'Cormorant', fontWeight: 500 } },
      line: { top: 405, style: caps(20, 6, { fontFamily: 'Josefin', color: '#6c76ae' }) },
      groom: { top: 480, h: 210, style: { fontFamily: 'Playball', fontSize: 164 } },
      amp: { top: 670, h: 100, style: { fontFamily: 'Playball', fontSize: 90, color: '#e59a78' } },
      bride: { top: 750, h: 210, style: { fontFamily: 'Playball', fontSize: 146 } },
      date: { top: 1045, h: 60, style: { fontSize: 44, letterSpacing: 10, paddingLeft: 10 } },
      qr: { x: 480, y: 1440, size: 240, plate: { bg: '#ffffff', pad: 22, radius: 20 } },
    },
  };
})();

export const designsD = [bauhaus, terrazzo, aurora, birchiziq, polaroid, chipta, gazeta, neon, memphis, qogoz];
