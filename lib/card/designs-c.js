import { diamond, hline, leaf, r1, sparkle, svgUrl } from './kit';

// Designs 21–30: Uzbek & Silk Road heritage.

const caps = (size, spacing, extra) => ({ fontSize: size, letterSpacing: spacing, textTransform: 'uppercase', ...extra });

// Deterministic pseudo-random numbers so every render of a design is identical.
function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const poly = (pts) => `M${pts.map(([x, y]) => `${r1(x)} ${r1(y)}`).join(' L')}Z`;

const goldText = (from, mid, hi) => ({
  backgroundImage: `linear-gradient(100deg, ${from} 0%, ${mid} 35%, ${hi} 50%, ${mid} 65%, ${from} 100%)`,
  backgroundClip: 'text',
  color: 'transparent',
});

/* 21 ─ Atlas: ikat (abr) silk bands with feathered edges */
const atlas = (() => {
  const IND = '#23275e';
  const MAG = '#b8235f';
  const YEL = '#f1bd2c';
  const GRN = '#17865a';
  const CREAM = '#fbf5ea';
  const rand = rng(21);
  // Each colour is woven as 4px "threads" whose ends wander a little — that wander is the ikat blur.
  // Thread "wander": mostly a few px, now and then a long flame-like spike.
  const wander = () => (rand() < 0.14 ? 8 + rand() * 16 : rand() * 7) - 2;
  function ikat(cx, halfW, layers, period, phase) {
    let s = '';
    for (const [color, inset] of layers) {
      let d = '';
      for (let y = 0; y < 1800; y += 4) {
        const t = ((((y + phase) % period) + period) % period) / period;
        const tri = 1 - Math.abs(2 * t - 1);
        const w = halfW * (0.3 + 0.7 * tri) - inset;
        if (w < 3) continue;
        const a = wander();
        const b = wander();
        d += `M${r1(cx - w - a)} ${y}h${r1(2 * w + a + b)}v4.4h${r1(-(2 * w + a + b))}Z`;
      }
      s += `<path d="${d}" fill="${color}"/>`;
    }
    return s;
  }
  function stripe(x0, x1, color) {
    let d = '';
    for (let y = 0; y < 1800; y += 4) {
      const a = rand() * 4;
      const b = rand() * 4;
      d += `M${r1(x0 - a)} ${y}H${r1(x1 + b)}v4.4H${r1(x0 - a)}Z`;
    }
    return `<path d="${d}" fill="${color}"/>`;
  }
  function lozenge(cx, cy, h, colors) {
    let s = '';
    colors.forEach((color, k) => {
      let d = '';
      const hh = h - k * (h / colors.length);
      for (let y = cy - hh; y < cy + hh; y += 3) {
        const w = hh * 0.62 * (1 - Math.abs(y + 1.5 - cy) / hh);
        if (w < 1) continue;
        const a = rand() * 3 - 1;
        const b = rand() * 3 - 1;
        d += `M${r1(cx - w - a)} ${r1(y)}h${r1(2 * w + a + b)}v3.3h${r1(-(2 * w + a + b))}Z`;
      }
      s += `<path d="${d}" fill="${color}"/>`;
    });
    return `<g filter="url(#thread)">${s}</g>`;
  }
  const layer = svgUrl(
    `
    <g filter="url(#thread)">
    <rect x="0" y="0" width="178" height="1800" fill="${IND}"/>
    <rect x="1022" y="0" width="178" height="1800" fill="${IND}"/>
    ${ikat(86, 82, [[MAG, 0], [YEL, 17], [GRN, 32], [CREAM, 45]], 224, 0)}
    ${ikat(1114, 82, [[GRN, 0], [YEL, 17], [MAG, 32], [CREAM, 45]], 224, 112)}
    ${stripe(176, 186, YEL)}${stripe(186, 192, MAG)}
    ${stripe(1008, 1014, MAG)}${stripe(1014, 1024, YEL)}
    </g>
    <rect x="0" y="0" width="192" height="1800" fill="url(#sheen)"/>
    <rect x="1008" y="0" width="192" height="1800" fill="url(#sheen)"/>
    ${lozenge(600, 175, 34, [MAG, YEL, GRN])}
    ${diamond(600, 468, 9, MAG)}${diamond(600, 468, 4, YEL)}
    ${diamond(318, 1090, 9, GRN)}${diamond(318, 1090, 4, YEL)}${diamond(882, 1090, 9, GRN)}${diamond(882, 1090, 4, YEL)}
    ${lozenge(600, 1625, 34, [GRN, YEL, MAG])}
  `,
    `<linearGradient id="sheen" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".45" stop-color="#fff" stop-opacity=".16"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <filter id="thread" x="-5%" y="0" width="110%" height="100%"><feGaussianBlur stdDeviation="1.6 0.3"/></filter>`
  );
  return {
    name: 'Atlas',
    fonts: ['Abril', 'Playfair', 'Montserrat'],
    bg: CREAM,
    color: IND,
    layer,
    qrColors: { dark: IND, light: CREAM },
    spec: {
      guest: { top: 270, h: 170, maxWidth: 720, fit: [88, 54, 14], style: { fontFamily: 'Cormorant', fontStyle: 'italic' } },
      line: { top: 505, style: caps(18, 4, { fontFamily: 'Montserrat', fontWeight: 500, color: MAG }) },
      groom: { top: 590, h: 160, style: { fontFamily: 'Abril', fontSize: 124 } },
      amp: { top: 745, h: 100, style: { fontFamily: 'Playfair', fontStyle: 'italic', fontSize: 92, color: MAG } },
      bride: { top: 840, h: 150, style: { fontFamily: 'Abril', fontSize: 100 } },
      date: { top: 1060, h: 60, style: { fontFamily: 'Montserrat', fontWeight: 500, fontSize: 38, letterSpacing: 10 } },
      qr: { x: 480, y: 1230, size: 240 },
    },
  };
})();

