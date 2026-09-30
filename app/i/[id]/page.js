import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import Invitation from '../../_components/Invitation';
import { markOpened } from '@/lib/store';
import { musicSrc } from '@/lib/music';

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function GuestInvitation({ params }) {
  const { id } = await params;
  await connection();
  const guest = await markOpened(id);
  if (!guest) notFound();

  return <Invitation guest={{ id: guest.id, name: guest.name, rsvp: guest.rsvp }} musicSrc={musicSrc()} />;
}
