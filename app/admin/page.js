'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { wedding } from '@/lib/config';
import s from './admin.module.css';

const HEADERS = new Set(['name', 'names', 'ism', 'ismi', 'mehmon', 'fio', 'имя']);

// First cell of every line; works for .txt, and .csv exported from Excel (comma or semicolon).
function parseList(text) {
  return text
    .split(/\r?\n/)
    .map((line) => line.split(/[;,\t]/)[0].replace(/^["']|["']$/g, '').trim())
    .filter((name, i) => name && !(i === 0 && HEADERS.has(name.toLowerCase())));
}

const safeFile = (name) => name.replace(/[^\p{L}\p{N}]+/gu, '_');

function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleString('uz-UZ', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
}

export default function Admin() {
  const router = useRouter();
  const [guests, setGuests] = useState([]);
  const [baseUrl, setBaseUrl] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState(null);
  const [preview, setPreview] = useState(null);
  const [zipProgress, setZipProgress] = useState(null);
  const [toast, setToast] = useState('');

  const flash = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2200);
  };

  const api = useCallback(async (url, opts) => {
    const res = await fetch(url, { cache: 'no-store', ...opts });
    if (res.status === 401) {
      router.replace('/admin/login');
      throw new Error('unauthorized');
    }
    return res.json();
  }, [router]);

  const load = useCallback(
    () =>
      api('/api/admin/guests').then((data) => {
        setGuests(data.guests);
        setBaseUrl(data.baseUrl);
        setLoaded(true);
      }),
    [api]
  );

  useEffect(() => {
    load().catch(() => {});
  }, [load]);

  const names = useMemo(() => parseList(text), [text]);

  const add = async () => {
    if (!names.length) return;
    setBusy(true);
    try {
      const { added } = await api('/api/admin/guests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ names }),
      });
      setText('');
      flash(`${added.length} ta mehmon qo‘shildi`);
      await load();
    } finally {
      setBusy(false);
    }
  };

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const content = await file.text();
    setText((t) => (t.trim() ? `${t.trim()}\n` : '') + parseList(content).join('\n'));
    e.target.value = '';
  };

  const rename = async (guest, name) => {
    setEditing(null);
    if (!name.trim() || name.trim() === guest.name) return;
    await api(`/api/admin/guests/${guest.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    await load();
  };

  const remove = async (guest) => {
    if (!confirm(`«${guest.name}» o‘chirilsinmi? Uning QR kodi ishlamay qoladi.`)) return;
    await api(`/api/admin/guests/${guest.id}`, { method: 'DELETE' });
    await load();
  };

  const copy = async (guest) => {
    await navigator.clipboard.writeText(`${baseUrl}/i/${guest.id}`);
    flash('Havola nusxalandi');
  };

  const downloadAll = async () => {
    const { default: JSZip } = await import('jszip');
    const zip = new JSZip();
    for (let i = 0; i < guests.length; i++) {
      setZipProgress(`${i + 1} / ${guests.length}`);
      const g = guests[i];
      const res = await fetch(`/api/card/${g.id}`, { cache: 'no-store' });
      zip.file(`${String(i + 1).padStart(3, '0')}-${safeFile(g.name)}.png`, await res.blob());
    }
    setZipProgress('ZIP…');
    const blob = await zip.generateAsync({ type: 'blob' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'taklifnomalar.zip';
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 5000);
    setZipProgress(null);
  };

  const logout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' });
    router.replace('/admin/login');
  };

  const filtered = guests.filter((g) => g.name.toLowerCase().includes(query.trim().toLowerCase()));
  const stats = {
    total: guests.length,
    opened: guests.filter((g) => g.views > 0).length,
    yes: guests.filter((g) => g.rsvp === 'yes').length,
    no: guests.filter((g) => g.rsvp === 'no').length,
  };
  const isLocal = /localhost|127\.0\.0\.1|0\.0\.0\.0|192\.168\.|10\.\d/.test(baseUrl);

  return (
    <main className={s.wrap}>
      <header className={s.header}>
        <div>
          <p className={s.kicker}>Boshqaruv paneli</p>
          <h1 className={s.title}>
            {wedding.groom} &amp; {wedding.bride}
          </h1>
        </div>
        <div className={s.headerLinks}>
          <a href="/" target="_blank" className={s.ghost}>
            Saytni ko‘rish
          </a>
          <button onClick={logout} className={s.ghost}>
            Chiqish
          </button>
        </div>
      </header>

      {loaded && isLocal && (
        <p className={s.warning}>
          Mehmon havolalari hozir <b>{baseUrl}</b> manziliga olib boradi. Havolalarni yuborishdan oldin saytni internetga
          joylang va <code>SITE_URL</code> ni haqiqiy domen bilan sozlang.
        </p>
      )}

      <section className={s.stats}>
        <div>
          <b>{stats.total}</b>
          <span>Mehmonlar</span>
        </div>
        <div>
          <b>{stats.opened}</b>
          <span>Ochganlar</span>
        </div>
        <div>
          <b>{stats.yes}</b>
          <span>Keladi</span>
        </div>
        <div>
          <b>{stats.no}</b>
          <span>Kelmaydi</span>
        </div>
      </section>

      <section className={s.card}>
        <h2 className={s.h2}>Mehmon qo‘shish</h2>
        <p className={s.hint}>Har bir qatorga bitta ism yozing yoki .txt / .csv fayl yuklang (Excel → «CSV sifatida saqlash»).</p>
        <textarea
          className={s.textarea}
          rows={6}
          placeholder={'Shahzod Karimov\nMadina opa\nAliyevlar oilasi'}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className={s.row}>
          <label className={s.ghost}>
            Fayl yuklash
            <input type="file" accept=".txt,.csv,text/plain,text/csv" onChange={onFile} hidden />
          </label>
          <button className={s.primary} disabled={busy || !names.length} onClick={add}>
            {names.length ? `${names.length} ta mehmonni qo‘shish` : 'Qo‘shish'}
          </button>
        </div>
      </section>

      <section className={s.card}>
        <div className={s.listHead}>
          <h2 className={s.h2}>Ro‘yxat</h2>
          <input className={s.search} placeholder="Qidirish…" value={query} onChange={(e) => setQuery(e.target.value)} />
          <button className={s.primary} disabled={!guests.length || zipProgress} onClick={downloadAll}>
            {zipProgress ? `Tayyorlanmoqda ${zipProgress}` : 'Barcha kartalar (ZIP)'}
          </button>
        </div>

        {loaded && !guests.length && <p className={s.empty}>Hali mehmon qo‘shilmagan.</p>}

        <ul className={s.list}>
          {filtered.map((g) => (
            <li key={g.id} className={s.item}>
              <div className={s.itemMain}>
                {editing === g.id ? (
                  <input
                    className={s.input}
                    defaultValue={g.name}
                    autoFocus
                    onBlur={(e) => rename(g, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') e.currentTarget.blur();
                      if (e.key === 'Escape') setEditing(null);
                    }}
                  />
                ) : (
                  <button className={s.name} onClick={() => setEditing(g.id)} title="Tahrirlash">
                    {g.name}
                  </button>
                )}
                <div className={s.meta}>
                  {g.views > 0 ? (
                    <span className={s.tagOk}>
                      Ochilgan · {g.views}× · {formatDate(g.lastOpenedAt)}
                    </span>
                  ) : (
                    <span className={s.tag}>Ochilmagan</span>
                  )}
                  {g.rsvp === 'yes' && <span className={s.tagOk}>Keladi</span>}
                  {g.rsvp === 'no' && <span className={s.tagNo}>Kelmaydi</span>}
                </div>
              </div>
              <div className={s.actions}>
                <button onClick={() => setPreview(g)}>Karta</button>
                <a href={`/api/card/${g.id}?download`}>PNG</a>
                <button onClick={() => copy(g)}>Havola</button>
                <a href={`/i/${g.id}`} target="_blank">
                  Ochish
                </a>
                <button onClick={() => remove(g)} className={s.danger}>
                  O‘chirish
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {preview && (
        <div className={s.modal} onClick={(e) => e.target === e.currentTarget && setPreview(null)}>
          <div className={s.modalBody}>
            {/* eslint-disable-next-line @next/next/no-img-element -- dynamic PNG from our own route */}
            <img src={`/api/card/${preview.id}?v=${encodeURIComponent(preview.name)}`} alt={preview.name} />
            <div className={s.row}>
              <a className={s.primary} href={`/api/card/${preview.id}?download`}>
                Yuklab olish
              </a>
              <button className={s.ghost} onClick={() => setPreview(null)}>
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className={s.toast}>{toast}</div>}
    </main>
  );
}