/* 22 ─ Do'ppi: Chust skullcap, white qalampir on black */
const doppi = (() => {
  const INK = '#111111';
  const WHITE = '#f4f2ec';
  const GREEN = '#5aa56c';
  // Bent teardrop ("qalampir"): blunt end at -L, tip at +L curling by `bend` radians.
  function pepperPts(L, wd, bend, shift = 0, n = 96) {
    const pts = [];
    for (let i = 0; i < n; i++) {
      const t = (i / n) * 2 * Math.PI;
      const u = Math.cos(t);
      const v = Math.sin(t) * Math.abs(Math.sin(t / 2)) ** 1.5 * wd;
      const a = bend * ((u + 1) / 2) ** 2.4;
      const x = u * L + shift;
      pts.push([x * Math.cos(a) - v * Math.sin(a), x * Math.sin(a) + v * Math.cos(a)]);
    }
    return pts;
  }
  function pepper(cx, cy, rot, L, wd, bend, flip = 1) {
    const outer = pepperPts(L, wd, bend);
    const mid = pepperPts(L * 0.82, wd * 0.78, bend, -L * 0.1);
    const inner = pepperPts(L * 0.5, wd * 0.46, bend * 0.8, -L * 0.3);
    // Serrated rim: little white teeth all around the outline.
    let teeth = '';
    for (let i = 2; i < outer.length - 1; i += 3) {
      const [x0, y0] = outer[i - 1];
      const [x1, y1] = outer[i + 1];
      const [x, y] = outer[i];
      const len = Math.hypot(x1 - x0, y1 - y0) || 1;
      const nx = (y1 - y0) / len;
      const ny = -(x1 - x0) / len;
      teeth += `M${r1(x0)} ${r1(y0)} L${r1(x + nx * 11)} ${r1(y + ny * 11)} L${r1(x1)} ${r1(y1)}Z `;
    }
    // Stitched hatching between the inner and middle outlines.
    let hatch = '';
    for (let i = 0; i < mid.length; i += 2) {
      const [ax, ay] = inner[i];
      const [bx, by] = mid[i];
      hatch += `M${r1(ax + (bx - ax) * 0.18)} ${r1(ay + (by - ay) * 0.18)} L${r1(ax + (bx - ax) * 0.8)} ${r1(ay + (by - ay) * 0.8)} `;
    }
    return `<g transform="translate(${cx} ${cy}) rotate(${rot}) scale(1 ${flip})">
      <path d="${teeth}" fill="${WHITE}"/>
      <path d="${poly(outer)}" fill="${WHITE}"/>
      <path d="${poly(mid)}" fill="${INK}"/>
      <path d="${hatch}" stroke="${WHITE}" stroke-width="2" stroke-linecap="round"/>
      <path d="${poly(inner)}" fill="${WHITE}"/>
      <path d="${poly(pepperPts(L * 0.24, wd * 0.22, bend * 0.6, -L * 0.42))}" fill="${INK}"/>
      <circle cx="${r1(-L * 0.62)}" cy="0" r="${r1(wd * 0.1)}" fill="${GREEN}"/>
    </g>`;
  }
  // Top view of the cap: four peppers pointing to the corners of a square, mirrored in pairs.
  const C = [600, 300];
  let crown = '';
  for (let k = 0; k < 4; k++) {
    const a = 45 + k * 90;
    const t = (a * Math.PI) / 180;
    crown += pepper(r1(C[0] + Math.cos(t) * 99), r1(C[1] + Math.sin(t) * 99), a, 70, 44, 0.55, k % 2 ? -1 : 1);
  }
  let arches = '';
  for (let x = 90; x <= 1080; x += 30) arches += `M${x} 116 V104 A15 15 0 0 1 ${x + 30} 104 V116 `;
  const layer = svgUrl(`
    <rect x="46" y="46" width="1108" height="1708" fill="none" stroke="${WHITE}" stroke-width="2.4"/>
    <rect x="60" y="60" width="1080" height="1680" fill="none" stroke="${WHITE}" stroke-width="1"/>
    <path d="${arches}" fill="none" stroke="${WHITE}" stroke-width="1.6"/>
    <path d="${arches}" fill="none" stroke="${WHITE}" stroke-width="1.6" transform="rotate(180 600 900)"/>
    <rect x="${C[0] - 160}" y="${C[1] - 160}" width="320" height="320" fill="none" stroke="${WHITE}" stroke-width="2"/>
    <rect x="${C[0] - 170}" y="${C[1] - 170}" width="340" height="340" fill="none" stroke="${WHITE}" stroke-width=".8"/>
    ${crown}
    ${diamond(C[0], C[1], 9, WHITE)}${diamond(C[0], C[1], 4, GREEN)}
    ${pepper(290, 1390, -100, 150, 92, 1.0)}
    ${pepper(910, 1390, -80, 150, 92, 1.0, -1)}
    ${diamond(600, 1128, 6, GREEN)}
  `);
  return {
    name: 'Do‘ppi',
    fonts: ['Unbounded', 'Prata', 'Fraunces', 'Montserrat'],
    bg: INK,
    color: WHITE,
    layer,
    qrColors: { dark: INK, light: WHITE },
    spec: {
      guest: { top: 500, h: 150, maxWidth: 800, fit: [84, 52, 14], style: { fontFamily: 'Cormorant', fontWeight: 500 } },
      line: { top: 668, style: caps(19, 6, { fontFamily: 'Montserrat', color: '#b5b3ad' }) },
      caps: true,
      groom: { top: 735, h: 130, style: { fontFamily: 'Unbounded', fontSize: 92, letterSpacing: 8 } },
      amp: { top: 862, h: 90, style: { fontFamily: 'Fraunces', fontStyle: 'italic', fontSize: 84, color: GREEN } },
      bride: { top: 950, h: 120, style: { fontFamily: 'Unbounded', fontSize: 68, letterSpacing: 6 } },
      date: { top: 1150, h: 60, style: { fontFamily: 'Unbounded', fontSize: 34, letterSpacing: 8 } },
      qr: { x: 485, y: 1290, size: 230, plate: { bg: WHITE, pad: 18 } },
    },
  };
})();

/* 23 ─ Registon: madrasa silhouettes at dusk, QR in the portal niche */
const registon = (() => {
  const MASS = '#10233d';
  const NICHE = '#1b3a5e';
  const TURQ = '#2aa3a3';
  const GOLD = '#e2bb66';
  const rand = rng(23);
  const arch = (x0, x1, spring, peak, bottom) => {
    const cx = (x0 + x1) / 2;
    return `M${x0} ${bottom} V${spring} Q${x0} ${peak + (spring - peak) * 0.25} ${cx} ${peak} Q${x1} ${peak + (spring - peak) * 0.25} ${x1} ${spring} V${bottom} Z`;
  };
  function portal(x0, x1, top, nx0, nx1, spring, peak) {
    return `
      <rect x="${x0}" y="${top}" width="${x1 - x0}" height="${1800 - top}" fill="${MASS}"/>
      <rect x="${x0 + 12}" y="${top + 12}" width="${x1 - x0 - 24}" height="${1800 - top}" fill="none" stroke="${GOLD}" stroke-width="1.4" stroke-opacity=".8"/>
      <path d="${arch(nx0, nx1, spring, peak, 1800)}" fill="${NICHE}" stroke="${GOLD}" stroke-width="1.8"/>
      <path d="${arch(nx0 + 12, nx1 - 12, spring + 6, peak + 16, 1800)}" fill="none" stroke="${TURQ}" stroke-width="1.2" stroke-opacity=".8"/>`;
  }
  function minaret(cx, top, w) {
    return `
      <path d="M${cx - w / 2} 1800 L${cx - w / 2 + 3} ${top + 40} H${cx + w / 2 - 3} L${cx + w / 2} 1800Z" fill="${MASS}"/>
      <rect x="${cx - w / 2 - 6}" y="${top + 22}" width="${w + 12}" height="18" fill="${MASS}"/>
      <path d="M${cx - w / 2 + 2} ${top + 22} Q${cx - w / 2 + 2} ${top} ${cx} ${top - 8} Q${cx + w / 2 - 2} ${top} ${cx + w / 2 - 2} ${top + 22}Z" fill="${TURQ}"/>
      <path d="M${cx - w / 2 - 6} ${top + 40} H${cx + w / 2 + 6}" stroke="${GOLD}" stroke-width="1.4"/>
      <path d="M${cx - w / 2 + 3} ${top + 80} H${cx + w / 2 - 3} M${cx - w / 2 + 2} ${top + 160} H${cx + w / 2 - 2}" stroke="${TURQ}" stroke-width="3" stroke-opacity=".7"/>`;
  }
  function dome(cx, base, r, drumH) {
    let ribs = '';
    for (let k = -3; k <= 3; k++) {
      const x = cx + (k / 3.6) * r;
      ribs += `M${r1(x)} ${base - drumH} Q${r1(cx + (k / 3.6) * r * 0.55)} ${r1(base - drumH - r * 1.05)} ${cx} ${r1(base - drumH - r * 1.18)} `;
    }
    return `
      <rect x="${cx - r * 0.82}" y="${base - drumH}" width="${r * 1.64}" height="${drumH + 4}" fill="${MASS}"/>
      <path d="M${cx - r * 0.82} ${base - drumH + 10} H${cx + r * 0.82}" stroke="${GOLD}" stroke-width="1.2" stroke-opacity=".8"/>
      <path d="M${cx - r} ${base - drumH} C${cx - r} ${r1(base - drumH - r * 0.9)} ${cx - r * 0.3} ${r1(base - drumH - r * 1.05)} ${cx} ${r1(base - drumH - r * 1.2)} C${cx + r * 0.3} ${r1(base - drumH - r * 1.05)} ${cx + r} ${r1(base - drumH - r * 0.9)} ${cx + r} ${base - drumH}Z" fill="${TURQ}"/>
      <path d="${ribs}" fill="none" stroke="#1d7f82" stroke-width="2"/>
      <path d="M${cx} ${r1(base - drumH - r * 1.2)} V${r1(base - drumH - r * 1.2 - 26)}" stroke="${GOLD}" stroke-width="2.5"/>
      <circle cx="${cx}" cy="${r1(base - drumH - r * 1.2 - 14)}" r="4" fill="${GOLD}"/>`;
  }
  let stars = '';
  for (let i = 0; i < 70; i++) {
    const x = 60 + rand() * 1080;
    const y = 60 + rand() * 820;
    if (x > 230 && x < 970 && y > 140) continue;
    stars += `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r1(1 + rand() * 2.2)}" fill="#fff" fill-opacity="${r1(0.3 + rand() * 0.6)}"/>`;
  }
  let hujra = '';
  for (let x = 20; x < 1200; x += 58) hujra += `<path d="${arch(x, x + 40, 1716, 1690, 1780)}" fill="none" stroke="${GOLD}" stroke-width="1" stroke-opacity=".45"/>`;
  const layer = svgUrl(
    `
    <ellipse cx="600" cy="1560" rx="760" ry="330" fill="#f2a46f" fill-opacity=".35" filter="url(#glow)"/>
    ${stars}
    ${sparkle(170, 190, 14, GOLD, 0.9)}${sparkle(1030, 150, 16, GOLD, 0.9)}${sparkle(1080, 520, 9, GOLD, 0.7)}${sparkle(120, 640, 9, GOLD, 0.7)}
    ${dome(600, 1250, 118, 40)}
    ${dome(915, 1392, 58, 28)}${dome(1075, 1392, 58, 28)}
    <rect x="0" y="1560" width="1200" height="240" fill="${MASS}"/>
    ${hujra}
    ${minaret(84, 1190, 34)}${minaret(354, 1250, 28)}
    ${minaret(1116, 1190, 34)}${minaret(846, 1250, 28)}
    ${portal(116, 322, 1392, 160, 278, 1520, 1448)}
    ${portal(878, 1084, 1392, 922, 1040, 1520, 1448)}
    ${portal(400, 800, 1250, 450, 750, 1418, 1292)}
    <path d="M400 1262 H800" stroke="${TURQ}" stroke-width="3"/>
    ${hline(250, 330, 986, GOLD, 1.2)}${hline(870, 950, 986, GOLD, 1.2)}
  `,
    `<filter id="glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="60"/></filter>`
  );
  return {
    name: 'Registon',
    fonts: ['Parisienne', 'Cinzel', 'Josefin', 'Cormorant'],
    bg: 'linear-gradient(180deg, #0c1233 0%, #1f2760 34%, #4f3c7c 58%, #a95d7c 76%, #e89a6c 92%, #f2b77a 100%)',
    color: '#f6ecd6',
    layer,
    qrColors: { dark: MASS, light: '#f6efe0' },
    spec: {
      guest: { top: 160, h: 150, fit: [80, 52, 14], style: { fontStyle: 'italic' } },
      line: { top: 335, style: caps(20, 6, { fontFamily: 'Josefin', color: GOLD }) },
      groom: { top: 400, h: 200, style: { fontFamily: 'Parisienne', fontSize: 150, color: GOLD } },
      amp: { top: 590, h: 90, style: { fontSize: 80, fontStyle: 'italic', color: '#f6ecd6' } },
      bride: { top: 670, h: 200, style: { fontFamily: 'Parisienne', fontSize: 130, color: GOLD } },
      date: { top: 956, h: 60, style: { fontFamily: 'Cinzel', fontSize: 42, letterSpacing: 10 } },
      qr: { x: 485, y: 1450, size: 230, plate: { bg: '#f6efe0', pad: 16, border: `2px solid ${GOLD}` } },
    },
  };
})();

