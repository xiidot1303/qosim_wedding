import { diamond, hline, r1, sparkle, svgUrl } from './kit';

// Theme E — romantic, nature & luxury.
// Guest names use Cormorant or Montserrat: the only faces here with the full Uzbek
// Cyrillic set (Ҳ Қ Ғ Ў), so no glyph ever falls back to a mismatched font.

const caps = (size, spacing, extra) => ({ fontSize: size, letterSpacing: spacing, textTransform: 'uppercase', ...extra });

// Deterministic pseudo-random numbers so every render of a design is identical.
function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const rad = (deg) => (deg * Math.PI) / 180;

// A pair of short rules either side of the centred date, `gap` px clear of the centre.
const rules = (y, gap, len, stroke, w = 1.4) => hline(600 - gap - len, 600 - gap, y, stroke, w) + hline(600 + gap, 600 + gap + len, y, stroke, w);

// Evenly spaced points (by arc length) along a cubic Bézier.
function alongCubic(p0, c1, c2, p1, gap) {
  const pts = [];
  for (let i = 0; i <= 600; i++) {
    const t = i / 600;
    const u = 1 - t;
    pts.push([
      u ** 3 * p0[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t ** 3 * p1[0],
      u ** 3 * p0[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t ** 3 * p1[1],
    ]);
  }
  const out = [pts[0]];
  let acc = 0;
  for (let i = 1; i < pts.length; i++) {
    acc += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    if (acc >= gap) {
      out.push(pts[i]);
      acc = 0;
    }
  }
  return out;
}

/* 41 ─ Atirgul: cascading blush roses */
const atirgul = (() => {
  const INK = '#6e3a45';
  const ROSE = '#c98a8f';
  const GREEN = '#8ea184';
  const DEEPG = '#6d8364';
  const petal = (rr, ang, fill, deep, o = 0.35) =>
    `<path d="M0 0 C${r1(-rr * 0.8)} ${r1(-rr * 0.12)} ${r1(-rr * 0.9)} ${r1(-rr * 1.05)} 0 ${r1(-rr)} C${r1(rr * 0.9)} ${r1(-rr * 1.05)} ${r1(rr * 0.8)} ${r1(-rr * 0.12)} 0 0Z" transform="rotate(${ang})" fill="${fill}" stroke="${deep}" stroke-opacity="${o}" stroke-width="1.2"/>`;
  function rose(cx, cy, r, rot, [outer, mid, inner, deep]) {
    let s = '';
    for (let i = 0; i < 5; i++) s += petal(r, i * 72, outer, deep);
    for (let i = 0; i < 5; i++) s += petal(r * 0.76, i * 72 + 36, mid, deep);
    s += `<circle r="${r1(r * 0.5)}" fill="${inner}" stroke="${deep}" stroke-opacity=".3" stroke-width="1"/>`;
    for (let i = 0; i < 3; i++) s += petal(r * 0.44, i * 120 + 20, mid, deep, 0.5);
    // one continuous spiral for the tightly wrapped heart of the rose
    let d = '';
    for (let k = 0; k <= 48; k++) {
      const th = (k / 48) * Math.PI * 2.6;
      const rr = r * 0.34 * (1 - (k / 48) * 0.88);
      d += `${k ? 'L' : 'M'}${r1(Math.cos(th) * rr)} ${r1(Math.sin(th) * rr * 0.9)} `;
    }
    s += `<circle r="${r1(r * 0.3)}" fill="${inner}"/>`;
    s += `<path d="${d}" fill="none" stroke="${deep}" stroke-opacity=".8" stroke-width="${r1(Math.max(1.5, r * 0.032))}" stroke-linecap="round" stroke-linejoin="round"/>`;
    return `<g transform="translate(${cx} ${cy}) rotate(${rot})">${s}</g>`;
  }
  const bud = (x, y, s, a, fill, deep) =>
    `<g transform="translate(${x} ${y}) rotate(${a}) scale(${s})">
      <path d="M0 2 V30" stroke="${DEEPG}" stroke-width="2.4"/>
      <path d="M0 0 C-16 -14 -14 -40 0 -54 C14 -40 16 -14 0 0Z" fill="${fill}" stroke="${deep}" stroke-opacity=".4" stroke-width="1.2"/>
      <path d="M0 -4 C-4 -20 -2 -36 4 -46" fill="none" stroke="${deep}" stroke-opacity=".6" stroke-width="1.4"/>
      <path d="M0 2 C-14 -4 -18 -16 -16 -26 C-8 -16 -4 -10 0 -8 C4 -10 8 -16 16 -26 C18 -16 14 -4 0 2Z" fill="${DEEPG}"/>
    </g>`;
  const vleaf = (x, y, len, a, fill) => {
    const w = len * 0.36;
    return `<g transform="translate(${x} ${y}) rotate(${a})"><path d="M0 0 C${r1(len * 0.3)} ${r1(-w)} ${r1(len * 0.72)} ${r1(-w)} ${len} 0 C${r1(len * 0.72)} ${r1(w)} ${r1(len * 0.3)} ${r1(w)} 0 0Z" fill="${fill}"/><path d="M4 0 H${r1(len * 0.88)}" stroke="#ffffff" stroke-opacity=".5" stroke-width="1.2"/></g>`;
  };
  const P1 = ['#e7b3b3', '#f1c9c6', '#f7dcd8', '#b86f78'];
  const P2 = ['#d9999f', '#e8b4b5', '#f2cfcd', '#9e5563'];
  const P3 = ['#f3d2cc', '#f8e2dd', '#fcefeb', '#c98a8f'];
  const cluster = `
    <path d="M-20 520 C60 380 120 260 250 170 S460 40 560 -10" fill="none" stroke="${DEEPG}" stroke-width="2.4"/>
    <path d="M80 330 C40 390 30 450 40 520" fill="none" stroke="${DEEPG}" stroke-width="2"/>
    <path d="M330 90 C380 60 440 40 500 50" fill="none" stroke="${DEEPG}" stroke-width="2"/>
    ${vleaf(250, 170, 92, 18, GREEN)}${vleaf(210, 220, 86, 62, DEEPG)}${vleaf(120, 300, 80, 108, GREEN)}
    ${vleaf(400, 70, 78, -8, DEEPG)}${vleaf(360, 120, 70, 28, GREEN)}${vleaf(60, 400, 72, 70, GREEN)}
    ${vleaf(170, 60, 78, -40, GREEN)}${vleaf(30, 180, 80, 95, DEEPG)}${vleaf(470, 30, 64, 20, GREEN)}
    ${vleaf(40, 470, 62, 120, DEEPG)}${vleaf(290, 230, 62, 40, GREEN)}
    ${bud(500, 52, 0.9, 70, P2[0], P2[3])}${bud(40, 520, 0.85, 200, P1[0], P1[3])}
    ${rose(70, 70, 92, 10, P1)}
    ${rose(270, 90, 66, 40, P3)}
    ${rose(110, 270, 70, -20, P2)}
    ${rose(245, 245, 44, 60, P1)}
    ${rose(380, 50, 40, 15, P2)}
    ${rose(35, 400, 44, 30, P3)}
  `;
  const layer = svgUrl(`
    <rect x="52" y="52" width="1096" height="1696" rx="6" fill="none" stroke="${ROSE}" stroke-opacity=".6" stroke-width="1.2"/>
    <g>${cluster}</g>
    <g transform="rotate(180 600 900)">${cluster}</g>
    ${rules(1192, 222, 80, ROSE)}
    ${diamond(600, 548, 4, ROSE)}${hline(520, 588, 548, ROSE, 1.2)}${hline(612, 680, 548, ROSE, 1.2)}
  `);
  return {
    name: 'Atirgul',
    fonts: ['Alex Brush', 'Playfair', 'Cormorant', 'Montserrat'],
    bg: 'radial-gradient(ellipse at 50% 50%, #fffaf8 0%, #fbeeeb 100%)',
    color: INK,
    layer,
    qrColors: { dark: INK, light: '#fdf5f3' },
    spec: {
      guest: { top: 375, h: 150, maxWidth: 700, fit: [86, 56, 14], style: { fontStyle: 'italic' } },
      line: { top: 575, style: caps(20, 5, { fontFamily: 'Montserrat', fontWeight: 500, color: '#b0707a' }) },
      groom: { top: 640, h: 200, style: { fontFamily: 'Alex Brush', fontSize: 158 } },
      amp: { top: 825, h: 90, style: { fontFamily: 'Playfair', fontStyle: 'italic', fontSize: 72, color: ROSE } },
      bride: { top: 900, h: 200, style: { fontFamily: 'Alex Brush', fontSize: 140 } },
      date: { top: 1162, h: 60, style: { fontFamily: 'Playfair', fontSize: 46, letterSpacing: 8 } },
      qr: { x: 485, y: 1300, size: 230, plate: { bg: '#fdf5f3', pad: 16, radius: 10 } },
    },
  };
})();

/* 42 ─ Lavanda: a Provence bundle of lavender tied with a bow */
const lavanda = (() => {
  const INK = '#4a3a66';
  const STEM = '#7f9a6e';
  const BUDS = ['#6c4f9a', '#8466b3', '#9b7fc0', '#b39bd6', '#c9b6e4'];
  const RIB = '#b7a1d8';
  const RIBD = '#8e73bb';
  const rand = rng(42);
  const P = [600, 1612];
  function stalk(ang, len) {
    const dx = Math.sin(rad(ang));
    const dy = -Math.cos(rad(ang));
    const base = [P[0] - dx * 124, P[1] - dy * 124];
    const tip = [P[0] + dx * len, P[1] + dy * len];
    const bend = (rand() - 0.5) * 36;
    const cx = P[0] + dx * len * 0.55 - dy * bend;
    const cy = P[1] + dy * len * 0.55 + dx * bend;
    let s = `<path d="M${r1(base[0])} ${r1(base[1])} L${r1(P[0])} ${r1(P[1])} Q${r1(cx)} ${r1(cy)} ${r1(tip[0])} ${r1(tip[1])}" fill="none" stroke="${STEM}" stroke-width="2.2"/>`;
    const q = (t) => {
      const u = 1 - t;
      return [u * u * P[0] + 2 * u * t * cx + t * t * tip[0], u * u * P[1] + 2 * u * t * cy + t * t * tip[1]];
    };
    const n = 17;
    for (let i = 0; i < n; i++) {
      const t = 0.58 + (i / (n - 1)) * 0.42;
      const [x, y] = q(t);
      const [x2, y2] = q(Math.min(1, t + 0.01));
      const a = (Math.atan2(y2 - y, x2 - x) * 180) / Math.PI + 90;
      const sz = 1 - (i / n) * 0.55;
      const c1 = BUDS[Math.floor(rand() * 3)];
      const c2 = BUDS[1 + Math.floor(rand() * 4)];
      s += `<g transform="translate(${r1(x)} ${r1(y)}) rotate(${r1(a)})">
        <ellipse cx="${r1(-6 * sz)}" cy="${r1(-2 * sz)}" rx="${r1(4.6 * sz)}" ry="${r1(8.5 * sz)}" transform="rotate(-32)" fill="${c1}"/>
        <ellipse cx="${r1(6 * sz)}" cy="${r1(-2 * sz)}" rx="${r1(4.6 * sz)}" ry="${r1(8.5 * sz)}" transform="rotate(32)" fill="${c2}"/>
        ${i % 3 === 0 ? `<ellipse cx="0" cy="${r1(-6 * sz)}" rx="${r1(3.6 * sz)}" ry="${r1(6 * sz)}" fill="${BUDS[4]}"/>` : ''}
      </g>`;
    }
    return s;
  }
  // slender grey-green leaves rising from just above the tie
  const blade = (ang, len) => {
    const w = len * 0.09;
    return `<g transform="translate(${P[0]} ${P[1] - 30}) rotate(${ang - 90})"><path d="M0 0 C${r1(len * 0.3)} ${r1(-w)} ${r1(len * 0.7)} ${r1(-w)} ${len} 0 C${r1(len * 0.7)} ${r1(w)} ${r1(len * 0.3)} ${r1(w)} 0 0Z" fill="#9bb08c"/></g>`;
  };
  const fan = [
    [-54, 470], [-44, 450], [-34, 430], [-24, 400], [-15, 350], [-6, 312], [3, 300], [12, 330], [21, 380], [30, 420], [40, 450], [50, 465],
  ];
  const bow = `
    <g transform="translate(${P[0]} ${P[1]})">
      <g transform="scale(.8)">
        <path d="M-4 4 C-40 40 -70 90 -86 150 L-64 142 L-54 164 C-40 110 -20 60 4 12Z" fill="${RIB}" stroke="${RIBD}" stroke-width="1.6"/>
        <path d="M4 4 C30 44 50 92 58 150 L78 138 L92 158 C84 104 54 50 -4 12Z" fill="${RIB}" stroke="${RIBD}" stroke-width="1.6"/>
      </g>
      <path d="M-6 -2 C-40 -46 -110 -54 -118 -16 C-124 16 -60 20 -6 6Z" fill="${RIB}" stroke="${RIBD}" stroke-width="1.4"/>
      <path d="M6 -2 C40 -46 110 -54 118 -16 C124 16 60 20 6 6Z" fill="${RIB}" stroke="${RIBD}" stroke-width="1.4"/>
      <path d="M-20 -6 C-50 -30 -90 -32 -98 -14 M20 -6 C50 -30 90 -32 98 -14" fill="none" stroke="${RIBD}" stroke-opacity=".6" stroke-width="1.2"/>
      <rect x="-40" y="-14" width="80" height="28" rx="6" fill="${RIB}" stroke="${RIBD}" stroke-width="1.4" transform="rotate(-4)"/>
      <rect x="-14" y="-16" width="28" height="32" rx="8" fill="${RIBD}"/>
    </g>`;
  const layer = svgUrl(`
    <rect x="50" y="50" width="1100" height="1700" rx="24" fill="none" stroke="${BUDS[3]}" stroke-width="1.4"/>
    <rect x="62" y="62" width="1076" height="1676" rx="18" fill="none" stroke="${BUDS[4]}" stroke-width=".8"/>
    ${blade(-30, 190)}${blade(-12, 170)}${blade(18, 180)}${blade(34, 200)}
    ${fan.map(([a, l]) => stalk(a, l)).join('')}${bow}
    ${rules(912, 236, 70, BUDS[3])}
    <circle cx="600" cy="360" r="3.5" fill="${BUDS[2]}"/><circle cx="574" cy="360" r="2.5" fill="${BUDS[3]}"/><circle cx="626" cy="360" r="2.5" fill="${BUDS[3]}"/>
  `);
  return {
    name: 'Lavanda',
    fonts: ['Dancing', 'Old Standard', 'Cormorant', 'Josefin'],
    bg: 'radial-gradient(ellipse at 50% 35%, #ffffff 0%, #fbf9fd 55%, #f2edf8 100%)',
    color: INK,
    layer,
    qrColors: { dark: INK, light: '#ffffff' },
    spec: {
      guest: { top: 185, h: 150, maxWidth: 820, fit: [80, 54, 15], style: { fontStyle: 'italic' } },
      line: { top: 385, style: caps(20, 5, { fontFamily: 'Josefin', color: '#8466b3' }) },
      groom: { top: 445, h: 170, style: { fontFamily: 'Dancing', fontSize: 128, color: '#5b4585' } },
      amp: { top: 605, h: 80, style: { fontFamily: 'Old Standard', fontStyle: 'italic', fontSize: 66, color: BUDS[2] } },
      bride: { top: 675, h: 170, style: { fontFamily: 'Dancing', fontSize: 112, color: '#5b4585' } },
      date: { top: 882, h: 60, style: { fontFamily: 'Josefin', fontSize: 42, letterSpacing: 12 } },
      qr: { x: 485, y: 972, size: 230, plate: { bg: '#ffffff', pad: 14, radius: 10, border: `1.5px solid ${BUDS[4]}` } },
    },
  };
})();

/* 43 ─ To'lqin: layered sea waves, shells and pearls */
const tolqin = (() => {
  const NAVY = '#1d3b5c';
  const TEAL = '#2f8185';
  const SAND = '#d9b99a';
  // Leaning crests: the phase is skewed so each swell rises slowly and breaks steeply.
  const wy = (x, base, amp, len, phase) => {
    const th = (x / len) * Math.PI * 2 + phase;
    return base - Math.sin(th + 0.55 * Math.sin(th)) * amp;
  };
  function wave(base, amp, len, phase, fill, stroke) {
    let d = '';
    for (let x = -10; x <= 1210; x += 8) d += `${x === -10 ? 'M' : 'L'}${x} ${r1(wy(x, base, amp, len, phase))} `;
    return `<path d="${d} L1210 1810 L-10 1810Z" fill="${fill}"/><path d="${d}" fill="none" stroke="${stroke}" stroke-width="2.2" stroke-opacity=".85"/>`;
  }
  function line(base, amp, len, phase, stroke, w) {
    let d = '';
    for (let x = -10; x <= 1210; x += 8) d += `${x === -10 ? 'M' : 'L'}${x} ${r1(wy(x, base, amp, len, phase))} `;
    return `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${w}"/>`;
  }
  function scallop(x, y, s) {
    let ribs = '';
    let edge = 'M0 0 ';
    const n = 11;
    for (let i = 0; i <= n; i++) {
      const t = rad(-162 + (i * 144) / n);
      const px = Math.cos(t) * 62;
      const py = Math.sin(t) * 62;
      ribs += `<path d="M0 -2 L${r1(px * 0.94)} ${r1(py * 0.94)}" stroke="#c49a74" stroke-width="1.2"/>`;
      edge += i === 0 ? `L${r1(px)} ${r1(py)} ` : `A7 7 0 0 1 ${r1(px)} ${r1(py)} `;
    }
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <path d="${edge}Z" fill="url(#shell)" stroke="#b98d68" stroke-width="1.6" stroke-linejoin="round"/>${ribs}
      <path d="M-16 4 L-5 -6 H5 L16 4 L9 13 H-9Z" fill="#ecd2b6" stroke="#b98d68" stroke-width="1.4" stroke-linejoin="round"/>
    </g>`;
  }
  const pearl = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#pearl)" stroke="#b9c7c5" stroke-width=".6"/>`;
  const layer = svgUrl(
    `
    ${line(1408, 9, 430, 0.4, TEAL, 1.2)}${line(1432, 10, 390, 2.1, NAVY, 1)}
    ${wave(1470, 22, 520, 0.5, '#cdeae3', '#ffffff')}
    ${wave(1520, 26, 440, 2.2, '#98cfc6', '#ffffff')}
    ${wave(1580, 28, 600, 4.1, '#58a5a4', '#e2f4f0')}
    ${wave(1640, 24, 480, 1.3, TEAL, '#bfe3dc')}
    ${wave(1705, 22, 560, 3.3, NAVY, '#6fb3b1')}
    ${pearl(250, 1505, 6)}${pearl(930, 1548, 5)}${pearl(1060, 1488, 7)}${pearl(150, 1610, 4)}${pearl(700, 1600, 4)}
    ${scallop(600, 168, 1.35)}
    ${pearl(500, 150, 8)}${pearl(476, 158, 6)}${pearl(456, 165, 4.5)}
    ${pearl(700, 150, 8)}${pearl(724, 158, 6)}${pearl(744, 165, 4.5)}
    ${hline(290, 430, 168, SAND, 1.2)}${hline(770, 910, 168, SAND, 1.2)}
    ${rules(1016, 232, 80, TEAL)}
  `,
    `<radialGradient id="pearl" cx=".36" cy=".32" r=".75"><stop offset="0" stop-color="#ffffff"/><stop offset=".45" stop-color="#eef1ef"/><stop offset="1" stop-color="#a9b8b6"/></radialGradient>
     <radialGradient id="shell" cx=".5" cy="1" r="1"><stop offset="0" stop-color="#e9c9a8"/><stop offset="1" stop-color="#f8eadb"/></radialGradient>`
  );
  return {
    name: 'To‘lqin',
    fonts: ['DM Serif', 'Cormorant', 'Montserrat'],
    bg: 'linear-gradient(180deg, #ffffff 0%, #fbf8f2 55%, #f4ecdf 100%)',
    color: NAVY,
    layer,
    qrColors: { dark: NAVY, light: '#ffffff' },
    spec: {
      guest: { top: 250, h: 150, fit: [86, 56, 14], style: { fontStyle: 'italic' } },
      line: { top: 425, style: caps(20, 6, { fontFamily: 'Montserrat', fontWeight: 500, color: TEAL }) },
      groom: { top: 495, h: 170, style: { fontFamily: 'DM Serif', fontSize: 132 } },
      amp: { top: 660, h: 100, style: { fontFamily: 'DM Serif', fontStyle: 'italic', fontSize: 90, color: TEAL } },
      bride: { top: 755, h: 170, style: { fontFamily: 'DM Serif', fontSize: 114 } },
      date: { top: 986, h: 60, style: { fontFamily: 'Montserrat', fontWeight: 500, fontSize: 36, letterSpacing: 12 } },
      qr: { x: 485, y: 1105, size: 230, plate: { bg: '#ffffff', pad: 14, radius: 6 } },
    },
  };
})();

/* 44 ─ Tog'lar: misty mountains at dawn */
const toglar = (() => {
  const INK = '#3b4263';
  function ridge(base, amp, rough, fill, seed) {
    const rr = rng(seed);
    const f1 = 0.004 + rr() * 0.003;
    const f2 = 0.011 + rr() * 0.006;
    const p1 = rr() * 6;
    const p2 = rr() * 6;
    let d = 'M-10 1810 ';
    for (let x = -10; x <= 1210; x += 12) {
      const y = base - Math.abs(Math.sin(x * f1 + p1)) * amp - Math.sin(x * f2 + p2) * amp * 0.3 - (rr() - 0.5) * rough;
      d += `L${x} ${r1(y)} `;
    }
    return `<path d="${d}L1210 1810Z" fill="${fill}"/>`;
  }
  const mist = (y, h, o) => `<ellipse cx="600" cy="${y}" rx="900" ry="${h}" fill="#ffffff" fill-opacity="${o}" filter="url(#mistblur)"/>`;
  let birds = '';
  for (const [x, y, s] of [[860, 1050, 1], [905, 1030, 0.8], [940, 1062, 0.65]]) {
    birds += `<path d="M${r1(x - 14 * s)} ${r1(y - 5 * s)} Q${r1(x - 6 * s)} ${r1(y - 8 * s)} ${x} ${y} Q${r1(x + 6 * s)} ${r1(y - 8 * s)} ${r1(x + 14 * s)} ${r1(y - 5 * s)}" fill="none" stroke="${INK}" stroke-opacity=".6" stroke-width="1.6"/>`;
  }
  const layer = svgUrl(
    `
    <circle cx="600" cy="1160" r="230" fill="#fde9d2" fill-opacity=".7" filter="url(#glow)"/>
    <circle cx="600" cy="1160" r="112" fill="url(#sun)"/>
    ${birds}
    ${ridge(1280, 170, 10, '#cfc6d9', 1)}
    ${mist(1330, 60, 0.55)}
    ${ridge(1390, 150, 12, '#aba6c4', 2)}
    ${mist(1440, 55, 0.45)}
    ${ridge(1500, 150, 10, '#81819f', 3)}
    ${mist(1550, 50, 0.3)}
    ${ridge(1620, 120, 8, '#555b78', 4)}
    ${ridge(1735, 80, 6, '#373c55', 5)}
    ${rules(962, 236, 80, '#c9a58a')}
    <circle cx="600" cy="398" r="3" fill="#c9a58a"/>
  `,
    `<filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="40"/></filter>
     <filter id="mistblur" x="-20%" y="-100%" width="140%" height="300%"><feGaussianBlur stdDeviation="22"/></filter>
     <radialGradient id="sun" cx=".5" cy=".45" r=".6"><stop offset="0" stop-color="#fff8ee"/><stop offset=".6" stop-color="#fde6cb"/><stop offset="1" stop-color="#f8cfa6"/></radialGradient>`
  );
  return {
    name: 'Tog‘lar',
    fonts: ['Fraunces', 'Cormorant', 'Montserrat'],
    bg: 'linear-gradient(180deg, #dfe4f1 0%, #ece6ef 30%, #f8e6de 55%, #fce9d9 70%, #fbeee2 100%)',
    color: INK,
    layer,
    qrColors: { dark: '#2e334d', light: '#fbf7f1' },
    spec: {
      guest: { top: 230, h: 150, maxWidth: 860, upper: true, fit: [48, 32, 16], style: { fontFamily: 'Montserrat', fontWeight: 300, letterSpacing: 6 } },
      line: { top: 425, h: 50, style: { fontSize: 36, fontStyle: 'italic', color: '#8a6f78' } },
      groom: { top: 495, h: 175, style: { fontFamily: 'Fraunces', fontStyle: 'italic', fontSize: 132 } },
      amp: { top: 665, h: 80, style: { fontFamily: 'Cormorant', fontStyle: 'italic', fontWeight: 300, fontSize: 80, color: '#b98a73' } },
      bride: { top: 735, h: 175, style: { fontFamily: 'Fraunces', fontStyle: 'italic', fontSize: 112 } },
      date: { top: 932, h: 60, style: { fontFamily: 'Montserrat', fontWeight: 500, fontSize: 34, letterSpacing: 14 } },
      qr: { x: 485, y: 1460, size: 230, plate: { bg: '#fbf7f1', pad: 18, radius: 10 } },
    },
  };
})();

/* 45 ─ Kuz: falling autumn chinor leaves */
const kuz = (() => {
  const INK = '#4a2a1c';
  const COLORS = ['#d9822b', '#b5532a', '#7d2a2f', '#d9a93b', '#c46a2f', '#9c3b2a', '#e0a24a'];
  const lobes = [[-90, 50], [-36, 45], [16, 32], [164, 32], [216, 45]];
  function maple(x, y, s, a, fill) {
    const pts = [];
    const P = (deg, r) => pts.push(`${r1(Math.cos(rad(deg)) * r)} ${r1(Math.sin(rad(deg)) * r)}`);
    lobes.forEach(([ang, L], i) => {
      const next = lobes[(i + 1) % lobes.length];
      const nextAng = next[0] <= ang ? next[0] + 360 : next[0];
      P(ang - 22, L * 0.6);
      P(ang - 17, L * 0.76);
      P(ang - 9, L * 0.68);
      P(ang, L);
      P(ang + 9, L * 0.68);
      P(ang + 17, L * 0.76);
      P(ang + 22, L * 0.6);
      P((ang + nextAng) / 2, i === 2 ? 12 : 20);
    });
    const veins = lobes.map(([ang, L]) => `M0 4 L${r1(Math.cos(rad(ang)) * L * 0.86)} ${r1(Math.sin(rad(ang)) * L * 0.86)}`).join(' ');
    return `<g transform="translate(${x} ${y}) rotate(${a}) scale(${s})">
      <path d="M0 8 Q3 26 -5 42" fill="none" stroke="${fill}" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M${pts.join(' L')}Z" fill="${fill}" stroke="${fill}" stroke-width="3" stroke-linejoin="round"/>
      <path d="${veins}" fill="none" stroke="#fff3df" stroke-opacity=".5" stroke-width="1.3"/>
    </g>`;
  }
  // Hand-placed: heavy drifts in the top-left and bottom-right corners, a few leaves
  // falling down both margins. [x, y, scale, rotation, colour]
  const LEAVES = [
    [70, 80, 2.0, 20, 1], [215, 55, 1.45, -35, 3], [92, 238, 1.55, 160, 0], [300, 150, 1.05, 70, 2], [36, 390, 1.0, -60, 4], [390, 62, 0.85, 110, 6],
    [1128, 92, 1.55, -150, 0], [995, 58, 0.95, 40, 5], [1122, 262, 0.95, 95, 3],
    [1112, 540, 0.8, -20, 2], [1085, 830, 0.7, 140, 6], [1122, 1110, 0.85, 60, 1],
    [88, 660, 0.75, 200, 4], [118, 965, 0.85, -110, 0], [78, 1260, 0.7, 30, 5],
    [1122, 1718, 2.0, -160, 0], [978, 1742, 1.45, 30, 3], [1112, 1552, 1.5, -20, 2], [900, 1658, 0.95, 120, 4], [1158, 1400, 0.95, 200, 6], [812, 1748, 0.8, -70, 1],
    [80, 1712, 1.5, 50, 5], [222, 1742, 1.05, -40, 0], [68, 1540, 0.95, 140, 3], [330, 1708, 0.75, 80, 2],
  ];
  const leaves = LEAVES.map(([x, y, sc, a, c]) => maple(x, y, sc, a, COLORS[c])).join('');
  const layer = svgUrl(`
    <rect x="58" y="58" width="1084" height="1684" fill="none" stroke="#c98f4a" stroke-opacity=".7" stroke-width="1.4"/>
    ${leaves}
    ${rules(1092, 236, 80, '#c46a2f', 1.5)}
    ${diamond(600, 505, 5, '#b5532a')}
  `);
  return {
    name: 'Kuz',
    fonts: ['Playball', 'Yeseva', 'Cormorant', 'Montserrat'],
    bg: 'radial-gradient(ellipse at 50% 45%, #fdf8ee 0%, #f8eedb 70%, #f1e0c4 100%)',
    color: INK,
    layer,
    qrColors: { dark: INK, light: '#fbf4e6' },
    spec: {
      guest: { top: 330, h: 150, maxWidth: 740, fit: [80, 54, 14], style: { fontWeight: 500 } },
      line: { top: 530, style: caps(20, 5, { fontFamily: 'Montserrat', fontWeight: 500, color: '#b5532a' }) },
      groom: { top: 600, h: 190, style: { fontFamily: 'Playball', fontSize: 140, color: '#7d2a2f' } },
      amp: { top: 785, h: 80, style: { fontFamily: 'Yeseva', fontSize: 64, color: '#d9822b' } },
      bride: { top: 855, h: 190, style: { fontFamily: 'Playball', fontSize: 122, color: '#7d2a2f' } },
      date: { top: 1062, h: 60, style: { fontFamily: 'Yeseva', fontSize: 46, letterSpacing: 8 } },
      qr: { x: 485, y: 1240, size: 230, plate: { bg: '#fbf4e6', pad: 16, radius: 8, border: '1.5px solid #d9a93b' } },
    },
  };
})();

/* 46 ─ Qish: geometric snowflakes, icy blue & silver */
const qish = (() => {
  const INK = '#2a3f5f';
  const SILVER = '#94a9c2';
  const ICE = '#7f9cbf';
  function flake(cx, cy, R, v, stroke, w, rot = 0) {
    const sets = [
      [[0.3, 0.26], [0.55, 0.22], [0.78, 0.12]],
      [[0.42, 0.34], [0.7, 0.18]],
      [[0.26, 0.16], [0.48, 0.3], [0.72, 0.2]],
    ];
    let arm = `<path d="M0 ${r1(-R * 0.2)} V${r1(-R)}"/>`;
    for (const [t, l] of sets[v % 3]) {
      const y = -R * t;
      const dx = Math.sin(rad(58)) * R * l;
      const dy = -Math.cos(rad(58)) * R * l;
      arm += `<path d="M0 ${r1(y)} l${r1(dx)} ${r1(dy)} M0 ${r1(y)} l${r1(-dx)} ${r1(dy)}"/>`;
      if (l > 0.25) {
        // tiny twigs on the longest branches
        const mx = dx * 0.55;
        const my = y + dy * 0.55;
        arm += `<path d="M${r1(mx)} ${r1(my)} l0 ${r1(-R * 0.08)} M${r1(-mx)} ${r1(my)} l0 ${r1(-R * 0.08)}"/>`;
      }
    }
    const k = R * 0.06;
    arm += v % 2 ? `<path d="M0 ${r1(-R - k)} l${r1(k)} ${r1(k * 1.4)} l${r1(-k)} ${r1(k * 1.4)} l${r1(-k)} ${r1(-k * 1.4)}Z"/>` : `<circle cy="${r1(-R)}" r="${r1(R * 0.045)}"/>`;
    let arms = '';
    for (let i = 0; i < 6; i++) arms += `<g transform="rotate(${i * 60})">${arm}</g>`;
    const hex = (rr) => [0, 1, 2, 3, 4, 5].map((i) => `${r1(Math.cos(rad(i * 60 - 90)) * rr)} ${r1(Math.sin(rad(i * 60 - 90)) * rr)}`).join(' L');
    return `<g transform="translate(${cx} ${cy}) rotate(${rot})" fill="none" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">${arms}<path d="M${hex(R * 0.2)}Z"/><path d="M${hex(R * 0.09)}Z" fill="${stroke}"/></g>`;
  }
  const rand = rng(46);
  let dots = '';
  for (let i = 0; i < 140; i++) {
    const x = rand() * 1200;
    const y = rand() * 1800;
    if (x > 150 && x < 1050 && y > 250 && y < 1600) continue;
    const top = y < 900;
    dots += `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r1(1.4 + rand() * 3)}" fill="${top ? '#ffffff' : '#b8cbe0'}" fill-opacity="${r1(0.5 + rand() * 0.5)}"/>`;
  }
  // [x, y, R, variant, width, colour]
  const flakes = [
    [150, 170, 96, 0, 2, SILVER], [330, 105, 38, 1, 1.4, '#ffffff'], [1040, 240, 116, 2, 2.2, SILVER], [870, 105, 44, 3, 1.4, '#ffffff'],
    [100, 400, 40, 4, 1.4, '#ffffff'], [1110, 500, 34, 5, 1.2, ICE], [600, 150, 52, 1, 1.6, ICE],
    [130, 1590, 80, 1, 1.8, ICE], [290, 1700, 36, 2, 1.3, SILVER], [1060, 1620, 100, 3, 2, SILVER], [880, 1712, 30, 4, 1.2, ICE],
    [1105, 1340, 30, 0, 1.2, SILVER], [95, 1260, 28, 5, 1.2, SILVER],
  ];
  const layer = svgUrl(
    `
    <rect x="0" y="0" width="1200" height="640" fill="url(#frost)"/>
    ${dots}
    ${flakes.map(([x, y, R, v, w, c], i) => flake(x, y, R, v, c, w, i * 7)).join('')}
    <rect x="46" y="46" width="1108" height="1708" rx="14" fill="none" stroke="${SILVER}" stroke-width="1.4"/>
    <rect x="58" y="58" width="1084" height="1684" rx="10" fill="none" stroke="#ffffff" stroke-width="1"/>
    ${rules(1090, 268, 70, SILVER)}
    ${diamond(600, 525, 5, SILVER)}${hline(530, 585, 525, SILVER, 1)}${hline(615, 670, 525, SILVER, 1)}
  `,
    `<linearGradient id="frost" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b9d0e8" stop-opacity=".55"/><stop offset="1" stop-color="#b9d0e8" stop-opacity="0"/></linearGradient>`
  );
  return {
    name: 'Qish',
    fonts: ['Unbounded', 'Poiret One', 'Cormorant', 'Montserrat'],
    bg: 'linear-gradient(180deg, #d4e3f2 0%, #e9f1f9 40%, #f7fafd 75%, #ffffff 100%)',
    color: INK,
    layer,
    qrColors: { dark: INK, light: '#ffffff' },
    spec: {
      guest: { top: 325, h: 150, maxWidth: 820, fit: [62, 42, 15], style: { fontFamily: 'Montserrat', fontWeight: 300, letterSpacing: 1 } },
      line: { top: 548, style: caps(19, 6, { fontFamily: 'Montserrat', fontWeight: 500, color: '#5f7ea3' }) },
      caps: true,
      groom: { top: 625, h: 130, style: { fontFamily: 'Unbounded', fontSize: 80, letterSpacing: 8 } },
      amp: { top: 750, h: 110, style: { fontFamily: 'Cormorant', fontStyle: 'italic', fontSize: 96, color: ICE } },
      bride: { top: 855, h: 130, style: { fontFamily: 'Unbounded', fontSize: 66, letterSpacing: 6 } },
      date: { top: 1060, h: 60, style: { fontFamily: 'Poiret One', fontSize: 48, letterSpacing: 12 } },
      qr: { x: 485, y: 1225, size: 230, plate: { bg: '#ffffff', pad: 18, radius: 12, border: `1.5px solid ${SILVER}` } },
    },
  };
})();

/* 47 ─ Kapalak: pastel butterflies along a dotted flight path */
const kapalak = (() => {
  const INK = '#5a4260';
  const GOLD = '#c2a05a';
  const BODY = '#6b5a48';
  function butterfly(x, y, s, a, up, low, fold = 1) {
    const upper = 'M2 -4 C14 -40 58 -74 90 -60 C112 -50 108 -20 88 -6 C66 8 30 8 4 4Z';
    const lower = 'M3 4 C36 2 70 14 70 40 C70 62 48 78 30 70 C14 62 4 36 2 12Z';
    const upperIn = 'M12 -8 C24 -34 58 -58 82 -50 C98 -42 96 -22 80 -12 C62 -2 34 0 12 -2';
    const lowerIn = 'M10 10 C36 10 58 20 58 38 C58 54 44 62 32 58 C20 52 12 34 10 14';
    const wing = `
      <path d="${upper}" fill="${up}" stroke="${GOLD}" stroke-width="2.2" stroke-linejoin="round"/>
      <path d="${lower}" fill="${low}" stroke="${GOLD}" stroke-width="2.2" stroke-linejoin="round"/>
      <path d="${upperIn}" fill="#ffffff" fill-opacity=".35" stroke="${GOLD}" stroke-width="1" stroke-opacity=".8"/>
      <path d="${lowerIn}" fill="#ffffff" fill-opacity=".3" stroke="${GOLD}" stroke-width="1" stroke-opacity=".8"/>
      <path d="M8 -4 C30 -24 50 -40 76 -50 M8 -2 C36 -12 60 -18 92 -30 M8 0 C40 0 64 -2 90 -12 M6 8 C24 20 40 34 50 56 M6 8 C30 14 50 22 64 36" fill="none" stroke="${GOLD}" stroke-width=".9" stroke-opacity=".7"/>
      <circle cx="94" cy="-44" r="4.5" fill="#ffffff" stroke="${GOLD}" stroke-width="1"/>
      <circle cx="100" cy="-30" r="3" fill="${GOLD}"/><circle cx="96" cy="-18" r="2.2" fill="${GOLD}"/>
      <circle cx="56" cy="62" r="4" fill="#ffffff" stroke="${GOLD}" stroke-width="1"/><circle cx="66" cy="50" r="2.4" fill="${GOLD}"/>`;
    return `<g transform="translate(${x} ${y}) rotate(${a}) scale(${s})">
      <g transform="scale(${fold} 1)">${wing}</g>
      <g transform="scale(${-fold} 1)">${wing}</g>
      <path d="M-2 -16 C-10 -40 -20 -56 -32 -66 M2 -16 C10 -40 20 -56 32 -66" fill="none" stroke="${BODY}" stroke-width="1.6" stroke-linecap="round"/>
      <circle cx="-32" cy="-66" r="3.2" fill="${GOLD}"/><circle cx="32" cy="-66" r="3.2" fill="${GOLD}"/>
      <ellipse cx="0" cy="12" rx="4.6" ry="28" fill="${BODY}"/>
      <circle cx="0" cy="-17" r="6" fill="${BODY}"/>
    </g>`;
  }
  const path1 = 'M-20 600 C80 330 260 150 540 170 S900 300 1220 60';
  const path2 = 'M-20 1740 C260 1650 560 1760 820 1650 S1120 1440 1220 1380';
  const layer = svgUrl(`
    <path d="${path1}" fill="none" stroke="${GOLD}" stroke-width="3.2" stroke-dasharray="0 15" stroke-linecap="round"/>
    <path d="${path2}" fill="none" stroke="${GOLD}" stroke-width="3.2" stroke-dasharray="0 15" stroke-linecap="round"/>
    ${butterfly(165, 300, 1.25, -28, '#f4c6d2', '#fbe0e6')}
    ${butterfly(610, 150, 0.62, 18, '#d9ccef', '#ece4f8', 0.62)}
    ${butterfly(1030, 150, 0.9, 34, '#cbe7da', '#e4f3ec')}
    ${butterfly(320, 1665, 0.7, 72, '#f8d6bd', '#fcebdd', 0.7)}
    ${butterfly(1030, 1510, 1.2, -38, '#d9ccef', '#f4c6d2')}
    <rect x="56" y="56" width="1088" height="1688" rx="4" fill="none" stroke="${GOLD}" stroke-opacity=".7" stroke-width="1.2"/>
    ${rules(1142, 236, 80, GOLD)}
    ${sparkle(600, 548, 10, GOLD)}
  `);
  return {
    name: 'Kapalak',
    fonts: ['Allura', 'Cormorant', 'Josefin'],
    bg: 'radial-gradient(ellipse at 50% 50%, #fffdfb 0%, #fbf6f4 60%, #f5eef2 100%)',
    color: INK,
    layer,
    qrColors: { dark: INK, light: '#fdfaf8' },
    spec: {
      guest: { top: 370, h: 150, maxWidth: 740, fit: [84, 56, 14], style: { fontStyle: 'italic' } },
      line: { top: 580, style: caps(20, 6, { fontFamily: 'Josefin', color: '#a2804a' }) },
      groom: { top: 640, h: 200, style: { fontFamily: 'Allura', fontSize: 164 } },
      amp: { top: 825, h: 90, style: { fontFamily: 'Cormorant', fontStyle: 'italic', fontSize: 80, color: GOLD } },
      bride: { top: 895, h: 200, style: { fontFamily: 'Allura', fontSize: 150 } },
      date: { top: 1112, h: 60, style: { fontFamily: 'Josefin', fontSize: 40, letterSpacing: 12 } },
      qr: { x: 485, y: 1272, size: 230, plate: { bg: '#fdfaf8', pad: 16, radius: 8 } },
    },
  };
})();

/* 48 ─ Kaptarlar: two doves holding a ribbon */
const kaptarlar = (() => {
  const INK = '#2f4a6b';
  const LINE = '#7f9bbd';
  const RIB = '#a9c3e0';
  const RIBD = '#7f9ec2';
  // A dove flying right, wings raised; beak tip at (298, 124).
  const dove = `
    <path d="M214 142 C238 84 232 34 196 -6 Q200 16 184 20 Q198 36 178 44 Q192 60 172 66 C182 100 198 128 214 142Z" fill="#e7eff8" stroke="${LINE}" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M262 104 C248 96 230 102 226 118 C222 134 200 150 170 158 C130 166 100 168 72 164 L8 140 Q24 156 6 168 Q28 176 14 192 Q36 190 36 208 L92 184 C130 198 192 198 228 174 C260 156 278 140 278 122 C278 110 272 104 262 104Z" fill="#ffffff" stroke="${LINE}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M276 116 L298 124 L276 131Z" fill="#e3c39c" stroke="#c9a57a" stroke-width="1" stroke-linejoin="round"/>
    <path d="M205 150 C216 90 190 40 118 0 Q128 22 106 26 Q124 44 98 52 Q120 66 94 78 Q118 90 98 104 Q124 112 110 128 C140 150 175 158 205 150Z" fill="#ffffff" stroke="${LINE}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M190 138 C194 100 176 66 136 36 M168 142 C168 116 150 92 118 74" fill="none" stroke="${LINE}" stroke-width="1.1" stroke-opacity=".7"/>
    <path d="M40 176 L70 170 M34 160 L68 166" fill="none" stroke="${LINE}" stroke-width="1" stroke-opacity=".6"/>
    <circle cx="259" cy="116" r="3.8" fill="${INK}"/>
  `;
  const ribbon = `
    <path d="M470 253 C512 326 560 346 600 318 C640 346 688 326 730 253" fill="none" stroke="${RIB}" stroke-width="7" stroke-linecap="round"/>
    <path d="M470 253 C512 326 560 346 600 318 C640 346 688 326 730 253" fill="none" stroke="#ffffff" stroke-width="1.6" stroke-opacity=".85"/>
    <g transform="translate(600 320)">
      <path d="M-2 4 C-14 30 -30 50 -44 64 L-30 66 L-30 80 C-14 60 -4 36 2 8Z" fill="${RIB}" stroke="${RIBD}" stroke-width="1.3"/>
      <path d="M2 4 C14 30 28 52 40 66 L26 68 L28 82 C12 62 2 36 -2 8Z" fill="${RIB}" stroke="${RIBD}" stroke-width="1.3"/>
      <path d="M0 0 C-30 -32 -64 -26 -58 0 C-52 22 -22 14 0 0Z M0 0 C30 -32 64 -26 58 0 C52 22 22 14 0 0Z" fill="${RIB}" stroke="${RIBD}" stroke-width="1.4"/>
      <circle r="8.5" fill="${RIBD}"/>
    </g>`;
  const layer = svgUrl(
    `
    <ellipse cx="170" cy="300" rx="220" ry="60" fill="#ffffff" fill-opacity=".85" filter="url(#cloud)"/>
    <ellipse cx="1040" cy="330" rx="200" ry="55" fill="#ffffff" fill-opacity=".85" filter="url(#cloud)"/>
    <ellipse cx="160" cy="1640" rx="240" ry="60" fill="#ffffff" fill-opacity=".8" filter="url(#cloud)"/>
    <ellipse cx="1060" cy="1680" rx="220" ry="56" fill="#ffffff" fill-opacity=".8" filter="url(#cloud)"/>
    ${ribbon}
    <g transform="translate(130 110) scale(1.15)">${dove}</g>
    <g transform="translate(1070 110) scale(-1.15 1.15)">${dove}</g>
    <rect x="54" y="54" width="1092" height="1692" rx="30" fill="none" stroke="${LINE}" stroke-width="1.4"/>
    ${rules(1208, 222, 80, LINE)}
    <path d="M600 598 C590 608 578 612 568 610 M600 598 C610 608 622 612 632 610" fill="none" stroke="${LINE}" stroke-width="1.4"/>
  `,
    `<filter id="cloud" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="26"/></filter>`
  );
  return {
    name: 'Kaptarlar',
    fonts: ['Parisienne', 'Prata', 'Cormorant', 'Montserrat'],
    bg: 'linear-gradient(180deg, #d6e6f5 0%, #e9f2fa 35%, #f6f9fd 65%, #eaf2fa 100%)',
    color: INK,
    layer,
    qrColors: { dark: INK, light: '#ffffff' },
    spec: {
      guest: { top: 435, h: 150, maxWidth: 820, fit: [78, 52, 15], style: { fontWeight: 500 } },
      line: { top: 630, style: caps(20, 5, { fontFamily: 'Montserrat', fontWeight: 500, color: '#5f82ab' }) },
      groom: { top: 690, h: 180, style: { fontFamily: 'Parisienne', fontSize: 128 } },
      amp: { top: 860, h: 80, style: { fontFamily: 'Prata', fontSize: 60, color: RIBD } },
      bride: { top: 930, h: 180, style: { fontFamily: 'Parisienne', fontSize: 114 } },
      date: { top: 1178, h: 60, style: { fontFamily: 'Prata', fontSize: 44, letterSpacing: 8 } },
      qr: { x: 485, y: 1320, size: 230, plate: { bg: '#ffffff', pad: 16, radius: 12 } },
    },
  };
})();

/* 49 ─ Shampan: clinking flutes and rising bubbles */
const shampan = (() => {
  const GOLD = '#a8843a';
  const INK = '#5a3f2e';
  const rand = rng(49);
  const flute = `
    <ellipse cx="0" cy="0" rx="52" ry="10" fill="#fbf1e2" stroke="${GOLD}" stroke-width="2.4"/>
    <path d="M-12 -8 C-4 -12 -3 -20 -3 -30 V-150 M12 -8 C4 -12 3 -20 3 -30 V-150" fill="none" stroke="${GOLD}" stroke-width="2.4"/>
    <path d="M-4 -150 C-30 -168 -42 -236 -44 -370 L44 -370 C42 -236 30 -168 4 -150Z" fill="url(#glass)" stroke="${GOLD}" stroke-width="2.4"/>
    <path d="M-5 -158 C-29 -176 -38 -236 -39.5 -306 L39.5 -306 C38 -236 29 -176 5 -158Z" fill="url(#bubbly)"/>
    <ellipse cx="0" cy="-306" rx="39.5" ry="5" fill="#f7e2ae" stroke="${GOLD}" stroke-width="1.2"/>
    <ellipse cx="0" cy="-370" rx="44" ry="6.5" fill="none" stroke="${GOLD}" stroke-width="2.4"/>
    <path d="M-31 -340 C-33 -268 -27 -206 -15 -180" fill="none" stroke="#ffffff" stroke-width="3.4" stroke-opacity=".85" stroke-linecap="round"/>
    ${[[-10, -190, 2.4], [8, -214, 3], [-4, -240, 2], [12, -262, 2.6], [-14, -278, 2], [2, -290, 1.6], [-20, -222, 1.8]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#ffffff" stroke-width="1.2"/>`).join('')}
  `;
  const tilt = 16;
  const xl = r1(600 - 44 * Math.cos(rad(tilt)) - 370 * Math.sin(rad(tilt)));
  const yb = 630;
  const bub = (x, y, r) => `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r1(r)}" fill="#ffffff" fill-opacity=".5" stroke="${GOLD}" stroke-width="${r > 7 ? 1.6 : 1.2}"/>`;
  let bubbles = '';
  // above the clink
  for (let i = 0; i < 11; i++) {
    const t = rand();
    bubbles += bub(600 + (rand() - 0.5) * (50 + t * 220), 208 - t * 110, 3 + rand() * 6 * (0.4 + t));
  }
  // two tall streams rising up the sides, bubbles growing as they rise
  for (const [x0, top, grow] of [[118, 110, 11], [176, 760, 6], [1082, 110, 11], [1024, 900, 6]]) {
    let y = 1700;
    let k = 0;
    while (y > top) {
      const g = (1700 - y) / (1700 - top);
      const r = 2.5 + g * grow + rand() * 3;
      bubbles += bub(x0 + Math.sin(k * 0.8 + x0) * 16 + (rand() - 0.5) * 12, y, r);
      y -= r * 2 + 22 + rand() * 34;
      k++;
    }
  }
  const layer = svgUrl(
    `
    <rect x="50" y="50" width="1100" height="1700" fill="none" stroke="${GOLD}" stroke-width="1.6"/>
    <rect x="62" y="62" width="1076" height="1676" fill="none" stroke="${GOLD}" stroke-width=".6"/>
    ${bubbles}
    <g transform="translate(${xl} ${yb}) rotate(${tilt})">${flute}</g>
    <g transform="translate(${r1(1200 - xl)} ${yb}) rotate(${-tilt})">${flute}</g>
    ${sparkle(600, 214, 16, GOLD)}${sparkle(546, 186, 7, GOLD)}${sparkle(658, 176, 9, GOLD)}
    ${rules(1252, 226, 80, GOLD)}
  `,
    `<linearGradient id="glass" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffffff" stop-opacity=".75"/><stop offset="1" stop-color="#f3e3cf" stop-opacity=".5"/></linearGradient>
     <linearGradient id="bubbly" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4dc9f"/><stop offset="1" stop-color="#e3be6c"/></linearGradient>`
  );
  return {
    name: 'Shampan',
    fonts: ['Abril', 'Great Vibes', 'Cormorant', 'Montserrat'],
    bg: 'linear-gradient(170deg, #fcf5ea 0%, #f9ebe0 50%, #f4dcd4 100%)',
    color: INK,
    layer,
    qrColors: { dark: INK, light: '#fffaf3' },
    spec: {
      guest: { top: 665, h: 140, maxWidth: 760, fit: [80, 54, 14], style: { fontStyle: 'italic' } },
      line: { top: 815, style: caps(19, 6, { fontFamily: 'Montserrat', fontWeight: 500, color: GOLD }) },
      groom: { top: 875, h: 140, style: { fontFamily: 'Abril', fontSize: 110 } },
      amp: { top: 1002, h: 90, style: { fontFamily: 'Great Vibes', fontSize: 90, color: GOLD } },
      bride: { top: 1080, h: 140, style: { fontFamily: 'Abril', fontSize: 94 } },
      date: { top: 1222, h: 60, style: { fontFamily: 'Montserrat', fontWeight: 500, fontSize: 34, letterSpacing: 12 } },
      qr: { x: 485, y: 1370, size: 230, plate: { bg: '#fffaf3', pad: 16, radius: 10, border: `1.5px solid ${GOLD}` } },
    },
  };
})();

