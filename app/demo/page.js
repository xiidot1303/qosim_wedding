import { designs } from '@/lib/card/render';
import { wedding } from '@/lib/config';
import DemoGallery from './DemoGallery';

export const metadata = {
  title: 'Taklifnoma dizaynlari',
  robots: { index: false, follow: false },
};

export default function DemoPage() {
  return (
    <DemoGallery
      designs={designs.map(({ id, name }) => ({ id, name }))}
      current={wedding.cardDesign}
    />
  );
}
