import './globals.css';
import { Nunito } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
});

export const metadata = {
  title: 'Destiny Status',
  description: 'Search for Destiny players and review their loadouts',
  openGraph: {
    title: 'Destiny Status',
    description: 'Search for Destiny players and review their loadouts',
    images: [
      {
        url: '/thumbnail.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${nunito.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