/* 50 ─ Marvarid: pearl swags on midnight velvet */
const marvarid = (() => {
  const IVORY = '#f3ede2';
  const SILVER = '#c3c8d2';
  const one = (x, y, r) => `<circle cx="${r1(x + r * 0.15)}" cy="${r1(y + r * 0.3)}" r="${r}" fill="#000000" fill-opacity=".35"/><circle cx="${r1(x)}" cy="${r1(y)}" r="${r}" fill="url(#pearl)"/>`;
  const strand = (p0, c1, c2, p1, r) =>
    alongCubic(p0, c1, c2, p1, r * 2 + 2)
      .map(([x, y]) => one(x, y, r))
      .join('');
  const drop = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})">
      <path d="M0 0 V16" stroke="${SILVER}" stroke-width="1.8"/>
      <path d="M2 18 C-12 34 -14 54 2 62 C18 54 16 34 2 18Z" fill="#000000" fill-opacity=".35"/>
      <path d="M0 16 C-14 32 -16 52 0 60 C16 52 14 32 0 16Z" fill="url(#pearl)"/>
      <ellipse cx="-4" cy="40" rx="3" ry="8" fill="#ffffff" fill-opacity=".8"/>
    </g>`;
  const brooch = (x, y) => {
    let s = '';
    for (let i = 0; i < 8; i++) s += one(x + Math.cos(rad(i * 45)) * 22, y + Math.sin(rad(i * 45)) * 22, 7);
    return `${s}<circle cx="${x}" cy="${y}" r="15" fill="none" stroke="${SILVER}" stroke-width="1.5"/>${one(x, y, 12)}`;
  };
  const layer = svgUrl(
    `
    <ellipse cx="300" cy="520" rx="700" ry="160" fill="#ffffff" fill-opacity=".05" transform="rotate(-30 300 520)" filter="url(#sheen)"/>
    <ellipse cx="900" cy="1300" rx="700" ry="140" fill="#ffffff" fill-opacity=".04" transform="rotate(-30 900 1300)" filter="url(#sheen)"/>
    ${strand([-20, 110], [190, 420], [430, 400], [600, 170], 9)}
    ${strand([600, 170], [770, 400], [1010, 420], [1220, 110], 9)}
    ${strand([-20, 40], [140, 330], [460, 330], [600, 80], 12)}
    ${strand([600, 80], [740, 330], [1060, 330], [1220, 40], 12)}
    ${drop(600, 186, 1.1)}
    ${brooch(600, 90)}
    ${strand([380, 1628], [480, 1708], [720, 1708], [820, 1628], 8)}
    ${one(380, 1628, 11)}${one(820, 1628, 11)}${drop(600, 1694, 0.7)}
    <rect x="60" y="60" width="1080" height="1680" fill="none" stroke="${SILVER}" stroke-opacity=".5" stroke-width="1"/>
    ${rules(1152, 225, 80, SILVER, 1.2)}
    ${one(600, 612, 6)}${hline(520, 585, 612, SILVER, 1)}${hline(615, 680, 612, SILVER, 1)}
  `,
    `<radialGradient id="pearl" cx=".36" cy=".32" r=".78"><stop offset="0" stop-color="#ffffff"/><stop offset=".3" stop-color="#f4f0ea"/><stop offset=".75" stop-color="#c9c3c0"/><stop offset="1" stop-color="#7c7c8a"/></radialGradient>
     <filter id="sheen" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="60"/></filter>`
  );
  return {
    name: 'Marvarid',
    fonts: ['Playfair', 'Italianno', 'Cormorant', 'Montserrat'],
    bg: 'radial-gradient(ellipse at 40% 35%, #26355f 0%, #16213f 45%, #0a1024 100%)',
    color: IVORY,
    layer,
    qrColors: { dark: '#16213f', light: IVORY },
    spec: {
      guest: { top: 450, h: 140, maxWidth: 800, fit: [80, 54, 14], style: { fontStyle: 'italic', fontWeight: 300 } },
      line: { top: 645, style: caps(19, 7, { fontFamily: 'Montserrat', color: SILVER }) },
      caps: true,
      groom: { top: 715, h: 130, style: { fontFamily: 'Playfair', fontSize: 100, letterSpacing: 10 } },
      amp: { top: 840, h: 100, style: { fontFamily: 'Italianno', fontSize: 110, color: SILVER } },
      bride: { top: 930, h: 130, style: { fontFamily: 'Playfair', fontSize: 80, letterSpacing: 8 } },
      date: { top: 1122, h: 60, style: { fontSize: 46, fontWeight: 500, letterSpacing: 10, color: SILVER } },
      qr: { x: 485, y: 1290, size: 230, plate: { bg: IVORY, pad: 18, radius: 4, border: `2px solid ${SILVER}` } },
    },
  };
})();

export const designsE = [atirgul, lavanda, tolqin, toglar, kuz, qish, kapalak, kaptarlar, shampan, marvarid];
