import { randomBytes } from 'node:crypto';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { Redis } from '@upstash/redis';

// Guests are stored in Upstash Redis when it is configured (required on Vercel,
// whose filesystem is read-only), otherwise in a local JSON file.

const ALPHABET = 'abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function newId() {
  const bytes = randomBytes(10);
  let id = '';
  for (const b of bytes) id += ALPHABET[b % ALPHABET.length];
  return id;
}

/* ---------- Redis backend: one hash, field = guest id, value = guest JSON ---------- */

function redisBackend(url, token) {
  const redis = new Redis({ url, token });
  const KEY = 'wedding:guests';
  return {
    all: async () => Object.values((await redis.hgetall(KEY)) || {}),
    get: async (id) => (await redis.hget(KEY, id)) || null,
    put: async (guests) => {
      if (guests.length) await redis.hset(KEY, Object.fromEntries(guests.map((g) => [g.id, g])));
    },
    remove: async (id) => (await redis.hdel(KEY, id)) > 0,
  };
}

/* ---------- File backend: data/guests.json ---------- */

function fileBackend() {
  const dir = process.env.DATA_DIR || path.join(process.cwd(), 'data');
  const file = path.join(dir, 'guests.json');

  async function load() {
    try {
      return JSON.parse(await readFile(file, 'utf8'));
    } catch (e) {
      if (e.code === 'ENOENT') return [];
      throw e;
    }
  }

  // Serialize every read-modify-write so concurrent requests can't clobber each other.
  let queue = Promise.resolve();
  function mutate(fn) {
    const run = queue.then(async () => {
      if (process.env.VERCEL) {
        throw new Error('Vercel’da mehmonlarni saqlash uchun Upstash Redis ulang (README → Hosting).');
      }
      const guests = await load();
      const result = fn(guests);
      await mkdir(dir, { recursive: true });
      const tmp = `${file}.${process.pid}.tmp`;
      await writeFile(tmp, JSON.stringify(guests, null, 2));
      await rename(tmp, file);
      return result;
    });
    queue = run.catch(() => {});
    return run;
  }

  return {
    all: load,
    get: async (id) => (await load()).find((g) => g.id === id) || null,
    put: (items) =>
      mutate((guests) => {
        for (const item of items) {
          const i = guests.findIndex((g) => g.id === item.id);
          if (i === -1) guests.push(item);
          else guests[i] = item;
        }
      }),
    remove: (id) =>
      mutate((guests) => {
        const i = guests.findIndex((g) => g.id === id);
        if (i !== -1) guests.splice(i, 1);
        return i !== -1;
      }),
  };
}

const redisUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const db = redisUrl && redisToken ? redisBackend(redisUrl, redisToken) : fileBackend();

/* ---------- Public API ---------- */

export const cleanName = (s) => String(s ?? '').replace(/\s+/g, ' ').trim().slice(0, 80);

export async function listGuests() {
  return (await db.all()).sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export function getGuest(id) {
  return db.get(id);
}

export async function addGuests(names) {
  const ids = new Set((await db.all()).map((g) => g.id));
  const now = Date.now();
  const added = [];
  for (const raw of names) {
    const name = cleanName(raw);
    if (!name) continue;
    let id;
    do id = newId();
    while (ids.has(id));
    ids.add(id);
    added.push({
      id,
      name,
      // +index keeps the uploaded order when sorting by creation time
      createdAt: new Date(now + added.length).toISOString(),
      views: 0,
      lastOpenedAt: null,
      rsvp: null,
    });
  }
  await db.put(added);
  return added;
}

export async function updateGuest(id, patch) {
  const guest = await db.get(id);
  if (!guest) return null;
  Object.assign(guest, patch);
  await db.put([guest]);
  return guest;
}

export function deleteGuest(id) {
  return db.remove(id);
}

export async function markOpened(id) {
  const guest = await db.get(id);
  if (!guest) return null;
  return updateGuest(id, { views: (guest.views || 0) + 1, lastOpenedAt: new Date().toISOString() });
}
