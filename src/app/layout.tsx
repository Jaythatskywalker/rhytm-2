import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RHYTM - AI-Powered Music Curation for DJs',
  description: 'AI-powered music curation for DJs. Discover, curate, and sync tracks effortlessly.',
  keywords: 'DJ, music curation, AI, Beatport, electronic music, track discovery',
  authors: [{ name: 'RHYTM Team' }],
  creator: 'Sky Walker Enterprise',
  publisher: 'RHYTM',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'RHYTM - AI-Powered Music Curation for DJs',
    description: 'Stop wasting time. Find the perfect tracks with AI-powered curation.',
    url: 'https://rhytm.app',
    siteName: 'RHYTM',
    images: [
      {
        url: '/hero-headphones.png',
        width: 553,
        height: 553,
        alt: 'RHYTM - DJ Headphones',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RHYTM - AI-Powered Music Curation for DJs',
    description: 'Stop wasting time. Find the perfect tracks with AI-powered curation.',
    images: ['/hero-headphones.png'],
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#10B981',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
