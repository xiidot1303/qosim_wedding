import { diamond, hline, leaf, r1, sparkle, svgUrl } from './kit';

const caps = (size, spacing, extra) => ({ fontSize: size, letterSpacing: spacing, textTransform: 'uppercase', ...extra });

// Deterministic pseudo-random numbers so every render of a design is identical.
function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

/* 11 ─ Gulchambar: laurel wreath around the names */
const gulchambar = (() => {
  const OLIVE = '#7f8f5f';
  const GOLD = '#b59a74';
  const cx = 600;
  const cy = 810;
  const R = 372;
  const pt = (deg, rr = R) => [cx + Math.cos((deg * Math.PI) / 180) * rr, cy + Math.sin((deg * Math.PI) / 180) * rr];
  function branch(from, to, dir) {
    const [x0, y0] = pt(from);
    const [x1, y1] = pt(to);
    let s = `<path d="M${r1(x0)} ${r1(y0)} A${R} ${R} 0 0 ${dir > 0 ? 1 : 0} ${r1(x1)} ${r1(y1)}" fill="none" stroke="${OLIVE}" stroke-width="2"/>`;
    const steps = Math.abs(to - from) / 9;
    for (let i = 0; i <= steps; i++) {
      const deg = from + dir * i * 9;
      const t = (deg * Math.PI) / 180;
      const [x, y] = pt(deg);
      const growth = (Math.atan2(dir * Math.cos(t), -dir * Math.sin(t)) * 180) / Math.PI;
      const len = 40 - (i / steps) * 16;
      s += leaf(r1(x), r1(y), r1(len), r1(growth - 38), OLIVE, 'fill-opacity=".8"');
      s += leaf(r1(x), r1(y), r1(len * 0.9), r1(growth + 38), OLIVE, 'fill-opacity=".55"');
      if (i % 4 === 2) {
        const [bx, by] = pt(deg, R + 30);
        s += `<circle cx="${r1(bx)}" cy="${r1(by)}" r="5" fill="${GOLD}"/>`;
      }
    }
    return s;
  }
  const layer = svgUrl(`
    ${branch(100, 258, 1)}${branch(80, -78, -1)}
    <path d="M${r1(pt(100)[0])} ${r1(pt(100)[1])} Q600 1222 ${r1(pt(80)[0])} ${r1(pt(80)[1])}" fill="none" stroke="${OLIVE}" stroke-width="2"/>
    ${diamond(600, 1203, 7, GOLD)}
    ${hline(330, 420, 1275, GOLD)}${hline(780, 870, 1275, GOLD)}
  `);
  return {
    name: 'Gulchambar',
    fonts: ['Tangerine', 'Cormorant', 'Montserrat'],
    bg: '#fbf8f2',
    color: '#2f2a24',
    layer,
    qrColors: { dark: '#2f2a24', light: '#fbf8f2' },
    spec: {
      guest: { top: 170, h: 150, fit: [84, 56, 14], style: { fontStyle: 'italic' } },
      line: { top: 345, style: caps(21, 5, { fontFamily: 'Montserrat', color: '#6b7a4d' }) },
      groom: { top: 600, h: 175, style: { fontFamily: 'Tangerine', fontSize: 164 } },
      amp: { top: 755, h: 80, style: { fontSize: 72, fontStyle: 'italic', fontWeight: 300, color: GOLD } },
      bride: { top: 820, h: 175, style: { fontFamily: 'Tangerine', fontSize: 138 } },
      date: { top: 1245, h: 60, style: { fontSize: 46, fontWeight: 500, letterSpacing: 8 } },
      qr: { x: 490, y: 1380, size: 220 },
    },
  };
})();

