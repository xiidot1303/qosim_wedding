'use client';

/* eslint-disable @next/next/no-img-element -- dynamic PNGs from our own route */
import { useEffect, useState } from 'react';
import s from './demo.module.css';

export default function DemoGallery({ designs, current }) {
  const [input, setInput] = useState('Shahzod Karimov');
  const [name, setName] = useState(input);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setName(input.trim() || 'Shahzod Karimov'), 500);
    return () => clearTimeout(t);
  }, [input]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') setOpen((i) => (i + 1) % designs.length);
      if (e.key === 'ArrowLeft') setOpen((i) => (i - 1 + designs.length) % designs.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, designs.length]);

  const src = (id) => `/api/demo-card/${id}?name=${encodeURIComponent(name)}`;
  const shown = open === null ? null : designs[open];

  return (
    <main className={s.wrap}>
      <header className={s.header}>
        <p className={s.kicker}>Taklifnoma dizaynlari</p>
        <h1 className={s.title}>{designs.length} ta variantdan birini tanlang</h1>
        <p className={s.hint}>Kartani kattalashtirish uchun ustiga bosing. Yoqqan variant raqamini ayting.</p>
        <label className={s.nameField}>
          <span>Namuna uchun mehmon ismi</span>
          <input value={input} onChange={(e) => setInput(e.target.value)} maxLength={80} />
        </label>
      </header>

      <ul className={s.grid}>
        {designs.map((d, i) => (
          <li key={d.id}>
            <button className={s.card} onClick={() => setOpen(i)}>
              <img src={src(d.id)} alt={`${d.id}. ${d.name}`} loading={i < 6 ? 'eager' : 'lazy'} />
            </button>
            <div className={s.caption}>
              <span className={s.num}>{d.id}</span>
              <span className={s.name}>{d.name}</span>
              {d.id === current && <span className={s.badge}>Hozirgi</span>}
            </div>
          </li>
        ))}
      </ul>

      {shown && (
        <div className={s.modal} onClick={(e) => e.target === e.currentTarget && setOpen(null)}>
          <button className={`${s.nav} ${s.prev}`} onClick={() => setOpen((open - 1 + designs.length) % designs.length)} aria-label="Oldingi">
            ‹
          </button>
          <figure className={s.figure}>
            <img src={src(shown.id)} alt={shown.name} />
            <figcaption>
              <b>{shown.id}</b> {shown.name}
            </figcaption>
          </figure>
          <button className={`${s.nav} ${s.next}`} onClick={() => setOpen((open + 1) % designs.length)} aria-label="Keyingi">
            ›
          </button>
          <button className={s.close} onClick={() => setOpen(null)} aria-label="Yopish">
            ×
          </button>
        </div>
      )}
    </main>
  );
}