/* 24 ─ Gilam: Bukhara carpet, gul octagons, fringe */
const gilam = (() => {
  const FIELD = '#9b2226';
  const DARK = '#3a0c10';
  const BORDER = '#6b1419';
  const IVORY = '#eddfc2';
  const NAVY = '#1f2b4d';
  const ORANGE = '#d27a3a';
  const X0 = 34;
  const X1 = 1166;
  const Y0 = 62;
  const Y1 = 1738;
  const band = (i, fill) => `<rect x="${X0 + i}" y="${Y0 + i}" width="${X1 - X0 - 2 * i}" height="${Y1 - Y0 - 2 * i}" fill="${fill}"/>`;
  function gul(cx, cy, w, h) {
    const a = w / 2;
    const b = h / 2;
    const c = a * 0.4;
    const d = b * 0.4;
    const oct = [[-a + c, -b], [a - c, -b], [a, -b + d], [a, b - d], [a - c, b], [-a + c, b], [-a, b - d], [-a, -b + d]];
    const q = (sx, sy) => [[0, 0], [0, sy * b], [sx * (a - c), sy * b], [sx * a, sy * (b - d)], [sx * a, 0]];
    const inner = (sx, sy, col) => diamond(r1(cx + sx * a * 0.5), r1(cy + sy * b * 0.46), r1(Math.min(a, b) * 0.16), col);
    const sc = (k) => oct.map(([x, y]) => [cx + x * k, cy + y * k]);
    return `
      <path d="${poly(sc(1.12))}" fill="${IVORY}"/>
      <path d="${poly(sc(1.06))}" fill="${DARK}"/>
      <path d="${poly(q(-1, -1).map(([x, y]) => [cx + x, cy + y]))}" fill="${NAVY}"/>
      <path d="${poly(q(1, 1).map(([x, y]) => [cx + x, cy + y]))}" fill="${NAVY}"/>
      <path d="${poly(q(1, -1).map(([x, y]) => [cx + x, cy + y]))}" fill="${IVORY}"/>
      <path d="${poly(q(-1, 1).map(([x, y]) => [cx + x, cy + y]))}" fill="${IVORY}"/>
      ${inner(-1, -1, ORANGE)}${inner(1, 1, ORANGE)}${inner(1, -1, FIELD)}${inner(-1, 1, FIELD)}
      <path d="M${cx - a} ${cy} H${cx + a} M${cx} ${cy - b} V${cy + b}" stroke="${DARK}" stroke-width="3"/>
      <path d="${poly(sc(0.3))}" fill="${FIELD}" stroke="${IVORY}" stroke-width="3"/>
      ${diamond(cx, cy, 6, IVORY)}`;
  }
  function minor(cx, cy, s) {
    return `${diamond(cx, cy, s, IVORY)}${diamond(cx, cy, s * 0.72, NAVY)}${diamond(cx, cy, s * 0.3, ORANGE)}
      <path d="M${cx - s * 1.5} ${cy} H${cx - s * 1.05} M${cx + s * 1.05} ${cy} H${cx + s * 1.5} M${cx} ${cy - s * 1.5} V${cy - s * 1.05} M${cx} ${cy + s * 1.05} V${cy + s * 1.5}" stroke="${IVORY}" stroke-width="3"/>`;
  }
  // Border motifs spaced evenly along each side.
  let motifs = '';
  const mid = 24 + 36;
  const along = (a0, a1, step, f) => {
    const n = Math.round((a1 - a0) / step);
    for (let i = 0; i <= n; i++) f(a0 + ((a1 - a0) * i) / n, i);
  };
  const bm = (x, y, i) => (i % 2 ? diamond(x, y, 17, NAVY) + diamond(x, y, 9, IVORY) + diamond(x, y, 4, FIELD) : `<path d="${poly([[x - 16, y - 7], [x - 7, y - 16], [x + 7, y - 16], [x + 16, y - 7], [x + 16, y + 7], [x + 7, y + 16], [x - 7, y + 16], [x - 16, y + 7]])}" fill="${ORANGE}"/>${diamond(x, y, 6, DARK)}`);
  along(X0 + mid, X1 - mid, 56, (x, i) => {
    motifs += bm(r1(x), Y0 + mid, i) + bm(r1(x), Y1 - mid, i);
  });
  along(Y0 + mid, Y1 - mid, 56, (y, i) => {
    if (i === 0) return;
    motifs += bm(X0 + mid, r1(y), i) + bm(X1 - mid, r1(y), i);
  });
  let guard = '';
  along(X0 + 16, X1 - 16, 22, (x) => {
    guard += diamond(r1(x), Y0 + 16, 3.5, FIELD) + diamond(r1(x), Y1 - 16, 3.5, FIELD);
  });
  along(Y0 + 16, Y1 - 16, 22, (y) => {
    guard += diamond(X0 + 16, r1(y), 3.5, FIELD) + diamond(X1 - 16, r1(y), 3.5, FIELD);
  });
  let fringe = '';
  for (let x = 44; x <= 1156; x += 12) {
    fringe += `M${x} ${Y0} V${Y0 - 40} M${x} ${Y1} V${Y1 + 40} `;
  }
  // Central medallion panel with chamfered corners.
  const P = { x0: 214, x1: 986, y0: 404, y1: 1400, c: 56 };
  const panel = (k) => poly([[P.x0 + P.c + k, P.y0 + k], [P.x1 - P.c - k, P.y0 + k], [P.x1 - k, P.y0 + P.c + k], [P.x1 - k, P.y1 - P.c - k], [P.x1 - P.c - k, P.y1 - k], [P.x0 + P.c + k, P.y1 - k], [P.x0 + k, P.y1 - P.c - k], [P.x0 + k, P.y0 + P.c + k]]);
  let side = '';
  along(470, 1340, 87, (y) => {
    side += minor(178, r1(y), 14) + minor(1022, r1(y), 14);
  });
  const layer = svgUrl(`
    <path d="${fringe}" stroke="#d9ccb0" stroke-width="5" stroke-linecap="round"/>
    <path d="${fringe}" stroke="#f4ecdc" stroke-width="2.2" stroke-linecap="round"/>
    ${band(0, DARK)}${band(8, IVORY)}${band(24, BORDER)}${band(96, IVORY)}${band(106, DARK)}${band(110, FIELD)}
    ${guard}${motifs}
    ${gul(300, 290, 210, 150)}${gul(600, 290, 210, 150)}${gul(900, 290, 210, 150)}
    ${gul(300, 1512, 210, 150)}${gul(600, 1512, 210, 150)}${gul(900, 1512, 210, 150)}
    ${minor(450, 290, 14)}${minor(750, 290, 14)}${minor(450, 1512, 14)}${minor(750, 1512, 14)}
    ${side}
    <path d="${panel(-10)}" fill="${IVORY}"/>
    <path d="${panel(-4)}" fill="${NAVY}"/>
    <path d="${panel(0)}" fill="#f6ecd6"/>
    <path d="${panel(12)}" fill="none" stroke="${FIELD}" stroke-width="1.6"/>
    ${diamond(600, 590, 5, FIELD)}${hline(530, 585, 590, FIELD, 1.2)}${hline(615, 670, 590, FIELD, 1.2)}
    ${diamond(290, 1037, 6, NAVY)}${diamond(910, 1037, 6, NAVY)}
  `);
  return {
    name: 'Gilam',
    fonts: ['Yeseva', 'Cormorant', 'Montserrat'],
    bg: '#efe6d4',
    color: NAVY,
    layer,
    qrColors: { dark: NAVY, light: '#f6ecd6' },
    spec: {
      guest: { top: 434, h: 140, maxWidth: 660, fit: [72, 46, 14], style: { fontStyle: 'italic', fontWeight: 500 } },
      line: { top: 610, style: caps(17, 3.5, { fontFamily: 'Montserrat', fontWeight: 500, color: FIELD }) },
      groom: { top: 660, h: 140, style: { fontFamily: 'Yeseva', fontSize: 104, color: FIELD } },
      amp: { top: 790, h: 80, style: { fontSize: 72, fontStyle: 'italic', color: NAVY } },
      bride: { top: 860, h: 130, style: { fontFamily: 'Yeseva', fontSize: 88, color: FIELD } },
      date: { top: 1008, h: 58, style: { fontFamily: 'Yeseva', fontSize: 40, letterSpacing: 8 } },
      qr: { x: 485, y: 1120, size: 230 },
    },
  };
})();