/* 12 ─ Vintage: letterpress rules and fleurons */
const vintage = (() => {
  const INK = '#3b2f25';
  const SEPIA = '#8b6b47';
  const curl = `<path d="M0 0 C50 0 80 18 80 48 C80 72 58 82 44 70 C32 60 40 44 54 48" fill="none" stroke="${INK}" stroke-width="1.8"/>`;
  const corner = (x, y, sx, sy) => `<g transform="translate(${x} ${y}) scale(${sx} ${sy})">${curl}<g transform="matrix(0 1 1 0 0 0)">${curl}</g><circle cx="10" cy="10" r="4" fill="${INK}"/></g>`;
  const fleuron = (y) => `<g transform="translate(600 ${y})">
      <path d="M-170 0 H-46 M46 0 H170" stroke="${INK}" stroke-width="1.2"/>
      <path d="M-8 0 C-20 -22 -46 -20 -42 -4 C-39 8 -24 6 -26 -4" fill="none" stroke="${INK}" stroke-width="1.6"/>
      <path d="M8 0 C20 -22 46 -20 42 -4 C39 8 24 6 26 -4" fill="none" stroke="${INK}" stroke-width="1.6"/>
      <path d="M-8 0 C-20 22 -46 20 -42 4 M8 0 C20 22 46 20 42 4" fill="none" stroke="${INK}" stroke-width="1.2"/>
      ${diamond(0, 0, 6, INK)}
    </g>`;
  const layer = svgUrl(`
    <rect x="70" y="70" width="1060" height="1660" fill="none" stroke="${INK}" stroke-width="2.5"/>
    <rect x="84" y="84" width="1032" height="1632" fill="none" stroke="${INK}" stroke-width=".8"/>
    ${corner(100, 100, 1, 1)}${corner(1100, 100, -1, 1)}${corner(100, 1700, 1, -1)}${corner(1100, 1700, -1, -1)}
    ${fleuron(505)}${fleuron(1150)}
    <rect x="461" y="1216" width="278" height="278" fill="none" stroke="${INK}" stroke-width=".8"/>
  `);
  return {
    name: 'Vintage',
    fonts: ['Petit Formal', 'Old Standard', 'Cormorant'],
    bg: 'radial-gradient(ellipse at 50% 50%, #f5ecdb 40%, #e6d5b6 100%)',
    color: INK,
    font: 'Old Standard',
    layer,
    qrColors: { dark: INK, light: '#f2e8d5' },
    spec: {
      guest: { top: 255, h: 150, fit: [84, 56, 15], style: { fontFamily: 'Cormorant', fontStyle: 'italic' } },
      line: { top: 425, style: caps(22, 6, { color: SEPIA }) },
      groom: { top: 565, h: 180, style: { fontFamily: 'Petit Formal', fontSize: 112 } },
      amp: { top: 740, h: 80, style: { fontFamily: 'Petit Formal', fontSize: 72, color: SEPIA } },
      bride: { top: 815, h: 180, style: { fontFamily: 'Petit Formal', fontSize: 98 } },
      date: { top: 1050, h: 60, style: { fontSize: 46, letterSpacing: 8 } },
      qr: { x: 485, y: 1240, size: 230 },
    },
  };
})();

