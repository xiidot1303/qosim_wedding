// All wedding details in one place — edit here to change the card and the site.
export const wedding = {
  groom: 'Qosimjon',
  bride: 'Dilnurabegim',
  family: 'Murodovlar oilasi',

  // 23 October 2026, 18:00 Samarqand vaqti (UTC+5)
  date: '2026-10-23T18:00:00+05:00',
  dateShort: '23 · 10 · 2026',
  weekday: 'Juma',
  day: 23,
  month: 'Oktabr',
  year: 2026,
  time: '18:00',

  // Printed card design number — preview all of them at /demo
  cardDesign: 13,

  // The single line printed on the card
  cardLine: 'Sizni nikoh to‘yimizga lutfan taklif etamiz',

  // Texts from the original invitation template
  greeting: 'Assalomu alaykum',
  dear: 'Hurmatli',
  venueLabel: 'Manzil',
  regards: 'Hurmat bilan,',
  invitation:
    'Sizni farzandlarimizning nikoh to‘yi munosabati bilan o‘tkaziladigan tantanali oqshomimizga lutfan taklif etamiz.',

  venue: {
    name: '«Fotima Sultan» restorani',
    // Printed on the card under the name (from the Yandex Maps listing)
    address: 'Samarqand shahri, Yangi Xayrobod mahallasi',
    city: 'Samarqand shahri',
    lat: 39.6638839,
    lng: 66.9657864,
    google: 'https://maps.app.goo.gl/j1zLxpQL28jsM2fH9',
    yandex: 'https://yandex.uz/maps/-/CXUhM01J',
  },
};

// Nahor oshi — morning plov before the wedding. Fields not listed here
// (couple, family, labels) are shared with the wedding.
export const nahor = {
  title: 'Nahor oshi',
  kicker: 'Nahor oshi',
  label: 'Nahor oshi',
  date: '2026-10-22T10:00:00+05:00',
  dateShort: '22 · 10 · 2026',
  weekday: 'Payshanba',
  day: 22,
  month: 'Oktabr',
  year: 2026,
  time: '10:00',
  invitation:
    'Sizni farzandlarimizning nikoh to‘yi munosabati bilan o‘tkaziladigan nahor oshimizga lutfan taklif etamiz.',
  countdownLabel: 'Nahor oshiga qadar',
  rsvpQuestion: 'Nahor oshiga kela olasizmi?',
  photo: false,
  venue: {
    name: '«Amir» restorani',
    // From the Yandex Maps listing: Bog‘i Temur MFY, Lutfiy ko‘chasi, 124
    address: 'Samarqand shahri, Lutfiy ko‘chasi, 124',
    city: 'Samarqand shahri',
    lat: 39.6486272,
    lng: 66.9490122,
    google:
      'https://www.google.com/maps/place/AMIR/@39.6485022,66.9494517,17z/data=!4m6!3m5!1s0x3f4d19fdadfebb4f:0xcd39c0ed3da32c74!8m2!3d39.6486272!4d66.9490122!16s%2Fg%2F11ngb1rm_x',
    yandex: 'https://yandex.uz/maps/org/amir/189815786937/?ll=66.948757%2C39.648948&z=16.4',
  },
};

export const events = {
  toy: {
    ...wedding,
    key: 'toy',
    title: null,
    kicker: 'Nikoh to‘yi',
    label: 'To‘y',
    countdownLabel: 'To‘yga qadar',
    rsvpQuestion: 'To‘yimizga kela olasizmi?',
    photo: true,
  },
  nahor: { ...wedding, ...nahor, key: 'nahor' },
};

export const EVENT_KEYS = Object.keys(events);
export const getEvent = (key) => events[key] || events.toy;