/* 25 ─ Paxta: cotton branches, fluffy bolls */
const paxta = (() => {
  const INK = '#4d4a43';
  const GREEN = '#7c9a6a';
  const BROWN = '#8a6a4f';
  const STEM = '#7d6b55';
  function boll(cx, cy, r, rot) {
    let bract = '';
    for (let i = 0; i < 5; i++) {
      const a = rot + i * 72 + 36;
      bract += `<path d="M0 ${r1(-r * 0.2)} C${r1(r * 0.28)} ${r1(-r * 0.6)} ${r1(r * 0.12)} ${r1(-r * 1.1)} 0 ${r1(-r * 1.32)} C${r1(-r * 0.12)} ${r1(-r * 1.1)} ${r1(-r * 0.28)} ${r1(-r * 0.6)} 0 ${r1(-r * 0.2)}Z" transform="rotate(${a})" fill="${BROWN}"/>`;
    }
    let lobes = '';
    for (let i = 0; i < 5; i++) {
      const a = ((rot + i * 72) * Math.PI) / 180;
      const circles = [
        [0.5, 0, 0.42],
        [0.78, 0.22, 0.28],
        [0.78, -0.22, 0.28],
        [0.3, 0.2, 0.26],
        [0.3, -0.2, 0.26],
      ].map(([d, o, rr]) => {
        const x = Math.cos(a) * d * r - Math.sin(a) * o * r;
        const y = Math.sin(a) * d * r + Math.cos(a) * o * r;
        return `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r1(rr * r)}"/>`;
      });
      lobes += `<g stroke="#cfc8bb" stroke-width="3">${circles.join('')}</g><g fill="#ffffff">${circles.join('')}</g>`;
    }
    return `<g transform="translate(${cx} ${cy})">
      <ellipse cx="6" cy="10" rx="${r1(r * 1.05)}" ry="${r1(r * 0.95)}" fill="#8f877a" fill-opacity=".22" filter="url(#soft)"/>
      ${bract}
      <g fill="#ffffff">${lobes}</g>
      <circle r="${r1(r * 0.08)}" fill="#e9e3d8"/>
    </g>`;
  }
  const leafPath = 'M0 0 C-20 -5 -45 -10 -56 -36 L-40 -40 C-56 -62 -50 -88 -36 -102 L-22 -82 C-18 -112 -6 -128 0 -142 C6 -128 18 -112 22 -82 L36 -102 C50 -88 56 -62 40 -40 L56 -36 C45 -10 20 -5 0 0Z';
  const cottonLeaf = (x, y, s, rot) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
      <path d="${leafPath}" fill="#eef2e8" stroke="${GREEN}" stroke-width="${r1(2 / s)}" stroke-linejoin="round"/>
      <path d="M0 0 V-128 M0 -12 L-36 -90 M0 -12 L36 -90 M0 -6 L-44 -38 M0 -6 L44 -38" fill="none" stroke="${GREEN}" stroke-width="${r1(1.3 / s)}"/>
    </g>`;
  const bud = (x, y, s, rot) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
      <path d="M0 0 C-14 -10 -16 -34 0 -50 C16 -34 14 -10 0 0Z" fill="#c9d6bc" stroke="${GREEN}" stroke-width="1.6"/>
      <path d="M0 2 L-12 -22 M0 2 L12 -22 M0 2 V-26" stroke="${BROWN}" stroke-width="2"/>
    </g>`;
  const stem = (d, w = 2.4) => `<path d="${d}" fill="none" stroke="${STEM}" stroke-width="${w}" stroke-linecap="round"/>`;
  const layer = svgUrl(
    `
    <rect x="56" y="56" width="1088" height="1688" fill="none" stroke="#d9d3c7" stroke-width="1.4"/>
    ${stem('M40 1790 C110 1690 200 1610 330 1560', 3)}
    ${stem('M120 1690 C100 1600 110 1500 150 1420', 2.4)}
    ${stem('M210 1630 C260 1600 330 1470 380 1420', 2)}
    ${stem('M260 1600 C320 1630 380 1680 420 1700', 2)}
    ${cottonLeaf(175, 1640, 0.95, -125)}${cottonLeaf(250, 1600, 0.8, 20)}${cottonLeaf(95, 1560, 0.72, -30)}
    ${bud(380, 1420, 0.9, 30)}${bud(420, 1700, 0.7, 110)}
    ${boll(150, 1410, 62, -20)}${boll(330, 1560, 72, 12)}
    ${stem('M1170 30 C1120 120 1020 210 880 270', 3)}
    ${stem('M1060 160 C1070 230 1060 300 1040 350', 2)}
    ${stem('M980 222 C960 180 930 150 890 130', 2)}
    ${cottonLeaf(1000, 205, 0.8, 210)}${cottonLeaf(1085, 120, 0.68, -50)}
    ${bud(890, 130, 0.75, -70)}
    ${boll(880, 270, 60, 30)}${boll(1040, 352, 46, 0)}
    ${hline(520, 580, 572, GREEN, 1.2)}${hline(620, 680, 572, GREEN, 1.2)}${leaf(600, 572, 16, -135, GREEN)}${leaf(600, 572, 16, -45, GREEN)}
  `,
    `<filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="9"/></filter>`
  );
  return {
    name: 'Paxta',
    fonts: ['Tangerine', 'Poiret One', 'Josefin', 'Montserrat', 'Cormorant'],
    bg: 'radial-gradient(ellipse at 50% 45%, #ffffff 0%, #f6f4ef 70%, #eeebe4 100%)',
    color: INK,
    layer,
    qrColors: { dark: INK, light: '#f8f7f3' },
    spec: {
      guest: { top: 410, h: 150, maxWidth: 700, fit: [76, 50, 14], style: { fontFamily: 'Montserrat', fontWeight: 300 } },
      line: { top: 600, style: caps(20, 6, { fontFamily: 'Josefin', color: '#5f7d4f' }) },
      groom: { top: 650, h: 210, style: { fontFamily: 'Tangerine', fontSize: 200 } },
      amp: { top: 835, h: 90, style: { fontSize: 84, fontStyle: 'italic', color: BROWN } },
      bride: { top: 900, h: 210, style: { fontFamily: 'Tangerine', fontSize: 180 } },
      date: { top: 1140, h: 60, style: { fontFamily: 'Poiret One', fontSize: 46, letterSpacing: 10 } },
      qr: { x: 485, y: 1290, size: 230 },
    },
  };
})();

