/* eslint-disable @next/next/no-img-element -- Satori renders plain <img> only */
// Building blocks shared by all card designs. Everything is laid out on a fixed
// 1200×1800 grid (10×15 cm at 300 dpi) so text and SVG ornaments line up.

export const W = 1200;
export const H = 1800;

export const r1 = (n) => Math.round(n * 10) / 10;

export const svgUrl = (inner, defs = '') =>
  `data:image/svg+xml;base64,${Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs>${defs}</defs>${inner}</svg>`
  ).toString('base64')}`;

export function Card({ bg, color, font, children }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        background: bg,
        color,
        fontFamily: font,
      }}
    >
      {children}
    </div>
  );
}

export const Layer = ({ src }) => (
  <img src={src} width={W} height={H} alt="" style={{ position: 'absolute', top: 0, left: 0 }} />
);

// Absolutely positioned text box. `height` + vertical centring keeps multi-line
// guest names balanced around the same point.
export function Text({ top, left = 0, width = W, height, align = 'center', maxWidth, style, children }) {
  const justify = align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center';
  return (
    <div
      style={{
        position: 'absolute',
        top,
        left,
        width,
        height,
        display: 'flex',
        justifyContent: justify,
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', textAlign: align, maxWidth: maxWidth ?? width, ...style }}>{children}</div>
    </div>
  );
}

export function Qr({ src, x, y, size, plate }) {
  if (!plate) {
    return <img src={src} width={size} height={size} alt="" style={{ position: 'absolute', top: y, left: x }} />;
  }
  const pad = plate.pad ?? 20;
  return (
    <div
      style={{
        position: 'absolute',
        top: y - pad,
        left: x - pad,
        padding: pad,
        display: 'flex',
        background: plate.bg,
        borderRadius: plate.radius ?? 0,
        ...(plate.border && { border: plate.border }),
      }}
    >
      <img src={src} width={size} height={size} alt="" />
    </div>
  );
}

// Shrinks long guest names: `base` characters fit at `max` size.
export const fit = (name, max, min, base) => Math.round(Math.max(min, Math.min(max, (max * base) / Math.max(name.length, 1))));

/* ---------- SVG snippets ---------- */

export const diamond = (x, y, s, fill) =>
  `<rect x="${x - s}" y="${y - s}" width="${2 * s}" height="${2 * s}" transform="rotate(45 ${x} ${y})" fill="${fill}"/>`;

export function leaf(x, y, len, angle, fill, extra = '') {
  const w = len * 0.34;
  return `<path d="M0 0 C${r1(len * 0.3)} ${-w} ${r1(len * 0.72)} ${-w} ${len} 0 C${r1(len * 0.72)} ${w} ${r1(len * 0.3)} ${w} 0 0Z" transform="translate(${x} ${y}) rotate(${angle})" fill="${fill}" ${extra}/>`;
}

export function star8(cx, cy, s, stroke, fill, core = stroke) {
  const sq = (t = '') => `<rect x="${-s}" y="${-s}" width="${2 * s}" height="${2 * s}" ${t}/>`;
  const inner = s * 0.5;
  return `<g transform="translate(${cx} ${cy})">
    <g fill="${fill}">${sq()}${sq('transform="rotate(45)"')}</g>
    <g fill="none" stroke="${stroke}" stroke-width="1.6">${sq()}${sq('transform="rotate(45)"')}</g>
    <rect x="${-inner}" y="${-inner}" width="${2 * inner}" height="${2 * inner}" fill="${core}" transform="rotate(22.5)"/>
    <circle r="${r1(s * 0.2)}" fill="${fill}"/>
  </g>`;
}

// Four-pointed sparkle.
export function sparkle(x, y, s, fill, opacity = 1) {
  const k = s * 0.22;
  return `<path d="M${x} ${y - s} Q${x + k} ${y - k} ${x + s} ${y} Q${x + k} ${y + k} ${x} ${y + s} Q${x - k} ${y + k} ${x - s} ${y} Q${x - k} ${y - k} ${x} ${y - s}Z" fill="${fill}" fill-opacity="${opacity}"/>`;
}

export const hline = (x1, x2, y, stroke, w = 1.5) => `<path d="M${x1} ${y} H${x2}" stroke="${stroke}" stroke-width="${w}" fill="none"/>`;

// Olive/laurel sprig growing from (0,0) towards negative x.
export function sprig(fill, stroke, len = 132) {
  const k = len / 132;
  let leaves = '';
  const pts = [
    [-24, -2, 26, -150],
    [-30, -3, 24, 160],
    [-56, -3, 28, -145],
    [-64, -4, 25, 165],
    [-90, -8, 28, -140],
    [-98, -10, 24, 170],
    [-120, -17, 26, -150],
    [-132, -22, 22, 190],
  ];
  for (const [x, y, l, a] of pts) leaves += leaf(r1(x * k), r1(y * k), r1(l * k), a, fill, 'fill-opacity=".85"');
  return `<path d="M0 0 C${r1(-40 * k)} ${r1(-6 * k)} ${r1(-86 * k)} ${r1(-2 * k)} ${r1(-132 * k)} ${r1(-22 * k)}" fill="none" stroke="${stroke}" stroke-width="1.6"/>${leaves}`;
}

// Corner brackets around a square (QR frames).
export function brackets(x0, y0, size, tick, stroke, w = 2) {
  const x1 = x0 + size;
  const y1 = y0 + size;
  return `<path d="M${x0} ${y0 + tick} V${y0} H${x0 + tick} M${x1 - tick} ${y0} H${x1} V${y0 + tick} M${x1} ${y1 - tick} V${y1} H${x1 - tick} M${x0 + tick} ${y1} H${x0} V${y1 - tick}" fill="none" stroke="${stroke}" stroke-width="${w}"/>`;
}