/* 13 ─ Marmar: white marble veins, gold frame, Roman caps */
const marmar = (() => {
  const GOLD = '#c2a064';
  const rand = rng(13);
  let veins = '';
  // Long, gently waving diagonal veins with a few short branches — reads as marble, not scribbles.
  for (let i = 0; i < 7; i++) {
    const y0 = -200 + rand() * 1900;
    const y1 = y0 + 300 + rand() * 500;
    const c1 = y0 + (rand() - 0.5) * 500;
    const c2 = y1 + (rand() - 0.5) * 500;
    const d = `M-60 ${r1(y0)} C400 ${r1(c1)} 800 ${r1(c2)} 1260 ${r1(y1)}`;
    const w = 0.8 + rand() * 1.8;
    veins += `<path d="${d}" fill="none" stroke="#b9b5ae" stroke-opacity=".22" stroke-width="16" filter="url(#wide)"/>`;
    veins += `<path d="${d}" fill="none" stroke="#9f9a92" stroke-opacity="${r1(0.3 + rand() * 0.25)}" stroke-width="${r1(w)}" filter="url(#soft)"/>`;
    const bx = 250 + rand() * 700;
    const by = y0 + ((bx + 60) / 1320) * (y1 - y0);
    veins += `<path d="M${r1(bx)} ${r1(by)} q${r1(80 + rand() * 120)} ${r1(-60 + rand() * 160)} ${r1(200 + rand() * 160)} ${r1(-40 + rand() * 200)}" fill="none" stroke="#a8a49d" stroke-opacity=".3" stroke-width="${r1(w * 0.6)}" filter="url(#soft)"/>`;
  }
  const layer = svgUrl(
    `
    ${veins}
    <path d="M-40 1320 C200 1250 380 1420 620 1330 S980 1180 1260 1260" fill="none" stroke="${GOLD}" stroke-opacity=".55" stroke-width="1.6"/>
    <rect x="80" y="80" width="1040" height="1640" fill="none" stroke="${GOLD}" stroke-width="1.6"/>
    <rect x="92" y="92" width="1016" height="1616" fill="none" stroke="${GOLD}" stroke-width=".6"/>
    ${hline(260, 340, 1030, GOLD)}${hline(860, 940, 1030, GOLD)}${diamond(255, 1030, 5, GOLD)}${diamond(945, 1030, 5, GOLD)}
  `,
    `<filter id="soft"><feGaussianBlur stdDeviation="1.4"/></filter><filter id="wide" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="9"/></filter>`
  );
  return {
    name: 'Marmar',
    fonts: ['Cinzel', 'Cormorant', 'Montserrat'],
    bg: 'linear-gradient(135deg, #f7f6f4 0%, #eceae6 100%)',
    color: '#2b2b2b',
    layer,
    qrColors: { dark: '#2b2b2b', light: '#ffffff' },
    spec: {
      guest: { top: 285, h: 150, fit: [84, 56, 14], style: { fontStyle: 'italic' } },
      line: { top: 460, style: caps(20, 7, { fontFamily: 'Montserrat', fontWeight: 500, color: '#8a8a8a' }) },
      caps: true,
      groom: { top: 560, h: 130, style: { fontFamily: 'Cinzel', fontSize: 100, letterSpacing: 10 } },
      amp: { top: 690, h: 90, style: { fontSize: 84, fontStyle: 'italic', color: GOLD } },
      bride: { top: 780, h: 130, style: { fontFamily: 'Cinzel', fontSize: 82, letterSpacing: 8 } },
      date: { top: 1000, h: 60, style: { fontFamily: 'Cinzel', fontSize: 42, letterSpacing: 10 } },
      qr: { x: 485, y: 1210, size: 230, plate: { bg: '#ffffff', pad: 20, border: `1.5px solid ${GOLD}` } },
    },
  };
})();

/* 14 ─ Qora-oq: stark black, white didone */
const qoraoq = (() => {
  const layer = svgUrl(`
    <rect x="60" y="60" width="1080" height="1680" fill="none" stroke="#ffffff" stroke-opacity=".45" stroke-width=".9"/>
    ${hline(540, 660, 440, '#ffffff', 1)}
    <path d="M600 1060 V1100" stroke="#ffffff" stroke-width="1"/>
  `);
  return {
    name: 'Qora-oq',
    fonts: ['Prata', 'Playfair', 'Cormorant', 'Montserrat'],
    bg: '#0e0e0e',
    color: '#f5f5f5',
    layer,
    qrColors: { dark: '#0e0e0e', light: '#f5f5f5' },
    spec: {
      guest: { top: 260, h: 150, fit: [88, 58, 14], style: { fontStyle: 'italic' } },
      line: { top: 470, style: caps(19, 9, { fontFamily: 'Montserrat', color: '#9a9a9a' }) },
      groom: { top: 570, h: 180, style: { fontFamily: 'Prata', fontSize: 146 } },
      amp: { top: 745, h: 110, style: { fontFamily: 'Playfair', fontStyle: 'italic', fontSize: 100, color: '#9a9a9a' } },
      bride: { top: 850, h: 180, style: { fontFamily: 'Prata', fontSize: 118 } },
      date: { top: 1120, h: 50, style: { fontFamily: 'Montserrat', fontWeight: 500, fontSize: 32, letterSpacing: 18 } },
      qr: { x: 485, y: 1275, size: 230, plate: { bg: '#f5f5f5', pad: 22 } },
    },
  };
})();

