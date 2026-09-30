'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import s from '../admin.module.css';

export default function Login() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.replace('/admin');
      return;
    }
    setError((await res.json().catch(() => ({}))).error || 'Xatolik');
    setBusy(false);
  };

  return (
    <main className={s.loginWrap}>
      <form className={s.login} onSubmit={submit}>
        <p className={s.kicker}>Boshqaruv paneli</p>
        <h1 className={s.title}>Kirish</h1>
        <input
          className={s.input}
          type="password"
          placeholder="Parol"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className={s.error}>{error}</p>}
        <button className={s.primary} disabled={busy || !password}>
          {busy ? '…' : 'Kirish'}
        </button>
      </form>
    </main>
  );
}
