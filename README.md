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

Guests are stored in `data/guests.json`, so the app needs a server with a persistent disk (a VPS, Railway or Render with a volume, etc.). Serverless hosts such as Vercel don't keep files between requests. Back up `data/guests.json`: deleting it breaks every guest link already sent.
