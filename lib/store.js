import { randomBytes } from 'node:crypto';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';

// Guests live in a single JSON file — plenty for a wedding guest list.
const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data');
const FILE = path.join(DATA_DIR, 'guests.json');

const ALPHABET = 'abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function newId() {
  const bytes = randomBytes(10);
  let id = '';
  for (const b of bytes) id += ALPHABET[b % ALPHABET.length];
  return id;
}

async function load() {
  try {
    return JSON.parse(await readFile(FILE, 'utf8'));
  } catch (e) {
    if (e.code === 'ENOENT') return [];
    throw e;
  }
}

async function save(guests) {
  await mkdir(DATA_DIR, { recursive: true });
  const tmp = `${FILE}.${process.pid}.tmp`;
  await writeFile(tmp, JSON.stringify(guests, null, 2));
  await rename(tmp, FILE);
}

// Serialize every read-modify-write so concurrent requests can't clobber each other.
let queue = Promise.resolve();
function mutate(fn) {
  const run = queue.then(async () => {
    const guests = await load();
    const result = await fn(guests);
    await save(guests);
    return result;
  });
  queue = run.catch(() => {});
  return run;
}

export const cleanName = (s) => String(s ?? '').replace(/\s+/g, ' ').trim().slice(0, 80);

export async function listGuests() {
  return load();
}

export async function getGuest(id) {
  return (await load()).find((g) => g.id === id) || null;
}

export function addGuests(names) {
  return mutate((guests) => {
    const ids = new Set(guests.map((g) => g.id));
    const added = [];
    for (const raw of names) {
      const name = cleanName(raw);
      if (!name) continue;
      let id;
      do id = newId();
      while (ids.has(id));
      ids.add(id);
      const guest = {
        id,
        name,
        createdAt: new Date().toISOString(),
        views: 0,
        lastOpenedAt: null,
        rsvp: null,
      };
      guests.push(guest);
      added.push(guest);
    }
    return added;
  });
}

export function updateGuest(id, patch) {
  return mutate((guests) => {
    const g = guests.find((x) => x.id === id);
    if (!g) return null;
    Object.assign(g, patch);
    return g;
  });
}

export function deleteGuest(id) {
  return mutate((guests) => {
    const i = guests.findIndex((x) => x.id === id);
    if (i === -1) return false;
    guests.splice(i, 1);
    return true;
  });
}

export function markOpened(id) {
  return mutate((guests) => {
    const g = guests.find((x) => x.id === id);
    if (!g) return null;
    g.views = (g.views || 0) + 1;
    g.lastOpenedAt = new Date().toISOString();
    return g;
  });
}
