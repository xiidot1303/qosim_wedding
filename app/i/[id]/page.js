import { notFound } from 'next/navigation';
import { after, connection } from 'next/server';
import Invitation from '../../_components/Invitation';
import { getGuest, markOpened } from '@/lib/store';
import { musicSrc } from '@/lib/music';

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function GuestInvitation({ params }) {
  const { id } = await params;
  await connection();
  const guest = await getGuest(id);
  if (!guest) notFound();

  // Count the visit after responding, so a storage hiccup never breaks the page.
  after(() => markOpened(id).catch((e) => console.error('markOpened failed', e)));

  return <Invitation guest={{ id: guest.id, name: guest.name, rsvp: guest.rsvp }} musicSrc={musicSrc()} />;
}