/* 26 ─ Zardo'zi: gold embroidery on burgundy velvet */
const zardozi = (() => {
  const G = '#dcb766';
  const DEEP = '#7a5519';
  const PLUM = '#3a0a1f';
  const gl = (x, y, len, ang) => leaf(x, y, len, ang, 'url(#gold)', `stroke="${DEEP}" stroke-width="1"`);
  const flower = (x, y, r) => {
    let p = '';
    for (let i = 0; i < 6; i++) {
      const a = (i * Math.PI) / 3;
      p += `<circle cx="${r1(x + Math.cos(a) * r)}" cy="${r1(y + Math.sin(a) * r)}" r="${r1(r * 0.62)}"/>`;
    }
    return `<g fill="url(#gold)" stroke="${DEEP}" stroke-width=".8">${p}</g><circle cx="${x}" cy="${y}" r="${r1(r * 0.55)}" fill="${PLUM}"/><circle cx="${x}" cy="${y}" r="${r1(r * 0.28)}" fill="${G}"/>`;
  };
  function curl(x, y, r, dir, start) {
    const pts = [];
    for (let i = 0; i <= 30; i++) {
      const f = i / 30;
      const a = start + dir * f * Math.PI * 1.6;
      const rr = r * (1 - 0.75 * f);
      pts.push([x + Math.cos(a) * rr, y + Math.sin(a) * rr]);
    }
    return `<path d="M${pts.map(([a, b]) => `${r1(a)} ${r1(b)}`).join(' L')}" fill="none" stroke="url(#gold)" stroke-width="3" stroke-linecap="round"/>`;
  }
  // Dense embroidered vine filling a band of length `len` (local coords, v = 0 is the band centre).
  function vineBand(len) {
    const n = Math.max(2, Math.round(len / 116));
    const P = len / n;
    const A = 20;
    let d = 'M0 0';
    let bits = '';
    for (let k = 0; k < n * 2; k++) {
      const s0 = (k * P) / 2;
      const sg = k % 2 ? -1 : 1;
      d += ` C${r1(s0 + P * 0.18)} ${sg * A * 1.3} ${r1(s0 + P * 0.32)} ${sg * A * 1.3} ${r1(s0 + P / 2)} 0`;
      const cx = s0 + P * 0.25;
      bits += gl(r1(cx - 6), sg * A, 30, sg > 0 ? 150 : -150);
      bits += gl(r1(cx + 6), sg * A, 30, sg > 0 ? 30 : -30);
      bits += curl(r1(s0 + P * 0.44), -sg * 14, 16, sg, sg > 0 ? Math.PI * 0.9 : -Math.PI * 0.9);
      bits += flower(r1(s0 + P * 0.25), r1(-sg * 20), 6);
      bits += `<circle cx="${r1(s0 + P * 0.5)}" cy="0" r="3.4" fill="${G}"/>`;
    }
    return `<path d="${d}" fill="none" stroke="url(#gold)" stroke-width="3"/>${bits}`;
  }
  function rosette(cx, cy, r) {
    let p = '';
    for (let i = 0; i < 8; i++) p += `<ellipse cx="0" cy="${r1(-r * 0.62)}" rx="${r1(r * 0.24)}" ry="${r1(r * 0.42)}" transform="rotate(${i * 45})" fill="url(#gold)" stroke="${DEEP}" stroke-width="1.2"/>`;
    for (let i = 0; i < 8; i++) p += `<ellipse cx="0" cy="${r1(-r * 0.66)}" rx="${r1(r * 0.12)}" ry="${r1(r * 0.28)}" transform="rotate(${i * 45 + 22.5})" fill="url(#gold)" stroke="${DEEP}" stroke-width=".8"/>`;
    return `<g transform="translate(${cx} ${cy})">${p}<circle r="${r1(r * 0.34)}" fill="url(#gold)" stroke="${DEEP}" stroke-width="1.4"/><circle r="${r1(r * 0.18)}" fill="${PLUM}"/><circle r="${r1(r * 0.08)}" fill="${G}"/></g>`;
  }
  // Central buta crest with scrolls, drawn pointing up at (0,0).
  const crestArt = `
      <path d="M-190 10 C-140 -6 -90 12 -40 -14 M190 10 C140 -6 90 12 40 -14" fill="none" stroke="url(#gold)" stroke-width="3"/>
      ${gl(-160, 2, 34, -150)}${gl(-120, 2, 32, -35)}${gl(-80, 0, 30, -140)}
      ${gl(160, 2, 34, -30)}${gl(120, 2, 32, -145)}${gl(80, 0, 30, -40)}
      ${curl(-200, -8, 16, -1, 0)}${curl(200, -8, 16, 1, Math.PI)}
      <path d="M0 -96 C34 -70 46 -30 0 14 C-46 -30 -34 -70 0 -96Z" fill="url(#gold)" stroke="${DEEP}" stroke-width="1.4"/>
      <path d="M0 -74 C20 -56 24 -30 0 -4 C-24 -30 -20 -56 0 -74Z" fill="${PLUM}"/>
      ${flower(0, -36, 8)}
      ${flower(-50, -30, 6)}${flower(50, -30, 6)}`;
  const crest = (y, flip) => `<g transform="translate(600 ${y}) scale(1 ${flip})">${crestArt}</g>`;
  // Inner-corner fan (corner at 0,0 pointing into the card).
  const fan = `${gl(30, 30, 44, 8)}${gl(30, 30, 44, 82)}${curl(84, 30, 10, 1, Math.PI)}${curl(30, 84, 10, -1, 0)}${rosette(30, 30, 24)}`;
  let seq = '';
  const dotsRect = (i, step) => {
    for (let x = i + 10; x <= 1200 - i - 10; x += step) seq += `<circle cx="${x}" cy="${i}" r="2.8"/><circle cx="${x}" cy="${1800 - i}" r="2.8"/>`;
    for (let y = i + 10; y <= 1800 - i - 10; y += step) seq += `<circle cx="${i}" cy="${y}" r="2.8"/><circle cx="${1200 - i}" cy="${y}" r="2.8"/>`;
  };
  dotsRect(52, 16);
  dotsRect(192, 16);
  const rect = (i, w) => `<rect x="${i}" y="${i}" width="${1200 - 2 * i}" height="${1800 - 2 * i}" fill="none" stroke="url(#gold)" stroke-width="${w}"/>`;
  const layer = svgUrl(
    `
    ${rect(40, 3)}${rect(62, 1.4)}${rect(180, 1.4)}${rect(202, 3)}
    <g fill="${G}">${seq}</g>
    <g transform="translate(180 121)">${vineBand(840)}</g>
    <g transform="translate(1020 1679) rotate(180)">${vineBand(840)}</g>
    <g transform="translate(1079 180) rotate(90)">${vineBand(1440)}</g>
    <g transform="translate(121 1620) rotate(-90)">${vineBand(1440)}</g>
    ${rosette(121, 121, 54)}${rosette(1079, 121, 54)}${rosette(121, 1679, 54)}${rosette(1079, 1679, 54)}
    <g transform="translate(214 214)">${fan}</g><g transform="translate(986 214) scale(-1 1)">${fan}</g>
    <g transform="translate(214 1586) scale(1 -1)">${fan}</g><g transform="translate(986 1586) scale(-1 -1)">${fan}</g>
    ${crest(318, 1)}${crest(1500, -1)}
    ${hline(290, 360, 1082, G, 1.2)}${hline(840, 910, 1082, G, 1.2)}${diamond(282, 1082, 4, G)}${diamond(918, 1082, 4, G)}
  `,
    `<linearGradient id="gold" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1200" y2="1800">
      <stop offset="0" stop-color="#b8892f"/><stop offset=".18" stop-color="#f6e3a1"/><stop offset=".36" stop-color="#cfa046"/>
      <stop offset=".55" stop-color="#fbeab8"/><stop offset=".75" stop-color="#c0913a"/><stop offset="1" stop-color="#f3d990"/>
    </linearGradient>`
  );
  const goldName = goldText('#b08434', '#e8ca7e', '#fff0c4');
  return {
    name: 'Zardo‘zi',
    fonts: ['Playball', 'Playfair', 'Cinzel'],
    bg: 'radial-gradient(ellipse at 50% 42%, #7a1d46 0%, #520f2b 55%, #2c0616 100%)',
    color: '#f3e4bf',
    layer,
    qrColors: { dark: PLUM, light: '#f7efdc' },
    spec: {
      guest: { top: 350, h: 150, maxWidth: 720, fit: [86, 54, 14], style: { fontFamily: 'Cormorant', fontStyle: 'italic' } },
      line: { top: 518, style: caps(16, 4, { fontFamily: 'Cinzel', color: G }) },
      groom: { top: 570, h: 200, style: { fontFamily: 'Playball', fontSize: 146, padding: '0 20px', ...goldName } },
      amp: { top: 755, h: 90, style: { fontFamily: 'Playfair', fontStyle: 'italic', fontSize: 74, color: G } },
      bride: { top: 828, h: 200, style: { fontFamily: 'Playball', fontSize: 124, padding: '0 20px', ...goldName } },
      date: { top: 1052, h: 60, style: { fontFamily: 'Cinzel', fontSize: 40, letterSpacing: 10 } },
      qr: { x: 485, y: 1180, size: 230, plate: { bg: '#f7efdc', pad: 18, border: `3px solid ${G}` } },
    },
  };
})();

