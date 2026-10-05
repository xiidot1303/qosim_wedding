# Qosimjon & Dilnurabegim — wedding invitation

Printable invitation cards for each guest, plus a personal invitation page for each guest.

## Run

```bash
npm install
npm run dev          # http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

## Settings (`.env.local`)

| Variable         | Meaning                                                                 |
| ---------------- | ----------------------------------------------------------------------- |
| `ADMIN_PASSWORD` | Password for `/admin`                                                   |
| `SESSION_SECRET` | Random string used to sign the admin session                            |
| `SITE_URL`       | Public domain, e.g. `https://qosim-dilnura.uz`. Guest links use it. |
| `DATA_DIR`       | Optional. Folder for `guests.json` (default `./data`)                   |

Set `SITE_URL` to the real domain **before** downloading cards for print.

## How it works

- `/admin`: add guests (one name per line, or upload a `.txt` / `.csv`). For each guest you can preview the card, download it as PNG, copy the link, or open the page. **Barcha kartalar (ZIP)** downloads every card at once. The panel also shows who opened their invitation and who answered the RSVP.
- `/api/card/<id>`: a 1200×1800 PNG (10×15 cm at 300 dpi) in the design set by `cardDesign` in `lib/config.js` (currently #13 Marmar): the guest name, one invitation line, the couple's names, the date, the restaurant and «Murodovlar xonadoni». Other designs include a QR code that opens the guest's page.
- `/demo`: preview of all 50 card designs.
- `/i/<id>`: the guest's personal invitation page, with music, a calendar, a countdown, the map (Google and Yandex), RSVP, and add-to-calendar.
- `/`: the same page without a guest name.

## Editing content

All texts, the date and the venue live in `lib/config.js`. The card layout is in `app/api/card/[id]/route.js`.

## Music

By default the page plays Pachelbel's *Canon in D* (public domain), synthesized in the browser.
To use your own song, put it at `public/music.mp3` and rebuild. Browsers only allow sound after a tap, so music starts when the guest taps **Ochish** on the cover.

## Hosting

Locally, guests are stored in `data/guests.json`.

**Vercel** has a read-only filesystem, so guests must be stored in Upstash Redis:

1. Vercel dashboard → your project → **Storage** → **Create Database** → **Upstash for Redis** (free plan) → connect it to the project for all environments. This adds `KV_REST_API_URL` and `KV_REST_API_TOKEN` automatically. `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` also work.
2. Settings → Environment Variables: set `ADMIN_PASSWORD`, `SESSION_SECRET` and `SITE_URL` (e.g. `https://qosim-wedding.vercel.app`).
3. Redeploy.

When those Redis variables are present, the app uses Redis everywhere, including locally if you put them in `.env.local`.
