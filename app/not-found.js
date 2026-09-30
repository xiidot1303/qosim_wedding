import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{ minHeight: '100svh', display: 'grid', placeItems: 'center', textAlign: 'center', padding: 24 }}>
      <div>
        <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 34 }}>Taklifnoma topilmadi</p>
        <p style={{ marginTop: 14, fontSize: 13, color: 'var(--muted)' }}>Havolani tekshirib, qaytadan urinib ko‘ring.</p>
        <Link href="/" style={{ display: 'inline-block', marginTop: 30, fontSize: 11, letterSpacing: '.24em', textTransform: 'uppercase' }}>
          Bosh sahifa
        </Link>
      </div>
    </main>
  );
}
