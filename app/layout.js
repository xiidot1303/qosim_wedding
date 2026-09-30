import localFont from 'next/font/local';
import { wedding } from '@/lib/config';
import './globals.css';

const serif = localFont({
  variable: '--font-serif',
  display: 'swap',
  src: [
    { path: '../assets/fonts/CormorantGaramond-300.ttf', weight: '300', style: 'normal' },
    { path: '../assets/fonts/CormorantGaramond-400.ttf', weight: '400', style: 'normal' },
    { path: '../assets/fonts/CormorantGaramond-500.ttf', weight: '500', style: 'normal' },
    { path: '../assets/fonts/CormorantGaramond-300-italic.ttf', weight: '300', style: 'italic' },
    { path: '../assets/fonts/CormorantGaramond-400-italic.ttf', weight: '400', style: 'italic' },
  ],
});

const script = localFont({
  variable: '--font-script',
  display: 'swap',
  src: [{ path: '../assets/fonts/GreatVibes-400.ttf', weight: '400', style: 'normal' }],
});

const sans = localFont({
  variable: '--font-sans',
  display: 'swap',
  src: [
    { path: '../assets/fonts/Montserrat-300.ttf', weight: '300', style: 'normal' },
    { path: '../assets/fonts/Montserrat-400.ttf', weight: '400', style: 'normal' },
    { path: '../assets/fonts/Montserrat-500.ttf', weight: '500', style: 'normal' },
  ],
});

export const metadata = {
  title: `${wedding.groom} & ${wedding.bride} — To‘y taklifnomasi`,
  description: `${wedding.day} ${wedding.month.toLowerCase()} ${wedding.year}, ${wedding.venue.name}`,
};

export const viewport = {
  themeColor: '#faf8f4',
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz" className={`${serif.variable} ${sans.variable} ${script.variable}`}>
      <body>{children}</body>
    </html>
  );
}
