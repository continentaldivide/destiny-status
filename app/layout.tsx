import './globals.css';

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