/* 27 ─ Islimi: fine gold spiral scrolls on ivory */
const islimi = (() => {
  const G = '#a8843f';
  const INK = '#3a2f22';
  // Running spiral scroll inside a strip of length `len`, centred on v = 0.
  function runScroll(len, A, periods) {
    const P = len / periods;
    let stem = 'M0 0';
    let curls = '';
    for (let k = 0; k < periods * 2; k++) {
      const s0 = (k * P) / 2;
      const sg = k % 2 ? -1 : 1;
      stem += ` C${r1(s0 + P * 0.18)} ${r1(sg * A * 1.3)} ${r1(s0 + P * 0.32)} ${r1(sg * A * 1.3)} ${r1(s0 + P / 2)} 0`;
      // Tendril leaves the crest and curls into the opposite hollow.
      const cx = s0 + P * 0.42;
      const cy = -sg * A * 0.35;
      const pts = [];
      const start = Math.atan2(sg * A * 0.95 - cy, s0 + P * 0.25 - cx);
      const r0 = Math.hypot(sg * A * 0.95 - cy, s0 + P * 0.25 - cx);
      for (let i = 0; i <= 36; i++) {
        const f = i / 36;
        const a = start - sg * f * Math.PI * 1.7;
        const rr = r0 * (1 - 0.82 * f);
        pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]);
      }
      curls += `<path d="M${pts.map(([x, y]) => `${r1(x)} ${r1(y)}`).join(' L')}" fill="none" stroke="${G}" stroke-width="1.5"/>`;
      curls += `<circle cx="${r1(pts[36][0])}" cy="${r1(pts[36][1])}" r="2.6" fill="${G}"/>`;
      curls += leaf(r1(s0 + P * 0.25), r1(sg * A * 0.95), 17, sg > 0 ? 35 : -35, 'none', `stroke="${G}" stroke-width="1.2"`);
    }
    return `<path d="${stem}" fill="none" stroke="${G}" stroke-width="1.8"/>${curls}`;
  }
  function rosette(cx, cy, r) {
    let p = '';
    for (let i = 0; i < 8; i++) p += `<path d="M0 ${r1(-r * 0.3)} C${r1(r * 0.22)} ${r1(-r * 0.5)} ${r1(r * 0.16)} ${r1(-r * 0.82)} 0 ${r1(-r * 0.92)} C${r1(-r * 0.16)} ${r1(-r * 0.82)} ${r1(-r * 0.22)} ${r1(-r * 0.5)} 0 ${r1(-r * 0.3)}Z" transform="rotate(${i * 45 + 22.5})"/>`;
    return `<g transform="translate(${cx} ${cy})" fill="none" stroke="${G}" stroke-width="1.4">
      <circle r="${r}" stroke-width="1.6"/><circle r="${r1(r * 1.14)}" stroke-width=".8"/>${p}
      <circle r="${r1(r * 0.22)}" fill="${G}"/></g>`;
  }
  // Mirrored pair of spirals with a split palmette between them.
  function cartouche(cx, cy, flip) {
    const half = `
      <path d="M0 0 C-30 -8 -70 -40 -110 -30 C-150 -20 -160 20 -130 32 C-104 42 -86 20 -100 6 C-110 -4 -124 6 -118 16" fill="none" stroke="${G}" stroke-width="1.6"/>
      <path d="M-40 -18 C-60 -60 -110 -66 -150 -52" fill="none" stroke="${G}" stroke-width="1.2"/>
      ${leaf(-150, -52, 22, 200, 'none', `stroke="${G}" stroke-width="1.2"`)}
      ${leaf(-70, -34, 20, -120, 'none', `stroke="${G}" stroke-width="1.2"`)}
      <path d="M0 -10 C-10 -30 -22 -48 -18 -70 C-8 -60 -2 -44 0 -30" fill="none" stroke="${G}" stroke-width="1.4"/>`;
    return `<g transform="translate(${cx} ${cy}) scale(1 ${flip})">${half}<g transform="scale(-1 1)">${half}</g>
      <path d="M0 -84 C8 -64 8 -40 0 -24 C-8 -40 -8 -64 0 -84Z" fill="${G}"/>
      <circle cx="0" cy="0" r="5" fill="${G}"/>
      ${hline(-280, -170, 0, G, 1)}${hline(170, 280, 0, G, 1)}</g>`;
  }
  const layer = svgUrl(`
    <rect x="60" y="60" width="1080" height="1680" fill="none" stroke="${G}" stroke-width="1.6"/>
    <rect x="160" y="160" width="880" height="1480" fill="none" stroke="${G}" stroke-width="1.6"/>
    <rect x="168" y="168" width="864" height="1464" fill="none" stroke="${G}" stroke-width=".7"/>
    <g transform="translate(160 110)">${runScroll(880, 20, 6)}</g>
    <g transform="translate(1040 1690) rotate(180)">${runScroll(880, 20, 6)}</g>
    <g transform="translate(1090 160) rotate(90)">${runScroll(1480, 20, 10)}</g>
    <g transform="translate(110 1640) rotate(-90)">${runScroll(1480, 20, 10)}</g>
    ${rosette(110, 110, 34)}${rosette(1090, 110, 34)}${rosette(110, 1690, 34)}${rosette(1090, 1690, 34)}
    ${cartouche(600, 290, 1)}${cartouche(600, 1560, -1)}
    ${hline(290, 370, 1122, G, 1.2)}${hline(830, 910, 1122, G, 1.2)}
  `);
  return {
    name: 'Islimi',
    fonts: ['Alex Brush', 'Old Standard', 'Marcellus'],
    bg: 'radial-gradient(ellipse at 50% 45%, #fdfaf3 0%, #f7f1e4 100%)',
    color: INK,
    font: 'Old Standard',
    layer,
    qrColors: { dark: INK, light: '#fbf7ee' },
    spec: {
      guest: { top: 350, h: 150, maxWidth: 720, fit: [76, 50, 14], style: { fontFamily: 'Cormorant', fontStyle: 'italic' } },
      line: { top: 525, style: caps(19, 6, { fontFamily: 'Marcellus', color: G }) },
      groom: { top: 590, h: 200, style: { fontFamily: 'Alex Brush', fontSize: 160 } },
      amp: { top: 775, h: 90, style: { fontStyle: 'italic', fontSize: 70, color: G } },
      bride: { top: 850, h: 200, style: { fontFamily: 'Alex Brush', fontSize: 146 } },
      date: { top: 1092, h: 60, style: { fontFamily: 'Marcellus', fontSize: 44, letterSpacing: 10 } },
      qr: { x: 485, y: 1250, size: 230 },
    },
  };
})();

