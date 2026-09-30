import Invitation from './_components/Invitation';
import { musicSrc } from '@/lib/music';

export default function Home() {
  return <Invitation guest={null} musicSrc={musicSrc()} />;
}