/* 15 ─ Boho: sun, rainbow arcs, earthy tones */
const boho = (() => {
  const arc = (r, color) => `<path d="M${220 - r} 1800 A${r} ${r} 0 0 1 ${220 + r} 1800" fill="none" stroke="${color}" stroke-width="44"/>`;
  const rand = rng(15);
  let dots = '';
  for (let i = 0; i < 26; i++) {
    const x = rand() < 0.5 ? 60 + rand() * 300 : 860 + rand() * 290;
    const y = rand() < 0.5 ? 60 + rand() * 360 : 1380 + rand() * 360;
    dots += `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r1(2 + rand() * 4)}" fill="#c0673f" fill-opacity="${r1(0.3 + rand() * 0.5)}"/>`;
  }
  const layer = svgUrl(`
    ${dots}
    <circle cx="1030" cy="200" r="95" fill="#d9a441" fill-opacity=".9"/>
    <circle cx="1030" cy="200" r="125" fill="none" stroke="#d9a441" stroke-width="2" stroke-dasharray="4 10"/>
    ${arc(330, '#c0673f')}${arc(282, '#e6b59f')}${arc(234, '#d9a441')}${arc(186, '#9c4a2c')}
    <path d="M130 90 C180 60 220 120 270 90" fill="none" stroke="#9c4a2c" stroke-width="2"/>
    ${hline(230, 325, 1120, '#c0673f', 2)}${hline(875, 970, 1120, '#c0673f', 2)}
  `);
  return {
    name: 'Boho',
    fonts: ['Sacramento', 'Josefin', 'Cormorant', 'Montserrat'],
    bg: '#efe2d0',
    color: '#5a3222',
    layer,
    qrColors: { dark: '#5a3222', light: '#efe2d0' },
    spec: {
      guest: { top: 325, h: 130, maxWidth: 820, upper: true, fit: [46, 30, 16], style: { fontFamily: 'Montserrat', fontWeight: 300, letterSpacing: 6 } },
      line: { top: 470, h: 50, style: { fontSize: 38, fontStyle: 'italic', color: '#9c4a2c' } },
      groom: { top: 550, h: 210, style: { fontFamily: 'Sacramento', fontSize: 176 } },
      amp: { top: 745, h: 90, style: { fontSize: 84, fontStyle: 'italic', color: '#c0673f' } },
      bride: { top: 820, h: 210, style: { fontFamily: 'Sacramento', fontSize: 164 } },
      date: { top: 1090, h: 60, style: { fontFamily: 'Josefin', fontSize: 44, letterSpacing: 12 } },
      qr: { x: 485, y: 1250, size: 230 },
    },
  };
})();