/* 28 ─ Lola: red tulips rising from the bottom corners */
const lola = (() => {
  const RED = '#d0243a';
  const DEEP = '#9e1529';
  const GREEN = '#3c8a4c';
  const LIGHT = '#79b35e';
  const INK = '#24452e';
  function head(x, y, s, rot) {
    return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
      <path d="M-26 -18 C-30 -64 -10 -96 0 -112 C10 -96 30 -64 26 -18Z" fill="${DEEP}"/>
      <path d="M4 2 C-36 4 -50 -34 -44 -98 C-26 -84 -6 -62 10 -34Z" fill="${RED}"/>
      <path d="M-4 2 C36 4 50 -34 44 -98 C26 -84 6 -62 -10 -34Z" fill="#e2394c"/>
      <path d="M-30 -30 C-32 -54 -34 -70 -36 -84" fill="none" stroke="#f07a86" stroke-width="3" stroke-linecap="round" stroke-opacity=".7"/>
    </g>`;
  }
  const blade = (x, y, len, w, rot, fill) => `<g transform="translate(${x} ${y}) rotate(${rot})">
      <path d="M0 0 C${r1(w)} ${r1(-len * 0.35)} ${r1(w * 0.6)} ${r1(-len * 0.8)} ${r1(w * 0.2)} ${r1(-len)} C${r1(-w * 0.3)} ${r1(-len * 0.7)} ${r1(-w * 0.5)} ${r1(-len * 0.3)} 0 0Z" fill="${fill}"/>
      <path d="M${r1(w * 0.1)} ${r1(-len * 0.08)} C${r1(w * 0.35)} ${r1(-len * 0.4)} ${r1(w * 0.35)} ${r1(-len * 0.75)} ${r1(w * 0.2)} ${r1(-len * 0.96)}" fill="none" stroke="#ffffff" stroke-opacity=".35" stroke-width="2"/>
    </g>`;
  function tulip(bx, hx, hy, s, rot) {
    return `<path d="M${bx} 1800 Q${r1((bx + hx) / 2 + (hx - bx) * 0.2)} ${r1((1800 + hy) / 2)} ${hx} ${hy}" fill="none" stroke="${GREEN}" stroke-width="${r1(6 * s)}" stroke-linecap="round"/>${head(hx, hy, s, rot)}`;
  }
  const cluster = `
    ${blade(140, 1810, 360, 70, 18, LIGHT)}${blade(80, 1810, 300, 60, -8, GREEN)}
    ${tulip(150, 170, 1300, 1.25, 4)}
    ${tulip(200, 300, 1450, 1.05, 14)}
    ${tulip(110, 76, 1520, 0.9, -10)}
    ${blade(250, 1810, 280, 56, 36, GREEN)}${blade(40, 1810, 220, 48, -28, LIGHT)}
  `;
  const small = (x, y) => `${head(x, y, 0.34, 0)}<path d="M${x} ${y} V${y + 24}" stroke="${GREEN}" stroke-width="2.4"/>${blade(x, y + 24, 30, 10, 38, GREEN)}${blade(x, y + 24, 30, 10, -38, LIGHT)}`;
  const layer = svgUrl(`
    <rect x="56" y="56" width="1088" height="1688" fill="none" stroke="#efc9ce" stroke-width="1.6"/>
    ${cluster}
    <g transform="translate(1200 0) scale(-1 1)">${cluster}</g>
    ${small(600, 450)}
    ${hline(480, 570, 440, LIGHT, 1.4)}${hline(630, 720, 440, LIGHT, 1.4)}
    ${diamond(318, 1110, 5, RED)}${diamond(882, 1110, 5, RED)}
  `);
  return {
    name: 'Lola',
    fonts: ['Dancing', 'Playfair', 'Josefin'],
    bg: '#fffdfb',
    color: INK,
    layer,
    qrColors: { dark: INK, light: '#fffdfb' },
    spec: {
      guest: { top: 232, h: 150, maxWidth: 760, fit: [86, 54, 14], style: { fontFamily: 'Cormorant', fontStyle: 'italic' } },
      line: { top: 510, style: caps(20, 6, { fontFamily: 'Josefin', color: RED }) },
      groom: { top: 570, h: 190, style: { fontFamily: 'Dancing', fontSize: 140, color: RED } },
      amp: { top: 750, h: 90, style: { fontFamily: 'Playfair', fontStyle: 'italic', fontSize: 72, color: GREEN } },
      bride: { top: 830, h: 190, style: { fontFamily: 'Dancing', fontSize: 120, color: RED } },
      date: { top: 1080, h: 60, style: { fontFamily: 'Josefin', fontSize: 44, letterSpacing: 12 } },
      qr: { x: 485, y: 1250, size: 230 },
    },
  };
})();

/* 29 ─ Tilla: tilla-qosh bridal diadem with coin pendants */
const tilla = (() => {
  const G = '#d9b56a';
  const DEEP = '#7d5a1e';
  const RUBY = '#b3122e';
  const TURQ = '#2bb3a8';
  const q = (p0, c, p1, t) => (1 - t) ** 2 * p0 + 2 * (1 - t) * t * c + t * t * p1;
  const up = (t) => [q(120, 600, 1080, t), q(300, -70, 300, t)];
  const lo = (t) => [q(120, 600, 1080, t), q(300, 140, 300, t)];
  const stone = (x, y, r, color) => `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r1(r + 3)}" fill="#f6dc9a" stroke="${DEEP}" stroke-width="1"/><circle cx="${r1(x)}" cy="${r1(y)}" r="${r1(r)}" fill="${color}"/><circle cx="${r1(x - r * 0.3)}" cy="${r1(y - r * 0.35)}" r="${r1(r * 0.28)}" fill="#fff" fill-opacity=".55"/>`;
  const coin = (x, y, r) => `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r}" fill="url(#gold)" stroke="${DEEP}" stroke-width="1"/><circle cx="${r1(x)}" cy="${r1(y)}" r="${r1(r * 0.62)}" fill="none" stroke="${DEEP}" stroke-width=".9"/><circle cx="${r1(x)}" cy="${r1(y)}" r="1.8" fill="${DEEP}"/>`;
  function chain(x, y, len, bead) {
    let s = `<path d="M${r1(x)} ${r1(y)} V${r1(y + len)}" stroke="${G}" stroke-width="1.4"/>`;
    for (let k = 10; k < len - 6; k += 12) s += `<circle cx="${r1(x)}" cy="${r1(y + k)}" r="2.6" fill="${G}"/>`;
    s += stone(x, y + len * 0.55, 4, bead);
    s += coin(x, y + len + 12, 12);
    return s;
  }
  // Diadem body.
  let upEdge = '';
  let loEdge = '';
  for (let i = 0; i <= 40; i++) {
    const [ux, uy] = up(i / 40);
    upEdge += `${i ? ' L' : 'M'}${r1(ux)} ${r1(uy)}`;
  }
  for (let i = 40; i >= 0; i--) {
    const [lx, ly] = lo(i / 40);
    loEdge += ` L${r1(lx)} ${r1(ly)}`;
  }
  let jewels = '';
  let crestS = '';
  let pend = '';
  for (let i = 1; i < 16; i++) {
    const t = i / 16;
    const [ux, uy] = up(t);
    const [, ly] = lo(t);
    const th = ly - uy;
    const my = (uy + ly) / 2;
    if (Math.abs(t - 0.5) > 0.07) jewels += stone(ux, my, Math.max(5, th * 0.22), i % 2 ? RUBY : TURQ);
  }
  for (let i = 1; i < 34; i++) {
    const t = i / 34;
    const [ux, uy] = up(t);
    crestS += `<path d="M${r1(ux - 9)} ${r1(uy + 2)} Q${r1(ux)} ${r1(uy - 26)} ${r1(ux + 9)} ${r1(uy + 2)}Z" fill="url(#gold)" stroke="${DEEP}" stroke-width=".8"/><circle cx="${r1(ux)}" cy="${r1(uy - 20)}" r="3" fill="${i % 2 ? TURQ : G}"/>`;
  }
  for (let i = 1; i < 26; i++) {
    const t = i / 26;
    const [lx, ly] = lo(t);
    const len = 40 + Math.sin(Math.PI * t) * 100;
    pend += chain(lx, ly - 2, len, i % 2 ? TURQ : RUBY);
  }
  // Long temple chains from both ends.
  let temple = '';
  for (const [x0, dir] of [[120, 1], [1080, -1]]) {
    [0, 1, 2].forEach((k) => {
      const x = x0 + dir * k * 22;
      const len = 300 - k * 60;
      temple += chain(x, 300, len, k === 1 ? RUBY : TURQ);
    });
  }
  let bottomRow = '';
  for (let k = -5; k <= 5; k++) bottomRow += coin(600 + k * 34, 1666 + Math.abs(k) * -2, 10);
  const layer = svgUrl(
    `
    ${temple}${pend}
    <path d="${upEdge}${loEdge}Z" fill="url(#gold)" stroke="${DEEP}" stroke-width="1.6"/>
    ${crestS}
    <path d="${upEdge}" fill="none" stroke="#fbe7b0" stroke-width="1.2" stroke-dasharray="1.5 5" transform="translate(0 7)"/>
    ${jewels}
    <circle cx="600" cy="168" r="62" fill="url(#gold)" stroke="${DEEP}" stroke-width="1.6"/>
    <circle cx="600" cy="168" r="55" fill="none" stroke="#fbe7b0" stroke-width="1.2" stroke-dasharray="1.5 5"/>
    ${Array.from({ length: 12 }, (_, i) => stone(600 + Math.cos((i * Math.PI) / 6) * 43, 168 + Math.sin((i * Math.PI) / 6) * 43, 5, i % 2 ? TURQ : '#f4efe4')).join('')}
    ${stone(600, 168, 25, RUBY)}
    ${bottomRow}
    ${hline(250, 390, 1666, G, 1)}${hline(810, 950, 1666, G, 1)}
    ${hline(280, 360, 1160, G, 1.2)}${hline(840, 920, 1160, G, 1.2)}
  `,
    `<linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f7df9f"/><stop offset=".45" stop-color="#d4a84e"/><stop offset="1" stop-color="#9a7128"/></linearGradient>`
  );
  return {
    name: 'Tilla',
    fonts: ['DM Serif', 'Cormorant', 'Montserrat'],
    bg: 'radial-gradient(ellipse at 50% 35%, #3e2718 0%, #25160d 60%, #150c07 100%)',
    color: '#f3e6c8',
    layer,
    qrColors: { dark: '#25160d', light: '#f5ead3' },
    spec: {
      guest: { top: 440, h: 150, maxWidth: 720, fit: [80, 52, 14], style: { fontStyle: 'italic' } },
      line: { top: 610, style: caps(19, 6, { fontFamily: 'Montserrat', color: G }) },
      groom: { top: 670, h: 180, style: { fontFamily: 'DM Serif', fontSize: 132, padding: '0 10px', ...goldText('#a57b2e', '#e2c275', '#fbeab8') } },
      amp: { top: 840, h: 90, style: { fontFamily: 'DM Serif', fontStyle: 'italic', fontSize: 84, color: G } },
      bride: { top: 920, h: 170, style: { fontFamily: 'DM Serif', fontSize: 112, padding: '0 10px', ...goldText('#a57b2e', '#e2c275', '#fbeab8') } },
      date: { top: 1130, h: 60, style: { fontFamily: 'DM Serif', fontSize: 44, letterSpacing: 10 } },
      qr: { x: 480, y: 1300, size: 240, plate: { bg: '#f5ead3', pad: 22, radius: 8, border: `2px solid ${G}` } },
    },
  };
})();

