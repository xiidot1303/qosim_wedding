import { getEvent } from '@/lib/config';

const env = (...names) => names.map((n) => process.env[n]).find(Boolean);

const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);

// Telegram refuses inline URL buttons that point at localhost or private addresses.
const isPublicUrl = (url) => !/^https?:\/\/(localhost|127\.|0\.0\.0\.0|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(url);

/**
 * Sends the guest's card to the configured chat with a caption; the
 * invitation link lives only in the inline button.
 */
export async function sendInvitation({ name, url, png, event }) {
  const ev = getEvent(event);
  const token = env('TELEGRAM_BOT_TOKEN', 'TELEGRAM_TOKEN', 'BOT_TOKEN');
  const chatId = env('TELEGRAM_CHAT_ID', 'CHAT_ID');
  if (!token || !chatId) {
    throw new Error('TELEGRAM_BOT_TOKEN va TELEGRAM_CHAT_ID sozlanmagan (.env yoki Vercel → Environment Variables).');
  }
  if (!isPublicUrl(url)) {
    throw new Error(`Telegram tugmasi ${url} kabi lokal havolani qabul qilmaydi. SITE_URL ni sayt domeniga sozlang.`);
  }

  const form = new FormData();
  form.append('chat_id', chatId);
  form.append('photo', new Blob([png], { type: 'image/png' }), `${name}.png`);
  form.append('parse_mode', 'HTML');
  form.append(
    'caption',
    `<b>${esc(ev.dear)} ${esc(name)}!</b>\n\n${esc(ev.title || `${ev.groom} & ${ev.bride}`)} — ${esc(ev.day)} ${esc(ev.month.toLowerCase())}, ${esc(ev.time)}`
  );
  form.append('reply_markup', JSON.stringify({ inline_keyboard: [[{ text: '💌 Taklifnomani ochish', url }]] }));

  const res = await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, { method: 'POST', body: form });
  const data = await res.json().catch(() => ({}));
  if (!data.ok) throw new Error(`Telegram: ${data.description || res.status}`);
}