/* 16 ─ Rishton: cobalt ceramic plates */
const rishton = (() => {
  const C = '#1f4e9c';
  const LIGHT = '#9bb8e3';
  function plate(cx, cy) {
    let petals = '';
    for (let i = 0; i < 16; i++) petals += `<ellipse cx="0" cy="-190" rx="24" ry="44" transform="rotate(${i * 22.5})" fill="${LIGHT}"/>`;
    let dots = '';
    for (let i = 0; i < 24; i++) {
      const a = (i * 15 * Math.PI) / 180;
      dots += `<circle cx="${r1(Math.cos(a) * 122)}" cy="${r1(Math.sin(a) * 122)}" r="6" fill="${C}"/>`;
    }
    let star = '';
    for (let i = 0; i < 8; i++) star += `<ellipse cx="0" cy="-48" rx="15" ry="36" transform="rotate(${i * 45})" fill="#fdfcf8"/>`;
    return `<g transform="translate(${cx} ${cy})">
      <circle r="255" fill="#eef3fb" stroke="${C}" stroke-width="3"/>
      <circle r="238" fill="none" stroke="${C}" stroke-width="1"/>
      ${petals}
      <circle r="150" fill="#fdfcf8" stroke="${C}" stroke-width="2"/>
      ${dots}
      <circle r="92" fill="${C}"/>
      ${star}
      <circle r="16" fill="${LIGHT}"/>
    </g>`;
  }
  const layer = svgUrl(`
    <rect x="50" y="50" width="1100" height="1700" fill="none" stroke="${C}" stroke-width="3"/>
    <rect x="64" y="64" width="1072" height="1672" fill="none" stroke="${C}" stroke-width="1"/>
    ${plate(600, 0)}${plate(600, 1800)}
    ${[[64, 64], [1136, 64], [64, 1736], [1136, 1736]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="20" fill="${C}"/><circle cx="${x}" cy="${y}" r="8" fill="${LIGHT}"/>`).join('')}
    <circle cx="380" cy="1062" r="5" fill="${C}"/><circle cx="820" cy="1062" r="5" fill="${C}"/>
    <circle cx="355" cy="1062" r="3" fill="${LIGHT}"/><circle cx="845" cy="1062" r="3" fill="${LIGHT}"/>
  `);
  return {
    name: 'Rishton',
    fonts: ['Playfair', 'Great Vibes', 'Cormorant', 'Montserrat'],
    bg: '#fdfcf8',
    color: C,
    layer,
    qrColors: { dark: C, light: '#fdfcf8' },
    spec: {
      guest: { top: 300, h: 140, fit: [84, 56, 14], style: { fontStyle: 'italic' } },
      line: { top: 460, style: caps(20, 6, { fontFamily: 'Montserrat', fontWeight: 500, color: '#4b6fae' }) },
      groom: { top: 555, h: 175, style: { fontFamily: 'Playfair', fontStyle: 'italic', fontSize: 136 } },
      amp: { top: 720, h: 90, style: { fontFamily: 'Great Vibes', fontSize: 96, color: '#5a7fc2' } },
      bride: { top: 800, h: 175, style: { fontFamily: 'Playfair', fontStyle: 'italic', fontSize: 120 } },
      date: { top: 1032, h: 60, style: { fontSize: 48, fontWeight: 500, letterSpacing: 10 } },
      qr: { x: 485, y: 1195, size: 230 },
    },
  };
})();

/* 17 ─ Zarhal: gilded frame, gold script */
const zarhal = (() => {
  const G = '#a07c3c';
  const cornerMark = (x, y, sx, sy) => `<g transform="translate(${x} ${y}) scale(${sx} ${sy})"><path d="M0 60 V0 H60" fill="none" stroke="${G}" stroke-width="2.5"/><rect x="10" y="10" width="14" height="14" fill="${G}"/></g>`;
  const layer = svgUrl(`
    <rect x="76" y="76" width="1048" height="1648" fill="none" stroke="${G}" stroke-width="1.2"/>
    ${cornerMark(96, 96, 1, 1)}${cornerMark(1104, 96, -1, 1)}${cornerMark(96, 1704, 1, -1)}${cornerMark(1104, 1704, -1, -1)}
    ${hline(520, 585, 520, G)}${hline(615, 680, 520, G)}${diamond(600, 520, 6, G)}
    ${hline(310, 400, 1080, G)}${hline(800, 890, 1080, G)}
    <rect x="463" y="1198" width="274" height="274" fill="none" stroke="${G}" stroke-width="1.5"/>
  `);
  const goldText = {
    backgroundImage: 'linear-gradient(100deg, #8a6220 0%, #c99a45 35%, #e8c77e 50%, #c99a45 65%, #8a6220 100%)',
    backgroundClip: 'text',
    color: 'transparent',
  };
  return {
    name: 'Zarhal',
    fonts: ['Great Vibes', 'Cormorant', 'Montserrat'],
    bg: 'linear-gradient(135deg, #8a6423 0%, #e9cf8e 30%, #b58a3e 55%, #f3dfa8 75%, #9c7430 100%)',
    color: '#3a2f22',
    under: [
      <div key="panel" style={{ position: 'absolute', top: 48, left: 48, width: 1104, height: 1704, background: '#fbf7ee', display: 'flex' }} />,
    ],
    layer,
    qrColors: { dark: '#3a2f22', light: '#fbf7ee' },
    spec: {
      guest: { top: 290, h: 150, fit: [84, 56, 14], style: { fontStyle: 'italic' } },
      line: { top: 455, style: caps(20, 6, { fontFamily: 'Montserrat', fontWeight: 500, color: G }) },
      groom: { top: 545, h: 205, style: { fontFamily: 'Great Vibes', fontSize: 160, padding: '0 24px', ...goldText } },
      amp: { top: 735, h: 90, style: { fontSize: 80, fontStyle: 'italic', color: G } },
      bride: { top: 805, h: 200, style: { fontFamily: 'Great Vibes', fontSize: 140, padding: '0 24px', ...goldText } },
      date: { top: 1050, h: 60, style: { fontSize: 48, fontWeight: 500, letterSpacing: 10 } },
      qr: { x: 485, y: 1220, size: 230 },
    },
  };
})();

/* 18 ─ Anor: pomegranate, the Uzbek symbol of a happy family */
const anor = (() => {
  const RED = '#b3263a';
  const DARK = '#7d1b2a';
  const GREEN = '#5d7a4a';
  const GOLD = '#c9a15a';
  const fruit = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})">
      ${leaf(-8, -74, 74, 200, GREEN)}${leaf(8, -74, 74, -20, GREEN)}
      <path d="M-18 -64 L-26 -98 L-10 -82 L0 -106 L10 -82 L26 -98 L18 -64 Z" fill="${DARK}"/>
      <circle r="74" fill="${RED}"/>
      <circle cx="-26" cy="-22" r="28" fill="#d24a5c" fill-opacity=".55"/>
      <path d="M-40 34 C-20 52 20 52 40 34" fill="none" stroke="${DARK}" stroke-width="3" stroke-opacity=".5"/>
    </g>`;
  let seeds = '';
  for (let i = -6; i <= 6; i++) {
    const x = 600 + i * 34;
    seeds += `<ellipse cx="${x}" cy="1590" rx="7" ry="11" transform="rotate(${i * 12} ${x} 1590)" fill="${i % 2 ? RED : DARK}" fill-opacity="${1 - Math.abs(i) * 0.1}"/>`;
  }
  const layer = svgUrl(`
    <rect x="60" y="60" width="1080" height="1680" fill="none" stroke="${GOLD}" stroke-width="1.5"/>
    ${[[60, 60], [1140, 60], [60, 1740], [1140, 1740]].map(([x, y]) => diamond(x, y, 8, GOLD)).join('')}
    ${fruit(600, 235, 1)}
    ${fruit(150, 1650, 0.45)}${fruit(1050, 1650, 0.45)}
    ${hline(330, 470, 235, GOLD)}${hline(730, 870, 235, GOLD)}
    ${seeds}
    ${hline(310, 400, 1090, GOLD)}${hline(800, 890, 1090, GOLD)}
  `);
  return {
    name: 'Anor',
    fonts: ['Petit Formal', 'Cormorant', 'Montserrat'],
    bg: '#faf4ec',
    color: DARK,
    layer,
    qrColors: { dark: '#5a1520', light: '#faf4ec' },
    spec: {
      guest: { top: 350, h: 140, fit: [84, 56, 14], style: { fontStyle: 'italic' } },
      line: { top: 505, style: caps(20, 6, { fontFamily: 'Montserrat', fontWeight: 500, color: RED }) },
      groom: { top: 580, h: 170, style: { fontFamily: 'Petit Formal', fontSize: 116 } },
      amp: { top: 745, h: 80, style: { fontSize: 80, fontStyle: 'italic', color: GOLD } },
      bride: { top: 815, h: 170, style: { fontFamily: 'Petit Formal', fontSize: 100 } },
      date: { top: 1060, h: 60, style: { fontSize: 48, fontWeight: 500, letterSpacing: 10 } },
      qr: { x: 485, y: 1235, size: 230 },
    },
  };
})();