/* 30 ─ Karvon: camel caravan crossing dunes at sunset */
const karvon = (() => {
  const SIL = '#3a1a2a';
  const rand = rng(30);
  const ridge = (x) => 1478 + 22 * Math.sin((x - 100) / 190) + 10 * Math.sin(x / 70);
  // Bactrian camel facing left, feet on y = 0.
  const CAMEL =
    'M-92 -114 C-94 -122 -86 -130 -76 -128 L-72 -137 L-67 -127 C-60 -122 -56 -110 -54 -100 C-50 -92 -44 -90 -38 -94 ' +
    'C-34 -118 -18 -134 -10 -112 C-6 -104 0 -104 4 -110 C12 -134 30 -128 36 -104 C44 -96 58 -92 60 -76 ' +
    'C62 -66 58 -56 52 -48 C50 -36 52 -18 53 0 L44 0 C44 -16 42 -30 38 -46 C26 -54 -10 -54 -26 -52 ' +
    'C-30 -40 -32 -20 -32 0 L-41 0 C-41 -22 -44 -44 -50 -60 C-58 -72 -66 -90 -72 -104 C-76 -110 -84 -110 -92 -106Z';
  function camel(x, s, pack) {
    const y = ridge(x);
    return `<g transform="translate(${r1(x)} ${r1(y)}) scale(${s})" fill="${SIL}" stroke="${SIL}">
      <path d="M-22 -54 L-16 0 M30 -52 L28 0" stroke-width="7" stroke-linecap="round" fill="none" stroke-opacity=".85"/>
      <path d="${CAMEL}" stroke="none"/>
      <path d="M60 -74 C66 -66 66 -56 63 -46" stroke-width="3" fill="none" stroke-linecap="round"/>
      ${
        pack
          ? '<path d="M-16 -104 C-16 -126 20 -126 20 -104Z" stroke="none"/><path d="M-12 -114 H16" stroke="#f3b27a" stroke-opacity=".45" stroke-width="2"/>'
          : '<circle cx="2" cy="-142" r="8" stroke="none"/><path d="M-9 -106 C-6 -120 -2 -132 2 -133 C6 -132 10 -120 13 -106Z" stroke="none"/>'
      }
    </g>`;
  }
  function walker(x) {
    const y = ridge(x);
    return `<g transform="translate(${r1(x)} ${r1(y)})" fill="${SIL}" stroke="${SIL}">
      <circle cx="0" cy="-98" r="9" stroke="none"/>
      <path d="M-9 -88 C-12 -60 -16 -30 -17 -8 H15 C14 -30 12 -60 9 -88Z" stroke="none"/>
      <path d="M-6 -10 L-10 0 M6 -10 L9 0" stroke-width="4" stroke-linecap="round"/>
      <path d="M-24 -122 L-18 0" stroke-width="3" stroke-linecap="round"/>
      <path d="M-6 -80 L-21 -64 M6 -80 L18 -66" stroke-width="4" stroke-linecap="round"/>
    </g>`;
  }
  let mid = `M0 1800 L0 ${r1(ridge(0))}`;
  for (let x = 0; x <= 1200; x += 10) mid += ` L${x} ${r1(ridge(x))}`;
  mid += ' L1200 1800Z';
  const S = 0.9;
  const WALKER = 200;
  const caravanXs = [350, 520, 690];
  // Lead ropes: walker's hand → first nose, then each tail → next nose.
  let rope = '';
  caravanXs.forEach((x, i) => {
    const nx = x - 90 * S;
    const ny = ridge(x) - 110 * S;
    const [px, py] = i === 0 ? [WALKER + 18, ridge(WALKER) - 68] : [caravanXs[i - 1] + 62 * S, ridge(caravanXs[i - 1]) - 70 * S];
    rope += `<path d="M${r1(px)} ${r1(py)} Q${r1((px + nx) / 2)} ${r1(Math.max(py, ny) + 18)} ${r1(nx)} ${r1(ny)}" stroke="${SIL}" stroke-width="1.6" fill="none"/>`;
  });
  let stars = '';
  for (let i = 0; i < 40; i++) {
    const x = 70 + rand() * 1060;
    const y = 70 + rand() * 300;
    if (x > 200 && x < 1000 && y > 150) continue;
    stars += `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r1(1 + rand() * 1.8)}" fill="#fff" fill-opacity="${r1(0.3 + rand() * 0.5)}"/>`;
  }
  const layer = svgUrl(
    `
    ${stars}
    <circle cx="600" cy="1300" r="330" fill="#ffd79a" fill-opacity=".45" filter="url(#glow)"/>
    <circle cx="600" cy="1300" r="230" fill="url(#sun)"/>
    <path d="M0 1400 C200 1350 380 1370 560 1402 S940 1380 1200 1340 V1800 H0Z" fill="#d6826a"/>
    <path d="${mid}" fill="#a2505a"/>
    <path d="M0 1640 C300 1590 560 1620 800 1606 S1080 1570 1200 1580 V1800 H0Z" fill="#6b2c3d"/>
    ${rope}
    ${walker(WALKER)}
    ${caravanXs.map((x, i) => camel(x, S, i !== 1)).join('')}
    ${sparkle(600, 1032, 10, '#fbeede', 0.8)}
    ${hline(250, 340, 930, '#f5c99a', 1.2)}${hline(860, 950, 930, '#f5c99a', 1.2)}
  `,
    `<radialGradient id="sun" cx=".5" cy=".4" r=".6"><stop offset="0" stop-color="#fff3d2"/><stop offset=".55" stop-color="#fcc57d"/><stop offset="1" stop-color="#f39460"/></radialGradient>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="50"/></filter>`
  );
  return {
    name: 'Karvon',
    fonts: ['Fraunces', 'Cormorant', 'Montserrat'],
    bg: 'linear-gradient(180deg, #291f4a 0%, #5a3468 24%, #a24f73 48%, #de7f6b 66%, #f5b477 80%, #f8d59c 100%)',
    color: '#fbeede',
    layer,
    qrColors: { dark: '#3a1a2a', light: '#fbf1e3' },
    spec: {
      guest: { top: 170, h: 150, maxWidth: 760, fit: [80, 52, 14], style: { fontStyle: 'italic' } },
      line: { top: 345, style: caps(19, 6, { fontFamily: 'Montserrat', color: '#f5c99a' }) },
      groom: { top: 410, h: 190, style: { fontFamily: 'Fraunces', fontStyle: 'italic', fontSize: 136 } },
      amp: { top: 590, h: 90, style: { fontFamily: 'Fraunces', fontStyle: 'italic', fontSize: 80, color: '#f5c99a' } },
      bride: { top: 670, h: 180, style: { fontFamily: 'Fraunces', fontStyle: 'italic', fontSize: 116 } },
      date: { top: 900, h: 60, style: { fontFamily: 'Fraunces', fontWeight: 600, fontSize: 40, letterSpacing: 10 } },
      qr: { x: 890, y: 1500, size: 224, plate: { bg: '#fbf1e3', pad: 16, radius: 6 } },
    },
  };
})();

export const designsC = [atlas, doppi, registon, gilam, paxta, zardozi, islimi, lola, tilla, karvon];
