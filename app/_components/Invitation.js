'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { wedding } from '@/lib/config';
import { createCanon, createFilePlayer } from '@/lib/canon';
import s from './invitation.module.css';
import venuePhoto from './venue.jpg';

const { venue } = wedding;
const initial = (name) => name.charAt(0).toUpperCase();

function useMusic(src) {
  const player = useRef(null);
  const wantPlaying = useRef(false);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    if (navigator.audioSession) navigator.audioSession.type = 'playback'; // iOS: ignore the silent switch
    player.current ??= src ? createFilePlayer(src) : createCanon();
    player.current.play();
    wantPlaying.current = true;
    setPlaying(true);
  };
  const pause = () => {
    player.current?.pause();
    wantPlaying.current = false;
    setPlaying(false);
  };

  useEffect(() => {
    const onVisibility = () => {
      if (!player.current || !wantPlaying.current) return;
      if (document.hidden) player.current.pause();
      else player.current.play();
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  return { playing, play, toggle: () => (playing ? pause() : play()) };
}

function useReveal(enabled) {
  useEffect(() => {
    if (!enabled) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.dataset.shown = '';
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
    );
    document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [enabled]);
}

function Rings() {
  return (
    <svg className={s.rings} viewBox="0 0 120 64" aria-hidden="true">
      <circle cx="46" cy="32" r="24" />
      <circle cx="74" cy="32" r="24" />
    </svg>
  );
}

function Calendar() {
  const first = new Date(wedding.year, 9, 1); // October
  const offset = (first.getDay() + 6) % 7; // Monday first
  const days = new Date(wedding.year, 10, 0).getDate();
  const cells = [...Array(offset).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  return (
    <div className={s.calendar}>
      <div className={s.calTitle}>
        {wedding.month} <span>{wedding.year}</span>
      </div>
      <div className={s.calGrid}>
        {['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'].map((d) => (
          <div key={d} className={s.calHead}>
            {d}
          </div>
        ))}
        {cells.map((d, i) => (
          <div key={i} className={d === wedding.day ? s.calDayActive : s.calDay}>
            {d}
            {d === wedding.day && (
              <svg className={s.calCircle} viewBox="0 0 60 60" aria-hidden="true">
                <path d="M31 6 C48 5 56 18 55 31 C54 45 42 55 29 54 C15 53 5 43 6 29 C7 16 17 8 33 9" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Countdown() {
  const target = new Date(wedding.date).getTime();
  const [now, setNow] = useState(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  if (now !== null && now >= target) {
    return <p className={s.celebrate}>To‘yimiz muborak bo‘lsin!</p>;
  }
  const diff = now === null ? null : Math.max(0, target - now);
  const parts = [
    ['kun', 86400000],
    ['soat', 3600000],
    ['daqiqa', 60000],
    ['soniya', 1000],
  ];
  let rest = diff;
  return (
    <div className={s.countdown}>
      {parts.map(([label, ms]) => {
        const v = rest === null ? null : Math.floor(rest / ms);
        if (rest !== null) rest -= v * ms;
        return (
          <div key={label} className={s.unit}>
            <span className={s.num}>{v === null ? '–' : String(v).padStart(2, '0')}</span>
            <span className={s.unitLabel}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}

function Rsvp({ guest }) {
  const [answer, setAnswer] = useState(guest.rsvp);
  const [busy, setBusy] = useState(false);

  const send = async (value) => {
    setBusy(true);
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: guest.id, answer: value }),
      });
      if (res.ok) setAnswer(value);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className={`${s.section} ${s.reveal}`} data-reveal>
      <p className={s.kicker}>Javobingiz</p>
      <h2 className={s.h2}>To‘yimizga kela olasizmi?</h2>
      <div className={s.buttons}>
        <button className={answer === 'yes' ? s.btnActive : s.btn} disabled={busy} onClick={() => send('yes')}>
          Albatta boraman
        </button>
        <button className={answer === 'no' ? s.btnActive : s.btn} disabled={busy} onClick={() => send('no')}>
          Afsuski, bora olmayman
        </button>
      </div>
      {answer && (
        <p className={s.note}>
          {answer === 'yes' ? 'Rahmat! Sizni intizorlik bilan kutamiz.' : 'Rahmat, xabar berganingiz uchun.'}
        </p>
      )}
    </section>
  );
}

function MusicButton({ playing, onClick }) {
  return (
    <button
      className={`${s.music} ${playing ? s.musicOn : ''}`}
      onClick={onClick}
      aria-label={playing ? 'Musiqani to‘xtatish' : 'Musiqani yoqish'}
    >
      <span />
      <span />
      <span />
      <span />
    </button>
  );
}

export default function Invitation({ guest, musicSrc }) {
  const [opened, setOpened] = useState(false);
  const music = useMusic(musicSrc);
  useReveal(opened);

  useEffect(() => {
    document.documentElement.style.overflow = opened ? '' : 'hidden';
  }, [opened]);

  const open = () => {
    music.play();
    setOpened(true);
  };

  return (
    <>
      <div className={`${s.cover} ${opened ? s.coverOpen : ''}`} aria-hidden={opened}>
        <div className={s.panelTop} />
        <div className={s.panelBottom} />
        <div className={s.coverContent}>
          <p className={s.kicker}>Taklifnoma</p>
          <div className={s.monogram}>
            <span>{initial(wedding.groom)}</span>
            <i />
            <span>{initial(wedding.bride)}</span>
          </div>
          {guest && (
            <p className={s.coverGuest}>
              Hurmatli <em>{guest.name}</em>
            </p>
          )}
          <button className={s.openBtn} onClick={open}>
            Ochish
          </button>
        </div>
      </div>

      <main className={`${s.main} ${opened ? s.opened : ''}`}>
        <section className={s.hero}>
          <Rings />
          <p className={s.kicker}>Nikoh to‘yi</p>
          <h1 className={s.names}>
            <span>{wedding.groom}</span>
            <span className={s.amp}>&amp;</span>
            <span>{wedding.bride}</span>
          </h1>
          <p className={s.heroDate}>{wedding.dateShort}</p>
          <div className={s.scrollHint} aria-hidden="true" />
        </section>

        <section className={`${s.section} ${s.reveal}`} data-reveal>
          <p className={s.kicker}>{wedding.greeting}</p>
          <h2 className={s.guestName}>{guest ? `Hurmatli ${guest.name}!` : 'Aziz mehmonlar!'}</h2>
          <p className={s.lead}>{wedding.invitation}</p>
        </section>

        <div className={s.divider} />

        <section className={`${s.section} ${s.reveal}`} data-reveal>
          <p className={s.kicker}>Sana va vaqt</p>
          <Calendar />
          <p className={s.when}>
            {wedding.weekday} <b>·</b> soat {wedding.time}
          </p>
        </section>

        <section className={`${s.section} ${s.sectionTint} ${s.reveal}`} data-reveal>
          <p className={s.kicker}>To‘yga qadar</p>
          <Countdown />
        </section>

        <section className={`${s.section} ${s.reveal}`} data-reveal>
          <p className={s.kicker}>Manzil</p>
          <h2 className={s.h2}>{venue.name}</h2>
          <p className={s.sub}>{venue.city}</p>
          <div className={s.photo}>
            <Image src={venuePhoto} alt={venue.name} placeholder="blur" sizes="(max-width: 640px) 100vw, 600px" />
          </div>
          <div className={s.buttons}>
            <a className={s.btn} href={venue.google} target="_blank" rel="noopener noreferrer">
              Google Maps
            </a>
            <a className={s.btn} href={venue.yandex} target="_blank" rel="noopener noreferrer">
              Yandex Maps
            </a>
          </div>
        </section>

        {guest && (
          <>
            <div className={s.divider} />
            <Rsvp guest={guest} />
          </>
        )}

        <section className={`${s.section} ${s.closing} ${s.reveal}`} data-reveal>
          <p className={s.lead}>Sizni intizorlik bilan kutib qolamiz</p>
          <p className={s.kicker}>Hurmat bilan</p>
          <p className={s.family}>{wedding.family}</p>
          <a className={s.link} href="/api/calendar">
            Taqvimga qo‘shish
          </a>
        </section>

        <footer className={s.footer}>
          {initial(wedding.groom)} &amp; {initial(wedding.bride)} · {wedding.year}
        </footer>
      </main>

      {opened && <MusicButton playing={music.playing} onClick={music.toggle} />}
    </>
  );
}