/* 19 ─ Kameo: beaded oval cameo, powder blue */
const kameo = (() => {
  const NAVY = '#22324a';
  const SILVER = '#8d9bab';
  let beads = '';
  for (let a = 0; a < 360; a += 6) {
    const t = (a * Math.PI) / 180;
    beads += `<circle cx="${r1(600 + Math.cos(t) * 398)}" cy="${r1(860 + Math.sin(t) * 478)}" r="3.4" fill="${SILVER}"/>`;
  }
  const layer = svgUrl(`
    <ellipse cx="600" cy="860" rx="380" ry="460" fill="#fbfcfd" stroke="${NAVY}" stroke-width="1.6"/>
    <ellipse cx="600" cy="860" rx="362" ry="442" fill="none" stroke="${NAVY}" stroke-width=".7"/>
    ${beads}
    ${diamond(600, 382, 10, NAVY)}${diamond(600, 1338, 10, NAVY)}
    ${sparkle(600, 540, 14, SILVER)}
    ${hline(320, 382, 1085, SILVER)}${hline(818, 880, 1085, SILVER)}
    <rect x="60" y="60" width="1080" height="1680" fill="none" stroke="${SILVER}" stroke-width="1"/>
  `);
  return {
    name: 'Kameo',
    fonts: ['Bodoni', 'Cormorant', 'Montserrat'],
    bg: 'radial-gradient(ellipse at 50% 45%, #f3f6f8 0%, #dfe6ec 100%)',
    color: NAVY,
    layer,
    qrColors: { dark: NAVY, light: '#eaeff3' },
    spec: {
      guest: { top: 115, h: 140, fit: [80, 54, 15], style: { fontStyle: 'italic' } },
      line: { top: 280, style: caps(20, 6, { fontFamily: 'Montserrat', fontWeight: 500, color: '#5d6d80' }) },
      groom: { top: 590, h: 160, style: { fontFamily: 'Bodoni', fontStyle: 'italic', fontSize: 120 } },
      amp: { top: 745, h: 80, style: { fontFamily: 'Bodoni', fontStyle: 'italic', fontSize: 76, color: SILVER } },
      bride: { top: 820, h: 160, style: { fontFamily: 'Bodoni', fontStyle: 'italic', fontSize: 100 } },
      date: { top: 1058, h: 54, style: { fontSize: 42, fontWeight: 500, letterSpacing: 8 } },
      qr: { x: 490, y: 1415, size: 220 },
    },
  };
})();

/* 20 ─ Oy va yulduzlar: midnight sky, crescent moon */
const tun = (() => {
  const G = '#e5c77d';
  const rand = rng(20);
  let stars = '';
  for (let i = 0; i < 90; i++) {
    const x = rand() * 1200;
    const band = rand();
    const y = band < 0.45 ? rand() * 560 : band < 0.8 ? 1480 + rand() * 320 : 560 + rand() * 920;
    if (y > 560 && y < 1480 && x > 170 && x < 1030) continue;
    stars += `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r1(1 + rand() * 2.4)}" fill="#ffffff" fill-opacity="${r1(0.25 + rand() * 0.6)}"/>`;
  }
  const sparks = [[200, 170, 14], [980, 320, 10], [1060, 150, 16], [140, 470, 8], [1080, 1560, 14], [180, 1650, 12], [900, 1700, 8]];
  const layer = svgUrl(
    `
    ${stars}
    ${sparks.map(([x, y, s]) => sparkle(x, y, s, G, 0.9)).join('')}
    <circle cx="600" cy="205" r="70" fill="${G}" mask="url(#moon)"/>
    <rect x="60" y="60" width="1080" height="1680" fill="none" stroke="${G}" stroke-opacity=".6" stroke-width="1"/>
    ${hline(520, 588, 540, G)}${hline(612, 680, 540, G)}<circle cx="600" cy="540" r="4" fill="${G}"/>
  `,
    `<mask id="moon"><rect width="1200" height="1800" fill="#fff"/><circle cx="630" cy="182" r="62" fill="#000"/></mask>`
  );
  return {
    name: 'Oy va yulduzlar',
    fonts: ['Italianno', 'Cormorant', 'Montserrat'],
    bg: 'linear-gradient(180deg, #0b1633 0%, #16285a 60%, #1f3470 100%)',
    color: '#f3ead2',
    layer,
    qrColors: { dark: '#0b1633', light: '#f3ead2' },
    spec: {
      guest: { top: 315, h: 150, fit: [84, 56, 14], style: { fontStyle: 'italic' } },
      line: { top: 480, h: 40, style: caps(20, 6, { fontFamily: 'Montserrat', color: G }) },
      groom: { top: 575, h: 200, style: { fontFamily: 'Italianno', fontSize: 190 } },
      amp: { top: 760, h: 80, style: { fontSize: 80, fontStyle: 'italic', color: G } },
      bride: { top: 825, h: 200, style: { fontFamily: 'Italianno', fontSize: 176 } },
      date: { top: 1080, h: 60, style: { fontSize: 48, fontWeight: 500, letterSpacing: 10, color: G } },
      qr: { x: 490, y: 1255, size: 220, plate: { bg: '#f3ead2', pad: 20, radius: 14 } },
    },
  };
})();

export const designsB = [gulchambar, vintage, marmar, qoraoq, boho, rishton, zarhal, anor, kameo, tun];
